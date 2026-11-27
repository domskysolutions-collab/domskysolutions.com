import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { articleCovers } from '../../data/articleCovers';
import { PUBLISHER_NAME } from '../../data/site';
import { ArticleFigure } from '../../components/article/ArticleBlocks';

export const BlogPost5 = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <main className="bg-brand-bg min-h-screen pt-36 pb-20">
      <article className="max-w-[780px] mx-auto px-5 sm:px-7 text-secondary text-[17px] leading-[1.8]">
        <header className="mb-8">
          <p className="text-link font-mono text-xs uppercase tracking-wider mb-4">Guides · Creative workflows</p>
          <h1 className="text-3xl sm:text-4xl font-semibold text-ink leading-tight mb-6" style={{ fontFamily: 'var(--font-serif)' }}>Should You Replace Adobe? A Practical Switching Checklist</h1>
          <p className="text-xl leading-relaxed mb-6">Trial one creative job before changing a subscription. Check the editable files, recipient handoff, print output and recovery path that job depends on.</p>
          <p className="text-sm"><Link to="/about" className="text-link underline underline-offset-4">{PUBLISHER_NAME}</Link></p>
          <p className="text-sm mt-2">Published <time dateTime="2026-04">April 2026</time> · Updated <time dateTime="2026-11-27">27 November 2026</time></p>
        </header>
        <ArticleFigure image={{ ...articleCovers.adobe, caption: 'Editorial title illustration. The file checks described below are proposed exercises.' }} eager />
        <nav aria-label="Article contents" className="border-y border-line py-5 my-8 text-base">
          <p className="font-semibold text-ink mb-3">In this guide</p>
          <ol className="space-y-2">
              <li><a href="#write-down-what-you-actually-deliver" className="text-link underline underline-offset-4">1. Write down what you actually deliver</a></li>
              <li><a href="#choose-a-candidate-for-that-job" className="text-link underline underline-offset-4">2. Choose a candidate for that job</a></li>
              <li><a href="#run-a-reversible-file-round-trip" className="text-link underline underline-offset-4">3. Run a reversible file round trip</a></li>
              <li><a href="#treat-print-as-a-separate-acceptance-gate" className="text-link underline underline-offset-4">4. Treat print as a separate acceptance gate</a></li>
              <li><a href="#check-fonts-before-handing-over-editable-files" className="text-link underline underline-offset-4">5. Check fonts before handing over editable files</a></li>
              <li><a href="#count-retained-costs-and-migration-work" className="text-link underline underline-offset-4">6. Count retained costs and migration work</a></li>
              <li><a href="#pass-the-recovery-gate-before-cancellation" className="text-link underline underline-offset-4">7. Pass the recovery gate before cancellation</a></li>
          </ol>
        </nav>
          <p className="mb-5">Keep the Adobe application you need until an alternative completes that job and its handoff. A good-looking image is useful evidence for a finished image; it does not prove that a client can still edit the text, a printer accepts the PDF or a colleague can reopen the source.</p>
          <p className="mb-5">Start with one task: a web image, a logo revision or a print deliverable. Define what must survive the change, work on copies and keep the existing workflow available during the trial. You can move one job while retaining another Adobe application.</p>
        <aside aria-label="Evidence scope" className="border-l-2 border-link bg-brand-surface px-5 py-4 my-8 text-base"><strong className="font-semibold text-ink">Evidence scope:</strong> Official documentation was reviewed on 26 November 2026. The exercises below are proposed checks, not a completed migration or comparison test. No personal cancellation, savings or product-performance result is claimed. Plan access, file compatibility and asset permissions need checking in your own setup.</aside>
        <section aria-labelledby="write-down-what-you-actually-deliver" className="mt-10 border-t border-line pt-7">
          <h2 id="write-down-what-you-actually-deliver" className="scroll-mt-32 text-2xl font-semibold leading-snug text-ink mb-5">1. Write down what you actually deliver</h2>
          <p className="mb-5">List the next representative job rather than every feature an application offers. Record:</p>
          <ul className="list-disc pl-6 space-y-3 mb-6">
            <li>The finished deliverable, dimensions and required format.</li>
            <li>Whether someone must edit the source later, and in which application/version.</li>
            <li>Layers, live text, masks, linked images, colors and plugins the job uses.</li>
            <li>Fonts and other assets, where they came from and who needs access.</li>
            <li>The client, collaborator or printer who must accept the result.</li>
          </ul>
          <p className="mb-5">Mark requirements as mandatory or optional. A client requiring an editable Photoshop file sets a different test from a client needing only a final PNG.</p>
          <p className="mb-5">For an illustrative workshop promotion, suppose the brief requests a <strong className="font-semibold text-ink">1200 × 630 PNG</strong> and a layered source in which the client can change the date. Those dimensions are a sample brief, not an application limit. A flattened export might pass the first requirement and fail the second. Keep those outcomes separate.</p>
        </section>
        <section aria-labelledby="choose-a-candidate-for-that-job" className="mt-10 border-t border-line pt-7">
          <h2 id="choose-a-candidate-for-that-job" className="scroll-mt-32 text-2xl font-semibold leading-snug text-ink mb-5">2. Choose a candidate for that job</h2>
          <div role="region" aria-labelledby="candidate-table-caption" tabIndex={0} className="max-w-full overflow-x-auto border border-line mb-6">
            <table className="w-full min-w-[640px] text-left text-base leading-relaxed">
              <caption id="candidate-table-caption" className="text-left text-sm text-secondary px-4 py-3">Candidates for a bounded creative job</caption>
              <thead className="bg-sage"><tr><th scope="col" className="px-4 py-3 font-semibold text-ink">Required work</th><th scope="col" className="px-4 py-3 font-semibold text-ink">Candidate to evaluate</th><th scope="col" className="px-4 py-3 font-semibold text-ink">Boundary to preserve</th></tr></thead>
              <tbody>
                <tr className="border-t border-line"><th scope="row" className="px-4 py-4 font-medium text-ink align-top">Edit a raster image and produce a web export</th><td className="px-4 py-4 align-top">GIMP</td><td className="px-4 py-4 align-top">Test the actual layered source and recipient handoff; a finished PNG alone is insufficient.</td></tr>
                <tr className="border-t border-line"><th scope="row" className="px-4 py-4 font-medium text-ink align-top">Revise a vector illustration and deliver agreed SVG/PDF output</th><td className="px-4 py-4 align-top">Inkscape</td><td className="px-4 py-4 align-top">Verify live text, clipping, strokes and the recipient's required editability.</td></tr>
                <tr className="border-t border-line"><th scope="row" className="px-4 py-4 font-medium text-ink align-top">Continue required InDesign, video, catalog, specialized PDF or native-client workflows</th><td className="px-4 py-4 align-top">Keep the existing workflow while investigating that separate job</td><td className="px-4 py-4 align-top">Neither candidate establishes coverage of the whole Creative Cloud suite.</td></tr>
              </tbody>
            </table>
          </div>
          <p className="mb-5">GIMP's <a href="https://docs.gimp.org/3.2/en/file-psd-export.html" className="text-link underline underline-offset-4">PSD export documentation</a> warns that some blend modes do not have exact Photoshop equivalents. Inkscape's <a href="https://inkscape-manuals.readthedocs.io/en/latest/import-other-formats.html" className="text-link underline underline-offset-4">project manual lists Illustrator import formats</a>, but a listed import is not proof that every Illustrator feature survives a round trip. Do not promise a native handoff from a format list.</p>
        </section>
        <section aria-labelledby="run-a-reversible-file-round-trip" className="mt-10 border-t border-line pt-7">
          <h2 id="run-a-reversible-file-round-trip" className="scroll-mt-32 text-2xl font-semibold leading-snug text-ink mb-5">3. Run a reversible file round trip</h2>
          <p className="mb-5">Use a file containing the features the real job depends on. For the workshop example, choose a copy of a layered PSD with live text, a mask, a blend mode and any linked or embedded content you actually use.</p>
          <ol className="list-decimal pl-6 space-y-3 mb-6">
            <li>Keep the original and its assets in an untouched folder. Record the source application/version and operating system.</li>
            <li>Open a copy in the candidate application. List warnings, missing assets and visible differences before changing anything.</li>
            <li>Make a known edit: change “Saturday workshop” to “Sunday workshop” and adjust the image crop. Keep everything else unchanged.</li>
            <li>Save a candidate-native working copy, then export the agreed finished image and editable handoff.</li>
            <li>Compare the image at its intended display size. Inspect text, masks, transparency, blending and crop.</li>
            <li>Reopen the editable handoff in the recipient's actual application. Ask the recipient to change the date and save it again.</li>
            <li>Record what failed, how it was corrected and which application is still required.</li>
          </ol>
          <p className="mb-5">If text became pixels, a linked image disappeared or blending changed materially, that handoff has failed. Keep the Photoshop workflow for it while resolving the gap. “The file opened” is only the beginning of the check.</p>
          <p className="mb-5">For a vector job, repeat the method with a representative AI/SVG logo sheet containing live text, clipping, strokes and named colors. Make one shape or text edit. Check page bounds and ask the recipient to perform the next required edit. Outline text only in a duplicate when a noneditable final deliverable is explicitly acceptable; preserve an editable original.</p>
        </section>
        <section aria-labelledby="treat-print-as-a-separate-acceptance-gate" className="mt-10 border-t border-line pt-7">
          <h2 id="treat-print-as-a-separate-acceptance-gate" className="scroll-mt-32 text-2xl font-semibold leading-snug text-ink mb-5">4. Treat print as a separate acceptance gate</h2>
          <p className="mb-5">Get the printer's written requirements before evaluating a print workflow: page size, bleed, requested PDF preset or standard, color/profile treatment, image resolution and font handling. Use those requirements rather than a generic “print-ready” label.</p>
          <p className="mb-5">Adobe's <a href="https://helpx.adobe.com/indesign/desktop/print/preflight/configure-and-use-the-preflight-panel.html" className="text-link underline underline-offset-4">InDesign preflight documentation</a> explains configurable production checks. Configure them for the actual job, review the exported PDF and retain the printer's proof or approval. A clean screen preview cannot establish that a production file meets a printer's specification.</p>
          <p className="mb-5">Do not infer that image or PDF export replaces multipage layout, PDF accessibility, forms or signatures. If the required brochure or PDF workflow has not passed its own check, retain it. This guide does not establish GIMP or Inkscape as a substitute for InDesign or Acrobat.</p>
        </section>
        <section aria-labelledby="check-fonts-before-handing-over-editable-files" className="mt-10 border-t border-line pt-7">
          <h2 id="check-fonts-before-handing-over-editable-files" className="scroll-mt-32 text-2xl font-semibold leading-snug text-ink mb-5">5. Check fonts before handing over editable files</h2>
          <p className="mb-5">A font visible in today's document may require a different arrangement for tomorrow's editor. Keep a font manifest with family/style, source, intended use and the recipient's access.</p>
          <p className="mb-5">Adobe's <a href="https://helpx.adobe.com/fonts/web/font-licensing/font-licensing.html" className="text-link underline underline-offset-4">Fonts licensing FAQ</a> distinguishes embedded or rasterized outputs from live-font editing. It describes continued distribution of existing embedded/rasterized/outlined outputs independently of subscription status, while recipients who need live-font editing require their own access. It also prohibits transferring Adobe Fonts files as part of a package. Other fonts have their own license terms.</p>
          <p className="mb-5">For an InDesign handoff, Adobe's <a href="https://helpx.adobe.com/indesign/desktop/print/preflight/package-files-for-output.html" className="text-link underline underline-offset-4">package-for-output guidance</a> covers gathering the document, links and permitted font files; Adobe Fonts are excepted from copying. A package does not grant a font license.</p>
          <p className="mb-5">Resolve replacement fonts or recipient access before cancelling anything. GIMP's <a href="https://www.gimp.org/docs/userfaq.html" className="text-link underline underline-offset-4">commercial-use FAQ</a> concerns the software's license; it does not license every imported photograph, typeface or client asset.</p>
        </section>
        <section aria-labelledby="count-retained-costs-and-migration-work" className="mt-10 border-t border-line pt-7">
          <h2 id="count-retained-costs-and-migration-work" className="scroll-mt-32 text-2xl font-semibold leading-snug text-ink mb-5">6. Count retained costs and migration work</h2>
          <p className="mb-5">List what remains after moving the task: another Adobe application, fonts, plugins, storage, replacement services and any collaborator access. Count recurring cash separately from one-time conversion work and owner time.</p>
          <p className="mb-5">Use the <Link to="/blog/replaced-saas-stack-with-ai-tools" className="text-link underline underline-offset-4">software-stack audit</Link> for the full method and the <Link to="/tools/saas-calculator" className="text-link underline underline-offset-4">audit calculator</Link> for your own amounts. Do not enter a saving merely because one candidate has no new subscription charge. Retained services and the next difficult edit can change the result.</p>
          <p className="mb-5">Keep a small trial record: <strong className="font-semibold text-ink">job → mandatory requirement → observed result → correction → recipient decision → retained application</strong>. Leave results empty until you actually run the exercise. Record cash and minutes only when measured.</p>
        </section>
        <section aria-labelledby="pass-the-recovery-gate-before-cancellation" className="mt-10 border-t border-line pt-7">
          <h2 id="pass-the-recovery-gate-before-cancellation" className="scroll-mt-32 text-2xl font-semibold leading-snug text-ink mb-5">7. Pass the recovery gate before cancellation</h2>
          <p className="mb-5">Download the originals, working copies, final exports, links and font/asset manifest. Reopen them from a backup in a clean folder. Confirm that the next required edit can be completed without relying on an expiring cloud copy.</p>
          <p className="mb-5">Then inspect your actual plan: billing commitment, renewal, displayed cancellation terms and effective access end. Adobe's <a href="https://helpx.adobe.com/account/individual/subscriptions-and-plans/renewals-and-cancellations/cancel-adobe-subscription.html" className="text-link underline underline-offset-4">cancellation guidance</a> makes plan-specific terms relevant; this guide gives no universal fee or refund rule.</p>
          <p className="mb-5">Adobe's <a href="https://helpx.adobe.com/account/individual/subscriptions-and-plans/renewals-and-cancellations/account-access-after-plan-cancellation.html" className="text-link underline underline-offset-4">post-cancellation help</a> distinguishes the account and local files from paid access and changed cloud allowances. It describes reactivation within the billing period, not an indefinite guarantee of restoration on identical terms. Keep the displayed confirmation and your own verified backup.</p>
          <p className="mb-5">Choose <strong className="font-semibold text-ink">keep</strong> when a mandatory handoff still fails, <strong className="font-semibold text-ink">trial</strong> when the replacement needs more evidence, or <strong className="font-semibold text-ink">move this task</strong> when the agreed file, recipient and recovery checks pass. Start with the next real deliverable—not cancellation as a demonstration of commitment.</p>
        </section>
        <p className="mt-10 border-t border-line pt-6 text-base"><Link to="/guides" className="text-link underline underline-offset-4">Browse practical guides</Link></p>
      </article>
    </main>
  );
};
