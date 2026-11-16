#!/usr/bin/env node
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { chromium } from '@playwright/test';
import { fileURLToPath } from 'node:url';
import {
  invalidInputResult,
  readJson,
  validateInput,
  verifyBatch,
  writeJson
} from '../lib/dqf-core.mjs';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const toolRoot = path.resolve(scriptDir, '..');
const [inputArg, outputArg] = process.argv.slice(2);

if (!inputArg || !outputArg) {
  console.error('Uso: node scripts/run-batch.mjs <input-json> <output-json>');
  process.exit(1);
}

const inputPath = path.resolve(process.cwd(), inputArg);
const outputPath = path.resolve(process.cwd(), outputArg);
const input = readJson(inputPath);
const validation = validateInput(input, inputPath, toolRoot);
if (!validation.ok) {
  writeJson(outputPath, invalidInputResult(input, validation.errors));
  process.exit(4);
}

class Driver {
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

const server = await startStaticServer(validation.siteRoot);
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
try {
  const driver = new Driver(page);
  const tooling = {
    status: 'available',
    details: [
      { capability: 'Server HTTP locale', tool: 'node:http', status: 'ok', evidence: server.baseUrl },
      { capability: 'Browser disponibile', tool: 'playwright:chromium', status: 'ok', evidence: 'headless browser disponibile' },
      { capability: 'DOM renderizzato interrogabile', tool: 'page.locator/evaluate', status: 'ok', evidence: 'DOM letto da batch script' },
      { capability: 'Viewport desktop/mobile', tool: 'page.setViewportSize', status: 'ok', evidence: 'viewports da input' },
      { capability: 'Output machine-readable scrivibile', tool: 'node:fs', status: 'ok', evidence: outputPath },
      { capability: 'Run deterministico', tool: 'json stable output', status: 'ok', evidence: 'da confrontare con batch ripetuti' }
    ]
  };
  const result = await verifyBatch(input, { driver, baseUrl: server.baseUrl, tooling });
  writeJson(outputPath, result);
  process.exitCode = result.exit_code ?? 0;
} finally {
  await page.close();
  await browser.close();
  await server.close();
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

function contentType(filePath) {
  if (filePath.endsWith('.css')) return 'text/css';
  if (filePath.endsWith('.js')) return 'text/javascript';
  if (filePath.endsWith('.json')) return 'application/json';
  if (filePath.endsWith('.svg')) return 'image/svg+xml';
  return 'text/html';
}
