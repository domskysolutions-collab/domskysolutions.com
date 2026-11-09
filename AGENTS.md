# Domsky implementation guidance

Read `.cursor/rules/domsky-content-engine.mdc`, `docs/DOMSKY_EDITORIAL_STYLE.md` and `docs/DOMSKY_VISUAL_IDENTITY.md` before editorial changes. Approved briefs remain the factual source of truth; style rules never authorize invented facts.

Start broad editorial work with an audit and scoped plan. The current baseline is `docs/DOMSKY_AI_SLOP_AUDIT.md` and `docs/DOMSKY_IMPROVEMENT_PLAN.md`. Implement small batches on separate branches for review. Use the human editorial review workflow in the style guide; automation checks measurable correctness, not authorship or originality.

Preserve evidence limits, attribution, disclosures, URLs, canonicals, schema and publication dates. Verification dates change only after actual verification. Queue missing facts as research tasks with acceptance criteria.

Keep the stack and lockfile. Preserve newsletter, finder logic, consent, analytics, affiliate tracking and unrelated behavior unless a specific authorized change requires it. Do not merge or deploy a review batch without user authorization. Report files changed, reader benefit, checks and remaining research/release concerns.
