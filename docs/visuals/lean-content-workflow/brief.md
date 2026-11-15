# Lean content workflow: visual brief and placement

Article: `/blog/ai-daily-workflow-solo-business`, `src/content/articles/lean-content-workflow.ts`.
Audience: solo creators turning one researched question into an article, email and LinkedIn draft.
Decision: approve the evidence and argument before drafting; approve the corrected article before adapting it.
Archetype: software workflow. Production: original, editable, programmatic SVG diagrams; no synthetic product interface or invented test result.

## Placement and exact content

1. **Workflow overview**, under “The workflow in one view”: all seven existing stages, numbered in order. Stages 3 and 5 explicitly say “Human approval”; stage 7 is a manual release check. The full input/output table stays available in a native disclosure. Alt: “Seven stages from defining the question to the release check, with human approval at the argument and corrected-article stages.”
2. **Claim correction**, before the complete correction record: Kit Help source → rejected draft claim → specific evidence and correction → approved wording. Use only the Kit correction retained in the article, checked 25 September 2026. Label the rejected sentence and dated context in the artwork itself. Alt: “The September 2026 Kit example connects a rejected claim to the specific help article, correction and approved wording.”
3. **Adaptation**, at step 6: source-supported factual core → approved article → email and LinkedIn drafts. Facts and core conclusion stay fixed; opening, structure, depth and action change. Distribution follows review and separate authorization. Alt: “An approved article supplies consistent facts and a core conclusion to distinct email and LinkedIn drafts; distribution still requires approval.”

Desktop compositions: 1600 × 900. Mobile compositions: 1000 × 1500, deliberately rearranged rather than cropped, served below 640px. These portrait files are responsive article assets, not requested social exports. SVG is both editable source and optimized delivery format. Use active cream, charcoal, teal, sage, gold and brick tokens; Lora headings and DM Sans labels, with system fallbacks. No repeated logo within the article diagrams; preserve the approved global logo and featured cover.

Unlike the neighboring title covers, these are instructional figures, with a numbered route, an evidence chain and a branching editorial handoff. Captions and HTML provide equivalent instructions and qualifications. Do not regenerate the existing cover.

## Editorial treatment and evidence

Shorten repeated introductory and review prose. Preserve the three complete tables, demonstration copy, dated sources, all anchors, attribution, disclosure and metadata. Use native, keyboard-operable details for reference tables and semantic lists for release checks. Product facts remain a dated demonstration, not new verification. The email and LinkedIn drafts were not distributed or measured.

Integration on a separate review branch is explicitly authorized by the user. All visuals remain review drafts; this task does not authorize merge or deployment.

## Validation

Run the skill validator on all six manifests with site-path comparison; inspect SVG rendering, browser desktop, 390px and 320px layouts, disclosure keyboard controls, table overflow and anchors. Run `npm run check` and `npm run content:check`. Record outcomes in `review.md` after inspection.
