
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Star, ExternalLink } from 'lucide-react';
import { saasReviews } from '../data/saasReviews';
import { ConvertKitForm } from '../components/ConvertKitForm';

export const ReviewsPage = () => {
  useEffect(() => {
    document.title = "SaaS Software Reviews | domskysolutions.com";
  }, []);

  return (
    <div className="bg-brand-bg min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-mono text-white mb-4">SaaS Software Reviews</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">In-depth breakdowns of the tools builders actually pay for</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {saasReviews.map((review, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-brand-surface border border-gray-800 p-6 flex flex-col h-full transition-all duration-300 hover:border-brand-amber group"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 bg-gray-800 flex items-center justify-center text-xl font-bold text-gray-500 group-hover:text-brand-amber transition-colors">
                  {review.name.charAt(0)}
                </div>
                <div className="text-right">
                  <div className="text-2xl font-mono font-bold text-white">{review.score}<span className="text-gray-500 text-sm">/10</span></div>
                </div>
              </div>
              <h3 className="text-xl font-bold font-mono mb-2">{review.name}</h3>
              <p className="text-gray-400 text-sm mb-4">Best for: <span className="text-gray-200">{review.bestFor}</span></p>
              <div className="mb-6 flex-grow">
                <span className="inline-block px-2 py-1 bg-brand-amber/10 text-brand-amber text-xs font-mono border border-brand-amber/20">
                  {review.tag}
                </span>
              </div>
              <Link to={review.link} className="inline-flex items-center gap-2 text-sm font-bold text-brand-cyan hover:text-white transition-colors mt-auto">
                Read Review <ArrowRight size={16} />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
