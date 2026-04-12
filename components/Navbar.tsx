
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowRight, ChevronDown } from 'lucide-react';
import { toolsDropdown } from '../data/navigation';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const [isMobileToolsOpen, setIsMobileToolsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-brand-bg/90 backdrop-blur-md border-b border-brand-surface' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <img
                src="/images/domsky-logo.png"
                alt="Domsky Solutions"
                style={{ 
                  height: '40px', 
                  width: 'auto', 
                  objectFit: 'contain' 
                }}
              />
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-300 hover:text-brand-cyan transition-colors text-sm font-medium">Home</Link>
            
            <div 
              className="relative"
              onMouseEnter={() => setIsToolsOpen(true)}
              onMouseLeave={() => setIsToolsOpen(false)}
            >
              <button className="flex items-center gap-1 text-gray-300 hover:text-brand-cyan transition-colors text-sm font-medium py-2">
                Tools <ChevronDown size={14} className={`transition-transform duration-200 ${isToolsOpen ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {isToolsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 w-72 bg-[#1a1a2e] border border-gray-500/20 rounded-lg shadow-xl overflow-hidden mt-1"
                  >
                    <div className="py-2">
                      {toolsDropdown.map((item, idx) => (
                        <Link 
                          key={idx} 
                          to={item.link}
                          className="flex items-start gap-3 px-4 py-3 hover:bg-white/5 border-l-2 border-transparent hover:border-brand-cyan transition-colors group"
                        >
                          <span className="text-base mt-0.5">{item.icon}</span>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-white font-bold text-sm group-hover:text-brand-cyan transition-colors">{item.title}</span>
                              {item.badge && (
                                <span className="bg-brand-cyan/10 text-brand-cyan text-[10px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            <div className="text-gray-400 text-xs mt-0.5">{item.description}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link to="/blog" className="text-gray-300 hover:text-brand-cyan transition-colors text-sm font-medium">Blog</Link>
            <Link to="/about" className="text-gray-300 hover:text-brand-cyan transition-colors text-sm font-medium">About</Link>
            <a href="/#newsletter" className="bg-brand-amber text-brand-bg px-5 py-2.5 rounded-none font-bold text-sm hover:bg-yellow-400 transition-colors glow-amber-hover flex items-center gap-2">
              Join the Community
            </a>
          </div>
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 hover:text-white">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-brand-surface border-b border-gray-800 overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link to="/" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-brand-cyan">Home</Link>
              
              <div>
                <button 
                  onClick={() => setIsMobileToolsOpen(!isMobileToolsOpen)} 
                  className="flex items-center justify-between w-full px-3 py-2 text-base font-medium text-gray-300 hover:text-brand-cyan"
                >
                  Tools <ChevronDown size={16} className={`transition-transform duration-200 ${isMobileToolsOpen ? 'rotate-180' : ''}`} />
                </button>
                
                <AnimatePresence>
                  {isMobileToolsOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pl-4 py-1 space-y-1">
                        {toolsDropdown.map((item, idx) => (
                          <Link 
                            key={idx}
                            to={item.link} 
                            onClick={() => setIsOpen(false)} 
                            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-400 hover:text-brand-cyan"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan"></span>
                            {item.title}
                            {item.badge && (
                              <span className="bg-brand-cyan/10 text-brand-cyan text-[10px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider ml-1">
                                🆕
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link to="/blog" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-brand-cyan">Blog</Link>
              <Link to="/about" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-brand-cyan">About</Link>
              <a href="/#newsletter" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-brand-amber">Join the Community</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
