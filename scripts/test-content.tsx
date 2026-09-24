import assert from 'node:assert/strict';
import fs from 'node:fs';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { ArticlePage } from '../src/components/article/ArticlePage';
import { articles, getArticle, getRelatedArticles, selectPublished } from '../src/content/registry';
import { legacyArticles } from '../src/content/legacy';
import { validateContent } from '../src/content/validate';
import { getPageSeo, renderSeoHead, structuredData, seoPages } from '../src/data/seo';
import type { ArticleDocument } from '../src/content/types';

const article = articles[0];
const routes = seoPages.filter(page => !page.article && !legacyArticles.some(item => item.slug === page.path)).map(page => page.path);
const validate = (items: ArticleDocument[]) => validateContent(items, legacyArticles, routes, src => fs.existsSync('public' + src));
assert.deepEqual(validate(articles).errors, []);
const clone = (): ArticleDocument => structuredClone(article);
const reject = (change: (value: ArticleDocument) => void, pattern: RegExp) => {
  const value = clone(); change(value);
  assert.match(validate([value]).errors.join('\n'), pattern);
};
assert.match(validate([article, article]).errors.join('\n'), /duplicate/i);
reject(value => { value.slug = '/blog/you-dont-need-to-be-technical-to-use-ai'; }, /slug/);
reject(value => { value.updatedAt = '2026-02-30'; }, /Invalid updatedAt/);
reject(value => { value.verificationPending = ['Price needs verification']; }, /Unresolved verification/);
reject(value => { value.blocks.push({ type:'image', image:{src:'/images/missing.webp',alt:''} }); }, /alt text/);
reject(value => { value.blocks.push({ type:'paragraph', text:[{text:'Unsafe',href:'javascript:alert(1)'}] }); }, /HTTPS/);
reject(value => { value.blocks.push({ type:'paragraph', text:[{text:'Unknown',href:'/blog/missing'}] }); }, /Unknown internal/);
reject(value => { value.blocks.push({ type:'cta',title:'Offer',text:'Example',label:'Visit',href:'https://example.com/',affiliate:true }); }, /requires disclosure/);
reject(value => { value.relatedSlugs = [value.slug]; }, /related article/);
reject(value => { value.blocks.push({type:'heading',id:'short-answer',level:2,text:'Duplicate'}); }, /duplicate anchor/);
reject(value => { value.blocks.push({type:'table',caption:'Example',columns:['A','B'],rows:[['One']]}); }, /row width/);
reject(value => { value.id='new-article'; value.publishedAt=null; }, /approved publication date/);
const draft = clone(); draft.id='draft-example'; draft.slug='/blog/draft-example'; draft.status='draft';
assert.deepEqual(selectPublished([draft,article]),[article]);
assert.equal(getArticle(draft.slug), undefined);
assert.equal(getArticle(article.slug + '/'), article);
assert(getPageSeo(draft.slug).noindex);
assert(!seoPages.some(page => page.path === draft.slug));
assert.equal(getRelatedArticles(article)[0].slug,article.relatedSlugs[0]);

// Exercise every reusable block, escaping, affiliate markup, dated metadata and images.
const fixture: ArticleDocument = {
  ...clone(), id:'fixture', slug:'/blog/fixture', contentType:'guide', publishedAt:'2026-09-22', updatedAt:'2026-09-23',
  relatedSlugs: [],
  title:'<script>alert("unsafe")</script>', affiliateDisclosureRequired:true, disclosure:undefined,
  featuredImage:{src:'/images/domsky-logo.png',alt:'Example cover'}, ogImage:{src:'/images/astra-work-model-picker.webp',alt:'Example social image'},
  blocks:[
    {type:'heading',level:2,id:'overview',text:'Overview'},
    {type:'quickAnswer',title:'Quick answer',text:'Example answer'},
    {type:'bestFor',title:'Best for',text:'Example audience'},
    {type:'prosCons',pros:['Example advantage'],cons:['Example limitation']},
    {type:'cta',title:'Next step',text:'Example CTA',label:'Visit example',href:'https://example.com/',affiliate:true},
    ...clone().blocks,
  ],
};
const validateFixture = (items: ArticleDocument[]) => validateContent(items, legacyArticles, [...routes, ...articles.map(item => item.slug)], src => fs.existsSync('public' + src));
assert.deepEqual(validateFixture([fixture]).errors, []);
const html = renderToStaticMarkup(<StaticRouter location={fixture.slug}><ArticlePage article={fixture} /></StaticRouter>);
assert.equal((html.match(/<h1[ >]/g)||[]).length,1);
assert(html.includes('&lt;script&gt;'));
assert(!html.includes('<script>alert'));
assert(html.includes('sponsored noopener noreferrer'));
assert(html.includes('aria-label="Affiliate disclosure"'));
assert(html.includes('scope="col"') && html.includes('scope="row"'));
assert(html.includes('aria-label="Article contents"') && html.includes('id="short-answer"'));
assert(html.includes('Example social image') === false); // OG image is metadata, not a second body image.
assert(html.includes('Example cover'));
const meta = {...getPageSeo(article.slug), path:fixture.slug, article:fixture};
const head=renderSeoHead(meta);
assert(head.includes('article:published_time') && head.includes('article:modified_time'));
assert(head.includes('og:image:alt') && head.includes('Example social image'));
const graph=structuredData(meta)['@graph'] as Array<Record<string,unknown>>;
const schema=graph.find(item=>item['@type']==='Article')!;
assert.equal(schema.datePublished,'2026-09-22');
assert.equal(schema.dateModified,'2026-09-23');
assert.equal((schema.author as {name:string}).name,fixture.author.name);
assert(graph.some(item=>item['@type']==='BreadcrumbList'));
assert.equal((structuredData(getPageSeo(article.slug))['@graph'] as Array<Record<string,unknown>>).find(item=>item['@type']==='Article')?.datePublished,'2026-09-24');

const assistant = getArticle('/comparisons/claude-vs-chatgpt-vs-gemini-2026')!;
assert(assistant);
const assistantMeta = getPageSeo(assistant.slug);
assert.equal(assistantMeta.title, 'ChatGPT vs Claude vs Gemini for Solo Businesses | Domsky');
assert.equal(assistantMeta.socialTitle, 'ChatGPT vs Claude vs Gemini: Which One Fits a Solo Business?');
const assistantHead = renderSeoHead(assistantMeta);
assert(assistantHead.includes('property="og:title" content="ChatGPT vs Claude vs Gemini: Which One Fits a Solo Business?"'));
assert(assistantHead.includes('property="og:image" content="https://domskysolutions.com/images/claude-vs-chatgpt-vs-gemini-2026.jpg"'));
const assistantGraph = structuredData(assistantMeta)['@graph'] as Array<Record<string,unknown>>;
const assistantSchema = assistantGraph.find(item => item['@type'] === 'Article')!;
assert.equal(assistantSchema.headline, assistant.title);
assert.equal(assistantSchema.datePublished, '2026-09-23');
assert.equal(assistantSchema.dateModified, '2026-09-23');
assert.equal(assistantSchema.reviewRating, undefined);
assert(assistantGraph.some(item => item['@type'] === 'WebPage'));
assert(assistantGraph.some(item => item['@type'] === 'BreadcrumbList'));
console.log('PASS: content validation rejection cases, legacy collisions, draft exclusion, related links, all blocks, escaping, disclosure, dates, images and Article/breadcrumb schema.');

