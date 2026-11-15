# Image generation and compositing

Use SVG for text, precise diagrams and tables. For artistic work, discover supported tools from the current tool catalog; do not assume a particular API or account is configured. If an applicable image-generation skill is available, read it. Prefer the supported built-in capability; do not install/configure a paid API, expose credentials, or write a replacement API client without authorization.

Inspect reference/target images before editing. State each image's role: style reference, edit target, or supporting insert. A supplied reference is not permission to invent product facts. Preserve an approved logo by using the original asset in programmatic composition; do not ask the model to redraw it.

## Reusable production prompt

Fill the fields from the approved visual brief, without adding factual claims:

```text
Asset: Domsky Solutions editorial illustration, {width} × {height}, {aspect_ratio}.
Article topic: {topic}.
Editorial message: {message}; audience: {audience}; decision: {decision}.
Archetype: {archetype}.
Subject: {specific_subject_and_meaningful_relationship}.
Composition: {layout}; one recognizable concept, balanced spacing, strong silhouette.
Palette: {verified_active_palette_roles_and_hex_values}.
Background: {solid_background}; negative space: {reserved_text_area_and_safe_margins}.
Lighting: soft, restrained, no luminous or dramatic effects.
Materials: matte paper or solid surfaces; minimal texture/depth only if useful.
Text: none; exact approved text and real logos will be added programmatically.
Forbidden: gradients, neon, glow, glass, particles, brains, robots, circuit stock art,
holograms, fake screenshots, excessive 3D, unrelated decoration, ratings or claims.
Output: final artwork without watermark; {opaque_or_genuinely_transparent};
retain the requested composition at thumbnail size. This is illustration, not evidence.
```

Comparison variant: request only an understated non-text supporting motif if art helps; render product-name columns programmatically. Workflow variant: request only the meaningful process objects; render accurate labels and connections in SVG. Geometric variant: specify what the selected and unselected forms represent so the metaphor is not arbitrary.

If no generation tool is available, save `{id}-generation-brief.md` with the completed prompt, references, size, transparency and intended compositing. State **not generated**, list what is missing, and do not create a placeholder masquerading as final art. Avoid secrets in prompts or artifacts.

When supported production succeeds, inspect the actual output, save it in the workspace draft directory, retain the exact prompt and provenance, and compose text with an available graphics pipeline. Keep original generation output and editable overlay. Optimize to WebP/AVIF only with an existing encoder; validate actual output dimensions and alpha. If rendering/encoding is unavailable, deliver the editable SVG/brief with that limitation rather than claiming a raster exists.
