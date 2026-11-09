# Ivory / forest identity validation

9 November 2026. Visual-only branch `design/ivory-forest-color-identity`, based on production `2456e4c`.

## System and scope

The central Tailwind 4 theme now defines page, surface, elevated surface, ink, secondary/subtle text, line, control boundary, action/hover/on-action, secondary action, link, focus, emphasis, sand, navigation, footer, callout, table head, field, badge, success/error and scrim colors. Old brand names remain compatibility aliases, not independent palettes. The unused root stylesheet now forwards to this theme rather than carrying a second dark palette.

Ivory dominates the page, charcoal carries reading, forest identifies actions/links, and terracotta is reserved for selected editorial labels and meaningful emphasis. Sand is available as a secondary neutral rather than applied to every section. Layout and type hierarchy remain the approved editorial structure. No new decorative cards or icons were added.

Migrated visual utilities across shared navigation, footer, cards, evidence blocks, tables, forms, modal and individual pages including legacy articles, all utilities and About. The finder CSS uses the same tokens. Primary actions have light text independently of document ink; secondary actions retain neutral fills. Inputs use visible control borders, explicit placeholder colors and forest native radio/checkbox accents. Gradients, glow rules, decorative blur, glass navigation and heavy shadows are removed from executable source. The 404 blur blob and review gradient strip are removed rather than replaced with ornament.

## Preservation

No edits to content documents, product/recommendation data, route definitions, SEO metadata/schema generation, source links, publication/verification dates, analytics, API/server code, dependency manifests, lockfile or public assets. Component changes are presentation utilities/styles only; no handler or state changes. Existing form and recommendation regression tests pass. `PageSeo.tsx` changes only breadcrumb text utility classes. Original logo file/geometry is unchanged; navigation applies a charcoal monochrome filter to this Domsky wordmark only. Product graphics and screenshots are never filtered.

See `DOMSKY_COLOR_AUDIT.md` for the asset follow-up queue. Also review `software-stack-audit.svg`, `lean-content-workflow.svg` and `kit-free-vs-creator-workflow.svg` for later palette harmonization. Asset redesign and new image generation were deliberately deferred.

## Automated checks

`npm run check` passed: lint, strict TypeScript (app/content/API), content renderer/quality/presentation tests, stack/utility tests (including 1,125 recommendation combinations), API security tests, production build, client-secret scan and SEO validation across 35 routes and 16 redirects. Final build/SEO checks passed again after removing the last unused decorative elements. Existing large-JS-chunk warning remains; no dependency change was made.

Presentation tests now read actual semantic hex tokens from `src/index.css`, rather than checking the previous hard-coded palette. Normal text pairs meet 4.5:1 for ink, secondary, subtle, forest links, terracotta emphasis, light action text and functional error/success on their surfaces. Focus and control-border pairs meet 3:1 on page/surface/field. Forbidden CSS effects are checked. Disabled controls retain their disabled semantics and may use reduced opacity; the normal-text contrast claim does not apply to disabled controls.

## Browser review

Reviewed homepage, comparison, legacy review, stack guide, About, prompt builder, calendar and audit calculator at desktop 1280px; representative pages also checked at 390px. No page overflow in measured samples (1272px at desktop; 382px at mobile). Wide comparison tables retain their own scroll regions. The existing dark editorial diagram remains an honest unchanged asset, not an isolated dark UI theme.

Verified mobile navigation open/close, active prompt category, neutral form fields, rendered forest buttons with white text, visible keyboard focus and calculator error with alert text. Positive calculator results remain distinguishable from errors by text as well as color. Existing tests cover disabled interactions and finder behavior. Hover token contrast is automated; a full pointer-hover and assistive-technology audit is not claimed. No newsletter was sent or subscribed during QA.

The long-running dev server initially served its old compiled theme. Restarting the preview resolved this; final browser computed colors match ivory `rgb(246,244,239)` and charcoal `rgb(34,40,36)`, primary buttons forest `rgb(56,100,84)` with white text. Production output contains the new tokens.

Before: `D:/domskysolutions/editorial-preview/home-after-desktop.png` and `home-after-mobile.png` capture the preceding production design. After: `D:/domskysolutions/color-preview/` contains desktop/mobile homepage, prompt builder, calculator and comparison captures. These are local review artifacts, not public website assets.

Ready for visual review in a separate PR. No merge or production deployment is authorized by this implementation request.
