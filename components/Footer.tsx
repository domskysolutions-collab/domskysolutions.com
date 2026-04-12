
import React from 'react';
import { Link } from 'react-router-dom';
import { ConvertKitForm } from './ConvertKitForm';

export const Footer = () => {
  return (
    <footer className="bg-[#08090a] pt-20 pb-10 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center mb-4">
              <img
                src="/images/domsky-logo.png"
                alt="Domsky Solutions"
                style={{ 
                  height: '36px', 
                  width: 'auto', 
                  objectFit: 'contain',
                  opacity: 0.9
                }}
              />
            </Link>
            <p className="text-gray-400 text-sm mb-6 max-w-sm">
              Independent. Ad-free. Builder-focused. We curate the best AI tools, software reviews, and news for builders and founders.
            </p>
          </div>
          
          <div>
            <h4 className="font-mono font-bold text-white mb-4">Explore</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/tools" className="hover:text-brand-cyan transition-colors">AI Tool Reviews</Link></li>
              <li><Link to="/reviews" className="hover:text-brand-cyan transition-colors">SaaS Reviews</Link></li>
              <li><Link to="/tools/prompt-builder" className="hover:text-brand-cyan transition-colors">Prompt Builder</Link></li>
              <li><Link to="/tools/saas-calculator" className="hover:text-brand-cyan transition-colors">SaaS Calculator</Link></li>
              <li><Link to="/blog" className="hover:text-brand-cyan transition-colors">Blog</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-mono font-bold text-white mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/about" className="hover:text-brand-cyan transition-colors">About</Link></li>
              <li><a href="mailto:team@domskysolutions.com" className="hover:text-brand-cyan transition-colors">Contact</a></li>
              <li><a href="mailto:partners@domskysolutions.com" className="hover:text-brand-cyan transition-colors">Advertise</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-mono font-bold text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/privacy" className="hover:text-brand-cyan transition-colors">Privacy Policy</Link></li>
              <li><Link to="/disclaimer" className="hover:text-brand-cyan transition-colors">Disclaimer</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs font-mono">
            © 2026 domskysolutions.com — All rights reserved
          </p>
          <p className="text-gray-600 text-xs">
            domskysolutions.com is independent. We may earn commissions from affiliate links.
          </p>
        </div>
      </div>
    </footer>
  );
};
