import assert from 'node:assert/strict';
import fs from 'node:fs';
import { seoPages, SITE_URL, getPageSeo, structuredData, escapeHtml } from '../src/data/seo';
import { legacyReviewRedirects, reviewCatalog, reviewCount } from '../src/data/reviewCatalog';
import { ALTERNATE_HOST, AUTHOR_NAME, PUBLISHER_NAME } from '../src/data/site';

const dcePaths = [
  '/comparisons/claude-vs-chatgpt-vs-gemini-2026',
  '/comparisons/chatgpt-astra-vs-alternatives',
  '/reviews/convertkit',
  '/comparisons/kit-vs-mailerlite-vs-beehiiv',
  '/blog/ai-daily-workflow-solo-business',
  '/blog/replaced-saas-stack-with-ai-tools',
  '/uses',
] as const;

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
  assert.equal((html.match(/<title>/g) || []).length, 1, `One title: ${meta.path}`);
  assert(html.includes(`<title>${escapeHtml(meta.title)}</title>`));
  assert.equal((html.match(/name="description"/g) || []).length, 1, `One description: ${meta.path}`);
  assert(html.includes(`name="description" content="${escapeHtml(meta.description)}"`));
  assert(html.includes(`property="og:url" content="${SITE_URL}${meta.path}"`));
  assert(html.includes(`property="twitter:url" content="${SITE_URL}${meta.path}"`));
  assert(!html.includes(`https://${ALTERNATE_HOST}`), `Alternate host leaked into ${meta.path}`);
  assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, `One H1: ${meta.path}`);
  const schema = JSON.parse(html.match(/<script id="page-schema" type="application\/ld\+json">([\s\S]*?)<\/script>/)![1]);
  assert.deepEqual(schema, structuredData(meta));
  const person = schema['@graph'].find((entry: Record<string, unknown>) => entry['@type'] === 'Person');
  const publisher = schema['@graph'].find((entry: Record<string, unknown>) => entry['@type'] === 'Organization');
  const webPage = schema['@graph'].find((entry: Record<string, unknown>) => entry['@type'] === 'WebPage');
  assert.equal(person?.name, AUTHOR_NAME, `Author identity: ${meta.path}`);
  assert.equal(person?.['@id'], `${SITE_URL}/about#author`, `Author ID: ${meta.path}`);
  assert.equal(publisher?.name, PUBLISHER_NAME, `Publisher identity: ${meta.path}`);
  assert.equal(publisher?.['@id'], `${SITE_URL}/#organization`, `Publisher ID: ${meta.path}`);
  assert.equal(webPage?.url, `${SITE_URL}${meta.path}`, `WebPage URL: ${meta.path}`);
  if (meta.article) {
    const article = meta.article;
    const expectedImage = article.ogImage || article.featuredImage;
    const imagePath = expectedImage?.src || '/images/domsky-logo.png';
    assert(fs.existsSync('public' + imagePath), 'Missing article social image');
    assert(html.includes('property="og:image" content="' + SITE_URL + imagePath + '"'));
    assert.equal((html.match(/property="og:image"/g) || []).length, 1);
    assert(html.includes(escapeHtml(article.title)), 'Article title missing from output');
    assert(html.includes(escapeHtml(AUTHOR_NAME)), 'Approved article byline missing from output');
    assert.equal(article.author.name, AUTHOR_NAME, `Structured author name: ${meta.path}`);
    assert.equal(article.author.type, 'Person', `Structured author type: ${meta.path}`);
    for (const block of article.blocks) {
      if (block.type === 'heading' || block.type === 'sources') assert(html.includes('id="' + block.id + '"'), 'Missing content anchor');
    }
    if (article.publishedAt) assert(html.includes('property="article:published_time" content="' + article.publishedAt + '"'));
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
const robots = fs.readFileSync('dist/robots.txt', 'utf8');
assert(!fs.existsSync('public/sitemap.xml'), 'Sitemap must only be generated at build time');
assert(!fs.existsSync('public/robots.txt'), 'Robots file must only be generated at build time');
assert(!sitemap.includes(ALTERNATE_HOST), 'Alternate host in generated sitemap');
assert.equal(robots, `User-agent: *\nAllow: /\nDisallow: /api/\nSitemap: ${SITE_URL}/sitemap.xml\n`);
for (const meta of seoPages) {
  assert(sitemap.includes('<loc>' + SITE_URL + meta.path + '</loc>'), 'Missing sitemap URL');
  const modified = meta.article?.updatedAt || meta.article?.publishedAt;
  if (modified) assert(sitemap.includes('<loc>' + SITE_URL + meta.path + '</loc><lastmod>' + modified + '</lastmod>'));
}
for (const path of dcePaths) {
  const meta = getPageSeo(path);
  assert(meta.article, `Missing structured DCE article: ${path}`);
  const html = fs.readFileSync(`dist${path}.html`, 'utf8');
  const schema = JSON.parse(html.match(/<script id="page-schema" type="application\/ld\+json">([\s\S]*?)<\/script>/)![1]);
  const types = schema['@graph'].map((entry: Record<string, unknown>) => entry['@type']);
  assert(types.includes('WebPage'), `Missing WebPage schema: ${path}`);
  assert(types.includes('Article'), `Missing Article schema: ${path}`);
  assert(types.includes('BreadcrumbList'), `Missing BreadcrumbList schema: ${path}`);
  const articleSchema = schema['@graph'].find((entry: Record<string, unknown>) => entry['@type'] === 'Article');
  assert.deepEqual(articleSchema.author, { '@type': 'Person', name: AUTHOR_NAME, url: `${SITE_URL}/about` }, `Article author identity: ${path}`);
  assert.deepEqual(articleSchema.publisher, { '@id': `${SITE_URL}/#organization` }, `Article publisher reference: ${path}`);
  assert.equal(articleSchema.datePublished, meta.article.publishedAt, `Published date source: ${path}`);
  assert.equal(articleSchema.dateModified, meta.article.updatedAt, `Modified date source: ${path}`);
}
for (const [from, to] of Object.entries(legacyReviewRedirects)) {
  assert(paths.has(to)); assert(!paths.has(from)); assert(!sitemap.includes(`<loc>${SITE_URL}${from}</loc>`));
  assert.equal(getPageSeo(from).path, to);
}
assert.equal(reviewCount, reviewCatalog.length + 2);
for (const review of reviewCatalog) {
  assert(!('rating' in review), `Visible review rating data returned: ${review.link}`);
  assert(!('bestRating' in review), `Review rating scale returned: ${review.link}`);
  const schema = structuredData(getPageSeo(review.link));
  const serialized = JSON.stringify(schema);
  assert(!serialized.includes('reviewRating'), `Review rating leaked into schema: ${review.link}`);
  assert(!serialized.includes('AggregateRating'), `Aggregate rating leaked into schema: ${review.link}`);
}
assert(getPageSeo('/reviews/nonexistent').noindex);
const notFound = fs.readFileSync('dist/404.html', 'utf8');
assert(notFound.includes('noindex, follow')); assert(!notFound.includes('rel="canonical"'));
const vercel = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
assert.deepEqual(vercel.redirects[0], {
  source: '/:path*',
  has: [{ type: 'host', value: ALTERNATE_HOST }],
  destination: `${SITE_URL}/:path*`,
  permanent: true,
});
console.log(`Verified metadata, schema, H1s and internal links across ${paths.size} routes; ${Object.keys(legacyReviewRedirects).length} redirects; noindex 404.`);


