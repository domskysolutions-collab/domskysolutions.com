# Supplied article cover refresh

15 November 2026. Eight supplied designs are mapped by article subject in `src/data/articleCovers.ts`. Originals remain unchanged in Downloads; website copies use WebP quality 92 at the original dimensions. Total new asset size is 607,000 bytes. No artwork was generated or its visible text changed for this update.

| Supplied image | Article | Website asset |
| --- | --- | --- |
| Domsky Solutions_ Codex vs Claude Code-2.png | Codex vs Claude Code | `/images/comparisons/codex-vs-claude-code-v2.webp` |
| AI Comparison_ ChatGPT vs Claude vs Gemini-1.png | ChatGPT vs Claude vs Gemini | `/images/comparisons/chatgpt-vs-claude-vs-gemini-v2.webp` |
| Newsletter Tools Compared_ Kit vs MailerLite vs Beehiiv-3.png | Kit vs MailerLite vs beehiiv | `/images/comparisons/kit-vs-mailerlite-vs-beehiiv-v2.webp` |
| 11_10_59 AM-1.png | Should You Replace Adobe? | `/images/blog/replace-adobe.webp` |
| 11_11_00 AM-2.png | Audit Your Software Stack | `/images/blog/software-stack-audit.webp` |
| 11_11_01 AM-3.png | A Lean Content Workflow | `/images/blog/lean-content-workflow.webp` |
| 11_11_02 AM-4.png | 10 AI Tools for Common Solo-Business Tasks | `/images/blog/solo-business-ai-tools.webp` |
| 11_11_03 AM-5.png | A Lean Solo-Business Stack (`/uses`) | `/images/blog/lean-solo-business-stack.webp` |

The general “Best Software Tools for a Solo Business” attachment is not assigned: the specific Lean Solo-Business Stack design matches `/uses` more closely. No new Make vs Zapier artwork was supplied, so its existing cover remains. The unpromoted beginner article and Kit review are outside this cover mapping.

## Display and evidence

Cards preserve each image's native aspect ratio and declared dimensions, without cropping or hover enlargement. Covers appear in article bodies and matching card/social/structured-data metadata. The two legacy blog pages now share the same cover records with their cards and metadata. Earlier assets remain available at their original URLs.

Supplied covers are title artwork, not test evidence. Captions clarify that the lean-stack category layout is illustrative, the content workflow still requires evidence and human approval, and the ten-tools artwork does not establish measured productivity or team replacement. Article wording, source links, authors, publication dates and verification dates are retained. Two existing legacy effects now use a block body so a scroll operation cannot be mistaken for an effect cleanup; browser testing caught the resulting rendering failure before release.

## Validation

`npm run check` passed. Final lint, build and SEO checks passed after the legacy effect correction. `content:check` has no errors and seven existing maintenance warnings; the existing bundle-size warning remains. The presentation checker now supports simple lossy WebP dimensions in addition to extended WebP, using RFC 6386 section 9.1. SEO checks cover legacy body/social/schema image consistency.

Browser review confirmed eight article-to-cover and social-image mappings, all five blog cards, the three refreshed comparison cards and preserved Make vs Zapier cover. Desktop 1280px and mobile 390px checks confirmed image loading, native aspect ratios, one H1 and no page overflow; card navigation and both legacy article pages were exercised. Screenshots are saved in `D:/domskysolutions/branded-covers-preview/`.

Prepared on `design/branded-article-covers` for review; not merged or deployed.
