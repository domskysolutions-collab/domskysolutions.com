# Visual brief — client intake approaches

Writer: delegated `domsky-design`. Date: **26 November 2026**. Output mode: **editorial draft**. Status: **proposal only; no artwork generated, integrated or validated**. This file is the role's sole output. It is not owner approval, a product interface design or evidence of a workflow test.

## Goal, inputs and visual decision

Support the reviewed English draft **“AI Agent vs. Automation: What Should a Solo Business Use for Client Intake in 2027?”** Compare manual handling, rules-based automation and an agent with human approval without implying a winner or a compulsory progression through the approaches.

Inputs read: the original goal/ownership map (`00`), research brief and C01–C10 evidence (`01`/`02`), proposed test protocol (`03`), fixed synthetic fixtures, reviewed article (`04`) and editorial review (`05`). Source review is November 2026; the January 2027 clock, budgets and studio policy are fictional test conditions. Every provider/model intake run remains NOT RUN. None of the visuals may turn those specifications into results or imply verified 2027 product features/prices.

Read-only design inspection covered root `AGENTS.md`, the content-engine rule, editorial style and visual identity, `src/index.css`, `src/data/articleCovers.ts`, the approved brand directory, and the `domsky-editorial-visuals` skill with its archetype/composition/quality/integration references. Actual neighboring artwork inspected: `public/images/comparisons/make-vs-zapier.png` and `public/images/blog/chatgpt-business-hub-small-business.webp`.

**Propose one restrained cover and one responsive inline approval diagram.** Keep the article's three-case comparison as semantic HTML. A second image of the same nine table cells would repeat the article and create small phone text. No screenshot, provider logo, robot, decorative dashboard, speed chart, star rating or savings graphic is justified by this evidence.

## Brand and production constraints

Use the active CSS tokens as authority, not an independent replacement palette:

| Role | Current token / value | Use |
| --- | --- | --- |
| Reading surface | `page` / `#F4F0E8` | Main canvas |
| Essential type | `ink` / `#2B2A28` | Titles and instructions |
| Structure / review gate | `action` / `#2F5D5A` | Text, rules and approval emphasis |
| Secondary field | `sage` / `#DFE7DE` | Restrained grouping |
| Accent | `gold` / `#B99963` | Thin rule only; no small gold text on cream |
| Secondary text | `secondary` / `#505650` | HTML captions |

Headline family: `--font-serif` (Lora with the existing serif fallbacks). Labels/body: `--font-sans` (DM Sans with system fallbacks); use `--font-mono` only for fixture IDs if necessary in HTML. Do not download fonts or promise identical SVG font metrics across systems. Source text remains editable.

Approved logo: reuse the unmodified geometry from `public/images/brand/logo-light.svg` for the cream cover. No recreated or traced DS mark and no invented OpenAI/Make/Zapier marks. The inline instructional figure needs no repeated logo.

Use precise programmatic SVG for the cover source and diagram. Encode an optimized WebP cover for listing/body/social delivery, preserving native aspect ratio. No generative illustration is needed. Use solid fills, restrained dividers, about 5% safe margins and square or minimally rounded fields. No gradients, glow, animation or 3D. Artwork is editorial explanation, not synthetic product UI.

## A — Cover: three legitimate approaches

**Archetype:** software-workflow family with `flow: false`: these are alternative approaches, not chronological steps or subscription tiers. This is a selection comparison without named competing products; do not force it into a vendor-logo template.

**Future dimensions:** 1600 × 900. Source SVG plus same-size WebP; no separate social or portrait export is needed for the cover. Proposed source stem: `ai-agent-vs-automation-client-intake-2027-cover-v1`. Proposed delivery: `/images/comparisons/ai-agent-vs-automation-client-intake-2027-cover-v1.webp`. These are file proposals, not existing assets or a registered URL.

**Composition:** actual DS logo at upper left and a thin gold rule. A large left-aligned two-line headline occupies the upper/left reading area; three equal-width, unnumbered typographic fields identify the alternatives below it. Use cream/sage fields with the same dark type and a common teal top rule. No darker “winning” agent panel, comparison scores, directional arrows between alternatives, upward staircase or “upgrade” label. This differs from the nearby Make/Zapier product panels and Business Hub's numbered preparation route by showing equal unordered approaches.

**Exact permitted text:**

- Category, optional: `COMPARISONS`.
- Main headline: `Client intake` / `in 2027`.
- Alternative labels: `Manual`, `Rules`, `Agent + review`.
- No other claim, provider price, performance adjective, badge or result in the image. The full working title stays in HTML.

Aim for a 96px or larger main headline and 64px or larger approach labels on the source canvas; inspect actual font widths. Reduce supporting text or simplify geometry before reducing the main labels. At a 320px thumbnail, the topic and three alternatives must remain recognizable. Do not add a tiny essential future-availability caveat inside the cover.

**Placement:** use the normal article featured-image slot after the disclosure; the H1/deck already gives the conditional decision before the cover. Keep the article's evidence-scope statement near the opening. No global renderer/layout change is required merely to mimic Make/Zapier's special ordering. The cover can serve listing/social metadata without adding another cover later in the body.

**Alt text:** `Three client-intake approaches for 2027 planning: manual handling, rules-based automation and an agent with human review.`

**Caption:** `Editorial planning illustration. Provider documents were reviewed in November 2026; the proposed intake scenarios have not been run.`

The visible year is a planning horizon. If the owner removes or changes the title's year, revise the cover text before producing an asset; do not silently retain a contradictory year in card/social artwork.

## B — Inline figure: the model proposes, an external gate releases

**Reader question:** what actually prevents an AI-generated reply from reaching a client before review?

**Placement:** within **“Put approval between the proposal and the send”**, after the paragraph ending “Pending, declined or expired approval must send nothing” and its 30-minute test-expiry clarification, before the paragraph about Zapier configuration. If the final copy combines those paragraphs, keep the figure after the general architecture and before provider examples. It illustrates the proposed architecture from `03`, not C04/C05 as a guarantee of a ready-made safe workflow.

**Archetype / method:** software workflow; editable SVG plus a separately reflowed mobile SVG. Propose 1600 × 900 desktop and 1000 × 1500 mobile canvases. Suggested stems: `client-intake-approval-boundary-v1.svg` and `client-intake-approval-boundary-mobile-v1.svg`. These are two layouts of one figure, not two extra concepts. The current `ArticleImage.mobile` and `ArticleFigure` picture/source support can serve the mobile layout below 640px. No new package or image-only custom interaction is needed.

**Exact main route text, in order:**

1. `Agent proposes` — supporting line: `Read-only tools + a draft`.
2. `Owner reviews` — supporting line: `Recipient, message and action`.
3. `Validate approval` — supporting line: `Same proposal and policy version`.
4. `Dispatcher sends` — supporting line: `Only the exact approved message`.

**Required branch text:**

- From review while pending, declined or expired: `Hold — no send`.
- From validation after any recipient, body, action or policy change: `New review required`.
- A return arrow goes to owner review; it never joins the send route downstream of validation.
- Figure title: `Proposed agent approval boundary`.
- Short separate note in HTML: `Approving a receipt does not accept a project, discount or deadline.`

**Logic contract:** the model has no send/booking/price-commitment tool. Show no direct arrow from the model or read-only tools to a client/outbox. Only a valid bound approval reaches the external dispatcher. The sender is outside the model's control. Approval does not grant continuing authority. Use “exact approved message” rather than a check-mark badge or broad “safe” label. The diagram does not establish that any named product already meets the contract; later implementation must prove it.

Do not add the fictional 30-minute expiry as a product timer or provider default. Its value stays in the adjacent HTML/test protocol. Do not put a price, a completed run count, a confidence score or an acceptance label in this figure.

**Desktop layout:** four numbered nodes in one clear left-to-right route. Group model/read-only work separately from the owner-and-dispatch boundary with a quiet divider, not a lock icon. Place the held branch below review and the changed-payload return beneath validation. Label connectors in words, keep arrowheads outside text, and avoid crossing paths. Cream base, charcoal labels, a restrained teal review/validation treatment; a pale sage held area can be distinct without implying failure or a provider defect.

**Phone layout:** four main nodes vertically, preserving 1–4 DOM/transcript order. Branch labels sit immediately beneath the node they qualify; the held path has no outgoing send arrow. The changed-payload path says `Return to owner review` in plain text if a long return line would crowd the layout. Recompose rather than crop or shrink the desktop diagram. Aim for primary labels at least 48–52px on the 1000px canvas (about 13–14px at a 270px article width); keep all essential detail in adjacent 16px-or-larger HTML. Increase figure height or simplify copy rather than force unreadable text.

**Alt text:** `Proposed agent route: draft, owner review, approval validation and external dispatch. Pending, declined or expired approvals hold the message; changed content needs new review.`

**Caption:** `Proposed architecture, not a tested provider workflow. The model cannot send; approval applies only to the reviewed action.`

**Equivalent HTML:** retain the existing section's explanation of the exact recipient/body/action, proposal/policy versions, pending/declined/expired behavior and changed-payload review. Provide the four route labels as a short ordered text sequence if the figure replaces any adjacent wording. The figure must not be the only place a reader learns these instructions. A static SVG is not interactive; do not add fake buttons or keyboard focus to decorative nodes.

## Preserve the article's comparison table

Under **“Compare the same three enquiries”**, retain the existing three rows and four columns in semantic HTML. Preserve the fixture IDs and all fictional values; label expected handling as proposed/unrun. Use the repository's focusable horizontal-scroll region, caption, column headers and row headers. At 320–390px the region may scroll, but the page must not widen. Do not replace it with a desktop screenshot, tiny infographic or a card per sentence.

The approval figure applies only to this agent configuration. Keep explicit in the table/prose that the rules path may release a preapproved safe receipt or missing-fields template after its checks; owner-only commercial exceptions remain separate. Do not redraw all three approaches with identical per-message approval gates or falsely suggest that the agent's human review burden is absent.

## Future asset and accessibility acceptance criteria — not run

After separate authorization to produce/integrate assets:

1. Confirm accepted article title/year, slug, owner publication date, reviewed copy and any updated evidence. Preserve actual author/source dates and disclosure. In concept-stage manifests use `articleStatus: concept` and null `articleSlug`; do not pretend the proposed route is already published. Change manifest state only when the candidate is genuinely accepted/integrated.
2. Save source brief, editable SVGs, encoded cover, exact alt/captions and production provenance outside `public/` first. Use new versioned delivery filenames. No historical asset is replaced by this proposal.
3. Run the existing visual validator on real source/delivery manifests. Use site-path byte comparison only once integration/status requirements are truly met. Check XML, dimensions, no active/external SVG content, alt text and byte budget (target each file below 400KB; optimize well below that when possible). A draft manifest pass is not release approval.
4. Render at full size and a 320px cover thumbnail; inspect main labels, glyphs, actual logo geometry, margins and all branch meanings. No label clipping or implied winner. Verify the year and caption agree.
5. Check normal text contrast at least 4.5:1, large type at least 3:1, cream/teal reverse text and visible keyboard focus for the HTML table. Gold is an accent, not a substitute for readable type. Do not encode approval solely with color; the labels and branches must carry it.
6. Inspect desktop and 320/390px article/listing views, 200% text enlargement, native ratio/space reservation, selected mobile source, no document overflow, readable captions, semantic headings, table keyboard scrolling and equivalent text with images unavailable. Screen-reader/zoom checks remain pending until a real candidate exists.
7. Run the project's content, presentation, build, SEO and link checks as part of the later implementation plan. Confirm cover/card/OG/schema paths agree and the body figure is not duplicated automatically.

**Actual checks in this role:** read-only guides/tokens/renderer-convention review, inspection of the two named neighboring raster images, and consistency review of this brief against `04`/`05` and the proposed approval contract. No assets, screenshot, raster conversion, visual validator, npm/build, browser layout, contrast measurement or assistive-technology test was produced/run here. No provider page was independently rechecked by this design role.

## Handoff to developer / coordinator

Goal and mode remain the original editorial package. Expected developer output is a candidate-specific **implementation plan**, with actual repository paths, reuse of existing figure/table support, draft/route/date gates and the future validation commands. This file does not authorize implementation or asset generation.

Unresolved owner decisions: final title/year treatment and comparison route; publication date; real form/inbox/record store, data handling and acceptable review load; whether to perform an actual sandbox trial; account/connector entitlement and current checkout before any price-based selection. Future 2027 capabilities/prices remain unknown. Final QA and owner editorial approval are pending. Any consequential change to the draft's approval logic must be reflected in this visual brief by its assigned writer before production.
