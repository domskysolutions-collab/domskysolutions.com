import React from 'react';
import { Link } from 'react-router-dom';

export function ToolDescriptionPage() {
  return (
    <div className="min-h-screen bg-brand-bg flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <div className="text-6xl mb-6">🛠️</div>
        <div className="text-xs font-mono text-brand-cyan uppercase tracking-wider mb-3">Coming Soon</div>
        <h1 className="text-white font-bold text-3xl font-mono mb-4">Tool Description Generator</h1>
        <p className="text-gray-400 text-lg mb-8 leading-relaxed">
          Generate compelling descriptions for any AI tool or SaaS product. Launching very soon.
        </p>
        <div className="p-4 rounded-xl border border-brand-cyan/20 bg-brand-surface text-sm text-gray-400 mb-8">
          Join the waitlist and be first to know when it launches.
        </div>
        <a
          href="https://app.kit.com/9290961"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-opacity hover:opacity-90"
          style={{
            background: '#F5A623',
            color: '#0D0F12',
          }}
        >
          Join Waitlist →
        </a>
        <div className="mt-6">
          <Link to="/tools" className="text-gray-500 text-sm hover:text-brand-cyan transition-colors font-mono">
            ← Back to all tools
          </Link>
        </div>
      </div>
    </div>
  );
}
