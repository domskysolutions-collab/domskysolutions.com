
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export const NotFoundPage = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-20 relative overflow-hidden">
      
      <div className="relative z-10 text-center max-w-2xl mx-auto">
        <h1 className="text-8xl md:text-9xl font-bold font-mono text-link mb-6 tracking-tighter">
          404
        </h1>
        <h2 className="text-3xl md:text-4xl font-bold text-ink mb-4">
          This page doesn't exist
        </h2>
        <p className="text-xl text-secondary mb-10">
          The page you are looking for has moved or never existed.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/" className="w-full sm:w-auto border border-brand-cyan text-link px-8 py-4 font-bold text-lg hover:bg-callout transition-colors flex items-center justify-center">
            Go Home →
          </Link>
          <Link to="/tools" className="w-full sm:w-auto bg-action text-brand-bg px-8 py-4 font-bold text-lg hover:bg-action-hover transition-all  flex items-center justify-center gap-2">
            Browse AI Tools →
          </Link>
        </div>
      </div>
    </div>
  );
};
