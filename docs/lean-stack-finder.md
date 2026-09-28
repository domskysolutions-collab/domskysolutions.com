# Lean AI & SaaS Stack Finder

The homepage contains the authoritative recommendation quiz at `/#stack-finder`. The previous Stack Builder, Stack Recommender and Scorecard implementations are removed. `/stack-builder`, `/tools/stack-recommender` and `/scorecard` permanently redirect to the homepage quiz; the client router also redirects old in-app links. No dependency was added.

## Recommendations and pricing

`src/data/leanStack.ts` owns questions, budget ranges, editorial decision rules, category scoring, segments and text summaries. `src/data/productFacts.ts` separately owns date-stamped provider access facts and official pricing links. The main goal and selected tasks produce at most four categories. Existing tools take precedence. Results explicitly distinguish keep, trial, add-if-the-trial-passes and skip. A product is attached only to a named goal or task gap, and the assistant category never produces overlapping assistants. Optional free-text context never changes rules or leaves the browser.

All initial product records use normal, non-affiliate URLs and omit fixed paid prices. The minimum is zero new subscription spend. The result reports incremental cost only after a candidate passes its trial; it does not fabricate a traditional baseline or total unknown existing bills. Existing fees, tax, domains, hosting, ecommerce fees and usage costs are excluded. Access and team limits must be rechecked before rollout; this is not a complete priced production SaaS or ecommerce architecture. Access information was last checked 2026-09-18, with official sources beside each product.

## Immediate results and optional Kit signup

The seventh answer immediately opens the complete recommendation in the browser. The result does not depend on Kit, an email address or a network request. Visitors can copy, print or save it without subscribing.

The result includes a separate optional `ConvertKitForm` for The Weekly Edge. It uses the existing `/api/subscribe` newsletter endpoint. Keep credentials server-side in Vercel, do not prefix credentials with `VITE_`, and do not commit values.

Newsletter environment variables:

- `CONVERTKIT_API_KEY`: existing Kit v3 API key.
- `CONVERTKIT_FORM_ID`: numeric ID of The Weekly Edge form.
- `CONVERTKIT_NEWSLETTER_TAG_ID`: numeric ID of its newsletter tag.

No dedicated Stack Finder form, result-delivery automation, segment tags or Stack Finder custom fields are required. On Kit Free, send The Weekly Edge as broadcasts. Verify signup, optional confirmation and unsubscribe with an authorized test address before launch.

## Persistence and analytics

Only quiz answers and progress are saved in local storage under `domsky.lean-stack.v1`; newsletter email state is not persisted by the quiz. Refresh restores a completed result or in-progress answers. Editing recalculates locally, and restart clears quiz state. Corrupt or unavailable storage does not prevent taking the quiz.

No analytics provider was found or added. The optional `domsky:analytics` CustomEvent exposes only a fixed event name and question number. It never contains answers, free text, email or name. A future adapter can consume it without changes to the quiz. Affiliate-click events fire only for explicitly enabled affiliate records.

## Validation

- `npm run lint`: existing TypeScript check.
- `npm run test:stack`: client helper typecheck and deterministic tests, including 1,125 rule combinations, four decision states, dated product facts, immediate result delivery, the optional newsletter form, calculator edge cases, semantic keyboard controls and responsive layout contracts.
- `npm run build`: Vite and route prerendering.
- `npm run test:seo`: metadata, internal links and route checks.

There is no existing formatter command. Browser QA must cover the seven questions, immediate results, keyboard use, mobile widths, editing and restart, newsletter success/failure states and print layout. Mock success demonstrates UI behavior, not real Kit delivery.
