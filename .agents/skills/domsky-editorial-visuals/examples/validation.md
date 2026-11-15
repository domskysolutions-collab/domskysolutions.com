# Example validation record

All three examples are drafts outside `public/`. No article image record, publication state or deployed asset was changed.

| Test | Brief and chosen method | Editable result | Assessment |
| --- | --- | --- | --- |
| A: ChatGPT / Claude / Gemini | [comparison.json](comparison.json), editorial comparison, programmatic SVG | [comparison cover](generated/comparison/claude-chatgpt-gemini-cover.svg) | 1600×900; equal product-name prominence, restrained rule, no fabricated logo, winner or score. Product names remain readable at 320px. |
| B: Software Stack Audit | [workflow.json](workflow.json), software workflow, programmatic SVG | [audit cover](generated/workflow/software-stack-audit-cover.svg) | 1600×900; four article-supported decision categories, no arrows implying that the categories are chronological. No savings claim. Labels remain readable at 320px. |
| C: How Many AI Tools Do You Really Need? | [editorial.json](editorial.json), geometric editorial, programmatic SVG | [editorial cover](generated/editorial/how-many-ai-tools-cover.svg) | 1600×900; purposeful grouping versus optional extras. An unpublished concept with null route. Explicit module counts illustrate abstract coverage, not an optimum number of tools. |

Full-size PNG and 320px renders were produced with the already available bundled sharp renderer and inspected. They use available font fallbacks; no fonts were downloaded. Preview files are saved locally in `D:/domskysolutions/skill-preview/`. The committed editable SVGs are the reusable artwork.

The behavioral suite checks intent routing, all three archetypes at article/social/Pinterest dimensions, exact text escaping, real article source/slug presence, explicit workflow order, module-count intent, malformed/active SVG rejection, missing alt text, wrong dimensions, path escape, unapproved release, refusal of public output and overwrite preservation. Structural checks do not substitute for rendering new social/Pinterest compositions when requested.

An independent forward test produced a geometric concept and a source-aware audit workflow in the ignored draft output folder. Both validated and were rendered at full/thumbnail size. It confirmed overwrite refusal and unchanged published files. Its findings led to explicit module-count intent and instructions for retaining review gates when a process exceeds the starter's five-label limit.

The bundled skill-creator `quick_validate.py` could not run because its optional PyYAML dependency is absent in this runtime. No package was installed. The included behavioral suite separately checks this skill's simple name/description frontmatter, required name/description limits and local reference targets; the frontmatter and instructions were also read manually. This is not a claim that the unavailable bundled checker passed.

Run from the repository root:

```sh
python .agents/skills/domsky-editorial-visuals/scripts/test-visuals.py
python .agents/skills/domsky-editorial-visuals/scripts/validate-visual.py --manifest .agents/skills/domsky-editorial-visuals/examples/generated/comparison/claude-chatgpt-gemini-cover.visual.json --manifest .agents/skills/domsky-editorial-visuals/examples/generated/workflow/software-stack-audit-cover.visual.json --manifest .agents/skills/domsky-editorial-visuals/examples/generated/editorial/how-many-ai-tools-cover.visual.json
```
