import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

export const EXIT_CODES = {
  all_verified: 0,
  coverage_failed: 1,
  promotion_required: 2,
  tooling_unavailable: 3,
  invalid_input: 4,
  nondeterministic: 5
};

export function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

export function stableStringify(value) {
  return JSON.stringify(sortValue(value), null, 2) + '\n';
}

export function sha256Text(value) {
  return crypto.createHash('sha256').update(value).digest('hex');
}

export function writeJson(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, stableStringify(value), 'utf8');
}

export function validateInput(input, inputFilePath, toolRoot) {
  const errors = [];
  if (!input || typeof input !== 'object' || Array.isArray(input)) return {ok: false, errors: ['input must be an object'], siteRoot: ''};
  const required = ['schema_version', 'site_root', 'phase', 'run_id', 'viewports', 'families', 'routes'];
  for (const field of required) {
    if (!(field in input)) errors.push(`missing field ${field}`);
  }
  if (input.schema_version !== 'dqf-signature-0.1') errors.push('unsupported schema_version');
  if (!['build', 'qa'].includes(input.phase)) errors.push('phase must be build or qa');
  if (!Array.isArray(input.viewports) || input.viewports.length < 2) errors.push('viewports must include desktop and mobile');
  if (!Array.isArray(input.families) || input.families.length < 1) errors.push('families must not be empty');
  if (!Array.isArray(input.routes) || input.routes.length < 1) errors.push('routes must not be empty');

  if (errors.length) return {ok: false, errors, siteRoot: ''};
  const inputDir = path.dirname(inputFilePath);
  const siteRoot = path.resolve(inputDir, input.site_root || '');
  const projectsRoot = path.resolve(toolRoot, '..', '..', 'projects');
  if (path.relative(path.resolve(toolRoot), siteRoot).startsWith('..') || path.isAbsolute(path.relative(path.resolve(toolRoot), siteRoot))) errors.push('site_root must stay inside design-qa-fast-lane');
  if (siteRoot.startsWith(projectsRoot)) errors.push('site_root must not resolve inside projects');
  if (!fs.existsSync(siteRoot)) errors.push('site_root does not exist');

  const familyIds = new Set((input.families || []).map((family) => family.family_id));
  for (const route of input.routes || []) {
    if (!familyIds.has(route.family_id)) errors.push(`route ${route.url} references missing family ${route.family_id}`);
  }
  for (const family of input.families || []) {
    if (!input.routes?.some((route) => route.url === family.representative)) {
      errors.push(`family ${family.family_id} representative route missing`);
    }
  }

  return { ok: errors.length === 0, errors, siteRoot };
}

export function invalidInputResult(input, errors) {
  return {
    schema_version: 'dqf-result-0.1',
    run_id: input?.run_id || 'n.a.',
    phase: input?.phase || 'n.a.',
    tooling: { status: 'not_run', details: [] },
    routes: [],
    summary: {
      pass: 0,
      blocked_pending_classic: 0,
      promotion_required: 0,
      tooling_unavailable: 0,
      invalid_input: errors.length
    },
    exit_code: EXIT_CODES.invalid_input,
    exit_name: 'invalid_input',
    findings: errors.map((message) => ({
      rule: 'invalid_input',
      route: 'batch',
      viewport: 'n.a.',
      evidence: message
    }))
  };
}

export async function verifyBatch(input, options) {
  const routes = [];
  for (const route of input.routes) {
    const family = input.families.find((item) => item.family_id === route.family_id);
    routes.push(await verifyRoute(input, family, route, options));
  }
  const summary = summarize(routes);
  const exit = chooseExit(summary);
  return {
    schema_version: 'dqf-result-0.1',
    run_id: input.run_id,
    phase: input.phase,
    tooling: options.tooling,
    routes,
    summary,
    exit_code: EXIT_CODES[exit],
    exit_name: exit
  };
}

async function verifyRoute(input, family, route, options) {
  const findings = [];
  const assessmentMode = route.candidate_role === 'representative' ? 'direct' : 'family_coverage';
  const driver = options.driver;
  for (const viewport of input.viewports) {
    await driver.setViewport(viewport.width, viewport.height);
    await driver.goto(options.baseUrl + route.url);

    if (route.candidate_role === 'member') {
      const directOnly = await driver.count('body[data-direct-only="true"]');
      if (directOnly > 0) {
        findings.push(finding('direct_required_element_changed', route.url, viewport.id, 'route marked direct_only in rendered DOM'));
      }
    }

    const promotionTrigger = await driver.getAttribute('body', 'data-promotion-trigger');
    if (promotionTrigger) {
      findings.push(finding(promotionTrigger, route.url, viewport.id, `rendered route declares ${promotionTrigger}`));
    }

    findings.push(...await checkLandmarks(driver, family, route.url, viewport.id));
    findings.push(...await checkComponents(driver, family, route.url, viewport.id));
    findings.push(...await checkSlots(driver, family, route.url, viewport.id));
    findings.push(...await checkInteractions(driver, family, route.url, viewport.id));
    findings.push(...await checkViewportRules(driver, family, route.url, viewport.id));
  }

  const uniqueFindings = dedupeFindings(findings);
  const promotionRequired = uniqueFindings.some((item) => isPromotionFinding(item, family));
  const hasFailures = uniqueFindings.length > 0;
  const routeStatus = !hasFailures ? 'pass' : promotionRequired ? 'promotion_required' : 'blocked_pending_classic';
  const coverageStatus = assessmentMode === 'direct' ? 'n.a.' : routeStatus === 'pass' ? 'verified' : 'failed';
  return {
    url: route.url,
    family_id: route.family_id,
    assessment_mode: assessmentMode,
    // Structural checks cannot measure visual quality; critique is a separate procedure.
    visual_score: 'n.a.',
    coverage_status: coverageStatus,
    coverage_ref: assessmentMode === 'family_coverage' ? `${route.family_id}:${family.representative}:${input.run_id}` : 'n.a.',
    route_status: routeStatus,
    promotion_required: promotionRequired,
    findings: uniqueFindings
  };
}

async function checkLandmarks(driver, family, route, viewport) {
  const actual = await driver.evaluate(`Array.from(document.body.querySelectorAll('header, main, footer')).map((node) => node.tagName.toLowerCase())`);
  const expected = [...family.landmarks].sort((a, b) => a.order - b.order).filter((item) => item.required).map((item) => item.name);
  return arraysEqual(actual, expected) ? [] : [finding('landmark_order_changed', route, viewport, `expected ${expected.join('>')} got ${actual.join('>')}`)];
}

async function checkComponents(driver, family, route, viewport) {
  const findings = [];
  for (const component of family.components) {
    const count = await driver.count(`[data-component="${component.id}"]`);
    if (component.required && count < component.min_count) {
      findings.push(finding('component_missing', route, viewport, `${component.id} count ${count} below ${component.min_count}`));
    }
  }
  return findings;
}

async function checkSlots(driver, family, route, viewport) {
  const findings = [];
  for (const slot of family.slots) {
    const selector = `[data-component="${slot.component}"] [data-slot="${slot.slot}"], [data-component="${slot.component}"][data-slot="${slot.slot}"]`;
    const count = await driver.count(selector);
    if (slot.required && count === 0) {
      findings.push(finding(slot.component === 'hero' && slot.slot === 'media' ? 'direct_required_element_changed' : 'slot_missing', route, viewport, `${slot.component}.${slot.slot} missing`));
      continue;
    }
    if (slot.min_chars) {
      const text = (await driver.innerText(selector)).trim();
      if (text.length < slot.min_chars) {
        findings.push(finding('slot_density_failed', route, viewport, `${slot.component}.${slot.slot} chars ${text.length} below ${slot.min_chars}`));
      }
    }
    if (slot.min_items) {
      // Il selettore dello slot e una lista con virgola: concatenare il
      // discendente in coda lo applicherebbe solo all'ultima alternativa,
      // lasciando la prima a contare il contenitore invece degli item.
      const itemSelector = selector
        .split(',')
        .map((part) => `${part.trim()} [data-item]`)
        .join(', ');
      const itemCount = await driver.count(itemSelector);
      if (itemCount < slot.min_items) {
        findings.push(finding('slot_density_failed', route, viewport, `${slot.component}.${slot.slot} items ${itemCount} below ${slot.min_items}`));
      }
    }
  }
  return findings;
}

async function checkInteractions(driver, family, route, viewport) {
  const findings = [];
  for (const interaction of family.interactions) {
    if (interaction.viewport !== 'all' && interaction.viewport !== viewport) continue;
    if (interaction.id === 'nav_toggle') {
      if (await driver.count('[data-interaction="nav_toggle"]') === 0) {
        findings.push(finding('interaction_contract_changed', route, viewport, 'nav_toggle missing'));
        continue;
      }
      await driver.click('[data-interaction="nav_toggle"]');
      const expanded = await driver.getAttribute('[data-interaction="nav_toggle"]', 'aria-expanded');
      const navVisible = await driver.isVisible('[data-nav]');
      if (expanded !== 'true' || !navVisible) {
        findings.push(finding('viewport_rule_changed', route, viewport, `nav_toggle expanded=${expanded} visible=${navVisible}`));
      }
    }
    if (interaction.id === 'primary_cta_focus') {
      if (await driver.count('[data-interaction="primary_cta"]') === 0) {
        findings.push(finding('interaction_contract_changed', route, viewport, 'primary_cta missing'));
        continue;
      }
      await driver.focus('[data-interaction="primary_cta"]');
      const active = await driver.evaluate(`document.activeElement ? document.activeElement.getAttribute('data-interaction') : null`);
      if (active !== 'primary_cta') {
        findings.push(finding('interaction_contract_changed', route, viewport, `active interaction ${active || 'none'}`));
      }
    }
  }
  return findings;
}

async function checkViewportRules(driver, family, route, viewport) {
  const rules = family.viewport_rules?.[viewport] || [];
  const findings = [];
  for (const rule of rules) {
    if (rule === 'hero_media_visible') {
      const visible = await driver.isVisible('[data-component="hero"] [data-slot="media"]');
      if (!visible) findings.push(finding('direct_required_element_changed', route, viewport, 'hero media not visible'));
    }
    if (rule === 'no_horizontal_overflow') {
      const overflow = await driver.evaluate(`document.documentElement.scrollWidth > window.innerWidth + 1`);
      if (overflow) findings.push(finding('viewport_overflow', route, viewport, 'document scrollWidth exceeds viewport'));
    }
    if (rule === 'h1_wraps_without_overlap') {
      const ok = await driver.evaluate(`(() => { const node = document.querySelector('h1'); return !!node && node.getBoundingClientRect().width <= window.innerWidth; })()`);
      if (!ok) findings.push(finding('viewport_overflow', route, viewport, 'h1 width exceeds viewport'));
    }
    if (rule === 'nav_toggle_operable') {
      const expanded = await driver.getAttribute('[data-interaction="nav_toggle"]', 'aria-expanded');
      if (expanded !== 'true') findings.push(finding('viewport_rule_changed', route, viewport, `nav_toggle final expanded=${expanded}`));
    }
  }
  return findings;
}

function isPromotionFinding(item, family) {
  if (item.rule === 'landmark_order_changed') return false;
  return family.promotion_triggers.includes(item.rule);
}

function finding(rule, route, viewport, evidence) {
  return { rule, route, viewport, evidence };
}

function dedupeFindings(findings) {
  const seen = new Set();
  const out = [];
  for (const item of findings) {
    const key = `${item.rule}|${item.route}|${item.viewport}|${item.evidence}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(item);
  }
  return out.sort((a, b) => `${a.route}|${a.viewport}|${a.rule}|${a.evidence}`.localeCompare(`${b.route}|${b.viewport}|${b.rule}|${b.evidence}`));
}

function summarize(routes) {
  const summary = {
    pass: 0,
    blocked_pending_classic: 0,
    promotion_required: 0,
    tooling_unavailable: 0,
    invalid_input: 0
  };
  for (const route of routes) summary[route.route_status] += 1;
  return summary;
}

function chooseExit(summary) {
  if (summary.tooling_unavailable > 0) return 'tooling_unavailable';
  if (summary.promotion_required > 0) return 'promotion_required';
  if (summary.blocked_pending_classic > 0) return 'coverage_failed';
  return 'all_verified';
}

function arraysEqual(a, b) {
  return a.length === b.length && a.every((item, index) => item === b[index]);
}

function sortValue(value) {
  if (Array.isArray(value)) return value.map(sortValue);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.keys(value).sort().map((key) => [key, sortValue(value[key])]));
  }
  return value;
}
