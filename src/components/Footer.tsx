
import React from 'react';
import { Link } from 'react-router-dom';
import { ConvertKitForm } from './ConvertKitForm';

export const Footer = () => {
  return (
    <footer className="bg-brand-bg pt-20 pb-10 border-t border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center mb-4">
              <span className="text-ink font-mono font-bold tracking-wide">Domsky Solutions</span>
            </Link>
            <p className="text-secondary text-sm mb-6 max-w-sm">
              Independent. Ad-free. Builder-focused. I curate practical AI tools, software reviews, and news for builders and founders.
            </p>
          </div>
          
          <div>
            <h2 className="font-mono font-bold text-ink mb-4">Explore</h2>
            <ul className="space-y-2 text-sm text-secondary">
              <li><Link to="/#stack-finder" className="hover:text-link transition-colors">Lean AI & SaaS Stack Finder</Link></li>
              <li><Link to="/uses" className="hover:text-link transition-colors">Lean tool stack</Link></li>
              <li><Link to="/tools" className="hover:text-link transition-colors">Free Tools</Link></li>
              <li><Link to="/reviews" className="hover:text-link transition-colors">AI & SaaS Reviews</Link></li>
              <li><Link to="/tools/prompt-builder" className="hover:text-link transition-colors">Prompt Builder</Link></li>
              <li><Link to="/tools/ai-readiness-quiz" className="hover:text-link transition-colors">AI Readiness Quiz</Link></li>
              <li><Link to="/tools/saas-calculator" className="hover:text-link transition-colors">Software Stack Audit</Link></li>
              <li><Link to="/tools/content-calendar" className="hover:text-link transition-colors">Content Calendar</Link></li>
              <li><Link to="/blog" className="hover:text-link transition-colors">Blog</Link></li>
            </ul>
          </div>
          
          <div>
            <h2 className="font-mono font-bold text-ink mb-4">Company</h2>
            <ul className="space-y-2 text-sm text-secondary">
              <li><Link to="/methodology" className="hover:text-link transition-colors">Review Methodology</Link></li>
              <li><Link to="/comparisons" className="hover:text-link transition-colors">Comparisons</Link></li>
              <li><Link to="/about" className="hover:text-link transition-colors">About</Link></li>
              <li><a href="mailto:domskysolutions@gmail.com" className="hover:text-link transition-colors">Contact</a></li>
              <li><a href="mailto:domskysolutions@gmail.com" className="hover:text-link transition-colors">Advertise</a></li>
            </ul>
          </div>
          
          <div>
            <h2 className="font-mono font-bold text-ink mb-4">Legal</h2>
            <ul className="space-y-2 text-sm text-secondary">
              <li><Link to="/privacy" className="hover:text-link transition-colors">Privacy Policy</Link></li>
              <li><Link to="/disclaimer" className="hover:text-link transition-colors">Disclaimer</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="flex items-center justify-center gap-4 mb-8">
          <a 
            href="https://x.com/domskysolutions"
            target="_blank"
            rel="noopener noreferrer"
            className="text-secondary hover:text-link transition-colors duration-200"
            aria-label="Follow on X"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="currentColor"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.213 5.567L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>
            </svg>
          </a>
        </div>

        <div className="pt-8 border-t border-line flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-subtle text-xs font-mono">
            © 2026 domskysolutions.com — All rights reserved
          </p>
          <p className="text-subtle text-xs">
            domskysolutions.com is independent. I may earn commissions from affiliate links.
          </p>
        </div>
      </div>
    </footer>
  );
};


