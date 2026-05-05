
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, CheckCircle2, Layers, Sparkles, Star, TrendingDown, Wrench, Zap } from 'lucide-react';
import { ConvertKitForm } from '../components/ConvertKitForm';

export const HomePage = () => {
  useEffect(() => {
    document.title = 'Domsky Solutions — Honest AI Tool Reviews for Solopreneurs';
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
            <span className="block sm:inline">25 years in tech ·</span>{' '}
            <span className="block sm:inline">6 tools reviewed ·</span>{' '}
            <span className="block sm:inline">$913/month saved</span>
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-mono text-white leading-tight mb-6">
            Honest AI Tool Reviews for <br className="hidden sm:block" />
            Solopreneurs Who Are Done <br className="hidden sm:block" />
            <span className="text-brand-cyan">Overpaying for Software</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            I test every AI tool personally and tell you exactly what works, what does not, and what it costs. No
            sponsored verdicts. No hype. Just what actually matters for people building alone.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <Link
              to="/tools"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-brand-cyan text-brand-bg font-bold text-lg hover:bg-[#33fcd9] transition-colors shadow-[0_0_28px_rgba(0,245,212,0.3)]"
            >
              Browse AI Tool Reviews <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/tools/email-writer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-gray-600 text-white font-bold text-lg hover:border-brand-cyan hover:bg-brand-surface transition-colors"
            >
              Try Free Tools
            </Link>
          </div>
          <p className="text-sm text-gray-500 font-mono">
            <span className="block sm:inline">6 tools reviewed in depth ·</span>{' '}
            <span className="block sm:inline">No sponsored content ·</span>{' '}
            <span className="block sm:inline">Built by Dominik —</span>{' '}
            <span className="block sm:inline">25yr tech veteran</span>
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {[
              { value: '913/month', label: 'avg saving' },
              { value: '6+', label: 'tools reviewed' },
              { value: '100%', label: 'personally tested' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="text-center"
                style={{
                  background: 'rgba(0,245,212,0.05)',
                  border: '1px solid rgba(0,245,212,0.15)',
                  padding: '12px 20px',
                  borderRadius: 12,
                }}
              >
                <div className="text-brand-cyan font-bold font-mono text-xl">{stat.value}</div>
                <div className="text-gray-500 text-xs font-mono uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured reviews */}
      <section className="py-16 md:py-24 bg-brand-surface border-y border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <div>
              <div className="text-xs font-mono text-brand-cyan uppercase tracking-wider mb-2">REVIEWED &amp; TESTED</div>
              <h2 className="text-3xl md:text-4xl font-bold font-mono text-white">AI Tools I Have Tested</h2>
              <p className="text-gray-400 mt-2 max-w-2xl">
                Every review is written after weeks of real daily use. Honest verdicts only.
              </p>
            </div>
            <Link to="/tools" className="inline-flex items-center gap-2 text-brand-cyan font-mono text-sm hover:underline shrink-0">
              View all reviews <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                emoji: '🤖',
                rating: '4.9/5',
                title: 'Claude by Anthropic',
                category: 'AI Assistant',
                verdict: 'The best AI assistant for writing, thinking and complex reasoning.',
                price: 'From $20/month',
                to: '/tools/claude',
              },
              {
                emoji: '💻',
                rating: '4.8/5',
                title: 'Cursor',
                category: 'AI Code Editor',
                verdict: 'Build and fix websites without being a developer.',
                price: 'From $20/month',
                to: '/tools/cursor',
              },
              {
                emoji: '🔍',
                rating: '4.7/5',
                title: 'Perplexity AI',
                category: 'AI Research',
                verdict: 'Replace 90 minutes of research with 3 questions.',
                price: 'Free / $20/month',
                to: '/tools/perplexity',
              },
            ].map((card) => (
              <Link
                key={card.title}
                to={card.to}
                className="group"
                style={{
                  background: '#0D0F12',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: 16,
                  padding: 24,
                  display: 'flex',
                  flexDirection: 'column',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(0,245,212,0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-3xl leading-none">{card.emoji}</div>
                  <div className="text-right">
                    <div className="text-brand-amber font-bold font-mono text-sm">{card.rating}</div>
                    <div className="flex justify-end gap-1 mt-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="w-3 h-3" style={{ color: '#F5A623' }} aria-hidden />
                      ))}
                    </div>
                  </div>
                </div>

                <h3 className="font-bold font-mono text-white text-lg mb-2">{card.title}</h3>

                <div className="mb-3">
                  <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20">
                    {card.category}
                  </span>
                </div>

                <p className="text-gray-400 text-sm mb-6">{card.verdict}</p>

                <div className="flex items-center justify-between mt-auto">
                  <div className="text-xs text-gray-500">{card.price}</div>
                  <div className="text-brand-cyan text-xs font-mono font-bold">Read Review →</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured tools */}
      <section id="tools" className="py-16 md:py-24 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <div>
              <div className="text-xs font-mono text-brand-amber uppercase tracking-wider mb-2 inline-flex items-center gap-2">
                <Wrench className="w-4 h-4" aria-hidden />
                FREE TO USE
              </div>
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

      {/* Stats bar */}
      <section
        className="py-10"
        style={{
          background: '#111318',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center gap-8 md:gap-16 flex-wrap">
            {[
              { value: '$913', label: 'average monthly saving', color: '#00F5D4' },
              { value: '87%', label: 'average cost reduction', color: '#F5A623' },
              { value: '6+', label: 'tools reviewed in depth', color: '#00F5D4' },
              { value: '0', label: 'sponsored reviews', color: '#4ADE80' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold font-mono" style={{ color: stat.color }}>
                  {stat.value}
                </div>
                <div className="text-xs text-gray-500 font-mono uppercase tracking-wider mt-1 inline-flex items-center gap-2 justify-center">
                  {stat.label}
                  {stat.label === 'average cost reduction' ? (
                    <TrendingDown className="w-3.5 h-3.5" style={{ color: '#F5A623' }} aria-hidden />
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 md:py-24 bg-brand-surface border-y border-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold font-mono text-white text-center mb-4">The Domsky Promise</h2>
          <p className="text-gray-400 text-center mb-12">
            What makes this site different from every other AI tools review site
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-xl border border-gray-800 bg-brand-bg p-8 text-center relative overflow-hidden">
              <div className="absolute top-4 right-4 text-5xl font-bold font-mono text-brand-cyan opacity-30">01</div>
              <h3 className="font-bold font-mono text-lg text-white mb-2">1. I test the tools</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                Every tool gets weeks of real daily use — not a quick demo. I pay for the subscriptions myself.
              </p>
              <div className="text-xs text-brand-cyan font-mono">Minimum 2 weeks per tool</div>
            </div>
            <div className="rounded-xl border border-gray-800 bg-brand-bg p-8 text-center relative overflow-hidden">
              <div className="absolute top-4 right-4 text-5xl font-bold font-mono text-brand-cyan opacity-30">02</div>
              <h3 className="font-bold font-mono text-lg text-white mb-2">2. I write the honest verdict</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                Real pricing. Real limitations. Real use cases. No paid placements or sponsored outcomes.
              </p>
              <div className="text-xs text-brand-cyan font-mono">Real pricing. Real limitations.</div>
            </div>
            <div className="rounded-xl border border-gray-800 bg-brand-bg p-8 text-center relative overflow-hidden">
              <div className="absolute top-4 right-4 text-5xl font-bold font-mono text-brand-cyan opacity-30">03</div>
              <h3 className="font-bold font-mono text-lg text-white mb-2">3. You save time and money</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                Skip the research. Use the free tools. Read the blog. Make better decisions faster.
              </p>
              <div className="text-xs text-brand-cyan font-mono">Skip months of research</div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest blog posts */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <div>
              <div className="text-xs font-mono text-brand-amber uppercase tracking-wider mb-2 inline-flex items-center gap-2">
                <BookOpen className="w-4 h-4" aria-hidden />
                FROM THE BLOG
              </div>
              <h2 className="text-3xl md:text-4xl font-bold font-mono text-white mb-2">Latest Insights</h2>
            </div>
            <Link to="/blog" className="inline-flex items-center gap-2 text-brand-cyan font-mono text-sm hover:underline shrink-0">
              Read all posts <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                category: 'AI NEWS',
                categoryStyle: {
                  background: 'rgba(0,245,212,0.1)',
                  color: '#00F5D4',
                  border: '1px solid rgba(0,245,212,0.2)',
                },
                title: 'I Replaced My Entire $500/Month SaaS Stack With AI Tools',
                excerpt: 'Every tool. Every saving. Real numbers, no fluff.',
                readTime: '8 min read',
                to: '/blog/replaced-saas-stack-with-ai-tools',
              },
              {
                category: 'AI NEWS',
                categoryStyle: {
                  background: 'rgba(0,245,212,0.1)',
                  color: '#00F5D4',
                  border: '1px solid rgba(0,245,212,0.2)',
                },
                title: '10 AI Tools That Will Make You Look Like a Team of 10',
                excerpt: 'The exact tools solo founders use to compete with full teams.',
                readTime: '9 min read',
                to: '/blog/ai-tools-look-like-team-of-10',
              },
              {
                category: 'BEGINNERS',
                categoryStyle: {
                  background: 'rgba(245,166,35,0.1)',
                  color: '#F5A623',
                  border: '1px solid rgba(245,166,35,0.2)',
                },
                title: "You Don't Need to Be Technical to Use AI — Start Here",
                excerpt: 'The honest beginner guide. No jargon. No assumptions.',
                readTime: '10 min read',
                to: '/blog/you-dont-need-to-be-technical-to-use-ai',
              },
            ].map((post) => (
              <Link
                key={post.to}
                to={post.to}
                className="group rounded-2xl transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: '#1a1a2e',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: 16,
                  padding: 24,
                }}
              >
                <div className="mb-4">
                  <span className="text-xs font-mono px-2 py-0.5 rounded-full" style={post.categoryStyle}>
                    {post.category}
                  </span>
                </div>
                <h3 className="font-bold font-mono text-white text-base leading-snug mb-2">{post.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="text-gray-600 text-xs">{post.readTime}</div>
                  <div className="text-brand-cyan text-xs font-mono font-bold">Read →</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold font-mono text-white text-center mb-12">
            Why 913 saved readers trust domskysolutions.com
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: 'Personally tested',
                body: 'I use every tool I review in my actual daily workflow before writing a single word. No exceptions.',
                icon: '🔬',
                iconStyle: { background: 'rgba(0,245,212,0.12)' },
              },
              {
                title: 'No sponsored content',
                body: 'Affiliate links are disclosed clearly. They never influence ratings or verdicts. If a tool is bad I say so.',
                icon: '🚫',
                iconStyle: { background: 'rgba(239,68,68,0.12)' },
              },
              {
                title: 'Built for one-person teams',
                body: 'Every review and tool is built for solopreneurs — not enterprise teams with IT departments and unlimited budgets.',
                icon: '👤',
                iconStyle: { background: 'rgba(245,166,35,0.12)' },
              },
              {
                title: 'Free tools that actually work',
                body: 'The free tools on this site solve real solopreneur problems — built from the same daily frustrations you have.',
                icon: '🛠️',
                iconStyle: { background: 'rgba(74,222,128,0.12)' },
              },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-gray-800 bg-brand-surface p-6 flex gap-4">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-xl mr-4 shrink-0"
                  style={item.iconStyle}
                  aria-hidden
                >
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-bold font-mono text-white mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section id="newsletter" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-brand-cyan/5 pointer-events-none" aria-hidden />
        <div className="relative max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-mono text-white mb-4">The Weekly Edge — Every Thursday</h2>
          <p className="text-gray-400 mb-10 leading-relaxed">
            One AI tool worth knowing. One workflow tip that saves real time. One insight the algorithm won't show you.
            No sponsors. No fluff. Free forever.
          </p>
          <ConvertKitForm
            className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto mb-6"
            inputClassName="flex-grow bg-brand-surface border border-gray-700 px-5 py-4 text-white rounded-xl focus:outline-none focus:border-brand-cyan transition-colors font-sans text-sm"
            buttonClassName="bg-brand-amber text-brand-bg px-8 py-4 font-bold rounded-xl hover:bg-yellow-400 transition-colors whitespace-nowrap"
            buttonText="Subscribe"
            placeholder="you@example.com"
          />
          <div className="flex flex-wrap justify-center gap-6 text-xs font-mono text-gray-500">
            <span className="flex items-center gap-1">
              <CheckCircle2 size={14} className="text-brand-cyan" /> Every Thursday
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 size={14} className="text-brand-cyan" /> No sponsored content
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 size={14} className="text-brand-cyan" /> Free forever
            </span>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 border-t border-gray-800 text-center px-4">
        <h2 className="text-2xl md:text-3xl font-bold font-mono text-white mb-6">Start saving money on software today</h2>
        <Link
          to="/tools"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-brand-cyan text-brand-bg font-bold hover:bg-[#33fcd9] transition-colors"
        >
          Browse AI Tool Reviews <ArrowRight className="w-5 h-5" />
        </Link>
        <div className="text-gray-500 text-sm mt-4">
          Or try a free tool —{' '}
          <Link to="/tools/email-writer" className="text-brand-cyan hover:underline">
            no account required
          </Link>
        </div>
      </section>
    </main>
  );
};
