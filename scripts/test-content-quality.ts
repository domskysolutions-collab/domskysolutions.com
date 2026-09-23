import assert from 'node:assert/strict';
import { checkContent, formatQualityReport, qualityExitCode, validDate, type QualityOptions } from '../src/content/quality';

const fixture = (slug = '/blog/example') => ({
  id: slug, slug, title: 'Example article', description: 'An approved example.', category: 'Guides',
  status: 'published', publishedAt: '2026-01-01', updatedAt: '2026-01-02', verifiedAt: '2026-09-23',
  relatedSlugs: ['/blog/other'], blocks: [{ type: 'paragraph', text: [
    'Useful context. '.repeat(80), { text: 'About', href: '/about' }, { text: 'Methods', href: '/methodology' },
  ] }],
});
const options: QualityOptions = { now: new Date('2026-09-23T23:59:59Z'), knownPaths: ['/about', '/methodology'], assetExists: src => src === '/images/exists.webp' };
const other = { ...fixture('/blog/other'), relatedSlugs: ['/blog/example'] };
const run = (change: Record<string, unknown> = {}) => checkContent([{ ...fixture(), ...change }, other], options);
const has = (change: Record<string, unknown>, code: string, severity: 'ERROR' | 'WARN') => assert(run(change).articles[0].issues.some(issue => issue.code === code && issue.severity === severity), code);
assert.equal(run().passed, 2);
assert.equal(qualityExitCode(run()), 0);
assert.match(formatQualityReport(run()), /PASS \/blog\/example/);
for (const field of ['title', 'slug', 'description', 'category']) has({ [field]: ' ' }, 'missing-' + field, 'ERROR');
has({ publishedAt: null }, 'missing-publishedAt', 'ERROR');
has({ updatedAt: null }, 'missing-updatedAt', 'WARN');
has({ verifiedAt: null }, 'missing-verifiedAt', 'WARN');
for (const field of ['publishedAt', 'updatedAt', 'verifiedAt']) for (const value of ['2026-02-30', '2025-02-29', 'yesterday', 123, '2026-09-23T12:00:00Z']) has({ [field]: value }, 'invalid-' + field, 'ERROR');
assert(validDate('2024-02-29'));
has({ updatedAt: '2025-01-01' }, 'date-order', 'ERROR');
has({ blocks: undefined }, 'missing-body', 'ERROR');
has({ blocks: [{ type: 'divider' }] }, 'missing-body', 'ERROR');
has({ blocks: [{ type: 'paragraph', text: 'Short.' }] }, 'short-body', 'WARN');
has({ title: 'x'.repeat(101) }, 'long-title', 'WARN');
has({ description: 'x'.repeat(301) }, 'long-description', 'WARN');
has({ featuredImageRequired: true, featuredImage: null }, 'required-image', 'ERROR');
has({ featuredImage: { src: '/images/missing.webp', alt: 'Cover' } }, 'image-reference', 'ERROR');
for (const field of ['featuredImage', 'ogImage']) has({ [field]: { src: '/images/exists.webp', alt: '' } }, 'image-alt', 'WARN');
has({ blocks: [{ type: 'image', image: { src: '/images/exists.webp' } }] }, 'image-alt', 'WARN');
has({ commercial: true }, 'affiliate-disclosure', 'WARN');
assert(!run({ commercial: true, affiliateDisclosureRequired: true }).articles[0].issues.some(issue => issue.code === 'affiliate-disclosure'));
assert(!run({ commercial: true, disclosure: 'Affiliate disclosure.' }).articles[0].issues.some(issue => issue.code === 'affiliate-disclosure'));
has({ blocks: [{ type: 'cta', href: 'https://example.com', affiliate: true }] }, 'affiliate-disclosure', 'WARN');
has({ relatedSlugs: ['/blog/missing'] }, 'broken-related', 'ERROR');
has({ relatedSlugs: ['/blog/example'] }, 'broken-related', 'ERROR');
const duplicate = checkContent([fixture(), fixture()], options);
assert.equal(duplicate.articles.filter(article => article.issues.some(issue => issue.code === 'duplicate-slug')).length, 2);
assert(checkContent([fixture()], { ...options, legacySlugs: ['/blog/example/'] }).errors > 0);
assert(checkContent([fixture(), { ...other, status: 'draft' }], options).articles[0].issues.some(issue => issue.code === 'broken-related'));
assert(checkContent([fixture(), { ...other, status: 'draft' }], options).articles[0].issues.some(issue => issue.code === 'incoming-related'));
const links = (hrefs: string[]) => [{ type: 'paragraph', text: hrefs.map(href => ({ text: 'Link', href })) }];
has({ blocks: links(['/missing']) }, 'broken-link', 'ERROR');
has({ blocks: links(['https://domskysolutions.com/missing']) }, 'broken-link', 'ERROR');
has({ blocks: links(['/blog/other#missing']) }, 'broken-anchor', 'ERROR');
has({ blocks: links(['#missing']) }, 'broken-anchor', 'ERROR');
assert(!run({ blocks: [{ type: 'heading', id: 'ok', text: 'Heading' }, ...links(['#ok', '/about#unexposed-static-anchor', 'https://example.com/missing'])] }).errors);
assert(!run({ blocks: links(['https://domskysolutions.com/about/?x=1', '/methodology/']) }).articles[0].issues.some(issue => issue.code === 'contextual-links'));
has({ blocks: [...links(['/about', '/about?utm=test']), { type: 'cta', href: '/methodology', text: 'CTA' }] }, 'contextual-links', 'WARN');
has({ verifiedAt: '2026-09-20', recommendedUpdateDays: 2 }, 'stale-verification', 'WARN');
assert(!run({ verifiedAt: '2026-09-21', recommendedUpdateDays: 2 }).articles[0].issues.some(issue => issue.code === 'stale-verification'));
has({ recommendedUpdateDays: 0 }, 'invalid-window', 'ERROR');
const invalid = checkContent([null, {}, { blocks: [null, {}] }], options);
assert.equal(invalid.articles.length, 3);
assert.equal(qualityExitCode(invalid), 1);
assert.equal(qualityExitCode(run({ updatedAt: null })), 0);
assert.match(formatQualityReport(run({ publishedAt: null })), /Articles checked: 2\nPassed: 1\nWarnings: 0\nErrors: 1/);
console.log('PASS content quality: required fields, calendar dates, duplicates, references, image requirements, disclosure, contextual/incoming links, maintenance thresholds, malformed input, output totals and exit status.');

