import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { LeanStackFinder } from '../components/LeanStackFinder';
import { ConvertKitForm } from '../components/ConvertKitForm';

export const HomePage = () => <main className="editorial-home bg-brand-bg min-h-screen">
  <header className="ed-masthead">
    <p className="ed-label">Domsky Solutions / Software decisions</p>
    <h1>What deserves a place <br />in your software stack?</h1>
    <p className="ed-deck">Comparisons and practical guides for running a solo business. Start with the work a tool must do, the limits that matter and the reasons to keep what you have.</p>
    <Link className="ed-policy" to="/methodology">How to read the evidence</Link>
  </header>
  <section className="ed-lead-grid" aria-label="Featured reading">
    <article className="ed-lead">
      <p className="ed-label">The automation decision</p>
      <h2><Link to="/comparisons/make-vs-zapier-solo-business">Before Make or Zapier, check the handoff.</Link></h2>
      <p>An inquiry needs a record and a notification. Your form may already handle both. If a gap remains, compare the exact actions, billing rules and recovery path.</p>
      <p className="ed-evidence">Documentation-based comparison. The proposed workflows have not been tested by Domsky.</p>
      <Link className="ed-read" to="/comparisons/make-vs-zapier-solo-business">Read the Make vs Zapier comparison</Link>
    </article>
    <aside className="ed-reading" aria-label="More software decisions">
      <h2>Other decisions</h2>
      <article><p className="ed-label">Email</p><h3><Link to="/comparisons/kit-vs-mailerlite-vs-beehiiv">One welcome email or a branching sequence?</Link></h3><p>Kit, MailerLite and beehiiv solve different subscriber journeys. Map yours before comparing allowances.</p></article>
      <article><p className="ed-label">AI assistants</p><h3><Link to="/comparisons/claude-vs-chatgpt-vs-gemini-2026">Choose one assistant before paying for another.</Link></h3><p>Compare tasks, plan limits and the subscriptions you already hold.</p></article>
      <article><p className="ed-label">Coding</p><h3><Link to="/comparisons/chatgpt-astra-vs-alternatives">A small website change still needs review.</Link></h3><p>Compare Codex and Claude Code by repository access, control and review effort.</p></article>
    </aside>
  </section>
  <section className="ed-section" aria-labelledby="decision-index">
    <div className="ed-section-head"><h2 id="decision-index">Choose a starting point</h2><Link to="/comparisons">All comparisons</Link></div>
    <div role="region" aria-label="Popular tool comparison" tabIndex={0} className="ed-table-scroll">
      <table><caption>Start with the work, then read the relevant decision guide.</caption><thead><tr><th scope="col">Your decision</th><th scope="col">First thing to check</th><th scope="col">Read next</th></tr></thead><tbody>
        <tr><th scope="row">Another automation platform?</th><td>Can the current form or tracker complete the handoff?</td><td><Link to="/comparisons/make-vs-zapier-solo-business">Make vs Zapier</Link></td></tr>
        <tr><th scope="row">A smaller software bill?</th><td>Which subscriptions still cover a required job?</td><td><Link to="/blog/replaced-saas-stack-with-ai-tools">Software stack audit</Link></td></tr>
        <tr><th scope="row">A content workflow?</th><td>Where do research and approval happen?</td><td><Link to="/blog/ai-daily-workflow-solo-business">Lean content workflow</Link></td></tr>
      </tbody></table>
    </div>
  </section>
  <section className="ed-section ed-tools" aria-labelledby="working-tools">
    <div><p className="ed-label">Working tools</p><h2 id="working-tools">Check the job and the cost.</h2><p>Use the calculator to separate recurring cash from migration work. Use the stack guide when you need to decide what to keep or skip.</p></div>
    <ul><li><Link to="/tools/saas-calculator">Software stack audit calculator</Link></li><li><Link to="/uses">Lean solo-business stack guide</Link></li><li><Link to="/tools">Free planning tools</Link></li><li><Link to="/reviews">View all reviews</Link></li><li><Link to="/blog">All articles</Link></li></ul>
  </section>
  <LeanStackFinder />
      {/* Newsletter */}
      <section id="newsletter" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-callout pointer-events-none" aria-hidden />
        <div className="relative max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-mono text-ink mb-4">The Weekly Edge — Every Thursday</h2>
          <p className="text-secondary mb-10 leading-relaxed">
            One AI tool worth knowing. One practical workflow tip. One useful insight for building alone.
            No sponsors. No fluff. Free forever.
          </p>
          <p className="text-sm text-secondary mb-6">See the kind of advice I cover: <Link to="/blog/ai-daily-workflow-solo-business" className="text-link underline">read the solo-business workflow guide</Link>.</p>
          <ConvertKitForm
            className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto mb-6"
            inputClassName="flex-grow bg-brand-surface border border-line px-5 py-4 text-ink rounded-xl focus:outline-none focus:border-brand-cyan transition-colors font-sans text-sm"
            buttonClassName="bg-action text-brand-bg px-8 py-4 font-bold rounded-xl hover:bg-action-hover transition-colors whitespace-nowrap"
            buttonText="Subscribe"
            placeholder="you@example.com"
          />
          <div className="flex flex-wrap justify-center gap-6 text-xs font-mono text-subtle">
            <span className="flex items-center gap-1">
              <CheckCircle2 size={14} className="text-link" /> Every Thursday
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 size={14} className="text-link" /> Commercial links disclosed
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 size={14} className="text-link" /> Free forever
            </span>
          </div>
        </div>
      </section>

</main>;
