# Editorial pilot validation

9 November 2026 · batch 1 only · upstream baseline `36ea3c2`.

## Changes and reader benefit

- `HomePage.tsx`, `editorial-home.css`, `src/index.css`: lead comparison plus a short editorial reading list, decision table and tool links replace repeated sales grids, undated prices and depth claims. Keeps warm brand colors and uses existing fonts. Newsletter section/component markup and anchor retained.
- `LeanStackFinder.tsx`: only the intro heading text and H1-to-H2 semantics change; the homepage now owns the H1. Recommendation rules, state, storage, consent, tracking and integration code are untouched.
- `ArticlePage.tsx`: evidence-first cover placement only for the Make/Zapier pilot ID; other articles retain their existing structure. Scoped CSS gives this comparison a quieter contents list and longform headline.
- `make-vs-zapier.ts`: direct inquiry opening, two redundant paragraphs removed, evidence quote becomes a labeled note. Tables, workflows, source links, FAQ answers, direct links and billing caveat remain. Publication 2026-10-02 and verification 2026-10-02 retained; substantive editorial modification dated 2026-11-09. No fresh product verification claimed.
- Root `AGENTS.md`, existing Cursor/content-engine instructions and four requested documents connect voice, evidence, visual guidance and human review to future work. The audit ranks every article and legacy review and identifies bounded research tasks.

## Checks

Passed: lint, app/content/API TypeScript validation, content structural validation, content renderer/quality/presentation regression tests, stack recommendation tests (1,125 combinations), cash-audit tests and utility UI contracts, production build, client-secret scan and SEO/internal-link validation across 35 routes and 16 redirects. One H1, canonical/schema references and existing route coverage passed. No dependency or lockfile change.

The first build exposed a TSX prerender limitation with a direct CSS import in the page component. Moved that import to the existing CSS entry point and reran the build/SEO checks successfully. `git diff --check` also passes after removing trailing whitespace.

Content quality audit: zero errors, seven stale-verification warnings. Preserve them as evidence-maintenance tasks; a copy/layout edit does not refresh product facts. Existing large-chunk warning remains. Vite output after the pilot was approximately 780.20 kB JS / 231.21 kB gzip; no claim of measured runtime performance or SEO ranking improvement is made.

## Browser review

Reviewed homepage and comparison at 1280×960 and 390×844. Desktop uses an editorial lead/sidebar; mobile has a single reading order. Measured page width did not exceed viewport width (1272/1280 desktop, 382/390 mobile). Comparison tables retain 620px scroll content within 340px mobile regions. The opening sequence is problem, recommendation, evidence scope, diagram. Images render, newsletter input remains present, and finder start opens the first question with keyboard-focusable radio choices. No email was submitted. Full recommendation behavior is covered by the existing suite rather than a production signup.

Before/after captures are saved locally under `D:/domskysolutions/editorial-preview/`: homepage and comparison, before and after, desktop and mobile. The baseline was served from the unchanged previous checkout; the pilot uses port 3001. The homepage headline's missing mobile word space was caught visually and fixed before final capture/build. Initial navigation to an inactive old preview failed; a separate baseline server resolved that capture issue.

Remaining manual review: owner judgment on the lead story, serif headline and finder placement; full 200% browser zoom and assistive-technology review are not completed. No live production deployment or ranking/performance experiment was conducted.

## Release status

Prepared for a separate draft PR. No merge, production deployment, newsletter send, affiliate change or bulk article rewrite is included. Later research and editorial batches remain pending owner review of this example.
