# Candidate-specific implementation plan

26 November 2026. Writer: delegated `domsky-developer`. **Final plan for this editorial candidate; no website implementation is authorized or performed.** Output mode remains **editorial draft**. This is a plan to publish an article and its references, not to build an intake application, dispatcher, automation or agent.

## Goal, handoff and evidence boundary

Original goal: an English comparison of manual intake, rules-based automation and a human-approved agent over the same complete, missing-data and judgment-exception enquiries, with evidence, price qualifications, three reproducible specifications, visuals, implementation planning and independent QA. Assignment and ownership: `00-goal-and-handoffs.md`.

Inputs read: research brief `01`, C01–C10 and price reconciliation `02`, proposed protocol `03`, canonical `fixtures.json`, reviewed draft `04`, editorial review `05`, and visual proposal `06`. Candidate: **AI Agent vs. Automation: What Should a Solo Business Use for Client Intake in 2027?** Proposed route: `/comparisons/ai-agent-vs-automation-client-intake-2027`.

Provider documents were reviewed **26 November 2026**. The policy and 4 January 2027 clock are synthetic. All 27 planned base provider/model runs and fault variations remain **NOT RUN**. Research's offline JSON/policy check and the coordinator's live Make/Zapier coverage inspection are not product trials. This developer did not independently reopen provider sources or execute workflows.

Repository inspected read-only: `D:/domskysolutions/editorial-overhaul/domskysolutions.com-36ea3c27127de384a5df3fb42b5df77f9abc63bd`.

## Section, status and date gates

Use `contentType: 'comparison'`, `category: 'Comparisons'` and the accepted `/comparisons/…` path. `src/content/validate.ts` requires this prefix for comparisons. `src/pages/ComparisonsPage.tsx` lists it; `src/pages/BlogIndex.tsx` lists only `/blog/` and `/uses`. This candidate therefore belongs in Comparisons, not automatically both indexes. A later request for `/blog/` needs an accepted article/guide type; do not weaken validation.

Current mode: keep this Markdown/JSON package outside the registry. Later implementation needs a fresh isolated branch from then-current `main` and explicit authorization. Do not reuse an earlier publication approval.

`src/content/registry.ts` excludes draft records from routes/cards; `src/App.tsx` maps only published records. A draft with null publication date is schema-valid, but `content:check` audits registered drafts and reports that missing date as an error. Do not invent one to pass. There is no built-in public draft-preview route. A later normal route/card preview requires an owner-approved date and resolved candidate; setting published on a review branch does not authorize production merge.

The title/route/cover year is a planning horizon, not verified future availability or a publication date. Publication date is an owner decision. `verifiedAt` records actual source checking, currently 26 November 2026; recheck time-sensitive sources before a later release. Never set it to 2027 merely to match the title. `updatedAt` records a real revision, not a test result.

## Proposed files for a separately authorized implementation

These are future paths, not existing new files or permission to write now.

| File | Proposed work |
| --- | --- |
| `src/content/articles/ai-agent-vs-automation-client-intake-2027.ts` | One `ArticleDocument`; proposed export `clientIntakeApproaches`, ID `ds-comp-client-intake-approaches-2027`. Recheck uniqueness. |
| `src/content/documents.ts` | One explicit import/registration at an agreed comparison-list position. |
| `docs/editorial/client-intake-2027/` | Archive accepted brief/evidence/protocol, exact synthetic JSON, review record, editable visual sources and manifests. This archive is not automatically public reference material. |
| `public/images/comparisons/ai-agent-vs-automation-client-intake-2027-cover-v1.webp` | Proposed 1600×900 cover after production/validation. |
| `public/images/comparisons/client-intake-approval-boundary-v1.svg` | Proposed 1600×900 body figure. |
| `public/images/comparisons/client-intake-approval-boundary-mobile-v1.svg` | Proposed 1000×1500 reflow of that figure. |
| `src/content/articles/make-vs-zapier.ts` | Only the owner-approved incoming link described below; no historical factual/date rewrite. |

The existing engine derives card, route, SEO, Article/breadcrumb schema and sitemap. No new page, API, integration, dependency, storage, pricing engine or workflow executor is required. No changes to `src/App.tsx`, `src/data/blogPosts.ts`, `src/data/seo.ts`, renderers, global CSS or `vercel.json` are planned without an actual authorized implementation need.

## Map this candidate to actual ArticleDocument fields and blocks

| Accepted content | Existing representation / preservation check |
| --- | --- |
| Title, deck, SEO title and description in `04` | `title`, `deck`, `seoTitle`, `description`; add a concise `excerpt`, consistent social wording and reading time from final copy. |
| Opening recommendation and evidence scope | `paragraph` blocks and a `note`; preserve manual handling as valid, conditional agent use, documentation-only scope, NOT RUN state and synthetic-year explanation near the opening. |
| **Three approaches, one intake job** | H2 `approaches`; paragraphs with direct C01/C02 citations. Preserve fixed-classifier versus model-directed-loop distinction. |
| **Compare the same three enquiries** | H2 `same-enquiries`; fictional-policy paragraphs and a semantic `table` with four columns/three rows. Preserve every fixture ID/value and proposed/unrun label. No image-only table. |
| **Put approval between the proposal and the send** | H2 `approval-boundary`; preserve exact recipient/body/action and proposal/policy binding, changed-payload review, pending/declined/expired holds, synthetic 30-minute expiry and limited authority. Insert one `image` after the general contract and before provider examples, as `06` specifies. |
| Provider approval configuration | Rich-text C04/C05 HTTPS links; distinguish available options from the required Stop-run setting. Feature existence does not establish the full contract. |
| **Budget for the whole process** | H2 `whole-process-cost`; paragraphs/list and C03/C07/C08 references. No unverified checkout total, annual-cadence inference, conversion, cheapest winner or 2027 rate. |
| **Test the ordinary cases and the failed handoff** | H2 `proposed-tests`; paragraphs/ordered lists preserve the 27 planned base runs, common inputs, owner time and duplicate/failed-notification/ambiguous-send variations. C09/C10 remain documentation, not observations. |
| **Choose what to carry into 2027** | H2 `planning-for-2027`; explicit unknown future prices/products/entitlements, conditional next action and no performance result. |
| C01–C10 references | Unique `sources` records with meaningful titles/exact primary URLs; final `sources` block ID `sources`. Keep direct inline claim citations. |
| Contextual/related links | Preserve `/comparisons/make-vs-zapier-solo-business` and `/blog/replaced-saas-stack-with-ai-tools`. Proposed related cards can also include `/uses` and `/blog/ai-daily-workflow-solo-business` where useful. |

Convert deliberately to typed blocks: raw Markdown tables and HTML in strings will not render as rich content. One H1 comes from the renderer; H2 IDs create TOC entries. Reference H3 sections can stay outside the main TOC. `table.summary` supplies a native disclosure for detailed reference tables; it is not a generic arbitrary-Markdown accordion.

## Publish the companions honestly

`04` currently links to package-local `fixtures.json`, `03-test-specifications.md` and `02-evidence-and-pricing.md`. They are review links, **not live website routes**. The content renderer uses the router for slash-prefixed links, and validation/quality expects known internal destinations. Copying JSON/Markdown into `public/` does not itself make an accepted article route or Markdown/download experience. Do not publish relative filenames, guessed public URLs or inaccessible repository paths.

Preferred minimal approach, subject to accepted copy:

1. Replace the companion footer with same-article anchors: `#fixtures-and-policy`, `#test-protocol`, `#evidence-and-pricing`.
2. Supply accessible reference sections using typed paragraphs/lists and tables, with optional native table summaries. Include the exact canonical inputs/messages, synthetic policy, expected states, evaluation protocol and failure/recovery criteria. Label expected values proposed, not results.
3. Preserve exception precedence, tool cap, timeout, approval-binding fields, action keys, three-run repetitions and NOT RUN state needed for reproducibility. Keep source values distinct from expected/derived fields. Rules may release the agreed fixed templates; every AI client message stays externally reviewed. Archive the unchanged machine-readable JSON for future test operators.
4. If the owner requires a public JSON download, separately approve actual hosting/link/rendering support and validate the real destination. That may require a narrowly scoped download-link capability; it is not implemented or assumed here and does not justify a speculative CMS. The public HTML transcript must remain useful without downloading a file.

The article implementation documents these contracts; it does **not** implement or prove an approval dispatcher or provider execution.

## Attribution, schema, disclosure and visual mapping

- Reuse truthful `PUBLIC_AUTHOR` from `src/data/site.ts`; the current page displays Domsky Solutions. Do not invent a test author, credentials or personal-use evidence. The generated structured data remains Article plus breadcrumb, with no fake Review rating, Product/Offer price, HowTo result or benchmark schema.
- Preserve the direct-source non-affiliate disclosure and `affiliateDisclosureRequired: false`. Choose `commercial` from the accepted intent, not to suppress an audit finding. Keep unresolved facts truthful in `verificationPending` during staging; publication readiness requires actual resolution or explicit evidence limitations. A short maintenance window, such as seven days for volatile billing/agent docs, is an owner-review proposal.
- Cover: `featuredImage`/`ogImage` share the approved 1600×900 record and exact alt/caption from `06`. Existing card/body/social/schema handling stays consistent. Store editable SVG and production metadata outside `public/` first. No historic asset is overwritten.
- Body figure: one `image` block with 1600×900 dimensions and `mobile: {src, width: 1000, height: 1500}`. `ArticleFigure` already supports `<picture>` below 640px. Retain `06` alt/caption and equivalent HTML instructions, including the held branches. No repeated logo or fake UI.
- The cover alternatives are equal and unordered. Only the agent diagram has proposal → owner review → validation → external dispatch arrows. Pending/declined/expired approvals have no send path; changed content returns to review. Do not give the rules approach a misleading compulsory per-message gate.
- If the owner changes the year/title, update cover, route and metadata together before production. No artwork exists yet; its manifest remains a concept/draft until actual acceptance/integration requirements are met.

## Incoming link and existing coverage

Propose one contextual link near the end of **“1. Client inquiry: one record and one owner notification”** in `src/content/articles/make-vs-zapier.ts`, inviting readers to compare manual/rules/reviewed-agent approaches before picking a platform. The exact insertion still needs owner approval in the future implementation diff; no incoming link has been changed or approved by this plan.

Do not duplicate the old plan table or rewrite its historical source dates. Research C06 identifies a separate maintenance opportunity because current ordinary-trigger documentation now agrees; queue that as another scoped update. The quality audit counts incoming `relatedSlugs`, not every prose backlink. A useful prose link can still leave an incoming-related warning; report it instead of replacing unrelated cards solely to silence the signal. If a related card is approved instead, inspect the actual first-four display in `RelatedArticles` when selecting the slot.

## Future checks and release sequence — NOT RUN here

1. Obtain accepted scope, final title/year/route, publication date, reference-material approach and visual production authorization. Recheck current sources/paid-plan boundaries. Resolve consequential QA findings with the assigned writer.
2. On a fresh review branch, assign one writer per implementation file. Convert accepted content, produce/stage real assets, validate and integrate only the authorized candidate. Do not connect providers or customer data to publish editorial copy.
3. Run `npm run validate:content`, `npm run content:check`, then `npm run check` from the repository root. The last includes lint, app/content/API typechecks, content/quality/presentation, stack/tool/API tests, build/prerender/secret scan and SEO/internal links. After subsequent content edits, rerun affected content/build/SEO checks; `test:seo` uses build output. A green website build is not a provider or business-outcome test.
4. Once artwork exists, run `.agents/skills/domsky-editorial-visuals/scripts/validate-visual.py --manifest <actual-manifest>` for each real file. Use `--repo . --check-site-path` only when approval/integration requirements are genuinely met. Inspect source/delivery equality, actual dimensions/format/XML, byte budget and renderings.
5. Inspect comparison listing/article at desktop, 390px, 320px and 200% enlargement, plus relevant assistive-technology checks. Confirm one H1, readable text/labels, no clipping or page overflow, keyboard-scrollable tables with captions/row/column headers, disclosures, fragments and reference links. Verify the mobile image source and text equivalents with images absent. Cross-check all three cases across prose/table/appendices.
6. Inspect generated canonical, title/description, Article/breadcrumb, author/date fields, social image and sitemap. Recheck duplicate slug against then-current structured/legacy/static paths; today's no-match search cannot prevent later collisions. Verify intended section and approved incoming link.
7. Open a focused PR with accepted package, screenshots, real command results, evidence limits and unresolved items. Owner acceptance of this draft is not automatic merge/deploy approval. A later authorized release requires production verification of article, listing, images, metadata and links.
8. Record base commit and asset paths before release. A consequential defect should hold publication or trigger a reviewed revert of the focused article/registration/incoming-link change and rebuild. Preserve unrelated pages and older assets. A withdrawn published URL needs a deliberate correction/redirect decision; do not silently break it or backdate history. A failed provider trial must block or qualify tested claims, not be hidden by a passing build.

## Actual checks and unresolved handoff

**Performed by this role:** source/registry/router/validator/renderer/SEO/prerender/script inspection; review of all completed candidate/evidence/protocol/fixture/design files; read-only search for the proposed route and figure stem (no existing matches); `git status --short` remained clean in the website checkout. Only this plan was written.

**Not performed:** npm/build, browser/layout/zoom/assistive-technology checks, artwork production/validation, provider-source reopening, checkout/account inspection, workflow/model runs, timing/counter measurements, application implementation, PR/remote writes or release. Research's offline JSON check and coordinator's live coverage observation remain attributed to those roles.

Carry to QA/coordinator: final title/year/slug and publication date; real form/inbox/CRM and data/retention policy; owner review/maintenance capacity; provider account/product generation/model/tool access/connector entitlement; actual paid cadence/currency/region/tax/allowance and retained services; public reference-material format; optional provider sandbox trials; approved artwork and actual accessibility verification. No future 2027 capability, price or performance is established.

**Ready for independent QA:** pass this candidate-specific plan with the original goal, evidence, reviewed article and design brief. Consequential changes return to the owning writer and are rechecked before owner review or future implementation.
