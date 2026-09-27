import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { publishedArticles } from '../src/content/registry';

type Size = { width: number; height: number };

function jpegSize(buffer: Buffer): Size {
  assert.equal(buffer[0], 0xff, 'Invalid JPEG marker');
  assert.equal(buffer[1], 0xd8, 'Invalid JPEG header');
  let offset = 2;
  while (offset < buffer.length) {
    while (buffer[offset] === 0xff) offset++;
    const marker = buffer[offset++];
    if (marker === 0xd8 || marker === 0xd9) continue;
    const length = buffer.readUInt16BE(offset);
    assert(length >= 2, 'Invalid JPEG segment');
    if ([0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf].includes(marker)) {
      return { height: buffer.readUInt16BE(offset + 3), width: buffer.readUInt16BE(offset + 5) };
    }
    offset += length;
  }
  throw new Error('JPEG dimensions not found');
}

function imageSize(filename: string): Size {
  const extension = path.extname(filename).toLowerCase();
  if (extension === '.svg') {
    const source = fs.readFileSync(filename, 'utf8');
    const width = Number(source.match(/<svg[^>]*\bwidth=["']([0-9.]+)/i)?.[1]);
    const height = Number(source.match(/<svg[^>]*\bheight=["']([0-9.]+)/i)?.[1]);
    if (width > 0 && height > 0) return { width, height };
    const viewBox = source.match(/<svg[^>]*\bviewBox=["'][^"']*?([0-9.]+)\s+([0-9.]+)["']/i);
    assert(viewBox, `SVG needs width/height or viewBox: ${filename}`);
    return { width: Number(viewBox[1]), height: Number(viewBox[2]) };
  }
  const buffer = fs.readFileSync(filename);
  if (extension === '.png') return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
  if (extension === '.jpg' || extension === '.jpeg') return jpegSize(buffer);
  if (extension === '.webp' && buffer.toString('ascii', 12, 16) === 'VP8X') {
    return { width: 1 + buffer.readUIntLE(24, 3), height: 1 + buffer.readUIntLE(27, 3) };
  }
  throw new Error(`Unsupported image format in presentation test: ${filename}`);
}

const checked = new Set<string>();
for (const article of publishedArticles) {
  for (const [label, image] of [['featured', article.featuredImage], ['Open Graph', article.ogImage]] as const) {
    if (!image) continue;
    assert(image.alt.trim(), `${article.slug} ${label} image needs alt text`);
    assert(image.width && image.height, `${article.slug} ${label} image needs declared dimensions`);
    const filename = path.join('public', image.src);
    assert(fs.existsSync(filename), `${article.slug} ${label} image is missing: ${image.src}`);
    if (!checked.has(image.src)) {
      assert.deepEqual(imageSize(filename), { width: image.width, height: image.height }, `Declared dimensions differ from ${image.src}`);
      checked.add(image.src);
    }
  }
}

const source = (filename: string) => fs.readFileSync(filename, 'utf8');
const home = source('src/pages/HomePage.tsx');
const navbar = source('src/components/Navbar.tsx');
const runtimeSources = ['src/pages/blog/BlogPost6.tsx', 'src/pages/HomePage.tsx'].map(source).join('\n');
assert(!home.includes('/blog/you-dont-need-to-be-technical-to-use-ai'), 'Homepage must not promote DCE-01');
assert(home.includes('to="/reviews"') && home.includes('View all reviews'), 'Homepage review CTA must open the reviews index');
assert(home.includes('aria-label="Popular tool comparison"') && home.includes('scope="col"') && home.includes('scope="row"'), 'Homepage table needs an accessible scroll region and semantic headers');
assert(navbar.includes("['/uses','Lean Stack']"), '/uses must remain in persistent navigation');
assert(!runtimeSources.includes('Screenshot Placeholder'), 'Unfinished screenshot placeholder remains in a rendered page');

function luminance(hex: string) {
  const values = hex.match(/../g)!.map(value => parseInt(value, 16) / 255).map(value => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4);
  return 0.2126 * values[0] + 0.7152 * values[1] + 0.0722 * values[2];
}
function contrast(foreground: string, background: string) {
  const values = [luminance(foreground), luminance(background)].sort((a, b) => b - a);
  return (values[0] + 0.05) / (values[1] + 0.05);
}
for (const [foreground, background] of [['F97316', '0F0A05'], ['F97316', '1C0F05'], ['FB923C', '0F0A05'], ['A8A29E', '0F0A05'], ['A8A29E', '1C0F05'], ['FEF3C7', '0F0A05']]) {
  assert(contrast(foreground, background) >= 4.5, `Palette contrast fails WCAG AA: #${foreground} on #${background}`);
}

const css = source('src/index.css');
assert(css.includes(':focus-visible') && css.includes('@media print'), 'Global visible-focus and print rules are required');
console.log(`PASS presentation: ${checked.size} structured image assets, semantic tables, persistent navigation, placeholder removal, focus, print and palette contrast.`);
