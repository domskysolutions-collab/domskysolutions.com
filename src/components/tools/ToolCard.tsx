import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import type { ToolConfig } from '../../data/tools';

type Props = {
  tool: ToolConfig;
};

export function ToolCard({ tool }: Props) {
  return (
    <article className="bg-brand-surface border border-gray-800 rounded-xl p-6 flex flex-col h-full transition-colors hover:border-brand-cyan/40 hover:shadow-[0_0_24px_rgba(0,245,212,0.08)]">
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <span className="text-[11px] font-mono uppercase tracking-wider text-gray-400 px-2 py-0.5 rounded-md bg-brand-bg border border-gray-800">
          {tool.category}
        </span>
        {tool.isPremium ? (
          <span className="text-[11px] font-bold uppercase tracking-wider text-brand-bg bg-brand-amber px-2 py-0.5 rounded-md">
            Pro
          </span>
        ) : (
          <span className="text-[11px] font-bold uppercase tracking-wider text-brand-cyan bg-brand-cyan/10 px-2 py-0.5 rounded-md border border-brand-cyan/25">
            Free
          </span>
        )}
      </div>
      <div className="flex items-start gap-2 mb-2">
        <Sparkles className="w-5 h-5 text-brand-cyan shrink-0 mt-0.5" aria-hidden />
        <h3 className="text-lg font-bold font-mono text-white leading-snug">{tool.name}</h3>
      </div>
      <p className="text-gray-400 text-sm leading-relaxed flex-grow mb-6">{tool.description}</p>
      <Link
        to={`/tools/${tool.slug}`}
        className="inline-flex items-center justify-center gap-2 w-full sm:w-auto mt-auto px-4 py-2.5 rounded-lg bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/30 font-bold text-sm hover:bg-brand-cyan/15 transition-colors"
      >
        Use tool <ArrowRight className="w-4 h-4" />
      </Link>
    </article>
  );
}
