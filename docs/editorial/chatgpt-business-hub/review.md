# New blog article: review and release state

Prepared 15 November 2026 on `editorial/chatgpt-business-hub-guide`. Pending owner editorial approval; not merged or deployed. The dated article is enabled only on the review branch so the existing content engine can generate its route, card and SEO preview.

## Delivery

“ChatGPT Business Hub: What Small Businesses Should Set Up First” is an approximately 1,200-word reported guide for solo operators. The news trigger is OpenAI's 10 November 2026 announcement; Google's October business-tools announcement supplies limited context. All six sources are official pages opened during this task. The claim ledger and exclusions are in `brief.md`.

The article separates a profile claim, agent publication and paid advertising; explains current location/verification limits; proposes a small business fact sheet and five preview questions; and distinguishes mentions/clicks from commercial results. No hands-on beta test, account setup, vendor-independent adoption study or measured outcome is claimed. The web-designer example is explicitly fictional. The proposed release date is 15 November 2026 and the source-check date records actual research on that date.

Implementation uses the existing article type, renderer and registration path. The blog card is first among blog records; SEO, Article/breadcrumb schema, sitemap, author attribution and related links derive from the existing engine. One related card in the software-stack audit now points to this guide, providing a relevant incoming link without changing that article's body or dates. No dependency, layout or existing cover was changed.

The original editable SVG cover uses actual Domsky tokens and the approved DS logo. It depicts an editorial preparation sequence, not product UI or a promise of access. The 1600×900 delivery WebP is 44,844 bytes; source SVG is 3,753 bytes. Matching image/alt/dimensions are used for card, body, social and Article metadata. The source and delivery manifests remain draft pending owner approval. No generative illustration was needed for precise typography and process labels.

## Checks

- `npm run check`: passed lint, TypeScript configurations, article/render/schema and quality tests, presentation checks, stack/tool/API tests, production build, client-secret scan and SEO/internal links across 36 routes and 16 redirects.
- `npm run content:check`: the new article passes; zero errors overall. Seven existing stale-verification warnings remain. Existing large JavaScript bundle warning remains; no code-splitting work is included.
- Skill SVG/WebP batch validation: both real files pass XML/decoder, actual dimensions, filename, alt/provenance and byte-budget checks. The delivery copy in `public/` matches the staged WebP.
- Browser: article at 1280px, 390px and 320px; blog index at desktop and 390px. Cover loaded, one H1, working section anchors, correct canonical/social image/date, no page horizontal overflow. Wide table content stays in a focusable 620px region and scrolls with ArrowRight inside the 340px phone container. Body copy remains 17px. The preparation sequence is semantic HTML.
- Cover inspected at 320px and in the blog listing beside the existing workflow artwork. Main subject remains legible; no generated logo, product screenshot, score or result is implied. Typography uses available local fallbacks; exact font rendering can differ across systems.

Article, cover, card, attribution and source limitations were inspected by Codex. Final owner judgment is still required; automated checks do not establish editorial independence or factual truth beyond the documented sources. Full assistive-technology and 200% zoom review were not performed.

## Editorial review questions

The opening gives a specific preparation task and the option to defer the agent. The decisive facts are the separate eligibility and verification requirements, not a performance ranking. All provider claims link to official pages; documentation, original recommendations and the fictional example are separated. Lists are retained for reusable preparation/review questions, with one table for distinct decisions. The next action is five real customer questions and a scheduled information review. This adds current channel/agent preparation to the existing stack audit and researched workflow; links connect those contexts. Artwork explains the preparation route and retains optional agent publication. Existing publisher/person attribution remains truthful, with no implication of product use or professional credentials.

## Review artifacts

The readable article is exported to `D:/domskysolutions/blog-article-review/chatgpt-business-hub.md`. Screenshots in the same folder: `desktop.jpg`, `desktop-full.jpg`, `mobile.jpg`, `mobile-full.jpg`, `mobile-320.jpg`, `blog-desktop.jpg` and `blog-mobile.jpg`. The editable cover and manifests are alongside this record.

No production publication, business-profile claim, identity submission, agent creation, advertising or newsletter distribution was performed. If publication is approved later, recheck the beta documentation before release.
