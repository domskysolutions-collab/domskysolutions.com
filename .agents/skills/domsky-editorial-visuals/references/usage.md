# Invocation and brief format

In a repository session, invoke `$domsky-editorial-visuals` or name the skill naturally. It is a project skill under `.agents/skills/`; a new session may need to rediscover project skills. A completed skill folder is not proof that an already running session has refreshed its catalog.

Examples:

- `Use $domsky-editorial-visuals for Claude vs ChatGPT vs Gemini in 2026. Create three concepts and recommend one. Do not replace the published image yet.`
- `Use $domsky-editorial-visuals to illustrate /blog/replaced-saas-stack-with-ai-tools as a minimal audit workflow. Prepare a draft and preview.`
- `Use $domsky-editorial-visuals to redesign the cover for the supplied slug. Preserve article metadata and publication state.`
- `Use $domsky-editorial-visuals to audit all Comparison and Blog covers. Group by quality, brand consistency and redesign priority. Do not modify assets.`
- `Use $domsky-editorial-visuals to prepare five cover concepts from this article list, with previews and an approval checklist. Do not replace published assets.`
- `Use $domsky-editorial-visuals to adapt this approved cover to 1200×630 social and 1000×1500 Pinterest. Recompose the layout; do not publish.`

## Generator input

Use the example JSON briefs as editable inputs. Required common fields: `id` (safe filename stem), `title`, `articleSlug`, `articleStatus` (`published` or `concept`), `sourceFiles`, `contentType`, `intent`, `audience`, `decision`, `message`, `concept`, `headline`, `alt`, and `method` (`programmatic`). A null slug is valid only for a concept. A concept does not establish that a matching article exists.

Comparison needs 2–3 exact `products`. Workflow needs 2–5 `steps` and a boolean `flow`; an uncompressible longer process needs manual SVG composition. Geometric needs `selectedLabel`, `extrasLabel`, `selectedModules`, `extraModules` (1–6 each) and a short `moduleMeaning` explaining what the blocks represent. Module counts are explicit composition decisions, not an inferred number of recommended tools. `variant` is optional; choices are documented in visual-archetypes.md. Do not add prices, model versions or product claims merely to fill a template.

Run from the repository root using an available Python 3.10+ runtime. On Codex desktop, locate the bundled runtime rather than hard-coding one machine's installation path. No extra packages are needed for SVG generation and validation.

```sh
python .agents/skills/domsky-editorial-visuals/scripts/generate-visual.py --repo . --brief .agents/skills/domsky-editorial-visuals/examples/workflow.json --out output/domsky-editorial-visuals/audit-draft
python .agents/skills/domsky-editorial-visuals/scripts/validate-visual.py --manifest output/domsky-editorial-visuals/audit-draft/software-stack-audit-cover.visual.json
```

Add `--format social` or `--format pinterest` only when requested. Use a fresh output directory/ID for revisions; the script refuses overwrites and public output. Render SVGs with an available browser or existing rasterizer; inspect a thumbnail and full size. Do not call an unrendered file visually reviewed.

For generative artwork, use the prompt reference and save the completed brief/prompt and actual result together. The SVG generator is not an image-generation API.
