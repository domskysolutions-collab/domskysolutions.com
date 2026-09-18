import fs from 'node:fs';
import path from 'node:path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { SiteRoutes } from '../src/App';
import { seoPages, getPageSeo, renderSeoHead, SITE_URL } from '../src/data/seo';
import { legacyReviewRedirects } from '../src/data/reviewCatalog';

const template = fs.readFileSync('dist/index.html', 'utf8');
if (!template.includes('<!--route-seo-->')) throw new Error('Missing SEO template marker');
const paths = [...new Set(seoPages.map(page => page.path))];
for (const route of [...paths, '/404']) {
  const meta = getPageSeo(route);
  const content = renderToString(<StaticRouter location={route}><SiteRoutes /></StaticRouter>).replace(/opacity:0(?=[;" ])/g, "opacity:1");
  const html = template.replace('<!--route-seo-->', renderSeoHead(meta)).replace('<div id="root"></div>', `<div id="root">${content}</div>`);
  const file = route === '/' ? 'dist/index.html' : path.join('dist', `${route.slice(1)}.html`);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
}
fs.writeFileSync('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map(route => `<url><loc>${SITE_URL}${route}</loc></url>`).join('')}</urlset>\n`);
fs.writeFileSync('dist/robots.txt', `User-agent: *\nAllow: /\nDisallow: /api/\nSitemap: ${SITE_URL}/sitemap.xml\n`);
// Vercel cleanUrls serves route.html directly; unknown routes receive the static 404.
const expected = { cleanUrls: true, trailingSlash: false, redirects: [...Object.entries(legacyReviewRedirects).map(([source, destination]) => ({ source, destination, permanent: true })), { source: '/stack-builder', destination: '/#stack-finder', permanent: true }] };
const actual = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
if (JSON.stringify(actual) !== JSON.stringify(expected)) throw new Error('vercel.json is out of sync with legacyReviewRedirects. Run tsx scripts/sync-routes.ts.');
console.log(`Prerendered ${paths.length} indexable routes and a noindex 404; generated sitemap.`);

