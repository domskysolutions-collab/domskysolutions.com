
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { reviewCatalog } from '../data/reviewCatalog';
const reviews = [...reviewCatalog.map(r => ({ name: r.name, bestFor: r.category, tag: 'Editorial review', link: r.link })), { name: 'Kit (ConvertKit)', bestFor: 'Newsletters', tag: 'Evidence-based review', link: '/reviews/convertkit' }, { name: 'Namecheap', bestFor: 'Domains and hosting', tag: 'Editorial review', link: '/reviews/namecheap' }];

export const ReviewsPage = () => {
  return (
    <div className="bg-brand-bg min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-mono text-ink mb-4">AI & SaaS Reviews</h1>
          <p className="text-xl text-secondary max-w-2xl mx-auto">All my software reviews in one place. Each review explains its evidence, limitations and intended use case.</p>
        </div>
        
        <p className="mb-8 text-center text-secondary"><Link to="/methodology" className="text-link underline">How I review software</Link><span aria-hidden="true"> · </span><Link to="/uses" className="text-link underline">Start with the lean stack guide</Link></p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-brand-surface border border-line p-6 flex flex-col h-full transition-all duration-300 hover:border-brand-amber group"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 bg-surface flex items-center justify-center text-xl font-bold text-subtle group-hover:text-emphasis transition-colors">
                  {review.name.charAt(0)}
                </div>
              </div>
              <h2 className="text-xl font-bold font-mono mb-2">{review.name}</h2>
              <p className="text-secondary text-sm mb-4">Best for: <span className="text-ink">{review.bestFor}</span></p>
              <div className="mb-6 flex-grow">
                <span className="inline-block px-2 py-1 bg-callout text-emphasis text-xs font-mono border border-brand-amber">
                  {review.tag}
                </span>
              </div>
              <Link to={review.link} className="inline-flex items-center gap-2 text-sm font-bold text-link hover:text-ink transition-colors mt-auto">
                Read {review.name} review <ArrowRight size={16} />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

