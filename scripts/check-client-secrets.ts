import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const privateNames = ['GEMINI_API_KEY', 'ANTHROPIC_API_KEY', 'CONVERTKIT_API_KEY', 'CONVERTKIT_FORM_ID', 'CONVERTKIT_NEWSLETTER_TAG_ID', 'KIT_STACK_FORM_ID', 'KIT_STACK_TAG_IDS'];
const files: string[] = [];
function walk(directory: string) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const filename = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(filename);
    else if (/\.(?:html|js|css|map|json)$/i.test(entry.name)) files.push(filename);
  }
}
assert(fs.existsSync('dist'), 'Build output is missing.');
walk('dist');
const assets = files.map(filename => fs.readFileSync(filename, 'utf8')).join('\n');
for (const name of privateNames) assert(!assets.includes(name), `Private environment-variable name bundled into client assets: ${name}`);
for (const name of privateNames) {
  const value = process.env[name];
  if (value && value.length >= 6) assert(!assets.includes(value), `A configured private value was bundled into client assets (${name}).`);
}
const vite = fs.readFileSync('vite.config.ts', 'utf8');
assert(!vite.includes('GEMINI_API_KEY') && !vite.includes('loadEnv') && !vite.includes('define:'), 'Vite must not replace private server environment variables in browser code.');
console.log(`PASS client secret scan: ${files.length} built assets contain no known private names or configured values.`);
