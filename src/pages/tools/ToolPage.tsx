
import React, { useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { ArrowRight, Star, ExternalLink, Check, ChevronRight } from 'lucide-react';
import { toolReviews } from '../../data/toolReviews';
import { saasReviews } from '../../data/saasReviews';
import { ConvertKitForm } from '../../components/ConvertKitForm';

export const ToolPage = () => {
  const { slug, id } = useParams<{ slug?: string; id?: string }>();
  const toolKey = slug ?? id ?? '';
  const location = useLocation();
  const isReview = location.pathname.startsWith('/reviews');
  const tool = toolReviews[toolKey as keyof typeof toolReviews] as any;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [toolKey]);

  if (!tool) {
    return <div className="min-h-screen flex items-center justify-center pt-20"><h1 className="text-2xl font-mono">Tool not found</h1></div>;
  }

  return (
    <div className="pt-32 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen">
      <Link to={isReview ? "/#reviews" : "/#tools"} className="inline-flex items-center gap-2 text-brand-cyan hover:underline font-mono text-sm mb-8">
        <ArrowRight className="rotate-180" size={16} /> {isReview ? "Back to all reviews" : "Back to all tools"}
      </Link>
      
      <div className="bg-brand-surface border border-gray-800 p-8 md:p-12 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-cyan to-blue-500"></div>
        
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-gray-800 text-gray-300 text-xs font-mono uppercase tracking-wider">
                {tool.category}
              </span>
              {toolKey === 'claude' && (
                <span className="px-3 py-1 bg-brand-cyan/10 text-brand-cyan text-xs font-mono uppercase tracking-wider border border-brand-cyan/30">
                  UPDATED APRIL 2026
                </span>
              )}
              <div className="flex items-center gap-1 text-brand-amber text-sm font-mono">
                <Star size={16} fill="currentColor" /> {tool.rating}
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-mono mb-2">
              {toolKey === 'claude' ? 'Claude by Anthropic Review 2026' : tool.name}
            </h1>
            {toolKey === 'claude' ? (
              <p className="text-xl text-brand-cyan font-mono mb-2">Claude Opus 4.7 — The Most Capable AI Assistant Available</p>
            ) : null}
            {tool.tagline && <p className="text-xl text-brand-cyan font-mono mb-4">"{tool.tagline}"</p>}
            {toolKey === 'claude' && (
              <div className="text-sm text-gray-500 font-mono">Last updated: April 2026</div>
            )}
          </div>
          <a href={tool.externalLink} target="_blank" rel="noopener noreferrer" className="bg-brand-cyan text-brand-bg px-6 py-3 font-bold hover:bg-teal-400 transition-all glow-cyan flex items-center justify-center gap-2 whitespace-nowrap">
            {tool.ctaPrimary || "Visit Website"} <ExternalLink size={18} />
          </a>
        </div>

        {toolKey === 'claude' && (
          <div className="bg-[#1a1a2e] border-l-4 border-brand-cyan p-6 mb-12">
            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
              <span>🛠️</span> Try our free Claude Prompt Builder
            </h3>
            <p className="text-gray-300 mb-4">
              Build perfect Claude prompts in seconds.
            </p>
            <Link to="/tools/prompt-builder" className="inline-flex items-center gap-2 text-brand-cyan font-bold hover:underline">
              → Open Prompt Builder
            </Link>
          </div>
        )}

        <div className="prose prose-invert max-w-none mb-12">
          {tool.heroDesc.map((p: string, i: number) => <p key={i} className="text-gray-300 text-lg leading-relaxed mb-4">{p}</p>)}
        </div>

        {toolKey === 'claude' && (
          <>
            <div className="mb-12">
              <h3 className="text-2xl font-bold font-mono mb-6 text-white border-b border-gray-800 pb-2">Model overview</h3>
              <div className="bg-brand-bg border border-gray-800 p-6">
                <p className="text-gray-300 text-lg leading-relaxed">
                  Claude Opus 4.7 launched April 16 2026 as Anthropic&apos;s most capable generally available model. It represents a
                  meaningful upgrade across coding, vision, and complex reasoning — while keeping the same pricing as its
                  predecessor.
                </p>
              </div>
            </div>

            <div className="mb-12">
              <h3 className="text-2xl font-bold font-mono mb-6 text-white border-b border-gray-800 pb-2">Key improvements over the previous version</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  {
                    title: 'Coding performance',
                    text:
                      '87.6% on SWE-bench Verified — up from 80.8% on Opus 4.6. 13% improvement on a 93-task coding benchmark.',
                  },
                  {
                    title: 'Vision upgrade',
                    text:
                      '98.5% visual accuracy — up from 54.5% on Opus 4.6. Supports images up to 3.75 megapixels — more than 3x the previous resolution limit.',
                  },
                  {
                    title: 'Self-verification',
                    text:
                      'Opus 4.7 verifies its own outputs before reporting back — writing tests and sanity checks automatically rather than declaring tasks complete without checking.',
                  },
                  {
                    title: 'Multi-session memory',
                    text:
                      'Better at reading, writing and reusing notes across sessions. For long-running tasks this removes the need to re-establish context at the start of every run.',
                  },
                  {
                    title: 'Task budgets',
                    text:
                      'New task budget feature lets you set token targets for agentic loops — the model sees a countdown and prioritises work accordingly.',
                  },
                  {
                    title: 'xhigh effort level',
                    text:
                      'New xhigh effort level between high and max — finer control over the quality-speed-cost tradeoff.',
                  },
                ].map((card) => (
                  <div key={card.title} className="bg-brand-bg border border-gray-800 p-6 hover:border-brand-cyan transition-colors">
                    <div className="text-sm font-mono uppercase tracking-wider text-brand-cyan mb-3">{card.title}</div>
                    <p className="text-gray-300 leading-relaxed">{card.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-12">
              <h3 className="text-2xl font-bold font-mono mb-6 text-white border-b border-gray-800 pb-2">Benchmarks</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { label: 'SWE-bench Verified', value: '87.6%' },
                  { label: 'GPQA Diamond', value: '94.2%' },
                  { label: 'Terminal-Bench 2.0', value: '69.4%' },
                  { label: 'Finance Agent', value: '64.4%' },
                  { label: 'Visual Acuity', value: '98.5%' },
                ].map((b) => (
                  <div key={b.label} className="bg-brand-bg border border-gray-800 p-6">
                    <div className="text-3xl font-bold font-mono text-brand-cyan mb-2">{b.value}</div>
                    <div className="text-sm font-mono text-gray-400 uppercase tracking-wider">{b.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        <div className="mb-12">
          <h3 className="text-2xl font-bold font-mono mb-6 text-white border-b border-gray-800 pb-2">Key Features</h3>
          <ul className="grid md:grid-cols-2 gap-4">
            {tool.features.map((f: string, i: number) => (
              <li key={i} className="flex items-start gap-3 text-gray-300 bg-brand-bg p-4 border border-gray-800">
                <CheckCircle2 size={20} className="text-brand-cyan shrink-0 mt-0.5" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-green-900/10 border border-green-900/30 p-6">
            <h3 className="text-xl font-bold font-mono mb-4 text-green-400">Pros</h3>
            <ul className="space-y-3">
              {tool.pros.map((p: string, i: number) => <li key={i} className="text-gray-300 flex items-start gap-3"><span className="text-green-500 font-bold">+</span> {p}</li>)}
            </ul>
          </div>
          <div className="bg-red-900/10 border border-red-900/30 p-6">
            <h3 className="text-xl font-bold font-mono mb-4 text-red-400">Cons</h3>
            <ul className="space-y-3">
              {tool.cons.map((c: string, i: number) => <li key={i} className="text-gray-300 flex items-start gap-3"><span className="text-red-500 font-bold">-</span> {c}</li>)}
            </ul>
          </div>
        </div>

        <div className="mb-12">
          <h3 className="text-2xl font-bold font-mono mb-6 text-white border-b border-gray-800 pb-2">Pricing</h3>
          {tool.pricingCards ? (
            <div className="grid md:grid-cols-2 gap-4">
              {tool.pricingCards.map((card: any, i: number) => (
                <div key={i} className="bg-brand-bg border border-gray-800 p-6 hover:border-brand-cyan transition-colors">
                  <h4 className="text-lg font-bold font-mono text-white mb-1">{card.name}</h4>
                  <p className="text-brand-amber font-mono mb-4">{card.price}</p>
                  <ul className="space-y-2 mb-4">
                    {card.features.map((f: string, j: number) => (
                      <li key={j} className="text-gray-400 text-sm flex items-start gap-2">
                        <span className="text-brand-cyan mt-0.5">•</span> {f}
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-gray-500 border-t border-gray-800 pt-4 mt-auto">
                    <span className="font-bold text-gray-400">Perfect for:</span> {card.perfectFor}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 bg-brand-bg p-4 border border-gray-800 font-mono text-sm">{tool.pricing}</p>
          )}
        </div>

        {tool.bestFor && (
          <div className="mb-12">
            <h3 className="text-2xl font-bold font-mono mb-6 text-white border-b border-gray-800 pb-2">Who is it best for?</h3>
            <div className="prose prose-invert max-w-none">
              {tool.bestFor.map((p: string, i: number) => <p key={i} className="text-gray-300 text-lg leading-relaxed mb-4">{p}</p>)}
            </div>
          </div>
        )}

        <div className="bg-brand-bg border border-gray-800 p-8 text-center mb-12">
          <h3 className="text-2xl font-bold font-mono mb-6 text-white">Final Verdict</h3>
          <div className="text-gray-300 text-lg italic leading-relaxed mb-6">
            {tool.verdict.split('\n\n').map((p: string, i: number) => <p key={i} className="mb-4 last:mb-0">"{p}"</p>)}
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 mt-6 pt-6 border-t border-gray-800">
            <div className="text-sm">
              <span className="text-gray-500 font-mono">Score:</span> <span className="text-brand-amber font-bold">{tool.rating}/{isReview ? '10' : '5'}</span>
            </div>
            {tool.bestForTags && (
              <div className="text-sm">
                <span className="text-gray-500 font-mono">Best For:</span> <span className="text-brand-cyan">{tool.bestForTags}</span>
              </div>
            )}
            {tool.pricingSummary && (
              <div className="text-sm">
                <span className="text-gray-500 font-mono">Pricing:</span> <span className="text-brand-amber">{tool.pricingSummary}</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <a href={tool.externalLink} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto bg-brand-cyan text-brand-bg px-8 py-4 font-bold text-lg hover:bg-teal-400 transition-all glow-cyan flex items-center justify-center gap-2">
            {tool.ctaPrimary || "Visit Website"} <ExternalLink size={20} />
          </a>
          <Link to={isReview ? "/#reviews" : "/#tools"} className="w-full sm:w-auto bg-transparent border border-gray-600 text-white px-8 py-4 font-bold text-lg hover:border-white hover:bg-brand-surface transition-all flex items-center justify-center gap-2">
            <ArrowRight className="rotate-180" size={20} /> {isReview ? "Back to all reviews" : "Back to all tools"}
          </Link>
        </div>
      </div>
    </div>
  );
};
