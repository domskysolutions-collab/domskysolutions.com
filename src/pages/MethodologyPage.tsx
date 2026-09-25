import React from 'react';
import { Link } from 'react-router-dom';

export function MethodologyPage() {
  return <main className="max-w-3xl mx-auto px-6 pt-28 pb-20 text-gray-300 leading-relaxed">
    <h1 className="text-3xl md:text-5xl text-white font-bold mb-8">How to read my reviews</h1>
    <p className="mb-8">Domsky Solutions publishes Dominik’s editorial opinions about software for solopreneurs. This page explains the limits of the evidence currently published and the information needed to assess a recommendation.</p>
    <h2 className="text-2xl text-white font-bold mt-10 mb-4">Testing records and scope</h2>
    <p>Existing reviews do not yet include complete dated test logs. Test duration, subscription plan, model or version, and whether access was purchased or supplied are not consistently documented. A missing detail means “not documented”, not that a test took place. I do not claim a minimum testing period across every product.</p>
    <p className="mt-4">A reproducible review needs the exact prompts or tasks, input files, dated screenshots or sample outputs, plan limits, and observed failures. Useful comparison tasks include drafting and revising the same email, summarizing the same document, checking cited research, and fixing the same coding problem. These are reporting criteria, not a claim that every existing review completed this protocol.</p>
    <h2 className="text-2xl text-white font-bold mt-10 mb-4">Ratings</h2>
    <p>Scores are editorial judgments, not measured benchmark results or customer averages. Each review shows its scale: the original AI reviews use five points and SaaS reviews use ten. There is no published weighted scoring formula for these legacy scores. Consider the written strengths, limitations and fit for your task alongside the number.</p>
    <h2 className="text-2xl text-white font-bold mt-10 mb-4">Prices, specifications and benchmarks</h2>
    <p>Vendor documentation is the source for current pricing and product specifications. Follow the source links in a review before buying: prices can vary by billing period, region, tax, usage and plan. Vendor benchmarks are not my own test results and are not directly comparable without the same task set and evaluation conditions.</p>
    <h2 className="text-2xl text-white font-bold mt-10 mb-4">Savings examples</h2>
    <p>I do not have a verified reader savings dataset or subscriber count to publish. Figures in personal articles are the author’s reported experience, not an average or a promise. Calculator results are estimates based on the inputs and listed alternatives.</p>
    <p className="mt-4">Monthly savings = previous monthly cost − replacement monthly cost. Percentage reduction = savings ÷ previous cost × 100, only when previous cost is greater than zero. Compare the same billing period and include taxes, usage charges, migration costs and any lost functionality. Time savings should be reported separately from cash savings.</p>
    <h2 className="text-2xl text-white font-bold mt-10 mb-4">Independence and AI assistance</h2>
    <p>Some links may earn an affiliate commission at no extra cost to you. AI assists with content production; Dominik is responsible for the opinions published. Read the <Link to="/disclaimer" className="text-brand-cyan underline">affiliate disclosure</Link> and <Link to="/about" className="text-brand-cyan underline">author background</Link>.</p>
    <h2 className="text-2xl text-white font-bold mt-10 mb-4">Dates and corrections</h2>
    <p>Legacy articles record April 2026, without an exact publication day. I retain that level of precision instead of inventing timestamps. A technical site update is not a fresh product test. Changes to pricing, models, limits, observed behavior or factual errors warrant an editorial review. Exact test and revision dates should accompany future documented updates.</p>
    <p className="mt-4">Found a mistake? Email <a className="text-brand-cyan underline" href="mailto:team@domskysolutions.com">team@domskysolutions.com</a> with the page and supporting source.</p>
  </main>;
}

