
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export const NotFoundPage = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-20 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-64 bg-brand-cyan/10 blur-[100px] rounded-full pointer-events-none"></div>
      
      <div className="relative z-10 text-center max-w-2xl mx-auto">
        <h1 className="text-8xl md:text-9xl font-bold font-mono text-brand-cyan mb-6 tracking-tighter">
          404
        </h1>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          This page doesn't exist
        </h2>
        <p className="text-xl text-gray-400 mb-10">
          The page you are looking for has moved or never existed.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/" className="w-full sm:w-auto border border-brand-cyan text-brand-cyan px-8 py-4 font-bold text-lg hover:bg-brand-cyan/10 transition-colors flex items-center justify-center">
            Go Home →
          </Link>
          <Link to="/tools" className="w-full sm:w-auto bg-brand-cyan text-brand-bg px-8 py-4 font-bold text-lg hover:bg-teal-400 transition-all glow-cyan flex items-center justify-center gap-2">
            Browse AI Tools →
          </Link>
        </div>
      </div>
    </div>
  );
};
