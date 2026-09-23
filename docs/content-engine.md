# Domsky Content Engine v1

## Architecture

New articles are data-only TypeScript modules satisfying ArticleDocument in src/content/types.ts. Register each module in src/content/documents.ts. The registry consumes and re-exports these raw documents. Published records generate routes, cards, related links, SEO, Article JSON-LD and sitemap entries. No CMS, Markdown processor or new dependency is required.

The renderer in src/components/article reuses Domsky colors, typography and spacing. Blocks cover headings, rich text, lists, quick answers, notes, best-for guidance, pros/cons, comparison and pricing tables, figures, workflow diagrams, CTAs and source lists. Rich text is plain text or typed inline spans/links; raw HTML and JSX are not supported. React escapes strings.

## Add a future article

1. Start with the approved brief. Confirm slug, dates, author, sources, disclosure, and any facts marked for verification. Do not invent missing values.
2. Copy the following pattern into src/content/articles/approved-slug.ts and replace the editorial placeholders with approved content:

```ts
import type { ArticleDocument } from '../types';

export const newArticle = {
  id: 'approved-id',
  slug: '/blog/approved-slug',
  title: 'Approved title',
  description: 'Approved search and card description',
  category: 'Guides',
  contentType: 'guide',
  author: { name: 'Approved author', type: 'Person', url: '/about' },
  status: 'draft',
  publishedAt: null,
  updatedAt: null,
  verifiedAt: null,
  readingMinutes: 3,
  featuredImage: null,
  affiliateDisclosureRequired: false,
  tags: [],
  relatedSlugs: [],
  verificationPending: ['Supply approved dates and verified facts'],
  sources: [],
  blocks: [
    { type: 'heading', level: 2, id: 'quick-answer', text: 'Quick answer' },
    { type: 'quickAnswer', title: 'At a glance', text: 'Approved answer' },
    { type: 'paragraph', text: [
      'Read the ',
      { text: 'review methodology', href: '/methodology' },
      ' for context.'
    ] }
  ]
} satisfies ArticleDocument;
```

3. Import newArticle into documents.ts and append it to articles. No App.tsx or SEO edits are needed.
4. Use local /images/articles/approved-slug/ assets. Every image needs meaningful alt text. Optional width/height reserve space. featuredImage is optional; ogImage can override it for social sharing. Otherwise the existing site logo is used as a summary card.
5. Reference related published articles by full path in relatedSlugs. Ordering is editorial; drafts and unknown targets are rejected. Review existing pages for natural backlinks, then edit only the relevant approved sections. Link validation cannot judge relevance or anchor honesty.
6. Supply ISO dates (YYYY-MM-DD), resolve verificationPending, then mark the article published on the feature branch to review it locally and in the PR preview. Main remains the production publication gate. Drafts do not get a route, card, SEO entry or sitemap entry. There is no public draft-preview URL or scheduler in v1.
7. Run npm run content:check and npm run check. Review desktop and mobile, image captions, sources and commercial claims. Open a PR; a human reviews and merges before production deployment.

## Source and date rules

sources records are the supplied bibliography; inline citations use their approved URLs. verifiedAt records the real supplied verification date, never the build date. Source URL syntax is validated; the engine does not independently verify factual claims or remote-page availability.

publishedAt and updatedAt are distinct. New published articles require a publication day. Updated dates must not precede publication. The migrated Astra article has an explicit exception because its exact original publication day is unknown; datePublished is omitted rather than invented. Its existing 2026-09-23 updated and verified dates are retained.

Affiliate links must carry affiliate: true and require affiliateDisclosureRequired: true on the article. The shared renderer adds sponsored link markup and places the disclosure before the body.

## Validation and deployment

- npm run lint: existing TypeScript-based lint check.
- npm run typecheck: app plus strict content/tooling typecheck.
- npm run validate:content: IDs/slugs, collisions with legacy/reserved routes, dates, categories, anchors, local images, links, tables, related content, sources and disclosure.
- npm run content:check: editorial completeness and maintenance audit; errors exit 1, warnings alone exit 0.
- npm run test:content: negative validator cases, rendered component/SEO behavior, and quality-audit regression tests.
- npm run test:content:quality: standalone quality-audit regression tests.
- npm run build: content validation, Vite, static prerendering, sitemap and robots.
- npm run test:seo: generated metadata/schema/links and static routes.
- npm run check: all of the above plus existing stack tests.

GitHub Actions runs these checks. Vercel continues serving static clean URLs and existing APIs. No new environment variables or dependency changes.

### Content-quality audit

The audit reads every registered structured document, including drafts, without loading the rendered article catalog. Invalid dates therefore produce readable findings instead of crashing date formatting. Six legacy TSX articles and dedicated review bodies are not audited; legacy URLs still participate in slug collision and link checks. Register all articles in documents.ts; unregistered files are not published or audited.

Missing title, slug, description, published date, category or meaningful body; duplicate slugs (including legacy collisions); invalid calendar dates; reversed publication/update dates; broken internal/related references; and required missing featured images are blocking errors. Local featured, OG and body image references are checked against public files. Both members of a duplicate pair are flagged. Published articles cannot refer to draft article routes. Structured article fragments are checked; fragments on legacy/static pages cannot be inspected by this command. Static routes are read from App.tsx using the existing TypeScript parser, with dynamic review routes and redirects supplied by reviewCatalog. Add any future dynamically generated route families to scripts/check-content.ts.

Warnings flag absent updated/verified dates, missing alt text, missing commercial disclosure, sparse contextual links, no incoming structured related references, length outliers and stale verification. The default disclosure rendered by affiliateDisclosureRequired: true counts as present. Mark commercial articles with commercial: true even if they have no affiliate links; marked affiliate links are also detected. The existing build validator still enforces affiliate link markup/disclosure policy separately.

Optional ArticleDocument fields:

- featuredImageRequired: true when the approved brief requires a featured image (otherwise images remain optional).
- commercial: true for commercial intent that cannot be inferred from marked affiliate links.
- recommendedUpdateDays: a positive integer overriding the default 180-day maintenance window.

The configurable qualityPolicy defaults are review signals: fewer than 150 body words, more than 100 title characters, more than 300 description characters, and verification older than 180 days. They are not search-engine limits or quality scores. Staleness uses UTC calendar days, warns only after the window, and does not substitute the build date for verifiedAt. Contextual links count distinct valid internal destination paths in prose, lists, notes and tables. Self-links, CTAs, image/source links, author metadata and related cards do not count. Incoming references come only from other published structured documents' relatedSlugs; legacy backlinks are not visible to this audit. Do not add irrelevant links merely to silence a warning.

PASS means no findings; WARN means warnings only; ERROR means at least one blocker. Passed counts clean articles. Warnings and Errors count findings, so totals need not sum to Articles checked. No files are edited and no external URLs or factual claims are verified.

The quality regression suite runs in existing CI through test:content. The actual content:check audit is intentionally a separate opt-in CI gate: the migrated Astra article still lacks an approved original publication day and now reports that as an error, without inheriting the old build validator's exception. Supply the approved date before making this audit a required production check. Never guess the missing date.

## Migration

Astra is the first structured article; its route and approved body copy are preserved. Its custom page is removed. Six legacy articles retain their existing page components and routes. Their card data lives in src/content/legacy.ts; src/data/blogPosts.ts is a compatibility adapter.

Migrate one legacy article at a time: copy its verified metadata and exact body into blocks, remove its legacy card and explicit route/import in the same commit, register the document, and compare visible copy, headings, images, links and tables before merging. Missing original dates must be supplied before migration; do not expand the Astra exception automatically. Dedicated review pages/data are outside this migration.

Current v1 tradeoffs: registry imports are explicit, article data is included in the client bundle, and large bespoke legacy layouts remain. Consider article-level splitting and content search only when library size makes them necessary.

