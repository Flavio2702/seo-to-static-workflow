#!/usr/bin/env node
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { chromium } from '@playwright/test';

const [siteRootArg, outputDirArg, runTs, routesArg] = process.argv.slice(2);
if (!siteRootArg || !outputDirArg || !runTs || !routesArg) {
  console.error('Uso: node scripts/capture-site.mjs <site-root> <output-dir> <run-ts> <routes-json>');
  process.exit(1);
}

const siteRoot = path.resolve(process.cwd(), siteRootArg);
const outputDir = path.resolve(process.cwd(), outputDirArg);
const routes = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), routesArg), 'utf8'));
fs.mkdirSync(outputDir, { recursive: true });

const server = await startStaticServer(siteRoot);
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
try {
  const preflight = {
    run_ts: runTs,
    base_url: server.baseUrl,
    browser: 'playwright:chromium',
    routes: []
  };
  for (const route of routes) {
    const slug = route.slug;
    const url = server.baseUrl + route.url;
    for (const viewport of [
      { id: 'desktop', width: 1440, height: 900 },
      { id: 'mobile', width: 390, height: 844 }
    ]) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto(url, { waitUntil: 'networkidle' });
      await page.evaluate(() => window.scrollTo(0, 0));
      const title = await page.title();
      preflight.routes.push({ url: route.url, viewport: viewport.id, title });
      const filePath = path.join(outputDir, `${runTs}_${slug}_qa_${viewport.id}_full-page.png`);
      await page.screenshot({ path: filePath, fullPage: true });
    }
  }
  fs.writeFileSync(path.join(outputDir, `${runTs}_render-preflight.json`), JSON.stringify(preflight, null, 2) + '\n', 'utf8');
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
