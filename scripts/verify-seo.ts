import assert from 'node:assert/strict';
import fs from 'node:fs';
import { seoPages, SITE_URL, getPageSeo, structuredData, escapeHtml } from '../src/data/seo';
import { legacyReviewRedirects, reviewCatalog, reviewCount } from '../src/data/reviewCatalog';

const paths = new Set(seoPages.map(page => page.path));
assert.equal(paths.size, seoPages.length, 'Duplicate route metadata');
const titles = new Set<string>();
const descriptions = new Set<string>();
for (const meta of seoPages) {
  assert(!titles.has(meta.title), `Duplicate title: ${meta.path}`); titles.add(meta.title);
  assert(!descriptions.has(meta.description), `Duplicate description: ${meta.path}`); descriptions.add(meta.description);
  const html = fs.readFileSync(meta.path === '/' ? 'dist/index.html' : `dist${meta.path}.html`, 'utf8');
  assert.equal((html.match(/rel="canonical"/g) || []).length, 1, meta.path);
  assert(html.includes(`href="${SITE_URL}${meta.path}"`));
  assert(html.includes(`<title>${escapeHtml(meta.title)}</title>`));
  assert(html.includes(`property="og:url" content="${SITE_URL}${meta.path}"`));
  assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, `One H1: ${meta.path}`);
  const schema = JSON.parse(html.match(/<script id="page-schema" type="application\/ld\+json">([\s\S]*?)<\/script>/)![1]);
  assert.deepEqual(schema, structuredData(meta));
  if (meta.article) {
    const article = meta.article;
    const expectedImage = article.ogImage || article.featuredImage;
    const imagePath = expectedImage?.src || '/images/domsky-logo.png';
    assert(fs.existsSync('public' + imagePath), 'Missing article social image');
    assert(html.includes('property="og:image" content="' + SITE_URL + imagePath + '"'));
    assert.equal((html.match(/property="og:image"/g) || []).length, 1);
    assert(html.includes(escapeHtml(article.title)), 'Article title missing from output');
    for (const block of article.blocks) {
      if (block.type === 'heading' || block.type === 'sources') assert(html.includes('id="' + block.id + '"'), 'Missing content anchor');
    }
    if (article.updatedAt) assert(html.includes('property="article:modified_time" content="' + article.updatedAt + '"'));
  }
  assert(!html.includes('Tool not found'), meta.path);
  for (const match of html.matchAll(/href="(\/[^"?#]*)(?:[?#][^"]*)?"/g)) {
    const link = match[1];
    if (/\.[a-z0-9]+$/i.test(link) || link.startsWith('/assets/')) continue;
    assert(paths.has(link), `Broken or legacy internal link ${link} on ${meta.path}`);
  }
}
const sitemap = fs.readFileSync('dist/sitemap.xml', 'utf8');
for (const meta of seoPages) {
  assert(sitemap.includes('<loc>' + SITE_URL + meta.path + '</loc>'), 'Missing sitemap URL');
  const modified = meta.article?.updatedAt || meta.article?.publishedAt;
  if (modified) assert(sitemap.includes('<loc>' + SITE_URL + meta.path + '</loc><lastmod>' + modified + '</lastmod>'));
}
for (const [from, to] of Object.entries(legacyReviewRedirects)) {
  assert(paths.has(to)); assert(!paths.has(from)); assert(!sitemap.includes(`<loc>${SITE_URL}${from}</loc>`));
  assert.equal(getPageSeo(from).path, to);
}
assert.equal(reviewCount, reviewCatalog.length + 2);
assert.equal(getPageSeo('/reviews/claude').review?.bestRating, 5);
assert.equal(getPageSeo('/reviews/jasper').review?.bestRating, 10);
assert(getPageSeo('/reviews/nonexistent').noindex);
const notFound = fs.readFileSync('dist/404.html', 'utf8');
assert(notFound.includes('noindex, follow')); assert(!notFound.includes('rel="canonical"'));
console.log(`Verified metadata, schema, H1s and internal links across ${paths.size} routes; ${Object.keys(legacyReviewRedirects).length} redirects; noindex 404.`);


