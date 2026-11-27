# Guides directory and two legacy guide upgrades

Owner request, 26 November 2026: replace the Reviews category with Guides for useful guides/tips, and complete the Adobe and “team of 10” blog articles. Implementation review branch: `editorial/guides-and-complete-blog-articles`, based on production main `08941635f3d8068c41f719dcb36c82da29a9439f`. This request does not authorize another production merge/deployment.

## Scope and decisions

- Main navigation and directory become Guides at `/guides`, curated around actual useful how-to and decision guides.
- Exact historical `/reviews` directory redirects permanently to `/guides`. Individual review URLs remain accessible with a clearly labeled secondary product-review archive, rather than disguising them as guides.
- Complete `/blog/cancelled-adobe-never-looked-back` and `/blog/ai-tools-look-like-team-of-10` at their existing URLs. Preserve the original known month, April 2026; do not invent a publication day to migrate them into the structured engine. Mark a real substantive update and source review separately.
- Give readers usable inputs, steps, review criteria, examples, failures/recovery and a practical next action. Provider documentation does not establish observed performance or personal savings. No real account cancellation, purchase, customer-data workflow or product benchmark is authorized.
- Preserve existing functional tools, consent, analytics, affiliate behavior and unrelated routes. No new dependencies or blanket site redesign.

## Ownership and handoffs

- Coordinator owns this scope/check record and browser screenshots/review notes.
- Research owns `research-and-brief.md`: existing coverage/gaps, bounded article briefs and dated primary evidence.
- Editor will own two English draft/review documents based on that evidence; production copy should explain its current evidence scope without exposing old internal cleanup labels.
- Developer owns the directory/navigation/routing/SEO/redirect/regression files agreed with the coordinator, developer notes, and later the two existing TSX article bodies plus their legacy card metadata after editorial handoff.
- Design will review the edited articles and existing covers, then own an agreed visual brief/assets/image mapping if replacement is needed. No invented screenshots or performance claims.
- QA will own an independent report against the original goal, research, copy, visual decisions and final candidate. Consequential findings return to the assigned writer and are rechecked.

The research and directory implementation run independently in parallel. Evidence precedes reviewed article drafting; design follows reviewed copy; final article integration and independent QA follow those handoffs. Native team presets are absent from this checkout; existing delegated role sessions receive the project role instructions. No release is implied by registration on a review branch.

## Continuation — 27 November 2026

The researcher saved the complete bounded source/brief file before its session ended with a usage-limit error. The developer also stopped before its final handoff; its saved Phase 1 changes and test notes remained intact. On the owner's continuation request, the developer and editor confirmed availability and resumed; QA received the saved research for independent checking. These interruptions did not create a product-test result or change a source-review date. Source checking recorded on 26 November remains distinct from the substantive article update on 27 November.

The accepted directory redirect is permanent HTTP 308, matching the existing Vercel convention, not the coordinator's earlier over-specific 301 shorthand. Only exact `/reviews` redirects; individual review routes remain intact.

## Final candidate

The developer completed the five-guide curated hub, automatic discovery for future published guides, navigation/footer/CTA replacements, the exact directory redirect and truthful product-review archive links/breadcrumbs. Both legacy guides now contain the reviewed, source-linked publication copy: about 1,258 Adobe words and 1,530 AI-task words. Their URLs and April 2026 publication month remain unchanged. Optional legacy title/modification metadata supplies the reviewed SEO titles and actual 27 November `dateModified`/Open Graph/sitemap dates without inventing `datePublished`.

The designer produced and integrated a new neutral 1600 × 900 AI-tools WebP through the shared cover record. It replaces the unsupported advantage claim in card/body/social artwork without overwriting the historical file. Adobe artwork remains unchanged. Sources, manifests, previews, validation/contrast and production provenance are in `visuals/`. No dependency or global visual redesign was needed.

## Checks and evidence limits

- `npm run validate:content`: PASS, 10 structured articles plus three preserved legacy entries. Transcript: `content-validation.txt`.
- `npm run content:check`: zero errors, nine existing maintenance/incoming-reference warnings. Its scope excludes the three legacy bodies; this is not misrepresented as their editorial review. Transcript: `content-audit.txt`.
- `npm run check`: PASS, exit 0. Includes lint, app/content/API types, content/quality/presentation and future-guide discovery regressions, stack/tool and API mock tests, build, prerender, client-secret scan and SEO/internal links. Transcript: `project-check.txt`. Prerender/SEO covered 37 indexable routes and 17 redirects; the client-secret scan passed for 41 built assets. Mock API failure lines are expected failure-path tests, not real customer requests.
- Vite reports an 870.62KB JavaScript chunk above its 500KB recommendation. No unrelated bundling refactor was made.
- Developer and QA independently compared all 55 Adobe and 48 AI-tools normalized reviewed copy segments with rendered output; citations, TOC targets and date distinctions were retained. QA separately checked provider documentation; its report lists the actual retrieved scope.
- Design validated editable SVG/WebP manifests, dimensions, budget, source/public equality, full/320px previews and contrast. Adobe public bytes remain unchanged.
- Coordinator checked desktop/mobile rendering, 320px/640px reflow, actual image loading, contents links, keyboard archive/mobile navigation and keyboard-scrolling table semantics. See `browser-review.md` and nine JPEGs. Actual 200% zoom, screen-reader and manual images-disabled testing remain unverified.

No real file migration, print proof, account cancellation, AI generation, exact paid checkout, savings or team-replacement test was run. The public copy clearly describes proposed exercises and provider documentation. Research baseline remains 26 November, with the explicitly qualified ElevenLabs license supplement checked on 27 November.

## Actual project roles and release handoff

Used the existing delegated research, editor, design, developer and QA sessions. Research saved the source audit/brief before its interrupted final handoff; editor supplied the two reviewed drafts; design supplied the new cover and validation; developer supplied directory/routing/metadata/articles/regressions; QA supplied independent source/copy/asset/metadata review. The coordinator owns integration checks and browser observations. No child agents were used.

Candidate paths: `/guides`, `/blog/cancelled-adobe-never-looked-back` and `/blog/ai-tools-look-like-team-of-10`, available through the local port-3107 preview. Independent final disposition is in `qa-review.md`. Owner review of the branch and screenshots is the next release gate. No push, PR, merge or deployment is performed for this batch; the earlier publication approval applied to the previous comparison article.
