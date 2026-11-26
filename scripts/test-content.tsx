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
import { BLOG_POSTS } from '../src/data/blogPosts';
import type { ArticleDocument } from '../src/content/types';

const article = articles.find(item => item.status === 'published')!;
assert(article, 'Content tests require a published article in the catalog');
const routes = seoPages.filter(page => !page.article && !legacyArticles.some(item => item.slug === page.path)).map(page => page.path);
const validate = (items: ArticleDocument[]) => validateContent(items, legacyArticles, routes, src => fs.existsSync('public' + src));
assert.deepEqual(validate(articles).errors, []);
const clone = (): ArticleDocument => structuredClone(article);
// Keep every referenced article available when mutating one candidate. Otherwise
// missing catalog context can satisfy a rejection assertion for the wrong reason.
const withCandidate = (candidate: ArticleDocument) => articles.map(item => item === article ? candidate : item);
assert.deepEqual(validate(withCandidate(clone())).errors, []);
const reject = (change: (value: ArticleDocument) => void, pattern: RegExp) => {
  const value = clone(); change(value);
  const errors = validate(withCandidate(value)).errors.filter(error => error.startsWith(value.id + ': '));
  assert.match(errors.join('\n'), pattern);
};
assert.match(validate([...articles, article]).errors.join('\n'), /duplicate/i);
reject(value => { value.slug = '/blog/you-dont-need-to-be-technical-to-use-ai'; }, /slug/);
reject(value => { value.updatedAt = '2026-02-30'; }, /Invalid updatedAt/);
reject(value => { value.verificationPending = ['Price needs verification']; }, /Unresolved verification/);
reject(value => { value.blocks.push({ type:'image', image:{src:'/images/missing.webp',alt:''} }); }, /alt text/);
reject(value => { value.blocks.push({ type:'paragraph', text:[{text:'Unsafe',href:'javascript:alert(1)'}] }); }, /HTTPS/);
reject(value => { value.blocks.push({ type:'paragraph', text:[{text:'Unknown',href:'/blog/missing'}] }); }, /Unknown internal/);
reject(value => { value.blocks.push({ type:'cta',title:'Offer',text:'Example',label:'Visit',href:'https://example.com/',affiliate:true }); }, /requires disclosure/);
reject(value => { value.relatedSlugs = [value.slug]; }, /related article/);
reject(value => { value.blocks.push({type:'heading',id:'duplicate-test-anchor',level:2,text:'First fixture heading'}, {type:'heading',id:'duplicate-test-anchor',level:2,text:'Repeated fixture heading'}); }, /duplicate anchor/);
reject(value => { value.blocks.push({type:'table',caption:'Example',columns:['A','B'],rows:[['One']]}); }, /row width/);
reject(value => { value.blocks.push({type:'prosCons',pros:['One'],cons:['One']}); }, /2–6 items/);
reject(value => { value.blocks.push({type:'decisionCards',cards:[{label:'Only',title:'One',text:'One'}]}); }, /2–4 items/);
reject(value => { value.blocks.push({type:'process',steps:[{title:'One'},{title:'Two'}]}); }, /3–6 titled steps/);
reject(value => { value.blocks.push({type:'table',caption:'Example',columns:['A','B'],rows:[['One','Two']],highlightedColumns:[0]}); }, /product columns/);
reject(value => { value.blocks.push({type:'table',caption:'Example',columns:['A','B'],rows:[['One','Two']],summary:' '}); }, /summary/);
reject(value => { value.blocks.push({type:'image',image:{src:'/images/domsky-logo.png',alt:'Diagram',mobile:{src:'/images/missing.svg',width:1000,height:1500}}}); }, /Missing or invalid local image/);
reject(value => { value.blocks.push({type:'image',image:{src:'/images/domsky-logo.png',alt:'Diagram',mobile:{src:'/images/domsky-logo.png',width:0,height:1500}}}); }, /Mobile image needs declared dimensions/);
reject(value => { value.id='new-article'; value.publishedAt=null; }, /approved publication date/);
const draft = clone(); draft.id='draft-example'; draft.slug='/blog/draft-example'; draft.status='draft';
assert.deepEqual(selectPublished([draft,article]),[article]);
assert.equal(getArticle(draft.slug), undefined);
assert.equal(getArticle(article.slug + '/'), article);
assert(getPageSeo(draft.slug).noindex);
assert(!seoPages.some(page => page.path === draft.slug));
assert.deepEqual(getRelatedArticles(article).map(item => item.slug), article.relatedSlugs);

// Exercise every reusable block, escaping, affiliate markup, dated metadata and images.
const fixture: ArticleDocument = {
  ...clone(), id:'fixture', slug:'/blog/fixture', contentType:'guide', publishedAt:'2026-09-22', updatedAt:'2026-09-23', verifiedAt:'2026-09-23',
  relatedSlugs: [],
  sources: [{id:'fixture-source',title:'Example source',url:'https://example.com/source'}],
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
    {type:'heading',level:2,id:'short-answer',text:'Short answer'},
    {type:'paragraph',text:[{text:'Example strong text',strong:true}, ' and ', {text:'an internal anchor',href:'#overview'}]},
    {type:'quote',text:'Example quotation'},
    {type:'heading',level:3,id:'detail',text:'Detail'},
    {type:'list',items:['First item','Second item']},
    {type:'list',ordered:true,items:['First step','Second step']},
    {type:'note',title:'Example note',text:'Example evidence limitation'},
    {type:'table',caption:'Example table',columns:['Criterion','Value'],rows:[['Example row','Example value']]},
    {type:'pricing',caption:'Example price table',columns:['Plan','Condition'],rows:[['Example plan','Example condition']]},
    {type:'image',image:{src:'/images/domsky-logo.png',alt:'Example inline image'}},
    {type:'workflow',caption:'Example workflow',paths:[{title:'Example path',steps:['Input','Review','Output']}]},
    {type:'divider'},
    {type:'sources',id:'sources',title:'Example sources'},
  ],
};
const validateFixture = (items: ArticleDocument[]) => validateContent(items, legacyArticles, [...routes, ...articles.map(item => item.slug)], src => fs.existsSync('public' + src));
assert.deepEqual(validateFixture([fixture]).errors, []);
const html = renderToStaticMarkup(<StaticRouter location={fixture.slug}><ArticlePage article={fixture} /></StaticRouter>);
assert.equal((html.match(/<h1[ >]/g)||[]).length,1);
assert(html.includes('>Domsky Solutions'));
assert(!html.includes('Facts last verified'));
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
assert(!html.includes('<picture>')); // Existing single-source covers retain their renderer.
const visualWorkflow = getArticle('/blog/ai-daily-workflow-solo-business')!;
const workflowHtml = renderToStaticMarkup(<StaticRouter location={visualWorkflow.slug}><ArticlePage article={visualWorkflow} /></StaticRouter>);
assert.equal((workflowHtml.match(/<picture>/g) || []).length, 3);
assert.equal((workflowHtml.match(/<source media="\(max-width: 640px\)"/g) || []).length, 3);
assert(workflowHtml.includes('width="1000" height="1500"'));
assert.equal((workflowHtml.match(/<details /g) || []).length, 3);
assert(!workflowHtml.includes('<details open'));
assert.equal(visualWorkflow.blocks.flatMap(block => block.type === 'table' ? [block.rows.length] : []).join(','), '7,4,3');
assert.equal(visualWorkflow.blocks.filter(block => block.type === 'list' && block.checklist).length, 3);
for (const id of ['article-check', 'email-check', 'linkedin-check', 'evidence-pass', 'usefulness-pass', 'voice-pass']) assert(workflowHtml.includes(`id="${id}"`));
assert(workflowHtml.includes('Kit Free does not include sequences or visual automation.'));
assert(workflowHtml.includes('not emailed, posted or measured'));
assert.deepEqual([visualWorkflow.publishedAt, visualWorkflow.updatedAt, visualWorkflow.verifiedAt], ['2026-09-25', '2026-09-26', '2026-09-26']);
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
assert.equal((structuredData(getPageSeo(article.slug))['@graph'] as Array<Record<string,unknown>>).find(item=>item['@type']==='Article')?.datePublished, article.publishedAt ?? undefined);

const assistant = getArticle('/comparisons/claude-vs-chatgpt-vs-gemini-2026')!;
assert(assistant);
const assistantMeta = getPageSeo(assistant.slug);
assert.equal(assistantMeta.title, 'ChatGPT vs Claude vs Gemini for Solo Businesses | Domsky');
assert.equal(assistantMeta.socialTitle, 'ChatGPT vs Claude vs Gemini: Which One Fits a Solo Business?');
const assistantHead = renderSeoHead(assistantMeta);
assert(assistantHead.includes('property="og:title" content="ChatGPT vs Claude vs Gemini: Which One Fits a Solo Business?"'));
assert(assistantHead.includes('property="og:image" content="https://domskysolutions.com/images/comparisons/chatgpt-vs-claude-vs-gemini-v2.webp"'));
const assistantGraph = structuredData(assistantMeta)['@graph'] as Array<Record<string,unknown>>;
const assistantSchema = assistantGraph.find(item => item['@type'] === 'Article')!;
assert.equal(assistantSchema.headline, assistant.title);
assert.equal(assistantSchema.datePublished, '2026-09-23');
assert.equal(assistantSchema.dateModified, '2026-09-26');
assert.equal(assistantSchema.reviewRating, undefined);
assert(assistantGraph.some(item => item['@type'] === 'WebPage'));
assert(assistantGraph.some(item => item['@type'] === 'BreadcrumbList'));
assert(!BLOG_POSTS.some(item => item.slug === '/blog/you-dont-need-to-be-technical-to-use-ai'));
assert(legacyArticles.some(item => item.slug === '/blog/you-dont-need-to-be-technical-to-use-ai'));

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
assert(emailHead.includes('property="og:image" content="https://domskysolutions.com/images/comparisons/kit-vs-mailerlite-vs-beehiiv-v2.webp"'));
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
assert(workflowHead.includes('property="og:image" content="https://domskysolutions.com/images/blog/lean-content-workflow.webp"'));
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
assert(softwareAuditHead.includes('property="og:image" content="https://domskysolutions.com/images/blog/software-stack-audit.webp"'));
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
assert(leanStackHead.includes('property="og:image" content="https://domskysolutions.com/images/blog/lean-solo-business-stack.webp"'));
const leanStackGraph = structuredData(leanStackMeta)['@graph'] as Array<Record<string,unknown>>;
assert(leanStackGraph.some(item => item['@type'] === 'Article'));
assert(leanStackGraph.some(item => item['@type'] === 'WebPage'));
assert(leanStackGraph.some(item => item['@type'] === 'BreadcrumbList'));
assert(!leanStackGraph.some(item => ['HowTo', 'FAQPage', 'Product', 'Offer', 'Review', 'AggregateRating'].includes(String(item['@type']))));
console.log('PASS: content validation rejection cases, legacy collisions, draft exclusion, related links, all blocks, escaping, disclosure, dates, images and Article/breadcrumb schema.');
