# Coordinator assignment

Date: 26 November 2026 (Europe/Bratislava). Output mode: **editorial draft**.

Original owner goal: Prepare an English comparison article for Domsky Solutions with working title “AI Agent vs. Automation: What Should a Solo Business Use for Client Intake in 2027?” Compare manual handling, rules-based automation and an AI agent with human approval, using the same complete enquiry, missing-data enquiry and judgment-requiring exception. Audit existing coverage including Make vs. Zapier, deliver brief, dated evidence, reconciled prices when material, three reproducible test specifications, article draft, visual brief, implementation plan and independent QA findings. Distinguish documented capabilities, actually executed tests and 2027 assumptions. Report agents actually run and their outputs.

## Workspace and release boundary

- Repository (read-only for this assignment): `D:/domskysolutions/editorial-overhaul/domskysolutions.com-36ea3c27127de384a5df3fb42b5df77f9abc63bd`.
- Deliverables: `D:/domskysolutions/editorial-drafts/client-intake-2027/`.
- No article registration, source-code edits, new dependencies, account connections, emails, remote writes, PR, merge or deployment. Proposed publication date remains an owner decision. Source check dates reflect actual research; do not invent a 2027 launch or verification date.
- The project role definitions and team guide were read from `codex/domsky-agent-team-v1`; they are absent in the local checkout and the team guide is absent from current `main`. The coordinator invokes delegated sessions with those exact role instructions rather than claiming that project presets are installed locally.
- Follow local `AGENTS.md`, editorial style, visual identity, content engine and applicable visual skill. Article copy in English; status and owner report in Slovak.

## Single-writer assignment

| Role | Exclusive files | Input and expected handoff |
| --- | --- | --- |
| Coordinator | This file, `README.md`, `handoff-log.md`, final ZIP archive outside this folder | Owner goal, scope, decisions, actual agent/check report, package index and delivery archive |
| domsky-research | `01-coverage-and-brief.md`, `02-evidence-and-pricing.md`, `03-test-specifications.md`, `fixtures.json` | Audit -> brief, dated primary evidence, pricing reconciliation, three proposed reproducible scenarios |
| domsky-editor | `04-article-draft.md`, `05-editorial-review.md` | Research package -> English draft, metadata and editorial review; revisions remain with this writer |
| domsky-design | `06-visual-brief.md` | Reviewed draft and evidence -> placement, text, dimensions, alt text, mobile behavior and provenance; no final art requested |
| domsky-developer | `07-implementation-plan.md` | Initial read-only architecture check; final draft/design -> exact paths, statuses, validation and release plan; no implementation |
| domsky-qa | `08-qa-review.md` | Original goal, evidence and full candidate -> independent consequential findings and final recheck |

Each handoff must carry the original goal, editorial-draft scope, evidence paths, unresolved items and expected output. Parallel work is limited to independent repo preflight while research is underway. Evidence precedes the article; reviewed copy precedes design; final implementation plan follows design; independent QA sees the complete package. Route findings back to the owning writer and recheck affected work.

## Initial unresolved items

Which provider documentation best supports a review-gated agent example; current price/plan support; whether existing Make/Zapier coverage should be linked rather than duplicated; reproducible fixtures and failure criteria; all 2027 availability/cost/performance assumptions; no provider workflow tests have yet been performed.
