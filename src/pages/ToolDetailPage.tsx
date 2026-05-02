import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles } from 'lucide-react';
import type { ToolConfig } from '../data/tools';
import { getRelatedTools } from '../data/tools';
import { ToolForm } from '../components/tools/ToolForm';
import { ToolOutput } from '../components/tools/ToolOutput';
import { ToolCard } from '../components/tools/ToolCard';
import { generateMockOutput } from '../lib/generateMockOutput';

type Props = {
  tool: ToolConfig;
};

function initialValues(tool: ToolConfig): Record<string, string> {
  const v: Record<string, string> = {};
  for (const input of tool.inputs) {
    if (input.type === 'select' && input.options?.length) {
      v[input.name] = input.options[0];
    } else {
      v[input.name] = '';
    }
  }
  return v;
}

export function ToolDetailPage({ tool }: Props) {
  const [values, setValues] = useState(() => initialValues(tool));
  const [output, setOutput] = useState<string | null>(null);
  const [showPostOutputCta, setShowPostOutputCta] = useState(false);
  const [loading, setLoading] = useState(false);

  const related = useMemo(() => getRelatedTools(tool.slug, 4), [tool.slug]);

  useEffect(() => {
    document.title = tool.seoTitle;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', tool.seoDescription);
  }, [tool]);

  useEffect(() => {
    setValues(initialValues(tool));
    setOutput(null);
    setShowPostOutputCta(false);
  }, [tool.slug]);

  const runGenerate = () => {
    setLoading(true);
    setShowPostOutputCta(false);
    window.setTimeout(() => {
      setOutput(generateMockOutput(tool, values));
      setLoading(false);
      setShowPostOutputCta(true);
    }, 450);
  };

  const onSavePlaceholder = () => {
    alert('Saving results will be available after sign-in (Phase 2). For now, use Copy to keep your output.');
  };

  return (
    <main className="bg-brand-bg min-h-screen pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/tools"
          className="inline-flex items-center gap-2 text-brand-cyan hover:underline font-mono text-sm mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Back to tools
        </Link>

        <header className="mb-10">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="text-xs font-mono uppercase tracking-wider text-gray-400 px-2 py-0.5 rounded-md bg-brand-surface border border-gray-800">
              {tool.category}
            </span>
            {tool.isPremium ? (
              <span className="text-xs font-bold uppercase tracking-wider text-brand-bg bg-brand-amber px-2 py-0.5 rounded-md">
                Pro
              </span>
            ) : (
              <span className="text-xs font-bold uppercase tracking-wider text-brand-cyan bg-brand-cyan/10 px-2 py-0.5 rounded-md border border-brand-cyan/25">
                Free
              </span>
            )}
          </div>
          <div className="flex items-start gap-3">
            <Sparkles className="w-8 h-8 text-brand-cyan shrink-0 mt-1" aria-hidden />
            <div>
              <h1 className="text-3xl md:text-4xl font-bold font-mono text-white mb-3">{tool.name}</h1>
              <p className="text-lg text-gray-400 leading-relaxed">{tool.description}</p>
            </div>
          </div>
        </header>

        <div className="grid gap-8 lg:grid-cols-1">
          <section className="rounded-xl border border-gray-800 bg-brand-surface p-6 md:p-8">
            <h2 className="sr-only">Inputs</h2>
            <ToolForm
              tool={tool}
              values={values}
              onChange={(name, value) => setValues((prev) => ({ ...prev, [name]: value }))}
              disabled={loading}
            />
            <div className="mt-8">
              <button
                type="button"
                onClick={runGenerate}
                disabled={loading}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-brand-cyan text-brand-bg font-bold text-base hover:bg-[#33fcd9] transition-colors disabled:opacity-50 disabled:pointer-events-none shadow-[0_0_24px_rgba(0,245,212,0.25)]"
              >
                {loading ? 'Generating…' : 'Generate'}
              </button>
            </div>
          </section>

          <section aria-live="polite">
            <h2 className="sr-only">Output</h2>
            <ToolOutput
              output={output}
              isLoading={loading}
              outputType={tool.outputType}
              onRegenerate={output ? runGenerate : undefined}
              onSavePlaceholder={onSavePlaceholder}
            />
          </section>

          {showPostOutputCta && output && (
            <aside className="rounded-xl border border-brand-amber/30 bg-brand-amber/5 p-6 md:p-8">
              <p className="text-white font-bold font-mono text-lg mb-2">Create a free account to save this result</p>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                You&apos;ve seen how the workspace feels. Next step: sign up to save outputs, track usage, and unlock Pro
                when you&apos;re ready (Phase 2).
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to="/#newsletter"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-brand-amber text-brand-bg font-bold text-sm hover:bg-yellow-400 transition-colors text-center"
                >
                  Get on the list — accounts next
                </Link>
                <Link
                  to="/tools"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-xl border border-brand-cyan text-brand-cyan font-bold text-sm hover:bg-brand-cyan/10 transition-colors"
                >
                  Explore more tools
                </Link>
              </div>
              {tool.isPremium && (
                <p className="text-xs text-brand-amber font-mono mt-4">
                  This tool is marked Pro — billing and gating arrive in Phase 3.
                </p>
              )}
            </aside>
          )}
        </div>

        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="text-xl font-bold font-mono text-white mb-6">Related tools</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {related.map((t) => (
                <ToolCard key={t.slug} tool={t} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
