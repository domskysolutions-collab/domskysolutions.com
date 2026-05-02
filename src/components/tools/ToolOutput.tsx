import React, { useState } from 'react';
import { Copy, Check, RotateCcw, Bookmark } from 'lucide-react';

type Props = {
  output: string | null;
  isLoading?: boolean;
  onRegenerate?: () => void;
  onSavePlaceholder?: () => void;
  outputType?: 'text' | 'list' | 'markdown';
};

export function ToolOutput({
  output,
  isLoading,
  onRegenerate,
  onSavePlaceholder,
  outputType = 'text',
}: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const proseClass =
    outputType === 'markdown'
      ? 'whitespace-pre-wrap font-sans text-sm text-gray-200 leading-relaxed'
      : 'whitespace-pre-wrap font-sans text-sm text-gray-200 leading-relaxed';

  return (
    <div className="rounded-xl border border-gray-800 bg-brand-bg overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 border-b border-gray-800 bg-brand-surface/80">
        <span className="text-xs font-mono uppercase tracking-wider text-gray-500">Output</span>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={handleCopy}
            disabled={!output || isLoading}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-brand-bg border border-gray-700 text-white hover:border-brand-cyan/50 disabled:opacity-40 disabled:pointer-events-none transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-brand-cyan" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied' : 'Copy'}
          </button>
          <button
            type="button"
            onClick={onSavePlaceholder}
            disabled={!output || isLoading}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-brand-bg border border-gray-700 text-gray-300 hover:border-brand-amber/50 disabled:opacity-40 disabled:pointer-events-none transition-colors"
            title="Saving will be available after sign-in (Phase 2)"
          >
            <Bookmark className="w-3.5 h-3.5" />
            Save
          </button>
          {onRegenerate && (
            <button
              type="button"
              onClick={onRegenerate}
              disabled={isLoading}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-brand-cyan/10 border border-brand-cyan/30 text-brand-cyan hover:bg-brand-cyan/15 disabled:opacity-40 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Regenerate
            </button>
          )}
        </div>
      </div>
      <div className="p-4 min-h-[160px]">
        {isLoading && (
          <div className="space-y-2 animate-pulse">
            <div className="h-3 bg-gray-800 rounded w-3/4" />
            <div className="h-3 bg-gray-800 rounded w-full" />
            <div className="h-3 bg-gray-800 rounded w-5/6" />
          </div>
        )}
        {!isLoading && output && <pre className={`${proseClass} font-sans`}>{output}</pre>}
        {!isLoading && !output && (
          <p className="text-sm text-gray-500 font-mono">Fill the form and click Generate to see output here.</p>
        )}
      </div>
    </div>
  );
}
