# Repository audit and integration

Actual conventions (recheck before editing):

- `src/index.css`: active Tailwind v4 CSS tokens and font stacks.
- `public/images/brand/`: approved runtime logos and monograms. Do not regenerate them.
- `src/content/documents.ts` / `registry.ts`: structured article registry, publication state and card adapter.
- `src/content/articles/*.ts`: canonical slug, featuredImage, ogImage, alt/caption and declared dimensions.
- `src/data/articleCovers.ts`: shared supplied-cover records for several comparison/blog articles.
- `src/content/legacy.ts` and `src/pages/blog/BlogPost*.tsx`: legacy cards and bodies; inspect both. Some legacy pages remain unpromoted by `src/data/blogPosts.ts`.
- `BlogCard.tsx` displays native aspect ratio; `ArticleFigure` in `ArticleBlocks.tsx` displays body covers. Make/Zapier intentionally puts the opening decision/evidence before its cover.
- `src/data/seo.ts`: image-specific Open Graph, Twitter and Article schema, including legacy image fallback. Do not alter canonical routes, authors or dates for an image refresh.
- Assets: `public/images/comparisons/`, `public/images/blog/`; keep editable draft sources outside `public/`. Earlier SVG/JPEG/PNG URLs remain valid.

## Read-only audit

Inventory structured and legacy image references; distinguish featured covers from body screenshots/diagrams. Record route, current asset, dimensions, provenance and observed issue/priority. Inspect images as well as filenames. Group findings by subject fit, brand consistency, text/thumbnail readability and replacement priority. Do not modify assets during an audit. A historical cover is not permission to repeat an unsupported claim or incorrect logo.

## Approved integration

Prepare and validate the concrete draft first. If explicit approval already covers that image's integration, proceed; otherwise present the preview/mapping for review before changing published references. Choose a new versioned filename instead of overwriting a published asset. Never treat an audit/concept request as integration approval.

Update the relevant `articleCovers` entry or existing article image record. Keep featured/card/social/schema references coherent; carry dimensions and concise descriptive alt text. For legacy articles, check the body renderer as well as `legacy.ts`. Do not rewrite prose or infer new test/revision dates. Preserve evidence notes, source links, affiliate behavior and supplied-access disclosures.

Run `npm run check` and `npm run content:check` after integration. These cover lint/typechecks, image/presentation checks, content, utility/API regressions, build, secrets, SEO and internal links. Explain existing warnings. Inspect the affected card and article at desktop/mobile widths, confirm no clipping/overflow, actual asset loading and matching social/schema image URL. Do not send newsletter forms during testing.

Work on a separate branch and provide the review diff plus screenshots. No merge/deploy without user authorization for the current change. Skill installation and example generation do not authorize a website release.

Publication sequence: Research → Editorial brief → Article drafting → Verification → Visual brief → Featured image → Quality review → Article integration → Final editorial approval.
