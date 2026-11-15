---
name: domsky-editorial-visuals
description: Designs, audits, generates and validates Domsky Solutions article covers, comparisons, review artwork, workflow diagrams and requested social adaptations. Use for Domsky editorial imagery and image integration, not general website redesign or factual product research.
---

# Domsky editorial visuals

Use the article's decision to choose the visual. Treat supplied artwork and approved article facts as inputs, not permission to invent tests, ratings, savings or endorsements.

## Start with the article

1. Read repository `AGENTS.md`, the editorial/visual guides it names, `src/index.css`, and the relevant article. Confirm the canonical slug, audience, products, decision, category, content type and current image. For a concept without an article, label it unpublished and do not invent a route.
2. Inspect neighboring covers and current logo assets. An audit is read-only. Record recurring visual issues and priorities using [the audit and integration guide](references/repository-workflow.md).
3. Save a concise visual brief before producing art: topic, article/source, audience, decision, editorial message, archetype, subject, composition, exact permitted text, production method, alt text, dimensions and differences from nearby covers. Examples and invocation wording are in [usage](references/usage.md).

## Select an approach

- **Editorial comparison:** a real product comparison or pricing/selection decision. Use balanced product-name typography, restrained dividers and no implied winner. Names are preferable to fabricated logos.
- **Software workflow:** an actual process, audit or practical tutorial. Use a short, accurate sequence or categories; retain review/approval gates and avoid fake product interfaces.
- **Geometric editorial:** opinion, broad analysis or selection philosophy without a specific comparison/process. Use meaningful grouping, reduction or connections, not arbitrary technology symbols.

Read [visual archetypes](references/visual-archetypes.md) for review routing and controlled variation; [brand system](references/brand-system.md) and [composition rules](references/composition-rules.md) guide production. Explicit user direction takes precedence over a default archetype.

Prefer editable SVG for exact text, diagrams, charts and structured layouts. Use the bundled templates as starting compositions, not a requirement that every cover look identical. For artistic metaphors, texture or justified material depth, discover available generation tools and read [image-generation instructions and prompts](references/image-generation.md). If no supported tool exists, deliver a complete prompt/brief marked **not generated**. Never substitute a placeholder and call it finished artwork.

## Produce a reviewable draft

From the repository root, using an available Python 3.10+ runtime:

```sh
python .agents/skills/domsky-editorial-visuals/scripts/generate-visual.py --repo . --brief .agents/skills/domsky-editorial-visuals/examples/comparison.json --out output/domsky-editorial-visuals/comparison-draft
python .agents/skills/domsky-editorial-visuals/scripts/validate-visual.py --manifest output/domsky-editorial-visuals/comparison-draft/claude-chatgpt-gemini-cover.visual.json
```

The generator reads active palette/font tokens and the actual repository logo. It chooses an archetype from brief intent, products and process, writes editable SVG plus metadata, and refuses overwrites or output in `public/`. Python's standard library suffices for SVG production/validation; raster validation uses Pillow only if already available. Do not install dependencies or paid APIs for this skill without authorization.

Default: **1600 × 900**. Request `--format social` for **1200 × 630**, or `--format pinterest` for **1000 × 1500**. Produce only requested sizes. Adapt the layout, not a blind crop/stretch. Keep editable sources and generation prompts/provenance alongside drafts. Use `article-slug-cover.svg` / `.webp`, with a new version suffix when an asset already exists.

## Validate and review

Run the validator against each manifest; multiple `--manifest` flags check a batch for name collisions. Read [quality checks](references/quality-checklist.md). Render and inspect at full size and about 320px wide; check typography, subject relevance, product spelling/logos, clipping, margins, misleading labels and similarity to neighbors. Automated checks do not establish aesthetic quality, originality or legal permission.

See [the three tested examples](examples/validation.md) for sample briefs, editable artwork and the recorded validation limits.

For integration, follow [repository workflow](references/repository-workflow.md): use the existing image records and renderers, descriptive alt text, correct dimensions and matching card/body/social/schema images. Do not rewrite article prose, dates, attribution or unrelated metadata. Run the existing project checks and inspect desktop/mobile views.

Draft production is not approval to replace a published asset. Preserve explicit approval already given for that exact image/integration; do not ask twice. Do not automatically merge or publish. Report the brief/archetype choice, source and delivery files, actual checks, human-review findings, outstanding limitations and integration/release state.
