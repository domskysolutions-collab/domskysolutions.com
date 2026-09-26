import React, { useEffect } from 'react';
import { ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ReviewEvidence } from '../../components/ReviewEvidence';

export const NamecheapReviewPage = () => {
  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <main className="bg-brand-bg min-h-screen pt-32 pb-20">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/reviews" className="text-brand-cyan font-mono text-sm hover:underline">← Back to all reviews</Link>
        <div className="mt-8 bg-brand-surface border border-gray-800 p-6 sm:p-10">
          <p className="text-xs font-mono text-brand-amber uppercase tracking-wider mb-4">Editorial review</p>
          <h1 className="text-4xl md:text-5xl font-bold font-mono text-white leading-tight mb-5">Namecheap review</h1>
          <p className="text-xl text-gray-300 leading-relaxed mb-6">
            A practical checklist for evaluating Namecheap as a domain registrar, with the evidence limits stated clearly.
          </p>
          <ReviewEvidence slug="namecheap" />
          <section className="mt-10 text-gray-300 leading-relaxed space-y-4">
            <h2 className="text-2xl text-white font-bold font-mono">What this review can establish</h2>
            <p>The repository does not contain a dated, reviewable test record for the earlier personal-use claims, screenshots, renewal experience or support interactions. Those claims and the numerical rating have therefore been removed.</p>
            <p>Before choosing a registrar, compare the current registration and renewal price for your exact domain, privacy options, transfer rules, DNS controls, support channels and account-security features. Check these details on the official product pages because terms vary by domain extension and can change.</p>
          </section>
          <section className="mt-10 grid sm:grid-cols-2 gap-5">
            <div className="border border-gray-800 bg-brand-bg p-5">
              <h2 className="text-lg text-white font-bold mb-3">Questions to verify</h2>
              <ul className="list-disc pl-5 text-gray-300 space-y-2">
                <li>First-year and renewal price for the exact domain extension</li>
                <li>Privacy availability and any eligibility limits</li>
                <li>Transfer lock, authorization and recovery process</li>
                <li>DNS record controls and two-factor authentication</li>
              </ul>
            </div>
            <div className="border border-gray-800 bg-brand-bg p-5">
              <h2 className="text-lg text-white font-bold mb-3">Evidence status</h2>
              <p className="text-gray-300">No score is published. No minimum test duration, plan, purchase record or dated task log is documented for this legacy review.</p>
            </div>
          </section>
          <a href="https://www.namecheap.com/" target="_blank" rel="noopener noreferrer" className="mt-10 inline-flex items-center gap-2 text-brand-cyan font-bold hover:underline">
            Check Namecheap’s official site <ExternalLink size={16} />
          </a>
          <p className="mt-3 text-xs text-gray-500">Official source link. No affiliate relationship is asserted on this page.</p>
        </div>
      </article>
    </main>
  );
};
