import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const categories = [
  ['Writing and reasoning', 'Claude', '/reviews/claude'],
  ['Research with linked sources', 'Perplexity', '/reviews/perplexity'],
  ['Workspace assistance', 'Notion AI', '/reviews/notion-ai'],
  ['AI-assisted coding', 'Cursor', '/reviews/cursor'],
  ['Image generation', 'Midjourney', '/reviews/midjourney'],
  ['Video generation and editing', 'Runway', '/reviews/runway'],
  ['Generated speech', 'ElevenLabs', '/reviews/elevenlabs'],
  ['Marketing workflows', 'Jasper', '/reviews/jasper'],
  ['Transcript-led editing', 'Descript', '/reviews/descript'],
  ['Website prototyping', 'Framer', '/reviews/framer'],
];

export const BlogPost2 = () => {
  useEffect(() => window.scrollTo(0, 0), []);
  return (
    <main className="bg-brand-bg min-h-screen pt-32 pb-20">
      <article className="max-w-3xl mx-auto px-5 text-gray-300 leading-relaxed">
        <p className="text-brand-amber font-mono text-xs uppercase tracking-wider mb-4">Legacy guide · evidence scope revised</p>
        <h1 className="text-4xl md:text-5xl font-bold font-mono text-white leading-tight mb-6">10 AI tools for common solo-business tasks</h1>
        <p className="text-xl text-gray-300 mb-8">This guide maps common jobs to products worth evaluating. It does not claim that software replaces a team, guarantees professional output or produces measured savings.</p>
        <div className="border border-brand-amber/30 bg-brand-amber/5 p-5 mb-10">
          <strong className="text-white">Evidence note:</strong> The original article did not include a dated comparative test record. Its team-replacement, productivity and output-quality claims have been removed. Review current vendor documentation and run representative tasks before subscribing.
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          {categories.map(([job, tool, href]) => (
            <section key={tool} className="border border-gray-800 bg-brand-surface p-5">
              <p className="text-xs text-brand-cyan font-mono uppercase tracking-wider mb-2">{job}</p>
              <h2 className="text-xl text-white font-bold mb-3">{tool}</h2>
              <p className="text-sm text-gray-400 mb-4">Check task fit, current limits, data handling, review requirements and the cost of any tools you still need to retain.</p>
              <Link to={href} className="text-brand-cyan text-sm font-bold hover:underline">Read the evidence-limited review →</Link>
            </section>
          ))}
        </div>
        <section className="mt-12 border-t border-gray-800 pt-8">
          <h2 className="text-2xl text-white font-bold mb-4">How to choose responsibly</h2>
          <ol className="list-decimal pl-6 space-y-3">
            <li>Define one job and a representative input before opening a trial.</li>
            <li>Record output quality, correction time, failures and required human review.</li>
            <li>Count retained subscriptions, usage charges and migration work.</li>
            <li>Keep owner time separate from recurring cash savings.</li>
          </ol>
          <p className="mt-6">See the <Link to="/methodology" className="text-brand-cyan underline">review methodology</Link> for the evidence standard used across Domsky Solutions.</p>
        </section>
      </article>
    </main>
  );
};
