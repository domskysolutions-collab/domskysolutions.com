# Active brand system

Read `src/index.css` each session. This is a verified snapshot, not a separate token authority. Tailwind v4 uses CSS `@theme`; this repository has no separate Tailwind configuration file.

| Role | Active token | Snapshot |
| --- | --- | --- |
| Paper | page | #F4F0E8 |
| Charcoal | ink | #2B2A28 |
| Deep teal | action | #2F5D5A |
| Gold | gold | #B99963 |
| Brick rose | brick | #9C5A4D |
| Sage | sage | #DFE7DE |
| Sand | sand | #EAE0D0 |
| Dark teal | dark | #234D49 |

Use cream for reading, charcoal for essential text, teal for structure and a restrained secondary accent. Gold is normally a rule or small geometric accent, not small text on cream. Use `gold-ink` (#D6B77E snapshot) for a small label on dark teal when needed. Check contrast for actual foreground/background pairs; normal essential text needs 4.5:1 and large text 3:1.

Typography: `--font-serif` (Lora with Georgia fallback), `--font-sans` (DM Sans with system fallback), `--font-mono` (Space Mono). Use one headline family and a compatible label family. The SVG generator uses the current font stacks; render with available fonts and inspect wrapping. Do not silently download fonts or claim exact font metrics across machines. Text can be outlined only with an available, appropriately licensed font while retaining editable source.

Use the actual `public/images/brand/logo-light.svg`, `logo-dark.svg` or monogram when appropriate. Do not generate a new DS logo, trace it from a cover, or modify its geometry. Current artwork contains several different DS treatments; they are historical references, not a new logo specification. Official product marks require suitable authorized source assets; otherwise use correctly spelled names.

Forbidden: gradients, neon, glow, glassmorphism, particles, generic brains/robots/circuit boards, holographic interfaces, fake screenshots, unrelated decorative objects and excessive 3D. Selective matte depth/soft shadow can support an artistic metaphor; it must not obscure the topic. The programmatic starter templates intentionally use solid flat fills.
