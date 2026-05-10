import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ConvertKitForm } from '../../components/ConvertKitForm';
import { UsageBadge } from '../../components/UsageBadge';
import { UsageLimitModal } from '../../components/UsageLimitModal';
import { useToolUsage } from '../../hooks/useToolUsage';

const TONES = ['Professional', 'Direct', 'Friendly', 'Bold'] as const;

const OUTPUT_LENGTHS = [
  { id: 'one-liner', label: 'One-liner (tagline only)' },
  { id: 'short', label: 'Short paragraph (tagline + blurbs)' },
  { id: 'full', label: 'Full section (with bullets + SEO)' },
] as const;

type OutputLengthId = (typeof OUTPUT_LENGTHS)[number]['id'];

const PRESETS: Array<{
  label: string;
  toolName: string;
  oneLiner: string;
  audience: string;
  features: string;
  pricing: string;
  category: string;
}> = [
  {
    label: 'Newsletter tool',
    toolName: 'Kit',
    oneLiner: 'Email marketing and newsletter growth platform built for creators.',
    audience: 'Solo creators and newsletter writers who want automations without enterprise complexity.',
    features:
      'Visual automations, landing pages and forms, subscriber tagging and segments, creator-focused deliverability.',
    pricing: 'Free up to 1,000 subscribers; paid tiers scale with list size.',
    category: 'Email marketing / newsletter tools',
  },
  {
    label: 'AI writing assistant',
    toolName: 'Claude',
    oneLiner: 'AI assistant for drafting, editing, and reasoning through long-form work.',
    audience: 'Founders, freelancers, and writers who need dependable drafts and structured thinking.',
    features: 'Long-context conversations, project organisation, strong tone control for edits and outlines.',
    pricing: 'Free tier with limits; paid Pro plan for heavy daily use.',
    category: 'AI assistants / writing tools',
  },
  {
    label: 'Scheduling / booking',
    toolName: 'Cal.com',
    oneLiner: 'Open scheduling pages so clients book calls without endless email threads.',
    audience: 'Consultants, coaches, and freelancers booking discovery or client calls.',
    features: 'Shareable links, buffer times, time-zone handling, round-robin for teams (where available).',
    pricing: 'Self-host or use hosted plans; free tier for individuals on hosted product.',
    category: 'Scheduling / calendar software',
  },
];

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

function buildPrompt(params: {
  toolName: string;
  oneLiner: string;
  audience: string;
  features: string;
  pricing: string;
  category: string;
  tone: string;
  outputLength: OutputLengthId;
}): string {
  const {
    toolName,
    oneLiner,
    audience,
    features,
    pricing,
    category,
    tone,
    outputLength,
  } = params;

  let lengthInstructions = '';
  if (outputLength === 'one-liner') {
    lengthInstructions = `Output length: ONE SECTION ONLY.
- Include only a "## Tagline" section.
- Tagline must be 12 words or fewer.`;
  } else if (outputLength === 'short') {
    lengthInstructions = `Output length: SHORT.
Include these sections with ## headings:
- ## Tagline (≤12 words)
- ## Short description (1–2 sentences)
- ## Best for (one sentence)`;
  } else {
    lengthInstructions = `Output length: FULL.
Include these sections with ## Markdown headings (exactly these titles):
- ## Tagline (≤12 words)
- ## Short description (1–2 sentences)
- ## Long description (3–5 sentences)
- ## Benefits (3–5 bullet lines; outcome-focused, not feature dumps; start each bullet with "- ")
- ## Best for (one clear sentence about who should use this)
- ## Meta description (≤160 characters for search snippets)`;
  }

  return `You are a copy assistant for domskysolutions.com — an independent site that reviews AI and SaaS tools. Write trustworthy marketing copy for solopreneurs (solo founders, indie hackers, freelancers, creators) who need copy for Product Hunt, directories, Gumroad, landing pages, or blog roundups.

Rules:
- Sound like a thoughtful practitioner, not hype. Avoid empty superlatives ("revolutionary", "game-changing", "best-in-class", "unlock", "synergy").
- Lead with the job-to-be-done and concrete outcomes (save time, fewer tabs, ship faster).
- Only describe features, pricing, or comparisons the user listed below. If something is missing, omit it or use cautious wording ("often", "typically", "where available") — never invent specs, integrations, or prices.
- Match this tone: ${tone}.
- Use short sentences and active voice.

${lengthInstructions}

Tool details from the user:
- Tool name: ${toolName || '(not provided)'}
- What it does (their words): ${oneLiner || '(not provided)'}
- Primary user / job-to-be-done: ${audience || '(not provided)'}
- Standout features or differentiators: ${features || '(not provided)'}
- Pricing / model (if stated): ${pricing || '(not stated — do not guess numbers)'}
- Category or comparable tools: ${category || '(not provided)'}

Write only the formatted copy — no preamble, no "Here is your description".`;
}

export function ToolDescriptionPage() {
  const { limitReached, remainingUses, incrementUsage, dailyLimit } = useToolUsage('tool-description');
  const generatingRef = useRef(false);

  const [toolName, setToolName] = useState('');
  const [oneLiner, setOneLiner] = useState('');
  const [audience, setAudience] = useState('');
  const [features, setFeatures] = useState('');
  const [pricing, setPricing] = useState('');
  const [category, setCategory] = useState('');
  const [tone, setTone] = useState<string>(TONES[0]);
  const [outputLength, setOutputLength] = useState<OutputLengthId>('full');

  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Tool Description Generator — domskysolutions.com';
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute(
      'content',
      'Generate honest, ready-to-paste descriptions for AI and SaaS tools — taglines, blurbs, bullets, and SEO meta for Product Hunt, directories, and landing pages. Free for solopreneurs.'
    );
  }, []);

  const applyPreset = useCallback((preset: (typeof PRESETS)[number]) => {
    setToolName(preset.toolName);
    setOneLiner(preset.oneLiner);
    setAudience(preset.audience);
    setFeatures(preset.features);
    setPricing(preset.pricing);
    setCategory(preset.category);
  }, []);

  const generateCopy = useCallback(async () => {
    if (generatingRef.current) return;
    if (limitReached) {
      setShowLimitModal(true);
      return;
    }

    generatingRef.current = true;
    setLoading(true);
    setOutput('');
    setError('');

    const prompt = buildPrompt({
      toolName: toolName.trim(),
      oneLiner: oneLiner.trim(),
      audience: audience.trim(),
      features: features.trim(),
      pricing: pricing.trim(),
      category: category.trim(),
      tone,
      outputLength,
    });

    incrementUsage();

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: outputLength === 'full' ? 2000 : 900,
          messages: [{ role: 'user', content: prompt }],
        }),
      });

      const data = (await response.json()) as {
        content?: Array<{ type?: string; text?: string }>;
        error?: { message?: string };
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
    audience,
    category,
    features,
    incrementUsage,
    limitReached,
    oneLiner,
    outputLength,
    pricing,
    tone,
    toolName,
  ]);

  const copyOutput = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setError('Something went wrong. Please try again.');
    }
  };

  const labelClass = 'mb-2 text-xs font-mono uppercase tracking-wider text-gray-400';
  const fieldClass =
    'w-full rounded-xl border border-gray-700 bg-brand-bg px-4 py-3 text-sm text-white transition-colors focus:border-brand-cyan focus:outline-none';

  return (
    <div className="min-h-screen bg-brand-bg" style={{ backgroundColor: '#0F0A05' }}>
      <div className="mx-auto max-w-3xl px-4 py-16">
        <div className="mb-2 inline-block rounded-full border border-brand-cyan/40 px-3 py-1 font-mono text-xs text-brand-cyan">
          FREE TOOL
        </div>
        <h1 className="mb-3 font-mono text-4xl font-bold text-white">Tool Description Generator</h1>
        <p className="mb-6 max-w-xl text-gray-400">
          Honest, paste-ready copy for listings and launches — built for solopreneurs who do not have a marketing team.
        </p>
        <UsageBadge remainingUses={remainingUses} dailyLimit={dailyLimit} />

        <div className="mt-8">
          <p className={labelClass}>Quick presets</p>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((p) => (
              <button
                key={p.label}
                type="button"
                onClick={() => applyPreset(p)}
                className="rounded-full border border-gray-600 px-4 py-2 font-mono text-xs text-gray-300 transition-colors hover:border-brand-cyan hover:text-brand-cyan"
              >
                {p.label}
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs text-gray-500">Fills example fields you can edit for your own product.</p>
        </div>

        <div
          className="mt-10 rounded-2xl border border-gray-800 p-8"
          style={{ background: '#1a1a2e' }}
        >
          <div className="space-y-6">
            <div>
              <label className={labelClass} htmlFor="td-tool-name">
                Tool name
              </label>
              <input
                id="td-tool-name"
                type="text"
                className={fieldClass}
                placeholder="e.g. Notion, Kit, Cal.com"
                value={toolName}
                onChange={(e) => setToolName(e.target.value)}
                autoComplete="off"
              />
            </div>

            <div>
              <label className={labelClass} htmlFor="td-one-liner">
                One-line what it does
              </label>
              <input
                id="td-one-liner"
                type="text"
                className={fieldClass}
                placeholder="What would you tell a friend in one breath?"
                value={oneLiner}
                onChange={(e) => setOneLiner(e.target.value)}
              />
            </div>

            <div>
              <label className={labelClass} htmlFor="td-audience">
                Primary user / job-to-be-done
              </label>
              <textarea
                id="td-audience"
                className={`${fieldClass} min-h-[80px] resize-none`}
                placeholder="e.g. Freelance designers who need client bookings without back-and-forth email"
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                rows={3}
              />
            </div>

            <div>
              <label className={labelClass} htmlFor="td-features">
                Top features or differentiators
              </label>
              <textarea
                id="td-features"
                className={`${fieldClass} min-h-[100px] resize-none`}
                placeholder="List what actually matters — integrations, limits, workflow — only what you know is true."
                value={features}
                onChange={(e) => setFeatures(e.target.value)}
                rows={4}
              />
            </div>

            <div>
              <label className={labelClass} htmlFor="td-pricing">
                Pricing model (if known)
              </label>
              <input
                id="td-pricing"
                type="text"
                className={fieldClass}
                placeholder="e.g. Free tier + Pro $20/mo — or leave blank"
                value={pricing}
                onChange={(e) => setPricing(e.target.value)}
              />
            </div>

            <div>
              <label className={labelClass} htmlFor="td-category">
                Category or competitor (optional)
              </label>
              <input
                id="td-category"
                type="text"
                className={fieldClass}
                placeholder="e.g. vs Calendly, or 'project management'"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className={labelClass} htmlFor="td-tone">
                  Tone
                </label>
                <select
                  id="td-tone"
                  className={fieldClass}
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                >
                  {TONES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass} htmlFor="td-length">
                  Output length
                </label>
                <select
                  id="td-length"
                  className={fieldClass}
                  value={outputLength}
                  onChange={(e) => setOutputLength(e.target.value as OutputLengthId)}
                >
                  {OUTPUT_LENGTHS.map((l) => (
                    <option key={l.id} value={l.id}>
                      {l.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="button"
              onClick={generateCopy}
              disabled={loading}
              className={`w-full rounded-xl py-4 font-mono font-bold transition-colors disabled:cursor-not-allowed ${
                loading ? 'bg-gray-700 text-gray-100' : 'bg-[#F97316] text-[#000000] hover:opacity-95'
              }`}
            >
              {loading ? (
                <span className="inline-flex items-center justify-center">
                  Generating
                  <GeneratingDots variant="light" />
                </span>
              ) : (
                'Generate descriptions'
              )}
            </button>
          </div>
        </div>

        {error ? (
          <div
            className="mt-8 rounded-2xl border border-red-500/60 p-4 text-sm text-red-200"
            style={{ background: '#1a1a2e' }}
            role="alert"
          >
            {error}
          </div>
        ) : null}

        {output ? (
          <div className="mt-8">
            <div
              className="rounded-2xl border p-6"
              style={{
                background: '#1a1a2e',
                borderColor: 'rgba(0, 245, 212, 0.3)',
              }}
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <span className="text-xs font-mono uppercase tracking-wider text-brand-cyan">
                  Generated copy
                </span>
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
              onClick={generateCopy}
              disabled={loading}
              className="mt-4 text-xs font-mono text-gray-500 transition-colors hover:text-brand-cyan disabled:pointer-events-none disabled:opacity-40"
            >
              Regenerate with same inputs →
            </button>
          </div>
        ) : null}

        <section className="mt-20 border-t border-gray-800 pt-12">
          <h2 className="mb-4 font-mono text-xl font-bold text-white">What you get</h2>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="flex gap-2">
              <span className="text-brand-cyan">—</span>
              Sections you can copy piece by piece: tagline, short and long blurbs, outcome-led bullets, best-fit line,
              meta description.
            </li>
            <li className="flex gap-2">
              <span className="text-brand-cyan">—</span>
              Tone matched to you — without enterprise jargon or fake claims.
            </li>
            <li className="flex gap-2">
              <span className="text-brand-cyan">—</span>
              Built for Product Hunt, directories, Gumroad, and your own site — same voice as our reviews.
            </li>
          </ul>
        </section>

        <div className="mt-16 rounded-2xl border border-gray-800 bg-brand-surface p-8">
          <h2 className="mb-4 font-mono text-lg font-bold text-white">Get our weekly tools digest</h2>
          <p className="mb-6 text-sm text-gray-400">
            Real picks for builders — plus updates when we ship new free tools like this one.
          </p>
          <ConvertKitForm />
        </div>

        <div className="mt-16 text-center">
          <p className="mb-2 text-gray-400">Need more than {dailyLimit} generations per day?</p>
          <a
            href="https://app.kit.com/9290961"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-brand-cyan transition-colors hover:underline"
          >
            Join Pro waitlist →
          </a>
        </div>

        <div className="mt-10 text-center">
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
