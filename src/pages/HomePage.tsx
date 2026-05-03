
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Layers, Sparkles, Zap } from 'lucide-react';
import { ConvertKitForm } from '../components/ConvertKitForm';

export const HomePage = () => {
  useEffect(() => {
    document.title = 'Domsky Solutions — AI workspace for creators & founders';
  }, []);

  return (
    <main className="bg-brand-bg min-h-screen">
      {/* Hero */}
      <section className="relative pt-28 pb-16 md:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" aria-hidden />
        <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[min(90vw,720px)] h-48 bg-brand-cyan/10 blur-[80px] rounded-full pointer-events-none" aria-hidden />

        <div className="relative max-w-4xl mx-auto text-center">
          <p className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-cyan/25 bg-brand-cyan/5 text-brand-cyan text-xs font-mono mb-6">
            <Sparkles className="w-3.5 h-3.5" aria-hidden />
            Domsky Solutions · AI workspace
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-mono text-white leading-tight mb-6">
            Generate content and marketing assets{' '}
            <span className="text-brand-cyan">without losing your afternoon</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            An AI workspace for creators, founders, and solopreneurs — hooks, emails, outlines, and ideas in one flow.
            Still honest reviews and picks; now with tools that ship output, not just opinions.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <Link
              to="/tools"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-brand-cyan text-brand-bg font-bold text-lg hover:bg-[#33fcd9] transition-colors shadow-[0_0_28px_rgba(0,245,212,0.3)]"
            >
              Start for free <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/tools"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-gray-600 text-white font-bold text-lg hover:border-brand-cyan hover:bg-brand-surface transition-colors"
            >
              Explore tools
            </Link>
          </div>
          <p className="text-sm text-gray-500 font-mono">
            No account needed to try your first generations · Same Domsky standards — practical, not hype.
          </p>
        </div>
      </section>

      {/* Featured tools */}
      <section id="tools" className="py-16 md:py-24 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold font-mono text-white mb-2">Featured tools</h2>
              <p className="text-gray-400">Built for solopreneurs — free to try, no account needed.</p>
            </div>
            <Link
              to="/tools"
              className="inline-flex items-center gap-2 text-brand-cyan font-bold font-mono text-sm hover:underline shrink-0"
            >
              View all tools <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              to="/tools/email-writer"
              className="group flex flex-col rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1"
              style={{
                background: '#1a1a2e',
                borderColor: 'rgba(0,245,212,0.2)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#00F5D4';
                e.currentTarget.style.boxShadow = '0 0 30px rgba(0,245,212,0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(0,245,212,0.2)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                  style={{
                    background: 'rgba(0,245,212,0.1)',
                    border: '1px solid rgba(0,245,212,0.2)',
                  }}
                >
                  ✍️
                </div>
                <span
                  className="text-xs font-mono px-2 py-1 rounded-full"
                  style={{
                    background: 'rgba(0,245,212,0.1)',
                    color: '#00F5D4',
                    border: '1px solid rgba(0,245,212,0.2)',
                  }}
                >
                  FREE
                </span>
              </div>
              <h3 className="font-bold font-mono text-lg text-white mb-2 group-hover:text-brand-cyan transition-colors">
                AI Email Writer
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-5 flex-1">
                Write professional client emails, follow-ups, invoice reminders and proposals in 30 seconds. No more
                staring at a blank screen.
              </p>
              <ul className="space-y-1.5 mb-6">
                {['Client follow-ups', 'Invoice reminders', 'Cold outreach', 'Project proposals'].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-xs text-gray-500">
                    <span style={{ color: '#00F5D4' }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex items-center gap-2 text-brand-cyan text-sm font-bold font-mono mt-auto group-hover:gap-3 transition-all">
                Try free
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>

            <Link
              to="/tools/tool-description"
              className="group flex flex-col rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1"
              style={{
                background: '#1a1a2e',
                borderColor: 'rgba(245,166,35,0.2)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#F5A623';
                e.currentTarget.style.boxShadow = '0 0 30px rgba(245,166,35,0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(245,166,35,0.2)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                  style={{
                    background: 'rgba(245,166,35,0.1)',
                    border: '1px solid rgba(245,166,35,0.2)',
                  }}
                >
                  🛠️
                </div>
                <span
                  className="text-xs font-mono px-2 py-1 rounded-full"
                  style={{
                    background: 'rgba(245,166,35,0.1)',
                    color: '#F5A623',
                    border: '1px solid rgba(245,166,35,0.2)',
                  }}
                >
                  FREE
                </span>
              </div>
              <h3 className="font-bold font-mono text-lg text-white mb-2 group-hover:text-brand-amber transition-colors">
                Tool Description Generator
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-5 flex-1">
                Generate compelling descriptions for any AI tool or SaaS product. One-liners, landing page copy, social
                bios — all in seconds.
              </p>
              <ul className="space-y-1.5 mb-6">
                {['Product one-liners', 'Landing page copy', 'Social media bios', 'App store descriptions'].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-xs text-gray-500">
                    <span style={{ color: '#F5A623' }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex items-center gap-2 text-brand-amber text-sm font-bold font-mono mt-auto group-hover:gap-3 transition-all">
                Try free
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>

            <Link
              to="/tools/cost-audit"
              className="group flex flex-col rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1"
              style={{
                background: '#1a1a2e',
                borderColor: 'rgba(74,222,128,0.2)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#4ADE80';
                e.currentTarget.style.boxShadow = '0 0 30px rgba(74,222,128,0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(74,222,128,0.2)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                  style={{
                    background: 'rgba(74,222,128,0.1)',
                    border: '1px solid rgba(74,222,128,0.2)',
                  }}
                >
                  💰
                </div>
                <span
                  className="text-xs font-mono px-2 py-1 rounded-full"
                  style={{
                    background: 'rgba(74,222,128,0.1)',
                    color: '#4ADE80',
                    border: '1px solid rgba(74,222,128,0.2)',
                  }}
                >
                  FREE
                </span>
              </div>
              <h3 className="font-bold font-mono text-lg text-white mb-2 group-hover:text-green-400 transition-colors">
                SaaS Cost Audit
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-5 flex-1">
                Enter your current software stack. Get an AI-powered audit with exact alternatives and how much you could
                save every single month.
              </p>
              <ul className="space-y-1.5 mb-6">
                {['Full stack analysis', 'AI alternatives matched', 'Monthly savings calculated', 'Switch plan generated'].map(
                  (item) => (
                    <li key={item} className="flex items-center gap-2 text-xs text-gray-500">
                      <span style={{ color: '#4ADE80' }}>✓</span>
                      {item}
                    </li>
                  )
                )}
              </ul>
              <div className="flex items-center gap-2 text-green-400 text-sm font-bold font-mono mt-auto group-hover:gap-3 transition-all">
                Try free
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 md:py-24 bg-brand-surface border-y border-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold font-mono text-white text-center mb-12">How it works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-xl border border-gray-800 bg-brand-bg p-8 text-center">
              <div className="w-12 h-12 rounded-lg bg-brand-cyan/10 border border-brand-cyan/30 flex items-center justify-center mx-auto mb-4">
                <Layers className="w-6 h-6 text-brand-cyan" />
              </div>
              <h3 className="font-bold font-mono text-lg text-white mb-2">1. Choose a tool</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Browse by category — social, marketing, business ideas, productivity.
              </p>
            </div>
            <div className="rounded-xl border border-gray-800 bg-brand-bg p-8 text-center">
              <div className="w-12 h-12 rounded-lg bg-brand-cyan/10 border border-brand-cyan/30 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-brand-cyan" />
              </div>
              <h3 className="font-bold font-mono text-lg text-white mb-2">2. Add your inputs</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Short prompts — tuned fields so you get usable drafts, not generic filler.
              </p>
            </div>
            <div className="rounded-xl border border-gray-800 bg-brand-bg p-8 text-center">
              <div className="w-12 h-12 rounded-lg bg-brand-cyan/10 border border-brand-cyan/30 flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-brand-cyan" />
              </div>
              <h3 className="font-bold font-mono text-lg text-white mb-2">3. Copy & ship</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Copy output, iterate, or jump to a related tool — workspace features arrive next.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold font-mono text-white text-center mb-12">Why use this workspace</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: 'Built for speed',
                body: 'One library, consistent UX — move from hooks to emails without tab overload.',
              },
              {
                title: 'Honest positioning',
                body: 'Domsky Solutions stays review-led; generators are practical drafts you still edit.',
              },
              {
                title: 'Room to grow',
                body: 'Accounts, saved history, and Pro limits ship in Phase 2 — today, focus on output quality.',
              },
              {
                title: 'Mobile-friendly',
                body: 'Generate on your phone between meetings; copy straight into your stack.',
              },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-gray-800 bg-brand-surface p-6 flex gap-4">
                <CheckCircle2 className="w-6 h-6 text-brand-cyan shrink-0 mt-0.5" aria-hidden />
                <div>
                  <h3 className="font-bold font-mono text-white mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing teaser */}
      <section className="py-16 md:py-24 bg-brand-surface border-y border-gray-800 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold font-mono text-white text-center mb-4">Simple pricing later</h2>
          <p className="text-center text-gray-400 mb-12 max-w-xl mx-auto">
            Start free today. When billing launches, expect a straight €9–€12/mo Pro tier with higher limits and premium
            tools.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-xl border border-gray-700 bg-brand-bg p-8">
              <h3 className="font-bold font-mono text-xl text-white mb-2">Free</h3>
              <p className="text-3xl font-bold text-brand-cyan mb-6">€0</p>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-brand-cyan shrink-0 mt-0.5" /> Generous trial generations</li>
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-brand-cyan shrink-0 mt-0.5" /> Core tools library</li>
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-brand-cyan shrink-0 mt-0.5" /> Honest reviews & blog</li>
              </ul>
            </div>
            <div className="rounded-xl border border-brand-cyan/40 bg-brand-bg p-8 relative overflow-hidden">
              <span className="absolute top-4 right-4 text-[10px] font-bold uppercase tracking-wider text-brand-bg bg-brand-amber px-2 py-1 rounded">
                Soon
              </span>
              <h3 className="font-bold font-mono text-xl text-white mb-2">Pro</h3>
              <p className="text-3xl font-bold text-brand-amber mb-6">€9–12<span className="text-lg text-gray-500 font-normal">/mo</span></p>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-brand-amber shrink-0 mt-0.5" /> Higher or unlimited generations</li>
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-brand-amber shrink-0 mt-0.5" /> Premium tools & saved history</li>
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-brand-amber shrink-0 mt-0.5" /> Export-focused workflow</li>
              </ul>
            </div>
          </div>
          <p className="text-center text-xs text-gray-500 font-mono mt-8">
            Newsletter subscribers still get weekly picks —{' '}
            <Link to="/reviews" className="text-brand-cyan hover:underline">
              read reviews
            </Link>{' '}
            anytime.
          </p>
        </div>
      </section>

      {/* Email capture */}
      <section id="newsletter" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-brand-cyan/5 pointer-events-none" aria-hidden />
        <div className="relative max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-mono text-white mb-4">Get weekly AI picks in your inbox</h2>
          <p className="text-gray-400 mb-10 leading-relaxed">
            Same newsletter Domsky readers trust — tools worth testing, plus updates when the workspace adds accounts and
            Pro.
          </p>
          <ConvertKitForm
            className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto mb-6"
            inputClassName="flex-grow bg-brand-surface border border-gray-700 px-5 py-4 text-white rounded-xl focus:outline-none focus:border-brand-cyan transition-colors font-sans text-sm"
            buttonClassName="bg-brand-amber text-brand-bg px-8 py-4 font-bold rounded-xl hover:bg-yellow-400 transition-colors whitespace-nowrap"
            buttonText="Subscribe"
            placeholder="you@example.com"
          />
          <div className="flex flex-wrap justify-center gap-6 text-xs font-mono text-gray-500">
            <span className="flex items-center gap-1"><CheckCircle2 size={14} className="text-brand-cyan" /> No spam</span>
            <span className="flex items-center gap-1"><CheckCircle2 size={14} className="text-brand-cyan" /> Unsubscribe anytime</span>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 border-t border-gray-800 text-center px-4">
        <h2 className="text-2xl md:text-3xl font-bold font-mono text-white mb-6">Ready to generate?</h2>
        <Link
          to="/tools"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-brand-cyan text-brand-bg font-bold hover:bg-[#33fcd9] transition-colors"
        >
          Open the tools library <ArrowRight className="w-5 h-5" />
        </Link>
      </section>
    </main>
  );
};
