# Choosing a visual

| Article intent | Archetype | Useful concept |
| --- | --- | --- |
| Two/three named alternatives; pricing or selection comparison | editorial-comparison | Equal product-name fields separated by a rule; no implied scores |
| Steps, audit, automation, content production | software-workflow | Inputs → bounded stages → output, or explicit decision categories |
| Opinion, broad AI/SaaS analysis, minimum-tool philosophy | geometric-editorial | A small deliberate selection separated from optional extras |
| Single software review | Decide from the review | Product name plus one accurate task/limitation; use workflow if the review centers on a process, geometric editorial for broad assessment. Do not invent a competitor merely to fill a comparison template. |

The generator honors an explicit `archetype`. Otherwise it routes `contentType: comparison` (or `intent: comparison`) to comparison, explicit steps / workflow / audit / tutorial intent to workflow, and the remainder to geometric. It does not treat every article mentioning two products as a comparison. Briefs must contain article-specific labels, not inferred product capabilities.

Controlled variation:

- Comparison: `variant: columns` gives equal panels; `variant: bands` gives typographic horizontal rows. For two concepts, vary alignment and division, not only color. Keep actual alternatives equally prominent unless the article supports a deliberate distinction.
- Workflow: `variant: cards` uses connected stages; `variant: lanes` uses horizontal lanes. For an audit, categories are categories, not a chronological sequence: set `flow: false` to omit arrows.
- Geometric: `variant: selected` distinguishes a small selected group from extras; `variant: connected` uses a sparse relationship. Name what those groups mean in the brief. Selection of shapes does not establish an optimum tool count.

Geometric briefs must explicitly set `selectedModules`, `extraModules` (each 1–6) and `moduleMeaning`; these are illustration choices, not inferred product counts or recommendations. Use different counts or a manually composed topology when the article's metaphor requires it. Do not publish an image suggesting a universal tool count for a conditional selection article.

The cover generator supports 2–5 workflow labels. Summarize only when the underlying relationships remain accurate. For a full process that cannot be compressed without losing a review/consent gate, adapt the editable SVG manually rather than dropping the gate to satisfy the helper's limit.

Portrait layouts reflow into rows. Keep brand typography, palette, safe margins and subject clarity consistent. Compare with at least the neighboring article covers; recommend a different topology if it repeats the same arrangement without a content reason. Three concepts means three distinct compositions/briefs, not three recolorings of the same image. Produce only the requested number of finished images.
