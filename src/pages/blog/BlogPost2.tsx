import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { articleCovers } from '../../data/articleCovers';
import { PUBLISHER_NAME } from '../../data/site';
import { ArticleFigure } from '../../components/article/ArticleBlocks';

export const BlogPost2 = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <main className="bg-brand-bg min-h-screen pt-36 pb-20">
      <article className="max-w-[780px] mx-auto px-5 sm:px-7 text-secondary text-[17px] leading-[1.8]">
        <header className="mb-8">
          <p className="text-link font-mono text-xs uppercase tracking-wider mb-4">Guides · Practical AI workflows</p>
          <h1 className="text-3xl sm:text-4xl font-semibold text-ink leading-tight mb-6" style={{ fontFamily: 'var(--font-serif)' }}>10 AI Tools for Common Solo-Business Tasks</h1>
          <p className="text-xl leading-relaxed mb-6">Choose one job, supply a controlled input and check the result. These ten recipes explain what to request, what to reject and when a manual approach is enough.</p>
          <p className="text-sm"><Link to="/about" className="text-link underline underline-offset-4">{PUBLISHER_NAME}</Link></p>
          <p className="text-sm mt-2">Published <time dateTime="2026-04">April 2026</time> · Updated <time dateTime="2026-11-27">27 November 2026</time></p>
        </header>
        <ArticleFigure image={{ ...articleCovers.tools, caption: 'Editorial task illustration. These recipes describe proposed exercises, not measured productivity results.' }} eager />
        <nav aria-label="Article contents" className="border-y border-line py-5 my-8 text-base">
          <p className="font-semibold text-ink mb-3">In this guide</p>
          <ol className="space-y-2">
              <li><a href="#claude-turn-an-enquiry-into-a-clarification-draft" className="text-link underline underline-offset-4">1. Claude: turn an enquiry into a clarification draft</a></li>
              <li><a href="#perplexity-collect-sources-for-one-bounded-question" className="text-link underline underline-offset-4">2. Perplexity: collect sources for one bounded question</a></li>
              <li><a href="#notion-ai-locate-the-current-internal-policy" className="text-link underline underline-offset-4">3. Notion AI: locate the current internal policy</a></li>
              <li><a href="#cursor-prepare-one-reviewable-website-change" className="text-link underline underline-offset-4">4. Cursor: prepare one reviewable website change</a></li>
              <li><a href="#midjourney-explore-a-visual-direction" className="text-link underline underline-offset-4">5. Midjourney: explore a visual direction</a></li>
              <li><a href="#runway-try-one-simple-motion-concept" className="text-link underline underline-offset-4">6. Runway: try one simple motion concept</a></li>
              <li><a href="#elevenlabs-audition-a-tutorial-narration" className="text-link underline underline-offset-4">7. ElevenLabs: audition a tutorial narration</a></li>
              <li><a href="#jasper-adapt-an-approved-campaign" className="text-link underline underline-offset-4">8. Jasper: adapt an approved campaign</a></li>
              <li><a href="#descript-edit-an-existing-spoken-clip" className="text-link underline underline-offset-4">9. Descript: edit an existing spoken clip</a></li>
              <li><a href="#framer-prototype-one-landing-page-structure" className="text-link underline underline-offset-4">10. Framer: prototype one landing-page structure</a></li>
              <li><a href="#keep-one-small-acceptance-log" className="text-link underline underline-offset-4">Keep one small acceptance log</a></li>
          </ol>
        </nav>
          <p className="mb-5">Choose one recurring job before choosing another subscription. A useful trial starts with material you can supply, an output you can inspect and a clear decision about who may use or publish it.</p>
          <p className="mb-5">The ten recipes below cover different jobs. They are not a recommendation to buy ten tools or a claim that a solo operator can replace a team. Use something already available when it meets the need; keep the manual fallback when review or maintenance would outweigh the help.</p>
        <aside aria-label="Evidence scope" className="border-l-2 border-link bg-brand-surface px-5 py-4 my-8 text-base"><strong className="font-semibold text-ink">Evidence scope:</strong> Source research was completed on 26 November 2026, with ElevenLabs license guidance rechecked on 27 November. These are proposed exercises, not observed Domsky runs or quality rankings. Example lengths and quantities are task constraints, not provider limits. Check your actual plan, permissions and asset rights before supplying data or releasing output.</aside>
        <section aria-labelledby="claude-turn-an-enquiry-into-a-clarification-draft" className="mt-10 border-t border-line pt-7">
          <h2 id="claude-turn-an-enquiry-into-a-clarification-draft" className="scroll-mt-32 text-2xl font-semibold leading-snug text-ink mb-5">1. Claude: turn an enquiry into a clarification draft</h2>
          <p className="mb-5"><strong className="font-semibold text-ink">Input:</strong> a redacted client brief and a checklist of required facts—scope, budget, target date and responsible contact. Ask for a supplied/missing-facts table, then a short <strong className="font-semibold text-ink">unsent</strong> response asking only for the gaps.</p>
          <p className="mb-5">Claude documents <a href="https://support.claude.com/en/articles/8241126-upload-files-to-claude" className="text-link underline underline-offset-4">supported file uploads</a>, with text-only extraction for non-PDF documents. Supply a relevant visual separately when its content matters; do not assume an embedded chart was interpreted.</p>
          <p className="mb-5">Trace every filled value to the brief. Unknown budget or timing must stay unknown. Reject an invented quote, deadline or promise of acceptance. Make the missing-facts table the first output so you can inspect it before polishing prose. The owner edits and sends the response. A checklist and a manually written email remain a complete fallback.</p>
        </section>
        <section aria-labelledby="perplexity-collect-sources-for-one-bounded-question" className="mt-10 border-t border-line pt-7">
          <h2 id="perplexity-collect-sources-for-one-bounded-question" className="scroll-mt-32 text-2xl font-semibold leading-snug text-ink mb-5">2. Perplexity: collect sources for one bounded question</h2>
          <p className="mb-5"><strong className="font-semibold text-ink">Input:</strong> a question such as “Which official pages explain this product's export restrictions?” Specify the product, the relevant date and the decision you need to make. Request a shortlist containing title, publisher, date, URL and unresolved questions.</p>
          <p className="mb-5">Perplexity's <a href="https://www.perplexity.ai/help-center/en/articles/10352903-what-is-pro-search" className="text-link underline underline-offset-4">Pro Search documentation</a> describes cited research when that mode is included in the plan. A linked answer is a discovery aid. Open each source, find the supporting passage and record your own claim/source/date ledger.</p>
          <p className="mb-5">Reject missing, inaccessible or irrelevant citations rather than treating their presence as verification. Keep a question narrow enough to check. If the necessary pages cannot be retrieved, use ordinary browser search and a manual source ledger; do not fill the gap with a more confident summary.</p>
        </section>
        <section aria-labelledby="notion-ai-locate-the-current-internal-policy" className="mt-10 border-t border-line pt-7">
          <h2 id="notion-ai-locate-the-current-internal-policy" className="scroll-mt-32 text-2xl font-semibold leading-snug text-ink mb-5">3. Notion AI: locate the current internal policy</h2>
          <p className="mb-5"><strong className="font-semibold text-ink">Input:</strong> two synthetic policy pages: one marked current and one clearly superseded. Ask what the current revision requires, with a page link and any conflicting information.</p>
          <p className="mb-5">Notion's <a href="https://www.notion.com/help/enterprise-search" className="text-link underline underline-offset-4">Enterprise Search guide</a> describes source citations and scope/context selection, and lists Business/Enterprise availability. Connected-app and administrator access still matter.</p>
          <p className="mb-5">Limit the question to the relevant pages. Open the cited source and check its revision/date, not just the answer's wording. Reject a response that mixes an old rule into the current policy or cannot identify its source. Finding a page does not authorize sharing its contents with a client. If search is unreliable for the task, maintain a short policy index and open the current page manually.</p>
        </section>
        <section aria-labelledby="cursor-prepare-one-reviewable-website-change" className="mt-10 border-t border-line pt-7">
          <h2 id="cursor-prepare-one-reviewable-website-change" className="scroll-mt-32 text-2xl font-semibold leading-snug text-ink mb-5">4. Cursor: prepare one reviewable website change</h2>
          <p className="mb-5"><strong className="font-semibold text-ink">Input:</strong> a clean Git branch, one reproducible problem, allowed files and an observable acceptance check. For a broken footer link, specify the current destination, intended destination and the pages to inspect. Request a patch and an explanation of every change.</p>
          <p className="mb-5">Cursor documents <a href="https://cursor.com/help/ai-features/agent" className="text-link underline underline-offset-4">Agent editing and tools</a>. Its <a href="https://cursor.com/docs/agent/security" className="text-link underline underline-offset-4">security guidance</a> warns that workspace edits save directly and auto-reload can execute changes before review. Keep secrets and live credentials outside the exercise.</p>
          <p className="mb-5">Read the diff, run relevant checks and preview the behavior. Reject unrelated edits or a claim of success without the requested destination working. A test file merely existing is not a passing test. Use a manual patch or a developer when nobody available can review and maintain the code.</p>
        </section>
        <section aria-labelledby="midjourney-explore-a-visual-direction" className="mt-10 border-t border-line pt-7">
          <h2 id="midjourney-explore-a-visual-direction" className="scroll-mt-32 text-2xl font-semibold leading-snug text-ink mb-5">5. Midjourney: explore a visual direction</h2>
          <p className="mb-5"><strong className="font-semibold text-ink">Input:</strong> an original or authorized reference and a short editorial brief naming subject, composition, palette and exclusions. Request concept alternatives you can compare against the same brief.</p>
          <p className="mb-5">Midjourney's <a href="https://docs.midjourney.com/hc/en-us/articles/32040250122381-Image-Prompts" className="text-link underline underline-offset-4">image-prompt guidance</a> describes reference influence, not exact reproduction. Use the output to choose a direction; add final typography and approved brand assets in an editor.</p>
          <p className="mb-5">Check whether the image explains the intended article, survives the required crop and contains unwanted objects, distorted details or incorrect text. Reject a concept that looks attractive but communicates the wrong decision. Before client or public use, check the <a href="https://docs.midjourney.com/hc/en-us/articles/27870375276557-Using-Images-Videos-Commercially" className="text-link underline underline-offset-4">commercial-use conditions</a>, actual plan and rights in the inputs. A suitable original photo or simple native diagram may be a better fallback.</p>
        </section>
        <section aria-labelledby="runway-try-one-simple-motion-concept" className="mt-10 border-t border-line pt-7">
          <h2 id="runway-try-one-simple-motion-concept" className="scroll-mt-32 text-2xl font-semibold leading-snug text-ink mb-5">6. Runway: try one simple motion concept</h2>
          <p className="mb-5"><strong className="font-semibold text-ink">Input:</strong> an owned or authorized still and one clear motion instruction—for example, a slow camera move across a workspace. Choose the model, duration and aspect ratio deliberately. Ask for one short draft before attempting a whole advertisement.</p>
          <p className="mb-5">Runway's <a href="https://help.runwayml.com/hc/en-us/articles/46974685288467-Creating-with-Gen-4-5" className="text-link underline underline-offset-4">Gen-4.5 guide</a> documents text/image-to-video, Standard-or-higher access and credit conditions for that model. Use its <a href="https://help.runwayml.com/hc/en-us/articles/42460036199443-Text-to-Video-Prompting-Guide" className="text-link underline underline-offset-4">prompting guidance</a> to describe the scene and movement.</p>
          <p className="mb-5">Review every frame for continuity, distorted brand/product details and actions that never happened. Save settings and rejected attempts; repeated generations belong in the budget. Do not publish a fabricated product demonstration. If no draft passes, use licensed footage or the original still rather than buying more attempts without a reason.</p>
        </section>
        <section aria-labelledby="elevenlabs-audition-a-tutorial-narration" className="mt-10 border-t border-line pt-7">
          <h2 id="elevenlabs-audition-a-tutorial-narration" className="scroll-mt-32 text-2xl font-semibold leading-snug text-ink mb-5">7. ElevenLabs: audition a tutorial narration</h2>
          <p className="mb-5"><strong className="font-semibold text-ink">Input:</strong> a final short script, a pronunciation list and a voice you are permitted to use. Request a narration draft. Try the most difficult sentence first before generating the full piece.</p>
          <p className="mb-5">The <a href="https://elevenlabs.io/docs/eleven-creative/playground/text-to-speech" className="text-link underline underline-offset-4">Text to Speech guide</a> explains text, voice/model settings and generation. Listen from beginning to end against the script. Check names, numbers, omissions, pauses and whether the delivery changes the intended meaning; a plausible first sentence is insufficient.</p>
          <p className="mb-5">Keep a text version and provide captions where needed. Before commercial release, check the <a href="https://elevenlabs.io/docs/help-center/legal/can-i-publish-the-content-i-generate-on-the-platform" className="text-link underline underline-offset-4">license terms for that generation</a>, including plan, voice and beta exclusions. A later upgrade does not retroactively license earlier Free output. Recording your own voice or publishing the checked text are useful fallbacks.</p>
        </section>
        <section aria-labelledby="jasper-adapt-an-approved-campaign" className="mt-10 border-t border-line pt-7">
          <h2 id="jasper-adapt-an-approved-campaign" className="scroll-mt-32 text-2xl font-semibold leading-snug text-ink mb-5">8. Jasper: adapt an approved campaign</h2>
          <p className="mb-5"><strong className="font-semibold text-ink">Input:</strong> an approved fact sheet, audience, one call to action, required disclaimer and style rules. Ask for an email or social adaptation with no additional offer, product benefit or performance claim.</p>
          <p className="mb-5">Jasper's native <a href="https://help.jasper.ai/hc/en-us/articles/25925092890011-Style-Guide" className="text-link underline underline-offset-4">Style Guide</a> governs writing rules and is Business-only. Confirm access if that feature is part of the workflow; do not assume every plan includes it.</p>
          <p className="mb-5">Compare the draft with the fact sheet. Check the exact offer, disclaimer and destination link separately from tone and formatting. Reject invented urgency or a polished sentence that changes the conditions. An owner approves the message before sending. If this is an occasional adaptation, a document template, manual edit or an assistant you already use may cover it without another marketing subscription.</p>
        </section>
        <section aria-labelledby="descript-edit-an-existing-spoken-clip" className="mt-10 border-t border-line pt-7">
          <h2 id="descript-edit-an-existing-spoken-clip" className="scroll-mt-32 text-2xl font-semibold leading-snug text-ink mb-5">9. Descript: edit an existing spoken clip</h2>
          <p className="mb-5"><strong className="font-semibold text-ink">Input:</strong> an authorized recording, a corrected transcript and one marked passage that can be removed without changing the speaker's meaning. Request an edited draft with captions; retain the original media.</p>
          <p className="mb-5">Descript supports <a href="https://www.descript.com/features" className="text-link underline underline-offset-4">transcript-led editing</a>, but its <a href="https://help.descript.com/script-editing/correct-your-transcript" className="text-link underline underline-offset-4">Correct mode</a> changes transcript text without changing the underlying recording. Correct a spelling error in that mode; do not mistake it for repairing a spoken factual error.</p>
          <p className="mb-5">Replay the complete edit, especially the joins. Check meaning, missing words, caption accuracy and synchronization. Reject a clean-looking transcript if the audio still says the wrong thing. Confirm your account's transcription/export allowances before committing to a workflow. A timeline editor and manual captions remain a fallback when transcript-led editing does not preserve the intended result.</p>
        </section>
        <section aria-labelledby="framer-prototype-one-landing-page-structure" className="mt-10 border-t border-line pt-7">
          <h2 id="framer-prototype-one-landing-page-structure" className="scroll-mt-32 text-2xl font-semibold leading-snug text-ink mb-5">10. Framer: prototype one landing-page structure</h2>
          <p className="mb-5"><strong className="font-semibold text-ink">Input:</strong> an approved headline, body, call to action, required sections and mobile priorities. Ask for a layout starting point, then replace example content with the actual copy.</p>
          <p className="mb-5">Framer's <a href="https://www.framer.com/updates/wireframer" className="text-link underline underline-offset-4">Wireframer announcement</a> documents generated layouts editable in Canvas. Check current access and interface rather than assuming an older demonstration matches your account.</p>
          <p className="mb-5">Inspect reading order, phone-width wrapping, keyboard focus, contrast, links and form behavior in preview. A screenshot is not a working website. Framer's <a href="https://www.framer.com/help/articles/can-i-export-my-website-to-html-and-self-host-it/" className="text-link underline underline-offset-4">HTML-export guidance</a> says it does not provide HTML self-host export; choose another path first if portable source is mandatory. Domain and publishing decisions need their own review. A sketch, static mockup or existing site template can be sufficient for evaluating the structure.</p>
        </section>
        <section aria-labelledby="keep-one-small-acceptance-log" className="mt-10 border-t border-line pt-7">
          <h2 id="keep-one-small-acceptance-log" className="scroll-mt-32 text-2xl font-semibold leading-snug text-ink mb-5">Keep one small acceptance log</h2>
          <p className="mb-5">For whichever task you try, record the input/date, plan/model, expected output, failure found, correction made and keep/skip decision. Add usage/cash and review minutes only when you actually measure them. Leave unrun results empty.</p>
          <p className="mb-5">Keep source material and an editable version so a rejected output does not become the only copy. Use synthetic, redacted or authorized inputs. Review the artifact in the form the recipient will use: open the file, listen to the audio, play the video or navigate the page.</p>
          <p className="mb-5">The <Link to="/tools/prompt-builder" className="text-link underline underline-offset-4">Prompt Builder</Link> can help organize a bounded request. The <Link to="/uses" className="text-link underline underline-offset-4">lean stack guide</Link> addresses which categories are worth retaining, while the <Link to="/blog/ai-daily-workflow-solo-business" className="text-link underline underline-offset-4">content workflow</Link> connects research, drafting and approval. For subscription decisions, use the <Link to="/blog/replaced-saas-stack-with-ai-tools" className="text-link underline underline-offset-4">software-stack audit</Link>.</p>
          <p className="mb-5">Choose one recipe and its acceptance check. Keep the result only when it meets the job and someone can maintain it. Add a subscription after that decision, not to complete a collection of ten tools.</p>
        </section>
        <p className="mt-10 border-t border-line pt-6 text-base"><Link to="/guides" className="text-link underline underline-offset-4">Browse practical guides</Link></p>
      </article>
    </main>
  );
};
