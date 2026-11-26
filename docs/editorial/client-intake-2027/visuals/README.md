# Client intake editorial artwork

Produced by delegated `domsky-design`, 26 November 2026, from the accepted [visual brief](../approved-package/06-visual-brief.md). Artwork production and integration are authorized on `editorial/client-intake-2027`; final owner editorial review and release remain pending. Nothing was merged or deployed by this role.

## Sources and delivery

- `ai-agent-vs-automation-client-intake-2027-cover-v1.svg`: editable 1600 × 900 source. Three equal unordered fields, common type/color and no implied winner; the long third label wraps without reducing its size.
- `ai-agent-vs-automation-client-intake-2027-cover-v1.webp`: 1600 × 900 featured/card/social delivery, 27,052 bytes.
- `client-intake-approval-boundary-v1.svg`: editable 1600 × 900 desktop diagram, 6,373 bytes.
- `client-intake-approval-boundary-mobile-v1.svg`: separately composed 1000 × 1500 phone diagram, 5,967 bytes.
- `previews/`: rendered full-size PNGs and 320px thumbnails (270px for the phone layout). These are artwork previews, not website screenshots.

The three delivery files also exist byte-for-byte in `public/images/comparisons/`. Historical imagery was not overwritten. Four `.visual.json` records contain exact dimensions, alt text and site paths. `published` is the validator's registered-article state on the review branch; `integrated` means staged/referenced by the candidate, **not a production release or final owner approval**. The editable cover source remains `draft` because it is not a site delivery.

## Meaning and integration contract

The cover uses the actual `public/images/brand/logo-light.svg` geometry and existing font stacks/palette. No provider marks, fake UI, ratings, prices, savings, generated screenshots or test-result claims were introduced. The year is a planning horizon.

The figure explains only the proposed agent configuration: read-only draft → owner review → approval validation → external dispatcher. A pending, declined or expired review terminates at **Hold — no send**. Changed recipient/body/action/policy routes to **New review required** and back to the owner, never directly to dispatch. Desktop uses an explicit return arrow; phone uses the accepted plain-text return label. The diagram is an editorial explanation, not a provider screenshot or tested workflow.

Keep the brief's exact alt text/captions in the article image records and serve the mobile SVG below 640px through existing `ArticleFigure` support. Preserve the HTML explanation and note: “Approving a receipt does not accept a project, discount or deadline.” Rules may still auto-release their preapproved safe receipt/clarification after checks; this diagram must not be read as their gate.

## Actual quality checks

`validation-report.json` records passing source/delivery validator runs, real raster dimensions/format, SVG XML/element safety, file budgets, duplicate-name checks and SHA256 equality with the public assets. `provenance.json` records exact source/asset hashes, runtime, fonts and limits.

Designer inspection covered all full-size renders, the 320px cover thumbnail and 270px phone figure. Initial arrow/text intersections were fixed by routing branch connectors beside labels; the long cover label was wrapped at the same 64px size. Main phone labels use 52px source type; branch instructions remain repeated in accessible HTML rather than relying on small artwork text. Essential ink/teal combinations on cream/sage all exceed 4.5:1. Gold only supplies thin decorative rules; labels and words carry approval meaning.

Browser article/listing layout, selected mobile source, zoom, table/keyboard/screen-reader behavior, metadata agreement and the project checks are coordinated separately by the developer/coordinator and independent QA. No provider/model intake tests were run. Final editorial approval remains an owner decision.

## Reproduction

Use an already available Python runtime to run `produce.py`. Then run `node render.cjs <existing-sharp-package-path>` using the bundled Node runtime. The scripts require no dependency installation or network. Production rewrites only this owned artwork directory and the three new delivery paths above; inspect outputs after any font/environment change.

Run `.agents/skills/domsky-editorial-visuals/scripts/validate-visual.py` against the four manifests (source separately, three deliveries with `--repo . --check-site-path`). These checks do not establish factual accuracy, aesthetics, rights or release approval.
