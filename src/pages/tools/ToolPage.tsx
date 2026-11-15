
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { toolReviews } from '../../data/toolReviews';
import { ReviewEvidence } from '../../components/ReviewEvidence';
import { NotFoundPage } from '../NotFoundPage';

export const ToolPage = () => {
  const { slug, id } = useParams<{ slug?: string; id?: string }>();
  const toolKey = slug ?? id ?? '';
  const tool = toolReviews[toolKey as keyof typeof toolReviews] as any;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [toolKey]);

  if (!tool) {
    return <NotFoundPage />;
  }

  return (
    <div className="pt-32 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen">
      <Link to="/reviews" className="inline-flex items-center gap-2 text-link hover:underline font-mono text-sm mb-8">
        <ArrowRight className="rotate-180" size={16} /> Back to all reviews
      </Link>
      
      <div className="bg-brand-surface border border-line p-5 sm:p-8 md:p-12 relative overflow-hidden">
        
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6 mb-8">
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-surface text-secondary text-xs font-mono uppercase tracking-wider">
                {tool.category}
              </span>
              {toolKey === 'claude' && (
                <span className="px-3 py-1 bg-callout text-link text-xs font-mono uppercase tracking-wider border border-brand-cyan">
                  UPDATED APRIL 2026
                </span>
              )}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-mono mb-2">
              {toolKey === 'claude' ? 'Claude by Anthropic Review 2026' : tool.name}
            </h1>
            {toolKey === 'claude' ? (
              <p className="text-xl text-link font-mono mb-2">Claude Opus 4.7 — Writing, Coding and Reasoning</p>
            ) : null}
            {tool.tagline && <p className="text-xl text-link font-mono mb-4">"{tool.tagline}"</p>}
            {toolKey === 'claude' && (
              <div className="text-sm text-subtle font-mono">Last updated: April 2026</div>
            )}
          </div>
          <a href={tool.externalLink} target="_blank" rel="noopener noreferrer" className="bg-action text-brand-bg px-6 py-3 font-bold hover:bg-action-hover transition-all  flex items-center justify-center gap-2 whitespace-nowrap">
            {tool.ctaPrimary || "Visit Website"} <ExternalLink size={18} />
          </a>
        </div>

        <ReviewEvidence slug={toolKey} />

        {toolKey === 'claude' && (
          <div className="bg-surface border-l-4 border-brand-cyan p-6 mb-12">
            <h2 className="text-xl font-bold text-ink mb-2 flex items-center gap-2">
              <span>🛠️</span> Try my free Claude Prompt Builder
            </h2>
            <p className="text-secondary mb-4">
              Build a structured Claude prompt for review.
            </p>
            <Link to="/tools/prompt-builder" className="inline-flex items-center gap-2 text-link font-bold hover:underline">
              → Open Prompt Builder
            </Link>
          </div>
        )}

        <div className="prose prose-invert max-w-none mb-12">
          {tool.heroDesc.map((p: string, i: number) => <p key={i} className="text-secondary text-lg leading-relaxed mb-4">{p.replace(/<[^>]*>/g, "")}</p>)}
        </div>

        {toolKey === 'claude' && (
          <>
            <div className="mb-12">
              <h2 className="text-2xl font-bold font-mono mb-6 text-ink border-b border-line pb-2">Model overview</h2>
              <div className="bg-brand-bg border border-line p-6">
                <p className="text-secondary text-lg leading-relaxed">
                  Anthropic announced Claude Opus 4.7 on April 16 2026 and described it as its most capable generally available model.
                  The benchmark and feature statements below are vendor-reported and are not Domsky measurements.
                </p>
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-bold font-mono mb-6 text-ink border-b border-line pb-2">Key improvements over the previous version</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  {
                    title: 'Coding performance',
                    text:
                      '87.6% on SWE-bench Verified — up from 80.8% on Opus 4.6. GitHub reported a 13% improvement on its own 93-task coding benchmark.',
                  },
                  {
                    title: 'Vision upgrade',
                    text:
                      'XBOW reported 98.5% on its visual-acuity benchmark, versus 54.5% for Opus 4.6. Supports images up to 3.75 megapixels — more than 3x the previous resolution limit.',
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
                  <div key={card.title} className="bg-brand-bg border border-line p-6 hover:border-brand-cyan transition-colors">
                    <div className="text-sm font-mono uppercase tracking-wider text-link mb-3">{card.title}</div>
                    <p className="text-secondary leading-relaxed">{card.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-bold font-mono mb-6 text-ink border-b border-line pb-2">Vendor-reported benchmarks</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { label: 'SWE-bench Verified', value: '87.6%' },
                  { label: 'GPQA Diamond', value: '94.2%' },
                  { label: 'Terminal-Bench 2.0', value: '69.4%' },
                  { label: 'Finance Agent', value: '64.4%' },
                  { label: 'Visual Acuity', value: '98.5%' },
                ].map((b) => (
                  <div key={b.label} className="bg-brand-bg border border-line p-6">
                    <div className="text-3xl font-bold font-mono text-link mb-2">{b.value}</div>
                    <div className="text-sm font-mono text-secondary uppercase tracking-wider">{b.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        <div className="mb-12">
          <h2 className="text-2xl font-bold font-mono mb-6 text-ink border-b border-line pb-2">Key Features</h2>
          <ul className="grid md:grid-cols-2 gap-4">
            {tool.features.map((f: string, i: number) => (
              <li key={i} className="flex items-start gap-3 text-secondary bg-brand-bg p-4 border border-line">
                <CheckCircle2 size={20} className="text-link shrink-0 mt-0.5" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-success-surface border border-success p-6">
            <h2 className="text-xl font-bold font-mono mb-4 text-success">Pros</h2>
            <ul className="space-y-3">
              {tool.pros.map((p: string, i: number) => <li key={i} className="text-secondary flex items-start gap-3"><span className="text-success font-bold">+</span> {p}</li>)}
            </ul>
          </div>
          <div className="bg-error-surface border border-error p-6">
            <h2 className="text-xl font-bold font-mono mb-4 text-error">Cons</h2>
            <ul className="space-y-3">
              {tool.cons.map((c: string, i: number) => <li key={i} className="text-secondary flex items-start gap-3"><span className="text-error font-bold">-</span> {c}</li>)}
            </ul>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold font-mono mb-6 text-ink border-b border-line pb-2">Pricing</h2>
          {tool.pricingCards ? (
            <div className="grid md:grid-cols-2 gap-4">
              {tool.pricingCards.map((card: any, i: number) => (
                <div key={i} className="bg-brand-bg border border-line p-6 hover:border-brand-cyan transition-colors">
                  <h3 className="text-lg font-bold font-mono text-ink mb-1">{card.name}</h3>
                  <p className="text-emphasis font-mono mb-4">{card.price}</p>
                  <ul className="space-y-2 mb-4">
                    {card.features.map((f: string, j: number) => (
                      <li key={j} className="text-secondary text-sm flex items-start gap-2">
                        <span className="text-link mt-0.5">•</span> {f}
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-subtle border-t border-line pt-4 mt-auto">
                    <span className="font-bold text-secondary">Perfect for:</span> {card.perfectFor}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-secondary bg-brand-bg p-4 border border-line font-mono text-sm">{tool.pricing}</p>
          )}
        </div>

        {tool.bestFor && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold font-mono mb-6 text-ink border-b border-line pb-2">Who is it best for?</h2>
            <div className="prose prose-invert max-w-none">
              {tool.bestFor.map((p: string, i: number) => <p key={i} className="text-secondary text-lg leading-relaxed mb-4">{p}</p>)}
            </div>
          </div>
        )}

        <div className="bg-brand-bg border border-line p-8 text-center mb-12">
          <h2 className="text-2xl font-bold font-mono mb-6 text-ink">Final Verdict</h2>
          <div className="text-secondary text-lg italic leading-relaxed mb-6">
            {tool.verdict.split('\n\n').map((p: string, i: number) => <p key={i} className="mb-4 last:mb-0">"{p}"</p>)}
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 mt-6 pt-6 border-t border-line">
            {tool.bestForTags && (
              <div className="text-sm">
                <span className="text-subtle font-mono">Best For:</span> <span className="text-link">{tool.bestForTags}</span>
              </div>
            )}
            {tool.pricingSummary && (
              <div className="text-sm">
                <span className="text-subtle font-mono">Pricing:</span> <span className="text-emphasis">{tool.pricingSummary}</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <a href={tool.externalLink} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto bg-action text-brand-bg px-8 py-4 font-bold text-lg hover:bg-action-hover transition-all  flex items-center justify-center gap-2">
            {tool.ctaPrimary || "Visit Website"} <ExternalLink size={20} />
          </a>
          <Link to="/reviews" className="w-full sm:w-auto bg-transparent border border-line text-ink px-8 py-4 font-bold text-lg hover:border-line hover:bg-brand-surface transition-all flex items-center justify-center gap-2">
            <ArrowRight className="rotate-180" size={20} /> Back to all reviews
          </Link>
        </div>
      </div>
    </div>
  );
};

