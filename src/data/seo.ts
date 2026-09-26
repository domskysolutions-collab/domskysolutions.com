import { BLOG_POSTS } from './blogPosts';
import { getArticle } from '../content/registry';
import type { ArticleDocument } from '../content/types';
import { reviewCatalog, legacyReviewRedirects } from './reviewCatalog';
import { AUTHOR_NAME, PUBLISHER_NAME, SITE_URL } from './site';

export { SITE_URL } from './site';
export type PageSeo = { path: string; title: string; description: string; socialTitle?: string; socialDescription?: string; type?: 'article' | 'website'; review?: typeof reviewCatalog[number]; noindex?: boolean; article?: ArticleDocument };
const page = (path: string, title: string, description: string): PageSeo => ({ path, title: `${title} | Domsky Solutions`, description });
export const seoPages: PageSeo[] = [
  page('/', 'Independent AI Tool Reviews for Solopreneurs', 'Explore independent AI and SaaS reviews, practical workflows and free tools to choose software for your solo business.'),
  page('/reviews', 'AI & SaaS Reviews', 'Browse software reviews covering Claude, Cursor, Perplexity, Kit and Namecheap. Compare documented strengths, limitations and intended use cases.'),
  page('/tools', 'Free Tools Library', 'Four free browser utilities plus the Lean Stack Finder for prompts, content planning, cost audits and a careful first AI task.'),
  page('/blog', 'AI Workflows & Insights', `Practical articles on AI workflows, software costs, design and running a solo business, written by ${AUTHOR_NAME}.`),
  page('/comparisons', 'AI Tool Comparisons', 'Compare AI assistants side by side and explore their strengths, limitations and suitability for everyday work.'),
  page('/about', `About ${AUTHOR_NAME}`, `Meet ${AUTHOR_NAME}, the designer and PC enthusiast behind ${PUBLISHER_NAME}, and learn how AI assists with content production.`),
  page('/methodology', 'Review Methodology & Evidence', 'How to interpret testing disclosures, savings examples, source links, evidence limits and review dates.'),
  { ...page('/uses', 'A Lean Solo-Business Stack: What to Use, Keep and Skip', 'Choose a smaller software stack for writing, client work or a website. Keep useful tools, identify gaps and avoid overlapping subscriptions.'), title: getArticle('/uses')?.seoTitle || 'A Lean Solo-Business Stack: Use, Keep and Skip | Domsky', socialTitle: getArticle('/uses')?.socialTitle, socialDescription: getArticle('/uses')?.socialDescription, type: 'article' as const, article: getArticle('/uses') },
  page('/privacy', 'Privacy Policy', 'How Domsky Solutions handles newsletter information, analytics and your privacy choices.'),
  page('/disclaimer', 'Affiliate & Editorial Disclosure', 'Understand affiliate links, editorial opinions and the limitations of information on Domsky Solutions.'),
  ...[['saas-calculator', 'Software Stack Audit Calculator', 'Compare old, retained and replacement recurring software cash while keeping migration costs, external services and owner time separate.'], ['prompt-builder', 'Claude Prompt Builder', 'Create structured prompts for writing, research and other Claude tasks.'], ['content-calendar', '30-Day Content Calendar', 'Plan a month of content ideas without templates that invent experience or results.'], ['ai-readiness-quiz', 'AI Readiness Quiz', 'Choose a careful first AI task without receiving a stack or product recommendation.']].map(([slug, title, description]) => page(`/tools/${slug}`, title, description)),
  ...reviewCatalog.map(review => ({ ...page(review.link, `${review.name} Review`, `Explore ${review.name}: features, pricing considerations, strengths and limitations for solopreneurs. Read my editorial verdict and evidence disclosures.`), type: 'article' as const, review })),
  { ...page('/reviews/namecheap', 'Namecheap Review', 'An editorial look at Namecheap for domains and hosting, with practical considerations and affiliate disclosure.'), type: 'article' },
  ...BLOG_POSTS.filter(post => post.slug !== '/uses').map(post => {
    const article = getArticle(post.slug);
    return {
      ...page(post.slug, post.title, post.excerpt),
      ...(article?.seoTitle ? { title: article.seoTitle } : {}),
      ...(article?.socialTitle ? { socialTitle: article.socialTitle } : {}),
      ...(article?.socialDescription ? { socialDescription: article.socialDescription } : {}),
      type: 'article' as const,
      article,
    };
  }),
];

export function getPageSeo(pathname: string): PageSeo {
  const normalized = pathname.replace(/\/+$/, '') || '/';
  const path = legacyReviewRedirects[normalized] || normalized;
  return seoPages.find(page => page.path === path) || { ...page(normalized, 'Page not found', 'This page could not be found. Browse my reviews, free tools or blog.'), noindex: true };
}

export function getBreadcrumbs(meta: PageSeo) {
  const crumbs = [{ name: 'Home', path: '/' }];
  const parent = '/' + meta.path.split('/')[1];
  if (parent !== meta.path) {
    const parentPage = seoPages.find(p => p.path === parent);
    if (parentPage) crumbs.push({ name: parentPage.title.split(' | ')[0], path: parent });
  }
  if (meta.path !== '/') crumbs.push({ name: meta.title.split(' | ')[0], path: meta.path });
  return crumbs;
}

export function structuredData(meta: PageSeo) {
  const author = { '@type': 'Person', '@id': `${SITE_URL}/about#author`, name: AUTHOR_NAME, url: `${SITE_URL}/about` };
  const organization = { '@type': 'Organization', '@id': `${SITE_URL}/#organization`, name: PUBLISHER_NAME, url: SITE_URL, founder: { '@id': author['@id'] } };
  const graph: object[] = [author, organization];
  if (!meta.noindex) {
    graph.push({ '@type': 'WebPage', '@id': `${SITE_URL}${meta.path}#page`, url: `${SITE_URL}${meta.path}`, name: meta.title, description: meta.description, publisher: { '@id': organization['@id'] } });
    if (meta.path !== '/') graph.push({ '@type': 'BreadcrumbList', itemListElement: getBreadcrumbs(meta).map((crumb, index) => ({ '@type': 'ListItem', position: index + 1, name: crumb.name, item: SITE_URL + crumb.path })) });
    if (meta.type === 'article') graph.push({
      '@type': meta.review ? 'Review' : 'Article', '@id': `${SITE_URL}${meta.path}#article`, headline: meta.article?.title || meta.title.split(' | ')[0], description: meta.description,
      author: meta.article ? { '@type': meta.article.author.type, name: meta.article.author.name, url: new URL(meta.article.author.url, SITE_URL).href } : { '@id': author['@id'] }, publisher: { '@id': organization['@id'] }, mainEntityOfPage: `${SITE_URL}${meta.path}`,
      ...(meta.review ? { itemReviewed: { '@type': 'SoftwareApplication', name: meta.review.name, url: meta.review.externalLink } } : {}),
      ...(meta.article ? {
        ...(meta.article.publishedAt ? { datePublished: meta.article.publishedAt } : {}),
        ...(meta.article.updatedAt ? { dateModified: meta.article.updatedAt } : {}),
        articleSection: meta.article.category, keywords: meta.article.tags.join(', '),
        ...((meta.article.ogImage || meta.article.featuredImage) ? { image: new URL((meta.article.ogImage || meta.article.featuredImage)!.src, SITE_URL).href } : {}),
      } : {}),
      // Legacy publication days remain omitted until supplied; never infer them from migration time.
    });
  }
  return { '@context': 'https://schema.org', '@graph': graph };
}
export const escapeHtml = (value: string) => value.replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]!));
export function renderSeoHead(meta: PageSeo) {
  const url = SITE_URL + meta.path;
  const socialTitle = meta.socialTitle || meta.title;
  const socialDescription = meta.socialDescription || meta.description;
  const tags = [['name', 'description', meta.description], ['name', 'robots', meta.noindex ? 'noindex, follow' : 'index, follow'], ['property', 'og:title', socialTitle], ['property', 'og:description', socialDescription], ['property', 'og:url', url], ['property', 'og:type', meta.type || 'website'], ['property', 'twitter:title', socialTitle], ['property', 'twitter:description', socialDescription], ['property', 'twitter:url', url]];
  const image = meta.article?.ogImage || meta.article?.featuredImage;
  const imageUrl = new URL(image?.src || '/images/domsky-logo.png', SITE_URL).href;
  tags.push(['property', 'og:image', imageUrl], ['property', 'og:image:alt', image?.alt || 'Domsky Solutions'],
    ['name', 'twitter:card', image ? 'summary_large_image' : 'summary'], ['name', 'twitter:image', imageUrl],
    ['name', 'twitter:image:alt', image?.alt || 'Domsky Solutions']);
  if (meta.article) {
    if (meta.article.publishedAt) tags.push(['property', 'article:published_time', meta.article.publishedAt]);
    if (meta.article.updatedAt) tags.push(['property', 'article:modified_time', meta.article.updatedAt]);
    tags.push(['property', 'article:author', new URL(meta.article.author.url, SITE_URL).href], ['property', 'article:section', meta.article.category]);
    for (const tag of meta.article.tags) tags.push(['property', 'article:tag', tag]);
  }
  return `<title>${escapeHtml(meta.title)}</title>\n${tags.map(([attr, key, value]) => `<meta data-page-seo="true" ${attr}="${key}" content="${escapeHtml(value)}">`).join('\n')}\n${meta.noindex ? '' : `<link rel="canonical" href="${escapeHtml(url)}">`}\n<script id="page-schema" type="application/ld+json">${JSON.stringify(structuredData(meta)).replace(/</g, '\\u003c')}</script>`;
}
