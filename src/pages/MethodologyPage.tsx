import React from 'react';
import { Link } from 'react-router-dom';
import { AUTHOR_NAME } from '../data/site';

export function MethodologyPage() {
  return <main className="max-w-3xl mx-auto px-6 pt-28 pb-20 text-gray-300 leading-relaxed">
    <h1 className="text-3xl md:text-5xl text-white font-bold mb-8">How to read my reviews</h1>
    <p className="mb-8">Domsky Solutions publishes {AUTHOR_NAME}’s editorial assessments of software for solopreneurs. This page explains the limits of the evidence currently published and the information needed to assess a recommendation.</p>
    <h2 className="text-2xl text-white font-bold mt-10 mb-4">Testing records and scope</h2>
    <p>Existing reviews do not yet include complete dated test logs. Test duration, subscription plan, model or version, and whether access was purchased or supplied are not consistently documented. A missing detail means “not documented”, not that a test took place. I do not claim a minimum testing period across every product.</p>
    <p className="mt-4">A reproducible review needs the exact prompts or tasks, input files, dated screenshots or sample outputs, plan limits, and observed failures. Useful comparison tasks include drafting and revising the same email, summarizing the same document, checking cited research, and fixing the same coding problem. These are reporting criteria, not a claim that every existing review completed this protocol.</p>
    <h2 className="text-2xl text-white font-bold mt-10 mb-4">No numerical ratings</h2>
    <p>Domsky Solutions does not publish numerical product ratings. The legacy scores were removed because they did not have a documented method covering criteria, weights, evidence, plan or version, review date and scoring procedure. Use the written strengths, limitations, evidence notes and fit for your task instead.</p>
    <h2 className="text-2xl text-white font-bold mt-10 mb-4">Prices, specifications and benchmarks</h2>
    <p>Vendor documentation is the source for current pricing and product specifications. Follow the source links in a review before buying: prices can vary by billing period, region, tax, usage and plan. Vendor benchmarks are not my own test results and are not directly comparable without the same task set and evaluation conditions.</p>
    <h2 className="text-2xl text-white font-bold mt-10 mb-4">Savings examples</h2>
    <p>I do not have a verified reader savings dataset or subscriber count to publish. Calculator results are scenarios based on the values entered and listed alternatives; they are not an average or a promise.</p>
    <p className="mt-4">Recurring net reduction = old recurring cash total − retained recurring costs − incremental replacement recurring costs. Compare the same billing period. Keep one-time migration cash, owner time and external service costs separate so they do not silently become recurring software savings. A negative result is an added recurring cost, not money saved.</p>
    <h2 className="text-2xl text-white font-bold mt-10 mb-4">Independence and AI assistance</h2>
    <p>Some links may earn an affiliate commission at no extra cost to you. AI assists with content production; Dominik is responsible for the opinions published. Read the <Link to="/disclaimer" className="text-brand-cyan underline">affiliate disclosure</Link> and <Link to="/about" className="text-brand-cyan underline">author background</Link>.</p>
    <h2 className="text-2xl text-white font-bold mt-10 mb-4">Dates and corrections</h2>
    <p>Legacy articles record April 2026, without an exact publication day. I retain that level of precision instead of inventing timestamps. A technical site update is not a fresh product test. Changes to pricing, models, limits, observed behavior or factual errors warrant an editorial review. Exact test and revision dates should accompany future documented updates.</p>
    <p className="mt-4">Found a mistake? Email <a className="text-brand-cyan underline" href="mailto:domskysolutions@gmail.com">domskysolutions@gmail.com</a> with the page and supporting source.</p>
  </main>;
}

