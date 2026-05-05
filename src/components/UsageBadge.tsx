import React from 'react';

type UsageBadgeProps = {
  remainingUses: number;
  dailyLimit: number;
};

export function UsageBadge({ remainingUses, dailyLimit }: UsageBadgeProps) {
  return (
    <div
      className="inline-flex items-center gap-2 rounded-full border border-gray-700 bg-brand-bg px-3 py-1.5 text-xs font-mono text-gray-400"
      aria-live="polite"
    >
      <span className="text-brand-cyan">{remainingUses}</span>
      <span>/</span>
      <span>{dailyLimit}</span>
      <span className="uppercase tracking-wider">free today</span>
    </div>
  );
}
