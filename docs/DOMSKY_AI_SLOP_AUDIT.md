# Editorial authenticity audit

9 November 2026 · source baseline `36ea3c2` · audit before first-batch edits.

## Scope and limits

Reviewed the route registry, eight structured articles, three legacy blog bodies, eleven seeded review entries and their shared renderer, Kit and Namecheap reviews, homepage, navigation, categories, tools, stack guide/finder, About, methodology, footer, content validators, SEO/prerender pipeline and publishing instructions. The homepage was also retrieved publicly. Live article/methodology retrieval failed in the web tool; this does not prove an outage. Visual observations in this audit initially refer to source structure, not a completed live browser review. No product tests or fresh pricing verification were performed. Later validation is recorded separately.

The central problem is a mismatch between a useful research publication and promotional presentation. The strongest content already distinguishes documentation from tests. Making it sound more confident would reduce credibility. Eleven legacy reviews deliberately use one evidence-limited seed template: honest, but almost no product-specific decision support. More confident prose cannot replace that missing research.

## Ranked findings

| Priority | Evidence and location | Reader impact and recommendation | Risk |
|---|---|---|---|
| P0 | `src/pages/HomePage.tsx`: undated $20 price teasers and “tools reviewed in depth”; `src/data/toolReviews.ts`: shared legacy disclaimer says no complete test record | Remove homepage price shortcuts and depth claim. Point to dated comparison evidence. Review count is real but does not establish depth. | Low for homepage; research needed for product prices |
| P0 | `src/pages/ToolsPage.tsx`: “preview before its email unlock”; finder currently goes directly to full results | Queue correction of the contradictory access explanation. Preserve optional signup and finder behavior. | Low copy risk; not part of pilot |
| P1 | Homepage: “What makes this site different from every other AI tools review site”, “Real pricing. Real limitations.”, repeated trust/benefit grids | Replace self-endorsement with an actual decision and specific reading routes. No claim of market-wide superiority is supported. | Low |
| P1 | `src/data/toolReviews.ts`: eleven products share generic features, pros/cons and verification instructions | Treat these as research backlogs rather than deep reviews. Commission one bounded test per product before writing a verdict. Do not delete URLs or evidence warnings. | High if rewritten without evidence |
| P1 | `src/pages/ReviewsPage.tsx`: category becomes “Best for”; `BlogIndex.tsx`: “AI Insights & News” covers mostly evergreen guides | Match labels to what is actually known. Category is not a comparative recommendation; evergreen material needs decision discovery rather than news framing. | Low; later batch |
| P1 | `src/content/articles/lean-content-workflow.ts`: publication instructions such as “Before sending…” appear beside demonstration email/social copy | Mark the whole example more clearly as a worked example or edit out production instructions in a later focused review. Preserve genuinely useful consent/review checks. | Medium: avoid losing tutorial substance |
| P1 | `src/components/article/ArticlePage.tsx`: every article has the same prominent mono title, large figure and boxed contents; `ArticleBlocks.tsx`: many bordered rounded surfaces | Pilot a quieter, page-scoped comparison treatment. Evidence note and decision must precede a decorative cover. Keep accessible comparison tables and clear disclosure. | Medium if changed globally; low when scoped |
| P1 | `make-vs-zapier.ts`: two scene-setting paragraphs precede verdict; “That is Domsky’s fit-based recommendation…” repeats the evidence note | Open with the record-plus-notification problem, then retain the conditional recommendation. Convert the evidence quote to a clearly labeled note; no invented experience. | Low |
| P1 | Published verification dates are September/October while this audit is November | Queue pricing, entitlement and beta reviews. Old date is evidence age, not proof a particular claim is false. Never reset verification dates after copy editing. | High if freshness is implied |
| P2 | Homepage: repeated three-column reviews, comparisons, proof strip, three numbered claims, blog grid, four benefit cards | Retain useful choices but collapse duplicate promotional scaffolding into a lead comparison, a short reading list, one comparison table, the finder and newsletter. | Medium: preserve anchors and forms |
| P2 | About: “No Hype. Just What Works.”, “This is the alternative.”, “THE NUMBERS”; footer: “Independent. Ad-free. Builder-focused.” | Later replace slogans with author scope and links to evidence policy. Retain real background and AI-assistance disclosure. Verify ad/sponsor policy rather than inventing independence credentials. | Low copy risk |
| P2 | Shared figure assets mix light sage illustrations with warm dark site; some legacy imagery is decorative | Keep existing valid assets; prefer useful labeled process diagrams and real, dated screenshots when available. Do not generate imitation product UI. | Medium asset changes |
| P3 | Em dashes, lists, cards and table repetition occur throughout | No blanket removal. Lists support checks; tables compare equal criteria; cards help distinct destinations. Reduce only redundant furniture and filler. | Low |

## Per-article improvement queue

Each row states the missing contribution, not a finding of factual falsity. All queued research requires dated sources or captured product evidence; it is not permission to invent results.

| Priority | Article / source | Concrete editorial work and evidence task |
|---|---|---|
| P1 | Make vs Zapier (`make-vs-zapier.ts`) | Pilot: direct inquiry opening, unboxed verdict, prominent evidence scope; keep workflow and recovery tables. Original upgrade: scoped trigger-billing clarification and one duplicate/failure trial. Cover is a diagram, not evidence. |
| P1 | ChatGPT vs Claude vs Gemini (`chatgpt-vs-claude-vs-gemini.ts`) | Reduce repeated subscription cautions; keep plan/privacy distinctions. Research refreshed entitlements and one same-input task with correction log before ranking output quality. Show annotated outputs only after capture. |
| P1 | Codex vs Claude Code (`astra-vs-claude-code.ts`) | Check terminology, current model access and plan references. Keep supervised-change framing. Original analysis requires same starting commit, acceptance criteria and review effort; show real diff, not a fabricated speed result. |
| P1 | Kit vs MailerLite vs beehiiv (`kit-vs-mailerlite-vs-beehiiv.ts`) | Keep welcome/sequence/branch distinctions; repeated allowances across verdict, table and FAQ need selective consolidation. Refresh equal-list-size, equal-cadence prices; test confirmed/unsubscribed journeys. A journey diagram is useful. |
| P1 | Kit review (`kit-review.ts`) | Evidence separation is strong; several plan reminders overlap comparison. Focus on one subscriber journey and explain upgrade trigger once. Needs real confirmation/export tests and exact plan captures before interface judgments. |
| P2 | Software audit (`software-stack-audit.ts`) | Keep zero/negative cases and cash/time separation; worksheet repeats sequence intentionally for reuse. Tighten only duplicated explanation. Original upgrade: anonymized owner-supplied inventory with explicit consent. No invented savings. |
| P2 | Lean stack (`lean-solo-business-stack.ts`) | Three business paths are useful; repeat keep/add/skip guidance can be shortened later. Link to task-specific evidence instead of restating product limits. Refresh plan examples. Visual should show a decision, not a logo collection. |
| P1 | Lean content workflow (`lean-content-workflow.ts`) | Separate worked email/social example from production instructions; avoid repeating the same email limits in multiple blocks. Real opportunity: publish a sanitized source-to-correction example with actual edit history. |
| P1 | 10 AI tools (`BlogPost2.tsx`) | Category map overlaps review directory and stack guide. Replace broad discovery framing with precise missing jobs once research exists. Keep evidence warning; no team-replacement claim. Needs current per-category trial evidence. |
| P2 | Adobe switching (`BlogPost5.tsx`) | Existing practical checklist is preferable to unsupported cancellation story. Add representative file compatibility tests only when files/results exist. Do not resurrect years-of-use or savings claims. |
| P1 | Beginner AI (`BlogPost6.tsx`) | Long legacy reading scaffolding for a beginner task; metadata excerpt promises unusually comprehensive explanation. Review intro and task instructions together; original contribution could be one real input, revision and failure example. |
| P1 | Claude review (`toolReviews.ts`, `/reviews/claude`) | Generic seed does not establish writing/reasoning advantage. Capture one constrained writing task, correction effort and exact plan before a recommendation. |
| P1 | Perplexity (`/reviews/perplexity`) | Same seed; research citation retrieval and source correctness with traceable queries. Source links alone do not establish accuracy. |
| P1 | Cursor (`/reviews/cursor`) | Same seed; same-repository change and review diff needed. Distinguish editor workflow from coding subscriptions; do not infer time savings. |
| P1 | Notion AI (`/reviews/notion-ai`) | Same seed; evaluate a defined workspace query, permissions and retrieval outcome. Avoid generic workspace-efficiency praise. |
| P1 | Runway (`/reviews/runway`) | Same seed; record generation task, actual credits, export and rights context. No output-quality ranking yet. |
| P1 | ElevenLabs (`/reviews/elevenlabs`) | Same seed; exact voice task, consent/licensing, corrections and runtime spend needed. Audio sample only after authorized capture. |
| P1 | Midjourney (`/reviews/midjourney`) | Same seed; supplied brief, iteration log, plan and commercial-use checks needed. No generic creativity verdict. |
| P1 | Jasper (`/reviews/jasper`) | Same seed; test a governed marketing brief, review constraints and correction burden. No assumed ROI. |
| P1 | Descript (`/reviews/descript`) | Same seed; real transcript/edit/export case needed. Keep original recording permissions explicit. |
| P1 | Framer (`/reviews/framer`) | Same seed; verify publishing, export and CMS constraints for a bounded site. No fabricated launch speed. |
| P1 | Synthesia (`/reviews/synthesia`) | Same seed; script/localization/export test and rights evidence needed. No universal training-video recommendation. |
| P1 | Namecheap (`NamecheapReviewPage.tsx`) | Honest checklist but weak review differentiation. Verify exact extension registration/renewal, recovery and transfer workflow; no personal support story without logs. |

## What should remain

The warm dark palette and orange accents are recognizable. Mono labels, a readable body measure, source citations, direct evidence links, real author identity, commercial disclosures, no numerical ratings, explicit unexecuted-test labels and keep/manual options are strengths. The utility tools are working surfaces, not decorative content; preserve their behavior. Do not remove FAQs that answer actual purchase blockers or strip lists that make a test reproducible.

No AI-detector score, phrase count or universal originality score was used. The findings concern reader decisions, evidence and repetition, not the presumed origin of prose.
