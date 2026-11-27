import React from 'react';
import { Link } from 'react-router-dom';
import { guideGroups } from '../data/guideCatalog';
import { reviewCatalog } from '../data/reviewCatalog';

const reviews = [
  ...reviewCatalog.map(review => ({ name: review.name, link: review.link })),
  { name: 'Kit (ConvertKit)', link: '/reviews/convertkit' },
  { name: 'Namecheap', link: '/reviews/namecheap' },
];

export const GuidesPage = () => (
  <main className="bg-brand-bg min-h-screen pt-36 pb-20">
    <div className="max-w-[900px] mx-auto px-6 sm:px-8">
      <header className="max-w-3xl mb-12">
        <p className="font-mono text-xs uppercase tracking-widest text-link mb-4">Domsky Solutions / Guides</p>
        <h1 className="text-4xl sm:text-5xl font-semibold text-ink leading-tight mb-5" style={{ fontFamily: 'var(--font-serif)' }}>Practical guides for running a solo business.</h1>
        <p className="text-lg text-secondary leading-relaxed">Work through a software decision, improve a repeatable task or check a proposed change before paying for another tool.</p>
      </header>
      {guideGroups.map(group => (
        <section key={group.title} aria-label={group.title} className="border-t border-line pt-7 mb-12">
          <h2 className="text-2xl font-semibold text-ink mb-3">{group.title}</h2>
          <p className="text-secondary leading-relaxed mb-3">{group.description}</p>
          <ul className="divide-y divide-line">
            {group.articles.map(article => (
              <li key={article.slug} className="py-6">
                <h3 className="text-xl font-semibold leading-snug mb-2"><Link to={article.slug} className="text-link underline underline-offset-4">{article.title}</Link></h3>
                <p className="text-secondary leading-relaxed max-w-3xl">{article.excerpt}</p>
                <p className="text-sm text-subtle mt-3">{article.readTime}</p>
              </li>
            ))}
          </ul>
        </section>
      ))}
      <aside className="border-t border-line pt-7 mb-12 text-secondary leading-relaxed">
        <p>Choosing between specific products? <Link to="/comparisons" className="text-link underline underline-offset-4">Read the comparisons</Link>. To work through your own inputs, <Link to="/tools" className="text-link underline underline-offset-4">open the free planning tools</Link>.</p>
      </aside>
      <section id="product-reviews" aria-labelledby="product-reviews-title" className="border-t border-line pt-7 scroll-mt-32">
        <h2 id="product-reviews-title" className="text-xl font-semibold text-ink mb-3">Product review archive</h2>
        <p className="text-sm text-secondary leading-relaxed mb-4">Existing product reviews remain available separately from these guides. Read each review’s evidence limits and check current provider information before choosing a plan.</p>
        <details className="text-secondary">
          <summary className="text-link cursor-pointer py-2 underline underline-offset-4">Browse product reviews</summary>
          <ul className="mt-3 grid gap-x-8 gap-y-3 sm:grid-cols-2">
            {reviews.map(review => <li key={review.link}><Link to={review.link} className="text-link underline underline-offset-4">{review.name} review</Link></li>)}
          </ul>
        </details>
        <p className="text-sm mt-5"><Link to="/methodology" className="text-link underline underline-offset-4">How to read the evidence</Link></p>
      </section>
    </div>
  </main>
);
