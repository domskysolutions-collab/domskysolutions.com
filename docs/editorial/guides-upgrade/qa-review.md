# Independent QA — Guides and two completed articles

Reviewer: delegated `domsky-qa`. Preflight: **26 November 2026**; independent source review resumed **27 November 2026**. Mode: implementation review branch `editorial/guides-and-complete-blog-articles`, base `08941635f3d8068c41f719dcb36c82da29a9439f`. Scope and ownership: `IMPLEMENTATION.md`. QA owns this file only; no release operation is authorized.

**Disposition: READY FOR OWNER REVIEW ON THE IMPLEMENTATION BRANCH.** Original scope, evidence, reviewed copy, actual code/artwork, generated output, final project logs and coordinator browser record have been reviewed. No unresolved consequential QA finding remains. This is not permission to merge, deploy, cancel a subscription or claim provider trials. Research's original 26 November source date is distinct from this QA's 27 November retrievals.

## Original acceptance criteria

- Replace the primary Reviews directory/navigation category with a useful curated `/guides` hub.
- Preserve individual historical reviews and label their secondary archive honestly. Redirect only the historical directory to Guides; do not redirect individual reviews as though they were guides.
- Complete the Adobe and “team of 10” articles at their original URLs, preserving **April 2026** without inventing a publication day. Keep substantive update and documentation-check dates separate.
- Supply usable inputs, steps, examples, review criteria, failure/recovery handling and a next action. Do not invent personal experience, trial outcomes, costs/savings or team-equivalence performance.
- Preserve functional tools, consent, analytics, affiliate behavior, dependencies, existing publication facts and unrelated URLs. New artwork must match reviewed content; old “Unfair Advantage” imagery must not supply unsupported claims.

## Architecture preflight actually performed

Read root guidance, content-engine/editorial/visual guides, scope record and current routing/directory/SEO changes. The current hub curates five existing guide destinations across software-stack and AI-workflow groups. The incomplete beginner legacy article is excluded. Product reviews remain a labeled secondary archive rather than occupying the guide groups.

Final source uses `/guides` in primary navigation/footer and preserves individual review routing. A single exact `/reviews` redirect is added to the existing redirect map. Historical review-detail backlink/breadcrumb changes point to the archive fragment instead of mislabeling the reviews as guides. Generated-output checks below confirm those destinations.

### Redirect scope clarification

QA identified that `permanent: true` in Vercel configuration means **308**, not an exact 301, per [Vercel's configuration reference](https://vercel.com/docs/project-configuration/vercel-json). The coordinator clarified that 301 was shorthand in the QA handoff, not an owner requirement. The accepted requirement is a permanent redirect using the existing 308 convention, with client navigation fallback. Therefore this is a resolved scope clarification, **not a candidate defect**; no HTTP-status special case or unrelated redirect rewrite is required. Verify the final exact-directory-only rule and preserved review routes.

## Execution boundary

QA independently executed source/SSR/artifact/metadata/sitemap assertions. The coordinator ran the full project suite and browser interaction checks; QA read those records and inspected named screenshots without claiming to operate that browser. No production HTTP verification was attempted.

No provider/account/cancellation/purchase/customer-data test, app edit, commit, merge or deployment was performed by QA.

## Independent primary-source checks — 27 November 2026

Opened the following **13 distinct primary URLs**, inspecting the named operative passages. This is a bounded source check, not independent verification of every URL in the research ledger or proof of feature operation. No price, personal experience or account entitlement was established.

| Source | Narrow finding / acceptance boundary |
| --- | --- |
| [GIMP 3.2 PSD export](https://docs.gimp.org/3.2/en/file-psd-export.html) | Documents PSD export and imperfect blending equivalence. Also documents conditional CMYK export, so an absolute claim that GIMP has no CMYK output would be wrong. Import/export support does not establish a successful editable round trip. |
| [Adobe Fonts licensing](https://helpx.adobe.com/fonts/web/font-licensing/font-licensing.html) | Distinguishes finished embedded/rasterized/outlined outputs from live-font editing; collaborators need appropriate access and font-file transfer/packaging is restricted. The document expressly addresses distribution independent of subscription status. |
| [Adobe cancellation](https://helpx.adobe.com/account/individual/subscriptions-and-plans/renewals-and-cancellations/cancel-adobe-subscription.html) | Supports plan-specific cancellation review, third-party purchase paths, confirmation and limited reactivation. No universal fee/refund claim is needed. |
| [Adobe access after cancellation](https://helpx.adobe.com/account/individual/subscriptions-and-plans/renewals-and-cancellations/account-access-after-plan-cancellation.html) | Distinguishes paid access, active account, storage and local files. Supports verifying downloads/backups before cancellation; no indefinite identical-terms recovery promise. |
| [Inkscape import formats](https://inkscape-manuals.readthedocs.io/en/latest/import-other-formats.html) | Lists AI 9+ and Illustrator SVG import, explicitly warns that only subsets may import and some formats depend on installed software. Does not prove native Illustrator round-trip fidelity/export. |
| [Framer HTML export](https://www.framer.com/help/articles/can-i-export-my-website-to-html-and-self-host-it/) | Explicitly does not offer HTML/self-host export. A prototype is not portable source or a validated published form. |
| [Jasper Style Guide](https://help.jasper.ai/hc/en-us/articles/25925092890011-Style-Guide) | Business-only boundary supported; governance/style controls do not validate campaign facts. |
| [Notion Enterprise Search](https://www.notion.com/help/enterprise-search) | Business/Enterprise availability, source scoping and page context are documented. Default search can include connected apps/web; select the intended scope and check cited revision rather than implying automatic isolation. |
| [Cursor Agent Security](https://cursor.com/docs/agent/security) | Workspace edits can save without approval and auto-reload may execute them. Supports clean-branch/diff/relevant-test review, not a promise that approval prevents every file change. |
| [Descript correction](https://help.descript.com/script-editing/correct-your-transcript) | Correct mode changes transcript text without changing underlying audio/video. A corrected caption is not proof that the spoken error was repaired. |
| [ElevenLabs pricing](https://elevenlabs.io/pricing) | Commercial-license feature listed above Free. Promotional paid amounts deliberately not adopted as a quote. |
| [ElevenLabs billing](https://elevenlabs.io/docs/overview/administration/billing) | Distinguishes paid commercial rights from Free noncommercial attributed use. |
| [ElevenLabs publication/license help](https://elevenlabs.io/docs/help-center/legal/can-i-publish-the-content-i-generate-on-the-platform) | Paid-period generation, necessary rights and service-specific terms matter; Beta Services are excluded from commercial/production use. Later upgrading does not retroactively cover earlier Free output. |

No consequential contradiction with the bounded research brief was found. The additional explicit ElevenLabs Beta/generation-period qualification was sent to the coordinator for the editor before drafting; this is preventive source clarification, not a finding against unwritten copy. Final QA must check the actual article wording.

### Additional primary-source checks after reviewed drafts arrived

Independently opened four more primary pages on 27 November, for **17 distinct retrieved source URLs in this QA phase**: [Claude file uploads](https://support.claude.com/en/articles/8241126-upload-files-to-claude) (non-PDF text-only extraction, including the explicit Tips passage); [Perplexity Pro Search](https://www.perplexity.ai/help-center/en/articles/10352903-what-is-pro-search) (cited research when included in a plan); [Runway Gen-4.5](https://help.runwayml.com/hc/en-us/articles/46974685288467-Creating-with-Gen-4-5) (text/image inputs and Standard-or-higher boundary); [Midjourney commercial use](https://docs.midjourney.com/hc/en-us/articles/27870375276557-Using-Images-Videos-Commercially) (conditional terms, not universal rights clearance). The draft's bounded wording is supported. Other source URLs in the research ledger are attributed to research; QA does not claim to have independently reopened them all.

## Completed copy and current integration review

Read both full reviewed drafts and their editorial assessments. Adobe supplies a concrete inventory, bounded GIMP/Inkscape candidates, known file edits, recipient reopening/editing, independent print/font gates, retained-cost accounting and recovery/cancellation decision. It does not imply suite-wide replacement, universal compatibility or a personal cancellation result.

The AI-tools guide supplies ten genuinely distinct input/output/check/rejection/fallback recipes, not ten generic product cards. The acceptance log remains unfilled. ElevenLabs' generation-period and Beta qualifications are correctly included. No team equivalence, measured productivity/savings, completed provider exercise or blanket commercial permission is claimed. Source dates, update date and original April month are distinguished.

Independent targeted assertions performed against the current candidate:

| Check | Actual result |
| --- | --- |
| Server-render both TSX bodies and compare publication-copy segments with the reviewed drafts | **PASS**: all **55 Adobe** and **48 AI-tools** normalized paragraph/list/table/heading segments present. The first QA command used an unsupported React Router `/server` import; corrected to this repository's main `StaticRouter` export, then passed. No application failure inferred. |
| Actual Guides groups and synthetic future publishing case | **PASS**: five unique current guides, no product review/incomplete beginner; future published guide included, synthetic draft and review excluded. |
| Target legacy metadata | **PASS**: both original URLs, April 2026 month-only publication and category Guides preserved. |
| Exact redirect and historical configuration comparison against HEAD | **PASS**: only `/reviews` → `/guides`, `permanent: true`, added; removing that one rule yields the unchanged prior Vercel configuration. No review wildcard or individual-review redirect added. This is static configuration validation, not an observed hosted HTTP status. |
| Preserved artwork comparison against HEAD | **PASS**: Adobe WebP bytes unchanged; historical tools art retained on disk. |
| New neutral tools artwork | Independently viewed full-size and 320px preview: truthful title/one-task premise, readable labels, no advantage/team/score claim. Source/public WebP bytes equal, **23,100 bytes**, below 400KB. Shared article/card/social image record uses the new 1600×900 path. |

No consequential copy or integration finding identified.

## Final metadata, routes and regression review

Independently reviewed the narrow optional legacy `seoTitle`/`updatedAt` fields and their SEO/prerender fallback. Structured article values retain precedence. The two actual revised legacy records gain their approved title tags and 27 November modification dates without inventing an April publication day. Existing rejection/render/schema assertions remain; new regressions cover guide discovery, archive preservation, exact-directory redirect and truthful legacy metadata rather than disabling old checks.

Independent assertions on the final built files (`dist/guides.html` and both original legacy article paths) **passed**:

- Correct canonicals and SEO titles; one H1 per page; Adobe seven article H2s and tools ten numbered recipe H2s plus acceptance log; real contents-fragment targets.
- Visible month-only `<time>` retains April 2026. Actual update is 27 November 2026. Both Article schemas/modified-time tags and sitemap lastmod use `2026-11-27`; unknown datePublished/published-time remain absent.
- Truthful original Person attribution remains in schema; visible headers use the established Domsky Solutions publisher presentation. No invented test author or new performance/review schema.
- Retained Adobe/new tools body, Open Graph and Article images agree. No internal implementation/editorial-review notes or “Facts last verified” text leaked into these outputs.
- Guides is indexable and in the sitemap. The redirect-source `/reviews` directory has no indexable prerender/sitemap entry. **All 13 individual reviews** retain original canonical/indexable files, sitemap entries and links in the honestly labeled archive.

The initial generated-heading assertion counted footer headings as article headings; narrowing it to the article element passed the expected 7/11 counts. This was a corrected QA selector, not a candidate failure. Final `git diff --check` passed; Git's LF/CRLF notices were not whitespace errors.

## Attributed final checks independently read

Read `content-validation.txt`, `content-audit.txt` and complete `project-check.txt`. Coordinator reports final command exit **0**:

- `validate:content`: **PASS**, ten structured articles and three legacy entries.
- `content:check`: **zero errors, nine pre-existing warnings** (eight stale source-review warnings and the earlier intake article's incoming-related warning). This audit explicitly excludes the three legacy bodies; it is not being used as proof that the two completed bodies were substantively reviewed. Their independent copy/source/SSR/generated checks are recorded above.
- `npm run check`: **PASS** lint, application/content/API typechecks, content rejection/quality/presentation, 1,125 stack combinations and other tool/stack checks, API success/failure mocks, production build/prerender, client-secret scan and SEO/internal-link checks. Generated 37 indexable routes plus noindex 404; verified 17 redirects; scanned 41 built assets. Logged provider/API error branches are exercised mocks, not live product failures or trials.
- Vite retains a nonfatal large-chunk warning: **870.62KB** minified JavaScript against its 500KB advisory. No unrelated bundling refactor or dependency change was made.
- Read design's `visuals/validation-report.json`: source SVG and delivery/site-byte checks pass with no warnings; reported text contrast is 12.62:1 ink/cream and 5.86:1 teal/sage. These validator/contrast executions belong to design; QA separately checked actual preview appearance and byte equality.

## Browser evidence and limits

Read coordinator's `browser-review.md` and opened actual `guides-mobile.jpg`, `ai-tools-mobile-320.jpg` and `adobe-mobile-table.jpg`. The captures show readable wrapping, accurate publisher/month/update, neutral tools art, branded guide directory and visible keyboard focus on the locally scrolling table. Nine total screenshot files are retained; QA does not claim to have independently opened all nine.

Coordinator actually inspected all three routes at 1440/390px and reflow at 320/640px: no document overflow, 17px article text, loaded new/retained covers and valid contents targets. Adobe's three-column/three-row-header table stayed in its focusable 340px region with 640px content; ArrowRight moved scrollLeft to 63px. Enter opened the secondary archive with 13 review links, mobile navigation exposed Guides, and `/reviews` client navigation reached Guides. These are attributed browser observations; the permanent HTTP 308 remains a configuration/regression result, not a claimed Vite HTTP response.

Actual **200% zoom, screen-reader and manual images-disabled testing were not run**. Narrow-viewport reflow is not renamed a zoom pass. HTML text, table semantics and descriptive alt text were inspected, but do not establish an assistive-technology result.

## Final owner handoff

The branch now fulfills the requested useful guide directory and two complete articles while preserving historical URLs, review identities, original known publication month, truthful attribution and evidence limits. The only clarification during QA was permanent 308 versus the coordinator's initial 301 shorthand; it is resolved. No consequential defect remains open.

Review the local candidate and screenshots, then separately decide whether to authorize merge/release. Product compatibility, generated-output quality, actual account/plan rights, cancellation terms, prices and savings remain untested/reader-specific as the guides state. Neither passing website checks nor the new cover is a product benchmark.
