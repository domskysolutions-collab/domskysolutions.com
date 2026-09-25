import { LeanStackFinder } from '../components/LeanStackFinder';

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, CheckCircle2, TrendingDown } from 'lucide-react';
import { ConvertKitForm } from '../components/ConvertKitForm';
import { reviewCount, reviewCatalog } from '../data/reviewCatalog';
import { StarRating } from '../components/StarRating';

export const HomePage = () => {
  return (
    <main className="bg-brand-bg min-h-screen">
      {/* Hero */}
      <section aria-labelledby="hero-title" className="relative overflow-hidden px-5 sm:px-8 pt-32 pb-16 sm:pt-40 sm:pb-24">
        <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" aria-hidden="true" />
        <div className="relative max-w-5xl mx-auto text-center">
          <p className="text-brand-amber text-xs sm:text-sm font-mono tracking-widest uppercase mb-6">
            AI &amp; SaaS guidance for solo founders and small teams
          </p>
          <h1 id="hero-title" className="text-white mx-auto mb-6" style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(2.5rem, 6.5vw, 5.25rem)',
            fontWeight: 800,
            letterSpacing: '-0.045em',
            lineHeight: 1.08,
            textWrap: 'balance',
          }}>
            Choose better tools.{' '}
            <span className="block text-brand-cyan">Build a better business.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-base sm:text-xl text-gray-300 leading-relaxed mb-8">
            Find the AI and SaaS tools that fit your work. Practical reviews and comparisons
            help you choose what to use, what to skip, and where to spend your budget.
          </p>
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-3 mb-10 text-sm text-gray-300">
            {['Create better content', 'Simplify repetitive work', 'Build and launch products'].map(benefit => (
              <li key={benefit} className="inline-flex items-center gap-2">
                <CheckCircle2 size={16} className="text-brand-cyan shrink-0" aria-hidden="true" />{benefit}
              </li>
            ))}
          </ul>
<a href="#stack-finder" className="inline-flex items-center gap-3 bg-brand-cyan text-brand-bg px-6 py-4 rounded-lg font-bold">Find my lean tool stack <ArrowRight size={18} aria-hidden="true" /></a>
          <p className="mt-6 text-sm text-gray-400 leading-relaxed">
            {reviewCount} published reviews. Clear strengths and limitations.{' '}
            <Link to="/methodology" className="text-brand-amber underline underline-offset-4 hover:text-white">See how I review tools</Link>.
          </p>
        </div>
      </section>

      <LeanStackFinder />

      {/* Featured reviews */}
      <section className="py-16 md:py-24 bg-brand-surface border-y border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <div>
              <div className="text-xs font-mono text-brand-cyan uppercase tracking-wider mb-2">INDEPENDENT REVIEWS</div>
              <h2 className="text-3xl md:text-4xl font-bold font-mono text-white">Popular Reviews & Comparisons</h2>
              <p className="text-gray-400 mt-2 max-w-2xl">
                See the features, pricing, limitations, and best-fit use cases that matter when you are choosing software.
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
                to: '/reviews/claude',
              },
              {
                emoji: '💻',
                rating: '4.8/5',
                title: 'Cursor',
                category: 'AI Code Editor',
                verdict: 'Build and fix websites without being a developer.',
                price: 'From $20/month',
                to: '/reviews/cursor',
              },
              {
                emoji: '🔍',
                rating: '4.7/5',
                title: 'Perplexity AI',
                category: 'AI Research',
                verdict: 'Replace 90 minutes of research with 3 questions.',
                price: 'Free / $20/month',
                to: '/reviews/perplexity',
              },
            ].map((card) => (
              <Link
                key={card.title}
                to={card.to}
                className="group"
                style={{
                  background: '#0F0A05',
                  border: '1px solid rgba(249,115,22,0.14)',
                  borderRadius: 16,
                  padding: 24,
                  display: 'flex',
                  flexDirection: 'column',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(249,115,22,0.28)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(249,115,22,0.14)';
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-3xl leading-none">{card.emoji}</div>
                  <div className="text-right">
                    <div className="text-brand-amber font-bold font-mono text-sm">{reviewCatalog.find(r => r.link === card.to)?.rating}/5</div>
                    <div className="flex justify-end gap-1 mt-1">
                      <StarRating rating={reviewCatalog.find(r => r.link === card.to)?.rating || 0} size={12} />
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

      {/* Best tools for */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10"><div className="text-xs font-mono text-brand-cyan uppercase tracking-wider mb-2">CHOOSE BY OUTCOME</div><h2 className="text-3xl md:text-4xl font-bold font-mono text-white">Best tools for...</h2><p className="text-gray-400 mt-2">Start with the job you need to get done.</p></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[['Lean software stack','Keep useful tools, fill one measured gap and skip the rest.','/uses'],['AI & automation','Automate repetitive work and move faster.','/tools/stack-recommender'],['Marketing & growth','Build content, email and lead systems.','/tools/content-calendar'],['Websites & online business','Launch and improve your online presence.','/tools']].map(([title,body,to]) => <Link key={title} to={to} className="rounded-xl border border-brand-border bg-brand-surface p-5 hover:border-brand-cyan transition-colors"><h3 className="font-bold font-mono text-white mb-2">{title}</h3><p className="text-gray-400 text-sm mb-4">{body}</p><span className="text-brand-cyan text-xs font-mono font-bold">Find the right tools →</span></Link>)}
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="py-16 md:py-24 bg-brand-surface border-y border-gray-800 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto"><div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10"><div><div className="text-xs font-mono text-brand-amber uppercase tracking-wider mb-2">COMPARE BEFORE YOU PAY</div><h2 className="text-3xl md:text-4xl font-bold font-mono text-white">Popular tool comparisons</h2><p className="text-gray-400 mt-2">A quick starting point before you read the full hands-on review.</p><p className="text-sm text-gray-300 mt-4">Choosing your primary AI tool? <Link to="/comparisons/claude-vs-chatgpt-vs-gemini-2026" className="text-brand-cyan underline underline-offset-4">Choose one AI assistant</Link> by tasks, limits, integrations and total value.</p><p className="text-sm text-gray-300 mt-2">Making a small website change? <Link to="/comparisons/chatgpt-astra-vs-alternatives" className="text-brand-cyan underline underline-offset-4">Compare Codex and Claude Code</Link> for a supervised repository workflow.</p></div><Link to="/comparisons" className="text-brand-cyan font-mono text-sm">Compare all tools →</Link></div><div className="overflow-x-auto rounded-xl border border-gray-800"><table className="w-full text-left text-sm"><thead className="bg-brand-bg"><tr><th className="p-4 text-gray-400 font-mono">Tool</th><th className="p-4 text-gray-400 font-mono">Best for</th><th className="p-4 text-gray-400 font-mono">Starting price</th><th className="p-4"></th></tr></thead><tbody>{[['Claude','Writing and reasoning','Free / $20 mo','/reviews/claude'],['Perplexity','Research with sources','Free / $20 mo','/reviews/perplexity'],['Cursor','AI-assisted coding','Free / $20 mo','/reviews/cursor']].map(([tool,best,price,to])=><tr key={tool} className="border-t border-gray-800"><td className="p-4 text-white font-bold">{tool}</td><td className="p-4 text-gray-400">{best}</td><td className="p-4 text-gray-400">{price}</td><td className="p-4 text-right"><Link to={to} className="text-brand-cyan font-mono text-xs">Read review →</Link></td></tr>)}</tbody></table></div></div>
      </section>

      {/* Stats bar */}
      <section
        className="py-10"
        style={{
          background: '#1C0F05',
          borderTop: '1px solid rgba(249,115,22,0.14)',
          borderBottom: '1px solid rgba(249,115,22,0.14)',
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center gap-8 md:gap-16 flex-wrap">
            {[
              { value: 'Clear', label: 'limitations explained', color: '#F97316' },
              { value: 'Open', label: 'review methodology', color: '#FB923C' },
              { value: String(reviewCount), label: 'tools reviewed in depth', color: '#F97316' },
              { value: '0', label: 'sponsored reviews', color: '#4ADE80' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold font-mono" style={{ color: stat.color }}>
                  {stat.value}
                </div>
                <div className="text-xs text-gray-500 font-mono uppercase tracking-wider mt-1 inline-flex items-center gap-2 justify-center">
                  {stat.label}
                  {stat.label === 'average cost reduction' ? (
                    <TrendingDown className="w-3.5 h-3.5" style={{ color: '#FB923C' }} aria-hidden />
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
          <h2 className="text-3xl md:text-4xl font-bold font-mono text-white text-center mb-4">Spend Less Time Researching. More Time Building.</h2>
          <p className="text-gray-400 text-center mb-12">
            What makes this site different from every other AI tools review site
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-xl border border-gray-800 bg-brand-bg p-8 text-center relative overflow-hidden">
              <div className="absolute top-4 right-4 text-5xl font-bold font-mono text-brand-cyan opacity-30">01</div>
              <h3 className="font-bold font-mono text-lg text-white mb-2">1. I test the tools</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                I explain the strengths, limitations and practical fit of each tool. Read the methodology for the testing details currently documented.
              </p>
              <div className="text-xs text-brand-cyan font-mono"><Link to="/methodology" className="underline">Read the review methodology</Link></div>
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
                category: 'GUIDES',
                categoryStyle: {
                  background: 'rgba(249,115,22,0.1)',
                  color: '#F97316',
                  border: '1px solid rgba(249,115,22,0.2)',
                },
                title: 'Audit Your Software Stack: What to Keep, Cancel or Replace',
                excerpt: 'Map required jobs, test replacement coverage and calculate recurring cash honestly.',
                readTime: '13 min read',
                to: '/blog/replaced-saas-stack-with-ai-tools',
              },
              {
                category: 'AI NEWS',
                categoryStyle: {
                  background: 'rgba(249,115,22,0.1)',
                  color: '#F97316',
                  border: '1px solid rgba(249,115,22,0.2)',
                },
                title: '10 AI Tools That Will Make You Look Like a Team of 10',
                excerpt: 'The exact tools solo founders use to compete with full teams.',
                readTime: '9 min read',
                to: '/blog/ai-tools-look-like-team-of-10',
              },
              {
                category: 'BEGINNERS',
                categoryStyle: {
                  background: 'rgba(251,146,60,0.12)',
                  color: '#FB923C',
                  border: '1px solid rgba(251,146,60,0.22)',
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
                  background: '#1C0F05',
                  border: '1px solid rgba(249,115,22,0.14)',
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
            What to expect from Domsky Solutions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: 'Personal perspective',
                body: 'Reviews reflect my editorial perspective. The methodology explains which testing details are documented and which are still missing.',
                icon: '🔬',
                iconStyle: { background: 'rgba(249,115,22,0.12)' },
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
                iconStyle: { background: 'rgba(251,146,60,0.12)' },
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
            One AI tool worth knowing. One practical workflow tip. One useful insight for building alone.
            No sponsors. No fluff. Free forever.
          </p>
          <p className="text-sm text-gray-300 mb-6">See the kind of advice I cover: <Link to="/blog/ai-daily-workflow-solo-business" className="text-brand-cyan underline">read the solo-business workflow guide</Link>.</p>
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

    </main>
  );
};
