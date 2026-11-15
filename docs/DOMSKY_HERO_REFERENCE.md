# Illustrated homepage hero

Implements the homepage reference supplied on 15 November 2026. The illustration sits left of the existing headline, introduction and methodology link on desktop; copy precedes artwork below 900px. The cream navigation, deep teal field, cream serif headline and gold rule reuse existing brand tokens. Other homepage sections, integrations, metadata and dates are unchanged.

The artwork is a decorative illustration of fictional Tool A/B/C, not a product screenshot, test result or published rating. It is hidden from assistive technology; meaningful copy remains semantic HTML. There are no new animation, gradient or dependency additions.

## Asset and provenance

- `public/images/brand/software-stack-hero.webp`: 1448 × 1086, transparent, 135,656 bytes; eager loading with high fetch priority and declared dimensions.
- Created with the built-in image generation tool from the supplied mockup, then encoded as WebP at quality 88. The generated illustration closely follows the reference rather than being an exact pixel crop.
- The original PNG remains in the local generated-images folder; the website uses the optimized workspace asset.

Generation prompt:

> Use case: background-extraction. Edit target: supplied Domsky Solutions homepage mockup. Extract ONLY the complete 3D software comparison illustration on the LEFT side of the teal hero. Remove all navigation, website text on the right, page sections, and teal rectangular background. Output an isolated illustration on genuine transparency, landscape approx 4:3 ratio, tightly but fully framed with small clear margins: three overlapping cream, brick rose and sage fictional tool cards, large cream comparison matrix, small front recommendation card, sage platform and gold connecting paths. Preserve the beautiful materials, colors, lighting, proportions and perspective of the supplied illustration as closely as possible. Do not include the large translucent circular background shape; that will be CSS. Keep labels Tool A, Tool B, Tool C and Comparison. This is decorative fictional tool artwork. Do not add actual product names or any website text, logo, headline, or navigation. No new elements. Preserve the aesthetic and arrangement of existing cards. Save isolated artwork suitable for a web hero.

## Validation

`npm run check` passed. Final build and SEO checks passed after the final CSS adjustment. `npm run content:check` reports no errors and seven existing maintenance warnings; no verification dates were changed. The existing JavaScript bundle-size warning remains.

Browser review at 320, 390, 768, 1024, 1280 and 1672px confirmed no page overflow, a loaded image and one H1. Verified the mobile menu and hero methodology link. Desktop and mobile screenshots are saved locally in `D:/domskysolutions/hero-preview/`.
