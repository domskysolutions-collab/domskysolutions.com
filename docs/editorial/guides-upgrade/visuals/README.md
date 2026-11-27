# Ten-task guide artwork handoff

Produced by delegated `domsky-design` **27 November 2026** after reading the reviewed article drafts and their editorial reviews. Research baseline remains **26 November 2026**. The [visual brief](visual-brief.md) was written before production. User-authorized article completion includes replacing the unsupported “Unfair Advantage” cover; owner final editorial approval and release remain pending.

## Files and integration

- `solo-business-ai-tools-v2.svg`: editable 1600 × 900 source, using actual DS logo geometry and current palette/font tokens.
- `solo-business-ai-tools-v2.webp`: optimized 1600 × 900 delivery, **23,100 bytes**. Byte-identical to the new `public/images/blog/solo-business-ai-tools-v2.webp`.
- `solo-business-ai-tools-v2-source.visual.json` and `solo-business-ai-tools-v2.visual.json`: source/delivery metadata with exact alt text, provenance and dimensions.
- `previews/solo-business-ai-tools-v2.png` and `previews/solo-business-ai-tools-v2-320.png`: inspected full-size and 320 × 180 artwork previews; these are not website screenshots.
- `produce.py` and `render.cjs`: reproducible SVG production and bundled-sharp raster encoding; no installed dependencies, network, font download or generation API.
- `validation-report.json` and `provenance.json`: actual checks, source/asset hashes, production method and limits.

Updated only the shared `articleCovers.tools` record and artwork-provenance comments in `src/data/articleCovers.ts`. Existing body/card adapters consume that record; the developer/coordinator owns final generated social/schema verification. The exact visible copy is **“10 AI tools”** and **“One useful task at a time”**. The count describes the reviewed recipes, not an optimal stack, product ranking or team replacement. No workflow results were produced or implied.

The old tools asset remains on disk without overwrite. Adobe's existing `replace-adobe.webp` and 1744 × 901 metadata remain unchanged; its original hash is recorded in provenance. No extra inline graphic was added.

## Completed design checks

- Existing visual validator passes both actual source SVG and WebP: exact dimensions, real file format/decoding, safe SVG XML/elements, local references, title/description, alt/provenance and byte budget. No warnings.
- `--repo . --check-site-path` passes WebP byte equality with public delivery.
- Inspected actual full-size and 320px renders: exact title/subtitle, visible actual logo, comfortable safe margins, no clipping, both lines readable at thumbnail size. No provider marks, decorative technology icons, false UI, checkmarks, scores or advantage claims.
- Measured essential ink-on-cream contrast **12.62:1** and teal-on-sage contrast **5.86:1**; gold is used only as a decorative rule.
- Source inspection confirms the target body and legacy card metadata use `articleCovers.tools`, with no old tools-cover path remaining in `src/`. The developer's new body caption correctly describes editorial/proposed-task artwork.

The SVG reads the active Lora/serif and DM Sans/sans-serif stacks. Raster review covers installed fallback metrics; identical typography across external SVG renderers is not promised. WebP is the site delivery, fixing those rendered metrics.

## Pending outside this role

Coordinator/developer and independent QA own article/listing/browser/zoom/keyboard checks, generated metadata agreement and the full project suite. No account, provider-output, price, compatibility, commercial-rights or workflow test was performed by design. No date, article prose, schema, dependency, commit or release operation was changed by this role. Owner final editorial review remains pending.

Manifest `published` describes an existing registered article and `integrated` describes the review candidate's public copy/shared reference. Neither state means production deployment or final approval. The editable source remains `draft` because only WebP is a public delivery.

To reproduce, run `produce.py` with the existing Python runtime, then `node render.cjs <existing-sharp-package-path>` with bundled Node. Validate both manifests using the visual skill's `validate-visual.py`; add `--repo . --check-site-path` for the delivery manifest. Reinspect renders if the environment changes. Automated passes do not establish aesthetics, evidence truth or release approval.
