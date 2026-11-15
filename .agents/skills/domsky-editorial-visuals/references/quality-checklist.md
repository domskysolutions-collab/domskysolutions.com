# Validation and review

Run `scripts/validate-visual.py --manifest path/to/id.visual.json` for each draft, or repeat `--manifest` for a batch. It checks file existence, declared/actual dimensions, requested aspect ratio, supported formats, byte budget, safe file references, duplicate output names, XML structure, forbidden active/external SVG content, alt text and provenance. SVG checks use the Python standard library; raster checks require an already available Pillow runtime. A missing decoder is an explicit failure to validate, not a pass. AVIF is accepted only when that runtime can decode it.

The manifest records `file`, `id`, `articleSlug` (null only for unpublished concepts), `articleStatus`, `width`, `height`, `format`, `alt`, `archetype`, `method`, `status`, `sourceBrief` and `maxBytes`. A warning for a file over budget requires optimization or an explained exception. `--require-approved` checks release readiness but does not itself approve anything. Draft SVGs are not integrated automatically.

For an approved integration, add a `sitePath` under `/images/` to the manifest and use `--repo PATH --check-site-path` to compare the staged image with its actual `public/` copy. Then run existing content, presentation and SEO checks to inspect article references/metadata. Do not parse TypeScript metadata with speculative search-and-replace in place of those checks.

Human review must answer:

1. Is the article decision recognizable at 320px wide?
2. Are exact product names and main typography legible, without clipping or cramped margins?
3. Are palette, type family and logo consistent with active approved assets?
4. Does the subject explain this article rather than generic technology?
5. Do workflow arrows/categories preserve the article's meaning and approval gates?
6. Are claims, marks and depicted UI honest? Is any score/award unsupported?
7. Does this vary meaningfully from nearby covers while remaining part of the publication?
8. Is there an actual render/preview, with rendering limitations stated?

Automation cannot prove beauty, originality, rights clearance, logo permission or article truth. Record those as human findings, not automatic scores.
