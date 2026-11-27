# Browser review — Guides and completed articles

Coordinator, 27 November 2026. Local Vite preview on port 3107; no production release. Inspected the real application through the in-app browser, with no form submissions, account changes or provider trials.

## Directory and navigation

The `/guides` page has one H1, five unique curated guide links, task-based reading groups and a secondary, clearly labeled product-review archive. Enter opens the native archive disclosure and exposes 13 existing review links. The mobile navigation opens/closes and includes Guides; the footer also links to Guides. The old `/reviews` client route navigates to `/guides` with the correct title, H1 and canonical. HTTP 308 is verified by configuration/regression checks, not by pretending the Vite client navigation is a production HTTP response.

The automatic discovery of future published guides is covered by the developer's synthetic catalog regression, not by a fabricated newly published article in the browser.

## Completed article observations

- Adobe: one H1, seven substantive H2 sections, loaded original artwork, correct original URL and April 2026 month, 27 November update and Domsky Solutions publisher-facing header. All seven contents links have real targets. The retained artwork is illustrative; no real compatibility test or cancellation was performed.
- AI tools: one H1, ten distinct numbered task sections plus an acceptance-log section, loaded new neutral 1600 × 900 cover and matching publisher/date presentation. All contents links resolve. Inspected actual recipe prose, including Descript's transcript/media distinction and Framer's export limitation. This is a rendered-copy check, not execution of the recipes.
- Body text is 17px with a restrained 780px maximum reading width, cream/sage branding, readable headings, paragraph spacing and visible source links. The old internal legacy-cleanup labels and repeated generic product cards are absent.

## Responsive and keyboard checks

Desktop views were inspected at 1440px. Guides and both articles were checked at 390px, with document scroll width 382px. All three routes were separately checked at 320px and 640px: scroll widths were 312px and 632px, so the document did not overflow. Screenshots were inspected for wrapping and clipping, not merely inferred from dimensions.

Adobe's labeled table scroll region is focusable, with three column and three row headers. At 390px its visible width is 340px and content width 640px. Focusing it and pressing ArrowRight moved its horizontal scroll position to 63px; a visible focus outline remained. Table overflow is local to the region.

Actual 200% browser/text zoom, a screen-reader session and a manual images-disabled session were **not run**. Narrow viewport reflow is not relabeled as a successful zoom test. Temporary viewport overrides were reset.

## Screenshots

JPEGs in `screenshots/` record the actual local candidate:

- `guides-desktop.jpg`, `guides-mobile.jpg`: directory and navigation.
- `adobe-desktop.jpg`: desktop candidate table and surrounding copy.
- `adobe-mobile.jpg`: final publisher/date header and retained cover.
- `adobe-mobile-table.jpg`: focused and horizontally scrolled table.
- `ai-tools-desktop.jpg`, `ai-tools-mobile.jpg`, `ai-tools-mobile-320.jpg`: final header and new artwork.
- `ai-tools-recipe-desktop.jpg`: completed Descript and Framer instructions.

These are website previews, not screenshots of the named products. Final build/schema/link results are recorded in `project-check.txt` and independent review in `qa-review.md`.
