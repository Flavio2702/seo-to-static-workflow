import { test, expect } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..', 'demo/site');
let server, base;
test.beforeAll(async () => {
  server = http.createServer((req, res) => {
    let name;
    try { name = decodeURIComponent(new URL(req.url, 'http://localhost').pathname); }
    catch { res.writeHead(400); res.end(); return; }
    const file = path.resolve(root, '.' + name, name.endsWith('/') ? 'index.html' : '');
    if (!file.startsWith(root + path.sep) || !fs.existsSync(file) || !fs.statSync(file).isFile()) {
      res.writeHead(404); res.end(); return;
    }
    res.setHeader('Content-Type', file.endsWith('.css') ? 'text/css' : 'text/html; charset=utf-8');
    fs.createReadStream(file).pipe(res);
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  base = `http://127.0.0.1:${server.address().port}`;
});
test.afterAll(async () => { if (server) await new Promise(resolve => server.close(resolve)); });

for (const width of [1440, 390]) {
  for (const slug of ['', 'rilegatura-quaderni', 'riparazione-libri', 'richiesta']) {
    test(`demo ${slug || 'home'} ${width}: layout, keyboard, navigation and no external requests`, async ({ page }, info) => {
      const errors = [], remote = [], failed = [];
      page.on('pageerror', error => errors.push(error.message));
      page.on('request', req => { if (!req.url().startsWith(base + '/')) remote.push(req.url()); });
      page.on('response', response => { if (response.status() >= 400) failed.push(response.status()); });
      await page.setViewportSize({ width, height: 960 });
      const response = await page.goto(base + '/' + (slug ? slug + '/' : ''));
      expect(response.status()).toBe(200);
      await expect(page.locator('h1')).toHaveCount(1);
      await expect(page.locator('main')).toHaveCount(1);
      await expect(page.locator('nav[aria-label="Navigazione principale"] a')).toHaveCount(4);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      await page.keyboard.press('Tab');
      await expect(page.locator('.skip')).toBeFocused();
      await page.keyboard.press('Enter');
      expect(new URL(page.url()).hash).toBe('#main');
      await page.locator('.button').focus();
      expect(await page.locator('.button').evaluate(e => getComputedStyle(e).outlineStyle)).not.toBe('none');
      // Contrast from the actual rendered tokens, not a visual estimate.
      const contrast = await page.evaluate(() => {
        const rgb = s => s.match(/[\d.]+/g).slice(0, 3).map(Number).map(v => { v /= 255; return v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4; });
        const lum = s => { const [r,g,b] = rgb(s); return .2126*r+.7152*g+.0722*b; };
        const ratio = (a,b) => (Math.max(a,b)+.05)/(Math.min(a,b)+.05);
        const body = getComputedStyle(document.body), intro = getComputedStyle(document.querySelector('.intro')), button = getComputedStyle(document.querySelector('.button'));
        return [ratio(lum(body.color),lum(body.backgroundColor)),ratio(lum(intro.color),lum(body.backgroundColor)),ratio(lum(button.color),lum(button.backgroundColor))];
      });
      expect(Math.min(...contrast)).toBeGreaterThanOrEqual(4.5);
      await page.locator('.brand').focus();
      await page.screenshot({ path: info.outputPath(`${slug || 'home'}-${width}.png`), fullPage: true });
      await page.locator('header nav a').last().click();
      await expect(page).toHaveURL(base + '/richiesta/');
      expect(errors).toEqual([]); expect(remote).toEqual([]); expect(failed).toEqual([]);
    });
  }
}
