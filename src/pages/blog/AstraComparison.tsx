import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { H2, H3, SectionDivider, CalloutTip } from '../../components/ui';

const sources = {
  access: 'https://help.openai.com/en/articles/20001275/',
  plus: 'https://help.openai.com/en/articles/6950777-what-is-chatgpt-plus',
  code: 'https://code.claude.com/docs/en/overview',
  pricing: 'https://claude.com/pricing',
  costs: 'https://code.claude.com/docs/en/costs',
};
const contents = [
  ['quick-answer', 'Which should you choose?'], ['what-is-astra', 'Model vs coding app'],
  ['comparison', 'Features side by side'], ['alternatives', 'Which workflow fits?'],
  ['cost', 'Pricing and real value'], ['test', 'Test before subscribing'],
  ['verdict', 'Verdict & common questions'], ['sources', 'Sources & methodology'],
];
const Source = ({ href, children }: { href: string; children: React.ReactNode }) => <a href={href} className="text-brand-cyan underline underline-offset-4 hover:text-white">{children}</a>;

function AccessImage() {
  return <figure className="my-10 overflow-hidden rounded-xl border border-gray-800 bg-brand-surface">
    <img src="/images/astra-work-model-picker.webp" alt="GPT-6 Astra selected in the ChatGPT Work model picker in the original Slovak interface." loading="lazy" className="w-full h-auto" />
    <figcaption className="border-t border-gray-800 px-5 py-3 text-xs text-gray-400">Original capture, 22 September 2026. This shows Astra in ChatGPT Work, not Codex or a coding benchmark. Your account’s options may differ.</figcaption>
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
        <h1 className="font-mono font-bold text-white text-3xl sm:text-4xl lg:text-5xl leading-tight tracking-tight">ChatGPT Astra vs Claude Code in 2026: Features, Pricing &amp; Real Value</h1>
        <p className="text-lg sm:text-xl leading-relaxed text-gray-400 mt-6 max-w-3xl">Two routes to getting software built. Understand what you are buying, where the limits are, and how to choose without paying for two tools you barely use.</p>
        <p className="mt-6 text-sm text-gray-400">Domsky Solutions editorial · Updated <time dateTime="2026-09-23">23 September 2026</time></p>
      </header>
      <div className="grid lg:grid-cols-[200px_minmax(0,1fr)] gap-10 lg:gap-14 items-start">
        <nav aria-label="Article contents" className="lg:sticky lg:top-32 rounded-xl border border-gray-800 p-5 bg-brand-surface">
          <p className="text-xs font-mono uppercase tracking-widest text-brand-cyan mb-4">In this comparison</p>
          <ul className="space-y-3 text-sm">{contents.map(([id, label]) => <li key={id}><a href={`#${id}`} className="hover:text-brand-cyan">{label}</a></li>)}</ul>
        </nav>
        <article className="min-w-0 max-w-[760px] text-[17px] leading-[1.85] [&_section]:scroll-mt-32 [&_p]:mb-5">
          <aside className="text-sm border-l-2 border-brand-cyan bg-brand-surface p-5 rounded-r-lg">This is a research-based buying guide using official product documentation, not a hands-on benchmark. Recommendations are editorial judgments. We have not run a controlled head-to-head coding test. <Link to="/methodology" className="text-brand-cyan underline">How we evaluate tools</Link>.</aside>

          <section id="quick-answer">
<H2>Which should you choose?</H2>
<p><strong className="text-white">Already paying for ChatGPT? Try Astra in Codex first.</strong> Give it one real development task before buying another subscription. Your existing access may be enough.</p>
<p><strong className="text-white">Want a coding agent close to your terminal or IDE? Shortlist Claude Code.</strong> Evaluate how it fits your project, not just how convincing its answers sound.</p>
<p><strong className="text-white">Mostly creating reports, proposals or spreadsheets?</strong> Compare ChatGPT Work with Claude’s broader productivity offering. A coding-agent comparison is not the best starting point if you rarely work with a codebase.</p>
<CalloutTip>Start with one paid tool. Add a second only after it reliably solves a recurring problem the first leaves behind. These are buying recommendations, not measured performance rankings.</CalloutTip>
          </section>
          <SectionDivider />
          <section id="what-is-astra">
<H2>Astra is a model. Claude Code is a coding app.</H2>
<p>“ChatGPT Astra” is shorthand for using OpenAI’s GPT‑6 Astra model. Claude Code is a software-development product powered by Claude models. For coding, the useful comparison is <strong className="text-white">Astra in Codex versus Claude Code with a specified model</strong>.</p>
<figure className="my-8 rounded-xl border border-brand-cyan/30 bg-brand-surface p-5 sm:p-7">
<div className="grid sm:grid-cols-2 gap-5">{[
['OpenAI route', 'GPT‑6 Astra', 'Codex'], ['Anthropic route', 'A Claude model', 'Claude Code']
].map(([label, model, app]) => <div key={label} className="rounded-lg border border-gray-700 p-5">
<div className="text-xs font-mono uppercase tracking-widest text-brand-cyan mb-4">{label}</div>
<div className="text-white font-semibold">{model}</div><div className="text-sm text-gray-400">Model</div>
<div aria-hidden="true" className="text-brand-cyan my-2">↓</div>
<div className="text-white font-semibold">{app}</div><div className="text-sm text-gray-400">Workspace and tools</div>
<div aria-hidden="true" className="text-brand-cyan my-2">↓</div><div className="text-white">A reviewed code change</div>
</div>)}</div>
<figcaption className="text-xs text-gray-400 mt-5">Editorial workflow diagram. This illustrates product roles, not performance.</figcaption>
</figure>
<p>OpenAI lists Astra in Work and Codex for Plus. GPT‑6 Pro, powered by Astra, is available in regular ChatGPT on Pro $100, Pro $200, Business and Enterprise. Account and workspace settings affect access. <Source href={sources.access}>Check OpenAI’s access guide</Source>.</p>
<AccessImage />
          </section>
          <section id="comparison">
<H2>Features side by side</H2>
<div className="overflow-x-auto rounded-xl border border-gray-800 my-8" role="region" aria-label="Astra in Codex versus Claude Code features" tabIndex={0}>
<table className="w-full min-w-[620px] text-sm text-left">
<caption className="text-left p-4 bg-brand-surface text-gray-400">Documented capabilities and practical evaluation criteria</caption>
<thead className="bg-brand-surface text-white"><tr>{['Decision point', 'Astra in Codex', 'Claude Code'].map(t => <th key={t} scope="col" className="p-4">{t}</th>)}</tr></thead>
<tbody className="divide-y divide-gray-800">{[
['What it is', 'A model used inside a development workspace.', 'A coding application using Claude models.'],
['Repository work', 'Code changes, debugging, tests, commands and review.', 'Reads code, edits files, runs commands and works with Git.'],
['Environment', 'Check Astra availability in your Codex model picker.', 'Terminal, supported IDEs, desktop and browser.'],
['Customization', 'Trial it with your repository instructions and checks.', 'CLAUDE.md, MCP integrations, skills and hooks.'],
['Beyond coding', 'Work is the separate experience for research and deliverables.', 'Evaluate the wider Claude subscription separately.'],
['Your responsibility', 'Review the diff and verify the finished feature.', 'Review the diff and verify the finished feature.'],
].map(([label, a, b]) => <tr key={label}><th scope="row" className="p-4 align-top text-white">{label}</th><td className="p-4 align-top">{a}</td><td className="p-4 align-top">{b}</td></tr>)}</tbody>
</table></div>
<p className="text-sm">Feature references: <Source href={sources.access}>OpenAI Work and Codex</Source> and <Source href={sources.code}>Claude Code overview</Source>. Similar capabilities do not establish identical results.</p>
          </section>
          <section id="alternatives">
<H2>Which workflow fits your business?</H2>
<H3>Astra in Codex: test the access you already have</H3>
<p>If ChatGPT is already part of your business, start with a bounded feature and a clear acceptance checklist. Judge the implementation, explanation and checks you can rerun. Do not upgrade merely because a model name sounds more advanced.</p>
<p>Watch whether your allowance lasts through meaningful work. If you repeatedly run out while completing valuable tasks, a higher tier may be justified. If the output requires extensive repair, buying more capacity will not by itself solve the quality problem.</p>
<H3>Claude Code: test the developer workflow</H3>
<p>Claude Code is worth evaluating when you want an agent in your development environment. Its documented project instructions and integrations give you specific workflow features to assess. <Source href={sources.code}>Explore Claude Code’s environments and customization</Source>.</p>
<p>The tradeoff is setup and supervision. Your project needs to run correctly, and somebody needs to assess the changes. For a nontechnical founder, define success in observable terms—what the page displays, how the form behaves, and which existing features must keep working.</p>
<H3>Neither replaces acceptance checks</H3>
<p>A polished response is not proof that code works. Check mobile layouts, failure states and existing behavior. Prefer a tool that makes a focused, understandable change over one that produces more code than you can maintain.</p>
          </section>
          <section id="cost">
<H2>Pricing: compare allowances, not just monthly fees</H2>
<p>Published US-dollar consumer prices checked on 23 September 2026. Tax, local checkout and future plan changes can affect your bill.</p>
<div className="overflow-x-auto rounded-xl border border-gray-800 my-8" role="region" aria-label="Subscription prices" tabIndex={0}>
<table className="w-full min-w-[580px] text-sm text-left">
<thead className="bg-brand-surface text-white"><tr>{['Plan', 'Price', 'Buying implication'].map(t => <th key={t} scope="col" className="p-4">{t}</th>)}</tr></thead>
<tbody className="divide-y divide-gray-800">{[
['ChatGPT Plus', '$20/month', 'An entry point for limited Astra access in Work and Codex.'],
['ChatGPT Pro', '$100 or $200/month', 'Compare the included allowance with your actual workload.'],
['Claude Pro', '$20/month or $200 billed annually', 'Includes Claude Code. Annual billing is an upfront commitment.'],
['Claude Max', 'From $100/month', 'Higher usage; check the selected tier before paying.'],
].map(([plan, price, note]) => <tr key={plan}><th scope="row" className="p-4 align-top text-white">{plan}</th><td className="p-4 align-top">{price}</td><td className="p-4 align-top">{note}</td></tr>)}</tbody></table></div>
<p className="text-sm">Price sources: <Source href={sources.plus}>ChatGPT Plus</Source>, <Source href={sources.access}>OpenAI Pro and Astra access</Source>, <Source href={sources.pricing}>Claude plans</Source>.</p>
<H3>Three details that change the real cost</H3>
<ul className="list-disc pl-6 space-y-3">
<li><strong className="text-white">Subscriptions have limits.</strong> Astra draws on the Work/Codex allowance. Plus includes limited Astra usage; task size and settings affect consumption. <Source href={sources.access}>OpenAI usage details</Source>.</li>
<li><strong className="text-white">Additional usage can cost extra.</strong> Claude Code has subscription allowances and optional paid extra usage. Its usage view tracks limits; an API-equivalent session cost is not your subscription invoice. <Source href={sources.costs}>Claude Code cost guide</Source>.</li>
<li><strong className="text-white">API billing is separate.</strong> Do not assume your chat subscription pays for calls made with a personal API key. <Source href={sources.plus}>OpenAI billing</Source>; <Source href={sources.costs}>Claude Code billing</Source>.</li>
</ul>
<H3>Measure the cost of an accepted result</H3>
<p>Include subscription cost, extra usage, review and repair time. A feature has little value if you spend the afternoon fixing it.</p>
<CalloutTip>Hypothetical example, not a benchmark: allocate a $20 subscription across four tasks, with no extra usage. At $30/hour for your time, 15 minutes of review per task makes the effective cost $12.50 each. One hour of repair per task raises it to $35.</CalloutTip>
<p>Start with monthly billing while evaluating. Upgrade after repeatedly completing useful work and reaching a limit. Use the <Link to="/tools/saas-calculator" className="text-brand-cyan underline">SaaS calculator</Link> to check your total software spend.</p>
          </section>
          <section id="test">
<H2>Run a fair three-task trial</H2>
<p>Give both tools the same starting commit, requirements and checks. Use separate branches so neither benefits from the other’s edits. Record the model, plan, date and settings.</p>
<ol className="list-decimal pl-6 space-y-4">
<li><strong className="text-white">Fix a reproducible bug.</strong> Supply steps and expected behavior. Check the original failure and one adjacent case.</li>
<li><strong className="text-white">Build a small feature.</strong> Try an email form with validation, loading, success and failure states. Review it on mobile and with a keyboard.</li>
<li><strong className="text-white">Revise a requirement.</strong> Make one change that affects several files. Look for regressions and unnecessary edits.</li>
</ol>
<blockquote className="my-8 border-l-2 border-brand-cyan bg-brand-surface p-5 text-base">Implement this requirement in the existing project. Explain the plan, keep the change focused, run relevant checks, and report what passed, what failed, and what needs manual review. Do not deploy it.</blockquote>
<p>Track accepted tasks, elapsed time, corrections and allowance consumed. Message counts are not comparable units of work. If both pass, choose the better fit for your budget and workflow. If neither passes, narrow the task before buying more capacity.</p>
          </section>
          <section id="verdict">
<H2>Our verdict: choose the tool that finishes your work</H2>
<p>For an existing ChatGPT subscriber, Astra in Codex is the sensible first trial. For someone seeking a terminal or IDE coding workflow, Claude Code deserves a direct evaluation. Neither recommendation is a claim of superior code quality.</p>
<H3>Is Astra a separate subscription?</H3>
<p>No. Confirm the plan and experience that provide the model you want. Work access and regular ChatGPT access are different.</p>
<H3>Is Claude Code the same as Claude chat?</H3>
<p>No. Claude Code is the development tool. Evaluate it directly rather than assuming a good chat response predicts its repository work.</p>
<H3>Which produces better code?</H3>
<p>We have not run a controlled benchmark supporting a universal winner. Your repository, selected model, instructions and acceptance checks are the useful test.</p>
<H3>Should you pay for both?</H3>
<p>Only when each consistently handles valuable work the other cannot. One useful subscription is a better starting point than overlapping plans with no defined purpose.</p>
<div className="my-10 p-6 sm:p-8 rounded-xl bg-brand-surface border border-brand-cyan/30">
<h3 className="text-xl text-white font-bold mb-3">Build a smaller, more useful AI stack</h3>
<p className="text-gray-400">Narrow your shortlist around your actual business needs.</p>
<Link to="/tools/stack-recommender" className="inline-flex items-center gap-2 text-brand-cyan font-semibold hover:underline">Find my starting AI stack <ArrowRight size={18} aria-hidden="true" /></Link></div>
          </section>
          <section id="sources">
<H2>Sources &amp; methodology</H2>
<p>Official documentation checked on 23 September 2026. This guide separates documented facts from editorial recommendations. No measured speed advantage, personal benchmark history or guaranteed savings are claimed.</p>
<ul className="list-disc pl-5 space-y-2 text-sm">
<li><Source href={sources.access}>OpenAI: ChatGPT Work, Codex and Astra access</Source></li>
<li><Source href={sources.plus}>OpenAI: ChatGPT Plus pricing and API billing</Source></li>
<li><Source href={sources.code}>Anthropic: Claude Code overview</Source></li>
<li><Source href={sources.pricing}>Anthropic: Claude subscription pricing</Source></li>
<li><Source href={sources.costs}>Anthropic: Claude Code usage and costs</Source></li>
</ul>
<p className="mt-6 text-sm">Provider links here are direct, non-affiliate links. Other pages may contain affiliate links. <Link to="/disclaimer" className="text-brand-cyan underline">Read our disclosure</Link>.</p>
          </section>
        </article>
      </div>
    </div>
  </main>;
}
