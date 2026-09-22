import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll } from 'motion/react';
import { Image as ImageIcon, ArrowRight } from 'lucide-react';
import { H2, H3, SectionDivider, CalloutTip } from '../../components/ui';

const sources = {
  astra: 'https://openai.com/index/gpt-6-astra/',
  access: 'https://help.openai.com/en/articles/20001275/',
  claude: 'https://claude.com/pricing',
  gemini: 'https://gemini.google/subscriptions/',
  perplexity: 'https://www.perplexity.ai/help-center/en/articles/11187416-which-perplexity-subscription-plan-is-right-for-you',
};
const contents = [
  ['quick-answer', 'The quick answer'], ['what-is-astra', 'What Astra actually is'],
  ['comparison', 'Compare the options'], ['alternatives', 'Which alternative fits?'],
  ['cost', 'What is worth paying for?'], ['test', 'Try this before subscribing'],
  ['verdict', 'Our verdict'], ['sources', 'Sources & methodology'],
];
const Source = ({ href, children }: { href: string; children: React.ReactNode }) => <a href={href} className="text-brand-cyan underline underline-offset-4 hover:text-white">{children}</a>;

// Set src to an uploaded image path to replace each placeholder without changing the layout.
const images = {
  hero: { src: '', alt: 'ChatGPT Astra, Claude, Gemini and Perplexity comparison', brief: 'Four assistant interfaces arranged on a dark background with cyan and amber accents.', file: 'astra-alternatives-hero.webp' },
  access: { src: '/images/astra-work-model-picker.webp', alt: 'GPT-6 Astra selected in ChatGPT Work. Original Slovak interface, captured 22 September 2026.', brief: 'Add a real screenshot showing the selected model and plan. Hide account details.', file: 'astra-work-model-picker.webp' },
  workflow: { src: '', alt: 'The same business brief compared across four AI assistants', brief: 'Add real outputs from the same brief. Label the model, date and plan for each.', file: 'astra-alternatives-workflow.webp' },
};
function ArticleImage({ image }: { image: typeof images.hero }) {
  return <figure className="my-10 overflow-hidden rounded-xl border border-dashed border-brand-cyan/30 bg-brand-surface">
    {image.src ? <img src={image.src} alt={image.alt} loading="lazy" className="w-full h-auto" /> : <div className="flex aspect-video flex-col items-center justify-center gap-3 px-6 text-center">
      <ImageIcon aria-hidden="true" className="text-brand-cyan/60" size={30} />
      <span className="text-xs font-mono uppercase tracking-widest text-brand-cyan">Image placeholder</span>
      <span className="text-sm text-gray-300 max-w-md">{image.brief}</span>
      <span className="text-xs text-gray-500 break-all">{image.file}</span>
    </div>}
    <figcaption className="border-t border-gray-800 px-5 py-3 text-xs text-gray-400">{image.src ? image.alt : 'Reserved for an original image. No test results are pictured here.'}</figcaption>
  </figure>;
}

export function AstraComparison() {
  const { scrollYProgress } = useScroll();
  return <main className="bg-brand-bg min-h-screen text-gray-300 pb-24">
    <motion.div aria-hidden="true" className="fixed top-0 inset-x-0 h-1 bg-brand-cyan origin-left z-50" style={{ scaleX: scrollYProgress }} />
    <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-36">
      <Link to="/comparisons" className="text-sm text-brand-cyan hover:underline">← All comparisons</Link>
      <header className="max-w-4xl mt-8 mb-12">
        <p className="font-mono text-xs uppercase tracking-widest text-brand-cyan mb-5">AI comparisons · 8 min read</p>
        <h1 className="font-mono font-bold text-white text-3xl sm:text-4xl lg:text-5xl leading-tight tracking-tight">ChatGPT Astra vs Claude, Gemini &amp; Perplexity: Which AI Is Worth Paying For?</h1>
        <p className="text-lg sm:text-xl leading-relaxed text-gray-400 mt-6 max-w-3xl">Choose an assistant for the work you need to finish. A practical guide to Astra access, alternative workflows, and avoiding another subscription you barely use.</p>
        <p className="mt-6 text-sm text-gray-400">Domsky Solutions editorial · Researched <time dateTime="2026-09-22">22 September 2026</time></p>
      </header>
      <div className="grid lg:grid-cols-[200px_minmax(0,1fr)] gap-10 lg:gap-14 items-start">
        <nav aria-label="Article contents" className="lg:sticky lg:top-32 rounded-xl border border-gray-800 p-5 bg-brand-surface">
          <p className="text-xs font-mono uppercase tracking-widest text-brand-cyan mb-4">In this comparison</p>
          <ul className="space-y-3 text-sm">{contents.map(([id, label]) => <li key={id}><a href={`#${id}`} className="hover:text-brand-cyan">{label}</a></li>)}</ul>
        </nav>
        <article className="min-w-0 max-w-[760px] text-[17px] leading-[1.85] [&_section]:scroll-mt-32 [&_p]:mb-5">
          <aside className="text-sm border-l-2 border-brand-cyan bg-brand-surface p-5 rounded-r-lg">This is a research-based buying guide using official product documentation, not a hands-on benchmark. Recommendations are editorial judgments. We have not run a controlled four-way test. <Link to="/methodology" className="text-brand-cyan underline">How we evaluate tools</Link>.</aside>
          <ArticleImage image={images.hero} />
          <section id="quick-answer">
            <H2>The quick answer: buy for your bottleneck</H2>
            <p>A new flagship model is a reason to reassess your tools, not a reason to subscribe to everything. For a solo business, the useful question is simple: which assistant gets your recurring work to a usable result with the least correction?</p>
            <ul className="list-disc pl-6 space-y-3">
              <li><strong className="text-white">Shortlist Astra</strong> when you want to delegate a demanding task with several steps and a concrete deliverable.</li>
              <li><strong className="text-white">Shortlist Claude</strong> when your work centres on drafts, documents, projects and code.</li>
              <li><strong className="text-white">Shortlist Gemini</strong> when Gmail and Docs are already where your business operates.</li>
              <li><strong className="text-white">Shortlist Perplexity</strong> when finding and inspecting sources is the main job.</li>
            </ul>
            <p className="mt-6">These are starting points for a trial, not exclusive capabilities or a ranking of intelligence. All four overlap. The right choice depends on your actual files, required integrations and tolerance for editing.</p>
          </section>
          <SectionDivider />
          <section id="what-is-astra">
            <H2>What is “ChatGPT Astra”?</H2>
            <p>GPT‑6 Astra is an OpenAI model, not a separate subscription called “Astra.” OpenAI introduced it as a model for demanding reasoning, computer use and professional work. Its launch claims are vendor claims, not an independent ranking in this article. <Source href={sources.astra}>Read OpenAI’s Astra announcement</Source>.</p>
            <p>The access details matter. OpenAI’s current help page says GPT‑6 Pro, powered by Astra, is available in regular ChatGPT on Pro $100, Pro $200, Business and Enterprise plans. Plus includes Astra in Work and Codex. Work access is still rolling out, and workspace permissions can affect availability. <Source href={sources.access}>Check the official access guide</Source>.</p>
            <CalloutTip>Before upgrading, check both the plan and the experience you want to use. Access in Work or Codex does not mean the same model is available in ordinary Chat.</CalloutTip>
            <ArticleImage image={images.access} />
          </section>
          <section id="comparison">
            <H2>Astra vs alternatives at a glance</H2>
            <p>This table compares products and workflows, rather than pretending that an underlying model and a complete research app are identical purchases.</p>
            <div className="overflow-x-auto rounded-xl border border-gray-800 my-8" role="region" aria-label="AI assistant comparison table" tabIndex={0}>
              <table className="w-full min-w-[620px] text-sm text-left">
                <caption className="text-left p-4 bg-brand-surface text-gray-400">Editorial shortlist · official feature sources linked in each row</caption>
                <thead className="bg-brand-surface text-white"><tr>{['Option', 'Start here when…', 'Check before paying'].map(text => <th scope="col" key={text} className="p-4 border-b border-gray-700">{text}</th>)}</tr></thead>
                <tbody className="divide-y divide-gray-800">
                  <tr><th scope="row" className="p-4 align-top"><Source href={sources.access}>ChatGPT / Astra</Source></th><td className="p-4 align-top">You need a multi-step deliverable or repository work.</td><td className="p-4 align-top">Chat vs Work vs Codex access; included allowance and extra credits.</td></tr>
                  <tr><th scope="row" className="p-4 align-top"><Source href={sources.claude}>Claude</Source></th><td className="p-4 align-top">You want Projects, document work and coding in one ecosystem.</td><td className="p-4 align-top">Which features need Pro, and your usage limits.</td></tr>
                  <tr><th scope="row" className="p-4 align-top"><Source href={sources.gemini}>Gemini</Source></th><td className="p-4 align-top">You want AI inside your existing Google workflow.</td><td className="p-4 align-top">Personal vs work account, region and app eligibility.</td></tr>
                  <tr><th scope="row" className="p-4 align-top"><Source href={sources.perplexity}>Perplexity</Source></th><td className="p-4 align-top">Your deliverable starts with web research and source checking.</td><td className="p-4 align-top">Research limits and access to the specific models or tools you need.</td></tr>
                </tbody>
              </table>
            </div>
          </section>
          <section id="alternatives">
            <H2>Which alternative fits your work?</H2>
            <H3>Astra: consider it for an entire assignment</H3>
            <p>Think about a brief such as “research this market, organise the evidence, and turn it into a decision document.” OpenAI positions Work around finished deliverables and Codex around development. That makes Astra worth trying when moving between steps is itself taking up your day. <Source href={sources.access}>Work and Codex capabilities</Source>.</p>
            <p>Our buying advice: give it an assignment with a clear acceptance checklist. If the task still requires you to reconstruct the output, the impressive model name has not solved your problem. For a few headlines or a short email, start with the assistant you already have.</p>
            <H3>Claude: a candidate for document-heavy businesses</H3>
            <p>Claude’s current Pro plan lists Projects, Claude Code, document and slide tools, and additional models. Its free plan provides an entry point for evaluating everyday work. <Source href={sources.claude}>Compare Claude’s plans</Source>.</p>
            <p>For a consultant, writer or solo developer, we would trial it on a proposal, a revision-heavy article or a small code change. Judge whether it preserves requirements across revisions. This is a suggested evaluation, not a claim that Claude universally writes better than Astra.</p>
            <H3>Gemini: a candidate when your files already live in Google</H3>
            <p>Google’s AI plans include different levels of Gemini access and integrations with apps such as Gmail and Docs. Features vary by plan, account, location and language. <Source href={sources.gemini}>Check Google’s plan details</Source>.</p>
            <p>Our reasoning is practical: working near the source material can reduce copying, exporting and reformatting. Try a task using the documents you already maintain. If your employer manages your account, verify the relevant Workspace entitlement before buying a personal subscription.</p>
            <H3>Perplexity: a candidate when evidence comes first</H3>
            <p>Perplexity’s paid plans combine research features, premium model access and tools for broader work, including Computer. It is no longer useful to describe it only as a simple search box. <Source href={sources.perplexity}>Compare Perplexity’s subscriptions</Source>.</p>
            <p>We would shortlist it for competitor research, product comparisons and finding the original source behind a claim. Open the cited pages and check that they support the answer. A citation is a route to evidence, not proof that the conclusion is correct. Access to a model through Perplexity also does not reproduce every feature of that model provider’s own app.</p>
            <ArticleImage image={images.workflow} />
          </section>
          <section id="cost">
            <H2>What is actually worth paying for?</H2>
            <p>Compare the cost of finishing your work, including the subscription, extra usage, your review time and any tools you can cancel. A cheap plan that constantly blocks your real workload may be poor value. A premium plan used twice a month can be equally wasteful.</p>
            <p>OpenAI says Astra can consume Work and Codex allowances faster than GPT‑5.6 Sol; task size and settings affect usage. A subscription therefore does not guarantee unlimited Astra work. <Source href={sources.access}>Astra usage details</Source>.</p>
            <p>Claude lists Pro at US$20 billed monthly, or US$17 per month with annual billing, excluding applicable tax. Treat that as an entry price, not unlimited capacity. <Source href={sources.claude}>Claude pricing</Source>. Google and Perplexity offer several tiers; use their linked plan pages to confirm local prices and included features before checkout.</p>
            <CalloutTip>Illustrative example, not a measured saving: a $20 subscription that saves two hours you value at $25/hour creates $50 of time value before review effort. Add $15 of extra usage and an hour of corrections, and that same task no longer justifies the spend.</CalloutTip>
            <p>Start with one paid assistant. Add a second only after you can name a repeated task the first cannot complete well enough. Use the <Link to="/tools/saas-calculator" className="text-brand-cyan underline">SaaS calculator</Link> to review your overall software budget.</p>
          </section>
          <section id="test">
            <H2>A useful trial beats another leaderboard</H2>
            <p>Run these three tasks with the same inputs in your two shortlisted assistants. Use material you are authorised to share. Record the selected model and plan so you know what you actually compared.</p>
            <ol className="list-decimal pl-6 space-y-4">
              <li><strong className="text-white">An evidence task:</strong> compare three suppliers using their official pages. Ask for dated sources, missing facts and a recommendation tied to your requirements.</li>
              <li><strong className="text-white">A production task:</strong> turn a real brief into a client proposal, a content plan or a small working feature. Define the required format before starting.</li>
              <li><strong className="text-white">A revision task:</strong> change one important requirement. Check whether the assistant updates every affected part without breaking the rest.</li>
            </ol>
            <p className="mt-6">Track time to an acceptable result, factual errors, manual corrections and usage consumed. Inspect files and run code where relevant. The winner is the tool you would trust with this task again after reviewing its output.</p>
          </section>
          <section id="verdict">
            <H2>Our verdict: one useful assistant first</H2>
            <p>Astra belongs on your shortlist if you want to hand over complex assignments. Claude deserves a trial for document and development workflows. Gemini makes sense to evaluate around Google apps. Perplexity is worth considering when the research trail is central to the result.</p>
            <p>There is no supported universal winner in the evidence reviewed here. Our recommendation is to choose your most frequent bottleneck, test two candidates on it, and pay for the one that reduces the most work after corrections. Revisit the choice when your needs change, not whenever a new model name appears.</p>
            <div className="my-10 p-6 sm:p-8 rounded-xl bg-brand-surface border border-brand-cyan/30">
              <h3 className="text-xl text-white font-bold mb-3">Build a smaller, more useful AI stack</h3>
              <p className="text-gray-400">Use your business needs to narrow the options before adding another subscription.</p>
              <Link to="/tools/stack-recommender" className="inline-flex items-center gap-2 text-brand-cyan font-semibold hover:underline">Find my starting AI stack <ArrowRight size={18} aria-hidden="true" /></Link>
            </div>
          </section>
          <section id="sources" className="text-sm text-gray-400">
            <H2>Sources &amp; methodology</H2>
            <p>Official documentation checked on 22 September 2026. This guide compares documented access and features with editorial use-case advice. No performance scores, personal test history or measured savings are claimed. Plans and rollouts can change.</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><Source href={sources.astra}>OpenAI: GPT‑6 Astra announcement</Source></li>
              <li><Source href={sources.access}>OpenAI: ChatGPT Work, Codex and Astra access</Source></li>
              <li><Source href={sources.claude}>Anthropic: Claude plans and features</Source></li>
              <li><Source href={sources.gemini}>Google: Gemini subscription details</Source></li>
              <li><Source href={sources.perplexity}>Perplexity: subscription comparison</Source></li>
            </ul>
            <p className="mt-6">The provider links in this article are direct, non-affiliate links. Other pages on this site may contain affiliate links. <Link to="/disclaimer" className="text-brand-cyan underline">Read our disclosure</Link>.</p>
          </section>
        </article>
      </div>
    </div>
  </main>;
}
