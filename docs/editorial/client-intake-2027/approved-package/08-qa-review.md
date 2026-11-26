# Independent QA — editorial draft candidate

Writer: delegated `domsky-qa`. Review date: **26 November 2026**. Scope: the original goal in `00-goal-and-handoffs.md`, completed research/evidence/specifications/fixtures, reviewed article and editorial assessment, visual brief, and final candidate-specific implementation plan (`01`–`07`). Only this QA file is assigned to this writer.

**Disposition: READY FOR OWNER REVIEW AS AN EDITORIAL DRAFT ONLY.** The final `07` and research writer's revised `03`/fixtures have been independently reviewed. The consequential P2 is resolved and rechecked. This is not publication approval, a provider test, a website build or a rendered accessibility review.

Finalization followed the coordinator's research-writer READY notification; that writer's own static assertions are separate from the independent QA assertions recorded below.

## Findings

| Severity / status | File | Reader/test impact | Required correction / owner |
| --- | --- | --- | --- |
| **P2 — RESOLVED; independently rechecked** | Original T1–T3 expected-artifact paragraphs in `03-test-specifications.md`; original `records[].expected.max_client_messages` in `fixtures.json` | Base-case success specified only a maximum of one client message. A silent workflow could satisfy the count guard without producing the needed clarification or proving that explicit approval can release the reviewed message. The negative hold criteria were stronger than the positive completion criteria. | Coordinator routed to original `domsky-research` writer. The revision adds the Positive base-run completion contract, a correct artifact and next action for every case, explicit manual send/agent bound approval, exactly one successful base delivery, and exactly zero negative-approval deliveries. QA reread all changed criteria and parsed/asserted every record's new counts, response kind and owner dispositions: PASS for all three; `PROPOSED_NOT_RUN` preserved. No provider test was executed. |

No other consequential finding was identified in the reviewed candidate. This is not a claim that an unimplemented workflow meets its contract.

## Coverage, editorial accuracy and source checks

- The source-registry audit supports a distinct approach-selection article before the Make/Zapier platform decision. Existing Make/Zapier and stack-audit routes exist locally. A read-only search found no existing candidate slug. This is a present-source check, not a guarantee against future route collisions or an independent live-site audit.
- All three approaches use the same synthetic records and policy. The complete, missing-data and exception examples agree across the fixture, article and plan. Manual handling remains a valid choice. Rules handle explicit missing fields; detecting exceptions does not decide them. A fixed classifier is distinguished from model-directed tool use.
- Documentation, proposed expected outputs, actual checks and future assumptions remain separate. All 27 planned base provider/model runs and fault variations are **NOT RUN**. January 2027 and EUR policy/customer figures are synthetic; they do not imply product availability, pricing or benchmark results.
- Independently reopened the primary sources behind C01–C10. The article's architecture, filter/router, approval, eligibility, accounting and recovery statements are supported at their stated scope. In particular, [migration documentation](https://help.zapier.com/hc/en-us/articles/47402591569805-Migrating-from-Agents-to-AI-by-Zapier), [Human in the Loop configuration](https://help.zapier.com/hc/en-us/articles/38731463206029-Request-approval-to-keep-your-workflow-running-with-Human-in-the-Loop), [model-tier rules](https://help.zapier.com/hc/en-us/articles/46425475442829-AI-by-Zapier-model-tier-pricing), [current task accounting](https://help.zapier.com/hc/en-us/articles/8496196837261-How-is-task-usage-measured-in-Zapier) and [rates](https://zapier.com/pricing/rates) support the package's current/legacy and ordinary-trigger distinctions. Product options are not represented as a tested implementation of the proposed dispatcher.
- Reopened [Make pricing](https://www.make.com/pricing): credit-accounting material was accessible, while retrieved priced plan cards remained insufficient for an exact paid quote. Checkout, account access, local tax, selected cadence and connector entitlement were not verified. Omitting a numeric cheapest-plan/ROI conclusion is appropriate. Unknown 2027 prices remain unknown.
- Source paraphrases remain narrow; no long copied passages, customer data, copied screenshots, unsupported personal-use claims, ratings or test results were identified. Direct primary citations support operative statements. The non-affiliate disclosure matches the proposed links. Historical Make/Zapier source dates and its separate maintenance issue remain unchanged.

## Reproducibility and approval boundary

The fixed clock, fixture IDs/messages, required fields, routing precedence, safe templates, owner-only decisions, four-call cap, proposed output records and run-capture protocol provide a useful provider-neutral specification. Before a future execution, operators still must freeze the actual workflow, prompt, tool schemas, model/version, account entitlements and sandbox adapters; this package is not an executable provider harness.

The approval contract binds recipient, body/action, proposal/version and policy. Changed payloads invalidate authority; pending/decline/expiry sends nothing. The model cannot invoke a client-send, booking or price-commitment tool. Concurrent duplicates, failed notifications and accepted-then-timeout delivery are explicitly addressed; native replay is not treated as an exactly-once guarantee. The resolved positive-path correction retains those controls, preserves the rules' narrowly preapproved templates, and does not confuse receipt approval with commercial acceptance.

Rechecked `04`/`05`/`06`/final `07` against the revised protocol: no consequential alignment edit is needed. The article's expected table/holds, editorial claim trace, diagram's valid dispatch route and plan's preservation of canonical success/failure criteria remain consistent. Detailed exact-count semantics belong in the protocol/reference transcript; they do not require repeating the contract throughout the article.

## Metadata, visual proposal and implementation-plan checks

The final plan uses the actual structured article engine, comparison prefix and existing author model. Proposed SEO metadata is consistent with the content. Publication date is unset; the documentation-review date is not a future publication/test date. No new Article, canonical, social image, sitemap entry or public route exists to inspect yet. The proposed schema preserves truthful attribution without fabricated Review/Product/benchmark data.

Local companion filenames are explicitly review links. The final plan proposes accessible same-article reference anchors/transcripts and does not pretend that repository files or guessed public downloads already work. Future implementation must preserve exact canonical inputs, policy and success/failure criteria when converting those companions.

The visual brief supplies equal alternative approaches and one approval-boundary diagram, with exact proposed labels, captions, alt text, mobile reflow and HTML equivalents. It does not invent a winner or imply all approaches need identical per-message approval. Existing figure and table components support the planned responsive source and semantic/focusable table. These are source/design checks only: no new asset, contrast measurement, mobile rendering or assistive-technology result exists.

The final implementation plan correctly keeps this package outside registration, acknowledges the registered-draft date audit, names the future content/build/SEO checks, and separates editorial publication from building a real intake system. Future source refresh, owner date/title/route decisions and actual visual checks remain explicit. No release is authorized by this QA.

## Actual execution log

| Check performed by this QA role | Observed result / limit |
| --- | --- |
| Read original goal, applicable root/content/editorial/brand guidance and candidate `01`–`07` plus JSON | Completed; `07` reviewed after coordinator's FINALPLANREADY notification. |
| Independently retrieve primary C01–C10 source pages / relevant sections | Capability and qualification checks supported; no paid account, checkout or billing-counter access. The evidence ledger remains the detailed claim map. |
| Parse JSON and independently recompute three missing-field sets, exception flags, statuses and calendar lead days | **PASS**: `INT-2027-001` ready, 49 days; `002` needs information, null date; `003` exception, 7 days. Three distinct IDs. This is an offline fixture-consistency check only. |
| Recheck revised positive-path contract in prose and JSON | **PASS** for all three: one source record/notification/prepared response/base sandbox delivery/agent proposal, correct receipt-versus-clarification kind, recorded next action/message decision/commercial disposition, no project acceptance; negative approvals zero deliveries; package remains proposed/unrun. These are static contract assertions, not observed deliveries. |
| Read-only route, author, registry/validator/quality, typed blocks/renderer and package-script inspection | Existing linked routes and proposed representation found; no candidate slug. An initial search guessed nonexistent split component/schema filenames; inspection was corrected to actual `src/content/types.ts` and `src/components/article/ArticleBlocks.tsx`. No test was inferred from that failed search. |
| Read-only website `git status --short` | Clean at inspection. QA wrote only this file outside the website checkout. |

**Not run by this QA role:** npm/content validation/build/SEO commands; website browser/desktop/mobile/zoom/screen-reader checks; artwork generation/rasterization/validator; provider/model workflows, manual intake trial, tool calls with client data, sends, timing/quality/billing measurements; account/checkout tests; commits, PRs, merges, deployment or production verification. The coordinator's live Make/Zapier observation is attributed to the coordinator and is coverage inspection, not product testing.

### Independent source retrieval record

All retrievals below were executed by QA on 26 November 2026. This records the narrow source scope, not actual feature operation or whole-document certification.

| Claim | Primary source independently reopened | Section / scope inspected |
| --- | --- | --- |
| C01 | [Anthropic architectural explanation](https://www.anthropic.com/research/building-effective-agents) | Workflow/agent definitions and simpler-workflow qualification. |
| C02 | [Make filtering](https://help.make.com/filtering); [router](https://help.make.com/router) | Conditional operators and fallback routing; no review-queue execution claimed. |
| C03/C04 | [Zapier migration help](https://help.zapier.com/hc/en-us/articles/47402591569805-Migrating-from-Agents-to-AI-by-Zapier) | Current/legacy migration scope, bundled AI step, task billing, optional per-tool approval and no stated shutdown date. |
| C05 | [Human in the Loop](https://help.zapier.com/hc/en-us/articles/38731463206029-Request-approval-to-keep-your-workflow-running-with-Human-in-the-Loop) | Paid prerequisites, decline configuration and reviewed-field mapping. |
| C06 | [Task help](https://help.zapier.com/hc/en-us/articles/8496196837261-How-is-task-usage-measured-in-Zapier); [rates](https://zapier.com/pricing/rates) | Ordinary Classic-Zap trigger treatment and separately scoped SDK/other surfaces. No usage-counter test. |
| C07 | [Model-tier help](https://help.zapier.com/hc/en-us/articles/46425475442829-AI-by-Zapier-model-tier-pricing) | Free preview, tool eligibility and model/tool accounting; no account entitlement established. |
| C08 | [Make pricing](https://www.make.com/pricing) | Credit FAQ accessible; exact selected paid cards/checkout remain unresolved. QA did not independently establish the optional Zapier price teaser omitted from article prose. |
| C09 | [Incomplete executions](https://help.make.com/incomplete-executions) | Disabled default, retained-failure handling and limits. |
| C10 | [Replay help](https://help.zapier.com/hc/en-us/articles/19220226086797-What-is-replay) | Failed-step versus entire-run scope and repeatable side effects. |

## Outstanding decisions and confidence

No unresolved consequential QA finding remains for the requested draft mode. Appropriately disclosed future decisions remain: accepted title/year/slug, publication date, public reference treatment, real stack/data policy, review capacity, account/connector/model eligibility, paid totals, artwork production and whether to authorize a sandbox trial. These are not silent publication passes and do not justify fabricated results or an unauthorized implementation.

Confidence is high in the **documentation-based draft's stated scope and internal consistency**. Confidence in actual workflow operation, 2027 product behavior, exact costs and final rendered accessibility is not established by this review.
