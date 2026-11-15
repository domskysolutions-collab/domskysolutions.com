# Color identity audit

9 November 2026. Baseline: production merge `2456e4c`. The new color brief supersedes the previous orange-preservation instruction.

- `src/index.css` declares warm dark/orange tokens with misleading cyan aliases, a cream override of white, orange glow/pulse rules, radial dot pattern and animated gradient scanline.
- `lean-stack-finder.css` embeds dark fallback values, bright error/success colors and a gradient grid. `editorial-home.css` embeds muted cream text and orange dividers.
- Shared navigation uses translucent background/backdrop blur and dropdown shadow. Modals use glass blur and dark translucent overlays. These should become solid surfaces/neutral scrims without decorative effects.
- About, legacy blogs, tool pages and UI helpers use hard-coded dark purple, orange, amber and gray colors. Gray utility classes assume dark-mode text, so changing the background alone makes text unreadable.
- Primary actions mix amber/orange backgrounds with dark text. A forest action needs a separate light on-action token. Errors/success must retain semantic meaning and readable contrast.
- Existing article layouts, routes, metadata, content, dates, sources, forms, finder rules and integration behavior are outside this change.

## Implementation

Define semantic colors centrally; migrate presentation utilities and inline visual colors by role. Retain compatibility aliases only for existing theme consumers. Use ivory/neutral surfaces, charcoal text, forest links/actions/focus and sparse terracotta labels. Preserve layout and typography. Replace gradients, glow, blur and shadows rather than masking them with more decoration.

## Asset review / later work

- `public/images/domsky-logo-transparent.png`: original orange/light wordmark; retain the file and geometry, display a charcoal monochrome treatment on light navigation.
- `make-vs-zapier-workflows.svg`: orange-on-dark editorial diagram; queue an ivory/forest vector edition later, do not recolor in this visual-code batch.
- `kit-mailerlite-beehiiv-workflows.svg`, `lean-solo-business-stack.svg`, `codex-vs-claude-code-workflow.svg`: pale green/cream editorial assets generally compatible but typography/palette can be harmonized later.
- Other featured JPGs, screenshots and product artwork remain original. Some use dark/blue/orange imagery; their provenance and factual content take priority over palette matching. No filters are applied to product screenshots or logos.
- `domsky-logo.png` social fallback and existing PDFs retain their current appearance. Redesign them separately after approval; do not silently alter SEO image references or regenerate images.

No new images are generated. Inventory and validation findings will be recorded in `DOMSKY_COLOR_VALIDATION.md`.
