# Domsky editorial style

Help a solo operator make one software decision with the evidence available. Write as an independent advisor, not a vendor landing page. Demonstrate independence through choices, limitations and disclosures.

## Decision before inventory

Open with a specific job, blocker or tradeoff. State the starting recommendation and the condition that would change it. Explain what matters before listing features. Include keeping an existing tool or manual workflow when it meets the need. End with the next useful check, not a summary of every section.

Use familiar words, concrete examples and active verbs. A conditional recommendation can be decisive: name the necessary action, limit or output. Avoid artificial balance when evidence supports a choice; preserve uncertainty where it does not.

## Evidence distinctions

- Provider documentation establishes what the provider says. Cite the exact page, plan and check date.
- A Domsky observation needs dated inputs, plan/version, outputs and failures. A screenshot is not a benchmark. Never imply personal use without a reviewable record.
- Editorial judgment explains why a supported difference matters. Label illustrative calculations and proposed tests.
- Keep unknowns and conflicts explicit. Assign research with acceptance criteria rather than filling gaps with persuasive prose.
- Affiliate recommendations need the same criteria as non-affiliate choices. Disclose before compensated links; keep evidence citations direct.
- Publication, modification and verification dates have different meanings. Meaningful copy revisions may change modification date; only new verification changes verification date.

## Editing choices

Use lists for parallel choices and reproducible checks; prose for an argument. Use tables when equal criteria expose a difference. Keep FAQs that resolve purchase blockers. An em dash, card or common phrase does not establish AI authorship. Remove repetition or empty enthusiasm because it obstructs reading, not to fool a detector.

## Before and after from the repository

| Before | After / editorial treatment | Reader benefit |
|---|---|---|
| Homepage: “What makes this site different from every other AI tools review site” | Name a software decision and link to its comparison | Replaces unsupported superiority with navigation |
| Homepage: “tools reviewed in depth” | “View all reviews” without a depth claim | Catalog size does not establish research quality |
| Homepage: “Free / $20 mo” | Compare workflow decisions; leave price details on dated sourced pages | Removes an undated buying shortcut |
| Make/Zapier: “Copying an inquiry into a spreadsheet is manageable…” | “An inquiry needs a record and an owner notification. Check whether your form already handles both before adding Make or Zapier.” | Names the outcome and avoid-buying condition |
| Separate “fit-based recommendation, not a performance ranking” paragraph | Keep the no-controlled-test limitation in the evidence note next to the decision | Preserves uncertainty without repeating it |
| Legacy seed: “May fit a workflow that specifically needs…” | Retain uncertainty and commission a dated task/output test before writing a verdict | Missing research cannot be fixed by adjectives |

## Human editorial review workflow

Read the diff and answer these questions in the PR. For a failed item, record the passage, evidence needed and disposition rather than checking a box.

1. Does the opening answer a real question and state a reader benefit?
2. Which specific fact changes the reader's choice?
3. Are recommendations justified, including the option to buy nothing?
4. Are product claims supported by sources or test records with the right scope?
5. Can a reader distinguish fact, observation, interpretation and hypothetical example?
6. Is repetition necessary for a reusable worksheet or can it be cut?
7. Does the ending give a useful next decision?
8. What does this add beyond existing Domsky content? Link overlaps.
9. Does each visual explain a process, result or difference with honest provenance?
10. Are voice, author, dates, citations and disclosures accurate?

Run `npm run validate:content`, `npm run content:check`, `npm run test:content`, `npm run build` and `npm run test:seo`, plus required lint/typecheck/stack checks. Automation catches malformed structures, missing metadata, invalid dates and broken references. Humans assess usefulness, independence and originality. Never add a human-writing detector or an automated originality score.
