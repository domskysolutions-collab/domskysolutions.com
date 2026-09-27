# Analytics and consent implementation record

Recorded: 27 September 2026

## Confirmed current behavior

- `index.html` loads Google Analytics measurement ID `G-4609N5N1BC` asynchronously on every route. The loader is part of the initial document and is not gated by a consent preference.
- The site has no consent banner, analytics preference control or stored analytics-consent state.
- `src/lib/stackQuiz.ts` dispatches local `domsky:analytics` browser events containing an event name and an optional question number. No repository code listens for those events or forwards them to Google Analytics.
- The Lean Stack Finder stores quiz progress in browser storage. Its Kit submission path is separate from Google Analytics.
- No new analytics tracking was added in this batch.

The privacy page now describes this technical behavior directly. This record does not determine whether the current behavior satisfies a particular jurisdiction or policy.

## Owner decision required

The repository contains no approved analytics-consent policy. The owner needs to decide whether analytics may load immediately, must wait for opt-in consent, or should be removed.

If the approved policy requires consent before analytics loads, the technical implementation should:

1. remove the unconditional analytics loader from `index.html`;
2. load analytics through one controlled module after the approved preference is available;
3. provide accessible accept, reject and preference controls;
4. persist the preference and provide a way to change it;
5. ensure rejected or undecided states do not make analytics requests;
6. test initial, accepted, rejected and changed-preference states; and
7. update the privacy page to describe the resulting behavior.

No consent implementation should be shipped until the owner approves the intended policy and wording.
