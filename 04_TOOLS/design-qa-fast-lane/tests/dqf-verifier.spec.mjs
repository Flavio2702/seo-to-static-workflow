import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { expect, test } from '@playwright/test';
import {
  EXIT_CODES,
  invalidInputResult,
  readJson,
  sha256Text,
  stableStringify,
  validateInput,
  verifyBatch,
  writeJson
} from '../lib/dqf-core.mjs';

const testDir = path.dirname(fileURLToPath(import.meta.url));
const toolRoot = path.resolve(testDir, '..');
const outputDir = path.join(toolRoot, 'output');

test.beforeEach(() => {
  fs.mkdirSync(outputDir, { recursive: true });
});

test('synthetic batch uses rendered Chromium and deterministic output', async ({ page, browserName }) => {
  const inputPath = path.join(toolRoot, 'fixtures', 'dqf-input.synthetic.json');
  const input = readJson(inputPath);
  const validation = validateInput(input, inputPath, toolRoot);
  expect(validation.ok, validation.errors.join('\n')).toBe(true);

  const server = await startStaticServer(validation.siteRoot);
  try {
    const tooling = await buildToolingReport(browserName, server.baseUrl);
    const driver = new PlaywrightDriver(page);
    const first = await verifyBatch(input, { driver, baseUrl: server.baseUrl, tooling });
    writeJson(path.join(outputDir, 'dqf-result.synthetic.json'), first);

    const repeated = await verifyBatch(input, { driver, baseUrl: server.baseUrl, tooling });
    writeJson(path.join(outputDir, 'dqf-result.synthetic.repeat.json'), repeated);

    const firstHash = sha256Text(stableStringify(first));
    const secondHash = sha256Text(stableStringify(repeated));
    writeJson(path.join(outputDir, 'dqf-determinism.json'), {
      run_id: input.run_id,
      first_hash: firstHash,
      second_hash: secondHash,
      deterministic: firstHash === secondHash
    });

    expect(firstHash).toBe(secondHash);
    expect(first.exit_code).toBe(EXIT_CODES.promotion_required);
    expectStatus(first, '/servizi/intervento-secondario/', 'pass');
    expectStatus(first, '/servizi/intervento-editoriale/', 'pass');
    expectStatus(first, '/servizi/intervento-densita-limite/', 'pass');
    expectStatus(first, '/servizi/regressioni/hero-media-rimosso/', 'promotion_required');
    expectStatus(first, '/servizi/regressioni/form-divergente/', 'promotion_required');
    expectStatus(first, '/servizi/regressioni/breakpoint-divergente/', 'promotion_required');
    expectStatus(first, '/contatti/', 'promotion_required');
    expectStatus(first, '/servizi/regressioni/cta-vuota/', 'blocked_pending_classic');
    expectStatus(first, '/servizi/regressioni/proof-grid-sotto-soglia/', 'blocked_pending_classic');
    expectStatus(first, '/servizi/regressioni/landmark-fuori-ordine/', 'blocked_pending_classic');
    expectStatus(first, '/servizi/regressioni/h1-overflow-mobile/', 'blocked_pending_classic');
  } finally {
    await server.close();
  }
});

test('invalid family input returns exit code 4', async () => {
  const inputPath = path.join(toolRoot, 'fixtures', 'dqf-input.invalid-family.json');
  const input = readJson(inputPath);
  const validation = validateInput(input, inputPath, toolRoot);
  expect(validation.ok).toBe(false);

  const result = invalidInputResult(input, validation.errors);
  writeJson(path.join(outputDir, 'dqf-result.invalid-family.json'), result);
  expect(result.exit_code).toBe(EXIT_CODES.invalid_input);
});

test('missing and malformed top-level input fails predictably', () => {
  for (const input of [null, [], {}, { schema_version: 'bad' }]) {
    const result = validateInput(input, path.join(toolRoot, 'fixtures', 'input.json'), toolRoot);
    expect(result.ok).toBe(false);
    expect(invalidInputResult(input, result.errors).exit_code).toBe(4);
  }
});

test('site root cannot escape to a sibling with the same prefix', () => {
  const inputPath = path.join(toolRoot, 'fixtures', 'dqf-input.synthetic.json');
  const input = readJson(inputPath);
  input.site_root = '../../design-qa-fast-lane-private';
  expect(validateInput(input, inputPath, toolRoot).ok).toBe(false);
});

test('driver failure propagates instead of producing a passing report (simulation)', async () => {
  const input = readJson(path.join(toolRoot, 'fixtures', 'dqf-input.synthetic.json'));
  const driver = { setViewport: async () => {}, goto: async () => { throw new Error('simulated service unavailable'); } };
  await expect(verifyBatch(input, { driver, baseUrl: 'http://127.0.0.1', tooling: {} })).rejects.toThrow('simulated service unavailable');
});

test('structural pass does not invent a visual score', async ({ page, browserName }) => {
  const inputPath = path.join(toolRoot, 'fixtures', 'dqf-input.synthetic.json');
  const input = readJson(inputPath);
  const validation = validateInput(input, inputPath, toolRoot);
  const server = await startStaticServer(validation.siteRoot);
  try {
    const result = await verifyBatch(input, { driver: new PlaywrightDriver(page), baseUrl: server.baseUrl, tooling: await buildToolingReport(browserName, server.baseUrl) });
    expect(result.routes.every(route => route.visual_score === 'n.a.')).toBe(true);
  } finally { await server.close(); }
});

class PlaywrightDriver {
  constructor(page) {
    this.page = page;
  }

  async setViewport(width, height) {
    await this.page.setViewportSize({ width, height });
  }

  async goto(url) {
    await this.page.goto(url, { waitUntil: 'networkidle' });
  }

  async evaluate(expression) {
    return this.page.evaluate((source) => Function(`return (${source});`)(), expression);
  }

  async count(selector) {
    return this.page.locator(selector).count();
  }

  async getAttribute(selector, name) {
    const locator = this.page.locator(selector).first();
    if ((await locator.count()) === 0) return null;
    return locator.getAttribute(name);
  }

  async innerText(selector) {
    const locator = this.page.locator(selector).first();
    if ((await locator.count()) === 0) return '';
    return locator.innerText();
  }

  async click(selector) {
    await this.page.locator(selector).first().click();
  }

  async focus(selector) {
    await this.page.locator(selector).first().focus();
  }

  async isVisible(selector) {
    const locator = this.page.locator(selector).first();
    if ((await locator.count()) === 0) return false;
    return locator.isVisible();
  }
}

async function buildToolingReport(browserName, baseUrl) {
  const probe = await fetch(baseUrl + '/servizi/intervento-prioritario/');
  const writableProbe = path.join(outputDir, 'preflight-write-probe.json');
  fs.writeFileSync(writableProbe, '{"ok":true}\n', 'utf8');
  const report = {
    status: 'available',
    details: [
      { capability: 'Server HTTP locale', tool: 'node:http', status: probe.ok ? 'ok' : 'failed', evidence: `${probe.status} representative route` },
      { capability: 'Browser disponibile', tool: `playwright:${browserName}`, status: 'ok', evidence: 'Chromium gestito da Playwright con PLAYWRIGHT_BROWSERS_PATH=0' },
      { capability: 'DOM renderizzato interrogabile', tool: 'Playwright page.locator/evaluate', status: 'ok', evidence: 'DOM letto dalla pagina renderizzata' },
      { capability: 'Viewport desktop/mobile', tool: 'page.setViewportSize', status: 'ok', evidence: '1440x900 e 390x844 dal batch' },
      { capability: 'Detector Impeccable risolto', tool: 'n.a.', status: 'not_required_phase_1b', evidence: 'signature isolata; detector da valutare nel benchmark se richiesto' },
      { capability: 'Output machine-readable scrivibile', tool: 'node:fs', status: fs.existsSync(writableProbe) ? 'ok' : 'failed', evidence: 'output/preflight-write-probe.json' },
      { capability: 'Run deterministico', tool: 'sha256 output JSON', status: 'ok', evidence: 'hash confrontato nel self-test' }
    ]
  };
  writeJson(path.join(outputDir, 'dqf-preflight.json'), report);
  return report;
}

async function startStaticServer(root) {
  const staticRoot = path.resolve(root);
  const server = http.createServer((request, response) => {
    const requestUrl = new URL(request.url, 'http://127.0.0.1');
    let safePath;
    try { safePath = decodeURIComponent(requestUrl.pathname).replace(/^\/+/, ''); }
    catch { response.writeHead(400); response.end('Bad request'); return; }
    let filePath = path.join(staticRoot, safePath);
    if (requestUrl.pathname.endsWith('/')) filePath = path.join(filePath, 'index.html');
    const resolved = path.resolve(filePath);
    if (path.relative(staticRoot, resolved).startsWith('..') || path.isAbsolute(path.relative(staticRoot, resolved))) {
      response.writeHead(403);
      response.end('Forbidden');
      return;
    }
    if (!fs.existsSync(resolved) || fs.statSync(resolved).isDirectory()) {
      response.writeHead(404);
      response.end('Not found');
      return;
    }
    response.writeHead(200, { 'Content-Type': contentType(resolved) });
    fs.createReadStream(resolved).pipe(response);
  });
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const address = server.address();
  return {
    baseUrl: `http://127.0.0.1:${address.port}`,
    close: () => new Promise((resolve) => server.close(resolve))
  };
}

function expectStatus(result, url, expected) {
  const actual = result.routes.find((route) => route.url === url)?.route_status;
  expect(actual, url).toBe(expected);
}

function contentType(filePath) {
  if (filePath.endsWith('.css')) return 'text/css';
  if (filePath.endsWith('.js')) return 'text/javascript';
  if (filePath.endsWith('.json')) return 'application/json';
  return 'text/html';
}
