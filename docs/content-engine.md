# Domsky Content Engine v1

## Architecture

New articles are data-only TypeScript modules satisfying ArticleDocument in src/content/types.ts. Register each module in src/content/registry.ts. Published records generate routes, cards, related links, SEO, Article JSON-LD and sitemap entries. No CMS, Markdown processor or new dependency is required.

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

3. Import newArticle into registry.ts and append it to articles. No App.tsx or SEO edits are needed.
4. Use local /images/articles/approved-slug/ assets. Every image needs meaningful alt text. Optional width/height reserve space. featuredImage is optional; ogImage can override it for social sharing. Otherwise the existing site logo is used as a summary card.
5. Reference related published articles by full path in relatedSlugs. Ordering is editorial; drafts and unknown targets are rejected. Review existing pages for natural backlinks, then edit only the relevant approved sections. Link validation cannot judge relevance or anchor honesty.
6. Supply ISO dates (YYYY-MM-DD), resolve verificationPending, then mark the article published on the feature branch to review it locally and in the PR preview. Main remains the production publication gate. Drafts do not get a route, card, SEO entry or sitemap entry. There is no public draft-preview URL or scheduler in v1.
7. Run npm run check. Review desktop and mobile, image captions, sources and commercial claims. Open a PR; a human reviews and merges before production deployment.

## Source and date rules

sources records are the supplied bibliography; inline citations use their approved URLs. verifiedAt records the real supplied verification date, never the build date. Source URL syntax is validated; the engine does not independently verify factual claims or remote-page availability.

publishedAt and updatedAt are distinct. New published articles require a publication day. Updated dates must not precede publication. The migrated Astra article has an explicit exception because its exact original publication day is unknown; datePublished is omitted rather than invented. Its existing 2026-09-23 updated and verified dates are retained.

Affiliate links must carry affiliate: true and require affiliateDisclosureRequired: true on the article. The shared renderer adds sponsored link markup and places the disclosure before the body.

## Validation and deployment

- npm run lint: existing TypeScript-based lint check.
- npm run typecheck: app plus strict content/tooling typecheck.
- npm run validate:content: IDs/slugs, collisions with legacy/reserved routes, dates, categories, anchors, local images, links, tables, related content, sources and disclosure.
- npm run test:content: negative validator cases and rendered component/SEO behavior.
- npm run build: content validation, Vite, static prerendering, sitemap and robots.
- npm run test:seo: generated metadata/schema/links and static routes.
- npm run check: all of the above plus existing stack tests.

GitHub Actions runs these checks. Vercel continues serving static clean URLs and existing APIs. No new environment variables or dependency changes.

## Migration

Astra is the first structured article; its route and approved body copy are preserved. Its custom page is removed. Six legacy articles retain their existing page components and routes. Their card data lives in src/content/legacy.ts; src/data/blogPosts.ts is a compatibility adapter.

Migrate one legacy article at a time: copy its verified metadata and exact body into blocks, remove its legacy card and explicit route/import in the same commit, register the document, and compare visible copy, headings, images, links and tables before merging. Missing original dates must be supplied before migration; do not expand the Astra exception automatically. Dedicated review pages/data are outside this migration.

Current v1 tradeoffs: registry imports are explicit, article data is included in the client bundle, and large bespoke legacy layouts remain. Consider article-level splitting and content search only when library size makes them necessary.

