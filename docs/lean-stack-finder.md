# Lean AI & SaaS Stack Finder

The homepage contains the quiz at `/#stack-finder`. The previous Stack Builder page, rules, CSS and tests are removed. `/stack-builder` permanently redirects to the homepage quiz; the client router also redirects old in-app links. No dependency was added.

## Recommendations and pricing

`src/data/leanStack.ts` owns questions, currencies/budget ranges, product records, official pricing source links, configurable affiliate flags, category scoring, segments and text summaries. The main goal sets the core four categories. Tasks and business type add priorities; low budgets and cost-reduction retain only four categories, other paths allow up to six. Existing tools take precedence over new products. Beginners get guided choices; technical product builders get GitHub. Teams receive shared/manual alternatives where seats could exceed free tiers. Optional free-text context never changes rules or leaves the browser.

All initial products have documented free plans and normal, non-affiliate URLs. Existing affiliate data elsewhere is untouched. The minimum is zero new subscription spend. Any displayed upper range is explicitly a planning allowance for an optional upgrade, not a fabricated vendor price or a total of unknown existing bills. Existing fees, tax, domains, hosting, ecommerce fees and usage costs are excluded. Free plans and team limits must be rechecked before rollout; this is not a complete priced production SaaS or ecommerce architecture. Prices/free availability last checked 2026-09-18, with official sources beside each product.

## Kit setup required before launch

Keep credentials server-side in Vercel. Do not prefix credentials with `VITE_` and do not commit values. The quiz uses Kit API v4 through its own `/api/stack-subscribe` endpoint, leaving the existing newsletter endpoint unchanged.

Required environment variables:

- `KIT_API_KEY`: Kit API v4 key.
- `KIT_STACK_FORM_ID`: numeric ID of a dedicated Lean Stack Finder form.
- `KIT_STACK_SEQUENCE_ID`: numeric ID of the welcome sequence.
- `KIT_STACK_TAG_IDS`: JSON object mapping every tag below to its real positive numeric Kit tag ID. Empty/invalid configuration returns HTTP 503 rather than fake success.

Tags: `content`, `automation`, `product-building`, `customer-sales`, `cost-reduction`, `solo-founder`, `small-team`, `low-budget`, `AI-beginner`, `technical-founder`.

Create these custom fields in Kit first (exact keys): `stack_business`, `stack_team`, `stack_goal`, `stack_tasks`, `stack_budget`, `stack_existing`, `stack_technical`, `stack_result`, `stack_summary`, `stack_consent`. The server calculates the segments/result itself; client-supplied tag IDs or result categories are not accepted. Optional free text is deliberately excluded.

After placing `KIT_API_KEY` in an uncommitted `.env.local`, run `npm run setup:kit`. This idempotently creates missing fields and tags, creates or reuses the `Lean Stack Finder — Welcome` sequence, and adds three draft emails when that sequence is empty. It prints the generated sequence ID and tag mapping. Review the drafts before publishing them. Kit API v4 does not create forms, so the dedicated form remains one manual dashboard step.

In the dedicated form, enable its incentive/confirmation email for double opt-in. The endpoint creates an inactive subscriber, adds the subscriber to the form, applies the calculated tags, and enrolls the subscriber in the configured sequence. Existing active subscribers remain active. The UI tells inactive subscribers to confirm their inbox message. The three setup-script emails are created as drafts, so they cannot send until reviewed and published. The UI does not claim an email has already been sent.

`CONVERTKIT_FORM_ID` remains the separate existing newsletter form. Changing it is not required for the quiz. Old client-prefixed key placeholders were removed from `.env.example`; use server variables instead. No credentials are included in this change.

The real Kit configuration and inbox delivery must be verified with an authorized test address before launch. Do not use another person's email for testing.

## Persistence and analytics

Only quiz answers and progress are saved in local storage under `domsky.lean-stack.v1`; names, emails, consent and unlock state are not persisted. Refresh restores preview/in-progress answers but requires a fresh submission to unlock. Within an unlocked session, editing recalculates locally without resubscribing; those edits do not update Kit fields until another submission. Restart clears quiz and signup state. Corrupt or unavailable storage does not prevent taking the quiz.

No analytics provider was found or added. The optional `domsky:analytics` CustomEvent exposes only a fixed event name and question number. It never contains answers, free text, email or name. A future adapter can consume it without changes to the quiz. Affiliate-click events fire only for explicitly enabled affiliate records.

## Validation

- `npm run lint`: existing TypeScript check.
- `npm run test:stack`: server/client helper typecheck and deterministic tests, including mocked Kit success, failure, missing config, invalid input, inactive subscription, and concurrent-submit guard.
- `npm run build`: Vite and route prerendering.
- `npm run test:seo`: metadata, internal links and route checks.

There is no existing formatter command. Browser QA must cover the seven questions, keyboard use, mobile widths, editing and restart, mocked email paths and print layout. Mock success demonstrates UI behavior, not real Kit delivery. No bypass or mock provider is shipped in the production endpoint.
