import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const CONSENT_KEY = 'cookie-consent';
const CONSENT_ACCEPTED = 'accepted';

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const consent = window.localStorage.getItem(CONSENT_KEY);
      if (consent !== CONSENT_ACCEPTED) setIsVisible(true);
    } catch {
      setIsVisible(true);
    }
  }, []);

  const accept = () => {
    try {
      window.localStorage.setItem(CONSENT_KEY, CONSENT_ACCEPTED);
    } catch {
      // If storage is blocked, still allow dismissing locally for this session.
    }
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 w-full z-[9999]"
      style={{
        background: '#1a1a2e',
        borderTop: '2px solid #00F5D4',
        padding: '16px 24px',
      }}
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
        <p className="text-white text-sm leading-relaxed">
          <span aria-hidden="true">🍪 </span>
          This site uses cookies to <br className="hidden sm:block" />
          understand how visitors use it. <br className="hidden sm:block" />
          No personal data is sold or shared.
        </p>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={accept}
            className="bg-brand-amber text-brand-bg px-4 py-2 font-bold text-sm hover:bg-yellow-400 transition-colors"
          >
            Accept
          </button>
          <Link
            to="/privacy"
            className="px-4 py-2 text-sm font-medium text-gray-200 border border-gray-500/60 hover:border-gray-400 hover:bg-white/5 transition-colors"
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
}

