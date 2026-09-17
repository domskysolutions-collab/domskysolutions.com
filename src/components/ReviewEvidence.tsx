import React from 'react';
import { Link } from 'react-router-dom';
const pricingSources: Record<string, string> = {
  claude: 'https://claude.com/pricing', cursor: 'https://cursor.com/pricing', perplexity: 'https://www.perplexity.ai/pro',
  'notion-ai': 'https://www.notion.com/pricing', runway: 'https://runwayml.com/pricing', elevenlabs: 'https://elevenlabs.io/pricing',
  midjourney: 'https://docs.midjourney.com/hc/en-us/articles/27870484040333-Comparing-Midjourney-Plans', jasper: 'https://www.jasper.ai/pricing',
  descript: 'https://www.descript.com/pricing', framer: 'https://www.framer.com/pricing', synthesia: 'https://www.synthesia.io/pricing',
  convertkit: 'https://kit.com/pricing', namecheap: 'https://www.namecheap.com/domains/',
};
export function ReviewEvidence({ slug }: { slug: string }) {
  return <aside className="my-8 p-5 border border-brand-cyan/30 bg-brand-bg rounded-lg text-sm text-gray-300 leading-relaxed" aria-label="Review evidence and sources">
    <h2 className="font-bold text-lg text-white mb-3">Evidence & sources</h2>
    <p>By <Link className="underline text-brand-cyan" to="/about">Dominik</Link>. This is an editorial review, not an independent benchmark report. Test dates, exact plan/version, sample outputs and purchased or supplied access are not fully documented for this review.</p>
    <p className="mt-3">Prices and product claims can change. <a href={pricingSources[slug]} target="_blank" rel="noopener noreferrer" className="underline text-brand-cyan">Check the vendor’s current plans and pricing</a> before buying. Some links on this site are affiliate links.</p>
    {slug === 'claude' && <p className="mt-3">The April 2026 model discussion refers to <a href="https://www.anthropic.com/news/claude-opus-4-7" className="underline text-brand-cyan">Anthropic’s Opus 4.7 release announcement</a>. Benchmark and early-access tester claims belong to the vendor and its named testers; they are not measurements by Domsky Solutions.</p>}
    <p className="mt-3"><Link className="underline text-brand-cyan" to="/methodology">Read the rating, savings and testing methodology</Link>.</p>
  </aside>;
}

