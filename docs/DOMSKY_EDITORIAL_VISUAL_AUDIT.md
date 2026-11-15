# Editorial visual system audit

15 November 2026. Read-only inspection of the current imagery; this task does not replace published artwork.

## Existing conventions

No project SKILL.md was present. Content guidance lives in AGENTS.md, `.cursor/rules/domsky-content-engine.mdc`, and the editorial/visual documentation. The new project skill therefore uses `.agents/skills/domsky-editorial-visuals/`.

Tailwind v4 tokens and font stacks are in `src/index.css`, with no separate Tailwind config. Active palette: cream #F4F0E8, charcoal #2B2A28, teal #2F5D5A, gold #B99963, brick #9C5A4D, sage #DFE7DE, sand #EAE0D0 and dark teal #234D49. Actual runtime logos are editable SVGs in `public/images/brand/`.

Structured article records live in `src/content/articles/` and are registered through `documents.ts` and `registry.ts`. Eight supplied covers share `src/data/articleCovers.ts`; legacy cards and bodies also need `legacy.ts` / BlogPost components. `BlogCard` and `ArticleFigure` preserve native aspect ratios. SEO derives featured/social/schema images through `src/data/seo.ts`, including legacy covers. Public assets use `images/comparisons/` and `images/blog/`; historical assets retain their URLs.

Current covers are supplied WebPs at 1672×941 or 1744×901, not a single forced ratio. The recent eight-image set totals 607 KB. Older explanatory SVGs are still useful editable examples. Existing media tooling covers supplied-image encoding and project validation; no repository image-generation API or paid service configuration is required for the new skill.

## Findings and priority

| Priority | Observation | Future treatment |
| --- | --- | --- |
| High | Some cover labels assert more than the article: “unfair advantage” is not a measured result; placing AI Assistant in SKIP looks universal while the article is conditional. | Build the brief from the article decision. Correct the visual claim before integration; captions alone cannot repair a misleading headline. Do not rewrite article facts to accommodate a cover. |
| High | Product-heavy comparison images contain generated-looking marks and differing DS frame geometry. | Use the actual approved DS asset. Prefer exact product-name typography unless suitable authorized official marks exist. |
| Medium | Raster covers carry large headlines, labels and supporting phrases, sometimes repeating the HTML title. | Use one short message or product names, with essential qualifications in readable HTML; inspect at 320px width. |
| Medium | Typography and margins vary between serif comparison covers, sans blog covers and the earlier Make/Zapier design. | Keep current font families and margin system; vary topology for a content reason rather than mechanically recoloring panels. |
| Medium | The workflow cover abbreviates the full approval/evidence process. | Preserve consequential review gates in the brief/diagram; avoid implying automatic publication. |
| Low | The current native-aspect card treatment prevents cropping; dimensions are declared and assets are small. | Retain these strengths. Default new artwork to 1600×900 without resizing historical covers merely for consistency. |
| Context | The 3D homepage hero has a distinct job from article covers; body screenshots have separate provenance obligations. | Do not apply a cover audit as authorization to redesign the hero or replace genuine screenshots with synthetic UI. |

## Reusable system added

The project skill supplies comparison, workflow and geometric archetypes; editable SVG templates; article-aware JSON briefs; a token/logo-aware draft generator; a structural/metadata validator; prompt templates for supported generation tools; and optional approved integration instructions. Programmatic graphics are the default when labels and structure must be exact. Three isolated examples demonstrate the requested cases; none is registered as a website image or copied into `public/`.
