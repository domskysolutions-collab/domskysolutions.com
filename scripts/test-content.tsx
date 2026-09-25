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
reject(value => { value.blocks.push({type:'prosCons',pros:['One'],cons:['One']}); }, /2–6 items/);
reject(value => { value.blocks.push({type:'decisionCards',cards:[{label:'Only',title:'One',text:'One'}]}); }, /2–4 items/);
reject(value => { value.blocks.push({type:'process',steps:[{title:'One'},{title:'Two'}]}); }, /3–6 titled steps/);
reject(value => { value.blocks.push({type:'table',caption:'Example',columns:['A','B'],rows:[['One','Two']],highlightedColumns:[0]}); }, /product columns/);
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
    {type:'quickVerdict',label:'At a glance',summary:'Example summary',bestFor:'Example reader',notFor:'Different reader',verdict:'Example verdict',keyPoints:['One point']},
    {type:'bestFor',title:'Best for',text:'Example audience'},
    {type:'prosCons',pros:['Example advantage','Second advantage'],cons:['Example limitation','Second limitation']},
    {type:'decisionCards',cards:[{label:'Situation one',title:'First choice',text:'First explanation'},{label:'Situation two',title:'Second choice',text:'Second explanation'}]},
    {type:'process',title:'Example process',steps:[{title:'Research',description:'Check sources'},{title:'Draft',description:'Write clearly'},{title:'Review',description:'Verify the result'}]},
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
assert(html.includes('At a glance') && html.includes('Less suitable for'));
assert(html.includes('Situation one') && html.includes('Example process'));
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

const kit = getArticle('/reviews/convertkit')!;
assert(kit);
assert.equal(kit.contentType, 'review');
const kitMeta = getPageSeo(kit.slug);
assert.equal(kitMeta.title, 'Kit Review for Solo Creators: Free Plan & Limits | Domsky');
assert.equal(kitMeta.socialTitle, 'Kit Free or Creator? A Practical Solo-Creator Review');
const kitGraph = structuredData(kitMeta)['@graph'] as Array<Record<string,unknown>>;
assert(kitGraph.some(item => item['@type'] === 'Article'));
assert(!kitGraph.some(item => item['@type'] === 'Review'));
assert(kitGraph.some(item => item['@type'] === 'WebPage'));
assert(kitGraph.some(item => item['@type'] === 'BreadcrumbList'));

const emailComparison = getArticle('/comparisons/kit-vs-mailerlite-vs-beehiiv')!;
assert(emailComparison);
assert.equal(emailComparison.contentType, 'comparison');
assert.equal(emailComparison.sources.length, 23);
assert.deepEqual(emailComparison.relatedSlugs, ['/reviews/convertkit', '/blog/ai-daily-workflow-solo-business']);
assert(kit.relatedSlugs.includes(emailComparison.slug));
const emailMeta = getPageSeo(emailComparison.slug);
assert.equal(emailMeta.title, 'Kit vs MailerLite vs beehiiv for Creators | Domsky');
assert.equal(emailMeta.socialTitle, 'Kit vs MailerLite vs beehiiv: Choose by Workflow');
const emailHead = renderSeoHead(emailMeta);
assert(emailHead.includes('property="og:image" content="https://domskysolutions.com/images/kit-mailerlite-beehiiv-workflows.svg"'));
const emailGraph = structuredData(emailMeta)['@graph'] as Array<Record<string,unknown>>;
assert(emailGraph.some(item => item['@type'] === 'Article'));
assert(emailGraph.some(item => item['@type'] === 'WebPage'));
assert(emailGraph.some(item => item['@type'] === 'BreadcrumbList'));
assert(!emailGraph.some(item => ['Product', 'Offer', 'Review', 'FAQPage'].includes(String(item['@type']))));

const workflow = getArticle('/blog/ai-daily-workflow-solo-business')!;
assert(workflow);
assert.equal(workflow.contentType, 'guide');
assert.equal(workflow.sources.length, 6);
assert.equal(workflow.title, 'A Lean Content Workflow: Turn One Researched Idea into an Article, Email and Social Post');
const workflowMeta = getPageSeo(workflow.slug);
assert.equal(workflowMeta.title, 'A Lean AI Content Workflow for Solo Creators | Domsky');
assert.equal(workflowMeta.socialTitle, 'One Research Idea, Three Approved Content Assets');
const workflowHead = renderSeoHead(workflowMeta);
assert(workflowHead.includes('property="og:image" content="https://domskysolutions.com/images/lean-content-workflow.svg"'));
const workflowGraph = structuredData(workflowMeta)['@graph'] as Array<Record<string,unknown>>;
assert(workflowGraph.some(item => item['@type'] === 'Article'));
assert(workflowGraph.some(item => item['@type'] === 'WebPage'));
assert(workflowGraph.some(item => item['@type'] === 'BreadcrumbList'));
assert(!workflowGraph.some(item => ['HowTo', 'FAQPage', 'Product', 'Offer', 'Review'].includes(String(item['@type']))));

const softwareAudit = getArticle('/blog/replaced-saas-stack-with-ai-tools')!;
assert(softwareAudit);
assert.equal(softwareAudit.contentType, 'guide');
assert.equal(softwareAudit.sources.length, 4);
assert.equal(softwareAudit.title, 'Audit Your Software Stack: What to Keep, Cancel or Replace');
assert(!legacyArticles.some(item => item.slug === softwareAudit.slug));
const softwareAuditMeta = getPageSeo(softwareAudit.slug);
assert.equal(softwareAuditMeta.title, 'Audit Your Software Stack: Keep, Cancel or Replace | Domsky');
assert.equal(softwareAuditMeta.socialTitle, 'Keep, Downgrade, Cancel or Trial? Audit Your Software Stack');
const softwareAuditHead = renderSeoHead(softwareAuditMeta);
assert(softwareAuditHead.includes('property="og:image" content="https://domskysolutions.com/images/software-stack-audit.svg"'));
const softwareAuditGraph = structuredData(softwareAuditMeta)['@graph'] as Array<Record<string,unknown>>;
assert(softwareAuditGraph.some(item => item['@type'] === 'Article'));
assert(softwareAuditGraph.some(item => item['@type'] === 'WebPage'));
assert(softwareAuditGraph.some(item => item['@type'] === 'BreadcrumbList'));
assert(!softwareAuditGraph.some(item => ['HowTo', 'FAQPage', 'Product', 'Offer', 'Review'].includes(String(item['@type']))));

const leanStack = getArticle('/uses')!;
assert(leanStack);
assert.equal(leanStack.contentType, 'guide');
assert.equal(leanStack.category, 'Lean Software Stack');
assert.equal(leanStack.sources.length, 9);
assert.equal(leanStack.title, 'A Lean Solo-Business Stack: What to Use, Keep and Skip');
const leanStackMeta = getPageSeo(leanStack.slug);
assert.equal(leanStackMeta.title, 'A Lean Solo-Business Stack: Use, Keep and Skip | Domsky');
assert.equal(leanStackMeta.socialTitle, 'The Lean Solo-Business Stack: Keep, Add or Skip');
const leanStackHead = renderSeoHead(leanStackMeta);
assert(leanStackHead.includes('property="og:image" content="https://domskysolutions.com/images/lean-solo-business-stack.svg"'));
const leanStackGraph = structuredData(leanStackMeta)['@graph'] as Array<Record<string,unknown>>;
assert(leanStackGraph.some(item => item['@type'] === 'Article'));
assert(leanStackGraph.some(item => item['@type'] === 'WebPage'));
assert(leanStackGraph.some(item => item['@type'] === 'BreadcrumbList'));
assert(!leanStackGraph.some(item => ['HowTo', 'FAQPage', 'Product', 'Offer', 'Review', 'AggregateRating'].includes(String(item['@type']))));
console.log('PASS: content validation rejection cases, legacy collisions, draft exclusion, related links, all blocks, escaping, disclosure, dates, images and Article/breadcrumb schema.');
