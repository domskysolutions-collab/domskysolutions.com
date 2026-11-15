# Article visual upgrade: review record

15 November 2026. Branch: `editorial/lean-workflow-visual-upgrade`. Review only; not merged or deployed. Owner editorial approval is pending.

## Delivered

- Three original software-workflow diagrams: seven-stage route with two human gates; the dated Kit correction; one approved article adapted into two distinct channel drafts.
- Each diagram has a 1600×900 desktop SVG and a separately composed 1000×1500 phone SVG. Editable sources and manifests are in `assets/`; identical delivery copies are in `public/images/workflows/`. `generate.py` reproduces the editable sources with the Python standard library. The six delivery files total 28,082 bytes.
- Shorter opening and review instructions, restrained article-specific typography, three native expandable reference tables and three compact semantic release checklists. All table cells and section anchors remain unchanged.
- The existing featured/social cover, all article metadata, attribution, dates, disclosure and sources remain unchanged. A source comparison against the baseline confirmed the entire metadata prefix and all table captions/columns/rows and heading/source anchors match exactly.

## Validation performed

- `npm run check`: passed lint, all three TypeScript configurations, content/schema/rejection tests, content-quality and presentation tests, stack/tool/API regressions, production build, client-secret scan and SEO/internal links across 35 routes.
- `npm run content:check`: zero errors, seven existing stale-verification warnings. No verification date was advanced. Existing large JavaScript chunk warning remains.
- Skill `validate-visual.py`: all six manifests in one batch passed real SVG/XML, dimensions, safe references, filenames, provenance and byte-budget checks. Manifests remain draft because final editorial approval is pending. Site-path mode requires approved status; instead a separate byte-for-byte comparison confirmed every source matches its delivery copy.
- Browser inspection at 1280px, 390px and 320px: correct desktop/portrait asset selection and declared ratio; all three figures loaded; no document horizontal overflow. The viewport override was reset after testing.
- The workflow and correction disclosures opened/closed with Enter/Space. The source-ledger scroll region accepted focus and ArrowRight scrolling (620px content within a 270px region at 320px), without widening the page. Column/row headers and captions remain present.
- Section links worked by keyboard and all contents links resolve to existing elements. Link/metadata validation passed. No live forms were submitted and no draft was distributed.
- Inspected diagram renders and browser text bounds: no text outside any of the six SVG canvases. Rewrapped the desktop claim-reference label and increased phone body labels after inspection. Essential instructions remain in HTML; artwork is not the sole source of information.

## Editorial assessment

The opening states a concrete outcome and the worked example still shows why welcome-email, sequence and automation boundaries matter. The manual, small-tool workflow remains an option. Provider documentation is distinguished from Domsky analysis; no product-use or performance result is implied. Repeated explanations were shortened while the complete evidence records remain available. The final action remains planning a researched piece with the existing calendar. Related lean-stack and email-comparison links retain the wider context.

The figures explain different relationships rather than repeating the cover: sequence, correction and branching adaptation. Approval at stages 3 and 5 is explicit. The dated correction and non-distribution limitations appear both beside the figures and in the text. Active cream/teal/sage typography and restrained dividers match the publication.

## Screenshots

Review files are outside the website bundle at `D:/domskysolutions/workflow-review/`:

- `before-desktop.jpg`, `before-mobile.jpg`: complete original article.
- `after-desktop.jpg`, `after-mobile.jpg`, `after-mobile-320.jpg`: complete revised article.
- `after-overview-desktop.jpg`, `after-overview-mobile-390.jpg`, `after-overview-mobile-320.jpg`: final workflow overview.
- `after-correction-desktop.jpg`, `after-correction-mobile-320.jpg`: correction example.
- `after-adaptation-desktop.jpg`, `after-adaptation-mobile-320.jpg`: adaptation example.
- `after-checklists-mobile-320.jpg`, `after-ledger-mobile-320.jpg`: checklist and evidence navigation checks.

## Limits and release state

This was a visual/editorial implementation review by Codex, not an owner approval or new provider-fact verification. SVG text uses the brand font stacks with local serif/sans fallbacks; exact font metrics vary across systems and no fonts were downloaded or embedded. The existing featured cover was preserved as requested. Historical plan/platform facts still require rechecking before a future release. Merge and deployment are deliberately outside this task.
