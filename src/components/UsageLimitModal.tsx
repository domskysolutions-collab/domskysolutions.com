import React, { useEffect } from 'react';

type UsageLimitModalProps = {
  open: boolean;
  onClose: () => void;
  dailyLimit: number;
};

export function UsageLimitModal({ open, onClose, dailyLimit }: UsageLimitModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="usage-limit-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/70"
        onClick={onClose}
        aria-label="Close dialog"
      />
      <div
        className="relative z-10 max-w-md rounded-2xl border border-gray-700 p-6 shadow-xl"
        style={{ background: '#1a1a2e' }}
      >
        <h2
          id="usage-limit-title"
          className="mb-2 font-mono text-lg font-bold text-white"
        >
          Daily limit reached
        </h2>
        <p className="mb-6 text-sm leading-relaxed text-gray-400">
          You have used all {dailyLimit} free generations for this tool today. Come back
          tomorrow or join the waitlist for higher limits when Pro launches.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-gray-600 px-4 py-2 font-mono text-sm text-gray-300 transition-colors hover:border-brand-cyan hover:text-brand-cyan"
          >
            Close
          </button>
          <a
            href="https://app.kit.com/9290961"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl px-4 py-2 text-center font-mono text-sm font-bold text-brand-bg transition-opacity hover:opacity-90"
            style={{ background: '#F5A623' }}
          >
            Join waitlist →
          </a>
        </div>
      </div>
    </div>
  );
}
