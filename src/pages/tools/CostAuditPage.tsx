import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { ConvertKitForm } from '../../components/ConvertKitForm';
import { UsageBadge } from '../../components/UsageBadge';
import { UsageLimitModal } from '../../components/UsageLimitModal';
import {
  AI_ALTERNATIVES,
  CATEGORIES,
  RECOMMENDED_TOOLS,
} from '../../data/saasCalculatorShared';
import { useToolUsage } from '../../hooks/useToolUsage';

const SITE_ORIGIN = 'https://domskysolutions.com';

const WORK_STYLES = [
  'Side project / evenings',
  'Full-time solo',
  'Micro-team (2–5 people)',
] as const;

const REVENUE_BANDS = [
  'Prefer not to say',
  'Under $10k / year',
  '$10k–50k / year',
  '$50k–150k / year',
  '$150k+ / year',
] as const;

function GeneratingDots({ variant = 'dark' }: { variant?: 'dark' | 'light' }) {
  const dotBg = variant === 'light' ? 'bg-white/90' : 'bg-brand-bg';
  return (
    <span className="ml-2 inline-flex items-center gap-1 align-middle" aria-hidden>
      <span className={`email-writer-dot inline-block h-1.5 w-1.5 rounded-full ${dotBg}`} />
      <span
        className={`email-writer-dot inline-block h-1.5 w-1.5 rounded-full ${dotBg}`}
        style={{ animationDelay: '0.2s' }}
      />
      <span
        className={`email-writer-dot inline-block h-1.5 w-1.5 rounded-full ${dotBg}`}
        style={{ animationDelay: '0.4s' }}
      />
    </span>
  );
}

function computeFromInputs(inputs: Record<string, string>) {
  let currentSpend = 0;
  Object.values(inputs).forEach((val) => {
    currentSpend += parseInt(val || '0', 10) || 0;
  });

  const activeAlternatives = AI_ALTERNATIVES.filter((alt) =>
    alt.triggers.some((trigger) => (parseInt(inputs[trigger] || '0', 10) || 0) > 0)
  );
  const aiSpend = activeAlternatives.reduce((sum, alt) => sum + alt.cost, 0);
  const saving = currentSpend - aiSpend;
  const savingPercent =
    currentSpend > 0 ? Math.round((saving / currentSpend) * 100) : 0;

  const activeRecommendedTools = RECOMMENDED_TOOLS.filter((tool) =>
    tool.triggers.some((trigger) => (parseInt(inputs[trigger] || '0', 10) || 0) > 0)
  );

  return {
    currentSpend,
    aiSpend,
    saving,
    savingPercent,
    activeAlternatives,
    activeRecommendedTools,
  };
}

function formatSpendLines(inputs: Record<string, string>): string {
  const lines: string[] = [];
  for (const cat of CATEGORIES) {
    for (const item of cat.items) {
      const v = parseInt(inputs[item.id] || '0', 10) || 0;
      if (v > 0) lines.push(`- ${item.label}: $${v}/month`);
    }
  }
  return lines.length ? lines.join('\n') : '(Nothing entered with spend > 0)';
}

function buildAuditPrompt(params: {
  inputs: Record<string, string>;
  currentSpend: number;
  aiSpend: number;
  saving: number;
  savingPercent: number;
  activeAlternatives: typeof AI_ALTERNATIVES;
  activeRecommendedTools: typeof RECOMMENDED_TOOLS;
  workStyle: string;
  revenueBand: string;
  extraSubs: string;
  goalsNotes: string;
}): string {
  const {
    inputs,
    currentSpend,
    aiSpend,
    saving,
    savingPercent,
    activeAlternatives,
    activeRecommendedTools,
    workStyle,
    revenueBand,
    extraSubs,
    goalsNotes,
  } = params;

  const altLines = activeAlternatives
    .map((a) => `- ${a.name}: benchmark ~$${a.cost}/month (used where overlapping categories have spend)`)
    .join('\n');

  const reviewLines = activeRecommendedTools
    .map((t) => `- ${t.name}: ${t.desc} Review: ${SITE_ORIGIN}${t.link}`)
    .join('\n');

  return `You are helping solo founders, freelancers, and creators audit software spend for domskysolutions.com — an independent AI/SaaS review site. Be direct and practical. Avoid enterprise jargon and unrealistic "rip everything out" advice.

GROUND TRUTH (do not contradict these numbers — they were computed from the user's inputs):
- Total entered monthly spend (summed line items): $${currentSpend}
- Estimated benchmark "AI-oriented replacement stack" monthly total from our calculator model (sum of non-overlapping buckets): $${aiSpend}
- Raw monthly difference (entered spend minus benchmark stack): $${saving} (${savingPercent}% of entered spend). If this is negative, the benchmark stack costs more than what they typed — say so honestly and focus on consolidation and overlap instead of "savings."

Monthly spend breakdown (only categories with spend > 0):
${formatSpendLines(inputs)}

${extraSubs.trim() ? `Additional subscriptions / costs the user described (free text — treat as directional, not verified):\n${extraSubs.trim()}\n` : ''}

Solopreneur context:
- Work situation: ${workStyle}
- Revenue band (self-reported): ${revenueBand}
${goalsNotes.trim() ? `- Goals / constraints they mentioned:\n${goalsNotes.trim()}` : ''}

Calculator-style benchmark alternatives tied to their categories (for narrative — prices are rough benchmarks):
${altLines || '(None triggered — very low or zero mapped spend)'}

Matching tools on domskysolutions.com you may reference sparingly (prefer mentioning only what fits their stack):
${reviewLines || '(None triggered)'}

Also mention our SaaS calculator if helpful for re-running numbers: ${SITE_ORIGIN}/tools/saas-calculator

OUTPUT: Use exactly these Markdown sections and headings:

## Executive snapshot
3–5 bullets. Include monthly and annualized entered spend. Mention benchmark comparison cautiously.

## Where the money concentrates
Name the biggest categories — tie to solopreneur realities (e.g. stacked freelance retainers vs one AI subscription).

## Overlap & blind spots
Honest risks: duplicate tools, zombie subscriptions, paying for speed they do not use. If spend is low, say their stack is already lean.

## Prioritized actions
Numbered 1–5. Each step concrete (cancel X after exporting data, downgrade tier, trial swap). No invented discounts.

## Lean stack angle
How an indie operator might simplify — optional convergence with the benchmark list above when it genuinely fits. If benchmark monthly cost > entered spend, explain tradeoffs (time vs money) instead of forcing "savings."

## 30-day plan
Short checklist (week 1–4 or bullet timeline).

## Disclaimer
One short paragraph: not financial advice; prices change; they should verify before canceling.

Rules: Do not invent specific vendor prices not implied above. If information is missing, say what would help. Write in second person ("you"). Keep total output under ~900 words.`;
}

export function CostAuditPage() {
  const { limitReached, remainingUses, incrementUsage, dailyLimit } = useToolUsage('cost-audit');
  const generatingRef = useRef(false);

  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [workStyle, setWorkStyle] = useState<string>(WORK_STYLES[0]);
  const [revenueBand, setRevenueBand] = useState<string>(REVENUE_BANDS[0]);
  const [extraSubs, setExtraSubs] = useState('');
  const [goalsNotes, setGoalsNotes] = useState('');

  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const totals = useMemo(() => computeFromInputs(inputs), [inputs]);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'SaaS Cost Audit — domskysolutions.com';
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute(
      'content',
      'AI-assisted audit of your software spend for solopreneurs — grounded in your numbers, with prioritized cuts and a 30-day plan. Free.'
    );
  }, []);

  const handleInputChange = useCallback((id: string, value: string) => {
    if (value === '' || /^\d+$/.test(value)) {
      setInputs((prev) => ({ ...prev, [id]: value }));
    }
  }, []);

  const generateAudit = useCallback(async () => {
    if (generatingRef.current) return;
    if (totals.currentSpend <= 0) {
      setError('Enter at least one monthly cost above zero so the audit is grounded in real numbers.');
      return;
    }
    if (limitReached) {
      setShowLimitModal(true);
      return;
    }

    generatingRef.current = true;
    setLoading(true);
    setOutput('');
    setError('');

    const prompt = buildAuditPrompt({
      inputs,
      currentSpend: totals.currentSpend,
      aiSpend: totals.aiSpend,
      saving: totals.saving,
      savingPercent: totals.savingPercent,
      activeAlternatives: totals.activeAlternatives,
      activeRecommendedTools: totals.activeRecommendedTools,
      workStyle,
      revenueBand,
      extraSubs,
      goalsNotes,
    });

    incrementUsage();

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 3500,
          messages: [{ role: 'user', content: prompt }],
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
      setOutput(text);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
      generatingRef.current = false;
    }
  }, [
    goalsNotes,
    extraSubs,
    incrementUsage,
    inputs,
    limitReached,
    revenueBand,
    totals.activeAlternatives,
    totals.activeRecommendedTools,
    totals.aiSpend,
    totals.currentSpend,
    totals.saving,
    totals.savingPercent,
    workStyle,
  ]);

  const copyOutput = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setError('Could not copy. Try selecting the text manually.');
    }
  };

  const labelClass = 'mb-2 text-xs font-mono uppercase tracking-wider text-gray-400';
  const fieldClass =
    'w-full rounded-xl border border-gray-700 bg-brand-bg px-4 py-3 text-sm text-white transition-colors focus:border-brand-cyan focus:outline-none';
  const dollarInputClass =
    'w-24 bg-brand-bg border border-gray-700 rounded-lg py-2 pl-7 pr-3 text-white font-mono text-sm focus:outline-none focus:border-brand-cyan transition-colors';

  const canGenerate = totals.currentSpend > 0;

  return (
    <div className="min-h-screen bg-brand-bg text-gray-300" style={{ backgroundColor: '#0F0A05' }}>
      <div className="mx-auto max-w-4xl px-4 py-16">
        <div className="mb-2 inline-block rounded-full border border-brand-cyan/40 px-3 py-1 font-mono text-xs text-brand-cyan">
          FREE TOOL
        </div>
        <h1 className="mb-3 font-mono text-3xl font-bold text-white md:text-4xl">SaaS cost audit</h1>
        <p className="mb-4 max-w-2xl text-gray-400">
          Built for solopreneurs: turn your real subscription numbers into a prioritized cleanup plan — overlap,
          waste, and what to tackle first. Uses the same spend categories as our{' '}
          <Link to="/tools/saas-calculator" className="text-brand-cyan hover:underline">
            SaaS calculator
          </Link>{' '}
          so figures stay consistent.
        </p>
        <UsageBadge remainingUses={remainingUses} dailyLimit={dailyLimit} />

        <div
          className="mt-10 rounded-2xl border border-gray-800 p-6 md:p-8"
          style={{ background: '#1a1a2e' }}
        >
          <h2 className="mb-6 font-mono text-lg font-bold text-white">1. Your monthly spend</h2>
          <p className="mb-8 text-sm text-gray-500">
            Enter whole-dollar estimates. Leave blank if you do not pay for that category.
          </p>

          <div className="space-y-10">
            {CATEGORIES.map((category, idx) => (
              <div key={idx}>
                <h3 className="mb-4 text-xs font-mono font-bold uppercase tracking-widest text-gray-500">
                  {category.title}
                </h3>
                <div className="space-y-3">
                  {category.items.map((item) => (
                    <div key={item.id} className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <label htmlFor={item.id} className="text-sm font-bold text-white md:flex-1">
                        {item.label}
                      </label>
                      <div className="flex items-center gap-2">
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-mono text-sm">
                            $
                          </span>
                          <input
                            type="text"
                            inputMode="numeric"
                            id={item.id}
                            value={inputs[item.id] || ''}
                            onChange={(e) => handleInputChange(item.id, e.target.value)}
                            placeholder="0"
                            className={dollarInputClass}
                            aria-label={`${item.label} monthly cost`}
                          />
                        </div>
                        <span className="text-sm text-gray-500">/mo</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 border-t border-gray-800 pt-8">
            <h2 className="mb-6 font-mono text-lg font-bold text-white">2. Solopreneur context (optional)</h2>
            <div className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className={labelClass} htmlFor="work-style">
                    How you work
                  </label>
                  <select
                    id="work-style"
                    className={fieldClass}
                    value={workStyle}
                    onChange={(e) => setWorkStyle(e.target.value)}
                  >
                    {WORK_STYLES.map((w) => (
                      <option key={w} value={w}>
                        {w}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelClass} htmlFor="revenue">
                    Revenue band
                  </label>
                  <select
                    id="revenue"
                    className={fieldClass}
                    value={revenueBand}
                    onChange={(e) => setRevenueBand(e.target.value)}
                  >
                    {REVENUE_BANDS.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className={labelClass} htmlFor="extra-subs">
                  Other tools & rough cost
                </label>
                <textarea
                  id="extra-subs"
                  className={`${fieldClass} min-h-[88px] resize-none font-sans`}
                  placeholder="e.g. Kit $29, Superhuman $30, domain email $6…"
                  value={extraSubs}
                  onChange={(e) => setExtraSubs(e.target.value)}
                  rows={3}
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="goals">
                  Goals, worries, or constraints
                </label>
                <textarea
                  id="goals"
                  className={`${fieldClass} min-h-[88px] resize-none font-sans`}
                  placeholder="e.g. Need to cut $200/mo before Q4, nervous about canceling Adobe…"
                  value={goalsNotes}
                  onChange={(e) => setGoalsNotes(e.target.value)}
                  rows={3}
                />
              </div>
            </div>
          </div>
        </div>

        {canGenerate ? (
          <div className="mt-8 rounded-2xl border border-brand-cyan/25 bg-brand-bg/80 p-6">
            <div className="mb-2 font-mono text-xs uppercase tracking-wider text-brand-cyan">Live totals</div>
            <p className="mb-3 text-xs text-gray-500">
              Figures below sum the category grid only. Anything you typed under &quot;Other tools&quot; is passed to the
              audit narrative but not added here automatically — keep rough totals consistent when comparing.
            </p>
            <div className="flex flex-wrap gap-6 text-sm">
              <div>
                <span className="text-gray-500">Entered monthly </span>
                <span className="font-mono font-bold text-white">${totals.currentSpend.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-gray-500">Benchmark AI-style stack (model) </span>
                <span className="font-mono font-bold text-white">${totals.aiSpend.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-gray-500">Difference </span>
                <span
                  className={`font-mono font-bold ${totals.saving >= 0 ? 'text-brand-cyan' : 'text-amber-400'}`}
                >
                  ${totals.saving.toLocaleString()} / mo ({totals.savingPercent}%)
                </span>
              </div>
            </div>
          </div>
        ) : (
          <p className="mt-8 rounded-xl border border-gray-800 bg-brand-surface px-4 py-3 text-sm text-gray-500">
            Add your monthly costs above to unlock the audit — we anchor the write-up in your real numbers.
          </p>
        )}

        <button
          type="button"
          onClick={generateAudit}
          disabled={loading || !canGenerate}
          className={`mt-8 w-full rounded-xl py-4 font-mono font-bold transition-colors disabled:cursor-not-allowed ${
            loading || !canGenerate
              ? 'bg-gray-700 text-gray-400'
              : 'bg-[#F97316] text-black hover:opacity-95'
          }`}
        >
          {loading ? (
            <span className="inline-flex items-center justify-center">
              Generating audit
              <GeneratingDots variant="light" />
            </span>
          ) : (
            <>
              <Sparkles className="mr-2 inline-block h-4 w-4 align-text-bottom" aria-hidden />
              Generate my audit
            </>
          )}
        </button>

        {error ? (
          <div
            className="mt-6 rounded-2xl border border-red-500/60 p-4 text-sm text-red-200"
            style={{ background: '#1a1a2e' }}
            role="alert"
          >
            {error}
          </div>
        ) : null}

        {output ? (
          <div className="mt-10">
            <div
              className="rounded-2xl border p-6"
              style={{
                background: '#1a1a2e',
                borderColor: 'rgba(0, 245, 212, 0.3)',
              }}
            >
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs font-mono uppercase tracking-wider text-brand-cyan">Your audit</span>
                <button
                  type="button"
                  onClick={copyOutput}
                  className="rounded-lg border border-gray-700 px-3 py-1 font-mono text-xs text-gray-300 transition-colors hover:border-brand-cyan"
                >
                  {copied ? 'Copied ✓' : 'Copy all'}
                </button>
              </div>
              <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-white">{output.trim()}</pre>
            </div>
            <button
              type="button"
              onClick={generateAudit}
              disabled={loading || !canGenerate}
              className="mt-4 text-xs font-mono text-gray-500 transition-colors hover:text-brand-cyan disabled:pointer-events-none disabled:opacity-40"
            >
              Regenerate with same inputs →
            </button>
          </div>
        ) : null}

        <section className="mt-16 border-t border-gray-800 pt-12">
          <h2 className="mb-4 font-mono text-xl font-bold text-white">Why solopreneurs use this</h2>
          <ul className="space-y-3 text-sm text-gray-400">
            <li className="flex gap-2">
              <span className="text-brand-cyan">—</span>
              Numbers-first: the AI cannot invent savings — it interprets what you typed.
            </li>
            <li className="flex gap-2">
              <span className="text-brand-cyan">—</span>
              Same categories as the calculator so you can compare “quick math” vs “written plan.”
            </li>
            <li className="flex gap-2">
              <span className="text-brand-cyan">—</span>
              Output you can paste into Notion or send to a VA: priorities + 30-day sequence.
            </li>
          </ul>
        </section>

        <div className="mt-16 rounded-2xl border border-gray-800 bg-brand-surface p-8">
          <h2 className="mb-4 font-mono text-lg font-bold text-white">Weekly picks for builders</h2>
          <p className="mb-6 text-sm text-gray-400">Tools and breakdowns that respect indie budgets.</p>
          <ConvertKitForm />
        </div>

        <div className="mt-12 text-center">
          <Link to="/tools" className="font-mono text-sm text-gray-500 transition-colors hover:text-brand-cyan">
            ← Back to all tools
          </Link>
        </div>
      </div>

      <UsageLimitModal
        open={showLimitModal}
        onClose={() => setShowLimitModal(false)}
        dailyLimit={dailyLimit}
      />
    </div>
  );
}
