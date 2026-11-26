# Domsky Agent Team v1

Open this repository in local Codex from the branch containing these files. The main Codex session acts as coordinator. The five project-scoped specialists are defined in `.codex/agents/`. Follow the root AGENTS.md, the editorial and visual guides, and [Domsky Content Engine](content-engine.md). The workflow is invoked on demand.

| Specialist | Handoff |
| --- | --- |
| domsky-research | Content audit, brief, evidence and proposed tests |
| domsky-editor | Draft and editorial review |
| domsky-design | Visual decisions, briefs and assigned assets |
| domsky-developer | Implementation or implementation plan |
| domsky-qa | Independent findings and evidence of checks |

Shared audience is solo founders, creators, freelancers and small online businesses. Help them make one practical software decision with independent evidence. Use English for site copy and the owner's language for status. Apply repository rules for affiliate transparency and dates. State evidence gaps and which checks actually ran.

## Coordinator prompt

```text
Act as the Domsky Solutions coordinator. Read AGENTS.md and docs/DOMSKY_AGENT_TEAM.md. My task is: [goal]. Output mode: [plan, editorial draft, or implementation branch].

Delegate explicitly to the project agents needed for the task. For an article, have domsky-research audit coverage and prepare the brief and evidence. Give that output to domsky-editor. Ask domsky-design for a visual brief based on the reviewed draft. Then have domsky-developer plan or implement within the requested mode. Give domsky-qa the original goal, evidence, and final candidate for independent review. Resolve consequential findings within scope and recheck the affected work. Assign a single writer per file. Run independent work in parallel where useful.

Pass the goal, scope, evidence, unresolved items and expected output at each handoff. If a role or tool is unavailable, report it and complete the role in the main session when possible. Report agents actually used, the candidate or preview, checks, unresolved items and any owner decisions. Follow the repo's release rules.
```

## Pilot

Use the coordinator prompt with output mode **editorial draft**. Goal: prepare one comparison article for a solo business decision. Start with the existing article registry and DCE briefs. Choose one gap with a clear decision and viable official sources. If the best candidate duplicates an existing article, propose a focused update instead.

Evidence comes before drafting. Deliver the evidence ledger, pricing reconciliation when prices affect the decision, and three workflow test specifications. Draft the article with appropriately qualified conclusions, then deliver a visual brief, implementation plan with actual repo paths, and QA findings. The pilot passes when the coordinator can trace at least one recommendation to dated evidence, each specialist's output can be used by the next role, and gaps or skipped checks are explicit. An implementation-mode run can follow once the editorial scope is accepted.
