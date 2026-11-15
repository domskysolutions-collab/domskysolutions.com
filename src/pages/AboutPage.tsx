import React from 'react';
import { Link } from 'react-router-dom';
import { AUTHOR_NAME } from '../data/site';

export const AboutPage = () => (
  <main className="max-w-[800px] mx-auto px-6 pt-32 pb-16 text-secondary text-[17px] leading-[1.8]">
    <header className="mb-9">
      <p className="font-mono text-xs uppercase tracking-widest text-link mb-4">About Domsky Solutions</p>
      <h1 style={{ fontFamily: 'var(--font-serif)' }} className="text-3xl sm:text-4xl font-semibold leading-tight text-ink mb-5">Independent software research. Clearer decisions.</h1>
      <p>Domsky Solutions is an independent publication covering AI and SaaS tools for freelancers, creators and small businesses. We explain software choices through the work a tool needs to do, its limitations and the cost of adding it to an existing setup.</p>
    </header>

    <section aria-labelledby="what-we-cover" className="border-t border-line pt-7 mb-8">
      <h2 id="what-we-cover" className="text-xl font-semibold text-ink mb-3">What we cover</h2>
      <p>We publish software comparisons, reviews and practical guides on AI assistants, email platforms, automation and running a lean software stack. Free planning tools help readers structure tasks and compare costs.</p>
    </section>

    <section aria-labelledby="editorial-approach" className="border-t border-line pt-7 mb-8">
      <h2 id="editorial-approach" className="text-xl font-semibold text-ink mb-3">Our editorial approach</h2>
      <p>Recommendations are conditional on a defined use case. We distinguish provider documentation, editorial interpretation and any documented hands-on observations. Missing test records and unresolved questions are stated rather than presented as established experience.</p>
      <p className="mt-3">A useful recommendation also explains when an existing tool or manual process is sufficient. Some links may earn an affiliate commission; commercial relationships do not determine editorial conclusions, and compensated links are disclosed before they appear.</p>
      <p className="mt-4"><Link to="/methodology" className="text-link underline underline-offset-4">Read our review methodology</Link></p>
    </section>

    <section aria-labelledby="editorial-responsibility" className="border-t border-line pt-7 mb-8">
      <h2 id="editorial-responsibility" className="text-xl font-semibold text-ink mb-3">Editorial responsibility</h2>
      <p>{AUTHOR_NAME}, the founder of Domsky Solutions, is responsible for the published editorial judgment. AI tools may assist with drafting and production; their involvement does not establish that a product was tested.</p>
    </section>

    <section aria-labelledby="contact" className="border-t border-line pt-7">
      <h2 id="contact" className="text-xl font-semibold text-ink mb-3">Contact</h2>
      <p>For corrections, questions or review inquiries, email <a href="mailto:domskysolutions@gmail.com" className="text-link underline underline-offset-4 break-words">domskysolutions@gmail.com</a>. For a correction, include the page and a supporting source.</p>
      <p className="mt-3">Supplied access and commercial relationships must be disclosed. They do not guarantee coverage or a favorable conclusion.</p>
    </section>
  </main>
);
