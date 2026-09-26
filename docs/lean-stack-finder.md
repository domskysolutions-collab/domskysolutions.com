# Lean AI & SaaS Stack Finder

The homepage contains the authoritative recommendation quiz at `/#stack-finder`. The previous Stack Builder, Stack Recommender and Scorecard implementations are removed. `/stack-builder`, `/tools/stack-recommender` and `/scorecard` permanently redirect to the homepage quiz; the client router also redirects old in-app links. No dependency was added.

## Recommendations and pricing

`src/data/leanStack.ts` owns questions, budget ranges, editorial decision rules, category scoring, segments and text summaries. `src/data/productFacts.ts` separately owns date-stamped provider access facts and official pricing links. The main goal and selected tasks produce at most four categories. Existing tools take precedence. Results explicitly distinguish keep, trial, add-if-the-trial-passes and skip. A product is attached only to a named goal or task gap, and the assistant category never produces overlapping assistants. Optional free-text context never changes rules or leaves the browser.

All initial product records use normal, non-affiliate URLs and omit fixed paid prices. The minimum is zero new subscription spend. The result reports incremental cost only after a candidate passes its trial; it does not fabricate a traditional baseline or total unknown existing bills. Existing fees, tax, domains, hosting, ecommerce fees and usage costs are excluded. Access and team limits must be rechecked before rollout; this is not a complete priced production SaaS or ecommerce architecture. Access information was last checked 2026-09-18, with official sources beside each product.

## Kit setup required before launch

Keep credentials server-side in Vercel. Do not prefix credentials with `VITE_` and do not commit values. This quiz uses the existing v3 form subscription API through its own `/api/stack-subscribe` endpoint, leaving the existing newsletter endpoint unchanged.

Required environment variables:

- `CONVERTKIT_API_KEY`: existing Kit v3 API key.
- `KIT_STACK_FORM_ID`: numeric ID of a dedicated Lean Stack Finder form.
- `KIT_STACK_TAG_IDS`: JSON object mapping every tag below to its real positive numeric Kit tag ID. Empty/invalid configuration returns HTTP 503 rather than fake success.

Tags: `content`, `automation`, `product-building`, `customer-sales`, `cost-reduction`, `solo-founder`, `small-team`, `low-budget`, `AI-beginner`, `technical-founder`.

Create these custom fields in Kit first (exact keys): `stack_business`, `stack_team`, `stack_goal`, `stack_tasks`, `stack_budget`, `stack_existing`, `stack_technical`, `stack_result`, `stack_summary`, `stack_consent`. The server calculates the segments/result itself; client-supplied tag IDs or result categories are not accepted. Optional free text is deliberately excluded.

In the dedicated form, enable the incentive/confirmation email if you want double opt-in. The API accepts both active and inactive subscriptions, never forces confirmation, and unlocks on successful form acceptance. The UI tells inactive subscribers to confirm their inbox message. Configure a Kit automation on confirmed subscription to deliver `stack_result` and `stack_summary` and the occasional practical emails described in consent. Configure the ten tags for relevant follow-up. No result-email automation is created by this code, and the UI does not claim an email has already been sent.

`CONVERTKIT_FORM_ID` remains the separate existing newsletter form. Changing it is not required for the quiz. Old client-prefixed key placeholders were removed from `.env.example`; use server variables instead. No credentials are included in this change.

The real Kit configuration and inbox delivery must be verified with an authorized test address before launch. Do not use another person's email for testing.

## Persistence and analytics

Only quiz answers and progress are saved in local storage under `domsky.lean-stack.v1`; names, emails, consent and unlock state are not persisted. Refresh restores preview/in-progress answers but requires a fresh submission to unlock. Within an unlocked session, editing recalculates locally without resubscribing; those edits do not update Kit fields until another submission. Restart clears quiz and signup state. Corrupt or unavailable storage does not prevent taking the quiz.

No analytics provider was found or added. The optional `domsky:analytics` CustomEvent exposes only a fixed event name and question number. It never contains answers, free text, email or name. A future adapter can consume it without changes to the quiz. Affiliate-click events fire only for explicitly enabled affiliate records.

## Validation

- `npm run lint`: existing TypeScript check.
- `npm run test:stack`: server/client helper typecheck and deterministic tests, including 1,125 rule combinations, four decision states, dated product facts, calculator edge cases, semantic keyboard controls, responsive layout contracts, mocked Kit success/failure, and concurrent-submit protection.
- `npm run build`: Vite and route prerendering.
- `npm run test:seo`: metadata, internal links and route checks.

There is no existing formatter command. Browser QA must cover the seven questions, keyboard use, mobile widths, editing and restart, mocked email paths and print layout. Mock success demonstrates UI behavior, not real Kit delivery. No bypass or mock provider is shipped in the production endpoint.
