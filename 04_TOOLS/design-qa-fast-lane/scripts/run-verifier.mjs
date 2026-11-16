#!/usr/bin/env node
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const toolRoot = path.resolve(scriptDir, '..');
const args = process.argv.slice(2);

if (!args.includes('--self-test') && args.length !== 0) {
  console.error('Uso: node scripts/run-verifier.mjs --self-test');
  process.exit(1);
}

const result = spawnSync(process.execPath, [path.join(toolRoot, 'node_modules', '@playwright', 'test', 'cli.js'), 'test', '--config=playwright.config.mjs'], {
  cwd: toolRoot,
  stdio: 'inherit',
  shell: false,
  env: process.env
});
process.exit(result.status ?? 1);
