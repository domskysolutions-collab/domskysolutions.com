
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, CheckCircle2, Layers, Loader2, Sparkles, TrendingDown, Zap } from 'lucide-react';
import { ConvertKitForm } from '../components/ConvertKitForm';
import { StarRating } from '../components/StarRating';

const IMAGE_PROMPT_SYSTEM = `You are an expert AI image prompt engineer.
The user will give you a basic image idea.
Return exactly 3 enhanced prompt variants.
Each variant must use a completely different artistic style (e.g. risograph, brutalist poster, cinematic film still, editorial illustration, lo-fi zine, 1970s vintage ad, ink woodblock print, neon noir, flat vector, etc).
Make each prompt rich, specific, and detailed so the output looks nothing like a generic AI image.
Respond ONLY with valid JSON in this exact format with no markdown or backticks:
{
  "variants": [
    { "style": "Style Name", "prompt": "Full prompt here" },
    { "style": "Style Name", "prompt": "Full prompt here" },
    { "style": "Style Name", "prompt": "Full prompt here" }
  ]
}`;

type PromptVariant = { style: string; prompt: string };

function parsePromptVariants(text: string): PromptVariant[] | null {
  let cleaned = text.trim();
  if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```(?:json)?\n?/i, '').replace(/\n?```$/i, '').trim();
  }
  try {
    const parsed = JSON.parse(cleaned) as { variants?: PromptVariant[] };
    if (!Array.isArray(parsed.variants)) return null;
    const variants = parsed.variants.filter((v) => v.style && v.prompt);
    return variants.length > 0 ? variants : null;
  } catch {
    return null;
  }
}

export const HomePage = () => {
  const [idea, setIdea] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [variants, setVariants] = useState<PromptVariant[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  useEffect(() => {
    document.title = 'Domsky Solutions — Honest AI Tool Reviews for Solopreneurs';
  }, []);

  const handleEnhance = async () => {
    const trimmed = idea.trim();
    if (!trimmed || loading) return;

    setLoading(true);
    setError(null);
    setVariants([]);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          messages: [
            {
              role: 'user',
              content: `${IMAGE_PROMPT_SYSTEM}\n\nUser's image idea: ${trimmed}`,
            },
          ],
        }),
      });

      const data = (await response.json()) as {
        content?: Array<{ type?: string; text?: string }>;
      };

      if (!response.ok) {
        setError('Something went wrong. Please try again.');
        return;
      }

      const text = (data.content ?? []).map((block) => block.text ?? '').join('');
      const parsed = parsePromptVariants(text);
      if (!parsed) {
        setError('Something went wrong. Please try again.');
        return;
      }
      setVariants(parsed);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async (prompt: string, index: number) => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopiedIndex(index);
      window.setTimeout(() => setCopiedIndex(null), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <main className="bg-brand-bg min-h-screen">
      {/* Hero */}
      <section
        className="relative px-4 sm:px-6 lg:px-8 overflow-hidden"
        style={{ paddingTop: 100, paddingBottom: 100 }}
      >
        <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" aria-hidden />
        <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[min(90vw,720px)] h-48 bg-brand-cyan/10 blur-[80px] rounded-full pointer-events-none" aria-hidden />

        <div className="relative max-w-4xl mx-auto text-center">
          <style>{`
            @keyframes expandLine {
              from { width: 0%; }
              to { width: 100%; }
            }
          `}</style>
          <p className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-cyan/25 bg-brand-cyan/5 text-brand-cyan text-xs font-mono mb-8">
            <Sparkles className="w-3.5 h-3.5" aria-hidden />
            <span className="block sm:inline">25 years in tech ·</span>{' '}
            <span className="block sm:inline">6 tools reviewed ·</span>{' '}
            <span className="block sm:inline">$913/month saved</span>
          </p>

          <div className="mx-auto" style={{ maxWidth: 800 }}>
            <div
              className="font-mono mb-6"
              style={{
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                fontSize: 14,
                color: '#F97316',
                fontWeight: 500,
              }}
            >
              THE NO-HYPE VERDICT ON EVERY TOOL YOU&apos;RE CONSIDERING
            </div>

            <h1
              className="font-mono text-white mb-10"
              style={{
                fontSize: 'clamp(52px, 8vw, 96px)',
                fontWeight: 900,
                lineHeight: 1.05,
                textShadow: '0 0 80px rgba(249, 115, 22, 0.18)',
              }}
            >
              <span style={{ display: 'block' }}>
                Stop{' '}
                <span
                  style={{
                    background: 'linear-gradient(90deg, #F97316, #FB923C)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Overpaying
                </span>
                .
              </span>
              <span
                aria-hidden
                style={{
                  width: 0,
                  height: 3,
                  background: 'linear-gradient(90deg, #F97316, #FB923C)',
                  display: 'block',
                  animation: 'expandLine 1s ease forwards',
                  animationDelay: '0.4s',
                  margin: '12px auto 48px',
                }}
              />
            </h1>

            <div
              className="font-mono"
              style={{
                display: 'block',
                fontSize: 'clamp(22px, 3.5vw, 38px)',
                fontWeight: 400,
                color: '#D97706',
                marginTop: 12,
                marginBottom: 52,
                lineHeight: 1.5,
              }}
            >
              AI tools reviewed for solopreneurs who build alone.
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link
              to="/tools"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-brand-cyan text-[#000000] font-bold text-lg hover:bg-brand-amber transition-colors shadow-[0_0_28px_rgba(249,115,22,0.35)]"
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
          <p className="mx-auto mb-4" style={{ maxWidth: 800, fontSize: 13, color: '#A16207', fontStyle: 'italic' }}>
            I test every AI tool personally and tell you exactly what works, what does not, and what it costs. No
            sponsored verdicts. No hype. Just what actually matters for people building alone.
          </p>
          <p className="text-sm text-gray-500 font-mono mb-14">
            <span className="block sm:inline">6 tools reviewed in depth ·</span>{' '}
            <span className="block sm:inline">No sponsored content ·</span>{' '}
            <span className="block sm:inline">Built by Dominik —</span>{' '}
            <span className="block sm:inline">25yr tech veteran</span>
          </p>
          <div className="flex flex-wrap justify-center gap-5 mt-8">
            {[
              { value: '913/month', label: 'avg saving' },
              { value: '6+', label: 'tools reviewed' },
              { value: '100%', label: 'personally tested' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="text-center"
                style={{
                  background: 'rgba(249,115,22,0.06)',
                  border: '1px solid rgba(249,115,22,0.2)',
                  padding: '20px 28px',
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

      {/* AI Image Prompt Enhancer */}
      <section
        className="px-4 sm:px-6 lg:px-8 py-20 border-t border-gray-800"
        style={{ background: '#0D0F12' }}
        aria-labelledby="image-prompt-enhancer-heading"
      >
        <style>{`
          @keyframes promptCardFadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .prompt-variant-card {
            animation: promptCardFadeIn 0.45s ease forwards;
            opacity: 0;
          }
        `}</style>
        <div className="max-w-4xl mx-auto">
          <div className="text-xs font-mono uppercase tracking-wider mb-3" style={{ color: '#00F5D4' }}>
            AI Image Prompt Enhancer
          </div>
          <h2
            id="image-prompt-enhancer-heading"
            className="text-3xl md:text-4xl font-bold font-mono text-white mb-3"
          >
            Stop Making <span style={{ color: '#00F5D4' }}>Generic</span> AI Images
          </h2>
          <p className="text-gray-400 font-mono text-sm md:text-base mb-8 max-w-2xl">
            Paste your basic idea. Get 3 distinct, style-rich prompts instantly.
          </p>

          <div className="space-y-4">
            <textarea
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              rows={3}
              placeholder="e.g. a coffee shop at night"
              disabled={loading}
              className="w-full rounded-xl border border-gray-700 px-4 py-3 text-white placeholder:text-gray-500 font-sans text-sm resize-y focus:outline-none focus:ring-2 focus:border-[#00F5D4] disabled:opacity-60"
              style={{ background: '#0D0F12' }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#00F5D4';
                e.currentTarget.style.boxShadow = '0 0 0 2px rgba(0, 245, 212, 0.25)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = '';
                e.currentTarget.style.boxShadow = '';
              }}
            />

            <button
              type="button"
              onClick={handleEnhance}
              disabled={loading || !idea.trim()}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold font-mono text-sm transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ background: '#00F5D4', color: '#0D0F12' }}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" aria-hidden />
                  Generating...
                </>
              ) : (
                <>Enhance My Prompt →</>
              )}
            </button>
          </div>

          {error && (
            <div
              className="mt-8 rounded-xl border border-red-500/50 bg-red-950/20 px-5 py-4 text-red-300 text-sm font-mono"
              role="alert"
            >
              {error}
            </div>
          )}

          {variants.length > 0 && (
            <div className="mt-8 flex flex-col gap-4">
              {variants.map((variant, index) => (
                <div
                  key={`${variant.style}-${index}`}
                  className="prompt-variant-card rounded-xl border border-gray-800 p-5 md:p-6"
                  style={{
                    background: '#0D0F12',
                    animationDelay: `${index * 0.08}s`,
                  }}
                >
                  <div
                    className="text-xs font-mono uppercase tracking-widest mb-3"
                    style={{ color: '#F5A623' }}
                  >
                    {variant.style}
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed mb-4 whitespace-pre-wrap">{variant.prompt}</p>
                  <button
                    type="button"
                    onClick={() => handleCopy(variant.prompt, index)}
                    className="text-sm font-mono font-bold px-4 py-2 rounded-lg border border-gray-600 text-white hover:border-[#00F5D4] hover:text-[#00F5D4] transition-colors"
                  >
                    {copiedIndex === index ? 'Copied!' : 'Copy Prompt'}
                  </button>
                </div>
              ))}
            </div>
          )}
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
                    <div className="text-brand-amber font-bold font-mono text-sm">{card.rating}</div>
                    <div className="flex justify-end gap-1 mt-1">
                      <StarRating rating={Number.parseFloat(card.rating)} size={12} />
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
              { value: '$913', label: 'average monthly saving', color: '#F97316' },
              { value: '87%', label: 'average cost reduction', color: '#FB923C' },
              { value: '6+', label: 'tools reviewed in depth', color: '#F97316' },
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
                  background: 'rgba(249,115,22,0.1)',
                  color: '#F97316',
                  border: '1px solid rgba(249,115,22,0.2)',
                },
                title: 'I Replaced My Entire $500/Month SaaS Stack With AI Tools',
                excerpt: 'Every tool. Every saving. Real numbers, no fluff.',
                readTime: '8 min read',
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
            Why 913 saved readers trust domskysolutions.com
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: 'Personally tested',
                body: 'I use every tool I review in my actual daily workflow before writing a single word. No exceptions.',
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
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-brand-cyan text-[#000000] font-bold hover:bg-brand-amber transition-colors"
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
