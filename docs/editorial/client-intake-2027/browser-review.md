# Browser review — client intake comparison

Coordinator, 26 November 2026. Local Vite review candidate at `http://localhost:3107/comparisons/ai-agent-vs-automation-client-intake-2027`, not production. Inspected through the supported in-app browser. No forms were submitted and no customer/provider intake operation was performed.

## Desktop and responsive rendering

- Article and Comparisons index inspected at 1440 CSS px. The new card uses the correct cover, title, author and 26 November 2026 date. The article contains one H1, the source-scope disclosure and accessible same-page references.
- Article inspected at 390 and 320 CSS px. Document scroll widths were 382 and 312 px respectively, so neither exceeded the viewport. Article body type remained 17px. Wide tables stay inside their labeled horizontal-scroll regions.
- The inline image selected `client-intake-approval-boundary-mobile-v1.svg` at both mobile widths; its intrinsic dimensions were 1000 × 1500. Desktop selected the 1600 × 900 diagram. The 1600 × 900 WebP cover loaded successfully. Both figure captions preserve proposed/unrun provenance.
- The final cover and final desktop/mobile diagram were reloaded and inspected after designer corrections. The three alternatives remain equal and unordered. The held route terminates without sending; changed content requires a return to review. All essential instructions also exist as HTML text.
- The listing was inspected at 390px: its first card width was 334px and document scroll width 382px. Long title/excerpt truncation follows the existing card behavior, with the full accessible link name preserved.
- A 640px reflow check also showed no document overflow (632px scroll width). This is a viewport reflow check, not a successful 200% text-zoom result.

## Keyboard, semantics and links

- The main comparison table has four column headers, three row headers and a labeled region with `tabIndex=0`. Focusing the region and using ArrowRight moved `scrollLeft` to 103px; keyboard scrolling therefore works without widening the page.
- Pressing Enter on the fixture-context summary opened its native `details` element. The other reference disclosures use the same existing semantic component.
- No missing targets were found among the article's local reference and contents fragment links. The new comparison appeared in the index and its card route loaded the intended article. Existing Make/Zapier and stack-audit links use actual internal destinations; the new incoming Make/Zapier link is separately validated by the project checks.
- These are DOM and keyboard observations. No screen-reader session or manual images-disabled session was performed. Visible alt text, HTML equivalents and table semantics were inspected in source/DOM; that is not a substitute for assistive-technology testing.

## Limits and retained screenshots

The in-app browser did not apply the attempted Ctrl-plus zoom shortcut (viewport and device ratio stayed unchanged). Actual 200% zoom is **not verified**. Temporary viewport overrides were reset after the responsive checks. An initial sandbox-bound preview connection failed; an authorized local server on port 3107 resolved preview access.

Final JPEGs under `screenshots/`:

- `article-desktop-1440.jpg`: article cover and decision context.
- `approval-desktop-1440.jpg`: final approval boundary and adjacent explanation.
- `article-mobile-390.jpg` and `article-mobile-320.jpg`: final mobile diagram and HTML captions.
- `comparison-list-desktop-1440.jpg` and `comparison-list-mobile-390.jpg`: new card in the existing index.

Screenshots are local implementation previews, not provider screenshots or evidence that the 27 proposed intake trials were executed. The latter remain NOT RUN.
