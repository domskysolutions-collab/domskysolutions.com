import React, { useCallback, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useToolUsage } from '../../hooks/useToolUsage';
import { UsageLimitModal } from '../../components/UsageLimitModal';
import { UsageBadge } from '../../components/UsageBadge';

const EMAIL_TYPES = [
  'Client Follow-Up',
  'Invoice Reminder',
  'Project Proposal',
  'Cold Outreach',
  'Thank You',
  'Apology / Delay Notice',
  'Meeting Request',
  'Project Update',
] as const;

const TONES = ['Professional', 'Friendly', 'Firm', 'Casual'] as const;

function splitSubjectBody(text: string): { subject: string | null; body: string } {
  const lines = text.split('\n');
  let subjectIdx = -1;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trimStart().toLowerCase().startsWith('subject:')) {
      subjectIdx = i;
      break;
    }
  }
  if (subjectIdx === -1) return { subject: null, body: text };
  const subject = lines[subjectIdx].trim();
  const body = lines.slice(subjectIdx + 1).join('\n').replace(/^\n+/, '');
  return { subject, body };
}

function EmailOutputBlock({ text }: { text: string }) {
  const { subject, body } = splitSubjectBody(text);
  if (!subject) {
    return (
      <div className="text-sm font-sans leading-relaxed whitespace-pre-wrap text-white">{text.trim()}</div>
    );
  }
  return (
    <>
      <p className="font-mono text-sm font-bold text-brand-cyan">{subject}</p>
      <div className="mt-3 text-sm font-sans leading-relaxed whitespace-pre-wrap text-white">{body}</div>
    </>
  );
}

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

const EXAMPLES = [
  {
    title: 'Invoice Reminder',
    subject: 'Subject: Following up on Invoice #147',
    body: `Hi Sarah,
I wanted to follow up on Invoice #147 for €450, now 2 weeks overdue.
Please let me know if you have any questions or need a different payment method.
Best,
Dominik`,
  },
  {
    title: 'Cold Outreach',
    subject: 'Subject: Quick question about [Company]',
    body: `Hi James,
I noticed [Company] is scaling quickly and thought our AI tools review site might help your team cut software costs.
Would you be open to a 15-minute chat?
Best,
Dominik`,
  },
  {
    title: 'Project Update',
    subject: 'Subject: Project Update — Week 2',
    body: `Hi Emma,
Quick update on the project — we are on track for the Friday deadline.
The main design is complete, currently working on final details.
I will send the full preview tomorrow.
Dominik`,
  },
];

export function EmailWriterPage() {
  const { limitReached, remainingUses, incrementUsage, dailyLimit } = useToolUsage('email-writer');
  const generatingRef = useRef(false);

  const [emailType, setEmailType] = useState<string>(EMAIL_TYPES[0]);
  const [yourName, setYourName] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [keyDetails, setKeyDetails] = useState('');
  const [tone, setTone] = useState<string>(TONES[0]);

  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateEmail = useCallback(async () => {
    if (generatingRef.current) return;
    if (limitReached) {
      setShowLimitModal(true);
      return;
    }

    generatingRef.current = true;
    setLoading(true);
    setOutput('');
    setError('');

    const prompt = `You are a professional email writer helping solopreneurs and freelancers communicate clearly.

Write a ${tone} ${emailType} email with these details:

From: ${yourName || '(sender name not provided)'}
To: ${recipientName || '(recipient name not provided)'}
Key details: ${keyDetails || '(none provided)'}

Requirements:
- Subject line first (format: Subject: [subject here])
- Then a blank line
- Then the email body
- Professional but human tone
- Concise and clear
- No fluff or filler phrases
- Sign off with ${yourName || 'your name'}
- Maximum 150 words for the body

Write only the email — no explanations or commentary.`;

    incrementUsage();

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
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

      const text = (data.content ?? [])
        .map((block) => block.text ?? '')
        .join('');
      setOutput(text);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
      generatingRef.current = false;
    }
  }, [
    emailType,
    incrementUsage,
    keyDetails,
    limitReached,
    recipientName,
    tone,
    yourName,
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
        <h1 className="mb-3 font-mono text-4xl font-bold text-white">AI Email Writer</h1>
        <p className="mb-6 max-w-xl text-gray-400">
          Write professional emails in 30 seconds. No more staring at a blank screen.
        </p>
        <UsageBadge remainingUses={remainingUses} dailyLimit={dailyLimit} />

        <div
          className="mt-10 rounded-2xl border border-gray-800 p-8"
          style={{ background: '#1a1a2e' }}
        >
          <div className="space-y-6">
            <div>
              <label className={labelClass} htmlFor="email-type">
                Email type
              </label>
              <select
                id="email-type"
                className={fieldClass}
                value={emailType}
                onChange={(e) => setEmailType(e.target.value)}
              >
                {EMAIL_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelClass} htmlFor="your-name">
                Your name
              </label>
              <input
                id="your-name"
                type="text"
                className={fieldClass}
                placeholder="Dominik"
                value={yourName}
                onChange={(e) => setYourName(e.target.value)}
                autoComplete="name"
              />
            </div>

            <div>
              <label className={labelClass} htmlFor="recipient-name">
                Recipient name
              </label>
              <input
                id="recipient-name"
                type="text"
                className={fieldClass}
                placeholder="Sarah"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
              />
            </div>

            <div>
              <label className={labelClass} htmlFor="key-details">
                Key details
              </label>
              <textarea
                id="key-details"
                className={`${fieldClass} min-h-[100px] resize-none`}
                placeholder={
                  'The project deadline is next Friday, invoice is €450, overdue by 2 weeks...'
                }
                value={keyDetails}
                onChange={(e) => setKeyDetails(e.target.value)}
                rows={4}
              />
            </div>

            <div>
              <label className={labelClass} htmlFor="tone">
                Tone
              </label>
              <select id="tone" className={fieldClass} value={tone} onChange={(e) => setTone(e.target.value)}>
                {TONES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              onClick={generateEmail}
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
                'Generate Email'
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
                <span className="text-xs font-mono uppercase tracking-wider text-brand-cyan">Generated Email</span>
                <button
                  type="button"
                  onClick={copyOutput}
                  className="rounded-lg border border-gray-700 px-3 py-1 font-mono text-xs text-gray-300 transition-colors hover:border-brand-cyan"
                >
                  {copied ? 'Copied ✓' : 'Copy'}
                </button>
              </div>
              <EmailOutputBlock text={output} />
            </div>
            <button
              type="button"
              onClick={generateEmail}
              disabled={loading}
              className="mt-4 text-xs font-mono text-gray-500 transition-colors hover:text-brand-cyan disabled:pointer-events-none disabled:opacity-40"
            >
              Not quite right? Generate again →
            </button>
          </div>
        ) : null}

        <section className="mt-20">
          <h2 className="mb-8 font-mono text-2xl font-bold text-white">What it generates</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {EXAMPLES.map((ex) => (
              <div
                key={ex.title}
                className="rounded-2xl border border-gray-700 p-5"
                style={{ background: '#1a1a2e' }}
              >
                <p className="mb-3 font-mono text-xs text-gray-500">{ex.title}</p>
                <p className="mb-2 font-mono text-sm font-bold text-brand-cyan">{ex.subject}</p>
                <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed text-gray-300">{ex.body}</pre>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-16 text-center">
          <p className="mb-2 text-gray-400">Need more than {dailyLimit} emails per day?</p>
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
