
import React, { useEffect } from 'react';
import { ConvertKitForm } from './ConvertKitForm';

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
        className="absolute inset-0 bg-surface"
        onClick={onClose}
        aria-label="Close dialog"
      />
      <div
        className="relative z-10 max-w-md rounded-2xl border border-line p-6 "
        style={{ background: 'var(--color-surface)' }}
      >
        <h2
          id="usage-limit-title"
          className="mb-2 font-mono text-lg font-bold text-ink"
        >
          Daily limit reached
        </h2>
        <p className="mb-6 text-sm leading-relaxed text-secondary">
          You have used all {dailyLimit} free generations for this tool today. Come back
          tomorrow or join the waitlist for higher limits when Pro launches.
        </p>
        <div className="mb-5 rounded-xl border border-brand-cyan bg-surface p-4"><p className="mb-3 text-sm text-secondary">Subscribe to The Weekly Edge and unlock 3 extra generations per day in this browser.</p><ConvertKitForm buttonText="Subscribe and unlock" successMessage="Subscribed. You now have 3 extra generations per day in this browser." onSuccess={() => { localStorage.setItem("tool-email-unlocked", "true"); window.dispatchEvent(new Event("tool-email-unlocked")); }} className="flex flex-col gap-2" inputClassName="rounded-lg border border-line bg-surface px-3 py-2 text-sm text-ink" buttonClassName="rounded-lg bg-action px-3 py-2 text-sm font-bold text-brand-bg" /></div><div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-line px-4 py-2 font-mono text-sm text-secondary transition-colors hover:border-brand-cyan hover:text-link"
          >
            Close
          </button>
          <a
            href="https://app.kit.com/9290961"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl px-4 py-2 text-center font-mono text-sm font-bold text-brand-bg transition-opacity hover:opacity-90"
            style={{ background: 'var(--color-action)', color: 'var(--color-on-action)' }}
          >
            Join waitlist →
          </a>
        </div>
      </div>
    </div>
  );
}


