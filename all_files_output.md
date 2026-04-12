

### src/components/Navbar.tsx

```tsx

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

```


### src/components/Footer.tsx

```tsx

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

```


### src/pages/HomePage.tsx

```tsx

import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';
import { BLOG_POSTS } from '../data/blogPosts';
import { BlogCard } from '../components/BlogCard';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Star, ExternalLink, PenTool, Palette, Code, Megaphone, Zap, Video, Mic, FlaskConical, TrendingUp, Clock, Target, Shield, Sparkles } from 'lucide-react';
import { ConvertKitForm } from '../components/ConvertKitForm';
import { featuredTools } from '../data/navigation';
import { saasReviews } from '../data/saasReviews';

const newsArticles = [
  { tag: 'News', title: 'OpenAI Drops GPT-5: What Founders Need to Know', date: 'Apr 24, 2026', excerpt: 'The highly anticipated model brings agentic capabilities and massive context windows to the masses.' },
  { tag: 'Research', title: 'Anthropic\'s Claude Gets Memory — Here\'s What Changes', date: 'Apr 22, 2026', excerpt: 'Claude can now remember your preferences across sessions, making it a true personalized assistant.' },
  { tag: 'Launch', title: 'Top 10 AI Tools Replacing Traditional SaaS in 2025', date: 'Apr 20, 2026', excerpt: 'From CRM to design, these AI-native platforms are eating into the market share of legacy software.' },
];
export const categories = [
  { name: 'Writing', icon: PenTool },
  { name: 'Design', icon: Palette },
  { name: 'Coding', icon: Code },
  { name: 'Marketing', icon: Megaphone },
  { name: 'Productivity', icon: Zap },
  { name: 'Video', icon: Video },
  { name: 'Audio', icon: Mic },
  { name: 'Research', icon: FlaskConical },
];
export const AI_ALTERNATIVES = [
  {
    id: "writing",
    name: "Claude Pro",
    cost: 20,
    triggers: ["writingTool", "copywriter", "contentAgency"]
  },
  {
    id: "research",
    name: "Perplexity Pro",
    cost: 20,
    triggers: ["newsSubs", "researchTools"]
  },
  {
    id: "design",
    name: "Midjourney Standard",
    cost: 30,
    triggers: ["adobe", "canva", "stockPhoto", "graphicDesigner"]
  },
  {
    id: "dev",
    name: "Cursor Pro + Framer",
    cost: 40,
    triggers: ["devRetainer", "websiteBuilder", "nocodeTool"]
  },
  {
    id: "video",
    name: "Descript + ElevenLabs",
    cost: 29,
    triggers: ["videoEditor", "podcastEditor", "voiceover"]
  },
  {
    id: "productivity",
    name: "Notion AI",
    cost: 26,
    triggers: ["noteTaking", "projectManagement"]
  },
  {
    id: "other",
    name: "Various AI tools",
    cost: 20,
    triggers: ["otherSubs"]
  }
];
export const RECOMMENDED_TOOLS = [
  {
    id: "claude",
    name: "Claude",
    desc: "Advanced AI assistant for writing and analysis.",
    link: "/tools/claude",
    triggers: ["writingTool", "copywriter", "contentAgency"]
  },
  {
    id: "perplexity",
    name: "Perplexity",
    desc: "AI search engine that provides cited answers.",
    link: "/tools/perplexity",
    triggers: ["newsSubs", "researchTools"]
  },
  {
    id: "midjourney",
    name: "Midjourney",
    desc: "Industry-leading AI image generation model.",
    link: "/reviews/midjourney",
    triggers: ["adobe", "canva", "stockPhoto", "graphicDesigner"]
  },
  {
    id: "cursor",
    name: "Cursor",
    desc: "The AI-first code editor that actually works.",
    link: "/tools/cursor",
    triggers: ["devRetainer", "websiteBuilder", "nocodeTool"]
  },
  {
    id: "framer",
    name: "Framer",
    desc: "Design and ship websites with AI assistance.",
    link: "/reviews/framer",
    triggers: ["devRetainer", "websiteBuilder", "nocodeTool"]
  },
  {
    id: "descript",
    name: "Descript",
    desc: "Edit video and audio as easily as a text document.",
    link: "/reviews/descript",
    triggers: ["videoEditor", "podcastEditor", "voiceover"]
  },
  {
    id: "elevenlabs",
    name: "ElevenLabs",
    desc: "The most realistic AI voice generator available.",
    link: "/tools/elevenlabs",
    triggers: ["videoEditor", "podcastEditor", "voiceover"]
  },
  {
    id: "notion-ai",
    name: "Notion AI",
    desc: "Connected workspace with integrated AI assistant.",
    link: "/tools/notion-ai",
    triggers: ["noteTaking", "projectManagement"]
  }
];

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-grid-pattern">
      <div className="scanline"></div>
      
      {/* Radial gradient for background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,245,212,0.05)_0%,transparent_50%)] pointer-events-none"></div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-surface border border-brand-cyan/30 text-brand-cyan text-xs font-mono mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-cyan opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-cyan"></span>
          </span>
          🔥 Updated Weekly
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold font-mono tracking-tight mb-6 leading-tight"
        >
          The AI Tools That <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-blue-500">Actually Move the Needle</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl md:text-2xl text-gray-400 mb-10 max-w-3xl mx-auto font-light"
        >
          Weekly drops on the best AI software, SaaS deals, and tech breakthroughs — curated for builders.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a href="#tools" className="bg-brand-cyan text-brand-bg px-8 py-4 font-bold text-lg hover:bg-teal-400 transition-all glow-cyan flex items-center justify-center gap-2 group">
            Explore AI Tools 
            <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
          </a>
          <a href="#news" className="bg-transparent border border-gray-600 text-white px-8 py-4 font-bold text-lg hover:border-white hover:bg-brand-surface transition-all flex items-center justify-center">
            Read Latest News
          </a>
        </motion.div>
      </div>
    </section>
  );
};
const FeaturedTools = () => {
  return (
    <section id="tools" className="py-24 bg-brand-bg relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold font-mono mb-4">Top AI Tools This Week</h2>
            <p className="text-gray-400">Hand-picked software to accelerate your workflow.</p>
          </div>
          <Link to="/tools" className="hidden md:flex items-center gap-2 text-brand-cyan hover:underline font-mono text-sm">
            View All Tools <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredTools.map((tool, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-brand-surface border border-gray-800 p-6 flex flex-col h-full transition-all duration-300 glow-cyan-hover group"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="px-2.5 py-1 bg-gray-800 text-gray-300 text-xs font-mono uppercase tracking-wider">
                  {tool.category}
                </span>
                <div className="flex items-center gap-1 text-brand-amber text-sm font-mono">
                  <Star size={14} fill="currentColor" /> {tool.rating}
                </div>
              </div>
              <h3 className="text-2xl font-bold font-mono mb-3 group-hover:text-brand-cyan transition-colors">{tool.name}</h3>
              <p className="text-gray-400 mb-6 flex-grow text-sm leading-relaxed">{tool.desc}</p>
              <Link to={`/tools/${tool.id}`} className="inline-flex items-center gap-2 text-sm font-bold text-white group-hover:text-brand-cyan transition-colors mt-auto">
                Read Review <ArrowRight size={16} />
              </Link>
            </motion.div>
          ))}
        </div>
        <div className="mt-8 text-center md:hidden">
          <Link to="/tools" className="inline-flex items-center gap-2 text-brand-cyan hover:underline font-mono text-sm">
            View All Tools <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};
const SaasReviews = () => {
  return (
    <section id="reviews" className="py-24 bg-[#0a0c0e] border-y border-gray-800 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold font-mono mb-12">In-Depth SaaS Reviews</h2>
        
        {/* Horizontal scroll container */}
        <div className="flex overflow-x-auto pb-8 -mx-4 px-4 sm:mx-0 sm:px-0 gap-6 snap-x snap-mandatory hide-scrollbar" style={{ scrollbarWidth: 'none' }}>
          {saasReviews.map((review, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="min-w-[300px] md:min-w-[350px] bg-brand-surface border border-gray-800 p-6 snap-start flex-shrink-0 group hover:border-brand-amber transition-colors"
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
              <div className="mb-6">
                <span className="inline-block px-2 py-1 bg-brand-amber/10 text-brand-amber text-xs font-mono border border-brand-amber/20">
                  {review.tag}
                </span>
              </div>
              <Link to={review.link} className="inline-flex items-center gap-2 text-sm font-bold text-brand-cyan hover:text-white transition-colors">
                Read Review <ArrowRight size={16} />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
const AiNews = () => {
  return (
    <section id="news" className="py-24 bg-brand-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-mono">Latest in AI</h2>
          <Link to="/blog" className="hidden md:flex items-center gap-2 text-brand-cyan hover:underline font-mono text-sm">
            All News <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {newsArticles.map((article, index) => (
            <motion.article 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="mb-4 flex items-center gap-3">
                <span className="text-brand-cyan text-xs font-mono uppercase tracking-wider">{article.tag}</span>
                <span className="text-gray-600 text-xs font-mono">{article.date}</span>
              </div>
              <h3 className="text-xl font-bold font-mono mb-3 group-hover:text-brand-cyan transition-colors leading-snug">
                {article.title}
              </h3>
              <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                {article.excerpt}
              </p>
              <span className="inline-flex items-center gap-1 text-sm font-bold text-gray-300 group-hover:text-white transition-colors">
                Read More <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
const CategoryExplorer = () => {
  return (
    <section className="py-24 bg-brand-surface border-y border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold font-mono mb-12">Explore by Category</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {categories.map((cat, index) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Link to="/tools" className="flex flex-col items-center justify-center p-6 bg-brand-bg border border-gray-800 hover:border-brand-cyan hover:bg-brand-cyan/5 transition-all group h-full">
                  <Icon size={32} className="text-gray-500 mb-4 group-hover:text-brand-cyan transition-colors" />
                  <span className="font-mono text-sm font-bold group-hover:text-brand-cyan transition-colors">{cat.name}</span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
const Newsletter = () => {
  return (
    <section id="newsletter" className="py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-brand-cyan/5"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-64 bg-brand-cyan/20 blur-[100px] rounded-full pointer-events-none"></div>
      
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold font-mono mb-6">Stay Ahead of the AI Curve</h2>
          <p className="text-xl text-gray-300 mb-10 font-light">
            Join our growing community of AI enthusiasts getting weekly AI tool picks, deals & news straight to their inbox.
          </p>
          
          <ConvertKitForm 
            className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto mb-6"
            inputClassName="flex-grow bg-brand-surface border border-gray-700 px-6 py-4 text-white focus:outline-none focus:border-brand-cyan transition-colors font-mono text-sm"
            buttonClassName="bg-brand-amber text-brand-bg px-8 py-4 font-bold hover:bg-yellow-400 transition-colors glow-amber-hover whitespace-nowrap"
            buttonText="Subscribe Free"
          />
          
          <div className="flex flex-wrap justify-center items-center gap-6 text-xs font-mono text-gray-500">
            <span className="flex items-center gap-1"><CheckCircle2 size={14} className="text-brand-cyan" /> No spam.</span>
            <span className="flex items-center gap-1"><CheckCircle2 size={14} className="text-brand-cyan" /> Unsubscribe anytime.</span>
            <span className="flex items-center gap-1"><CheckCircle2 size={14} className="text-brand-cyan" /> Free forever.</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export const HomePage = () => {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);
  const [count4, setCount4] = useState(0);
  
  const statsRef = useRef(null);
  const isInView = useInView(statsRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;
    
    const duration = 2000;
    const steps = 60;
    const stepTime = duration / steps;
    
    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      setCount1(Math.floor((10 / steps) * currentStep));
      setCount2(Math.floor((5 / steps) * currentStep));
      setCount3(Math.floor((3 / steps) * currentStep));
      setCount4(Math.floor((100 / steps) * currentStep));
      
      if (currentStep >= steps) {
        clearInterval(timer);
        setCount1(10);
        setCount2(5);
        setCount3(3);
        setCount4(100);
      }
    }, stepTime);
    
    return () => clearInterval(timer);
  }, [isInView]);

  return (
    <main className="bg-brand-bg min-h-screen">
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-grid-pattern">
        <div className="absolute top-20 left-10 w-64 h-64 bg-brand-cyan/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-brand-amber/20 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-6 px-4 py-1.5 rounded-full border border-brand-amber/30 bg-brand-amber/10 text-brand-amber font-mono text-sm animate-pulse-glow"
          >
            🔥 Updated Weekly — April 2026
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold font-mono text-white leading-tight mb-6"
          >
            I Test AI Tools So You Don't Waste Your Time
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            No hype. No recycled lists. Just AI tools that actually save time — tested daily by a designer.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <Link to="/tools" className="w-full sm:w-auto bg-brand-amber text-brand-bg px-8 py-4 font-bold text-lg hover:bg-yellow-400 transition-colors glow-amber-hover flex items-center justify-center gap-2">
              Explore Tools That Actually Work <ArrowRight size={20} />
            </Link>
            <Link to="/reviews" className="w-full sm:w-auto border border-brand-cyan text-brand-cyan px-8 py-4 font-bold text-lg hover:bg-brand-cyan/10 transition-colors flex items-center justify-center">
              See Latest Reviews <ArrowRight size={20} />
            </Link>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col items-center gap-2"
          >
            <p className="text-sm text-gray-400 font-mono">25+ years building on PCs. Graphic designer. I only keep what works.</p>
            <p className="text-xs text-gray-500 font-mono mt-2">Most AI tools are a waste of time. I test them so you don't have to.</p>
          </motion.div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce-slow text-gray-500">
          <ArrowRight size={24} className="rotate-90" />
        </div>
      </section>

      {/* PROBLEM/AGITATION SECTION */}
      <section className="py-24 bg-brand-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-brand-cyan font-mono text-sm uppercase tracking-widest mb-4 block">SOUND FAMILIAR?</span>
            <h2 className="text-3xl md:text-5xl font-bold font-mono text-white max-w-3xl mx-auto leading-tight">
              You're drowning in AI tool noise.<br />I cut through it for you.
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-brand-bg p-8 border border-gray-800 rounded-xl"
            >
              <div className="text-4xl mb-4">😤</div>
              <h3 className="text-xl font-bold font-mono text-white mb-4">Too Many Choices</h3>
              <p className="text-gray-400 leading-relaxed">
                New AI tools launch every day. Most are hype. A few are game changers. I find the ones that actually matter.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-brand-bg p-8 border border-gray-800 rounded-xl"
            >
              <div className="text-4xl mb-4">💸</div>
              <h3 className="text-xl font-bold font-mono text-white mb-4">Wasting Money</h3>
              <p className="text-gray-400 leading-relaxed">
                Paying for tools that underdeliver? I test them so you don't have to waste another subscription dollar.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-brand-bg p-8 border border-gray-800 rounded-xl"
            >
              <div className="text-4xl mb-4">⏰</div>
              <h3 className="text-xl font-bold font-mono text-white mb-4">No Time to Research</h3>
              <p className="text-gray-400 leading-relaxed">
                You need to build, not spend hours reading reviews. I do the research. You get the signal.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* REVIEWS SECTION */}
      <section className="py-24 bg-brand-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <span className="text-brand-cyan font-mono text-sm uppercase tracking-widest mb-4 block">WHAT YOU GET</span>
            <h2 className="text-3xl md:text-5xl font-bold font-mono text-white leading-tight mb-4">
              Full Reviews (What's Actually Worth It)
            </h2>
            <p className="text-xl text-gray-400">No feature dumps — just what works, what doesn't, and who it's for.</p>
          </div>
          
          <div className="flex overflow-x-auto pb-8 -mx-4 px-4 sm:mx-0 sm:px-0 gap-6 snap-x snap-mandatory hide-scrollbar" style={{ scrollbarWidth: 'none' }}>
            {saasReviews.map((review, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="min-w-[300px] md:min-w-[350px] bg-brand-surface border border-gray-800 p-6 snap-start flex-shrink-0 group hover:border-brand-amber transition-colors rounded-xl"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 bg-gray-800 flex items-center justify-center text-xl font-bold text-gray-500 group-hover:text-brand-amber transition-colors rounded">
                    {review.name.charAt(0)}
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-mono font-bold text-white">{review.score}<span className="text-gray-500 text-sm">/10</span></div>
                  </div>
                </div>
                <h3 className="text-xl font-bold font-mono mb-2 text-white">{review.name}</h3>
                <p className="text-gray-400 text-sm mb-4">Best for: <span className="text-gray-200">{review.bestFor}</span></p>
                <div className="mb-6">
                  <span className="inline-block px-2 py-1 bg-brand-amber/10 text-brand-amber text-xs font-mono border border-brand-amber/20 rounded">
                    {review.tag}
                  </span>
                </div>
                <Link to={review.link} className="inline-flex items-center gap-2 text-sm font-bold text-brand-cyan hover:text-white transition-colors mt-auto">
                  Read Full Review <ArrowRight size={16} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED TOOLS PREVIEW */}
      <section className="py-24 bg-brand-surface border-y border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-brand-cyan font-mono text-sm uppercase tracking-widest mb-4 block">FEATURED THIS WEEK</span>
            <h2 className="text-3xl md:text-4xl font-bold font-mono text-white mb-4">AI Tools Worth Your Time</h2>
            <p className="text-gray-400">Tools I've actually tested — and would use again.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {featuredTools.slice(0, 3).map((tool, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-brand-bg border border-gray-800 p-6 flex flex-col h-full transition-all duration-300 glow-cyan-hover group rounded-xl"
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="px-2.5 py-1 bg-gray-800 text-gray-300 text-xs font-mono uppercase tracking-wider">
                    {tool.category}
                  </span>
                  <div className="flex items-center gap-1 text-brand-amber text-sm font-mono">
                    <Star size={14} fill="currentColor" /> {tool.rating}
                  </div>
                </div>
                <h3 className="text-2xl font-bold font-mono mb-3 group-hover:text-brand-cyan transition-colors text-white">{tool.name}</h3>
                <p className="text-gray-400 mb-4 flex-grow text-sm leading-relaxed">{tool.desc}</p>
                <div className="mb-6 p-3 bg-brand-surface border border-gray-800 rounded text-sm font-mono">
                  <span className="text-brand-cyan font-bold">My take:</span> <span className="text-gray-300">{tool.personalTake}</span>
                </div>
                <Link to={`/tools/${tool.id}`} className="inline-flex items-center gap-2 text-sm font-bold text-brand-cyan hover:text-white transition-colors mt-auto">
                  Read Full Review <ArrowRight size={16} />
                </Link>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center">
            <Link to="/reviews" className="inline-flex items-center gap-2 text-white hover:text-brand-cyan transition-colors font-mono font-bold">
              View all 10+ tool reviews <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF / STATS SECTION */}
      <section ref={statsRef} className="py-20 bg-[#0a0c0e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <div className="text-4xl md:text-5xl font-bold font-mono text-brand-cyan mb-2">{count1}+</div>
              <div className="text-gray-500 font-mono text-sm uppercase tracking-wider">AI Tools Reviewed</div>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <div className="text-4xl md:text-5xl font-bold font-mono text-brand-cyan mb-2">{count2}+</div>
              <div className="text-gray-500 font-mono text-sm uppercase tracking-wider">SaaS Deep Dives</div>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
              <div className="text-4xl md:text-5xl font-bold font-mono text-brand-cyan mb-2">{count3}</div>
              <div className="text-gray-500 font-mono text-sm uppercase tracking-wider">Weekly Blog Posts</div>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
              <div className="text-4xl md:text-5xl font-bold font-mono text-brand-cyan mb-2">{count4}%</div>
              <div className="text-gray-500 font-mono text-sm uppercase tracking-wider">Independent & Ad Free</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PERSONAL SECTION */}
      <section className="py-24 bg-brand-surface border-t border-gray-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-24 h-24 bg-gray-800 rounded-full mx-auto mb-6 flex items-center justify-center text-4xl border-2 border-brand-cyan">
            👨‍💻
          </div>
          <h2 className="text-3xl font-bold font-mono text-white mb-6">Hi, I'm Dom</h2>
          <p className="text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto">
            I'm a graphic designer and lifelong PC enthusiast. I test AI tools daily — most are overhyped. This site is where I keep the ones actually worth using.
          </p>
        </div>
      </section>

      {/* COMMUNITY / NEWSLETTER CTA */}
      <section id="newsletter" className="py-24 relative overflow-hidden bg-brand-bg">
        <div className="absolute inset-0 bg-brand-cyan/5" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-cyan/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold font-mono text-white mb-6 leading-tight">
            Get Only the AI Tools Worth Your Time
          </h2>
          <p className="text-xl text-gray-300 mb-10 leading-relaxed">
            I test tools daily. You get the few that actually work.
          </p>
          
          <ConvertKitForm 
            className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto mb-8"
            inputClassName="flex-grow bg-brand-surface border border-gray-700 px-6 py-4 text-white focus:outline-none focus:border-brand-cyan transition-colors"
            buttonClassName="bg-brand-amber text-brand-bg px-8 py-4 font-bold hover:bg-yellow-400 transition-colors glow-amber-hover whitespace-nowrap"
            buttonText="Get 1 Useful Tool Per Week →"
            placeholder="Enter your email address"
          />
          
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400 font-mono">
            <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-brand-cyan" /> No spam. No fluff. Unsubscribe anytime.</span>
          </div>
        </div>
      </section>

      {/* LATEST FROM THE BLOG */}
      <section className="py-24 bg-brand-surface border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-brand-cyan font-mono text-sm uppercase tracking-widest mb-4 block">LATEST INSIGHTS</span>
            <h2 className="text-3xl md:text-4xl font-bold font-mono text-white mb-4">What Actually Matters This Week</h2>
            <p className="text-gray-400">No noise. Just tools, updates, and ideas worth your attention.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {BLOG_POSTS.slice(0, 2).map((post, index) => (
              <BlogCard key={index} post={post} />
            ))}
          </div>
          
          <div className="text-center">
            <Link to="/blog" className="inline-flex items-center gap-2 text-white hover:text-brand-cyan transition-colors font-mono font-bold">
              View all articles <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="py-32 bg-brand-bg text-center border-t border-gray-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold font-mono text-white mb-10">Ready to build smarter?</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link to="/tools" className="w-full sm:w-auto bg-brand-cyan text-brand-bg px-8 py-4 font-bold text-lg hover:bg-[#00e0c2] transition-colors glow-cyan-hover flex items-center justify-center gap-2">
              Explore AI Tools <ArrowRight size={20} />
            </Link>
            <Link to="/blog" className="w-full sm:w-auto border border-gray-600 text-white px-8 py-4 font-bold text-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
              Read the Blog <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

```


### src/pages/AboutPage.tsx

```tsx

import React, { useEffect } from 'react';
import { useScroll } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';
import { H2, SectionDivider } from '../components/ui';
import { motion } from 'motion/react';
import { ConvertKitForm } from '../components/ConvertKitForm';

export const AboutPage = () => {
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    document.title = "About — domskysolutions.com";
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', "The person behind domskysolutions.com — Dominik, a 25-year tech veteran, graphic designer, and lifelong PC enthusiast who tests AI tools so you don't have to.");
  }, []);

  return (
    <div className="bg-brand-bg min-h-screen text-gray-300 font-sans pb-24">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-brand-cyan origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />
      
      <div className="max-w-[680px] mx-auto px-6 pt-32">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold font-mono text-white leading-tight mb-6">
            "25 Years in Tech.<br />No Hype. Just What Works."
          </h1>
          <p className="text-xl text-gray-400">
            Hi, I'm Dominik — I test AI tools so you don't have to.
          </p>

          <div className="flex items-center gap-6 my-12 p-6 bg-brand-surface border border-gray-800 rounded-xl">
            <img 
              src="/images/dominik-photo.jpg"
              alt="Dominik — founder"
              style={{ width: '80px', 
                       height: '80px', 
                       borderRadius: '50%',
                       objectFit: 'cover',
                       border: '2px solid #00F5D4'
              }}
            />
            <div>
              <div className="text-white font-bold text-lg">Dominik</div>
              <div className="text-gray-400 text-sm">Graphic & Web Designer</div>
              <div className="text-gray-500 text-xs mt-1">25-year tech veteran · PC enthusiast · AI tools tester</div>
            </div>
          </div>
        </motion.div>

        <div className="prose prose-invert max-w-none text-[18px] leading-[1.9] font-serif space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <H2>MY STORY</H2>
            <p>
              I got my first PC in the late 1990s and never stopped being obsessed with technology.
            </p>
            <p>
              25 years of graphic design, gaming, web building, and deep technical curiosity later — AI arrived and changed everything I thought I knew about what one person could build alone.
            </p>
            <p>
              I started this site because AI tools coverage online is mostly terrible. Listicles from people who spent an afternoon with each tool. Glowing reviews that hide the limitations. Affiliate farms dressed as journalism.
            </p>
            <p className="font-bold text-white">
              This is the alternative.
            </p>
          </motion.div>

          <SectionDivider />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8 not-prose">
              <div className="bg-[#1a1a2e] border-l-[3px] border-l-brand-cyan p-6 rounded-r-xl">
                <div className="text-3xl text-brand-amber mb-4">🎨</div>
                <h3 className="font-bold text-white mb-2 text-lg">Graphic & Web Designer</h3>
                <p className="text-sm text-gray-400 m-0 leading-relaxed">Professional eye for UI, aesthetics and what makes design actually work.</p>
              </div>
              <div className="bg-[#1a1a2e] border-l-[3px] border-l-brand-cyan p-6 rounded-r-xl">
                <div className="text-3xl text-brand-amber mb-4">🎮</div>
                <h3 className="font-bold text-white mb-2 text-lg">25-Year Gamer & PC Builder</h3>
                <p className="text-sm text-gray-400 m-0 leading-relaxed">Thousands of hours inside complex systems builds instinct for quality software.</p>
              </div>
              <div className="bg-[#1a1a2e] border-l-[3px] border-l-brand-cyan p-6 rounded-r-xl">
                <div className="text-3xl text-brand-amber mb-4">💻</div>
                <h3 className="font-bold text-white mb-2 text-lg">Self-Taught Coder</h3>
                <p className="text-sm text-gray-400 m-0 leading-relaxed">Enough to build real things and know when AI coding tools are helping vs hallucinating.</p>
              </div>
              <div className="bg-[#1a1a2e] border-l-[3px] border-l-brand-cyan p-6 rounded-r-xl">
                <div className="text-3xl text-brand-amber mb-4">🔍</div>
                <h3 className="font-bold text-white mb-2 text-lg">AI Tools Tester</h3>
                <p className="text-sm text-gray-400 m-0 leading-relaxed">Real usage over weeks — not demos. Every limitation included.</p>
              </div>
            </div>
          </motion.div>

          <SectionDivider />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <H2>THE DEAL</H2>
            <div className="space-y-8 my-8 not-prose">
              <div className="flex gap-4 items-start">
                <CheckCircle2 size={32} className="text-brand-cyan flex-shrink-0 mt-1" />
                <div>
                  <p className="font-bold text-white text-lg m-0">I only review tools I have personally used for real work — not demos, not press previews.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <CheckCircle2 size={32} className="text-brand-cyan flex-shrink-0 mt-1" />
                <div>
                  <p className="font-bold text-white text-lg m-0">I publish honest cons even when it costs me affiliate commission.</p>
                  <p className="text-gray-400 text-[15px] mt-1 mb-0">If a tool is not worth it I will say so clearly.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <CheckCircle2 size={32} className="text-brand-cyan flex-shrink-0 mt-1" />
                <div>
                  <p className="font-bold text-white text-lg m-0">Affiliate links are disclosed. They never influence ratings.</p>
                  <p className="text-gray-400 text-[15px] mt-1 mb-0">I have declined arrangements with tools I do not believe in.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <SectionDivider />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <H2>THE NUMBERS</H2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8 not-prose">
              <div className="bg-brand-surface border border-gray-800 p-6 rounded-lg text-center">
                <div className="text-4xl md:text-5xl font-bold font-mono text-brand-cyan mb-2">11+</div>
                <div className="text-sm text-gray-400">Tools Reviewed</div>
              </div>
              <div className="bg-brand-surface border border-gray-800 p-6 rounded-lg text-center">
                <div className="text-4xl md:text-5xl font-bold font-mono text-brand-cyan mb-2">4</div>
                <div className="text-sm text-gray-400">Blog Posts</div>
              </div>
              <div className="bg-brand-surface border border-gray-800 p-6 rounded-lg text-center">
                <div className="text-4xl md:text-5xl font-bold font-mono text-brand-cyan mb-2">25+</div>
                <div className="text-sm text-gray-400">Years in Tech</div>
              </div>
              <div className="bg-brand-surface border border-gray-800 p-6 rounded-lg text-center">
                <div className="text-4xl md:text-5xl font-bold font-mono text-brand-cyan mb-2">0</div>
                <div className="text-sm text-gray-400">Sponsored Posts</div>
              </div>
            </div>
          </motion.div>

          <SectionDivider />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <H2>WHAT'S HERE</H2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8 not-prose">
              <div className="bg-brand-surface border-t-[3px] border-t-brand-amber border-x border-b border-gray-800 p-6 rounded-b-xl">
                <div className="text-3xl text-brand-cyan mb-4">🔬</div>
                <h3 className="font-bold text-white mb-2 text-lg">AI Tool Reviews</h3>
                <p className="text-sm text-gray-400 m-0 leading-relaxed">Deep honest dives. Real usage. Real limitations.</p>
              </div>
              <div className="bg-brand-surface border-t-[3px] border-t-brand-amber border-x border-b border-gray-800 p-6 rounded-b-xl">
                <div className="text-3xl text-brand-cyan mb-4">⚖️</div>
                <h3 className="font-bold text-white mb-2 text-lg">SaaS Comparisons</h3>
                <p className="text-sm text-gray-400 m-0 leading-relaxed">Head to head. Who wins for your use case.</p>
              </div>
              <div className="bg-brand-surface border-t-[3px] border-t-brand-amber border-x border-b border-gray-800 p-6 rounded-b-xl">
                <div className="text-3xl text-brand-cyan mb-4">📧</div>
                <h3 className="font-bold text-white mb-2 text-lg">The Weekly Edge</h3>
                <p className="text-sm text-gray-400 m-0 leading-relaxed">Free Thursday newsletter. One tool. One tip. No spam ever.</p>
              </div>
            </div>
          </motion.div>

          <SectionDivider />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <H2>A NOTE ON AI</H2>
            <div className="bg-brand-surface border-l-4 border-l-brand-amber border-y border-r border-gray-800 p-6 rounded-r-lg my-8">
              <p className="m-0 text-gray-300">
                I use Claude, Perplexity and Cursor to help produce content here. I think it would be hypocritical not to — this is an AI tools site. But every review and every opinion is based on my own real experience. AI helps me write faster. It does not replace 25 years of context.
              </p>
            </div>
          </motion.div>

          <SectionDivider />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <H2>GET IN TOUCH</H2>
            <div className="my-8 space-y-3 not-prose">
              <div className="flex items-center gap-3">
                <span className="text-gray-400 w-20">General:</span>
                <a href="mailto:team@domskysolutions.com" className="text-brand-cyan hover:underline">team@domskysolutions.com</a>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-gray-400 w-20">Partners:</span>
                <a href="mailto:partners@domskysolutions.com" className="text-brand-cyan hover:underline">partners@domskysolutions.com</a>
              </div>
            </div>
            <p className="text-gray-400">
              I read every message. Review requests welcome — I publish what I actually find.
            </p>
          </motion.div>

          <div className="mt-24 mb-12 text-center not-prose">
            <p className="text-2xl md:text-3xl font-mono text-white font-bold leading-relaxed mb-12">
              Built by Dominik.<br />
              Tested on real work.<br />
              Trusted by builders.
            </p>
            
            <div className="relative z-10 bg-[#08090a] border border-brand-cyan/30 p-8 rounded-xl text-center max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold font-mono text-white mb-4">JOIN THE COMMUNITY</h2>
              <p className="text-gray-300 mb-6">
                The best way to stay connected is the weekly newsletter — <span className="font-bold text-white">The Weekly Edge</span>.
              </p>
              
              <ConvertKitForm 
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                inputClassName="flex-1 bg-brand-bg border border-gray-700 px-4 py-3 rounded text-white focus:outline-none focus:border-brand-cyan transition-colors"
                buttonClassName="bg-brand-amber text-brand-bg px-6 py-3 rounded font-bold hover:bg-yellow-400 transition-colors glow-amber-hover whitespace-nowrap"
                buttonText="Join the Community"
                placeholder="Enter your email"
              />
              <p className="text-xs text-gray-500 mt-4">
                Joining is free. Unsubscribing is one click. We have never sent spam and we never will.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

```


### src/pages/ToolsPage.tsx

```tsx

import React, { useEffect } from 'react';
import { featuredTools } from '../data/navigation';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Star, ExternalLink, PenTool, Palette, Code, Megaphone, Zap, Video, Mic, FlaskConical } from 'lucide-react';
import { toolReviews } from '../data/toolReviews';
import { ConvertKitForm } from '../components/ConvertKitForm';

export const ToolsPage = () => {
  useEffect(() => {
    document.title = "AI Tool Reviews | domskysolutions.com";
  }, []);

  return (
    <div className="bg-brand-bg min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-mono text-white mb-4">AI Tool Reviews</h1>
          <p className="text-xl text-gray-400">Tested. Rated. Honest.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredTools.map((tool, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-brand-surface border border-gray-800 p-6 flex flex-col h-full transition-all duration-300 glow-cyan-hover group"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="px-2.5 py-1 bg-gray-800 text-gray-300 text-xs font-mono uppercase tracking-wider">
                  {tool.category}
                </span>
                <div className="flex items-center gap-1 text-brand-amber text-sm font-mono">
                  <Star size={14} fill="currentColor" /> {tool.rating}
                </div>
              </div>
              <h3 className="text-2xl font-bold font-mono mb-3 group-hover:text-brand-cyan transition-colors">{tool.name}</h3>
              <p className="text-gray-400 mb-6 flex-grow text-sm leading-relaxed">{tool.desc}</p>
              <Link to={`/tools/${tool.id}`} className="inline-flex items-center gap-2 text-sm font-bold text-white group-hover:text-brand-cyan transition-colors mt-auto">
                Read Review <ArrowRight size={16} />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

```


### src/pages/ReviewsPage.tsx

```tsx

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

```


### src/pages/BlogIndex.tsx

```tsx

import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { BLOG_POSTS } from '../data/blogPosts';
import { BlogCard } from '../components/BlogCard';
import { ConvertKitForm } from '../components/ConvertKitForm';

export const BlogIndex = () => {
  useEffect(() => {
    document.title = "AI Insights & News | Domsky Solutions";
  }, []);

  return (
    <div className="bg-brand-bg min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-mono text-white mb-6">
            AI Insights & News
          </h1>
          <p className="text-xl text-gray-400">
            Deep dives, tool comparisons and industry analysis for builders and founders
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {BLOG_POSTS.map(post => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

```


### src/pages/PrivacyPage.tsx

```tsx

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { H2, SectionDivider } from '../components/ui';
import { motion } from 'motion/react';

export const PrivacyPage = () => {
  useEffect(() => {
    document.title = "Privacy Policy | Domsky Solutions";
  }, []);

  return (
    <div className="bg-brand-bg min-h-screen text-gray-300 font-sans pb-24">
      <div className="max-w-[680px] mx-auto px-6 pt-32">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-mono text-white leading-tight mb-4">
            PRIVACY POLICY
          </h1>
          <p className="text-gray-400 font-mono text-sm">Last updated: April 2026</p>
        </div>

        <div className="prose prose-invert max-w-none text-[17px] leading-[1.8] space-y-6">
          <H2>INTRODUCTION</H2>
          <p>
            Domsky Solutions ("we", "our", or "us") operates domskysolutions.com. This Privacy Policy explains how we collect, use, and protect your personal information when you visit our website.
          </p>
          <p>
            By using domskysolutions.com you agree to the collection and use of information in accordance with this policy.
          </p>

          <SectionDivider />

          <H2>INFORMATION WE COLLECT</H2>
          <p>
            <strong className="text-white">Email address</strong><br />
            When you subscribe to our newsletter we collect your email address. This is used solely to send you The Weekly Edge newsletter and related communications from Domsky Solutions. We never sell your email address to third parties.
          </p>
          <p>
            <strong className="text-white">Usage data</strong><br />
            We may collect anonymous information about how you use our website including pages visited, time spent on pages, and referring URLs. This data is used to improve our content and user experience.
          </p>
          <p>
            <strong className="text-white">Cookies</strong><br />
            Our website uses cookies — small files stored on your device — to improve your browsing experience. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. If you do not accept cookies some parts of our website may not function properly.
          </p>

          <SectionDivider />

          <H2>HOW WE USE YOUR INFORMATION</H2>
          <p>We use the information we collect to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Send our weekly newsletter to subscribers</li>
            <li>Analyze website traffic and improve content</li>
            <li>Monitor and prevent fraudulent activity</li>
            <li>Comply with legal obligations</li>
          </ul>

          <SectionDivider />

          <H2>EMAIL MARKETING</H2>
          <p>
            We use ConvertKit to manage our email list and send newsletters. When you subscribe your email address is stored securely by ConvertKit. You can unsubscribe at any time by clicking the unsubscribe link in any email we send.
          </p>
          <p>
            ConvertKit's privacy policy is available at:<br />
            <a href="https://convertkit.com/privacy" target="_blank" rel="noopener noreferrer" className="text-brand-cyan hover:underline">convertkit.com/privacy</a>
          </p>

          <SectionDivider />

          <H2>AFFILIATE LINKS</H2>
          <p>
            domskysolutions.com participates in affiliate programs. This means we may earn a commission when you click certain links and make a purchase or sign up for a service. This comes at no extra cost to you.
          </p>
          <p>
            We only recommend products and services we genuinely believe in. Affiliate relationships never influence our reviews or ratings.
          </p>

          <SectionDivider />

          <H2>THIRD PARTY SERVICES</H2>
          <p>
            Our website may contain links to third party websites. We are not responsible for the privacy practices of those sites and encourage you to review their privacy policies.
          </p>
          <p>We may use the following third party services:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>ConvertKit — email marketing platform</li>
            <li>Vercel — website hosting</li>
            <li>Cloudflare — domain and DNS management</li>
            <li>Google Analytics — website analytics (if enabled)</li>
          </ul>

          <SectionDivider />

          <H2>DATA RETENTION</H2>
          <p>
            We retain your email address for as long as you remain subscribed to our newsletter. You may request deletion of your data at any time by contacting us at <a href="mailto:team@domskysolutions.com" className="text-brand-cyan hover:underline">team@domskysolutions.com</a>.
          </p>

          <SectionDivider />

          <H2>YOUR RIGHTS</H2>
          <p>Depending on your location you may have the right to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Access the personal data we hold about you</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Withdraw consent for email marketing</li>
            <li>Lodge a complaint with your local data protection authority</li>
          </ul>
          <p>
            To exercise any of these rights contact us at:<br />
            <a href="mailto:team@domskysolutions.com" className="text-brand-cyan hover:underline">team@domskysolutions.com</a>
          </p>

          <SectionDivider />

          <H2>GDPR — EUROPEAN USERS</H2>
          <p>
            If you are located in the European Economic Area the legal basis for processing your email address is your consent given when you subscribed to our newsletter.
          </p>
          <p>
            You have the right to withdraw consent at any time by unsubscribing from our newsletter or contacting us directly.
          </p>

          <SectionDivider />

          <H2>CHILDREN'S PRIVACY</H2>
          <p>
            Our website is not directed at children under the age of 16. We do not knowingly collect personal information from children. If you believe your child has provided us with personal information please contact us.
          </p>

          <SectionDivider />

          <H2>CHANGES TO THIS POLICY</H2>
          <p>
            We may update this Privacy Policy from time to time. We will notify subscribers of significant changes via email. The date at the top of this page shows when it was last updated.
          </p>

          <SectionDivider />

          <H2>CONTACT US</H2>
          <p>If you have questions about this Privacy Policy please contact us:</p>
          <p>
            Email: <a href="mailto:team@domskysolutions.com" className="text-brand-cyan hover:underline">team@domskysolutions.com</a><br />
            Website: <Link to="/" className="text-brand-cyan hover:underline">domskysolutions.com</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

```


### src/pages/DisclaimerPage.tsx

```tsx

import React, { useEffect } from 'react';
import { H2, SectionDivider } from '../components/ui';
import { motion } from 'motion/react';

export const DisclaimerPage = () => {
  useEffect(() => {
    document.title = "Affiliate Disclaimer | Domsky Solutions";
  }, []);

  return (
    <div className="bg-brand-bg min-h-screen text-gray-300 font-sans pb-24">
      <div className="max-w-[680px] mx-auto px-6 pt-32">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-mono text-white leading-tight mb-4">
            Affiliate Disclaimer
          </h1>
          <p className="text-gray-400 font-mono text-sm">Last updated: April 2026</p>
        </div>

        <div className="prose prose-invert max-w-none text-[17px] leading-[1.8] space-y-6">
          <H2>AFFILIATE RELATIONSHIPS</H2>
          <p>
            domskysolutions.com is a participant in affiliate programs including but not limited to programs offered by the tools and software we review.
          </p>
          <p>
            This means that when you click certain links on our website and make a purchase or sign up for a service, we may receive a commission at no additional cost to you.
          </p>

          <SectionDivider />

          <H2>WHICH LINKS ARE AFFILIATE LINKS</H2>
          <p>
            We do not mark every affiliate link individually. You should assume that any link to a product or service on this website could be an affiliate link.
          </p>

          <SectionDivider />

          <H2>OUR COMMITMENT TO HONESTY</H2>
          <p>
            Affiliate relationships never influence our reviews, ratings, or recommendations. We only recommend products and services we have personally tested and genuinely believe will be useful to our readers.
          </p>
          <p>
            We have declined affiliate arrangements with tools we do not believe in, and we publish honest negative reviews of tools even when we have affiliate relationships with them.
          </p>

          <SectionDivider />

          <H2>FTC DISCLOSURE</H2>
          <p>
            In accordance with the Federal Trade Commission guidelines we disclose that domskysolutions.com may receive compensation for links to products and services.
          </p>

          <SectionDivider />

          <H2>QUESTIONS</H2>
          <p>
            If you have questions about our affiliate relationships please contact us at:<br />
            <a href="mailto:team@domskysolutions.com" className="text-brand-cyan hover:underline">team@domskysolutions.com</a>
          </p>
        </div>
      </div>
    </div>
  );
};

```


### src/pages/NotFoundPage.tsx

```tsx

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

```


### src/pages/UsesPage.tsx

```tsx
import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Star, ExternalLink } from 'lucide-react';
import { ConvertKitForm } from '../components/ConvertKitForm';

const usesTools = [
  {
    id: 'convertkit',
    name: 'ConvertKit',
    category: 'Email Newsletter',
    rating: 4.8,
    externalLink: 'https://convertkit.com',
    tagline: 'The creator marketing platform',
    desc: 'We use ConvertKit to send our weekly newsletter to thousands of subscribers. It\'s built specifically for creators, making it incredibly easy to set up automations, segment our audience, and deliver content reliably without getting bogged down in complex enterprise features.',
    pros: [
      'Extremely intuitive visual automation builder',
      'Built specifically for creators and newsletters',
      'Industry-leading deliverability rates'
    ],
    cons: [
      'Pricing scales up quickly as your list grows',
      'Email templates are somewhat basic out of the box'
    ],
    pricing: 'Free up to 1,000 subscribers. Paid plans start at $29/month.',
    ctaPrimary: 'Try ConvertKit'
  },
  {
    id: 'namecheap',
    name: 'Namecheap',
    category: 'Domain Registrar',
    rating: 4.7,
    externalLink: 'https://namecheap.com',
    tagline: 'Affordable, no-nonsense domains',
    desc: 'Every project starts with a domain name, and we register all of ours through Namecheap. They offer consistently low prices, a clean interface, and most importantly, they don\'t aggressively upsell you on unnecessary add-ons during checkout like some competitors do.',
    pros: [
      'Consistently low prices for new registrations and renewals',
      'Free domain privacy protection (WhoisGuard) included forever',
      'Clean, easy-to-navigate dashboard'
    ],
    cons: [
      'Support can sometimes be slow during peak times',
      'Included email hosting is very basic'
    ],
    pricing: 'Domains typically range from $8 to $15 per year depending on the TLD.',
    ctaPrimary: 'Search Domains'
  },
  {
    id: 'vercel',
    name: 'Vercel',
    category: 'Hosting',
    rating: 4.9,
    externalLink: 'https://vercel.com',
    tagline: 'The platform for frontend developers',
    desc: 'domskysolutions.com is hosted on Vercel. Their platform provides an unparalleled developer experience, offering seamless deployments straight from GitHub, global edge caching for lightning-fast load times, and zero-configuration setups for modern frontend frameworks.',
    pros: [
      'Incredible developer experience and seamless GitHub integration',
      'Global edge network ensures blazing fast load times worldwide',
      'Automatic preview deployments for every pull request'
    ],
    cons: [
      'Bandwidth and serverless function pricing can spike if not monitored',
      'Best suited specifically for frontend frameworks (Next.js, React, etc.)'
    ],
    pricing: 'Hobby plan is free. Pro plan starts at $20/user/month.',
    ctaPrimary: 'Deploy on Vercel'
  },
  {
    id: 'cloudflare',
    name: 'Cloudflare',
    category: 'DNS & Security',
    rating: 4.9,
    externalLink: 'https://cloudflare.com',
    tagline: 'Making the internet faster and safer',
    desc: 'We route our domain through Cloudflare for DNS management, SSL, and security. Their global network acts as a shield against malicious traffic while simultaneously speeding up content delivery. The fact that their free tier offers enterprise-grade features is staggering.',
    pros: [
      'Lightning-fast DNS propagation',
      'Excellent free tier with DDoS protection and free SSL',
      'Powerful page rules and edge caching capabilities'
    ],
    cons: [
      'The dashboard can be overwhelming due to the sheer number of features',
      'Advanced security rules require a steep learning curve'
    ],
    pricing: 'Generous free tier. Pro plan starts at $20/month.',
    ctaPrimary: 'Secure with Cloudflare'
  },
  {
    id: 'github',
    name: 'GitHub',
    category: 'Code Repository',
    rating: 5.0,
    externalLink: 'https://github.com',
    tagline: 'Where the world builds software',
    desc: 'All of our codebase lives on GitHub. It\'s the industry standard for version control and collaboration. We rely heavily on GitHub Actions for our CI/CD pipelines, ensuring that every change is tested and deployed smoothly to our hosting provider.',
    pros: [
      'The undisputed industry standard for version control',
      'GitHub Actions provides incredibly powerful CI/CD built-in',
      'Excellent integration ecosystem with almost every developer tool'
    ],
    cons: [
      'Can be intimidating for non-technical team members',
      'Project management features (Issues/Projects) are good but not best-in-class'
    ],
    pricing: 'Free for individuals and small teams. Team plan starts at $4/user/month.',
    ctaPrimary: 'Join GitHub'
  },
  {
    id: 'canva',
    name: 'Canva',
    category: 'Design',
    rating: 4.8,
    externalLink: 'https://canva.com',
    tagline: 'Empowering the world to design',
    desc: 'For blog post thumbnails, social media graphics, and quick visual assets, we use Canva. While we use professional tools for deep UI/UX work, Canva\'s speed, massive template library, and collaborative features make it indispensable for day-to-day content creation.',
    pros: [
      'Incredibly fast workflow for creating standard marketing assets',
      'Massive library of templates, stock photos, and elements',
      'Great collaborative features for teams'
    ],
    cons: [
      'Lacks the precision and advanced tools of professional software like Figma or Illustrator',
      'Designs can sometimes look "template-y" if not customized enough'
    ],
    pricing: 'Free basic plan. Canva Pro is $14.99/month.',
    ctaPrimary: 'Design with Canva'
  }
];

export const UsesPage = () => {
  useEffect(() => {
    document.title = "Tools We Use | domskysolutions.com";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-brand-bg min-h-screen pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-mono text-white mb-4">Tools We Use</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            A curated list of the software and services we actually use to build, host, and run domskysolutions.com.
          </p>
        </div>

        <div className="space-y-12">
          {usesTools.map((tool, index) => (
            <motion.div 
              key={tool.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-brand-surface border border-gray-800 p-8 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-cyan to-blue-500"></div>
              
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6 mb-8">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-gray-800 text-gray-300 text-xs font-mono uppercase tracking-wider">
                      {tool.category}
                    </span>
                    <div className="flex items-center gap-1 text-brand-amber text-sm font-mono">
                      <Star size={16} fill="currentColor" /> {tool.rating}
                    </div>
                  </div>
                  <h2 className="text-3xl font-bold font-mono mb-2 text-white">{tool.name}</h2>
                  <p className="text-lg text-brand-cyan font-mono mb-4">"{tool.tagline}"</p>
                </div>
                <a href={tool.externalLink} target="_blank" rel="noopener noreferrer" className="bg-brand-cyan text-brand-bg px-6 py-3 font-bold hover:bg-teal-400 transition-all glow-cyan flex items-center justify-center gap-2 whitespace-nowrap">
                  {tool.ctaPrimary} <ExternalLink size={18} />
                </a>
              </div>

              <p className="text-gray-300 text-lg leading-relaxed mb-8">{tool.desc}</p>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="bg-green-900/10 border border-green-900/30 p-6">
                  <h3 className="text-xl font-bold font-mono mb-4 text-green-400">Pros</h3>
                  <ul className="space-y-3">
                    {tool.pros.map((p, i) => (
                      <li key={i} className="text-gray-300 flex items-start gap-3">
                        <span className="text-green-500 font-bold">+</span> {p}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-red-900/10 border border-red-900/30 p-6">
                  <h3 className="text-xl font-bold font-mono mb-4 text-red-400">Cons</h3>
                  <ul className="space-y-3">
                    {tool.cons.map((c, i) => (
                      <li key={i} className="text-gray-300 flex items-start gap-3">
                        <span className="text-red-500 font-bold">-</span> {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-brand-bg p-4 border border-gray-800 font-mono text-sm text-gray-400">
                <span className="font-bold text-white">Pricing:</span> {tool.pricing}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-24">
          <ConvertKitForm />
        </div>
      </div>
    </div>
  );
};

```


### src/pages/tools/ToolPage.tsx

```tsx

import React, { useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { ArrowRight, Star, ExternalLink, Check, ChevronRight } from 'lucide-react';
import { toolReviews } from '../../data/toolReviews';
import { saasReviews } from '../../data/saasReviews';
import { ConvertKitForm } from '../../components/ConvertKitForm';

export const ToolPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const isReview = location.pathname.startsWith('/reviews');
  const tool = toolReviews[id as keyof typeof toolReviews] as any;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!tool) {
    return <div className="min-h-screen flex items-center justify-center pt-20"><h1 className="text-2xl font-mono">Tool not found</h1></div>;
  }

  return (
    <div className="pt-32 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen">
      <Link to={isReview ? "/#reviews" : "/#tools"} className="inline-flex items-center gap-2 text-brand-cyan hover:underline font-mono text-sm mb-8">
        <ArrowRight className="rotate-180" size={16} /> {isReview ? "Back to all reviews" : "Back to all tools"}
      </Link>
      
      <div className="bg-brand-surface border border-gray-800 p-8 md:p-12 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-cyan to-blue-500"></div>
        
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-gray-800 text-gray-300 text-xs font-mono uppercase tracking-wider">
                {tool.category}
              </span>
              <div className="flex items-center gap-1 text-brand-amber text-sm font-mono">
                <Star size={16} fill="currentColor" /> {tool.rating}
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-mono mb-2">{tool.name}</h1>
            {tool.tagline && <p className="text-xl text-brand-cyan font-mono mb-4">"{tool.tagline}"</p>}
          </div>
          <a href={tool.externalLink} target="_blank" rel="noopener noreferrer" className="bg-brand-cyan text-brand-bg px-6 py-3 font-bold hover:bg-teal-400 transition-all glow-cyan flex items-center justify-center gap-2 whitespace-nowrap">
            {tool.ctaPrimary || "Visit Website"} <ExternalLink size={18} />
          </a>
        </div>

        {id === 'claude' && (
          <div className="bg-[#1a1a2e] border-l-4 border-brand-cyan p-6 mb-12">
            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
              <span>🛠️</span> Try our free Claude Prompt Builder
            </h3>
            <p className="text-gray-300 mb-4">
              Build perfect Claude prompts in seconds.
            </p>
            <Link to="/tools/prompt-builder" className="inline-flex items-center gap-2 text-brand-cyan font-bold hover:underline">
              → Open Prompt Builder
            </Link>
          </div>
        )}

        <div className="prose prose-invert max-w-none mb-12">
          {tool.heroDesc.map((p: string, i: number) => <p key={i} className="text-gray-300 text-lg leading-relaxed mb-4">{p}</p>)}
        </div>

        <div className="mb-12">
          <h3 className="text-2xl font-bold font-mono mb-6 text-white border-b border-gray-800 pb-2">Key Features</h3>
          <ul className="grid md:grid-cols-2 gap-4">
            {tool.features.map((f: string, i: number) => (
              <li key={i} className="flex items-start gap-3 text-gray-300 bg-brand-bg p-4 border border-gray-800">
                <CheckCircle2 size={20} className="text-brand-cyan shrink-0 mt-0.5" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-green-900/10 border border-green-900/30 p-6">
            <h3 className="text-xl font-bold font-mono mb-4 text-green-400">Pros</h3>
            <ul className="space-y-3">
              {tool.pros.map((p: string, i: number) => <li key={i} className="text-gray-300 flex items-start gap-3"><span className="text-green-500 font-bold">+</span> {p}</li>)}
            </ul>
          </div>
          <div className="bg-red-900/10 border border-red-900/30 p-6">
            <h3 className="text-xl font-bold font-mono mb-4 text-red-400">Cons</h3>
            <ul className="space-y-3">
              {tool.cons.map((c: string, i: number) => <li key={i} className="text-gray-300 flex items-start gap-3"><span className="text-red-500 font-bold">-</span> {c}</li>)}
            </ul>
          </div>
        </div>

        <div className="mb-12">
          <h3 className="text-2xl font-bold font-mono mb-6 text-white border-b border-gray-800 pb-2">Pricing</h3>
          {tool.pricingCards ? (
            <div className="grid md:grid-cols-2 gap-4">
              {tool.pricingCards.map((card: any, i: number) => (
                <div key={i} className="bg-brand-bg border border-gray-800 p-6 hover:border-brand-cyan transition-colors">
                  <h4 className="text-lg font-bold font-mono text-white mb-1">{card.name}</h4>
                  <p className="text-brand-amber font-mono mb-4">{card.price}</p>
                  <ul className="space-y-2 mb-4">
                    {card.features.map((f: string, j: number) => (
                      <li key={j} className="text-gray-400 text-sm flex items-start gap-2">
                        <span className="text-brand-cyan mt-0.5">•</span> {f}
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-gray-500 border-t border-gray-800 pt-4 mt-auto">
                    <span className="font-bold text-gray-400">Perfect for:</span> {card.perfectFor}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 bg-brand-bg p-4 border border-gray-800 font-mono text-sm">{tool.pricing}</p>
          )}
        </div>

        {tool.bestFor && (
          <div className="mb-12">
            <h3 className="text-2xl font-bold font-mono mb-6 text-white border-b border-gray-800 pb-2">Who is it best for?</h3>
            <div className="prose prose-invert max-w-none">
              {tool.bestFor.map((p: string, i: number) => <p key={i} className="text-gray-300 text-lg leading-relaxed mb-4">{p}</p>)}
            </div>
          </div>
        )}

        <div className="bg-brand-bg border border-gray-800 p-8 text-center mb-12">
          <h3 className="text-2xl font-bold font-mono mb-6 text-white">Final Verdict</h3>
          <div className="text-gray-300 text-lg italic leading-relaxed mb-6">
            {tool.verdict.split('\n\n').map((p: string, i: number) => <p key={i} className="mb-4 last:mb-0">"{p}"</p>)}
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 mt-6 pt-6 border-t border-gray-800">
            <div className="text-sm">
              <span className="text-gray-500 font-mono">Score:</span> <span className="text-brand-amber font-bold">{tool.rating}/{isReview ? '10' : '5'}</span>
            </div>
            {tool.bestForTags && (
              <div className="text-sm">
                <span className="text-gray-500 font-mono">Best For:</span> <span className="text-brand-cyan">{tool.bestForTags}</span>
              </div>
            )}
            {tool.pricingSummary && (
              <div className="text-sm">
                <span className="text-gray-500 font-mono">Pricing:</span> <span className="text-brand-amber">{tool.pricingSummary}</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <a href={tool.externalLink} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto bg-brand-cyan text-brand-bg px-8 py-4 font-bold text-lg hover:bg-teal-400 transition-all glow-cyan flex items-center justify-center gap-2">
            {tool.ctaPrimary || "Visit Website"} <ExternalLink size={20} />
          </a>
          <Link to={isReview ? "/#reviews" : "/#tools"} className="w-full sm:w-auto bg-transparent border border-gray-600 text-white px-8 py-4 font-bold text-lg hover:border-white hover:bg-brand-surface transition-all flex items-center justify-center gap-2">
            <ArrowRight className="rotate-180" size={20} /> {isReview ? "Back to all reviews" : "Back to all tools"}
          </Link>
        </div>
      </div>
    </div>
  );
};

```


### src/pages/tools/SaasCalculatorPage.tsx

```tsx

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Check, Plus, Trash2, DollarSign, TrendingDown, Zap, Sparkles, CheckCircle2, Copy } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AI_ALTERNATIVES, RECOMMENDED_TOOLS } from '../HomePage';
import { ConvertKitForm } from '../../components/ConvertKitForm';

export const CATEGORIES = [
  {
    title: "Writing & Content",
    items: [
      { id: "writingTool", label: "AI Writing Tools (Jasper, Copy.ai, etc.)" },
      { id: "copywriter", label: "Freelance Copywriters" },
      { id: "contentAgency", label: "Content Marketing Agency" }
    ]
  },
  {
    title: "Research & Information",
    items: [
      { id: "newsSubs", label: "News & Industry Subscriptions" },
      { id: "researchTools", label: "Research & Data Tools" }
    ]
  },
  {
    title: "Design & Visuals",
    items: [
      { id: "adobe", label: "Adobe Creative Cloud" },
      { id: "canva", label: "Canva Pro or similar" },
      { id: "stockPhoto", label: "Stock Photo/Video Subscriptions" },
      { id: "graphicDesigner", label: "Freelance Graphic Designers" }
    ]
  },
  {
    title: "Development & Web",
    items: [
      { id: "devRetainer", label: "Developer Retainers" },
      { id: "websiteBuilder", label: "Website Builders (Wix, Squarespace)" },
      { id: "nocodeTool", label: "No-Code Tools (Webflow, Bubble)" }
    ]
  },
  {
    title: "Audio & Video",
    items: [
      { id: "videoEditor", label: "Freelance Video Editors" },
      { id: "podcastEditor", label: "Podcast Editors" },
      { id: "voiceover", label: "Voiceover Artists" }
    ]
  },
  {
    title: "Workspace & Operations",
    items: [
      { id: "noteTaking", label: "Note-taking Apps (Evernote, Roam)" },
      { id: "projectManagement", label: "Project Management (Asana, Monday)" },
      { id: "otherSubs", label: "Other Software Subscriptions" }
    ]
  }
];

export const SaasCalculatorPage = () => {
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    document.title = "SaaS Stack Cost Calculator";
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', "Find out exactly how much you could save by switching from traditional SaaS to AI alternatives. Free calculator — results in 30 seconds.");
  }, []);

  const handleInputChange = (id: string, value: string) => {
    if (value === '' || /^\d+$/.test(value)) {
      setInputs(prev => ({ ...prev, [id]: value }));
    }
  };

  let currentSpend = 0;
  Object.values(inputs).forEach((val: string) => {
    currentSpend += parseInt(val) || 0;
  });
  
  const activeAlternatives = AI_ALTERNATIVES.filter(alt => 
    alt.triggers.some(trigger => (parseInt(inputs[trigger] || '0') || 0) > 0)
  );
  
  const aiSpend = activeAlternatives.reduce((sum, alt) => sum + alt.cost, 0);
  const saving = currentSpend - aiSpend;
  const savingPercent = currentSpend > 0 ? Math.round((saving / currentSpend) * 100) : 0;
  
  const activeRecommendedTools = RECOMMENDED_TOOLS.filter(tool => 
    tool.triggers.some(trigger => (parseInt(inputs[trigger] || '0') || 0) > 0)
  );

  const getSavingColor = (percent: number) => {
    if (percent > 80) return "text-brand-cyan font-bold";
    if (percent > 60) return "text-brand-cyan";
    if (percent > 30) return "text-green-400";
    return "text-brand-amber";
  };

  const getSavingText = (percent: number) => {
    if (percent > 80) return "Transformational";
    if (percent > 60) return "Major saving";
    if (percent > 30) return "Significant saving";
    return "Good start";
  };

  const handleShare = () => {
    const text = `I just calculated my SaaS savings at domskysolutions.com/tools/saas-calculator — I could save $${saving}/month by switching to AI tools. Try it yourself 👇`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareX = () => {
    const text = `I just calculated my SaaS savings at domskysolutions.com/tools/saas-calculator — I could save $${saving}/month by switching to AI tools. Try it yourself 👇`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="bg-[#0D0F12] min-h-screen text-gray-300 font-sans pb-24 pt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-block bg-brand-cyan/10 text-brand-cyan text-xs font-bold px-3 py-1 rounded-full mb-6 uppercase tracking-wider">
            FREE TOOL — NO SIGNUP REQUIRED
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-mono text-white leading-tight mb-6">
            SaaS Stack Cost Calculator
          </h1>
          <p className="text-xl text-gray-400 mb-8">
            Find out in 30 seconds how much you could save by switching to AI tools. Enter what you currently pay — see your AI alternative and exact monthly saving.
          </p>
          
          <div className="flex flex-wrap gap-4 text-sm text-gray-400">
            <span className="flex items-center gap-1.5"><CheckCircle2 size={16} className="text-brand-cyan" /> No signup required</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 size={16} className="text-brand-cyan" /> Takes 30 seconds</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 size={16} className="text-brand-cyan" /> Results are instant</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 size={16} className="text-brand-cyan" /> Based on real tool prices</span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Side - Input Panel */}
          <div className="w-full lg:w-1/2">
            <div className="mb-8">
              <h2 className="text-2xl font-bold font-mono text-white mb-2">What do you currently pay?</h2>
              <p className="text-gray-400">Enter your monthly costs — leave blank if you don't use the tool</p>
            </div>

            <div className="space-y-10">
              {CATEGORIES.map((category, idx) => (
                <div key={idx}>
                  <h3 className="text-sm font-mono font-bold text-gray-500 uppercase tracking-widest mb-4">{category.title}</h3>
                  <div className="space-y-3">
                    {category.items.map(item => (
                      <div key={item.id} className="flex items-center justify-between gap-4">
                        <label htmlFor={item.id} className="text-white font-bold text-sm md:text-base flex-1 font-['DM_Sans']">
                          {item.label}
                        </label>
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-mono">$</span>
                            <input
                              type="text"
                              id={item.id}
                              value={inputs[item.id] || ''}
                              onChange={(e) => handleInputChange(item.id, e.target.value)}
                              placeholder="0"
                              className="w-24 bg-[#1a1a2e] border border-gray-700 rounded-md py-2 pl-7 pr-3 text-white font-bold font-mono focus:outline-none focus:border-brand-cyan transition-colors"
                            />
                          </div>
                          <span className="text-gray-500 text-sm w-8">/mo</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 p-8 bg-[#1a1a2e] border border-gray-800 rounded-xl text-center">
              <div className="text-sm font-mono font-bold text-gray-500 uppercase tracking-widest mb-2">YOUR CURRENT MONTHLY SPEND</div>
              <div className="text-5xl font-bold font-mono text-white mb-2 transition-all duration-300">
                ${currentSpend.toLocaleString()}<span className="text-2xl text-gray-500">/month</span>
              </div>
              <div className="text-gray-500">
                ${(currentSpend * 12).toLocaleString()}/year
              </div>
            </div>
          </div>

          {/* Right Side - Results Panel */}
          <div className="w-full lg:w-1/2">
            <div className="sticky top-24">
              {currentSpend === 0 ? (
                <div className="bg-[#1a1a2e] border border-gray-800 rounded-xl p-10 text-center h-full flex flex-col items-center justify-center min-h-[600px]">
                  <div className="text-6xl mb-6">💰</div>
                  <h3 className="text-2xl font-bold font-mono text-white mb-4">Enter your costs to see your savings</h3>
                  <p className="text-gray-400 mb-10 max-w-sm mx-auto">
                    Start typing in any field on the left — your results update instantly
                  </p>
                  
                  <div className="space-y-4 w-full max-w-xs mx-auto">
                    <div className="bg-[#0D0F12] border border-gray-800 rounded-lg p-4 text-gray-300 font-medium">
                      Average user saves $913/mo
                    </div>
                    <div className="bg-[#0D0F12] border border-gray-800 rounded-lg p-4 text-gray-300 font-medium">
                      That is $10,956/year
                    </div>
                    <div className="bg-[#0D0F12] border border-gray-800 rounded-lg p-4 text-gray-300 font-medium">
                      Switch takes 2 weeks
                    </div>
                  </div>
                </div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-[#1a1a2e] border border-gray-800 rounded-xl p-6 md:p-8"
                >
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold font-mono text-white mb-2">Your AI Alternative Stack</h2>
                    <p className="text-gray-400">Based on what you entered</p>
                  </div>

                  <div className="space-y-4 mb-10">
                    {activeAlternatives.map(alt => {
                      const triggerLabels = alt.triggers
                        .filter(t => (parseInt(inputs[t] || '0') || 0) > 0)
                        .map(t => CATEGORIES.flatMap(c => c.items).find(i => i.id === t)?.label)
                        .join(", ");
                        
                      return (
                        <div key={alt.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-4 bg-[#0D0F12] border border-gray-800 rounded-lg">
                          <div className="text-gray-400 text-sm sm:w-1/3 truncate" title={triggerLabels}>
                            {triggerLabels}
                          </div>
                          <div className="hidden sm:block text-brand-cyan">→</div>
                          <div className="text-white font-bold flex justify-between sm:w-1/2">
                            <span>{alt.name}</span>
                            <span className="font-mono text-gray-400">${alt.cost}/mo</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-red-950/20 border border-red-900/30 p-4 rounded-lg text-center">
                      <div className="text-xs text-gray-400 mb-2">Current Monthly Cost</div>
                      <div className="text-2xl font-bold font-mono text-red-400 transition-all duration-300">${currentSpend.toLocaleString()}</div>
                    </div>
                    <div className="bg-green-950/20 border border-green-900/30 p-4 rounded-lg text-center">
                      <div className="text-xs text-gray-400 mb-2">AI Stack Monthly Cost</div>
                      <div className="text-2xl font-bold font-mono text-green-400 transition-all duration-300">${aiSpend.toLocaleString()}</div>
                    </div>
                    <div className="bg-brand-cyan/10 border border-brand-cyan/30 p-4 rounded-lg text-center">
                      <div className="text-xs text-gray-400 mb-2">Monthly Saving</div>
                      <div className="text-2xl font-bold font-mono text-brand-cyan transition-all duration-300">${saving > 0 ? saving.toLocaleString() : 0}</div>
                      <div className="text-xs text-brand-cyan/70 mt-1">${saving > 0 ? (saving * 12).toLocaleString() : 0}/year</div>
                    </div>
                  </div>

                  <div className="text-center mb-10">
                    <div className="text-xl text-white mb-2">
                      You could save <span className={`font-bold text-3xl ${getSavingColor(savingPercent)}`}>{savingPercent > 0 ? savingPercent : 0}%</span> of your current software spend
                    </div>
                    <div className={`text-sm font-bold uppercase tracking-wider ${getSavingColor(savingPercent)}`}>
                      {getSavingText(savingPercent)}
                    </div>
                  </div>

                  {saving > 0 && (
                    <div className="mb-12 border-t border-gray-800 pt-8">
                      <h3 className="text-sm font-mono font-bold text-gray-500 uppercase tracking-widest mb-4 text-center">Share your results</h3>
                      <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <button 
                          onClick={handleShare}
                          className="flex items-center justify-center gap-2 bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/30 px-4 py-2 rounded font-bold hover:bg-brand-cyan/20 transition-colors"
                        >
                          {copied ? <CheckCircle2 size={18} /> : <Copy size={18} />}
                          {copied ? "Copied!" : "Copy to clipboard"}
                        </button>
                        <button 
                          onClick={handleShareX}
                          className="flex items-center justify-center gap-2 bg-black text-white border border-gray-700 px-4 py-2 rounded font-bold hover:bg-gray-900 transition-colors"
                        >
                          <svg viewBox="0 0 24 24" aria-hidden="true" className="w-4 h-4 fill-current"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>
                          Share on X
                        </button>
                      </div>
                    </div>
                  )}

                  {saving > 50 && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="mb-12 relative overflow-hidden rounded-xl border border-brand-cyan p-8"
                      style={{ background: 'linear-gradient(to bottom right, #1a1a2e, #0D2818)' }}
                    >
                      {/* Glow effect */}
                      <div className="absolute -top-20 -right-20 w-40 h-40 bg-brand-cyan/20 blur-3xl rounded-full pointer-events-none"></div>
                      
                      <div className="relative z-10">
                        <div className="inline-block bg-brand-cyan/10 text-brand-cyan text-xs font-bold font-mono px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
                          🎯 PERSONALISED FOR YOUR STACK
                        </div>
                        
                        <h3 className="text-2xl font-bold text-white mb-3">
                          {saving >= 500 
                            ? `You could save $${saving.toLocaleString()}/mo. That's $${(saving * 12).toLocaleString()} per year going straight back to your business.`
                            : saving >= 200 
                              ? `You could save $${saving.toLocaleString()}/mo — that's $${(saving * 12).toLocaleString()} per year.`
                              : `You could save $${saving.toLocaleString()}/mo.`}
                        </h3>
                        
                        <p className="text-gray-300 mb-6">
                          Get our free step-by-step guide showing exactly how to make this switch — The AI Tools Starter Kit. Delivered to your inbox instantly.
                        </p>
                        
                        <ul className="space-y-2 mb-8 text-sm text-gray-300">
                          <li className="flex items-start gap-2">
                            <CheckCircle2 size={18} className="text-brand-cyan shrink-0 mt-0.5" />
                            <span>The exact AI tools for your stack</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 size={18} className="text-brand-cyan shrink-0 mt-0.5" />
                            <span>How to switch without losing work</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 size={18} className="text-brand-cyan shrink-0 mt-0.5" />
                            <span>Real costs and savings documented</span>
                          </li>
                        </ul>
                        
                        <ConvertKitForm 
                          className="flex flex-col sm:flex-row gap-3 mb-4"
                          inputClassName="flex-1 bg-[#0D0F12] border border-gray-700 rounded px-4 py-3 text-white focus:outline-none focus:border-brand-cyan transition-colors"
                          buttonClassName="bg-brand-cyan text-brand-bg px-6 py-3 rounded font-bold hover:bg-teal-400 transition-colors whitespace-nowrap"
                          buttonText="Get Free Guide →"
                          successMessage="Check your inbox! Your guide is on its way. 🎉"
                        />
                        
                        <div className="text-center text-xs text-gray-500 mb-6">
                          Free forever. No spam. Unsubscribe in one click.
                        </div>
                        
                        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs font-mono text-gray-400">
                          <span>2,400+ builders</span>
                          <span className="hidden sm:inline">•</span>
                          <span>Free guide</span>
                          <span className="hidden sm:inline">•</span>
                          <span>Instant delivery</span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeRecommendedTools.length > 0 && (
                    <div className="mb-10">
                      <h3 className="text-lg font-bold font-mono text-white mb-4">Tools we recommend for your stack</h3>
                      <div className="space-y-3">
                        {activeRecommendedTools.map(tool => (
                          <div key={tool.id} className="bg-[#0D0F12] border border-gray-800 p-4 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                              <div className="font-bold text-white mb-1">{tool.name}</div>
                              <div className="text-sm text-gray-400">{tool.desc}</div>
                            </div>
                            <Link to={tool.link} className="text-brand-cyan text-sm font-bold whitespace-nowrap hover:underline flex items-center gap-1">
                              Read Full Review <ArrowRight size={14} />
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="bg-[#0D0F12] border border-brand-cyan/30 p-6 rounded-xl text-center">
                    <h3 className="text-xl font-bold font-mono text-white mb-3">Want the complete guide to making this switch?</h3>
                    <p className="text-gray-400 text-sm mb-6">
                      We documented exactly how we replaced a $1,053/month SaaS stack with AI tools. Every tool, every saving, every result — honest.
                    </p>
                    <div className="flex flex-col gap-3">
                      <Link to="/blog/replaced-saas-stack-with-ai-tools" className="bg-brand-amber text-brand-bg px-6 py-3 rounded font-bold hover:bg-yellow-400 transition-colors glow-amber-hover">
                        Read the Full Article →
                      </Link>
                      <a href="/#newsletter" className="border border-brand-cyan text-brand-cyan px-6 py-3 rounded font-bold hover:bg-brand-cyan/10 transition-colors">
                        Get the Free Starter Kit →
                      </a>
                    </div>
                  </div>

                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Summary */}
      {currentSpend > 0 && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#1a1a2e] border-t border-gray-800 p-4 z-40 flex items-center justify-between shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
          <div>
            <div className="text-xs text-gray-400">Monthly Saving</div>
            <div className="text-xl font-bold font-mono text-brand-cyan">${saving > 0 ? saving.toLocaleString() : 0}/mo</div>
          </div>
          <button 
            onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
            className="flex items-center gap-2 bg-brand-cyan text-brand-bg px-4 py-2 rounded font-bold text-sm"
          >
            See Full Results <ArrowRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

```


### src/pages/tools/PromptBuilderPage.tsx

```tsx

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Check, Copy, Sparkles, RefreshCw, MessageSquare, Target, Zap, ChevronDown, CheckCircle2, X } from 'lucide-react';
import { ConvertKitForm } from '../../components/ConvertKitForm';

const PROMPT_CATEGORIES = [
  { id: 'writing', icon: '✍️', label: 'Writing' },
  { id: 'research', icon: '🔍', label: 'Research' },
  { id: 'coding', icon: '💻', label: 'Coding' },
  { id: 'email', icon: '📧', label: 'Email' },
  { id: 'social', icon: '📱', label: 'Social Media' },
  { id: 'strategy', icon: '🎯', label: 'Strategy' },
  { id: 'analysis', icon: '📊', label: 'Analysis' },
  { id: 'creative', icon: '🎨', label: 'Creative' },
];
const ROLES = [
  'Solo founder / entrepreneur',
  'Freelancer / consultant',
  'Content creator / blogger',
  'Marketing professional',
  'Developer / technical person',
  'Designer / creative',
  'Student / researcher',
  'Small business owner',
  'Other'
];
const TONES = [
  'Professional', 'Casual', 'Direct', 'Friendly', 'Technical', 'Simple', 'Persuasive', 'Empathetic', 'Bold'
];
const FORMATS = [
  'Paragraph', 'Bullet points', 'Numbered list', 'Table', 'Step by step', 'Short & punchy', 'Long & detailed', 'Email format', 'Code block', 'Outline'
];
const EXAMPLES = [
  {
    category: 'writing',
    title: 'Blog post introduction',
    desc: 'Engaging opener for any topic',
    fields: {
      role: 'Content creator / blogger',
      task: 'Write an engaging blog post introduction that hooks the reader immediately.',
      tones: ['Professional', 'Friendly'],
      format: 'Paragraph',
      writingTopic: 'The future of AI in content creation',
      writingAudience: 'Marketing professionals and writers',
      writingLength: 'Short (under 300 words)',
    }
  },
  {
    category: 'email',
    title: 'Cold outreach email',
    desc: 'First contact with a prospect',
    fields: {
      role: 'Solo founder / entrepreneur',
      task: 'Write a cold outreach email to a potential client.',
      tones: ['Professional', 'Direct', 'Persuasive'],
      format: 'Email format',
      emailType: 'Cold outreach',
      emailRecipient: 'VP of Marketing at a mid-sized tech company',
      emailGoal: 'Get them to reply and book a 15-minute discovery call',
      emailLength: 'Short (under 150 words)',
    }
  },
  {
    category: 'social',
    title: 'LinkedIn thought leadership',
    desc: 'Authority-building post',
    fields: {
      role: 'Solo founder / entrepreneur',
      task: 'Write a thought leadership post sharing a contrarian opinion.',
      tones: ['Bold', 'Professional'],
      format: 'Short & punchy',
      socialPlatform: 'LinkedIn',
      socialGoal: 'Build authority',
      socialTopic: 'Why most companies fail at adopting AI tools',
      socialHashtags: true,
    }
  },
  {
    category: 'coding',
    title: 'Explain this code',
    desc: 'For non-developers',
    fields: {
      role: 'Developer / technical person',
      task: 'Explain what this code snippet does in simple terms.',
      tones: ['Simple', 'Friendly'],
      format: 'Bullet points',
      codingLanguage: 'JavaScript',
      codingTask: 'function debounce(func, wait) {\n  let timeout;\n  return function executedFunction(...args) {\n    const later = () => {\n      clearTimeout(timeout);\n      func(...args);\n    };\n    clearTimeout(timeout);\n    timeout = setTimeout(later, wait);\n  };\n}',
      codingExperience: 'Explain like I\'m not a developer',
    }
  },
  {
    category: 'strategy',
    title: 'Business idea validator',
    desc: 'Test your concept',
    fields: {
      role: 'Solo founder / entrepreneur',
      task: 'Act as a critical business advisor and validate my new business idea. Point out the biggest risks.',
      tones: ['Direct', 'Professional'],
      format: 'Step by step',
      strategyType: 'B2B SaaS for local gyms',
      strategyChallenge: 'I want to build a CRM specifically for independent gyms, but I am worried about churn and their willingness to pay.',
      strategyConstraints: 'Bootstrapped, solo developer, 6 months runway',
      strategyOutcome: 'A list of the top 3 reasons this might fail and how to mitigate them',
    }
  },
  {
    category: 'research',
    title: 'Competitive analysis',
    desc: 'Research a competitor',
    fields: {
      role: 'Marketing professional',
      task: 'Conduct a competitive analysis based on publicly available information.',
      tones: ['Professional', 'Direct'],
      format: 'Table',
      researchTopic: 'Stripe vs Paddle for SaaS billing',
      researchDepth: 'Detailed breakdown',
      researchQuestions: 'What are the exact fee differences?\nWhich is easier to integrate for a React app?\nHow do they handle global tax compliance?',
    }
  }
];

export const PromptBuilderPage = () => {
  const [category, setCategory] = useState('writing');
  const [fields, setFields] = useState<Record<string, any>>({
    role: '',
    task: '',
    tones: [],
    format: '',
    // writing
    writingTopic: '',
    writingAudience: '',
    writingLength: '',
    writingInclude: '',
    writingAvoid: '',
    // research
    researchTopic: '',
    researchDepth: '',
    researchQuestions: '',
    researchSources: '',
    // coding
    codingLanguage: '',
    codingTask: '',
    codingExperience: '',
    codingStyle: '',
    // email
    emailType: '',
    emailRecipient: '',
    emailGoal: '',
    emailInclude: '',
    emailLength: '',
    // social
    socialPlatform: '',
    socialGoal: '',
    socialTopic: '',
    socialHashtags: false,
    // strategy
    strategyType: '',
    strategyChallenge: '',
    strategyConstraints: '',
    strategyOutcome: '',
    // analysis
    analysisTopic: '',
    analysisType: '',
    analysisFormat: '',
    // creative
    creativeType: '',
    creativeStyle: '',
    creativeMessage: '',
  });

  const [copied, setCopied] = useState(false);
  const [showEmailCapture, setShowEmailCapture] = useState(false);
  const [emailDismissed, setEmailDismissed] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Claude Prompt Builder — domskysolutions.com";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', "Build perfect Claude prompts in seconds. Fill in the fields, get a professional prompt ready to copy. Free — no signup required.");
    }
    
    const dismissed = sessionStorage.getItem('promptBuilderEmailDismissed');
    if (dismissed) {
      setEmailDismissed(true);
    }
  }, []);

  const handleFieldChange = (key: string, value: any) => {
    setFields(prev => ({ ...prev, [key]: value }));
  };

  const toggleTone = (tone: string) => {
    setFields(prev => {
      const tones = prev.tones.includes(tone) 
        ? prev.tones.filter((t: string) => t !== tone)
        : [...prev.tones, tone];
      return { ...prev, tones };
    });
  };

  const generatePrompt = () => {
    let prompt = "";
    
    if (fields.role) {
      prompt += `You are helping a ${fields.role}.\n\n`;
    }
    
    if (fields.task) {
      prompt += `${fields.task}\n\n`;
    }
    
    if (fields.tones.length > 0) {
      prompt += `Write in a ${fields.tones.join(', ')} tone.\n\n`;
    }
    
    if (category === 'writing') {
      if (fields.writingAudience) prompt += `The audience is ${fields.writingAudience}.\n\n`;
      if (fields.writingTopic) prompt += `The topic is: ${fields.writingTopic}\n\n`;
      if (fields.writingLength) prompt += `Length: ${fields.writingLength}\n\n`;
      if (fields.writingInclude) prompt += `Include these points:\n${fields.writingInclude}\n\n`;
      if (fields.writingAvoid) prompt += `Avoid: ${fields.writingAvoid}\n\n`;
    } else if (category === 'research') {
      if (fields.researchTopic) prompt += `Topic to research: ${fields.researchTopic}\n\n`;
      if (fields.researchDepth) prompt += `Depth: ${fields.researchDepth}\n\n`;
      if (fields.researchQuestions) prompt += `Specific questions to answer:\n${fields.researchQuestions}\n\n`;
      if (fields.researchSources) prompt += `Sources to consider: ${fields.researchSources}\n\n`;
    } else if (category === 'coding') {
      if (fields.codingLanguage) prompt += `Programming language: ${fields.codingLanguage}\n\n`;
      if (fields.codingTask) prompt += `What to build or fix:\n${fields.codingTask}\n\n`;
      if (fields.codingExperience) prompt += `My experience level: ${fields.codingExperience}\n\n`;
      if (fields.codingStyle) prompt += `Code style preference: ${fields.codingStyle}\n\n`;
    } else if (category === 'email') {
      if (fields.emailType) prompt += `Email type: ${fields.emailType}\n\n`;
      if (fields.emailRecipient) prompt += `Recipient: ${fields.emailRecipient}\n\n`;
      if (fields.emailGoal) prompt += `Main goal: ${fields.emailGoal}\n\n`;
      if (fields.emailInclude) prompt += `Key information to include:\n${fields.emailInclude}\n\n`;
      if (fields.emailLength) prompt += `Length: ${fields.emailLength}\n\n`;
    } else if (category === 'social') {
      if (fields.socialPlatform) prompt += `Platform: ${fields.socialPlatform}\n\n`;
      if (fields.socialGoal) prompt += `Post goal: ${fields.socialGoal}\n\n`;
      if (fields.socialTopic) prompt += `Topic or hook: ${fields.socialTopic}\n\n`;
      if (fields.socialHashtags) prompt += `Please include relevant hashtags.\n\n`;
    } else if (category === 'strategy') {
      if (fields.strategyType) prompt += `Business or project type: ${fields.strategyType}\n\n`;
      if (fields.strategyChallenge) prompt += `Strategic challenge:\n${fields.strategyChallenge}\n\n`;
      if (fields.strategyConstraints) prompt += `Constraints to consider: ${fields.strategyConstraints}\n\n`;
      if (fields.strategyOutcome) prompt += `Desired outcome: ${fields.strategyOutcome}\n\n`;
    } else if (category === 'analysis') {
      if (fields.analysisTopic) prompt += `What to analyze:\n${fields.analysisTopic}\n\n`;
      if (fields.analysisType) prompt += `Analysis type: ${fields.analysisType}\n\n`;
      if (fields.analysisFormat) prompt += `Output format preference: ${fields.analysisFormat}\n\n`;
    } else if (category === 'creative') {
      if (fields.creativeType) prompt += `Creative type: ${fields.creativeType}\n\n`;
      if (fields.creativeStyle) prompt += `Style inspiration: ${fields.creativeStyle}\n\n`;
      if (fields.creativeMessage) prompt += `Key message: ${fields.creativeMessage}\n\n`;
    }
    
    if (fields.format) {
      prompt += `Format the output as ${fields.format}.\n\n`;
    }
    
    if (prompt.trim().length > 0) {
      prompt += `Begin your response directly without preamble or explanation.`;
    }
    
    return prompt.trim();
  };

  const generatedPrompt = generatePrompt();

  const handleCopy = () => {
    if (!generatedPrompt) return;
    navigator.clipboard.writeText(generatedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    
    if (!emailDismissed) {
      setShowEmailCapture(true);
    }
  };

  const handleClear = () => {
    setFields({
      role: '', task: '', tones: [], format: '',
      writingTopic: '', writingAudience: '', writingLength: '', writingInclude: '', writingAvoid: '',
      researchTopic: '', researchDepth: '', researchQuestions: '', researchSources: '',
      codingLanguage: '', codingTask: '', codingExperience: '', codingStyle: '',
      emailType: '', emailRecipient: '', emailGoal: '', emailInclude: '', emailLength: '',
      socialPlatform: '', socialGoal: '', socialTopic: '', socialHashtags: false,
      strategyType: '', strategyChallenge: '', strategyConstraints: '', strategyOutcome: '',
      analysisTopic: '', analysisType: '', analysisFormat: '',
      creativeType: '', creativeStyle: '', creativeMessage: '',
    });
  };

  const loadExample = (example: any) => {
    setCategory(example.category);
    handleClear();
    setFields(prev => ({ ...prev, ...example.fields }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const dismissEmail = () => {
    setShowEmailCapture(false);
    setEmailDismissed(true);
    sessionStorage.setItem('promptBuilderEmailDismissed', 'true');
  };

  const getFilledFieldsCount = () => {
    let count = 0;
    if (fields.role) count++;
    if (fields.task) count++;
    if (fields.tones.length > 0) count++;
    if (fields.format) count++;
    
    const catFields = Object.keys(fields).filter(k => k.startsWith(category));
    catFields.forEach(k => {
      if (typeof fields[k] === 'boolean') {
        if (fields[k]) count++;
      } else if (fields[k] && fields[k].length > 0) {
        count++;
      }
    });
    return count;
  };

  const filledCount = getFilledFieldsCount();
  let strengthLabel = "Weak";
  let strengthColor = "bg-red-500";
  let strengthText = "Add more detail for better results";
  let strengthBars = 2;
  
  if (filledCount >= 6) {
    strengthLabel = "Strong";
    strengthColor = "bg-brand-cyan";
    strengthText = "Great prompt — ready to use!";
    strengthBars = 10;
  } else if (filledCount >= 4) {
    strengthLabel = "Good";
    strengthColor = "bg-green-400";
    strengthText = "Looking good, add a bit more context if needed";
    strengthBars = 7;
  } else if (filledCount >= 2) {
    strengthLabel = "Basic";
    strengthColor = "bg-brand-amber";
    strengthText = "Add more detail for better results";
    strengthBars = 4;
  }

  return (
    <div className="pt-32 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block bg-brand-cyan/10 text-brand-cyan text-xs font-bold font-mono px-3 py-1 rounded-full mb-6 uppercase tracking-wider border border-brand-cyan/20">
            FREE TOOL — NO SIGNUP REQUIRED
          </div>
          <h1 className="text-4xl md:text-6xl font-bold font-mono mb-6">Claude Prompt Builder</h1>
          <p className="text-xl text-gray-400 mb-8">
            Stop writing prompts from scratch. Fill in what you need — get a professional Claude prompt ready to copy in seconds.
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm font-medium text-gray-300">
            <span className="flex items-center gap-1"><CheckCircle2 size={16} className="text-brand-cyan" /> Works with Claude Free & Pro</span>
            <span className="flex items-center gap-1"><CheckCircle2 size={16} className="text-brand-cyan" /> No signup required</span>
            <span className="flex items-center gap-1"><CheckCircle2 size={16} className="text-brand-cyan" /> Copy with one click</span>
            <span className="flex items-center gap-1"><CheckCircle2 size={16} className="text-brand-cyan" /> Built by domskysolutions.com</span>
          </div>
        </div>

        {/* Category Selector */}
        <div className="flex overflow-x-auto pb-4 mb-8 hide-scrollbar gap-3 justify-start md:justify-center">
          {PROMPT_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-full font-bold whitespace-nowrap transition-colors border ${
                category === cat.id 
                  ? 'bg-brand-cyan text-[#0D0F12] border-brand-cyan' 
                  : 'bg-[#1a1a2e] text-gray-400 border-gray-800 hover:border-gray-600'
              }`}
            >
              <span>{cat.icon}</span> {cat.label}
            </button>
          ))}
        </div>

        {/* Two Column Layout */}
        <div className="flex flex-col lg:flex-row gap-8 mb-20">
          
          {/* Left Column - Inputs */}
          <div className="w-full lg:w-1/2 space-y-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-8"
              >
                {/* Global Fields */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-gray-400 font-medium mb-2">Your Role / Context</label>
                    <select 
                      value={fields.role}
                      onChange={(e) => handleFieldChange('role', e.target.value)}
                      className="w-full bg-[#1a1a2e] border border-gray-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-cyan transition-colors appearance-none"
                    >
                      <option value="">Who are you?</option>
                      {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-400 font-medium mb-2">What do you need Claude to do?</label>
                    <textarea 
                      value={fields.task}
                      onChange={(e) => handleFieldChange('task', e.target.value)}
                      placeholder="e.g. Write a blog post introduction about AI tools"
                      className="w-full bg-[#1a1a2e] border border-gray-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-cyan transition-colors min-h-[100px]"
                    />
                    <div className="text-right text-xs text-gray-500 mt-1">{fields.task.length} characters</div>
                  </div>

                  <div>
                    <label className="block text-gray-400 font-medium mb-2">Tone of voice (select multiple)</label>
                    <div className="flex flex-wrap gap-2">
                      {TONES.map(tone => (
                        <button
                          key={tone}
                          onClick={() => toggleTone(tone)}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
                            fields.tones.includes(tone)
                              ? 'bg-brand-cyan/10 text-brand-cyan border-brand-cyan'
                              : 'bg-[#1a1a2e] text-gray-400 border-gray-800 hover:border-gray-600'
                          }`}
                        >
                          {tone}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-400 font-medium mb-2">How should Claude format the output?</label>
                    <div className="flex flex-wrap gap-2">
                      {FORMATS.map(format => (
                        <button
                          key={format}
                          onClick={() => handleFieldChange('format', fields.format === format ? '' : format)}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
                            fields.format === format
                              ? 'bg-brand-cyan/10 text-brand-cyan border-brand-cyan'
                              : 'bg-[#1a1a2e] text-gray-400 border-gray-800 hover:border-gray-600'
                          }`}
                        >
                          {format}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="h-px bg-gray-800 w-full my-8"></div>

                {/* Category Specific Fields */}
                <div className="space-y-6">
                  {category === 'writing' && (
                    <>
                      <div>
                        <label className="block text-gray-400 font-medium mb-2">Topic or title</label>
                        <input type="text" value={fields.writingTopic} onChange={e => handleFieldChange('writingTopic', e.target.value)} className="w-full bg-[#1a1a2e] border border-gray-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-cyan transition-colors" />
                      </div>
                      <div>
                        <label className="block text-gray-400 font-medium mb-2">Target audience</label>
                        <input type="text" value={fields.writingAudience} onChange={e => handleFieldChange('writingAudience', e.target.value)} className="w-full bg-[#1a1a2e] border border-gray-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-cyan transition-colors" />
                      </div>
                      <div>
                        <label className="block text-gray-400 font-medium mb-2">Word count / length</label>
                        <select value={fields.writingLength} onChange={e => handleFieldChange('writingLength', e.target.value)} className="w-full bg-[#1a1a2e] border border-gray-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-cyan transition-colors appearance-none">
                          <option value="">Select length</option>
                          <option value="Short (under 300 words)">Short (under 300 words)</option>
                          <option value="Medium (300-600 words)">Medium (300-600 words)</option>
                          <option value="Long (600-1000 words)">Long (600-1000 words)</option>
                          <option value="Very long (1000+ words)">Very long (1000+ words)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-gray-400 font-medium mb-2">Include these points</label>
                        <textarea value={fields.writingInclude} onChange={e => handleFieldChange('writingInclude', e.target.value)} className="w-full bg-[#1a1a2e] border border-gray-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-cyan transition-colors min-h-[100px]" />
                      </div>
                      <div>
                        <label className="block text-gray-400 font-medium mb-2">Avoid</label>
                        <input type="text" value={fields.writingAvoid} onChange={e => handleFieldChange('writingAvoid', e.target.value)} className="w-full bg-[#1a1a2e] border border-gray-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-cyan transition-colors" />
                      </div>
                    </>
                  )}

                  {category === 'research' && (
                    <>
                      <div>
                        <label className="block text-gray-400 font-medium mb-2">Topic to research</label>
                        <input type="text" value={fields.researchTopic} onChange={e => handleFieldChange('researchTopic', e.target.value)} className="w-full bg-[#1a1a2e] border border-gray-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-cyan transition-colors" />
                      </div>
                      <div>
                        <label className="block text-gray-400 font-medium mb-2">Depth of research</label>
                        <select value={fields.researchDepth} onChange={e => handleFieldChange('researchDepth', e.target.value)} className="w-full bg-[#1a1a2e] border border-gray-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-cyan transition-colors appearance-none">
                          <option value="">Select depth</option>
                          <option value="Quick overview">Quick overview</option>
                          <option value="Detailed breakdown">Detailed breakdown</option>
                          <option value="Expert level deep dive">Expert level deep dive</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-gray-400 font-medium mb-2">Specific questions to answer</label>
                        <textarea value={fields.researchQuestions} onChange={e => handleFieldChange('researchQuestions', e.target.value)} className="w-full bg-[#1a1a2e] border border-gray-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-cyan transition-colors min-h-[100px]" />
                      </div>
                      <div>
                        <label className="block text-gray-400 font-medium mb-2">Sources to consider</label>
                        <select value={fields.researchSources} onChange={e => handleFieldChange('researchSources', e.target.value)} className="w-full bg-[#1a1a2e] border border-gray-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-cyan transition-colors appearance-none">
                          <option value="">Select sources</option>
                          <option value="Any sources">Any sources</option>
                          <option value="Focus on recent (last 6 months)">Focus on recent (last 6 months)</option>
                          <option value="Academic / credible only">Academic / credible only</option>
                          <option value="Industry specific">Industry specific</option>
                        </select>
                      </div>
                    </>
                  )}

                  {category === 'coding' && (
                    <>
                      <div>
                        <label className="block text-gray-400 font-medium mb-2">Programming language</label>
                        <select value={fields.codingLanguage} onChange={e => handleFieldChange('codingLanguage', e.target.value)} className="w-full bg-[#1a1a2e] border border-gray-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-cyan transition-colors appearance-none">
                          <option value="">Select language</option>
                          <option value="JavaScript">JavaScript</option>
                          <option value="Python">Python</option>
                          <option value="React">React</option>
                          <option value="TypeScript">TypeScript</option>
                          <option value="HTML/CSS">HTML/CSS</option>
                          <option value="PHP">PHP</option>
                          <option value="SQL">SQL</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-gray-400 font-medium mb-2">What to build or fix</label>
                        <textarea value={fields.codingTask} onChange={e => handleFieldChange('codingTask', e.target.value)} className="w-full bg-[#1a1a2e] border border-gray-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-cyan transition-colors min-h-[100px]" />
                      </div>
                      <div>
                        <label className="block text-gray-400 font-medium mb-2">Experience level</label>
                        <select value={fields.codingExperience} onChange={e => handleFieldChange('codingExperience', e.target.value)} className="w-full bg-[#1a1a2e] border border-gray-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-cyan transition-colors appearance-none">
                          <option value="">Select experience</option>
                          <option value="Explain like I'm not a developer">Explain like I'm not a developer</option>
                          <option value="I understand basics">I understand basics</option>
                          <option value="I am comfortable with code">I am comfortable with code</option>
                          <option value="Advanced developer">Advanced developer</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-gray-400 font-medium mb-2">Code style preference</label>
                        <select value={fields.codingStyle} onChange={e => handleFieldChange('codingStyle', e.target.value)} className="w-full bg-[#1a1a2e] border border-gray-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-cyan transition-colors appearance-none">
                          <option value="">Select style</option>
                          <option value="Clean and simple">Clean and simple</option>
                          <option value="Well commented">Well commented</option>
                          <option value="Production ready">Production ready</option>
                          <option value="Quick prototype">Quick prototype</option>
                        </select>
                      </div>
                    </>
                  )}

                  {category === 'email' && (
                    <>
                      <div>
                        <label className="block text-gray-400 font-medium mb-2">Email type</label>
                        <select value={fields.emailType} onChange={e => handleFieldChange('emailType', e.target.value)} className="w-full bg-[#1a1a2e] border border-gray-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-cyan transition-colors appearance-none">
                          <option value="">Select type</option>
                          <option value="Cold outreach">Cold outreach</option>
                          <option value="Follow up">Follow up</option>
                          <option value="Newsletter issue">Newsletter issue</option>
                          <option value="Client proposal">Client proposal</option>
                          <option value="Rejection response">Rejection response</option>
                          <option value="Thank you">Thank you</option>
                          <option value="Introduction">Introduction</option>
                          <option value="Sales email">Sales email</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-gray-400 font-medium mb-2">Recipient</label>
                        <input type="text" value={fields.emailRecipient} onChange={e => handleFieldChange('emailRecipient', e.target.value)} className="w-full bg-[#1a1a2e] border border-gray-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-cyan transition-colors" />
                      </div>
                      <div>
                        <label className="block text-gray-400 font-medium mb-2">Main goal of email</label>
                        <input type="text" value={fields.emailGoal} onChange={e => handleFieldChange('emailGoal', e.target.value)} className="w-full bg-[#1a1a2e] border border-gray-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-cyan transition-colors" />
                      </div>
                      <div>
                        <label className="block text-gray-400 font-medium mb-2">Key information to include</label>
                        <textarea value={fields.emailInclude} onChange={e => handleFieldChange('emailInclude', e.target.value)} className="w-full bg-[#1a1a2e] border border-gray-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-cyan transition-colors min-h-[100px]" />
                      </div>
                      <div>
                        <label className="block text-gray-400 font-medium mb-2">Email length</label>
                        <select value={fields.emailLength} onChange={e => handleFieldChange('emailLength', e.target.value)} className="w-full bg-[#1a1a2e] border border-gray-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-cyan transition-colors appearance-none">
                          <option value="">Select length</option>
                          <option value="Very short (3-4 lines)">Very short (3-4 lines)</option>
                          <option value="Short (under 150 words)">Short (under 150 words)</option>
                          <option value="Medium (150-300 words)">Medium (150-300 words)</option>
                          <option value="Long (300+ words)">Long (300+ words)</option>
                        </select>
                      </div>
                    </>
                  )}

                  {category === 'social' && (
                    <>
                      <div>
                        <label className="block text-gray-400 font-medium mb-2">Platform</label>
                        <div className="flex flex-wrap gap-2">
                          {['X/Twitter', 'LinkedIn', 'Instagram', 'Facebook', 'TikTok', 'YouTube desc'].map(platform => (
                            <button
                              key={platform}
                              onClick={() => handleFieldChange('socialPlatform', fields.socialPlatform === platform ? '' : platform)}
                              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
                                fields.socialPlatform === platform
                                  ? 'bg-brand-cyan/10 text-brand-cyan border-brand-cyan'
                                  : 'bg-[#1a1a2e] text-gray-400 border-gray-800 hover:border-gray-600'
                              }`}
                            >
                              {platform}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="block text-gray-400 font-medium mb-2">Post goal</label>
                        <select value={fields.socialGoal} onChange={e => handleFieldChange('socialGoal', e.target.value)} className="w-full bg-[#1a1a2e] border border-gray-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-cyan transition-colors appearance-none">
                          <option value="">Select goal</option>
                          <option value="Drive engagement / comments">Drive engagement / comments</option>
                          <option value="Drive clicks to website">Drive clicks to website</option>
                          <option value="Build authority">Build authority</option>
                          <option value="Share a tip or insight">Share a tip or insight</option>
                          <option value="Promote something">Promote something</option>
                          <option value="Tell a story">Tell a story</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-gray-400 font-medium mb-2">Topic or hook</label>
                        <input type="text" value={fields.socialTopic} onChange={e => handleFieldChange('socialTopic', e.target.value)} className="w-full bg-[#1a1a2e] border border-gray-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-cyan transition-colors" />
                      </div>
                      <div className="flex items-center gap-3">
                        <label className="text-gray-400 font-medium">Include hashtags?</label>
                        <button
                          onClick={() => handleFieldChange('socialHashtags', !fields.socialHashtags)}
                          className={`w-12 h-6 rounded-full transition-colors relative ${fields.socialHashtags ? 'bg-brand-cyan' : 'bg-gray-700'}`}
                        >
                          <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${fields.socialHashtags ? 'left-7' : 'left-1'}`}></span>
                        </button>
                        <span className="text-white text-sm">{fields.socialHashtags ? 'Yes' : 'No'}</span>
                      </div>
                    </>
                  )}

                  {category === 'strategy' && (
                    <>
                      <div>
                        <label className="block text-gray-400 font-medium mb-2">Business or project type</label>
                        <input type="text" value={fields.strategyType} onChange={e => handleFieldChange('strategyType', e.target.value)} className="w-full bg-[#1a1a2e] border border-gray-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-cyan transition-colors" />
                      </div>
                      <div>
                        <label className="block text-gray-400 font-medium mb-2">Strategic challenge</label>
                        <textarea value={fields.strategyChallenge} onChange={e => handleFieldChange('strategyChallenge', e.target.value)} className="w-full bg-[#1a1a2e] border border-gray-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-cyan transition-colors min-h-[100px]" />
                      </div>
                      <div>
                        <label className="block text-gray-400 font-medium mb-2">Constraints to consider</label>
                        <input type="text" value={fields.strategyConstraints} onChange={e => handleFieldChange('strategyConstraints', e.target.value)} placeholder="budget, time, team size" className="w-full bg-[#1a1a2e] border border-gray-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-cyan transition-colors" />
                      </div>
                      <div>
                        <label className="block text-gray-400 font-medium mb-2">Desired outcome</label>
                        <input type="text" value={fields.strategyOutcome} onChange={e => handleFieldChange('strategyOutcome', e.target.value)} className="w-full bg-[#1a1a2e] border border-gray-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-cyan transition-colors" />
                      </div>
                    </>
                  )}

                  {category === 'analysis' && (
                    <>
                      <div>
                        <label className="block text-gray-400 font-medium mb-2">What to analyze</label>
                        <textarea value={fields.analysisTopic} onChange={e => handleFieldChange('analysisTopic', e.target.value)} placeholder="paste content or describe what to analyze" className="w-full bg-[#1a1a2e] border border-gray-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-cyan transition-colors min-h-[100px]" />
                      </div>
                      <div>
                        <label className="block text-gray-400 font-medium mb-2">Analysis type</label>
                        <select value={fields.analysisType} onChange={e => handleFieldChange('analysisType', e.target.value)} className="w-full bg-[#1a1a2e] border border-gray-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-cyan transition-colors appearance-none">
                          <option value="">Select type</option>
                          <option value="Pros and cons">Pros and cons</option>
                          <option value="SWOT analysis">SWOT analysis</option>
                          <option value="Competitive comparison">Competitive comparison</option>
                          <option value="Risk assessment">Risk assessment</option>
                          <option value="Performance review">Performance review</option>
                          <option value="Content audit">Content audit</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-gray-400 font-medium mb-2">Output format preference</label>
                        <select value={fields.analysisFormat} onChange={e => handleFieldChange('analysisFormat', e.target.value)} className="w-full bg-[#1a1a2e] border border-gray-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-cyan transition-colors appearance-none">
                          <option value="">Select format</option>
                          <option value="Summary">Summary</option>
                          <option value="Table">Table</option>
                          <option value="Detailed report">Detailed report</option>
                          <option value="Bullet points">Bullet points</option>
                        </select>
                      </div>
                    </>
                  )}

                  {category === 'creative' && (
                    <>
                      <div>
                        <label className="block text-gray-400 font-medium mb-2">Creative type</label>
                        <select value={fields.creativeType} onChange={e => handleFieldChange('creativeType', e.target.value)} className="w-full bg-[#1a1a2e] border border-gray-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-cyan transition-colors appearance-none">
                          <option value="">Select type</option>
                          <option value="Blog post">Blog post</option>
                          <option value="Story / narrative">Story / narrative</option>
                          <option value="Product description">Product description</option>
                          <option value="Tagline / headline">Tagline / headline</option>
                          <option value="Video script">Video script</option>
                          <option value="Podcast outline">Podcast outline</option>
                          <option value="Ad copy">Ad copy</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-gray-400 font-medium mb-2">Style inspiration</label>
                        <input type="text" value={fields.creativeStyle} onChange={e => handleFieldChange('creativeStyle', e.target.value)} placeholder="describe the style or mention a reference" className="w-full bg-[#1a1a2e] border border-gray-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-cyan transition-colors" />
                      </div>
                      <div>
                        <label className="block text-gray-400 font-medium mb-2">Key message</label>
                        <input type="text" value={fields.creativeMessage} onChange={e => handleFieldChange('creativeMessage', e.target.value)} className="w-full bg-[#1a1a2e] border border-gray-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-cyan transition-colors" />
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column - Preview */}
          <div className="w-full lg:w-1/2">
            <div className="sticky top-28">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white font-mono">Your Claude Prompt</h2>
                <div className="flex items-center gap-3">
                  <button onClick={handleClear} className="px-4 py-2 rounded border border-gray-700 text-gray-300 hover:bg-gray-800 transition-colors text-sm font-bold">
                    Clear All
                  </button>
                  <button 
                    onClick={handleCopy}
                    className={`px-4 py-2 rounded font-bold transition-colors text-sm flex items-center gap-2 ${
                      copied ? 'bg-green-500 text-white' : 'bg-brand-amber text-brand-bg hover:bg-yellow-400'
                    }`}
                  >
                    {copied ? <CheckCircle2 size={16} /> : <Copy size={16} />}
                    {copied ? 'Copied! ✓' : 'Copy Prompt'}
                  </button>
                </div>
              </div>

              <div className="bg-[#0D0F12] border border-brand-cyan rounded-lg p-6 min-h-[400px] max-h-[600px] overflow-y-auto">
                {generatedPrompt ? (
                  <motion.div 
                    key={generatedPrompt}
                    initial={{ opacity: 0.8 }}
                    animate={{ opacity: 1 }}
                    className="font-mono text-[16px] leading-[1.8] text-white whitespace-pre-wrap"
                  >
                    {generatedPrompt}
                  </motion.div>
                ) : (
                  <div className="text-gray-500 italic font-mono text-[16px] leading-[1.8]">
                    Your prompt will appear here as you fill in the fields above.<br/><br/>
                    Start by selecting a category and filling in what you need.
                  </div>
                )}
              </div>

              {/* Prompt Quality Indicator */}
              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-white">Prompt Strength</span>
                  <span className={`text-sm font-bold ${strengthColor.replace('bg-', 'text-')}`}>{strengthLabel}</span>
                </div>
                <div className="flex gap-1 h-2 mb-2">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div 
                      key={i} 
                      className={`flex-1 rounded-full ${i < strengthBars ? strengthColor : 'bg-gray-800'}`}
                    ></div>
                  ))}
                </div>
                <div className="text-xs text-gray-400">{strengthText}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Example Prompts Section */}
        <div className="mb-20 pt-12 border-t border-gray-800">
          <h2 className="text-2xl font-bold font-mono text-white mb-8 text-center">Need inspiration? Try these examples</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {EXAMPLES.map((ex, i) => (
              <div key={i} className="bg-brand-surface border border-gray-800 rounded-xl p-6 flex flex-col items-start">
                <div className="bg-brand-amber/10 text-brand-amber text-xs font-bold px-2 py-1 rounded uppercase tracking-wider mb-4">
                  {PROMPT_CATEGORIES.find(c => c.id === ex.category)?.label}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{ex.title}</h3>
                <p className="text-gray-400 text-sm mb-6 flex-1">{ex.desc}</p>
                <button 
                  onClick={() => loadExample(ex)}
                  className="text-brand-cyan font-bold text-sm hover:underline flex items-center gap-1"
                >
                  Use this template →
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Email Capture Slide-up */}
      <AnimatePresence>
        {showEmailCapture && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 w-full z-50 p-4 pointer-events-none"
          >
            <div className="max-w-3xl mx-auto bg-[#1a1a2e] border border-brand-cyan shadow-2xl rounded-xl p-6 relative pointer-events-auto flex flex-col sm:flex-row items-center gap-6">
              <button 
                onClick={dismissEmail}
                className="absolute top-3 right-3 text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>
              
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-1">Want 50 more proven Claude prompts?</h3>
                <p className="text-gray-400 text-sm">Get our free prompt swipe file.</p>
              </div>
              
              <div className="w-full sm:w-auto">
                <ConvertKitForm 
                  className="flex gap-2"
                  inputClassName="bg-[#0D0F12] border border-gray-700 rounded px-4 py-2 text-white focus:outline-none focus:border-brand-cyan transition-colors w-full sm:w-64"
                  buttonClassName="bg-brand-cyan text-brand-bg px-4 py-2 rounded font-bold hover:bg-teal-400 transition-colors whitespace-nowrap"
                  buttonText="Send Me the Prompts →"
                  successMessage="Check your inbox! 🎉"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

```


### src/pages/tools/StackRecommenderPage.tsx

```tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, ChevronLeft, Loader2, Star, Copy, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ConvertKitForm } from '../../components/ConvertKitForm';

const ROLE_OPTIONS = [
  { id: 'founder', icon: '🚀', title: 'Founder / Solopreneur', desc: 'Building a business or product, wearing all the hats' },
  { id: 'creator', icon: '✍️', title: 'Content Creator / Blogger', desc: 'Writing, publishing, growing an audience' },
  { id: 'designer', icon: '🎨', title: 'Designer / Creative', desc: 'Visual work, branding, creative projects' },
  { id: 'developer', icon: '💻', title: 'Developer / Builder', desc: 'Coding, building products, technical work' },
  { id: 'marketer', icon: '📣', title: 'Marketer / Growth', desc: 'Campaigns, content, driving traffic and sales' },
  { id: 'student', icon: '🎓', title: 'Student / Researcher', desc: 'Learning, studying, academic work' },
  { id: 'consultant', icon: '💼', title: 'Consultant / Freelancer', desc: 'Client work, proposals, delivering services' },
  { id: 'team', icon: '🏢', title: 'Small Team / Agency', desc: 'Managing a team and client deliverables' },
];

const CHALLENGE_OPTIONS = [
  { id: 'time', icon: '⏰', title: 'Not enough time', desc: 'Too much to do, not enough hours' },
  { id: 'costs', icon: '💸', title: 'Content costs too much', desc: 'Writers, designers, editors eating into budget' },
  { id: 'consistency', icon: '📝', title: 'Producing content consistently', desc: 'Hard to keep up with publishing schedule' },
  { id: 'research', icon: '🔍', title: 'Research takes too long', desc: 'Staying informed and finding reliable information' },
  { id: 'design', icon: '🎨', title: 'Design and visual content', desc: 'Need professional visuals without design skills' },
  { id: 'technical', icon: '💻', title: 'Technical tasks blocking me', desc: 'Website, code, tech things slowing everything down' },
  { id: 'audience', icon: '📊', title: 'Growing my audience', desc: 'Not enough reach, traffic or subscribers' },
  { id: 'video', icon: '🎬', title: 'Video and audio production', desc: 'Want to produce more video or podcast content' },
];

const GOAL_OPTIONS = [
  { id: 'audience', icon: '📈', title: 'Grow my audience', desc: 'More subscribers, followers or website visitors' },
  { id: 'revenue', icon: '💰', title: 'Increase revenue', desc: 'More clients, sales or passive income' },
  { id: 'speed', icon: '⚡', title: 'Work faster and smarter', desc: 'Do the same work in half the time' },
  { id: 'build', icon: '🏗️', title: 'Build something new', desc: 'Launch a product, site or creative project' },
  { id: 'learn', icon: '📚', title: 'Learn and improve skills', desc: 'Get better at my craft and stay current' },
  { id: 'costs', icon: '🎯', title: 'Replace expensive tools', desc: 'Cut software costs without losing capability' },
];

const BUDGET_OPTIONS = [
  { id: '0', title: '$0 — Free tools only', desc: 'Free tiers only' },
  { id: '30', title: 'Under $30/month', desc: 'Essential stack only' },
  { id: '100', title: '$30 — $100/month', desc: 'Professional stack' },
  { id: '200', title: '$100 — $200/month', desc: 'Full featured stack' },
  { id: '201', title: '$200+/month', desc: 'Power user stack' },
];

const EXPERIENCE_OPTIONS = [
  { id: 'beginner', icon: '🌱', title: 'Complete beginner', desc: 'Just starting to explore what AI tools can do' },
  { id: 'some', icon: '🌿', title: 'Some experience', desc: 'Used a few AI tools but not part of daily workflow yet' },
  { id: 'regular', icon: '🌳', title: 'Regular user', desc: 'Use AI tools often but want to get more from them' },
  { id: 'power', icon: '🚀', title: 'Power user', desc: 'AI is central to how I work — want the best stack' },
];

const TOOLS_DB = {
  claude: { id: 'claude', name: 'Claude', category: 'Writing & Reasoning', rating: 5, price: 20, freeTier: true, reviewLink: '/tools/claude', url: 'https://claude.ai' },
  midjourney: { id: 'midjourney', name: 'Midjourney', category: 'Image Generation', rating: 5, price: 30, freeTier: false, reviewLink: '/tools/midjourney', url: 'https://midjourney.com' },
  perplexity: { id: 'perplexity', name: 'Perplexity', category: 'Research', rating: 5, price: 20, freeTier: true, reviewLink: '/tools/perplexity', url: 'https://perplexity.ai' },
  cursor: { id: 'cursor', name: 'Cursor', category: 'Coding', rating: 5, price: 20, freeTier: true, reviewLink: '/tools/cursor', url: 'https://cursor.sh' },
  descript: { id: 'descript', name: 'Descript', category: 'Video/Audio', rating: 4, price: 15, freeTier: true, reviewLink: '/tools/descript', url: 'https://descript.com' },
  elevenlabs: { id: 'elevenlabs', name: 'ElevenLabs', category: 'Voice AI', rating: 5, price: 5, freeTier: true, reviewLink: '/tools/elevenlabs', url: 'https://elevenlabs.io' },
  framer: { id: 'framer', name: 'Framer', category: 'Web Design', rating: 4, price: 15, freeTier: true, reviewLink: '/tools/framer', url: 'https://framer.com' },
  jasper: { id: 'jasper', name: 'Jasper', category: 'Marketing', rating: 4, price: 39, freeTier: false, reviewLink: '/tools/jasper', url: 'https://jasper.ai' },
  notion: { id: 'notion', name: 'Notion AI', category: 'Workspace', rating: 4, price: 10, freeTier: true, reviewLink: '/tools/notion', url: 'https://notion.so' },
};

export const StackRecommenderPage = () => {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [answers, setAnswers] = useState({
    role: '',
    challenge: '',
    goal: '',
    budget: '',
    experience: ''
  });
  const [isCalculating, setIsCalculating] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [loadingTextIndex, setLoadingTextIndex] = useState(0);
  const [recommendedTools, setRecommendedTools] = useState<any[]>([]);

  const loadingTexts = [
    "Analysing your profile...",
    "Matching tools to your goals...",
    "Building your stack..."
  ];

  useEffect(() => {
    document.title = "AI Tool Stack Recommender — domskysolutions.com";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "Answer 5 quick questions and get your personalised AI tool stack. Free recommendations based on your role, goals and budget.");
    }
  }, []);

  useEffect(() => {
    if (isCalculating) {
      const interval = setInterval(() => {
        setLoadingTextIndex((prev) => (prev + 1) % loadingTexts.length);
      }, 600);
      
      const timer = setTimeout(() => {
        setIsCalculating(false);
        setShowResults(true);
      }, 2000);
      
      return () => {
        clearInterval(interval);
        clearTimeout(timer);
      };
    }
  }, [isCalculating]);

  const handleNext = () => {
    if (step < 5) {
      setDirection(1);
      setStep(step + 1);
    } else {
      calculateResults();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setDirection(-1);
      setStep(step - 1);
    }
  };

  const handleSelect = (field: string, value: string) => {
    setAnswers({ ...answers, [field]: value });
  };

  const calculateResults = () => {
    let recommendedIds = new Set<string>();
    
    // ALWAYS RECOMMEND based on challenge:
    if (answers.challenge === 'time') recommendedIds.add('claude');
    if (answers.challenge === 'costs') { recommendedIds.add('claude'); recommendedIds.add('midjourney'); }
    if (answers.challenge === 'consistency') recommendedIds.add('claude');
    if (answers.challenge === 'research') recommendedIds.add('perplexity');
    if (answers.challenge === 'design') recommendedIds.add('midjourney');
    if (answers.challenge === 'technical') recommendedIds.add('cursor');
    if (answers.challenge === 'audience') { recommendedIds.add('claude'); }
    if (answers.challenge === 'video') { recommendedIds.add('descript'); recommendedIds.add('elevenlabs'); }

    // ROLE ADJUSTMENTS:
    if (answers.role === 'founder') { ['claude', 'cursor', 'perplexity', 'notion'].forEach(id => recommendedIds.add(id)); }
    if (answers.role === 'creator') { ['claude', 'midjourney', 'descript', 'elevenlabs'].forEach(id => recommendedIds.add(id)); }
    if (answers.role === 'designer') { ['midjourney', 'claude', 'framer'].forEach(id => recommendedIds.add(id)); }
    if (answers.role === 'developer') { ['cursor', 'claude', 'perplexity'].forEach(id => recommendedIds.add(id)); }
    if (answers.role === 'marketer') { ['claude', 'midjourney', 'jasper', 'perplexity'].forEach(id => recommendedIds.add(id)); }
    if (answers.role === 'student') { ['claude', 'perplexity', 'notion'].forEach(id => recommendedIds.add(id)); }
    if (answers.role === 'consultant') { ['claude', 'perplexity', 'notion', 'framer'].forEach(id => recommendedIds.add(id)); }
    if (answers.role === 'team') { ['claude', 'jasper', 'notion', 'midjourney'].forEach(id => recommendedIds.add(id)); }

    let tools = Array.from(recommendedIds).map(id => TOOLS_DB[id as keyof typeof TOOLS_DB]);

    // BUDGET ADJUSTMENTS:
    if (answers.budget === '0') {
      tools = tools.filter(t => t.freeTier);
    }

    // Ensure Claude is always first if it's in the list
    tools.sort((a, b) => {
      if (a.id === 'claude') return -1;
      if (b.id === 'claude') return 1;
      return 0;
    });

    // EXPERIENCE ADJUSTMENTS:
    if (answers.experience === 'beginner') {
      tools = [TOOLS_DB.claude];
    }

    let maxTools = 6;
    if (answers.budget === '30') maxTools = 3;
    else if (answers.budget === '100') maxTools = 4;
    else if (answers.budget === '200') maxTools = 5;

    if (answers.experience === 'some') maxTools = Math.min(maxTools, 3);
    
    tools = tools.slice(0, maxTools);
    
    setRecommendedTools(tools);
    setIsCalculating(true);
  };

  const resetQuiz = () => {
    setStep(1);
    setAnswers({ role: '', challenge: '', goal: '', budget: '', experience: '' });
    setShowResults(false);
  };

  const getReasoning = (toolId: string) => {
    if (toolId === 'claude') return answers.experience === 'beginner' ? "Start here first. The best all-around AI for writing and reasoning." : "The smartest model for writing, reasoning, and your daily tasks.";
    if (toolId === 'midjourney') return "The highest quality image generation for your design needs.";
    if (toolId === 'perplexity') return "Cuts your research time in half with accurate, cited answers.";
    if (toolId === 'cursor') return "The best AI code editor to speed up your technical work.";
    if (toolId === 'descript') return "Makes video and audio editing as easy as editing a text document.";
    if (toolId === 'elevenlabs') return "The most realistic AI voice generation for your content.";
    if (toolId === 'framer') return "Design and publish websites incredibly fast with AI assistance.";
    if (toolId === 'jasper') return "Purpose-built for marketing teams to scale content production.";
    if (toolId === 'notion') return "The perfect workspace to organize your thoughts and AI outputs.";
    return "A great addition to your workflow.";
  };

  const renderStep = () => {
    const slideVariants = {
      enter: (direction: number) => ({
        x: direction > 0 ? 100 : -100,
        opacity: 0
      }),
      center: {
        zIndex: 1,
        x: 0,
        opacity: 1
      },
      exit: (direction: number) => ({
        zIndex: 0,
        x: direction < 0 ? 100 : -100,
        opacity: 0
      })
    };

    let content = null;
    let isNextDisabled = true;

    if (step === 1) {
      isNextDisabled = !answers.role;
      content = (
        <div className="w-full">
          <h2 className="text-3xl font-bold text-white mb-2">What best describes what you do?</h2>
          <p className="text-gray-400 mb-8">This helps us match tools to your actual workflow</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ROLE_OPTIONS.map(opt => (
              <button
                key={opt.id}
                onClick={() => handleSelect('role', opt.id)}
                className={`flex items-start gap-4 p-6 rounded-xl text-left transition-all duration-200 border ${
                  answers.role === opt.id 
                    ? 'border-brand-cyan bg-[#00F5D4]/10' 
                    : 'border-gray-800 bg-[#1a1a2e] hover:border-gray-600'
                }`}
              >
                <div className="text-3xl">{opt.icon}</div>
                <div>
                  <h3 className={`font-bold text-lg mb-1 ${answers.role === opt.id ? 'text-white' : 'text-gray-300'}`}>{opt.title}</h3>
                  <p className={answers.role === opt.id ? 'text-gray-300' : 'text-gray-500'}>{opt.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      );
    } else if (step === 2) {
      isNextDisabled = !answers.challenge;
      content = (
        <div className="w-full">
          <h2 className="text-3xl font-bold text-white mb-2">What is your biggest challenge right now?</h2>
          <p className="text-gray-400 mb-8">Pick the one that matters most today</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CHALLENGE_OPTIONS.map(opt => (
              <button
                key={opt.id}
                onClick={() => handleSelect('challenge', opt.id)}
                className={`flex items-start gap-4 p-6 rounded-xl text-left transition-all duration-200 border ${
                  answers.challenge === opt.id 
                    ? 'border-brand-cyan bg-[#00F5D4]/10' 
                    : 'border-gray-800 bg-[#1a1a2e] hover:border-gray-600'
                }`}
              >
                <div className="text-3xl">{opt.icon}</div>
                <div>
                  <h3 className={`font-bold text-lg mb-1 ${answers.challenge === opt.id ? 'text-white' : 'text-gray-300'}`}>{opt.title}</h3>
                  <p className={answers.challenge === opt.id ? 'text-gray-300' : 'text-gray-500'}>{opt.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      );
    } else if (step === 3) {
      isNextDisabled = !answers.goal;
      content = (
        <div className="w-full">
          <h2 className="text-3xl font-bold text-white mb-8">What is your main goal for the next 3 months?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {GOAL_OPTIONS.map(opt => (
              <button
                key={opt.id}
                onClick={() => handleSelect('goal', opt.id)}
                className={`flex items-start gap-4 p-6 rounded-xl text-left transition-all duration-200 border ${
                  answers.goal === opt.id 
                    ? 'border-brand-cyan bg-[#00F5D4]/10' 
                    : 'border-gray-800 bg-[#1a1a2e] hover:border-gray-600'
                }`}
              >
                <div className="text-3xl">{opt.icon}</div>
                <div>
                  <h3 className={`font-bold text-lg mb-1 ${answers.goal === opt.id ? 'text-white' : 'text-gray-300'}`}>{opt.title}</h3>
                  <p className={answers.goal === opt.id ? 'text-gray-300' : 'text-gray-500'}>{opt.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      );
    } else if (step === 4) {
      isNextDisabled = !answers.budget;
      content = (
        <div className="w-full max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-2">What is your monthly budget for AI tools?</h2>
          <p className="text-gray-400 mb-8">Be honest — we will match tools to what you can afford</p>
          <div className="flex flex-col gap-4">
            {BUDGET_OPTIONS.map(opt => (
              <button
                key={opt.id}
                onClick={() => handleSelect('budget', opt.id)}
                className={`flex items-center justify-between p-6 rounded-xl text-left transition-all duration-200 border ${
                  answers.budget === opt.id 
                    ? 'border-brand-cyan bg-[#00F5D4]/10' 
                    : 'border-gray-800 bg-[#1a1a2e] hover:border-gray-600'
                }`}
              >
                <h3 className={`font-bold text-xl ${answers.budget === opt.id ? 'text-white' : 'text-gray-300'}`}>{opt.title}</h3>
                <span className={answers.budget === opt.id ? 'text-brand-cyan font-medium' : 'text-gray-500'}>{opt.desc}</span>
              </button>
            ))}
          </div>
        </div>
      );
    } else if (step === 5) {
      isNextDisabled = !answers.experience;
      content = (
        <div className="w-full">
          <h2 className="text-3xl font-bold text-white mb-8">How comfortable are you with AI tools right now?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {EXPERIENCE_OPTIONS.map(opt => (
              <button
                key={opt.id}
                onClick={() => handleSelect('experience', opt.id)}
                className={`flex items-start gap-4 p-6 rounded-xl text-left transition-all duration-200 border ${
                  answers.experience === opt.id 
                    ? 'border-brand-cyan bg-[#00F5D4]/10' 
                    : 'border-gray-800 bg-[#1a1a2e] hover:border-gray-600'
                }`}
              >
                <div className="text-3xl">{opt.icon}</div>
                <div>
                  <h3 className={`font-bold text-lg mb-1 ${answers.experience === opt.id ? 'text-white' : 'text-gray-300'}`}>{opt.title}</h3>
                  <p className={answers.experience === opt.id ? 'text-gray-300' : 'text-gray-500'}>{opt.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="w-full max-w-4xl mx-auto">
        <div className="mb-12">
          <div className="flex justify-center items-center gap-4 mb-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                  step > i ? 'bg-brand-cyan text-brand-dark' : 
                  step === i ? 'bg-brand-cyan text-brand-dark animate-pulse' : 
                  'border-2 border-gray-700 text-gray-500'
                }`}>
                  {step > i ? <Check size={16} /> : i}
                </div>
                {i < 5 && (
                  <div className={`w-8 md:w-16 h-1 mx-2 rounded-full ${step > i ? 'bg-brand-cyan' : 'bg-gray-800'}`} />
                )}
              </div>
            ))}
          </div>
          <p className="text-center text-gray-400 font-mono text-sm uppercase tracking-wider">Step {step} of 5</p>
        </div>

        <div className="relative overflow-hidden min-h-[500px]">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={step}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
              className="absolute w-full"
            >
              {content}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-between items-center mt-8 pt-8 border-t border-gray-800 sticky bottom-4 bg-brand-dark/90 backdrop-blur-md p-4 rounded-2xl z-10">
          {step > 1 ? (
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors px-4 py-2"
            >
              <ChevronLeft size={20} /> Back
            </button>
          ) : (
            <div></div>
          )}
          <button
            onClick={handleNext}
            disabled={isNextDisabled}
            className={`flex items-center gap-2 px-8 py-3 rounded-full font-bold transition-all ${
              isNextDisabled 
                ? 'bg-gray-800 text-gray-500 cursor-not-allowed' 
                : 'bg-brand-cyan text-brand-dark hover:bg-brand-cyan/90'
            }`}
          >
            {step === 5 ? 'Get My Stack' : 'Next'} <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  };

  const renderLoading = () => (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <Loader2 className="w-16 h-16 text-brand-cyan animate-spin mb-8" />
      <AnimatePresence mode="wait">
        <motion.p
          key={loadingTextIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="text-xl font-mono text-white"
        >
          {loadingTexts[loadingTextIndex]}
        </motion.p>
      </AnimatePresence>
    </div>
  );

  const renderResults = () => {
    const roleTitle = ROLE_OPTIONS.find(r => r.id === answers.role)?.title || 'Professional';
    
    let subtitle = "";
    if (answers.budget === '0') subtitle = "Starting with free tools — you can upgrade as you grow";
    else if (answers.budget === '30') subtitle = "A lean essential stack for under $30/month";
    else if (answers.budget === '100') subtitle = "A professional stack that covers all your bases";
    else if (answers.budget === '200') subtitle = "A full featured stack for serious output";
    else subtitle = "A power user stack for maximum capability";

    const totalCost = recommendedTools.reduce((sum, tool) => sum + (answers.budget === '0' ? 0 : tool.price), 0);
    const traditionalCost = recommendedTools.length * 50; // Rough estimate
    const savings = Math.round(((traditionalCost - totalCost) / traditionalCost) * 100);

    return (
      <div className="w-full max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block bg-brand-amber/10 text-brand-amber text-xs font-bold font-mono px-3 py-1 rounded-full uppercase tracking-wider mb-6">
            YOUR PERSONALISED AI STACK
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Here is your recommended AI tool stack, {roleTitle}
          </h2>
          <p className="text-xl text-gray-400">{subtitle}</p>
        </div>

        <div className="space-y-6 mb-16">
          {recommendedTools.map((tool, index) => {
            let label = "UPGRADE WHEN READY";
            let labelColor = "text-gray-400 bg-gray-800/50";
            let borderColor = "border-gray-800";
            
            if (index === 0) {
              label = "START HERE";
              labelColor = "text-brand-amber bg-brand-amber/10";
              borderColor = "border-l-brand-amber border-y-gray-800 border-r-gray-800";
            } else if (index < 3) {
              label = "ESSENTIAL";
              labelColor = "text-brand-cyan bg-brand-cyan/10";
              borderColor = "border-l-brand-cyan border-y-gray-800 border-r-gray-800";
            }

            return (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
                className={`bg-[#1a1a2e] border ${borderColor} border-l-[3px] rounded-xl p-6 md:p-8 hover:-translate-y-1 transition-transform`}
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <span className={`text-xs font-bold px-2 py-1 rounded uppercase tracking-wider ${labelColor}`}>
                        {label}
                      </span>
                      <span className="bg-brand-cyan/10 text-brand-cyan text-xs font-bold px-2 py-1 rounded-full">
                        {tool.category}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{tool.name}</h3>
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} className={i < tool.rating ? "text-brand-amber fill-brand-amber" : "text-gray-600"} />
                      ))}
                    </div>
                    <p className="text-gray-300 text-lg mb-6">
                      {getReasoning(tool.id)}
                    </p>
                    <div className="flex flex-wrap items-center gap-4">
                      <Link to={tool.reviewLink} className="text-brand-cyan font-bold hover:underline flex items-center gap-1">
                        Read Full Review <ArrowRight size={16} />
                      </Link>
                      <a href={tool.url} target="_blank" rel="noopener noreferrer" className="text-gray-400 font-bold hover:text-white transition-colors flex items-center gap-1">
                        Visit Tool <ArrowRight size={16} />
                      </a>
                    </div>
                  </div>
                  <div className="md:text-right">
                    <div className="bg-brand-surface border border-gray-800 rounded-lg p-4 inline-block">
                      {answers.budget === '0' || tool.price === 0 ? (
                        <div className="text-green-400 font-bold text-xl">Free to start</div>
                      ) : (
                        <div className="text-brand-amber font-bold text-xl">${tool.price}/month</div>
                      )}
                      {answers.budget === '0' && tool.freeTier && tool.price > 0 && (
                        <div className="text-gray-500 text-sm mt-1">FREE TIER</div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="bg-brand-surface border border-gray-800 rounded-2xl p-8 mb-16 text-center">
          <h3 className="text-2xl font-bold text-white mb-8">Your Stack Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="text-gray-400 text-sm uppercase tracking-wider mb-2">Tools Recommended</div>
              <div className="text-4xl font-bold text-white">{recommendedTools.length}</div>
            </div>
            <div>
              <div className="text-gray-400 text-sm uppercase tracking-wider mb-2">Monthly Cost</div>
              <div className="text-4xl font-bold text-brand-amber">${totalCost}<span className="text-xl text-gray-500">/mo</span></div>
            </div>
            <div>
              <div className="text-gray-400 text-sm uppercase tracking-wider mb-2">Annual Cost</div>
              <div className="text-4xl font-bold text-white">${totalCost * 12}<span className="text-xl text-gray-500">/yr</span></div>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-800">
            <p className="text-gray-400 mb-2">Traditional equivalent: ~${traditionalCost}/month</p>
            <p className="text-brand-cyan font-bold">Your AI saving: {savings}% less</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-brand-surface to-[#1a1a2e] border border-gray-800 rounded-2xl p-8 mb-16 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Want the full breakdown of each recommended tool?</h3>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Get The AI Tools Starter Kit — our free guide covering setup, pricing and first steps for every tool in your stack.
          </p>
          <div className="max-w-md mx-auto">
            <ConvertKitForm buttonText="Send Me the Guide →" />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 justify-center mb-16">
          <Link to="/tools/saas-calculator" className="px-8 py-4 rounded-full font-bold border-2 border-brand-cyan text-brand-cyan hover:bg-brand-cyan/10 transition-colors text-center">
            Check Your Savings →
          </Link>
          <button onClick={resetQuiz} className="px-8 py-4 rounded-full font-bold border-2 border-gray-700 text-gray-300 hover:bg-gray-800 transition-colors text-center">
            Retake Quiz
          </button>
        </div>

        <div className="border-t border-gray-800 pt-16 text-center">
          <h3 className="text-xl font-bold text-white mb-6">Share your stack</h3>
          <div className="bg-brand-surface border border-gray-800 rounded-xl p-6 max-w-2xl mx-auto mb-6 text-left">
            <p className="text-gray-300 font-mono text-sm">
              I just got my personalised AI tool stack recommendation at domskysolutions.com/tools/stack-recommender<br/><br/>
              My top pick for {roleTitle}: {recommendedTools[0]?.name}<br/><br/>
              Find yours — takes 2 minutes 👇
            </p>
          </div>
          <div className="flex justify-center gap-4">
            <button 
              onClick={() => {
                navigator.clipboard.writeText(`I just got my personalised AI tool stack recommendation at domskysolutions.com/tools/stack-recommender\n\nMy top pick for ${roleTitle}: ${recommendedTools[0]?.name}\n\nFind yours — takes 2 minutes 👇`);
                alert('Copied to clipboard!');
              }}
              className="flex items-center gap-2 px-6 py-3 rounded-full font-bold bg-gray-800 text-white hover:bg-gray-700 transition-colors"
            >
              <Copy size={18} /> Copy
            </button>
            <a 
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`I just got my personalised AI tool stack recommendation at domskysolutions.com/tools/stack-recommender\n\nMy top pick for ${roleTitle}: ${recommendedTools[0]?.name}\n\nFind yours — takes 2 minutes 👇`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-full font-bold bg-white text-black hover:bg-gray-200 transition-colors"
            >
              <Share2 size={18} /> Share on X
            </a>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-brand-dark pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        {!showResults && !isCalculating && (
          <div className="text-center mb-16">
            <div className="inline-block bg-brand-cyan/10 text-brand-cyan text-xs font-bold font-mono px-3 py-1 rounded-full uppercase tracking-wider mb-6">
              FREE — PERSONALISED RESULTS
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
              Find Your Perfect AI Stack
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Answer 5 quick questions. Get a personalised set of AI tools matched to your role, goals and budget. Takes under 2 minutes.
            </p>
          </div>
        )}

        {isCalculating ? renderLoading() : showResults ? renderResults() : renderStep()}
      </div>
    </div>
  );
};

```


### src/data/navigation.ts

```tsx

export const toolsDropdown = [
  {
    icon: "🔬",
    title: "AI Tool Reviews",
    description: "11 tools tested and rated",
    link: "/tools",
    badge: null
  },
  {
    icon: "📊", 
    title: "SaaS Reviews",
    description: "In-depth software breakdowns",
    link: "/reviews",
    badge: null
  },
  {
    icon: "✍️",
    title: "Claude Prompt Builder",
    description: "Build perfect prompts instantly",
    link: "/tools/prompt-builder",
    badge: "FREE TOOL"
  },
  {
    icon: "💰",
    title: "SaaS Calculator",
    description: "Find your AI savings instantly",
    link: "/tools/saas-calculator",
    badge: "FREE TOOL"
  },
  {
    icon: "🎯",
    title: "AI Stack Recommender",
    description: "Get your personalised AI stack",
    link: "/tools/stack-recommender",
    badge: "NEW"
  },
  {
    icon: "🛠️",
    title: "Tools We Use",
    description: "What runs this site",
    link: "/uses",
    badge: null
  }
];
export const featuredTools = [
  { id: 'claude', name: 'Claude 3.5', category: 'Writing', desc: 'Anthropic\'s most capable model yet, excelling at coding and complex reasoning.', rating: 4.9, personalTake: 'Saves time' },
  { id: 'perplexity', name: 'Perplexity', category: 'Research', desc: 'The AI search engine that actually cites its sources. A Google killer.', rating: 4.8, personalTake: 'Saves time' },
  { id: 'notion-ai', name: 'Notion AI', category: 'Productivity', desc: 'Your workspace, supercharged. Write, brainstorm, and summarize instantly.', rating: 4.7, personalTake: 'Worth testing' },
  { id: 'runway', name: 'Runway Gen-3', category: 'Video', desc: 'High-fidelity, controllable video generation for creative professionals.', rating: 4.8, personalTake: 'Overhyped' },
  { id: 'elevenlabs', name: 'ElevenLabs', category: 'Audio', desc: 'The undisputed king of AI voice generation and text-to-speech.', rating: 4.9, personalTake: 'Worth testing' },
  { id: 'cursor', name: 'Cursor', category: 'Coding', desc: 'The AI-first code editor that feels like pair programming with a genius.', rating: 5.0, personalTake: 'Saves time' },
];

```


### src/data/toolReviews.ts

```tsx

export const toolReviews = {
  'claude': {
    name: 'Claude by Anthropic',
    category: 'AI Assistant / Writing',
    rating: 4.9,
    externalLink: 'https://claude.ai',
    tagline: 'The AI that actually understands nuance',
    heroDesc: [
      "Claude is Anthropic's flagship AI assistant, and in a crowded market full of chatbots, it manages to stand out for one simple reason — it feels genuinely intelligent. Built from the ground up with safety and helpfulness in mind, Claude excels at the kinds of tasks that make other AI tools stumble: long-form writing, complex reasoning, nuanced conversation, and coding.",
      "Whether you're a founder drafting investor updates, a marketer writing campaign copy, or a developer debugging a tricky piece of code, Claude adapts to your style and delivers results that actually sound like a human wrote them — not a robot trying to sound like one.",
      "What separates Claude from the pack is its massive context window — it can read and reason over enormous amounts of text in a single conversation. Hand it a 50-page business report and ask it to summarize the three biggest risks. It handles it effortlessly. That alone makes it indispensable for knowledge workers drowning in information."
    ],
    features: [
      "200,000 token context window (one of the largest available)",
      "Exceptional long-form writing and editing",
      "Advanced coding assistance across all major languages",
      "Deep document analysis — PDFs, reports, research papers",
      "Nuanced reasoning on complex topics",
      "Artifacts feature — generates live previews of code and documents",
      "Available via web, mobile app, and API",
      "Memory across conversations (Pro plan)"
    ],
    pros: [
      "Best-in-class writing quality — responses feel natural and human",
      "Handles extremely long documents without losing context",
      "Refuses to hallucinate facts as often as competitors",
      "Excellent at following complex, multi-step instructions",
      "Clean, distraction-free interface",
      "Strong coding capabilities — great for non-developers too",
      "Free tier is genuinely useful, not crippled"
    ],
    cons: [
      "No image generation (unlike ChatGPT with DALL-E)",
      "Can be overly cautious on some sensitive topics",
      "No internet browsing on the free plan",
      "API costs can add up at scale",
      "No voice mode yet"
    ],
    pricingCards: [
      {
        name: "Free Plan",
        price: "Free",
        features: ["Access to Claude Sonnet", "Limited daily messages", "Basic features"],
        perfectFor: "casual users and trying it out"
      },
      {
        name: "Pro Plan",
        price: "$20/month",
        features: ["Access to all Claude models including Opus", "5x more usage than free", "Priority access during peak times", "Memory and Projects features"],
        perfectFor: "professionals and power users"
      },
      {
        name: "Team Plan",
        price: "$25/user/month",
        features: ["Everything in Pro", "Shared Projects for collaboration", "Admin controls"],
        perfectFor: "small teams and agencies"
      },
      {
        name: "API Access",
        price: "Pay per token",
        features: ["Full model access"],
        perfectFor: "developers building AI-powered products"
      }
    ],
    bestFor: [
      "Claude is the best AI assistant for people who work with words and ideas for a living. Copywriters, content strategists, founders writing pitch decks, researchers synthesizing literature, developers who need a coding partner that actually explains its reasoning — Claude is built for you.",
      "If your primary use case is image generation or you need real-time web search built in, look elsewhere. But for thinking, writing, and reasoning? Claude is our top pick."
    ],
    verdict: "Claude by Anthropic is the AI assistant we recommend to almost everyone starting out with AI tools. The free plan is good enough to get real work done, the Pro plan at $20/month is one of the best value subscriptions in the AI space, and the quality of output consistently beats the competition on writing and reasoning tasks.\n\nIf you only try one AI tool this year, make it Claude.",
    bestForTags: "Writing, Research, Coding, Document Analysis",
    pricingSummary: "Free — $25/user/month",
    ctaPrimary: "Try Claude Free →"
  },
  'perplexity': {
    name: 'Perplexity AI',
    category: 'AI Search / Research',
    rating: 4.8,
    externalLink: 'https://perplexity.ai',
    tagline: 'Google, but it actually answers your question',
    heroDesc: [
      "If you've ever typed a question into Google and spent the next ten minutes clicking through tabs, skimming articles, and trying to piece together an answer — Perplexity AI was built specifically to fix that. It's not a chatbot. It's not a search engine. It's the best of both combined into something that feels genuinely new.",
      "Type any question and Perplexity searches the web in real time, reads the most relevant sources, synthesizes the information, and gives you a direct, cited answer in seconds. Every claim is linked back to its source so you can verify anything instantly. No ads. No SEO spam. No ten blue links sending you somewhere else. Just the answer.",
      "For researchers, founders, journalists, students, and anyone who spends serious time finding information online, Perplexity is not just a nice-to-have — it becomes genuinely hard to work without once you've used it for a week. It handles everything from quick factual lookups to deep multi-step research threads, and its Spaces feature lets you build persistent research hubs around any topic you follow regularly."
    ],
    features: [
      "Real-time web search with cited sources on every answer",
      "Follow-up questions that maintain full conversation context",
      "Focus modes: Web, Academic, YouTube, Reddit, News, Social",
      "Perplexity Spaces — persistent research hubs by topic",
      "File upload — analyze PDFs, CSVs, documents",
      "Image search and generation (Pro)",
      "Mobile app for iOS and Android",
      "API access for developers",
      "Collections to save and organize research"
    ],
    pros: [
      "Every answer cites its sources — fully verifiable",
      "Real-time information — no knowledge cutoff problem",
      "Dramatically faster than traditional research workflows",
      "Academic mode searches peer-reviewed papers directly",
      "Reddit and YouTube focus modes are genuinely useful",
      "Clean, ad-free interface",
      "Free tier is powerful enough for daily use",
      "Spaces feature is excellent for ongoing research topics"
    ],
    cons: [
      "Depth of reasoning doesn't match Claude or GPT-4 on complex analysis tasks",
      "Can occasionally misread or misrepresent source content",
      "Not ideal for creative writing or content generation",
      "Pro plan needed for the best model access",
      "Less useful for tasks that don't require web information",
      "Answer quality depends heavily on source quality available"
    ],
    pricingCards: [
      {
        name: "Free Plan",
        price: "Free",
        features: ["Unlimited quick searches", "Limited Pro searches per day", "Basic AI model", "File uploads (limited)"],
        perfectFor: "daily quick research and fact checking"
      },
      {
        name: "Pro Plan",
        price: "$20/month (or $200/year)",
        features: ["300+ Pro searches per day", "Access to best AI models including GPT-4 and Claude", "Unlimited file uploads", "Image generation", "Perplexity Spaces", "API credits included"],
        perfectFor: "researchers, founders, power users"
      },
      {
        name: "Enterprise Plan",
        price: "Custom pricing",
        features: ["Team management and admin controls", "SSO and security features", "Usage analytics"],
        perfectFor: "companies and research teams"
      }
    ],
    bestFor: [
      "Perplexity is the essential tool for anyone whose job involves finding, synthesizing, or staying on top of information. Journalists fact-checking stories, founders researching competitors, investors tracking market developments, students writing papers, marketers monitoring industry trends — if you need to know things quickly and accurately, Perplexity belongs in your daily workflow.",
      "It is not the right tool if you primarily need help with writing, coding, or creative tasks — for those, Claude or Cursor are better fits. But as a research companion, nothing currently comes close."
    ],
    verdict: "Perplexity AI has quietly become one of the most useful tools in the modern knowledge worker's stack. The free plan alone is enough to replace Google for most research tasks, and the Pro plan at $20/month unlocks a level of research capability that would have required a team of assistants just five years ago.\n\nThe cited sources feature alone makes it worth using over any other AI tool for research — you always know where the information came from, which means you can trust it enough to act on it. In the age of AI hallucinations, that matters enormously.\n\nIf Claude is your thinking partner, Perplexity is your research assistant. Most serious AI users have both open at the same time.",
    bestForTags: "Research, Fact-checking, News Monitoring, Academic Research",
    pricingSummary: "Free — $20/month",
    ctaPrimary: "Try Perplexity Free →"
  },
  'notion-ai': {
    name: 'Notion AI',
    category: 'Productivity / AI Writing Assistant',
    rating: 4.7,
    externalLink: 'https://notion.so',
    tagline: 'Your second brain, now with actual intelligence',
    heroDesc: [
      "Notion was already the productivity tool that everyone recommended before AI existed. A beautiful, flexible workspace where you could write docs, manage projects, build wikis, track tasks, and run your entire business from a single tab. Then they added AI, and something that was already indispensable became genuinely extraordinary.",
      "Notion AI doesn't feel like an AI tool bolted onto a productivity app as an afterthought — it feels like it was always meant to be there. It lives inside your workspace, understands your documents, your projects, your meeting notes, and your databases, and helps you do more with all of it without ever making you switch context. Ask it to summarize last week's meeting notes, draft a project brief from a few bullet points, find action items across three different docs, or translate a page into another language — it handles all of it without you leaving the page you're already on.",
      "For solopreneurs, small teams, and founders who live inside Notion already, adding Notion AI is one of the highest-leverage decisions you can make. It doesn't just help you write faster — it helps you think faster, organize faster, and act faster on everything already living in your workspace. If your knowledge base is in Notion, Notion AI turns it into something you can actually have a conversation with."
    ],
    features: [
      "AI writing assistant built directly into every page",
      "Summarize any document or database instantly",
      "Draft content from bullet points or rough notes",
      "Ask questions across your entire Notion workspace",
      "Action item extraction from meeting notes",
      "Auto-fill database properties with AI",
      "Translate pages into 20+ languages",
      "Improve, shorten, or change tone of any text",
      "Generate tables, timelines, and structured content",
      "Works across all Notion page types and databases"
    ],
    pros: [
      "Deeply integrated — no context switching required",
      "Understands your entire workspace not just one doc",
      "Dramatically speeds up meeting note processing",
      "Auto-fill databases saves hours of manual data entry",
      "Translation feature is genuinely excellent",
      "Perfect for teams already using Notion",
      "Constantly improving with frequent feature updates",
      "Works on mobile app seamlessly",
      "One of the most intuitive AI tools for non-technical users"
    ],
    cons: [
      "Only useful if you already use or commit to Notion",
      "AI add-on costs extra on top of Notion subscription",
      "Not as powerful as Claude for deep writing tasks",
      "Q&A across workspace can miss context sometimes",
      "No real-time web search or live information",
      "Database AI features still maturing",
      "Can feel expensive when stacking all plan costs"
    ],
    pricingCards: [
      {
        name: "Free Plan",
        price: "Free",
        features: ["Basic Notion workspace", "Limited AI responses to try the feature", "Up to 10 guests"],
        perfectFor: "individuals testing Notion and Notion AI"
      },
      {
        name: "Plus Plan",
        price: "$10/month + $10/month AI add-on",
        features: ["Unlimited pages and blocks", "Notion AI included as add-on", "Unlimited file uploads", "30 day page history"],
        perfectFor: "solopreneurs and freelancers"
      },
      {
        name: "Business Plan",
        price: "$15/user/month + $10/user/month AI",
        features: ["Everything in Plus", "Private teamspaces", "Advanced analytics", "90 day page history", "SAML SSO"],
        perfectFor: "small to medium teams"
      },
      {
        name: "Enterprise",
        price: "Custom pricing",
        features: ["Everything in Business", "Advanced security and compliance", "Unlimited page history", "Dedicated customer success"],
        perfectFor: "large organizations"
      }
    ],
    bestFor: [
      "Notion AI is the perfect tool for people who already run their work life inside Notion — founders managing their company wiki, content creators organizing their editorial calendar, consultants building client workspaces, or teams tracking projects and meeting notes in shared databases. If that sounds like you, Notion AI is a no-brainer addition that pays for itself in saved time within the first week.",
      "If you don't already use Notion, the question becomes whether it's worth switching your entire workflow to get access to Notion AI specifically. For most people the answer is yes — Notion is the best all-in-one workspace tool available regardless of the AI features, and the AI makes it significantly more powerful. But if you're deeply embedded in another tool like Confluence or Linear, the switching cost is real and worth considering carefully."
    ],
    verdict: "Notion AI earns its place in any serious productivity stack by doing something deceptively simple — it makes your existing work more valuable. Every meeting note, every project brief, every brainstorm doc you've ever written in Notion becomes something you can query, summarize, and build on instantly. That compounds over time in a way that standalone AI tools can't replicate.\n\nThe pricing stacks up faster than you'd like once you add the AI add-on to a paid plan, but for anyone already paying for Notion the additional $10/month for AI is one of the easiest upgrade decisions in productivity software. The time it saves in the first month alone justifies the cost many times over.\n\nIf you want one workspace that handles your docs, projects, databases, and AI assistance without switching between five different tools, Notion AI is the closest thing to a complete solution that currently exists.",
    bestForTags: "Solopreneurs, Small Teams, Founders, Content Creators",
    pricingSummary: "Free — Custom Enterprise",
    ctaPrimary: "Try Notion AI Free →"
  },
  'runway': {
    name: 'Runway',
    category: 'AI Video Generation / Creative Tools',
    rating: 4.8,
    externalLink: 'https://runwayml.com',
    tagline: 'Hollywood-grade video generation in your browser',
    heroDesc: [
      "Video production used to require a camera crew, a editing suite, a motion graphics team, and a budget that most small businesses and creators couldn't justify. Runway is systematically dismantling every one of those barriers. It is the most powerful AI video generation and editing platform available today, and it is being used right now by independent creators, marketing teams, and yes — actual Hollywood studios — to produce video content that would have been impossible without a massive production budget just two years ago.",
      "Runway's flagship product Gen-3 Alpha generates high-fidelity, temporally consistent video from a text prompt, an image, or an existing video clip. The results are not the blurry, glitchy AI video outputs that gave the category a bad reputation early on — they are smooth, cinematic, and controllable in ways that make them genuinely useful for professional creative work. Describe a scene, set a visual style, define a camera movement, and Runway renders it in seconds.",
      "But Runway is far more than a video generator. It is a complete AI creative suite — with tools for removing backgrounds, expanding images, generating music, editing video with text prompts, training custom AI models on your own visual style, and turning static images into living, breathing video scenes. For content creators, marketers, filmmakers, and anyone who communicates visually, Runway is not the future of creative work. It is the present, and it is moving faster than any other tool in this list."
    ],
    features: [
      "Gen-3 Alpha — state of the art text to video generation",
      "Image to video — animate any still image",
      "Video to video — transform existing footage with AI",
      "Motion Brush — control exactly what moves in a scene",
      "Director Mode — precise camera movement control",
      "Background removal — one click, no green screen needed",
      "Inpainting — remove or replace objects in video",
      "Text to image generation",
      "Custom AI model training on your visual style",
      "Audio generation — create music and sound effects",
      "Collaboration tools for creative teams",
      "Green screen and rotoscoping automation"
    ],
    pros: [
      "Most advanced AI video generation available today",
      "Gen-3 produces genuinely cinematic quality output",
      "Motion Brush gives precise creative control",
      "Complete creative suite — not just video generation",
      "Custom model training is unique and powerful",
      "Actively used by professional filmmakers and studios",
      "Browser based — no powerful hardware required",
      "Regular model updates keep pushing quality higher",
      "Excellent for social media content creation at scale"
    ],
    cons: [
      "Free tier is very limited — credits run out fast",
      "Pro plan needed for serious creative work",
      "Video generations can still be inconsistent on complex scenes",
      "Longer video clips cost significantly more credits",
      "Steep learning curve to get consistently great results",
      "Not suitable for talking head or dialogue video yet",
      "Output resolution capped depending on plan",
      "Credit system can feel restrictive for heavy users"
    ],
    pricingCards: [
      {
        name: "Free Plan",
        price: "Free",
        features: ["125 one time credits on signup", "Access to basic AI tools", "Watermarked exports"],
        perfectFor: "testing and exploring what Runway can do"
      },
      {
        name: "Standard Plan",
        price: "$15/month",
        features: ["625 credits per month", "Upscaling up to 4K", "No watermarks", "Gen-3 Alpha access"],
        perfectFor: "casual creators and social media managers"
      },
      {
        name: "Pro Plan",
        price: "$35/month",
        features: ["2250 credits per month", "Custom AI model training", "Priority generation queue", "Advanced video tools", "Highest resolution exports"],
        perfectFor: "professional creators and marketing teams"
      },
      {
        name: "Unlimited Plan",
        price: "$95/month",
        features: ["Unlimited standard generations", "All Pro features included", "Maximum resolution and quality"],
        perfectFor: "studios and agencies producing at scale"
      },
      {
        name: "Enterprise",
        price: "Custom pricing",
        features: ["Custom credit volumes", "Dedicated infrastructure", "Advanced security and compliance", "API access"],
        perfectFor: "media companies and large creative teams"
      }
    ],
    bestFor: [
      "Runway is built for anyone who creates visual content professionally or seriously. Social media managers who need a constant stream of high quality video content without a production team. Marketing agencies delivering video campaigns at a fraction of traditional costs. Independent filmmakers and music video directors using AI to punch above their budget. Content creators on YouTube, TikTok, and Instagram who want their videos to look like they cost ten times more than they did. And brands who want to maintain a consistent visual identity across all their video output by training a custom model on their own aesthetic.",
      "If you produce video content of any kind and you are not at least experimenting with Runway, you are already behind your competitors who are."
    ],
    verdict: "Runway is the most impressive creative AI tool we have reviewed, full stop. The gap between what is possible with Runway today and what required a professional production team twelve months ago is staggering, and that gap is widening with every model update they ship.\n\nThe credit system and pricing can frustrate heavy users, and the free tier genuinely is too limited to form a proper opinion of what the tool can do at its best. Our recommendation is to start with the Standard plan at $15/month, spend a month really learning the tool, and upgrade to Pro once you understand how to get consistently great results from it.\n\nFor anyone in a creative field, Runway is not optional much longer. The creators and teams adopting it now are building a significant competitive advantage over those waiting to see how the technology matures. It is already mature enough to matter.",
    bestForTags: "Content Creators, Marketers, Filmmakers, Agencies",
    pricingSummary: "Free — Custom Enterprise",
    ctaPrimary: "Try Runway Free →"
  },
  'elevenlabs': {
    name: 'ElevenLabs',
    category: 'Audio',
    rating: 4.9,
    externalLink: 'https://elevenlabs.io',
    heroDesc: [
      "ElevenLabs has completely redefined the standard for AI-generated audio. Its text-to-speech engine produces voices that are nearly indistinguishable from human speakers, complete with natural pacing, intonation, and emotion.",
      "Beyond standard TTS, their voice cloning technology allows you to create a digital replica of your own voice with just a few minutes of audio. This has massive implications for audiobook narration, video dubbing, and accessibility.",
      "With support for dozens of languages and a massive library of community-created voices, ElevenLabs is the undisputed leader in the generative audio space."
    ],
    features: [
      "Ultra-realistic Text-to-Speech",
      "Instant and Professional Voice Cloning",
      "AI Dubbing across 29+ languages",
      "Extensive Voice Library"
    ],
    pros: ["Unmatched voice realism and emotion", "Very easy to use", "Excellent multilingual support"],
    cons: ["Pricing scales quickly with high character usage", "Ethical concerns regarding voice cloning misuse"],
    pricing: "Free tier available. Starter plan is $5/month.",
    verdict: "If you need AI voice generation, there is no other serious option. ElevenLabs is in a league of its own."
  },
  'cursor': {
    name: 'Cursor',
    category: 'AI Code Editor / Developer Tools',
    rating: 5.0,
    externalLink: 'https://cursor.sh',
    tagline: 'The code editor that makes you feel like a senior dev',
    heroDesc: [
      "There are tools that make you slightly more productive, and then there are tools that fundamentally change how you work. Cursor is the second kind. It's not a plugin, not an extension, not a chatbot bolted onto an existing editor — it's a complete rethink of what a code editor should be in the age of AI, and it executes that vision better than anything else on the market right now.",
      "Built on top of VS Code (so everything you already know transfers instantly), Cursor adds a layer of AI intelligence that goes far beyond autocomplete. It understands your entire codebase — not just the file you have open, but every file, every function, every dependency in your project. Ask it to add a feature, fix a bug, refactor a module, or explain why something is broken, and it responds with the full context of your actual project, not generic boilerplate that you have to adapt yourself.",
      "For professional developers, Cursor is like having a brilliant pair programmer available 24/7 who never gets tired, never judges your code, and always has time to explain their reasoning. For non-developers and founders who can write basic code but aren't engineers, it's something even more powerful — it's the tool that finally makes building real software feel accessible. Entire startups are being built with Cursor by people who couldn't have shipped a product alone two years ago."
    ],
    features: [
      "Full codebase awareness — understands your entire project",
      "Tab autocomplete that predicts multi-line changes",
      "CMD+K — edit any code with a natural language instruction",
      "Chat mode — ask questions about your codebase",
      "Composer — build entire features from a single prompt",
      "Agent mode — Cursor plans and executes multi-step tasks",
      "Built on VS Code — all extensions and shortcuts work",
      "Supports all major AI models: Claude, GPT-4, Gemini",
      "Terminal integration — runs commands on your behalf",
      "One-click bug fixing directly from error messages"
    ],
    pros: [
      "Codebase-wide context is a genuine game changer",
      "Feels like VS Code — zero learning curve for existing users",
      "Composer and Agent modes can build entire features solo",
      "Works with any programming language or framework",
      "Dramatically speeds up debugging and code review",
      "Makes coding accessible to non-developers",
      "Actively developed — major updates ship every few weeks",
      "Best-in-class tab autocomplete beats GitHub Copilot",
      "Free tier is genuinely useful for getting started"
    ],
    cons: [
      "Pro plan required to unlock full AI model access",
      "Can generate code that works but isn't best practice",
      "Agent mode can go off track on very complex tasks",
      "Heavy on API usage — costs can add up on the Pro plan",
      "Occasionally over-confident on bugs it hasn't fully understood",
      "Requires basic coding knowledge to get the most out of it",
      "Windows performance slightly behind Mac at times"
    ],
    pricingCards: [
      {
        name: "Free Plan (Hobby)",
        price: "Free",
        features: ["2,000 code completions per month", "50 slow premium requests", "Basic AI features"],
        perfectFor: "trying it out and light personal projects"
      },
      {
        name: "Pro Plan",
        price: "$20/month",
        features: ["Unlimited code completions", "500 fast premium requests per month", "Access to Claude, GPT-4, and all top models", "Unlimited slow premium requests", "Full Composer and Agent mode access"],
        perfectFor: "professional developers and serious builders"
      },
      {
        name: "Business Plan",
        price: "$40/user/month",
        features: ["Everything in Pro", "Centralized team billing", "Admin usage dashboard", "SSO and security controls", "Zero data retention policy"],
        perfectFor: "engineering teams and companies"
      }
    ],
    bestFor: [
      "Cursor is built for three types of people. First, professional software developers who want to move significantly faster — shipping features in hours that used to take days. Second, technical founders who can code but aren't full-time engineers — Cursor bridges the gap between your vision and a working product without needing to hire a developer for every change. Third, ambitious non-developers — people who are willing to learn the basics of coding and use Cursor's AI to handle the complexity they haven't learned yet.",
      "If you have never written a line of code and have no interest in learning even the basics, Cursor will be frustrating. But if you're willing to meet it halfway, the ceiling on what you can build alone is genuinely extraordinary."
    ],
    verdict: "Cursor earns its 5.0 rating because it does something rare in the software world — it delivers fully on an ambitious promise. The promise is that AI can make you a dramatically better, faster developer, and Cursor makes that true in a way that you feel from the very first session.\n\nThe free tier is enough to experience why everyone in the developer community is talking about it. The Pro plan at $20/month is, for any developer or technical founder, one of the easiest spending decisions in their entire software stack — it pays for itself the first time it saves you two hours of debugging.\n\nIn a world where AI tools often overpromise and underdeliver, Cursor is the exception. It is, without question, the best AI-powered developer tool available today.",
    bestForTags: "Developers, Technical Founders, Ambitious Builders",
    pricingSummary: "Free — $40/user/month",
    ctaPrimary: "Download Cursor Free →"
  },
  'midjourney': {
    name: 'Midjourney',
    category: 'AI Image Generation / Design',
    rating: 9.5,
    externalLink: 'https://midjourney.com',
    tagline: 'The gold standard of AI image generation',
    heroDesc: [
      "When people picture AI generated art, they are almost certainly picturing something made with Midjourney. It is the tool that put AI image generation on the map, the one that made headlines, sparked debates about the future of art, and quietly became the most used creative tool in the world for anyone who needs stunning visuals without a design team. Three years into its existence it remains the undisputed quality leader in the category it created.",
      "What separates Midjourney from every competitor is its aesthetic sensibility. Where other image generators produce technically accurate outputs, Midjourney produces beautiful ones. There is a quality to its rendering — the way it handles light, texture, composition, and mood — that feels less like a machine following instructions and more like a talented art director interpreting a brief. Type a prompt and Midjourney does not just generate what you asked for. It generates the best possible version of what you asked for, with a visual intelligence that consistently surprises even experienced users.",
      "Version 6 pushed the platform even further into territory that was previously exclusive to professional photography and illustration. Photorealistic portraits, cinematic landscapes, architectural visualizations, product mockups, editorial illustrations — all of it now within reach of anyone who can describe what they want in words. For designers, marketers, founders, and creators who need world class visuals on demand, Midjourney is not one option among many. It is the benchmark everything else is measured against."
    ],
    features: [
      "State of the art photorealistic image generation",
      "V6 model with unprecedented detail and accuracy",
      "Style tuning — train the model on your aesthetic",
      "Vary and remix — iterate on any generated image",
      "Zoom out — expand any image beyond its original frame",
      "Pan — extend images in any direction seamlessly",
      "Upscaling to maximum resolution for print quality",
      "Blend — combine multiple images into one",
      "Describe — reverse engineer prompts from any image",
      "Niji mode — specialized anime and illustration style",
      "Fast and relaxed generation modes",
      "Web interface and Discord bot access"
    ],
    pros: [
      "Highest aesthetic quality of any image generator",
      "Photorealism in V6 is genuinely indistinguishable",
      "Style consistency across image sets is excellent",
      "Describe feature is uniquely powerful for learning",
      "Niji mode best in class for anime and illustration",
      "Zoom and pan features unlock creative possibilities",
      "Active community with enormous prompt inspiration",
      "Regular model updates keep pushing quality forward",
      "Best tool for portfolio, marketing and brand visuals"
    ],
    cons: [
      "No free tier — subscription required from day one",
      "Discord interface is confusing for new users",
      "Web interface still maturing compared to Discord",
      "Text rendering in images still inconsistent",
      "Limited control over specific compositional details",
      "Cannot generate images of real named individuals",
      "Fast hours run out quickly on lower tier plans",
      "No API access for developers on standard plans"
    ],
    pricingCards: [
      {
        name: "Basic Plan",
        price: "$10/month",
        features: ["200 GPU minutes per month", "3.3 hours of fast generation", "Access to member gallery"],
        perfectFor: "casual users and occasional projects"
      },
      {
        name: "Standard Plan",
        price: "$30/month",
        features: ["15 hours of fast generation", "Unlimited relaxed generation", "3 concurrent jobs"],
        perfectFor: "regular creators and small teams"
      },
      {
        name: "Pro Plan",
        price: "$60/month",
        features: ["30 hours of fast generation", "Stealth mode for private generations", "12 concurrent jobs"],
        perfectFor: "professional designers and agencies"
      },
      {
        name: "Mega Plan",
        price: "$120/month",
        features: ["60 hours of fast generation", "Maximum concurrent jobs", "All Pro features included"],
        perfectFor: "studios and high volume production"
      }
    ],
    bestFor: [
      "Midjourney is the essential tool for anyone who needs high quality visuals regularly and does not have the budget or team for traditional design and photography production. Marketing managers building campaign assets, founders creating pitch deck visuals, content creators illustrating blog posts and social media, product designers mocking up concepts, architects visualizing spaces, and professional designers using AI to dramatically expand their output — all of them have made Midjourney a core part of their workflow.",
      "The one group for whom Midjourney is less suitable is developers looking to integrate image generation into products — for that use case, the APIs offered by Stability AI or OpenAI's DALL-E are more practical. But for human creative work, Midjourney is the tool you want."
    ],
    verdict: "Midjourney earns its Editor's Pick designation by doing one thing extraordinarily well — producing beautiful images. In a market full of capable tools, capability alone is no longer enough. Midjourney understood early that the metric that matters most for creative tools is not accuracy or speed but quality of output, and it has relentlessly optimized for that metric through every model iteration.\n\nThe lack of a free tier is a genuine barrier and the Discord interface remains unnecessarily intimidating for newcomers, but neither of those friction points changes the fundamental truth — when you need the best looking AI generated image possible, Midjourney is where you go. Start with the Basic plan at $10/month, learn the prompting craft, and upgrade when your usage demands it.",
    bestForTags: "Designers, Marketers, Content Creators, Founders",
    pricingSummary: "$10 — $120/month",
    ctaPrimary: "Start Creating with Midjourney →"
  },
  'jasper': {
    name: 'Jasper',
    category: 'AI Writing / Marketing Content',
    rating: 8.2,
    externalLink: 'https://jasper.ai',
    tagline: 'The AI copywriter built for marketing teams',
    heroDesc: [
      "Jasper was one of the first AI writing tools to take the market seriously, and it built its reputation by doing something the early wave of AI writers could not — producing marketing copy that actually converted. Not just grammatically correct sentences, but persuasive, brand-aware, strategically structured content that a marketing professional would be proud to put their name on. That early quality advantage helped Jasper build a loyal enterprise customer base that remains its core strength today.",
      "Where Jasper truly differentiates itself from standalone AI writing tools like Claude or ChatGPT is in its marketing-specific infrastructure. Brand Voice allows teams to train Jasper on their specific tone, style, and terminology so every piece of content it produces sounds like it came from the same company. Campaigns lets you plan and produce entire marketing campaigns — ads, emails, landing pages, social posts — from a single brief. Jasper Art generates on-brand visuals alongside the copy. These are not features you can replicate by prompting a general purpose AI — they are purpose-built workflows designed around how marketing teams actually operate.",
      "For growing companies and established marketing departments that need to produce large volumes of consistent, on-brand content across multiple channels simultaneously, Jasper delivers something genuinely valuable — a single platform where the entire content production workflow lives, from brief to published asset, with AI accelerating every step of the process."
    ],
    features: [
      "Brand Voice — train Jasper on your specific tone and style",
      "Campaigns — plan and produce full marketing campaigns",
      "50+ templates for every marketing content type",
      "Jasper Art — AI image generation for marketing visuals",
      "SEO mode — integrates with Surfer SEO for optimized content",
      "Team collaboration with roles and permissions",
      "Browser extension for writing anywhere on the web",
      "Plagiarism checker built in",
      "Supports 30+ languages",
      "Document editor with long form content support",
      "API access for custom integrations",
      "Knowledge base — teach Jasper about your products"
    ],
    pros: [
      "Brand Voice is genuinely excellent for consistency",
      "Marketing specific templates save enormous time",
      "Campaign workflow is unique and highly practical",
      "SEO integration with Surfer is a major advantage",
      "Team features are best in class for collaboration",
      "Knowledge base ensures product accuracy in outputs",
      "Browser extension makes it available everywhere",
      "Strong enterprise support and onboarding",
      "Constantly adding new templates and features"
    ],
    cons: [
      "Significantly more expensive than general AI tools",
      "Output quality doesn't always justify the premium over Claude or ChatGPT for simple writing tasks",
      "Can produce repetitive phrasing across long content",
      "Templates feel rigid for creative or unusual briefs",
      "Jasper Art quality lags behind Midjourney significantly",
      "Overkill for solo creators and small teams",
      "Requires investment of time to set up Brand Voice properly",
      "Annual billing required for best pricing"
    ],
    pricingCards: [
      {
        name: "Creator Plan",
        price: "$49/month",
        features: ["1 seat", "1 Brand Voice", "1 Knowledge Base", "Jasper Art included", "SEO mode included"],
        perfectFor: "solo marketers and freelance copywriters"
      },
      {
        name: "Pro Plan",
        price: "$69/month",
        features: ["3 Brand Voices", "10 Knowledge Bases", "Campaigns feature", "Collaboration tools", "3 seats included, add more at $25/seat"],
        perfectFor: "small marketing teams"
      },
      {
        name: "Business Plan",
        price: "Custom pricing",
        features: ["Unlimited Brand Voices", "Custom Knowledge Bases", "SSO and advanced security", "Dedicated account manager", "Custom workflows and integrations"],
        perfectFor: "enterprise marketing departments"
      }
    ],
    bestFor: [
      "Jasper is built for marketing teams at growth stage and enterprise companies who need to produce high volumes of consistent, on-brand content across multiple channels and cannot afford for that content to sound different depending on who wrote it. If you have a defined brand voice, a content calendar with real volume demands, a team of more than two people producing content, and a budget that reflects those needs — Jasper was designed specifically for you.",
      "For solo creators, freelancers, and early stage founders who are still finding their voice and watching every dollar, the price point is hard to justify when Claude or ChatGPT can handle most writing tasks at a fraction of the cost. Jasper's value is in its marketing infrastructure, and that infrastructure only pays off at scale."
    ],
    verdict: "Jasper is a genuinely excellent tool for the customer it was built for — the marketing team at a company serious enough about content to invest in the infrastructure that makes it consistent and scalable. The Brand Voice and Campaigns features alone can transform how a marketing department operates, and the SEO integration with Surfer gives content teams a meaningful advantage in organic search.\n\nThe pricing is the honest sticking point. At $49/month for a solo plan and $69/month for a small team, Jasper is a premium product at a premium price, and it needs to deliver premium results to justify the investment. For teams with real content volume and a clear brand voice to maintain, it does. For everyone else, the general purpose AI tools are probably enough.",
    bestForTags: "Marketing Teams, Growth Companies, Enterprise",
    pricingSummary: "$49/month — Custom Enterprise",
    ctaPrimary: "Try Jasper Free →"
  },
  'descript': {
    name: 'Descript',
    category: 'AI Video & Podcast Editing',
    rating: 9.0,
    externalLink: 'https://descript.com',
    tagline: 'Edit video and audio like a Google Doc',
    heroDesc: [
      "Every video and podcast editor has a moment early in their career where they realize that the craft they are learning is genuinely difficult — that cutting audio, removing silences, eliminating filler words, correcting mistakes, and producing a polished final output from raw recorded footage is a time consuming skill that takes years to develop. Descript looked at that reality and asked a simple question: what if editing audio and video was as easy as editing a text document? Then it built the answer.",
      "Descript transcribes your recording the moment you import it, turning every word spoken into editable text. Delete a sentence from the transcript and it disappears from the audio and video. Highlight a paragraph and replace it with new text and Descript generates new audio in your voice using its Overdub technology. Remove all filler words across an entire hour long recording with a single click. The editing paradigm it has created is so fundamentally different from traditional timeline based editors that experienced editors often find it faster than the tools they have spent years mastering.",
      "For podcasters, YouTubers, course creators, and anyone producing talking head or interview video content, Descript is not an incremental improvement on existing workflows — it is a complete replacement of them. The time savings are not marginal. Users consistently report cutting their editing time by 50 to 80 percent compared to traditional editing tools, and the quality of the output has reached a level where professional broadcasters and major media companies have adopted it as part of their production stack."
    ],
    features: [
      "Text based video and audio editing",
      "Automatic transcription in 23 languages",
      "Overdub — generate new audio in your own voice",
      "Filler word removal with one click",
      "Studio Sound — AI audio enhancement and noise removal",
      "Eye contact correction — makes you look at camera",
      "Green screen removal without a green screen",
      "Automatic chapter markers and show notes generation",
      "Screen recording built in",
      "Clip creation for social media from long form content",
      "Team collaboration with comments and version history",
      "Publish directly to YouTube, podcast hosts and more"
    ],
    pros: [
      "Text based editing is genuinely revolutionary",
      "Filler word removal alone saves hours per episode",
      "Overdub voice cloning is remarkably accurate",
      "Studio Sound audio enhancement is excellent",
      "Eye contact correction is uniquely powerful for video",
      "All in one — replaces multiple separate tools",
      "Best value proposition in the video editing category",
      "Collaboration features work well for remote teams",
      "Direct publishing saves additional workflow steps",
      "Constant feature additions keep raising the ceiling"
    ],
    cons: [
      "Transcription accuracy drops with heavy accents",
      "Overdub requires significant voice sample to work well",
      "Not suitable for complex narrative or cinematic editing",
      "Large project files can slow the editor down",
      "Timeline editor less powerful than Premiere or Final Cut",
      "Watermark on free plan exports",
      "Some AI features still feel experimental",
      "Learning curve for users coming from traditional editors"
    ],
    pricingCards: [
      {
        name: "Free Plan",
        price: "Free",
        features: ["1 hour of transcription per month", "Watermarked video exports", "720p export resolution", "Basic editing features"],
        perfectFor: "testing and very occasional use"
      },
      {
        name: "Creator Plan",
        price: "$24/month",
        features: ["10 hours of transcription per month", "No watermarks", "4K export resolution", "Overdub included", "Filler word removal"],
        perfectFor: "individual podcasters and YouTubers"
      },
      {
        name: "Pro Plan",
        price: "$40/month",
        features: ["30 hours of transcription per month", "Everything in Creator", "Advanced collaboration", "Priority support", "Unlimited Overdub usage"],
        perfectFor: "professional creators and small teams"
      },
      {
        name: "Enterprise",
        price: "Custom pricing",
        features: ["Unlimited transcription", "Advanced security and SSO", "Dedicated support", "Custom integrations"],
        perfectFor: "media companies and large teams"
      }
    ],
    bestFor: [
      "Descript is the perfect tool for anyone producing talking head video or audio content regularly — podcasters publishing weekly episodes, YouTubers producing tutorial or interview content, course creators recording educational material, and marketing teams producing video testimonials, demos, and thought leadership content. If the majority of your content involves people speaking to camera or into a microphone, Descript will transform your production workflow in ways that feel almost unfair compared to what everyone else is using.",
      "It is less suited for cinematic video production, heavily b-roll driven content, music videos, or any editing work that requires the precise frame level control of a professional timeline editor. For those use cases Premiere Pro or Final Cut remain the right tools. But for the enormous and growing universe of spoken word content, Descript has no equal."
    ],
    verdict: "Descript earns its Best Value designation because it delivers a genuinely transformative capability — text based audio and video editing — at a price point that makes it accessible to individual creators, not just production companies. The Creator plan at $24/month is one of the most compelling value propositions in the entire AI tools market, replacing what used to require a transcription service, an audio editor, a video editor, and hours of skilled labor with a single subscription that most users master in an afternoon.\n\nIf you produce any kind of spoken word content and you are still editing on a traditional timeline, Descript will feel like cheating the first time you use it. That feeling does not go away. It just becomes your new normal.",
    bestForTags: "Podcasters, YouTubers, Course Creators, Marketing Teams",
    pricingSummary: "Free — Custom Enterprise",
    ctaPrimary: "Try Descript Free →"
  },
  'framer': {
    name: 'Framer AI',
    category: 'AI Website Builder / Design Tool',
    rating: 8.5,
    externalLink: 'https://framer.com',
    tagline: 'From idea to live website in minutes',
    heroDesc: [
      "Website builders have existed for decades, and for decades they have made the same implicit promise — that anyone can build a professional website without knowing how to code. Most of them delivered something technically true but practically disappointing: websites that looked like they were built with a website builder, limited in their design possibilities, and impossible to customize beyond what the template allowed. Framer AI is the first tool in this category that actually delivers on the original promise without compromise.",
      "Type a description of the website you want to build and Framer AI generates a complete, fully designed, responsive website in seconds. Not a template with placeholder content — a real website with a coherent design system, properly structured sections, and copy written for your specific use case. From that starting point, Framer's visual editor gives you the kind of precise design control that previously required knowing Figma and having a developer translate your designs into code. Animations, interactions, responsive breakpoints, CMS powered dynamic content — all of it accessible through a visual interface that professional designers find as capable as the tools they trained on.",
      "What Framer has built is genuinely rare in the software world — a tool that serves two very different audiences exceptionally well simultaneously. Non-designers can go from idea to live professional website faster than any other tool makes possible. Professional designers can build production quality websites with design system rigor and interaction depth that no other no-code tool can match. That dual capability, combined with the AI generation layer that gets both groups to a strong starting point instantly, makes Framer AI one of the most impressive product achievements in the current wave of AI tools."
    ],
    features: [
      "AI website generation from text description",
      "Visual drag and drop editor with design system support",
      "Animations and interactions without code",
      "CMS for dynamic content and blog posts",
      "Responsive design with full breakpoint control",
      "Custom domain connection and one click publishing",
      "Component library with reusable design elements",
      "SEO controls built into the editor",
      "Localization for multi language websites",
      "Team collaboration with real time multiplayer",
      "Version history and one click rollback",
      "Analytics dashboard built in"
    ],
    pros: [
      "AI generation produces genuinely impressive starting points",
      "Design quality ceiling is highest of any no-code tool",
      "Animations and interactions are unique in the category",
      "CMS is powerful enough for serious content sites",
      "Publishing and hosting included — no separate setup",
      "Real time collaboration is excellent for design teams",
      "SEO controls are comprehensive and accessible",
      "Component system enables true design consistency",
      "Free plan is genuinely useful for small projects"
    ],
    cons: [
      "Learning curve steeper than simpler website builders",
      "AI generation still needs significant manual refinement",
      "E-commerce features limited compared to Shopify",
      "CMS less powerful than dedicated platforms like Webflow",
      "Can feel overwhelming for complete beginners",
      "Some advanced interactions require workarounds",
      "Template library smaller than competitors",
      "Price jumps significantly for CMS and team features"
    ],
    pricingCards: [
      {
        name: "Free Plan",
        price: "Free",
        features: ["1 project", "Framer subdomain only", "Basic pages and components", "Community support"],
        perfectFor: "personal projects and testing"
      },
      {
        name: "Mini Plan",
        price: "$10/month",
        features: ["1 custom domain", "Basic CMS", "1,000 CMS items", "Standard analytics"],
        perfectFor: "personal websites and simple portfolios"
      },
      {
        name: "Basic Plan",
        price: "$20/month",
        features: ["1 custom domain", "Full CMS access", "10,000 CMS items", "Advanced analytics", "Password protection"],
        perfectFor: "small business websites and blogs"
      },
      {
        name: "Pro Plan",
        price: "$40/month",
        features: ["3 custom domains", "Unlimited CMS items", "Staging environment", "Priority support"],
        perfectFor: "professional designers and agencies"
      }
    ],
    bestFor: [
      "Framer AI is the perfect tool for three distinct groups. First, professional designers and design agencies who want to build and ship production quality websites without being blocked by a development handoff process. Second, founders and product teams who need a marketing site that looks genuinely world class without the budget for a designer and developer working together. Third, anyone who has been frustrated by the design limitations of tools like Squarespace or Wix and wants the creative freedom of a professional design tool without needing to learn to code.",
      "If you primarily need e-commerce functionality or a very content heavy publication, Shopify and Webflow respectively serve those specific needs better. But for marketing sites, portfolios, product landing pages, and startup websites where design quality matters enormously, Framer AI is the strongest tool available."
    ],
    verdict: "Framer AI earns its Designers Choice designation by pushing the ceiling of what is possible in a no-code website builder to a place that was previously only achievable with a full design and development team. The AI generation feature genuinely accelerates the starting point, the visual editor delivers professional design capability, and the publishing infrastructure handles everything from hosting to SEO in a single platform.\n\nThe Basic plan at $20/month is the sweet spot for most users — it unlocks the full CMS, a custom domain, and everything needed to run a serious marketing or content website. Start on the free plan to learn the tool, upgrade when you are ready to go live with a custom domain, and discover why professional designers are increasingly choosing Framer over every other option in the market.",
    bestForTags: "Designers, Founders, Agencies, Product Teams",
    pricingSummary: "Free — $40/month",
    ctaPrimary: "Build with Framer Free →"
  },
  'synthesia': {
    name: 'Synthesia',
    category: 'AI Video / Avatar Creation',
    rating: 8.8,
    externalLink: 'https://synthesia.io',
    tagline: 'Professional video without a camera or crew',
    heroDesc: [
      "Corporate video production has always been expensive, time consuming, and logistically complicated. You need a camera, a crew, a location, a presenter who is comfortable on camera, a script that someone has to memorize or read convincingly from a teleprompter, post production editing, and a budget that reflects all of those requirements. For training videos, product updates, internal communications, and localized content across multiple markets, the cost and complexity of traditional video production has always been the bottleneck. Synthesia removes that bottleneck entirely.",
      "Type a script, choose an AI avatar from a library of over 230 diverse presenters, select a language from 140 options, and Synthesia generates a professional quality video of your avatar delivering your script with natural lip sync, appropriate gestures, and a presentation style that would pass as human recording in most professional contexts. The entire process takes minutes. No camera. No crew. No presenter. No studio. No reshoots when the script changes. Just a finished video ready to share or embed wherever your audience is.",
      "For enterprise learning and development teams, Synthesia has become the standard platform for producing training content at scale. A compliance training module that used to require weeks of production time and thousands in budget can now be produced and updated in an afternoon. A product tutorial that needs to exist in twelve languages no longer requires twelve separate recording sessions. A CEO update that needs to reach offices across six countries can be localized automatically without the CEO recording it six times. These are not marginal improvements — they are fundamental changes to what is possible in corporate video communication."
    ],
    features: [
      "230+ AI avatars with diverse representation",
      "140+ languages with natural lip sync",
      "Custom avatar creation from your own video",
      "60+ professionally designed video templates",
      "Screen recording and demo videos",
      "Automatic closed captions and subtitles",
      "Brand kit — colors, fonts, logos across all videos",
      "Player with analytics and engagement tracking",
      "SCORM export for LMS integration",
      "Team collaboration with review and approval workflow",
      "API for programmatic video generation at scale",
      "Closed caption translation across all languages"
    ],
    pros: [
      "Most realistic AI avatars currently available",
      "140 language support is unmatched in the category",
      "Custom avatar from your own likeness is powerful",
      "Template library covers most corporate use cases",
      "SCORM export makes LMS integration seamless",
      "Brand kit ensures visual consistency across videos",
      "Analytics show exactly how viewers engage with content",
      "No video production skills required whatsoever",
      "Update videos instantly when content changes",
      "Enormous time and cost savings vs traditional production"
    ],
    cons: [
      "Avatar realism still noticeable to careful observers",
      "Emotional range of avatars is limited",
      "Not suitable for creative or entertainment video",
      "Pricing is enterprise focused and relatively high",
      "Free plan very limited for meaningful evaluation",
      "Less suitable for conversational or unscripted content",
      "Script writing still requires human effort and skill",
      "Avatar gestures can feel repetitive in longer videos"
    ],
    pricingCards: [
      {
        name: "Free Plan",
        price: "Free",
        features: ["3 minutes of video per month", "9 avatar options", "1 language", "Watermarked exports"],
        perfectFor: "basic testing only"
      },
      {
        name: "Starter Plan",
        price: "$29/month",
        features: ["10 minutes of video per month", "90+ avatars", "140+ languages", "No watermark", "1 custom avatar"],
        perfectFor: "individual content creators"
      },
      {
        name: "Creator Plan",
        price: "$89/month",
        features: ["30 minutes of video per month", "All 230+ avatars", "Priority rendering", "Brand kit", "Advanced analytics"],
        perfectFor: "marketing teams and course creators"
      },
      {
        name: "Enterprise",
        price: "Custom pricing",
        features: ["Unlimited video minutes", "Custom avatar development", "SCORM and LMS integration", "SSO and advanced security", "Dedicated customer success", "API access"],
        perfectFor: "large L&D teams and global companies"
      }
    ],
    bestFor: [
      "Synthesia is purpose built for corporate and professional video production at scale. Learning and development teams producing training content across global workforces. HR departments communicating policy updates and onboarding materials to distributed teams. Marketing teams producing product demos and explainer videos across multiple markets and languages. Customer success teams creating tutorial libraries that need to stay current as products evolve. And any organization that has historically avoided video communication because of the cost and complexity of traditional production.",
      "If your primary need is creative, entertainment, or social media video content where production values and human authenticity matter most, Runway and Descript are better fits. Synthesia's strength is professional utility video at scale, and in that category it has no serious competitor."
    ],
    verdict: "Synthesia earns its Top Rated designation by delivering extraordinary value in a specific and important use case — professional video production for organizations that need to communicate at scale across languages, geographies, and constantly changing content requirements. The avatar realism is not perfect, but it has crossed the threshold where it is professional enough for the corporate contexts it was designed to serve, and the operational advantages it delivers over traditional video production are so significant that the remaining quality gap simply does not matter to most of its customers.\n\nThe Starter plan at $29/month gives individual users enough to evaluate the platform seriously and produce real content. Most organizations that adopt Synthesia end up on the Enterprise plan, where the unlimited video minutes and LMS integration deliver the full return on investment that makes it one of the most defensible software purchases in the enterprise stack.",
    bestForTags: "L&D Teams, HR, Marketing, Global Organizations",
    pricingSummary: "$29/month — Custom Enterprise",
    ctaPrimary: "Try Synthesia Free →"
  }
};

```


### src/data/saasReviews.ts

```tsx

export const saasReviews = [
  { name: 'Midjourney v6', score: 9.5, bestFor: 'Photorealistic image generation', tag: 'Editor\'s Pick 🏆', link: '/reviews/midjourney' },
  { name: 'Jasper', score: 8.2, bestFor: 'Enterprise marketing teams', tag: 'Best for Teams 👥', link: '/reviews/jasper' },
  { name: 'Descript', score: 9.0, bestFor: 'Podcast and video editing', tag: 'Best Value 💰', link: '/reviews/descript' },
  { name: 'Framer AI', score: 8.5, bestFor: 'Rapid website prototyping', tag: 'Designers Choice 🎨', link: '/reviews/framer' },
  { name: 'Synthesia', score: 8.8, bestFor: 'AI avatar video creation', tag: 'Top Rated ⭐', link: '/reviews/synthesia' },
];

```


### src/data/blogPosts.ts

```tsx

export const BLOG_POSTS = [
  {
    title: "Why I Cancelled Adobe and Never Looked Back",
    slug: "/blog/cancelled-adobe-never-looked-back",
    excerpt: "After 12 years as a graphic designer I finally did it. Here's exactly what replaced it and what I'd never give up.",
    category: "Design",
    date: "April 2026",
    readTime: "6 minutes",
    image: "https://picsum.photos/seed/adobe/1920/1080?blur=4",
    author: "Domsky Solutions Team"
  },
  {
    title: "I Replaced My Entire $500/Month SaaS Stack With AI Tools",
    slug: "/blog/replaced-saas-stack-with-ai-tools",
    excerpt: "I was spending over $500 every month on traditional SaaS tools. Then I switched to AI alternatives and cut that bill dramatically.",
    category: "AI News",
    date: "April 2026",
    readTime: "8 minutes",
    image: "/images/saas-stack-article.jpg",
    author: "Domsky Solutions Team"
  },
  {
    title: "10 AI Tools That Will Make You Look Like a Team of 10",
    slug: "/blog/ai-tools-look-like-team-of-10",
    excerpt: "You don't need a big team to compete with one. These 10 AI tools give solo founders the output of a full department at a fraction of the cost.",
    category: "AI News",
    date: "April 2026",
    readTime: "9 minutes",
    image: "/images/team-of-10-article.jpg",
    author: "Domsky Solutions Team"
  },
  {
    title: "Claude vs ChatGPT vs Gemini — Which AI Assistant Should You Actually Use in 2026?",
    slug: "/blog/claude-vs-chatgpt-vs-gemini-2026",
    excerpt: "We tested all three head to head for 30 days on real work tasks. Here is the honest verdict on which AI assistant is actually worth your money in 2026.",
    category: "AI News",
    date: "April 2026",
    readTime: "10 minutes",
    image: "/images/ai-comparison-article.jpg",
    author: "Domsky Solutions Team"
  },
  {
    title: "How I Use AI to Run My Entire Business Solo — My Exact Daily Workflow",
    slug: "/blog/ai-daily-workflow-solo-business",
    excerpt: "I run a growing AI tools publication completely solo. Here is the exact workflow I use every day — the tools, the order, and the time it saves.",
    category: "AI News",
    date: "April 2026",
    readTime: "9 minutes",
    image: "/images/workflow-article.jpg",
    author: "Domsky Solutions Team"
  }
];

```


### src/pages/blog/BlogPost1.tsx

```tsx

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Check, Star, TrendingUp, Clock, Target, Zap, Shield, Sparkles, ChevronUp, Coffee, CheckCircle2, TrendingDown } from 'lucide-react';
import { useScroll } from 'motion/react';
import { useState } from 'react';
import { ToolReviewCard } from '../../components/ToolCard';
import { BLOG_POSTS } from '../../data/blogPosts';
import { BlogCard } from '../../components/BlogCard';
import { ConvertKitForm } from '../../components/ConvertKitForm';
import { Money, BeforeAfter, SectionDivider, H2, H3, CalloutTip, Step, PullQuote, StatCard, SavingsChart, ToolLink } from '../../components/ui';
export const BlogPost1 = () => {
  const { scrollYProgress } = useScroll();
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    document.title = "I Replaced My Entire $500/Month SaaS Stack With AI Tools — Here's Exactly What I Use Now";
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', "I was spending over $500 every month on traditional SaaS tools. Then I switched to AI-powered alternatives and cut that bill dramatically. Here's every tool I replaced and what I use instead.");
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
      
      const sections = ['old-vs-new', 'the-numbers', 'what-i-learned', 'how-to-do-this', 'the-tools'];
      let current = '';
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && window.scrollY >= (element.offsetTop - 100)) {
          current = section;
        }
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({ top: element.offsetTop - 80, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-brand-bg min-h-screen text-gray-300 font-sans pb-24 relative">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-brand-cyan origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />
      
      {/* Table of Contents Sidebar (Desktop Only) */}
      <div className="hidden xl:block fixed left-[max(0px,calc(50%-550px))] top-48 w-64">
        <div className="text-sm font-bold font-inter text-gray-500 uppercase tracking-wider mb-4">Contents</div>
        <ul className="space-y-3 font-inter text-sm">
          {[
            { id: 'old-vs-new', label: 'The Old Stack vs New Stack' },
            { id: 'the-numbers', label: 'The Numbers' },
            { id: 'what-i-learned', label: 'What I Learned' },
            { id: 'how-to-do-this', label: 'How To Do This' },
            { id: 'the-tools', label: 'The Tools' },
          ].map(item => (
            <li key={item.id}>
              <button 
                onClick={() => scrollToSection(item.id)}
                className={`text-left transition-colors hover:text-brand-cyan ${activeSection === item.id ? 'text-brand-cyan font-semibold' : 'text-gray-400'}`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button 
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-brand-surface border border-gray-800 p-3 rounded-full text-brand-cyan hover:bg-brand-cyan hover:text-brand-bg transition-colors z-50 shadow-lg"
          aria-label="Back to top"
        >
          <ChevronUp size={24} />
        </button>
      )}

      <div className="max-w-[680px] mx-auto px-6 pt-32">
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-brand-cyan font-mono text-sm uppercase tracking-wider">AI News</span>
            <span className="text-gray-500 font-mono text-sm">•</span>
            <span className="text-gray-400 font-mono text-sm flex items-center gap-2"><Coffee size={16} /> 8 min read</span>
          </div>
          <h1 className="text-[48px] font-bold font-inter text-white leading-tight mb-8">
            I Replaced My Entire $500/Month SaaS Stack With AI Tools — Here's Exactly What I Use Now
          </h1>
          <div className="flex flex-wrap gap-2">
            {['AI Tools', 'SaaS', 'Productivity', 'Solopreneur', 'Cost Saving', 'AI Software 2026'].map(tag => (
              <span key={tag} className="px-3 py-1 bg-gray-800 text-gray-300 text-xs font-mono rounded-full border border-gray-700">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="w-full rounded-xl overflow-hidden mb-12 border border-brand-surface shadow-2xl">
          <img 
            src="/images/saas-stack-article.jpg" 
            alt="Cover image showing SaaS costs funneling into AI tools" 
            style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: '12px' }}
          />
        </div>

        <div className="prose prose-invert max-w-none text-[18px] leading-[1.9] font-serif space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <p>
              <span className="font-bold text-white">My SaaS bill had quietly crept past <Money>$500 a month</Money>.</span>
            </p>
            <p>
              I was paying for tools I barely used, tools I hated, and tools I kept renewing out of habit. It was <Money>$6,000 a year</Money> for a stack that mostly just made me more subscribed.
            </p>
            <p>
              Then I ran an experiment. Over three months, I systematically replaced every tool with an AI alternative. Here is exactly what I kept, what I cancelled, and how much I saved.
            </p>
          </motion.div>

          <SectionDivider />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <H2 id="old-vs-new">THE OLD STACK VS THE NEW STACK</H2>
            <p>
              Here is a direct comparison of what I was paying for versus what I use now.
            </p>

            <div className="w-full rounded-xl overflow-hidden my-8 border border-brand-surface bg-gray-900 flex items-center justify-center" style={{height: '320px'}}>
              <div className="text-center text-gray-600">
                <div className="text-5xl mb-4">🖼</div>
                <p className="font-mono text-sm">[ INSERT IMAGE HERE ]</p>
                <p className="font-mono text-xs mt-2 text-gray-700">
                  Recommended: side-by-side comparison chart of old vs new software logos
                </p>
              </div>
            </div>

            <H3>WRITING & CONTENT</H3>
            <BeforeAfter 
              before={<>Grammarly Premium (<Money>$30/mo</Money>) +<br/>a copywriter (<Money>$200/mo</Money>)</>}
              after={<><ToolLink name="Claude" to="/tools/claude" /> Pro (<Money>$20/mo</Money>)</>}
              saving="$210/mo"
            />
            <p>
              I used Grammarly for proofreading and hired a freelance copywriter for longer content. <ToolLink name="Claude" to="/tools/claude" /> replaced both completely.
            </p>
            <p>
              It proofreads better than Grammarly and writes better than most copywriters. It does it in seconds instead of days.
            </p>
            <p>
              The <Money>$20/month</Money> Pro plan is one of the <span className="font-bold text-white">most defensible subscriptions</span> in my entire stack.
            </p>
            <ToolReviewCard name="Claude" desc="Best AI assistant for writing and reasoning" to="/tools/claude" category="Writing" />
          </motion.div>

          <PullQuote>
            "It proofreads better than Grammarly and writes better than most copywriters — for $20 a month."
          </PullQuote>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <H3>RESEARCH & INFORMATION</H3>
            <BeforeAfter 
              before={<>Various news subscriptions (<Money>$45/mo</Money>)</>}
              after={<><ToolLink name="Perplexity" to="/tools/perplexity" /> Pro (<Money>$20/mo</Money>)</>}
              saving="$25/mo"
            />
            <p>
              I was paying for three different newsletter and news subscriptions. <ToolLink name="Perplexity" to="/tools/perplexity" /> replaced all of them.
            </p>
            <p>
              I can ask it anything happening right now and get a cited answer in seconds. I can follow up with deeper questions that no newsletter could anticipate.
            </p>
            <p>
              The research workflow I used to spend an hour on every morning now <span className="font-bold text-white">takes fifteen minutes</span>.
            </p>
            <ToolReviewCard name="Perplexity" desc="Best AI tool for research and information" to="/tools/perplexity" category="Research" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <H3>DESIGN & VISUALS</H3>
            <BeforeAfter 
              before={<>Adobe Creative Cloud (<Money>$55/mo</Money>) +<br/>Canva Pro (<Money>$13/mo</Money>)</>}
              after={<><ToolLink name="Midjourney" to="/reviews/midjourney" /> Standard (<Money>$30/mo</Money>)</>}
              saving="$38/mo"
            />
            <p>
              I was maintaining two design subscriptions and still creating assets that looked like templates.
            </p>
            <p>
              <ToolLink name="Midjourney" to="/reviews/midjourney" /> generates campaign visuals, blog post headers, and concept mockups that look genuinely professional.
            </p>
            <p>
              I kept a basic free design tool for simple layouts but <span className="font-bold text-white">cancelled Creative Cloud entirely</span>.
            </p>
            <ToolReviewCard name="Midjourney" desc="Best AI tool for image generation" to="/reviews/midjourney" category="Design" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <H3>CODING & DEVELOPMENT</H3>
            <BeforeAfter 
              before={<>Freelance developer (<Money>$300/mo</Money> average)</>}
              after={<><ToolLink name="Cursor" to="/tools/cursor" /> Pro (<Money>$20/mo</Money>)</>}
              saving="$280/mo"
            />
            <p>
              This is the single biggest saving in my entire stack. I was paying a freelance developer on retainer for small website changes and bug fixes.
            </p>
            <p>
              <ToolLink name="Cursor" to="/tools/cursor" /> replaced that entirely. I am not a developer, but with Cursor I can make changes to my own codebase.
            </p>
            <p>
              The learning curve was real but the <span className="font-bold text-white">payoff was immediate</span>.
            </p>
            <ToolReviewCard name="Cursor" desc="Best AI tool for coding and development" to="/tools/cursor" category="Coding" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <H3>PRODUCTIVITY & KNOWLEDGE MANAGEMENT</H3>
            <BeforeAfter 
              before={<>Notion (<Money>$16/mo</Money>) + Evernote (<Money>$15/mo</Money>)</>}
              after={<><ToolLink name="Notion AI" to="/tools/notion-ai" /> (<Money>$16/mo</Money> + <Money>$10/mo</Money> AI add-on)</>}
              saving="$5/mo"
            />
            <p>
              This one was less about saving money and more about eliminating redundancy. I was using Notion for project management and Evernote for notes.
            </p>
            <p>
              Adding <ToolLink name="Notion AI" to="/tools/notion-ai" /> replaced Evernote completely. It made the documents I already had in Notion significantly more useful.
            </p>
            <p>
              The AI can summarize my meeting notes and <span className="font-bold text-white">find information across my workspace</span>.
            </p>
            <ToolReviewCard name="Notion AI" desc="Best AI tool for productivity and knowledge" to="/tools/notion-ai" category="Productivity" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <H3>VIDEO CONTENT</H3>
            <BeforeAfter 
              before={<>Video editor contractor (<Money>$150/mo</Money> average)</>}
              after={<><ToolLink name="Descript" to="/reviews/descript" /> Creator (<Money>$24/mo</Money>)</>}
              saving="$126/mo"
            />
            <p>
              I was outsourcing all my video editing because timeline-based editors felt too technical. <ToolLink name="Descript" to="/reviews/descript" /> changed that completely.
            </p>
            <p>
              Editing a video in Descript is genuinely as easy as editing a document. I delete filler words with one click.
            </p>
            <p>
              I produce finished videos that previously took two days to deliver — <span className="font-bold text-white">in under an hour</span>.
            </p>
            <ToolReviewCard name="Descript" desc="Best AI tool for video and podcast editing" to="/reviews/descript" category="Video" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <H3>WEBSITE & LANDING PAGES</H3>
            <BeforeAfter 
              before={<>Webflow (<Money>$29/mo</Money>) +<br/>design contractor (<Money>$200/mo</Money>)</>}
              after={<><ToolLink name="Framer AI" to="/reviews/framer" /> Basic (<Money>$20/mo</Money>)</>}
              saving="$209/mo"
            />
            <p>
              Webflow is a powerful tool but I was paying for a contractor to make design changes I could not figure out myself.
            </p>
            <p>
              <ToolLink name="Framer AI" to="/reviews/framer" /> generates professional landing pages from a text description. I can customize them visually without touching code.
            </p>
            <p>
              The pages are genuinely better designed, and I can <span className="font-bold text-white">update them myself in real time</span>.
            </p>
            <ToolReviewCard name="Framer AI" desc="Best AI tool for websites and landing pages" to="/reviews/framer" category="Website" />
            <p className="font-bold text-white mt-6">
              The compounding effect of these tools completely transformed how I work.
            </p>
          </motion.div>

          <SectionDivider />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <H2 id="the-numbers">THE NUMBERS</H2>
            
            <div className="w-full rounded-xl overflow-hidden my-8 border border-brand-surface bg-gray-900 flex items-center justify-center" style={{height: '320px'}}>
              <div className="text-center text-gray-600">
                <div className="text-5xl mb-4">🖼</div>
                <p className="font-mono text-sm">[ INSERT IMAGE HERE ]</p>
                <p className="font-mono text-xs mt-2 text-gray-700">
                  Recommended: chart showing subscription costs dropping over time
                </p>
              </div>
            </div>
          </motion.div>
          
          <div className="my-10 p-8 bg-brand-surface border border-gray-800 rounded-xl text-center">
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                <div className="text-gray-500 font-mono text-sm uppercase tracking-wider mb-2">Old Monthly Spend</div>
                <div className="text-3xl font-bold text-red-400/80 line-through decoration-red-500/50">$1,053</div>
              </div>
              <div>
                <div className="text-gray-500 font-mono text-sm uppercase tracking-wider mb-2">New Monthly Spend</div>
                <div className="text-3xl font-bold text-green-400">$140</div>
              </div>
            </div>
            <div className="pt-8 border-t border-gray-800">
              <div className="text-gray-400 font-mono text-sm uppercase tracking-wider mb-2">Monthly Saving</div>
              <div className="text-4xl font-bold text-brand-cyan mb-6">$913</div>
              <div className="text-gray-400 font-mono text-sm uppercase tracking-wider mb-2">Annual Saving</div>
              <div className="text-6xl md:text-7xl font-bold text-white tracking-tight">$10,956</div>
            </div>
          </div>

          <SavingsChart />

          <CalloutTip>
            <span className="font-bold not-italic text-white">Note:</span> my original estimate of <Money>$500/month</Money> was what I thought I was spending. When I actually added up contractors and subscriptions together, the real number was significantly higher. <em>If you have never done this exercise for your own stack, the actual total will probably surprise you.</em>
          </CalloutTip>

          <PullQuote>
            "I saved nearly $11,000 in the first year. The stack I run today costs one seventh of what it did before."
          </PullQuote>

          <SectionDivider />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <H2 id="what-i-learned">WHAT I LEARNED FROM THREE MONTHS OF SWITCHING</H2>
            
            <div className="w-full rounded-xl overflow-hidden my-8 border border-brand-surface bg-gray-900 flex items-center justify-center" style={{height: '320px'}}>
              <div className="text-center text-gray-600">
                <div className="text-5xl mb-4">🖼</div>
                <p className="font-mono text-sm">[ INSERT IMAGE HERE ]</p>
                <p className="font-mono text-xs mt-2 text-gray-700">
                  Recommended: person looking thoughtfully at a laptop screen
                </p>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-10">
            <StatCard icon={CheckCircle2} title="Quality Gap Closed" stat="100%" />
            <StatCard icon={Clock} title="Learning Curve" stat="1 Week" />
            <StatCard icon={TrendingDown} title="Cost Reduction" stat="7x" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <H3>The Quality Gap Has Closed</H3>
            <p>
              Twelve months ago the honest answer to "can AI replace this tool?" was usually "not quite yet."
            </p>
            <p>
              Today the honest answer for most categories is "yes, and often better." The tools in this list are not compromises.
            </p>
            <p>
              They are genuine upgrades in most of the dimensions that matter for day to day work.
            </p>

            <H3>The Learning Curve Is Short</H3>
            <p>
              Every tool on this list took me between one afternoon and one week to get genuinely useful results from.
            </p>
            <p>
              The instinct to stick with familiar tools because switching costs feel high is understandable. But it is <span className="font-bold text-white">almost always wrong</span> when you actually run the numbers.
            </p>

            <H3>Not Everything Should Be Replaced</H3>
            <p>
              I kept tools that AI has not meaningfully improved yet — my accounting software, my email provider, my calendar.
            </p>
            <p>
              The goal was not to replace everything with AI for the sake of it. The goal was to replace things where AI delivered <span className="font-bold text-white">better results at lower cost</span>.
            </p>

            <H3>The Compounding Effect</H3>
            <p>
              The biggest surprise was how much faster the whole system became once every part of it was optimized.
            </p>
            <p>
              Writing feeds research that feeds design that feeds video production. When every step gets faster, the total output improvement is multiplicative.
            </p>
            <p className="font-bold text-white mt-6">
              The speed advantage alone is worth the switch, even if the cost was identical.
            </p>
          </motion.div>

          <SectionDivider />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <H2 id="how-to-do-this">HOW TO DO THIS FOR YOUR OWN STACK</H2>
            <p>
              If you want to run this experiment yourself, start with these three steps:
            </p>
            
            <div className="w-full rounded-xl overflow-hidden my-8 border border-brand-surface bg-gray-900 flex items-center justify-center" style={{height: '320px'}}>
              <div className="text-center text-gray-600">
                <div className="text-5xl mb-4">🖼</div>
                <p className="font-mono text-sm">[ INSERT IMAGE HERE ]</p>
                <p className="font-mono text-xs mt-2 text-gray-700">
                  Recommended: notebook with a checklist or a Kanban board
                </p>
              </div>
            </div>
          </motion.div>

          <Step number="1" title="Audit everything you are paying for">
            List every subscription and contractor you pay monthly. Include the ones you forget about. The total will be higher than you expect.
          </Step>

          <Step number="2" title="Identify your highest cost categories">
            Pick the two or three biggest line items and research what AI tools exist in those categories specifically. <span className="font-bold text-white">The savings are almost always largest where you are currently paying humans to do repeatable knowledge work.</span>
          </Step>

          <Step number="3" title="Run one replacement at a time">
            <span className="font-bold text-white">Do not try to switch everything simultaneously.</span> Pick one tool, commit to using the AI alternative exclusively for two weeks, and evaluate honestly. If it is genuinely worse in ways that matter, keep the original.
          </Step>

          <CalloutTip>
            Cancel the old subscription the moment you decide the new tool works. Don't leave it "just in case."
          </CalloutTip>

          <SectionDivider />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <H2 id="the-tools">THE TOOLS IN THIS ARTICLE</H2>
            <p>
              Every tool mentioned in this article has a full in-depth review on domskysolutions.com.
            </p>
            <p>
              If you want to understand exactly what each one does, what it costs at every tier, and whether it is the right fit for your specific situation before committing to a switch, start there.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            <ToolReviewCard name="Claude" desc="Best AI assistant for writing and reasoning" to="/tools/claude" category="Writing" />
            <ToolReviewCard name="Perplexity" desc="Best AI tool for research and information" to="/tools/perplexity" category="Research" />
            <ToolReviewCard name="Midjourney" desc="Best AI tool for image generation" to="/reviews/midjourney" category="Design" />
            <ToolReviewCard name="Cursor" desc="Best AI tool for coding and development" to="/tools/cursor" category="Coding" />
            <ToolReviewCard name="Notion AI" desc="Best AI tool for productivity and knowledge" to="/tools/notion-ai" category="Productivity" />
            <ToolReviewCard name="Descript" desc="Best AI tool for video and podcast editing" to="/reviews/descript" category="Video" />
            <ToolReviewCard name="Framer AI" desc="Best AI tool for websites and landing pages" to="/reviews/framer" category="Website" />
          </div>

          <SectionDivider />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <H2 id="conclusion">CONCLUSION</H2>
            <p>
              The question is no longer whether AI tools are good enough to replace your existing SaaS stack. For most knowledge work categories they already are.
            </p>
            <p>
              The question is how long you are willing to keep paying for the old way of doing things.
            </p>
            <p>
              I saved nearly <Money>$11,000</Money> in the first year. More importantly, I got faster — meaningfully, measurably faster — at every part of my work.
            </p>
            
            <H3>Key Takeaways</H3>
            <ul className="list-disc pl-6 space-y-2 text-gray-300 my-4">
              <li>AI tools can replace expensive subscriptions and contractors.</li>
              <li>The quality gap between AI and traditional tools has closed.</li>
              <li>Switching one tool at a time is the most effective strategy.</li>
            </ul>

            <div className="mt-8">
              <a href="/" className="inline-flex items-center justify-center px-6 py-3 bg-brand-cyan text-brand-bg font-bold font-inter rounded-lg hover:bg-white transition-colors">
                Explore All Tool Reviews at domskysolutions.com
              </a>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              Find the right AI tools for your specific workflow.
            </p>
          </motion.div>

          <div className="mt-16 p-6 bg-gray-900 border border-gray-800 text-sm text-gray-400">
            <div className="font-bold font-mono text-white mb-2">ABOUT THIS ARTICLE</div>
            domskysolutions.com reviews AI tools and SaaS software for founders, solopreneurs and builders. We test every tool we recommend and update our reviews regularly as products evolve. Some links in this article are affiliate links — we may earn a commission if you sign up through them at no extra cost to you.
          </div>
        </div>
      </div>

      {/* Related Articles Section */}
      <div className="max-w-5xl mx-auto px-6 mt-24 border-t border-gray-800 pt-16">
        <h2 className="text-2xl font-bold font-mono text-white mb-8">Related Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {BLOG_POSTS.filter(p => p.slug !== "/blog/replaced-saas-stack-with-ai-tools").slice(0, 2).map(post => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};
```


### src/pages/blog/BlogPost2.tsx

```tsx

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Check, Star, TrendingUp, Clock, Target, Zap, Shield, Sparkles } from 'lucide-react';
import { useScroll } from 'motion/react';
import { ToolReviewCard } from '../../components/ToolCard';
import { BLOG_POSTS } from '../../data/blogPosts';
import { BlogCard } from '../../components/BlogCard';
import { ConvertKitForm } from '../../components/ConvertKitForm';
import { Money, BeforeAfter, SectionDivider, H2, H3, CalloutTip, Step, PullQuote, StatCard, SavingsChart, ToolLink } from '../../components/ui';
export const BlogPost2 = () => {
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    document.title = "10 AI Tools That Will Make You Look Like a Team of 10";
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', "You don't need a big team to compete with one. These 10 AI tools give solo founders the output of a full department at a fraction of the cost.");
  }, []);

  return (
    <div className="bg-brand-bg min-h-screen text-gray-300 font-sans pb-24">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-brand-cyan origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />
      
      <div className="max-w-[680px] mx-auto px-6 pt-32">
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-brand-cyan font-mono text-sm uppercase tracking-wider">AI News</span>
            <span className="text-gray-500 font-mono text-sm">•</span>
            <span className="text-gray-400 font-mono text-sm">9 min read</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-mono text-white leading-tight mb-8">
            10 AI Tools That Will Make You Look Like a Team of 10
          </h1>
          <div className="flex flex-wrap gap-2">
            {['AI Tools', 'Solopreneur', 'Productivity', 'Startups', 'AI Software 2026'].map(tag => (
              <span key={tag} className="px-3 py-1 bg-gray-800 text-gray-300 text-xs font-mono rounded-full border border-gray-700">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="w-full rounded-xl overflow-hidden mb-12 border border-brand-surface shadow-2xl">
          <img 
            src="/images/team-of-10-article.jpg" 
            alt="Cover image showing a solo founder with 10 AI tools" 
            style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: '12px' }}
          />
        </div>

        <div className="prose prose-invert max-w-none text-[18px] leading-[1.9] font-serif space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <p>
              <span className="font-bold text-white">The most dangerous competitor you will face is not a well-funded startup.</span>
            </p>
            <p>
              It is a single person with a laptop, a clear vision, and the right AI tools running in the background while they sleep. The playing field between individuals and teams has never been more level.
            </p>
            <p>
              We tested dozens of AI tools across every business function. These ten deliver the highest leverage for solopreneurs, producing output that genuinely looks like it came from a specialized professional team.
            </p>
          </motion.div>

          <SectionDivider />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <H2 id="claude-thinking-partner">1. CLAUDE — YOUR AI THINKING PARTNER</H2>
            
            <div className="w-full rounded-xl overflow-hidden my-8 border border-brand-surface bg-gray-900 flex items-center justify-center" style={{height: '320px'}}>
              <div className="text-center text-gray-600">
                <div className="text-5xl mb-4">🖼</div>
                <p className="font-mono text-sm">[ INSERT IMAGE HERE ]</p>
                <p className="font-mono text-xs mt-2 text-gray-700">
                  Recommended: Claude interface showing a complex reasoning task
                </p>
              </div>
            </div>

            <H3>Category: Writing & Reasoning</H3>
            <p>
              If you could only pick one AI tool from this entire list, <span className="font-bold text-brand-cyan">Claude</span> would be it.
            </p>
            <p>
              Built by Anthropic with a relentless focus on being genuinely helpful, Claude is the closest thing to having a brilliant generalist on your team. It can write, think, code, analyze, and strategize.
            </p>
            <p>
              <span className="font-bold italic text-white">What it replaces:</span> A copywriter, a strategist, a researcher, and a brainstorming partner — all available 24 hours a day for <Money>$20 a month</Money>.
            </p>
            <p>
              <span className="font-bold italic text-white">The one thing it does best:</span> Long form thinking. Give Claude a complex problem, and it will help you think it through with clarity and depth.
            </p>
            
            <CalloutTip>
              Pro tip: Use Claude for every first draft of anything important. The editing pass you do after is faster and better than starting from a blank page.
            </CalloutTip>
            
            <ToolReviewCard name="Claude" desc="Best AI assistant for writing and reasoning" to="/tools/claude" category="Writing" />
          </motion.div>

          <SectionDivider />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <H2 id="perplexity-research">2. PERPLEXITY — YOUR AI RESEARCH DEPARTMENT</H2>
            
            <div className="w-full rounded-xl overflow-hidden my-8 border border-brand-surface bg-gray-900 flex items-center justify-center" style={{height: '320px'}}>
              <div className="text-center text-gray-600">
                <div className="text-5xl mb-4">🖼</div>
                <p className="font-mono text-sm">[ INSERT IMAGE HERE ]</p>
                <p className="font-mono text-xs mt-2 text-gray-700">
                  Recommended: Perplexity showing cited research results
                </p>
              </div>
            </div>

            <H3>Category: Research & Information</H3>
            <p>
              Every business decision you make is only as good as the information it is based on.
            </p>
            <p>
              <span className="font-bold text-brand-cyan">Perplexity</span> gives you a research department that works in real time. It searches the current web, reads relevant sources, and delivers cited answers in seconds.
            </p>
            <p>
              <span className="font-bold italic text-white">What it replaces:</span> A research assistant, multiple news subscriptions, and hours spent trying to stay informed.
            </p>
            <p>
              <span className="font-bold italic text-white">The one thing it does best:</span> Competitive intelligence. Ask about a competitor or market trend, and it synthesizes everything into a clear, sourced summary.
            </p>
            
            <CalloutTip>
              Pro tip: Use Focus modes — switch to Academic for research papers, Reddit for real user opinions, and News for breaking developments.
            </CalloutTip>
            
            <ToolReviewCard name="Perplexity" desc="Best AI tool for research and information" to="/tools/perplexity" category="Research" />
          </motion.div>

          <PullQuote>
            "The playing field between individuals and teams has never been more level. AI has quietly handed solopreneurs the capabilities of entire departments."
          </PullQuote>

          <SectionDivider />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <H2 id="cursor-development">3. CURSOR — YOUR AI DEVELOPMENT TEAM</H2>
            
            <div className="w-full rounded-xl overflow-hidden my-8 border border-brand-surface bg-gray-900 flex items-center justify-center" style={{height: '320px'}}>
              <div className="text-center text-gray-600">
                <div className="text-5xl mb-4">🖼</div>
                <p className="font-mono text-sm">[ INSERT IMAGE HERE ]</p>
                <p className="font-mono text-xs mt-2 text-gray-700">
                  Recommended: Cursor editor showing AI code generation
                </p>
              </div>
            </div>

            <H3>Category: Coding & Development</H3>
            <p>
              The single most expensive bottleneck for most solo founders is development. <span className="font-bold text-brand-cyan">Cursor</span> eliminates that bottleneck entirely.
            </p>
            <p>
              It is an AI-powered code editor that understands your entire codebase. It helps you build, fix, and ship software through natural language instructions.
            </p>
            <p>
              <span className="font-bold italic text-white">What it replaces:</span> A freelance developer on retainer and the feeling of being permanently blocked by technical limitations.
            </p>
            <p>
              <span className="font-bold italic text-white">The one thing it does best:</span> Making non-developers dangerous. You do not need to know how to code to use Cursor effectively.
            </p>
            
            <CalloutTip>
              Pro tip: Start by asking Cursor to explain your codebase before asking it to change anything. Understanding what exists makes instructions more precise.
            </CalloutTip>
            
            <ToolReviewCard name="Cursor" desc="Best AI tool for coding and development" to="/tools/cursor" category="Coding" />
          </motion.div>

          <SectionDivider />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <H2 id="midjourney-design">4. MIDJOURNEY — YOUR AI DESIGN STUDIO</H2>
            
            <div className="w-full rounded-xl overflow-hidden my-8 border border-brand-surface bg-gray-900 flex items-center justify-center" style={{height: '320px'}}>
              <div className="text-center text-gray-600">
                <div className="text-5xl mb-4">🖼</div>
                <p className="font-mono text-sm">[ INSERT IMAGE HERE ]</p>
                <p className="font-mono text-xs mt-2 text-gray-700">
                  Recommended: High-quality Midjourney generated brand asset
                </p>
              </div>
            </div>

            <H3>Category: Image Generation & Design</H3>
            <p>
              Every piece of content you publish competes for attention. <span className="font-bold text-brand-cyan">Midjourney</span> levels that competition.
            </p>
            <p>
              It generates images of a quality and aesthetic sophistication that genuinely matches professional design studios — from a text prompt, in minutes.
            </p>
            <p>
              <span className="font-bold italic text-white">What it replaces:</span> A graphic designer, a stock photo subscription, and days of back and forth to get a visual right.
            </p>
            <p>
              <span className="font-bold italic text-white">The one thing it does best:</span> Aesthetic quality. Every other generator produces competent outputs. Midjourney produces beautiful ones.
            </p>
            
            <CalloutTip>
              Pro tip: Add --style raw to prompts for photorealistic outputs and save your best prompts — they are reusable assets.
            </CalloutTip>
            
            <ToolReviewCard name="Midjourney" desc="Best AI tool for image generation" to="/reviews/midjourney" category="Design" />
          </motion.div>

          <SectionDivider />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <H2 id="notion-ai-chief-of-staff">5. NOTION AI — YOUR AI CHIEF OF STAFF</H2>
            
            <div className="w-full rounded-xl overflow-hidden my-8 border border-brand-surface bg-gray-900 flex items-center justify-center" style={{height: '320px'}}>
              <div className="text-center text-gray-600">
                <div className="text-5xl mb-4">🖼</div>
                <p className="font-mono text-sm">[ INSERT IMAGE HERE ]</p>
                <p className="font-mono text-xs mt-2 text-gray-700">
                  Recommended: Notion AI summarizing a complex meeting note
                </p>
              </div>
            </div>

            <H3>Category: Productivity & Knowledge Management</H3>
            <p>
              Every growing business drowns in information at some point. <span className="font-bold text-brand-cyan">Notion AI</span> turns your workspace into a living, queryable knowledge base.
            </p>
            <p>
              It surfaces the right information at the right moment and helps you turn raw notes into structured thinking automatically.
            </p>
            <p>
              <span className="font-bold italic text-white">What it replaces:</span> A chief of staff, a note taker, and the multiple tools you maintain for notes and project management.
            </p>
            <p>
              <span className="font-bold italic text-white">The one thing it does best:</span> Making your existing work more valuable. Every note becomes something you can query instantly.
            </p>
            
            <CalloutTip>
              Pro tip: Create a weekly review template and ask Notion AI to summarize your week's notes into action items every Friday.
            </CalloutTip>
            
            <ToolReviewCard name="Notion AI" desc="Best AI tool for productivity and knowledge" to="/tools/notion-ai" category="Productivity" />
          </motion.div>

          <PullQuote>
            "You do not need to know how to code to use Cursor effectively. You need to know what you want to build and be willing to learn the basics."
          </PullQuote>

          <SectionDivider />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <H2 id="descript-video">6. DESCRIPT — YOUR AI VIDEO & PODCAST TEAM</H2>
            
            <div className="w-full rounded-xl overflow-hidden my-8 border border-brand-surface bg-gray-900 flex items-center justify-center" style={{height: '320px'}}>
              <div className="text-center text-gray-600">
                <div className="text-5xl mb-4">🖼</div>
                <p className="font-mono text-sm">[ INSERT IMAGE HERE ]</p>
                <p className="font-mono text-xs mt-2 text-gray-700">
                  Recommended: Descript text-based video editing interface
                </p>
              </div>
            </div>

            <H3>Category: Video & Audio Editing</H3>
            <p>
              Video is the highest trust building medium available. The number one reason people do not use it is that editing is too slow.
            </p>
            <p>
              <span className="font-bold text-brand-cyan">Descript</span> removes both barriers. You edit video by editing text.
            </p>
            <p>
              <span className="font-bold italic text-white">What it replaces:</span> A video editor, a podcast editor, and two days of production time between recording and publishing.
            </p>
            <p>
              <span className="font-bold italic text-white">The one thing it does best:</span> Speed. Users consistently report cutting editing time by 50 to 80 percent.
            </p>
            
            <CalloutTip>
              Pro tip: Use Studio Sound on every recording before anything else. It removes background noise and enhances audio quality in one click.
            </CalloutTip>
            
            <ToolReviewCard name="Descript" desc="Best AI tool for video and podcast editing" to="/reviews/descript" category="Video" />
          </motion.div>

          <SectionDivider />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <H2 id="elevenlabs-voice">7. ELEVENLABS — YOUR AI VOICE TEAM</H2>
            
            <div className="w-full rounded-xl overflow-hidden my-8 border border-brand-surface bg-gray-900 flex items-center justify-center" style={{height: '320px'}}>
              <div className="text-center text-gray-600">
                <div className="text-5xl mb-4">🖼</div>
                <p className="font-mono text-sm">[ INSERT IMAGE HERE ]</p>
                <p className="font-mono text-xs mt-2 text-gray-700">
                  Recommended: ElevenLabs voice generation dashboard
                </p>
              </div>
            </div>

            <H3>Category: Voice Generation & Audio</H3>
            <p>
              Your voice is a powerful tool for building trust, but recording audio at scale is time consuming.
            </p>
            <p>
              <span className="font-bold text-brand-cyan">ElevenLabs</span> gives you the ability to generate professional audio in any language from a text script in minutes.
            </p>
            <p>
              <span className="font-bold italic text-white">What it replaces:</span> A voiceover artist, a recording studio, and the scheduling constraints of recording everything yourself.
            </p>
            <p>
              <span className="font-bold italic text-white">The one thing it does best:</span> Voice quality. The audio ElevenLabs generates is indistinguishable from human recording.
            </p>
            
            <CalloutTip>
              Pro tip: Clone your own voice and use it for content you do not have time to record yourself. Two minutes of sample audio is all it needs.
            </CalloutTip>
            
            <ToolReviewCard name="ElevenLabs" desc="Best AI tool for voice generation" to="/tools/elevenlabs" category="Audio" />
          </motion.div>

          <SectionDivider />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <H2 id="runway-video-production">8. RUNWAY — YOUR AI VIDEO PRODUCTION CREW</H2>
            
            <div className="w-full rounded-xl overflow-hidden my-8 border border-brand-surface bg-gray-900 flex items-center justify-center" style={{height: '320px'}}>
              <div className="text-center text-gray-600">
                <div className="text-5xl mb-4">🖼</div>
                <p className="font-mono text-sm">[ INSERT IMAGE HERE ]</p>
                <p className="font-mono text-xs mt-2 text-gray-700">
                  Recommended: Runway Gen-3 cinematic video output
                </p>
              </div>
            </div>

            <H3>Category: AI Video Generation</H3>
            <p>
              Brand videos and product demonstrations traditionally required a camera crew and a large production budget.
            </p>
            <p>
              <span className="font-bold text-brand-cyan">Runway</span> generates cinematic quality video from text prompts and images.
            </p>
            <p>
              <span className="font-bold italic text-white">What it replaces:</span> A video production company, a motion graphics designer, and weeks of production lead time.
            </p>
            <p>
              <span className="font-bold italic text-white">The one thing it does best:</span> Visual quality. Runway's Gen-3 Alpha produces video that is smooth, cinematic and controllable.
            </p>
            
            <CalloutTip>
              Pro tip: Use Runway for short high quality atmospheric clips used as background visuals or social content.
            </CalloutTip>
            
            <ToolReviewCard name="Runway" desc="Best AI tool for video generation" to="/tools/runway" category="Video" />
          </motion.div>

          <SectionDivider />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <H2 id="jasper-marketing">9. JASPER — YOUR AI MARKETING DEPARTMENT</H2>
            
            <div className="w-full rounded-xl overflow-hidden my-8 border border-brand-surface bg-gray-900 flex items-center justify-center" style={{height: '320px'}}>
              <div className="text-center text-gray-600">
                <div className="text-5xl mb-4">🖼</div>
                <p className="font-mono text-sm">[ INSERT IMAGE HERE ]</p>
                <p className="font-mono text-xs mt-2 text-gray-700">
                  Recommended: Jasper Brand Voice configuration screen
                </p>
              </div>
            </div>

            <H3>Category: AI Writing & Marketing</H3>
            <p>
              When your business needs emails, ads, and social posts that all sound like the same brand, <span className="font-bold text-brand-cyan">Jasper</span> solves that problem.
            </p>
            <p>
              Its Brand Voice feature learns your specific tone and applies it consistently across every piece of content it produces.
            </p>
            <p>
              <span className="font-bold italic text-white">What it replaces:</span> A marketing copywriter, a content strategist, and the brand guidelines document nobody reads.
            </p>
            <p>
              <span className="font-bold italic text-white">The one thing it does best:</span> Brand consistency at scale. If you need large volumes of content, Jasper does that better than any other tool.
            </p>
            
            <CalloutTip>
              Pro tip: Invest time setting up Brand Voice properly before using Jasper for production content. It is the setup that makes everything else work.
            </CalloutTip>
            
            <ToolReviewCard name="Jasper" desc="Best AI tool for marketing copy" to="/reviews/jasper" category="Marketing" />
          </motion.div>

          <PullQuote>
            "The solopreneur that masters these ten tools does not just compete with larger teams — they outmaneuver them."
          </PullQuote>

          <SectionDivider />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <H2 id="framer-web-design">10. FRAMER AI — YOUR AI WEB DESIGN TEAM</H2>
            
            <div className="w-full rounded-xl overflow-hidden my-8 border border-brand-surface bg-gray-900 flex items-center justify-center" style={{height: '320px'}}>
              <div className="text-center text-gray-600">
                <div className="text-5xl mb-4">🖼</div>
                <p className="font-mono text-sm">[ INSERT IMAGE HERE ]</p>
                <p className="font-mono text-xs mt-2 text-gray-700">
                  Recommended: Framer AI generating a website layout
                </p>
              </div>
            </div>

            <H3>Category: Website Builder & Design</H3>
            <p>
              Your website is the one piece of real estate on the internet you fully control.
            </p>
            <p>
              <span className="font-bold text-brand-cyan">Framer AI</span> generates complete professionally designed websites from a text description. You can update them visually without touching code.
            </p>
            <p>
              <span className="font-bold italic text-white">What it replaces:</span> A web design agency, a developer for ongoing updates, and weeks of back and forth.
            </p>
            <p>
              <span className="font-bold italic text-white">The one thing it does best:</span> Design quality ceiling. Framer delivers professional results at a level where designers choose it over tools they trained on.
            </p>
            
            <CalloutTip>
              Pro tip: Use Framer AI to generate your initial site from a detailed description. The AI starting point will be 70 percent of the way there.
            </CalloutTip>
            
            <ToolReviewCard name="Framer AI" desc="Best AI tool for websites and landing pages" to="/reviews/framer" category="Website" />
          </motion.div>

          <SectionDivider />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <H2 id="total-picture">THE TOTAL PICTURE</H2>
            
            <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden my-8">
              <table className="w-full text-left border-collapse">
                <tbody className="divide-y divide-gray-800">
                  <tr className="hover:bg-gray-800/50 transition-colors">
                    <td className="py-3 px-6 text-gray-300">Claude Pro</td>
                    <td className="py-3 px-6 text-brand-cyan font-mono text-right"><Money>$20/month</Money></td>
                  </tr>
                  <tr className="hover:bg-gray-800/50 transition-colors">
                    <td className="py-3 px-6 text-gray-300">Perplexity Pro</td>
                    <td className="py-3 px-6 text-brand-cyan font-mono text-right"><Money>$20/month</Money></td>
                  </tr>
                  <tr className="hover:bg-gray-800/50 transition-colors">
                    <td className="py-3 px-6 text-gray-300">Cursor Pro</td>
                    <td className="py-3 px-6 text-brand-cyan font-mono text-right"><Money>$20/month</Money></td>
                  </tr>
                  <tr className="hover:bg-gray-800/50 transition-colors">
                    <td className="py-3 px-6 text-gray-300">Midjourney Standard</td>
                    <td className="py-3 px-6 text-brand-cyan font-mono text-right"><Money>$30/month</Money></td>
                  </tr>
                  <tr className="hover:bg-gray-800/50 transition-colors">
                    <td className="py-3 px-6 text-gray-300">Notion AI</td>
                    <td className="py-3 px-6 text-brand-cyan font-mono text-right"><Money>$26/month</Money></td>
                  </tr>
                  <tr className="hover:bg-gray-800/50 transition-colors">
                    <td className="py-3 px-6 text-gray-300">Descript Creator</td>
                    <td className="py-3 px-6 text-brand-cyan font-mono text-right"><Money>$24/month</Money></td>
                  </tr>
                  <tr className="hover:bg-gray-800/50 transition-colors">
                    <td className="py-3 px-6 text-gray-300">ElevenLabs Starter</td>
                    <td className="py-3 px-6 text-brand-cyan font-mono text-right"><Money>$5/month</Money></td>
                  </tr>
                  <tr className="hover:bg-gray-800/50 transition-colors">
                    <td className="py-3 px-6 text-gray-300">Runway Standard</td>
                    <td className="py-3 px-6 text-brand-cyan font-mono text-right"><Money>$15/month</Money></td>
                  </tr>
                  <tr className="hover:bg-gray-800/50 transition-colors">
                    <td className="py-3 px-6 text-gray-300">Jasper Creator</td>
                    <td className="py-3 px-6 text-brand-cyan font-mono text-right"><Money>$49/month</Money></td>
                  </tr>
                  <tr className="hover:bg-gray-800/50 transition-colors">
                    <td className="py-3 px-6 text-gray-300">Framer Basic</td>
                    <td className="py-3 px-6 text-brand-cyan font-mono text-right"><Money>$20/month</Money></td>
                  </tr>
                  <tr className="bg-gray-800/30">
                    <td className="py-4 px-6 font-bold text-white">Total</td>
                    <td className="py-4 px-6 text-brand-amber font-mono font-bold text-right text-lg"><Money>$229/month</Money></td>
                  </tr>
                </tbody>
              </table>
              <div className="px-6 py-3 bg-gray-950/50 border-t border-gray-800 text-center text-sm text-gray-500 font-mono">
                Equivalent to <Money>$2,748/year</Money>
              </div>
            </div>
            
            <p>
              That is <Money>$2,748 per year</Money> for the combined capability of a writing team, a research department, a development squad, a design studio, a video production crew, a voice production team, a marketing department and a web design agency.
            </p>
            <p>
              A single mid-level hire in any one of those disciplines costs more than that annually.
            </p>
            <p className="font-bold text-white mt-6">
              The ROI on mastering these tools is astronomical.
            </p>
          </motion.div>

          <SectionDivider />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <H2 id="how-to-start">HOW TO START</H2>
            
            <div className="w-full rounded-xl overflow-hidden my-8 border border-brand-surface bg-gray-900 flex items-center justify-center" style={{height: '320px'}}>
              <div className="text-center text-gray-600">
                <div className="text-5xl mb-4">🖼</div>
                <p className="font-mono text-sm">[ INSERT IMAGE HERE ]</p>
                <p className="font-mono text-xs mt-2 text-gray-700">
                  Recommended: Calendar showing a two-week learning plan
                </p>
              </div>
            </div>

            <p>
              Do not try to adopt all ten tools simultaneously. Start with <span className="font-bold text-brand-cyan">Claude</span>.
            </p>
            <p>
              Spend two weeks making it your default for writing and thinking. Then add <span className="font-bold text-brand-cyan">Perplexity</span>. Together they replace more daily friction than any other combination on this list.
            </p>
            <p>
              From there, add tools based on your biggest current bottleneck.
            </p>
            
            <CalloutTip>
              Commit to using a new tool exclusively for two weeks before deciding if it works for you.
            </CalloutTip>
          </motion.div>

          <SectionDivider />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <H2 id="the-bottom-line">THE BOTTOM LINE</H2>
            <p>
              The solopreneur that masters these ten tools does not just compete with larger teams — they outmaneuver them.
            </p>
            <p>
              Larger teams move slower, communicate across more layers, and carry more overhead per unit of output. A single person with the right AI stack moves faster, ships more, and adapts quicker.
            </p>
            <p>
              The window to build that advantage is open right now. <span className="font-bold italic text-white">It will not stay open indefinitely.</span>
            </p>
            
            <H3>Key Takeaways</H3>
            <ul className="list-disc pl-6 space-y-2 text-gray-300 my-4">
              <li>AI tools provide the leverage of a full team for $229/month.</li>
              <li>Start with Claude and Perplexity to build core habits.</li>
              <li>Solopreneurs with AI can outmaneuver larger, slower teams.</li>
            </ul>

            <div className="mt-8">
              <a href="/" className="inline-flex items-center justify-center px-6 py-3 bg-brand-cyan text-brand-bg font-bold font-inter rounded-lg hover:bg-white transition-colors">
                Explore All Tool Reviews at domskysolutions.com
              </a>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              Find the right AI tools for your specific workflow.
            </p>
          </motion.div>

          <div className="mt-16 p-6 bg-gray-900 border border-gray-800 text-sm text-gray-400">
            <div className="font-bold font-mono text-white mb-2">ABOUT THIS ARTICLE</div>
            domskysolutions.com reviews AI tools and SaaS software for founders, solopreneurs and builders. We test every tool we recommend and update our reviews regularly. Some links in this article are affiliate links — we may earn a commission if you sign up through them at no extra cost to you.
          </div>
        </div>
      </div>

      {/* Related Articles Section */}
      <div className="max-w-5xl mx-auto px-6 mt-24 border-t border-gray-800 pt-16">
        <h2 className="text-2xl font-bold font-mono text-white mb-8">Related Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {BLOG_POSTS.filter(p => p.slug !== "/blog/ai-tools-look-like-team-of-10").slice(0, 2).map(post => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};
```


### src/pages/blog/BlogPost3.tsx

```tsx

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Check, Star, TrendingUp, Clock, Target, Zap, Shield, Sparkles } from 'lucide-react';
import { useScroll } from 'motion/react';
import { ToolReviewCard } from '../../components/ToolCard';
import { BLOG_POSTS } from '../../data/blogPosts';
import { BlogCard } from '../../components/BlogCard';
import { ConvertKitForm } from '../../components/ConvertKitForm';
import { Money, BeforeAfter, SectionDivider, H2, H3, CalloutTip, Step, PullQuote, StatCard, SavingsChart, ToolLink } from '../../components/ui';
export const BlogPost3 = () => {
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    document.title = "Claude vs ChatGPT vs Gemini — Which AI Assistant Should You Actually Use in 2026?";
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', "We tested Claude, ChatGPT and Gemini head to head across writing, coding, research and reasoning. Here is the honest verdict on which AI assistant is actually worth your money in 2026.");
  }, []);

  return (
    <div className="bg-brand-bg min-h-screen text-gray-300 font-sans pb-24">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-brand-cyan origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />
      
      <div className="max-w-[680px] mx-auto px-6 pt-32">
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-brand-cyan font-mono text-sm uppercase tracking-wider">AI News</span>
            <span className="text-gray-500 font-mono text-sm">•</span>
            <span className="text-gray-400 font-mono text-sm">10 min read</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-mono text-white leading-tight mb-8">
            Claude vs ChatGPT vs Gemini — Which AI Assistant Should You Actually Use in 2026?
          </h1>
          <div className="flex flex-wrap gap-2">
            {['Claude', 'ChatGPT', 'Gemini', 'AI Comparison', 'AI Tools 2026', 'Best AI Assistant'].map(tag => (
              <span key={tag} className="px-3 py-1 bg-gray-800 text-gray-300 text-xs font-mono rounded-full border border-gray-700">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="w-full rounded-xl overflow-hidden mb-12 border border-brand-surface shadow-2xl bg-gray-900 flex items-center justify-center" style={{height: '400px'}}>
          <div className="text-center text-gray-600">
            <div className="text-6xl mb-4">🖼</div>
            <p className="font-mono text-sm">
              [ INSERT COVER IMAGE HERE ]
            </p>
            <p className="font-mono text-xs mt-2 text-gray-700">
              Recommended: Cover image showing Claude, ChatGPT and Gemini logos
            </p>
          </div>
        </div>

        <div className="prose prose-invert max-w-none text-[17px] leading-[1.8] space-y-6">
          <p>
            If you have spent any time trying to figure out which AI assistant to use in 2026 you already know the problem.
          </p>
          <p>
            Every review tells you they are all great. Every comparison hedges with "it depends on your use case." Every article seems to be written by someone who has not actually used all three seriously enough to have a real opinion.
          </p>
          <p>
            This is not that article.
          </p>
          <p>
            We used <ToolLink name="Claude" to="/tools/claude" />, <ToolLink name="ChatGPT" to="/tools/chatgpt" /> and <ToolLink name="Gemini" to="/tools/gemini" /> as our primary AI assistants for thirty days each — for real work, real tasks, and real deadlines.
          </p>
          <p>
            Writing, coding, research, analysis, summarizing documents, brainstorming, and everything in between. We tracked where each one excelled, where each one frustrated us, and where the gaps between them were meaningful enough to actually change what we recommend.
          </p>
          <p className="font-bold italic text-white text-xl mt-8">
            Here is the honest verdict.
          </p>

          <SectionDivider />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <H2 id="the-three-contenders">THE THREE CONTENDERS</H2>
            <p>
              Before we get into the comparison it is worth understanding what each of these tools actually is and who built it.
            </p>
            <p>
              The company behind each model shapes its personality, priorities and weaknesses in ways that matter for daily use.
            </p>

            <H3>CLAUDE — Built by Anthropic</H3>
            <p>
              <ToolLink name="Claude" to="/tools/claude" /> is built by Anthropic, a company founded specifically around the goal of building AI that is safe, honest and genuinely helpful.
            </p>
            <p>
              That mission is not marketing — it shows up in how Claude behaves. It is more likely to tell you when it is uncertain, more careful about making things up, and more focused on actually solving your problem than on sounding impressive while doing it.
            </p>
            <p>
              The current flagship model is <span className="font-bold text-brand-cyan">Claude Sonnet 4.6</span>, with Claude Opus 4.6 available for the most demanding tasks.
            </p>

            <H3>CHATGPT — Built by OpenAI</H3>
            <p>
              <ToolLink name="ChatGPT" to="/tools/chatgpt" /> is the tool that started the current AI revolution and it remains the most recognized name in the category.
            </p>
            <p>
              Built by OpenAI, it was the first AI assistant most people ever used and it has spent the years since trying to be everything to everyone — adding image generation, voice mode, web browsing, plugins, memory and more features than any competitor.
            </p>
            <p>
              The current flagship is <span className="font-bold text-brand-cyan">GPT-4o</span>, with the o1 and o3 models available for complex reasoning tasks.
            </p>

            <H3>GEMINI — Built by Google</H3>
            <p>
              <ToolLink name="Gemini" to="/tools/gemini" /> is Google's answer to the AI assistant revolution — and it has the most powerful infrastructure behind it of any tool on this list.
            </p>
            <p>
              Google's search index, its real time web access, its integration with Gmail, Docs, Drive and every other Google product gives Gemini capabilities that neither Claude nor ChatGPT can match in the Google ecosystem.
            </p>
            <p>
              The current flagship is <span className="font-bold text-brand-cyan">Gemini 1.5 Pro</span>, with Gemini Ultra available for the highest capability tasks.
            </p>
          </motion.div>

          <SectionDivider />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <H2 id="head-to-head-tests">THE HEAD TO HEAD TESTS</H2>
            <p>
              We ran the same tasks through all three tools and scored them honestly. Here is what we found.
            </p>
          </motion.div>

          <SectionDivider />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <H2 id="test-1-writing">TEST 1 — WRITING QUALITY</H2>
            <p className="font-mono text-sm text-gray-400 mb-4">Task: Write a 500 word blog post introduction about the future of remote work</p>
            <div className="my-6 p-4 bg-brand-surface border border-brand-cyan/30 rounded-lg inline-block">
              <span className="font-bold font-mono text-brand-cyan">Winner: Claude 🥇</span>
            </div>
            <p>
              <span className="font-bold text-brand-cyan">Claude</span> produced the most natural, nuanced and genuinely readable output of the three.
            </p>
            <p>
              It did not just string together competent sentences — it constructed an argument with a clear point of view, varied sentence rhythm that made it pleasant to read, and a voice that did not sound like it came from a machine trying to sound human.
            </p>
            <p>
              <span className="font-bold text-brand-cyan">ChatGPT</span> produced solid, competent writing that covered the topic thoroughly but felt slightly formulaic — the kind of writing that is correct in every way but memorable in none.
            </p>
            <p>
              It defaulted to predictable structures and safe observations where Claude took more interesting angles.
            </p>
            <p>
              <span className="font-bold text-brand-cyan">Gemini</span> struggled the most with tone — its output read more like an informational summary than a compelling piece of writing. Technically accurate but flat in a way that would require significant editing before publishing.
            </p>
            <p className="font-bold italic text-white mt-6">
              For anything where writing quality matters — blog posts, emails, copy, proposals — Claude is the clear choice.
            </p>
          </motion.div>

          <SectionDivider />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <H2 id="test-2-coding">TEST 2 — CODING ABILITY</H2>
            <p className="font-mono text-sm text-gray-400 mb-4">Task: Build a working React component for a newsletter signup form with validation</p>
            <div className="my-6 p-4 bg-brand-surface border border-brand-cyan/30 rounded-lg inline-block">
              <span className="font-bold font-mono text-brand-cyan">Winner: ChatGPT 🥇 (narrow margin over Claude)</span>
            </div>
            <p>
              <span className="font-bold text-brand-cyan">ChatGPT</span> produced clean, well structured code that worked on the first attempt with minimal adjustment needed.
            </p>
            <p>
              Its code comments were clear, its component structure was logical, and it anticipated edge cases we had not mentioned in the prompt without being asked.
            </p>
            <p>
              <span className="font-bold text-brand-cyan">Claude</span> was a very close second — its code was equally functional and arguably better commented, but it occasionally over-engineered solutions in ways that required simplification.
            </p>
            <p>
              For simple to medium complexity coding tasks the gap is negligible. For very complex multi-file architecture tasks Claude's reasoning ability gives it an edge.
            </p>
            <p>
              <span className="font-bold text-brand-cyan">Gemini</span> lagged noticeably on coding tasks — producing working code but with less elegant structure and fewer thoughtful implementation details than either competitor.
            </p>
            <p className="font-bold italic text-white mt-6">
              For coding tasks either Claude or ChatGPT will serve you well. ChatGPT has a slight edge on straightforward implementation, Claude has an edge on complex reasoning about architecture.
            </p>
          </motion.div>

          <SectionDivider />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <H2 id="test-3-research">TEST 3 — RESEARCH & CURRENT INFORMATION</H2>
            <p className="font-mono text-sm text-gray-400 mb-4">Task: Summarize the three most significant AI developments from the past month</p>
            <div className="my-6 p-4 bg-brand-surface border border-brand-cyan/30 rounded-lg inline-block">
              <span className="font-bold font-mono text-brand-cyan">Winner: Gemini 🥇</span>
            </div>
            <p>
              This is where <span className="font-bold text-brand-cyan">Gemini's</span> Google infrastructure becomes an insurmountable advantage.
            </p>
            <p>
              Its real time access to Google's search index means it can answer questions about current events, recent developments, and breaking news with an accuracy and depth that neither Claude nor ChatGPT can match from their training data alone.
            </p>
            <p>
              <span className="font-bold text-brand-cyan">ChatGPT</span> with web browsing enabled is a reasonable competitor here — it can search the web and synthesize results, but its search quality and source selection is noticeably less sophisticated than Gemini's native Google integration.
            </p>
            <p>
              <span className="font-bold text-brand-cyan">Claude</span> is the most honest about its limitations here — it will tell you clearly when its knowledge cutoff means it cannot answer a current events question reliably, rather than confidently making something up.
            </p>
            <p>
              That honesty is valuable but it does mean Claude is not the right tool for research requiring real time information.
            </p>
            <p className="font-bold italic text-white mt-6">
              For research requiring current information use Gemini or pair Claude with Perplexity for the best results.
            </p>
          </motion.div>

          <SectionDivider />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <H2 id="test-4-document-analysis">TEST 4 — DOCUMENT ANALYSIS</H2>
            <p className="font-mono text-sm text-gray-400 mb-4">Task: Analyze a 40 page business report and identify the three biggest risks</p>
            <div className="my-6 p-4 bg-brand-surface border border-brand-cyan/30 rounded-lg inline-block">
              <span className="font-bold font-mono text-brand-cyan">Winner: Claude 🥇</span>
            </div>
            <p>
              <span className="font-bold text-brand-cyan">Claude's</span> massive context window — one of the largest available in any consumer AI tool — gives it a significant advantage on long document tasks.
            </p>
            <p>
              It read, retained and reasoned across the entire 40 page document without losing context or conflating information from different sections.
            </p>
            <p>
              More importantly it identified risks that required reading between the lines — implications buried in financial footnotes, tensions between statements made in different sections, and trends visible only when comparing data across multiple tables.
            </p>
            <p>
              That level of analytical depth genuinely impressed us.
            </p>
            <p>
              <span className="font-bold text-brand-cyan">ChatGPT</span> handled the task competently but showed signs of context strain on the longer document — occasionally referencing information slightly inaccurately in ways that suggested it had not fully retained the earlier sections by the time it reached the end.
            </p>
            <p>
              <span className="font-bold text-brand-cyan">Gemini</span> performed similarly to ChatGPT on this task — capable but not exceptional on the analytical depth dimension.
            </p>
            <p className="font-bold italic text-white mt-6">
              For document analysis, contract review, report summarization and any task requiring reasoning across large amounts of text Claude is the clear winner.
            </p>
          </motion.div>

          <SectionDivider />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <H2 id="test-5-honesty">TEST 5 — HONESTY & RELIABILITY</H2>
            <p className="font-mono text-sm text-gray-400 mb-4">Task: Ask each tool a question with a definitively wrong common answer to see if they push back or agree</p>
            <div className="my-6 p-4 bg-brand-surface border border-brand-cyan/30 rounded-lg inline-block">
              <span className="font-bold font-mono text-brand-cyan">Winner: Claude 🥇</span>
            </div>
            <p>
              This test matters more than most comparisons acknowledge.
            </p>
            <p>
              An AI assistant that confidently tells you wrong things is not just useless — it is actively dangerous if you are making business decisions based on its outputs.
            </p>
            <p>
              <span className="font-bold text-brand-cyan">Claude</span> pushed back on the incorrect premise immediately, explained why the common answer was wrong, and provided the correct information with appropriate context about its confidence level.
            </p>
            <p>
              It did this without being preachy or condescending — just clear and direct.
            </p>
            <p>
              <span className="font-bold text-brand-cyan">ChatGPT</span> agreed with the incorrect premise in two out of three test variations before course correcting when pushed. It was more susceptible to sycophancy — telling us what we seemed to want to hear rather than what was actually true.
            </p>
            <p>
              <span className="font-bold text-brand-cyan">Gemini</span> split the difference — more reliable than ChatGPT on factual accuracy but less consistently willing to push back on incorrect premises than Claude.
            </p>
            <p className="font-bold italic text-white mt-6">
              For any task where accuracy matters more than agreeableness — which is most tasks worth doing — Claude's honesty is a genuine competitive advantage.
            </p>
          </motion.div>

          <SectionDivider />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <H2 id="test-6-google-workspace">TEST 6 — GOOGLE WORKSPACE INTEGRATION</H2>
            <p className="font-mono text-sm text-gray-400 mb-4">Task: Summarize my last week of emails and identify action items</p>
            <div className="my-6 p-4 bg-brand-surface border border-brand-cyan/30 rounded-lg inline-block">
              <span className="font-bold font-mono text-brand-cyan">Winner: Gemini 🥇 (by a massive margin)</span>
            </div>
            <p>
              This test only applies to <span className="font-bold text-brand-cyan">Gemini</span> because Claude and ChatGPT simply cannot do it — they have no access to your Gmail, Google Drive, Google Docs or Google Calendar.
            </p>
            <p>
              Gemini can read your emails, summarize your documents, find files in your Drive, and work across your entire Google workspace natively.
            </p>
            <p>
              For anyone deeply embedded in the Google ecosystem this capability alone might be enough to justify Gemini as your primary AI assistant regardless of where it falls short on other dimensions.
            </p>
            <p className="font-bold italic text-white mt-6">
              If you live in Google Workspace Gemini is the only tool that works natively with your existing data.
            </p>
          </motion.div>

          <SectionDivider />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <H2 id="the-scorecard">THE SCORECARD</H2>
            <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden my-8">
              <table className="w-full text-left border-collapse">
                <tbody className="divide-y divide-gray-800">
                  <tr className="hover:bg-gray-800/50 transition-colors">
                    <td className="py-3 px-6 text-gray-300 font-medium">Writing Quality</td>
                    <td className="py-3 px-6 text-right">
                      <div className="flex flex-col gap-1 text-sm">
                        <div className="flex justify-between"><span>Claude</span><span className="text-brand-amber">⭐⭐⭐⭐⭐</span></div>
                        <div className="flex justify-between"><span>ChatGPT</span><span className="text-brand-amber">⭐⭐⭐⭐</span></div>
                        <div className="flex justify-between"><span>Gemini</span><span className="text-brand-amber">⭐⭐⭐</span></div>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-800/50 transition-colors">
                    <td className="py-3 px-6 text-gray-300 font-medium">Coding Ability</td>
                    <td className="py-3 px-6 text-right">
                      <div className="flex flex-col gap-1 text-sm">
                        <div className="flex justify-between"><span>ChatGPT</span><span className="text-brand-amber">⭐⭐⭐⭐⭐</span></div>
                        <div className="flex justify-between"><span>Claude</span><span className="text-brand-amber">⭐⭐⭐⭐⭐</span></div>
                        <div className="flex justify-between"><span>Gemini</span><span className="text-brand-amber">⭐⭐⭐</span></div>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-800/50 transition-colors">
                    <td className="py-3 px-6 text-gray-300 font-medium">Current Information</td>
                    <td className="py-3 px-6 text-right">
                      <div className="flex flex-col gap-1 text-sm">
                        <div className="flex justify-between"><span>Gemini</span><span className="text-brand-amber">⭐⭐⭐⭐⭐</span></div>
                        <div className="flex justify-between"><span>ChatGPT</span><span className="text-brand-amber">⭐⭐⭐⭐</span></div>
                        <div className="flex justify-between"><span>Claude</span><span className="text-brand-amber">⭐⭐⭐</span></div>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-800/50 transition-colors">
                    <td className="py-3 px-6 text-gray-300 font-medium">Document Analysis</td>
                    <td className="py-3 px-6 text-right">
                      <div className="flex flex-col gap-1 text-sm">
                        <div className="flex justify-between"><span>Claude</span><span className="text-brand-amber">⭐⭐⭐⭐⭐</span></div>
                        <div className="flex justify-between"><span>ChatGPT</span><span className="text-brand-amber">⭐⭐⭐⭐</span></div>
                        <div className="flex justify-between"><span>Gemini</span><span className="text-brand-amber">⭐⭐⭐⭐</span></div>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-800/50 transition-colors">
                    <td className="py-3 px-6 text-gray-300 font-medium">Honesty & Reliability</td>
                    <td className="py-3 px-6 text-right">
                      <div className="flex flex-col gap-1 text-sm">
                        <div className="flex justify-between"><span>Claude</span><span className="text-brand-amber">⭐⭐⭐⭐⭐</span></div>
                        <div className="flex justify-between"><span>Gemini</span><span className="text-brand-amber">⭐⭐⭐⭐</span></div>
                        <div className="flex justify-between"><span>ChatGPT</span><span className="text-brand-amber">⭐⭐⭐</span></div>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-800/50 transition-colors">
                    <td className="py-3 px-6 text-gray-300 font-medium">Google Integration</td>
                    <td className="py-3 px-6 text-right">
                      <div className="flex flex-col gap-1 text-sm">
                        <div className="flex justify-between"><span>Gemini</span><span className="text-brand-amber">⭐⭐⭐⭐⭐</span></div>
                        <div className="flex justify-between"><span>ChatGPT</span><span className="text-gray-500">✗</span></div>
                        <div className="flex justify-between"><span>Claude</span><span className="text-gray-500">✗</span></div>
                      </div>
                    </td>
                  </tr>
                  <tr className="bg-gray-800/30">
                    <td className="py-4 px-6 font-bold text-white">Overall Score</td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex flex-col gap-1 text-sm font-bold font-mono">
                        <div className="flex justify-between"><span>Claude</span><span className="text-brand-cyan">29/30</span></div>
                        <div className="flex justify-between"><span>ChatGPT</span><span className="text-brand-cyan">26/30</span></div>
                        <div className="flex justify-between"><span>Gemini</span><span className="text-brand-cyan">25/30</span></div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>

          <SectionDivider />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <H2 id="the-honest-recommendation">THE HONEST RECOMMENDATION</H2>
            <p>
              There is no single right answer here — but there is a right answer for most people reading this article.
            </p>

            <H3>CHOOSE CLAUDE IF:</H3>
            <p>
              You are a writer, founder, consultant, researcher or knowledge worker whose primary use of AI is thinking, writing and analysis.
            </p>
            <p>
              <ToolLink name="Claude" to="/tools/claude" /> will make you better at your core work in a way that feels less like using a tool and more like thinking alongside someone genuinely intelligent.
            </p>
            <p>
              The <Money>$20/month</Money> Pro plan is one of the best value subscriptions in the AI tools market.
            </p>

            <H3>CHOOSE CHATGPT IF:</H3>
            <p>
              You are a developer or technical user who needs the broadest feature set — image generation, voice mode, plugins, the widest range of third party integrations, and the most established ecosystem of tools built around a single AI platform.
            </p>
            <p>
              <ToolLink name="ChatGPT" to="/tools/chatgpt" />'s breadth is unmatched even if its depth on individual tasks is occasionally surpassed.
            </p>

            <H3>CHOOSE GEMINI IF:</H3>
            <p>
              You live in Google Workspace and want an AI assistant that works natively with your existing email, documents and calendar.
            </p>
            <p>
              Or if real time web information is a core part of your daily AI usage and you want the most deeply integrated search capability available in any consumer AI tool.
            </p>

            <CalloutTip>
              <span className="font-bold text-white">THE POWER USER MOVE:</span> Use Claude as your primary assistant for thinking and writing. Use Perplexity for real time research. Use Cursor for coding. You get the best of every capability without being limited by the weaknesses of any single tool.
            </CalloutTip>
          </motion.div>

          <SectionDivider />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <H2 id="pricing-comparison">PRICING COMPARISON</H2>
            <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden my-8">
              <table className="w-full text-left border-collapse">
                <tbody className="divide-y divide-gray-800">
                  <tr className="hover:bg-gray-800/50 transition-colors">
                    <td className="py-3 px-6 text-gray-300">Claude Free</td>
                    <td className="py-3 px-6 text-brand-cyan font-mono text-right">Limited daily messages</td>
                  </tr>
                  <tr className="hover:bg-gray-800/50 transition-colors">
                    <td className="py-3 px-6 text-gray-300">Claude Pro</td>
                    <td className="py-3 px-6 text-brand-cyan font-mono text-right"><Money>$20/month</Money> — best value</td>
                  </tr>
                  <tr className="bg-gray-800/20">
                    <td colSpan={2} className="py-1"></td>
                  </tr>
                  <tr className="hover:bg-gray-800/50 transition-colors">
                    <td className="py-3 px-6 text-gray-300">ChatGPT Free</td>
                    <td className="py-3 px-6 text-brand-cyan font-mono text-right">Limited GPT-4o access</td>
                  </tr>
                  <tr className="hover:bg-gray-800/50 transition-colors">
                    <td className="py-3 px-6 text-gray-300">ChatGPT Plus</td>
                    <td className="py-3 px-6 text-brand-cyan font-mono text-right"><Money>$20/month</Money></td>
                  </tr>
                  <tr className="hover:bg-gray-800/50 transition-colors">
                    <td className="py-3 px-6 text-gray-300">ChatGPT Pro</td>
                    <td className="py-3 px-6 text-brand-cyan font-mono text-right"><Money>$200/month</Money></td>
                  </tr>
                  <tr className="bg-gray-800/20">
                    <td colSpan={2} className="py-1"></td>
                  </tr>
                  <tr className="hover:bg-gray-800/50 transition-colors">
                    <td className="py-3 px-6 text-gray-300">Gemini Free</td>
                    <td className="py-3 px-6 text-brand-cyan font-mono text-right">Basic Gemini access</td>
                  </tr>
                  <tr className="hover:bg-gray-800/50 transition-colors">
                    <td className="py-3 px-6 text-gray-300">Gemini Advanced</td>
                    <td className="py-3 px-6 text-brand-cyan font-mono text-right"><Money>$19.99/month</Money> <br/><span className="text-xs text-gray-500">(included in Google One AI Premium)</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              All three offer meaningful free tiers that are worth trying before committing to a paid plan.
            </p>
            <p>
              Start free, identify which tool fits your workflow, then upgrade when the usage limits become a real constraint on your work.
            </p>
          </motion.div>

          <SectionDivider />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <H2 id="final-verdict">FINAL VERDICT</H2>
            <p>
              <span className="font-bold text-brand-cyan">Claude</span> wins on the dimensions that matter most for serious knowledge work — writing quality, analytical depth, document reasoning and honesty.
            </p>
            <p>
              For the majority of founders, creators, consultants and professionals reading this article, Claude is the AI assistant we recommend starting with.
            </p>
            <p>
              <span className="font-bold text-brand-cyan">ChatGPT</span> remains the most versatile option for users who need the broadest feature set and the most established third party ecosystem.
            </p>
            <p>
              It is not the best at any single thing on this list but it is excellent at everything, which has its own value.
            </p>
            <p>
              <span className="font-bold text-brand-cyan">Gemini</span> is the specialist — extraordinary in its Google integration and real time information capabilities, and a genuinely strong all-round assistant for anyone already living in the Google ecosystem.
            </p>
            
            <PullQuote>
              "The good news is that all three offer free plans generous enough to form a real opinion. Try them all for a week on real tasks from your actual work before committing to a paid plan."
            </PullQuote>
          </motion.div>

          <SectionDivider />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <H2 id="read-next">READ NEXT</H2>
            <p>
              We have a complete in-depth review of Claude covering every feature, pricing tier, pros and cons and exactly who it is best for:
            </p>
            <ToolReviewCard name="Claude" desc="Best AI assistant for writing and reasoning" to="/tools/claude" category="AI Assistant" />
            
            <p className="mt-8">
              And if you are serious about research alongside your AI assistant, read our Perplexity review — the tool that solves Claude's one real weakness:
            </p>
            <ToolReviewCard name="Perplexity" desc="Best AI tool for research and information" to="/tools/perplexity" category="Research" />
          </motion.div>

          <div className="mt-16 p-6 bg-gray-900 border border-gray-800 text-sm text-gray-400">
            <div className="font-bold font-mono text-white mb-2">ABOUT THIS ARTICLE</div>
            domskysolutions.com reviews AI tools and SaaS software for founders, solopreneurs and builders. We test every tool we recommend and update our reviews regularly as products evolve. Some links in this article are affiliate links — we may earn a commission if you sign up through them at no extra cost to you.
          </div>
        </div>
      </div>

      {/* Related Articles Section */}
      <div className="max-w-5xl mx-auto px-6 mt-24 border-t border-gray-800 pt-16">
        <h2 className="text-2xl font-bold font-mono text-white mb-8">Related Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {BLOG_POSTS.filter(p => p.slug !== "/blog/claude-vs-chatgpt-vs-gemini-2026").slice(0, 2).map(post => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};
```


### src/pages/blog/BlogPost4.tsx

```tsx

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Check, Star, TrendingUp, Clock, Target, Zap, Shield, Sparkles } from 'lucide-react';
import { useScroll } from 'motion/react';
import { ToolReviewCard } from '../../components/ToolCard';
import { ConvertKitForm } from '../../components/ConvertKitForm';
import { Money, BeforeAfter, SectionDivider, H2, H3, CalloutTip, Step, PullQuote, StatCard, SavingsChart, ToolLink } from '../../components/ui';
export const BlogPost4 = () => {
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    document.title = "How I Use AI to Run My Entire Business Solo — My Exact Daily Workflow";
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', "I run a growing AI tools publication completely solo. Here is the exact AI workflow I use every single day — the tools, the order, the prompts, and the time it saves.");
  }, []);

  return (
    <div className="bg-brand-bg min-h-screen text-gray-300 font-sans pb-24">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-brand-cyan origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />
      
      <div className="max-w-[680px] mx-auto px-6 pt-32">
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-brand-cyan font-mono text-sm uppercase tracking-wider">AI News</span>
            <span className="text-gray-500 font-mono text-sm">•</span>
            <span className="text-gray-400 font-mono text-sm">9 min read</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-mono text-white leading-tight mb-8">
            How I Use AI to Run My Entire Business Solo — My Exact Daily Workflow
          </h1>
          <div className="flex flex-wrap gap-2">
            {['AI Workflow', 'Solopreneur', 'Productivity', 'AI Tools 2026', 'Daily Routine', 'Solo Business'].map(tag => (
              <span key={tag} className="px-3 py-1 bg-gray-800 text-gray-300 text-xs font-mono rounded-full border border-gray-700">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="w-full rounded-xl overflow-hidden mb-12 border border-brand-surface shadow-2xl bg-gray-900 flex items-center justify-center" style={{height: '400px'}}>
          <div className="text-center text-gray-600">
            <div className="text-6xl mb-4">🖼</div>
            <p className="font-mono text-sm">
              [ INSERT COVER IMAGE HERE ]
            </p>
            <p className="font-mono text-xs mt-2 opacity-50">
              Suggested: A clean, top-down shot of a minimalist desk setup with a coffee cup and a glowing laptop screen, cinematic lighting.
            </p>
          </div>
        </div>

        <div className="prose prose-invert max-w-none text-[17px] leading-[1.8] space-y-6">
          <p>
            People ask me regularly how I manage to run domskysolutions.com — researching tools, writing reviews, publishing blog posts, managing social media, and keeping up with a industry that moves faster than any other — completely alone, without a team, without an agency, and without burning out in the process.
          </p>
          <p>
            The honest answer is that I do not do it alone.
          </p>
          <p>
            I do it with a stack of AI tools that handle the parts of the work that used to require either a team or an unsustainable number of hours.
          </p>
          <p>
            What follows is not a theoretical framework or a curated list of tools I think sound impressive. It is the exact workflow I use every single day, in the order I use it, with the specific tools that have earned a permanent place in how I operate.
          </p>
          <p>
            If you are building something solo — a newsletter, a content site, a consulting practice, a SaaS product, or anything in between — this is the closest thing I can offer to showing you exactly what running a one person business looks like when AI is doing its job properly.
          </p>

          <SectionDivider />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <H2 id="the-morning-block">THE MORNING BLOCK — 7:00 AM TO 9:00 AM</H2>
            <p className="text-xl text-white mb-6">"Intelligence gathering"</p>

            <p>
              The first two hours of my day used to be the most chaotic. Tabs open everywhere. Newsletter after newsletter. Twitter scrolling that felt productive but was not. Three different apps for notes that never talked to each other.
            </p>
            <p>
              I was consuming information without processing it, which meant I was always busy but rarely informed in any useful way.
            </p>
            <p>
              Now my morning looks like this:
            </p>

            <H3>STEP 1 — THE DAILY BRIEF WITH PERPLEXITY</H3>
            <p className="mb-2"><strong>Time:</strong> 15 minutes</p>
            <p className="mb-6"><strong>Tool:</strong> <ToolLink name="Perplexity Pro" to="/tools/perplexity" /></p>

            <p>
              The first thing I open every morning is <ToolLink name="Perplexity" to="/tools/perplexity" />. I run the same three searches every day:
            </p>

            <div className="bg-brand-surface border border-gray-800 p-6 rounded-lg my-6 font-mono text-sm">
              <p className="text-brand-cyan mb-2">Search 1:</p>
              <p className="mb-4">"Most significant AI tool launches and updates in the last 24 hours"</p>
              
              <p className="text-brand-cyan mb-2">Search 2:</p>
              <p className="mb-4">"Latest news about [the specific tool I am currently reviewing]"</p>
              
              <p className="text-brand-cyan mb-2">Search 3:</p>
              <p>"Top discussions about AI tools on Reddit and Twitter today"</p>
            </div>

            <p>
              <ToolLink name="Perplexity" to="/tools/perplexity" /> reads the current web, pulls the most relevant sources, and gives me cited summaries in under a minute each.
            </p>
            <p>
              What used to take an hour of tab switching now takes fifteen minutes and I come away with actual information rather than the feeling of having been informed.
            </p>

            <CalloutTip>
              <span className="font-bold text-white">Key insight:</span> I save every interesting finding directly into <ToolLink name="Notion" to="/tools/notion" /> with one click. No more losing things in browser tabs.
            </CalloutTip>

            <H3>STEP 2 — PROCESSING NOTES WITH NOTION AI</H3>
            <p className="mb-2"><strong>Time:</strong> 10 minutes</p>
            <p className="mb-6"><strong>Tool:</strong> <ToolLink name="Notion AI" to="/tools/notion" /></p>

            <p>
              Everything I captured yesterday — ideas, research notes, half-formed article concepts, interesting quotes — lives in a <ToolLink name="Notion" to="/tools/notion" /> inbox page.
            </p>
            <p>
              Every morning I open it and ask <ToolLink name="Notion AI" to="/tools/notion" />:
            </p>

            <div className="bg-brand-surface border border-gray-800 p-6 rounded-lg my-6 font-mono text-sm">
              <p className="text-brand-cyan mb-2">Prompt:</p>
              <p>"Summarize everything in this inbox, identify any action items, and suggest which items could become content pieces"</p>
            </div>

            <p>
              It processes everything I dumped in yesterday and hands me back a clear picture of what needs attention.
            </p>
            <p>
              The cognitive load of remembering what I was working on is completely eliminated. I just read the summary and know exactly where I am.
            </p>

            <CalloutTip>
              <span className="font-bold text-white">Key insight:</span> <ToolLink name="Notion AI" to="/tools/notion" /> is not just a writing tool — it is a thinking partner that makes your existing notes more valuable than you could make them yourself.
            </CalloutTip>
          </motion.div>

          <SectionDivider />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <H2 id="the-content-block">THE CONTENT BLOCK — 9:00 AM TO 12:00 PM</H2>
            <p className="text-xl text-white mb-6">"Creating and publishing"</p>

            <p>
              This is the core of my working day and where AI assistance has the most dramatic impact on output.
            </p>
            <p>
              Three hours of focused content work now produces what used to take a full day.
            </p>

            <H3>STEP 3 — FIRST DRAFT WITH CLAUDE</H3>
            <p className="mb-2"><strong>Time:</strong> 30-45 minutes per piece</p>
            <p className="mb-6"><strong>Tool:</strong> <ToolLink name="Claude Pro" to="/tools/claude" /></p>

            <p>
              I do not stare at a blank page. Ever.
            </p>
            <p>
              <ToolLink name="Claude" to="/tools/claude" /> handles every first draft — blog posts, tool reviews, newsletter issues, social media threads. My process:
            </p>

            <div className="bg-brand-surface border border-gray-800 p-6 rounded-lg my-6 font-mono text-sm">
              <p className="text-brand-cyan mb-2">The prompt I use for blog posts:</p>
              <p className="mb-4">"Write a detailed outline for an article titled [title]. The audience is founders and solopreneurs. The tone is direct, experienced, and honest — not salesy. Include a hook introduction, 5-7 main sections with subpoints, and a strong conclusion with a clear takeaway."</p>
              
              <p className="text-brand-cyan mb-2">Once the outline is approved I ask:</p>
              <p>"Now write the full article based on this outline. Use specific examples, avoid generic statements, and write as if you are a practitioner who has actually used these tools — not a reviewer who is summarizing specs."</p>
            </div>

            <p>
              The draft <ToolLink name="Claude" to="/tools/claude" /> produces is 70-80 percent of the way to publishable.
            </p>
            <p>
              The remaining 20-30 percent is my job — adding personal experience, specific examples from my actual use of the tools, and the genuine opinions that only come from real usage.
            </p>

            <CalloutTip>
              <span className="font-bold text-white">Key insight:</span> <ToolLink name="Claude" to="/tools/claude" /> does not replace my writing. It eliminates the blank page problem and the structural thinking, which are the two most time consuming parts of the writing process for me. The voice and the insight remain mine.
            </CalloutTip>

            <H3>STEP 4 — RESEARCH VERIFICATION WITH PERPLEXITY</H3>
            <p className="mb-2"><strong>Time:</strong> 15 minutes</p>
            <p className="mb-6"><strong>Tool:</strong> <ToolLink name="Perplexity Pro" to="/tools/perplexity" /></p>

            <p>
              Before anything gets published I verify every factual claim — pricing, features, recent updates — against current sources.
            </p>
            <p>
              AI tools change fast. A pricing tier that was accurate two months ago might not be accurate today.
            </p>

            <p>
              I paste the draft into a note and ask <ToolLink name="Perplexity" to="/tools/perplexity" />:
            </p>

            <div className="bg-brand-surface border border-gray-800 p-6 rounded-lg my-6 font-mono text-sm">
              <p>"Verify these specific claims about [tool name] — are the pricing tiers, features, and any statistics current and accurate as of today?"</p>
            </div>

            <p>
              It checks against live sources and flags anything that has changed. This single step is what separates content that builds trust from content that erodes it.
            </p>

            <H3>STEP 5 — VISUALS WITH MIDJOURNEY</H3>
            <p className="mb-2"><strong>Time:</strong> 20 minutes</p>
            <p className="mb-6"><strong>Tool:</strong> <ToolLink name="Midjourney Standard" to="/tools/midjourney" /></p>

            <p>
              Every piece of content needs a cover image. My process is now:
            </p>

            <ol className="list-decimal pl-6 space-y-2 mb-6">
              <li>Describe the article concept in one sentence</li>
              <li>Ask <ToolLink name="Claude" to="/tools/claude" /> to suggest three <ToolLink name="Midjourney" to="/tools/midjourney" /> prompts that would create a compelling cover image for that concept</li>
              <li>Run the best prompt in <ToolLink name="Midjourney" to="/tools/midjourney" /></li>
              <li>Upscale the best result</li>
              <li>Done</li>
            </ol>

            <p>
              The cover images this process produces are consistently better than anything I could brief a designer to create because <ToolLink name="Claude" to="/tools/claude" /> understands both the article content and what makes a good <ToolLink name="Midjourney" to="/tools/midjourney" /> prompt.
            </p>
          </motion.div>

          <SectionDivider />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <H2 id="the-distribution-block">THE DISTRIBUTION BLOCK — 12:00 PM TO 1:00 PM</H2>
            <p className="text-xl text-white mb-6">"Getting the work seen"</p>

            <p>
              Creating content that nobody sees is not a content strategy — it is a hobby.
            </p>
            <p>
              Distribution is half the job and AI has made it dramatically more efficient.
            </p>

            <H3>STEP 6 — SOCIAL CONTENT WITH CLAUDE</H3>
            <p className="mb-2"><strong>Time:</strong> 20 minutes</p>
            <p className="mb-6"><strong>Tool:</strong> <ToolLink name="Claude Pro" to="/tools/claude" /></p>

            <p>
              Once an article is published I ask <ToolLink name="Claude" to="/tools/claude" />:
            </p>

            <div className="bg-brand-surface border border-gray-800 p-6 rounded-lg my-6 font-mono text-sm">
              <p className="mb-4">"Based on this article [paste article], create the following:</p>
              <ol className="list-decimal pl-6 space-y-2">
                <li>A LinkedIn post — professional tone, leads with the most counterintuitive insight, ends with a question to drive comments. 250 words maximum.</li>
                <li>An X thread — 8 tweets, hooks with a bold claim, each tweet is standalone valuable, ends with a link to the full article.</li>
                <li>Three different hook options for the article that I can test across different platforms."</li>
              </ol>
            </div>

            <p>
              <ToolLink name="Claude" to="/tools/claude" /> produces all of this in under a minute.
            </p>
            <p>
              I review, edit anything that does not sound like me, and schedule everything in one sitting.
            </p>

            <CalloutTip>
              <span className="font-bold text-white">Key insight:</span> The same article now generates content for three platforms without three times the work. That compounding is what makes solo publishing sustainable.
            </CalloutTip>

            <H3>STEP 7 — NEWSLETTER ISSUE WITH CLAUDE + NOTION AI</H3>
            <p className="mb-2"><strong>Time:</strong> 20 minutes</p>
            <p className="mb-6"><strong>Tool:</strong> <ToolLink name="Claude Pro" to="/tools/claude" /> + <ToolLink name="Notion AI" to="/tools/notion" /></p>

            <p>
              My weekly newsletter goes out every Thursday. The process:
            </p>

            <ol className="list-decimal pl-6 space-y-4 mb-6">
              <li>Ask <ToolLink name="Notion AI" to="/tools/notion" /> to pull the most interesting things I captured in my inbox that week</li>
              <li>
                Ask <ToolLink name="Claude" to="/tools/claude" /> to turn the highlights into a newsletter format:
                <div className="bg-brand-bg border border-gray-800 p-4 rounded mt-2 font-mono text-sm">
                  "Write a weekly newsletter issue using these highlights. Include: one main insight, three tool recommendations with one line each, one tip readers can use today, and a closing thought. Tone: like a smart friend sharing what they learned this week."
                </div>
              </li>
              <li>Edit to add my voice and any personal context</li>
              <li>Send</li>
            </ol>

            <p>
              The entire newsletter production process takes under thirty minutes from a cold start.
            </p>
          </motion.div>

          <SectionDivider />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <H2 id="the-operations-block">THE OPERATIONS BLOCK — 2:00 PM TO 3:00 PM</H2>
            <p className="text-xl text-white mb-6">"Running the business"</p>

            <H3>STEP 8 — TOOL RESEARCH WITH PERPLEXITY + CLAUDE</H3>
            <p className="mb-2"><strong>Time:</strong> 45 minutes</p>
            <p className="mb-6"><strong>Tool:</strong> <ToolLink name="Perplexity Pro" to="/tools/perplexity" /> + <ToolLink name="Claude Pro" to="/tools/claude" /></p>

            <p>
              Every week I research one new tool deeply enough to write a full review. The process:
            </p>

            <div className="space-y-4 mb-6">
              <div>
                <p className="font-bold text-white">Phase 1 — Research with <ToolLink name="Perplexity" to="/tools/perplexity" />:</p>
                <p className="font-mono text-sm bg-brand-surface p-3 rounded border border-gray-800 mt-1">"Give me a comprehensive overview of [tool name] — what it does, who it is for, current pricing tiers, recent updates, and what users are saying about it on Reddit and Twitter"</p>
              </div>
              <div>
                <p className="font-bold text-white">Phase 2 — Structure with <ToolLink name="Claude" to="/tools/claude" />:</p>
                <p className="font-mono text-sm bg-brand-surface p-3 rounded border border-gray-800 mt-1">"Based on this research [paste Perplexity output], create a detailed review outline following this structure: hero description, key features, pros, cons, pricing, who it is best for, final verdict"</p>
              </div>
              <div>
                <p className="font-bold text-white">Phase 3 — Write with <ToolLink name="Claude" to="/tools/claude" />:</p>
                <p className="font-mono text-sm bg-brand-surface p-3 rounded border border-gray-800 mt-1">"Now write the full review using this outline. Be honest about limitations — we never write purely positive reviews."</p>
              </div>
              <div>
                <p className="font-bold text-white">Phase 4 — Personal layer:</p>
                <p className="mt-1">I add my own experience using the tool, specific examples, and genuine opinions before publishing.</p>
              </div>
            </div>

            <H3>STEP 9 — CODING AND SITE UPDATES WITH CURSOR</H3>
            <p className="mb-2"><strong>Time:</strong> As needed</p>
            <p className="mb-6"><strong>Tool:</strong> <ToolLink name="Cursor Pro" to="/tools/cursor" /></p>

            <p>
              Any time the website needs updating — a new section, a bug fix, a design tweak — I use <ToolLink name="Cursor" to="/tools/cursor" />.
            </p>
            <p>
              I describe what I want in plain language and <ToolLink name="Cursor" to="/tools/cursor" /> writes the code.
            </p>

            <p>
              Last week I added a new filtering system to the tools page. I described what I wanted, <ToolLink name="Cursor" to="/tools/cursor" /> wrote the React component, I reviewed it, and it was live in under an hour.
            </p>
            <p>
              Without <ToolLink name="Cursor" to="/tools/cursor" /> that change would have required briefing a developer and waiting days.
            </p>

            <CalloutTip>
              <span className="font-bold text-white">Key insight:</span> <ToolLink name="Cursor" to="/tools/cursor" /> is not just for developers. It is for anyone who wants to control their own digital product without being permanently dependent on someone else to make changes for them.
            </CalloutTip>
          </motion.div>

          <SectionDivider />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <H2 id="the-numbers">THE NUMBERS — WHAT THIS WORKFLOW ACTUALLY SAVES</H2>

            <p>
              Here is an honest accounting of what this AI workflow replaces and what it costs:
            </p>

            <div className="bg-brand-surface border border-gray-800 rounded-xl overflow-hidden my-8">
              <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-800">
                <div className="p-6">
                  <h4 className="text-lg font-bold font-mono text-red-400 mb-4">BEFORE THIS WORKFLOW:</h4>
                  <ul className="space-y-3 text-sm">
                    <li className="flex justify-between"><span>Research time:</span> <strong>3 hours/day</strong></li>
                    <li className="flex justify-between"><span>Writing time:</span> <strong>4 hours/article</strong></li>
                    <li className="flex justify-between"><span>Social content:</span> <strong>1 hour/post</strong></li>
                    <li className="flex justify-between"><span>Newsletter:</span> <strong>3 hours/issue</strong></li>
                    <li className="flex justify-between"><span>Developer retainer:</span> <strong><Money>$300/month</Money></strong></li>
                    <li className="flex justify-between"><span>Designer:</span> <strong><Money>$200/month</Money></strong></li>
                    <li className="border-t border-gray-700 pt-3 mt-3 flex justify-between text-white"><span>Total time per week:</span> <strong>35-40 hours</strong></li>
                    <li className="flex justify-between text-red-400"><span>Total monthly cost:</span> <strong><Money>$500+</Money></strong></li>
                  </ul>
                </div>
                <div className="p-6">
                  <h4 className="text-lg font-bold font-mono text-green-400 mb-4">WITH THIS WORKFLOW:</h4>
                  <ul className="space-y-3 text-sm">
                    <li className="flex justify-between"><span>Research time:</span> <strong>45 minutes/day</strong></li>
                    <li className="flex justify-between"><span>Writing time:</span> <strong>90 minutes/article</strong></li>
                    <li className="flex justify-between"><span>Social content:</span> <strong>20 minutes/post</strong></li>
                    <li className="flex justify-between"><span>Newsletter:</span> <strong>30 minutes/issue</strong></li>
                    <li className="flex justify-between"><span>Developer retainer:</span> <strong><Money>$0</Money></strong></li>
                    <li className="flex justify-between"><span>Designer:</span> <strong><Money>$0</Money></strong></li>
                    <li className="border-t border-gray-700 pt-3 mt-3 flex justify-between text-white"><span>Total time per week:</span> <strong>18-20 hours</strong></li>
                    <li className="flex justify-between text-green-400"><span>Monthly tool cost:</span> <strong><Money>$140/month</Money></strong></li>
                  </ul>
                </div>
              </div>
              <div className="bg-gray-900 p-6 border-t border-gray-800 text-center">
                <p className="text-lg font-mono text-white mb-1">Time saved per week: <span className="text-green-400 font-bold">15-20 hours</span></p>
                <p className="text-lg font-mono text-white">Money saved per month: <span className="text-green-400 font-bold"><Money>$360+</Money></span></p>
              </div>
            </div>

            <p>
              That time saving is not theoretical.
            </p>
            <p>
              It is the difference between burning out trying to run everything alone and having enough capacity left to actually think about where the business is going.
            </p>
          </motion.div>

          <SectionDivider />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <H2 id="the-tools">THE TOOLS IN THIS WORKFLOW</H2>

            <p>
              Every tool mentioned in this workflow has a full review on domskysolutions.com:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
              <ToolReviewCard name="Claude" desc="The thinking and writing partner that powers everything." to="/tools/claude" category="AI Assistant" />
              <ToolReviewCard name="Perplexity" desc="The research department that runs in real time." to="/tools/perplexity" category="Research" />
              <ToolReviewCard name="Notion AI" desc="The knowledge system that makes everything else findable." to="/tools/notion" category="Workspace" />
              <ToolReviewCard name="Midjourney" desc="The design studio for every visual asset." to="/tools/midjourney" category="Image Generation" />
              <ToolReviewCard name="Cursor" desc="The development team for every site change." to="/tools/cursor" category="Code Editor" />
            </div>

            <p className="text-xl font-bold font-mono text-center my-8">
              Total: <span className="text-brand-cyan"><Money>$116/month</Money></span> for a workflow that replaces a team.
            </p>
          </motion.div>

          <SectionDivider />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <H2 id="the-one-thing">THE ONE THING THAT MAKES IT WORK</H2>

            <p>
              Every tool in this workflow is only as good as the human judgment applied to its output.
            </p>
            <p>
              <ToolLink name="Claude" to="/tools/claude" />'s drafts need editing. <ToolLink name="Perplexity" to="/tools/perplexity" />'s research needs verification. <ToolLink name="Midjourney" to="/tools/midjourney" />'s images need curation. <ToolLink name="Cursor" to="/tools/cursor" />'s code needs review.
            </p>
            <p>
              The workflow does not replace thinking. It removes the friction between thinking and doing — and that is where most of the time in a solo business actually goes.
            </p>
            <p>
              When that friction disappears, the amount you can produce alone genuinely surprises you.
            </p>
            <p>
              This is not about working harder. It is about removing every obstacle between an idea and its execution.
            </p>
            
            <PullQuote>
              "The workflow does not replace thinking. It removes the friction between thinking and doing."
            </PullQuote>
          </motion.div>

          <SectionDivider />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <H2 id="want-this-workflow">WANT THIS WORKFLOW FOR YOUR BUSINESS?</H2>

            <p>
              Start with just two tools — <ToolLink name="Claude" to="/tools/claude" /> and <ToolLink name="Perplexity" to="/tools/perplexity" />.
            </p>
            <p>
              Use them exclusively for two weeks on real work tasks. The time saving will be obvious enough to tell you exactly which tool to add next.
            </p>
            <p>
              The full stack takes time to build. The first tool takes an afternoon.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Link to="/tools/claude" className="flex-1 bg-brand-surface border border-gray-700 p-4 text-center hover:border-brand-cyan transition-colors group">
                <span className="block font-bold text-white mb-1 group-hover:text-brand-cyan transition-colors">Start with Claude</span>
                <span className="text-sm text-gray-400 flex items-center justify-center gap-1">Read our review <ArrowRight size={14} /></span>
              </Link>
              <Link to="/tools/perplexity" className="flex-1 bg-brand-surface border border-gray-700 p-4 text-center hover:border-brand-cyan transition-colors group">
                <span className="block font-bold text-white mb-1 group-hover:text-brand-cyan transition-colors">Start with Perplexity</span>
                <span className="text-sm text-gray-400 flex items-center justify-center gap-1">Read our review <ArrowRight size={14} /></span>
              </Link>
            </div>
          </motion.div>

          <div className="mt-16 p-6 bg-brand-surface border border-gray-800 rounded-xl text-sm text-gray-400">
            <p className="mb-2"><strong className="text-gray-300">ABOUT THIS ARTICLE</strong></p>
            <p>
              domskysolutions.com reviews AI tools and SaaS software for founders, solopreneurs and builders. We test every tool we recommend and update our reviews regularly as products evolve. Some links in this article are affiliate links — we may earn a commission if you sign up through them at no extra cost to you.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
```


### src/pages/blog/BlogPost5.tsx

```tsx

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Check, Star, TrendingUp, Clock, Target, Zap, Shield, Sparkles, ChevronUp, Coffee } from 'lucide-react';
import { useScroll } from 'motion/react';
import { useState } from 'react';
import { ToolReviewCard } from '../../components/ToolCard';
import { BLOG_POSTS } from '../../data/blogPosts';
import { BlogCard } from '../../components/BlogCard';
import { ConvertKitForm } from '../../components/ConvertKitForm';
import { Money, BeforeAfter, SectionDivider, H2, H3, CalloutTip, Step, PullQuote, StatCard, SavingsChart, ToolLink } from '../../components/ui';
export const BlogPost5 = () => {
  const { scrollYProgress } = useScroll();
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    document.title = "Why I Cancelled Adobe and Never Looked Back | Domsky Solutions";
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', "After 12 years as a graphic designer I finally did it. Here's exactly what replaced it and what I'd never give up.");
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
      
      const sections = ['the-breaking-point', 'what-i-was-scared-of', 'the-experiment', 'what-surprised-me', 'the-honest-part', 'the-numbers', 'one-more-thing', 'want-the-full-picture'];
      let current = '';
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && window.scrollY >= (element.offsetTop - 100)) {
          current = section;
        }
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({ top: element.offsetTop - 80, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-brand-bg min-h-screen text-gray-300 font-sans pb-24 relative">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-brand-cyan origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />
      
      {/* Table of Contents Sidebar (Desktop Only) */}
      <div className="hidden xl:block fixed left-[max(0px,calc(50%-550px))] top-48 w-64">
        <div className="text-sm font-bold font-inter text-gray-500 uppercase tracking-wider mb-4">Contents</div>
        <ul className="space-y-3 font-inter text-sm">
          {[
            { id: 'the-breaking-point', label: 'The Breaking Point' },
            { id: 'what-i-was-scared-of', label: 'What I Was Scared Of' },
            { id: 'the-experiment', label: 'The Experiment' },
            { id: 'what-surprised-me', label: 'What Surprised Me' },
            { id: 'the-honest-part', label: 'The Honest Part' },
            { id: 'the-numbers', label: 'The Numbers' },
            { id: 'one-more-thing', label: 'One More Thing' },
            { id: 'want-the-full-picture', label: 'Want The Full Picture?' },
          ].map(item => (
            <li key={item.id}>
              <button 
                onClick={() => scrollToSection(item.id)}
                className={`text-left transition-colors hover:text-brand-cyan ${activeSection === item.id ? 'text-brand-cyan font-semibold' : 'text-gray-400'}`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button 
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-brand-surface border border-gray-800 p-3 rounded-full text-brand-cyan hover:bg-brand-cyan hover:text-brand-bg transition-colors z-50 shadow-lg"
          aria-label="Back to top"
        >
          <ChevronUp size={24} />
        </button>
      )}

      <div className="max-w-[680px] mx-auto px-6 pt-32">
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-brand-cyan font-mono text-sm uppercase tracking-wider">Design</span>
            <span className="text-gray-500 font-mono text-sm">•</span>
            <span className="text-gray-400 font-mono text-sm flex items-center gap-2"><Coffee size={16} /> 6 min read</span>
          </div>
          <h1 className="text-[48px] font-bold font-inter text-white leading-tight mb-8">
            Why I Cancelled Adobe and Never Looked Back
          </h1>
          <div className="flex flex-wrap gap-2">
            {['AI Tools', 'Design', 'Adobe', 'Midjourney', 'Cost Saving'].map(tag => (
              <span key={tag} className="px-3 py-1 bg-gray-800 text-gray-300 text-xs font-mono rounded-full border border-gray-700">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="w-full rounded-xl overflow-hidden mb-12 border border-brand-surface shadow-2xl bg-gray-900 flex items-center justify-center" style={{height: '400px'}}>
          <div className="text-center text-gray-600">
            <div className="text-6xl mb-4">🖼</div>
            <p className="font-mono text-sm">
              [ INSERT COVER IMAGE HERE ]
            </p>
            <p className="font-mono text-xs mt-2 text-gray-700">
              Recommended: dark moody desk setup, designer at work
            </p>
          </div>
        </div>

        <div className="prose prose-invert max-w-none text-[18px] leading-[1.9] font-serif space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <p>
              <span className="font-bold text-white">After 12 years as a graphic designer, I finally cancelled Adobe.</span>
            </p>
            <p>
              The monthly subscription was draining my bank account for tools I barely used. It felt like paying a premium tax just to call myself a professional.
            </p>
            <p>
              Here's exactly what replaced it, what surprised me, and the one tool I'd never give up.
            </p>
          </motion.div>

          <SectionDivider />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <H2 id="the-breaking-point">THE BREAKING POINT</H2>
            <p>
              I remember the exact moment. January 2024, opening my bank statement with a coffee in hand.
            </p>
            <p>
              And there it was. <Money>$55</Money>. Again. Like clockwork.
            </p>
            <p>
              I opened Photoshop maybe four times that month. Premiere twice. Illustrator once to fix a logo I'd made three years ago.
            </p>
            <p>
              <Money>$55</Money> for four sessions of Photoshop. I've paid less for a full dinner.
            </p>

            <div className="w-full rounded-xl overflow-hidden my-8 border border-brand-surface bg-gray-900 flex items-center justify-center" style={{height: '320px'}}>
              <div className="text-center text-gray-600">
                <div className="text-5xl mb-4">🖼</div>
                <p className="font-mono text-sm">[ INSERT IMAGE HERE ]</p>
                <p className="font-mono text-xs mt-2 text-gray-700">
                  Recommended: close-up of a bank statement or subscription receipt
                </p>
              </div>
            </div>

            <p>
              Over five years that's <span className="font-bold text-white"><Money>$3,300</Money> wasted</span>. For software I was using at maybe 20% capacity.
            </p>
            <p>
              The math made me feel genuinely stupid. That was the month I decided to run the experiment.
            </p>
            <p className="font-bold text-white mt-6">
              It was time to see if I could survive without the industry standard.
            </p>
          </motion.div>

          <PullQuote>
            "$55 a month. Four Photoshop sessions. I've paid less for a full dinner."
          </PullQuote>

          <SectionDivider />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <H2 id="what-i-was-scared-of">WHAT I WAS ACTUALLY SCARED OF</H2>
            <p>
              Let me be honest about something most "I quit Adobe" posts skip over entirely.
            </p>
            <p>
              <em>I was terrified.</em>
            </p>
            <p>
              Not of the tools. Of what clients would think. Of showing up to a meeting and someone asking what software I used.
            </p>
            <p>
              I dreaded having to explain that I now generate images with a text prompt.
            </p>

            <div className="w-full rounded-xl overflow-hidden my-8 border border-brand-surface bg-gray-900 flex items-center justify-center" style={{height: '320px'}}>
              <div className="text-center text-gray-600">
                <div className="text-5xl mb-4">🖼</div>
                <p className="font-mono text-sm">[ INSERT IMAGE HERE ]</p>
                <p className="font-mono text-xs mt-2 text-gray-700">
                  Recommended: person looking stressed at a computer
                </p>
              </div>
            </div>

            <H3>The Muscle Memory Trap</H3>
            <p>
              Twelve years of Photoshop muscle memory. Twelve years of knowing exactly where every panel, every shortcut, every obscure filter lived.
            </p>
            <p>
              That's not nothing. Switching felt like showing up to work in a different body.
            </p>
            <p>
              But <Money>$3,300</Money> over five years has a way of making you brave.
            </p>
            <CalloutTip>
              Don't underestimate the emotional cost of switching tools. Give yourself grace during the transition period.
            </CalloutTip>
          </motion.div>

          <SectionDivider />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <H2 id="the-experiment">THE EXPERIMENT</H2>
            <p>
              30 days. No Adobe. Whatever happened, happened.
            </p>
            <p>
              Here's exactly what I replaced each tool with:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-300 my-4">
              <li><span className="font-bold text-white">Photoshop</span> → <ToolLink name="Midjourney" to="/reviews/midjourney" /> for image generation, Canva for layouts</li>
              <li><span className="font-bold text-white">Premiere</span> → <ToolLink name="Descript" to="/reviews/descript" /> for video editing</li>
              <li><span className="font-bold text-white">Acrobat</span> → PDF24 free online tool</li>
              <li><span className="font-bold text-white">Stock photos</span> → <ToolLink name="Midjourney" to="/reviews/midjourney" /> entirely</li>
            </ul>

            <div className="my-8">
              <ToolReviewCard 
                name="Midjourney" 
                desc="Best AI tool for image generation" 
                to="/reviews/midjourney" 
                category="Design" 
              />
            </div>

            <div className="w-full rounded-xl overflow-hidden my-8 border border-brand-surface bg-gray-900 flex items-center justify-center" style={{height: '320px'}}>
              <div className="text-center text-gray-600">
                <div className="text-5xl mb-4">🖼</div>
                <p className="font-mono text-sm">
                  [ INSERT IMAGE HERE ]
                </p>
                <p className="font-mono text-xs mt-2 text-gray-700">
                  Recommended: Midjourney interface screenshot or generated image example
                </p>
              </div>
            </div>

            <H3>The 30-Day Timeline</H3>
            <p>
              The first week was uncomfortable. The second week was interesting.
            </p>
            <p>
              By week three something unexpected happened. I started enjoying it.
            </p>
            <p className="font-bold text-white mt-6">
              The experiment proved that the tools don't make the designer.
            </p>
          </motion.div>

          <SectionDivider />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <H2 id="what-surprised-me">WHAT ACTUALLY SURPRISED ME</H2>
            <p>
              Week three. Client presentation. I showed work generated and assembled entirely without Adobe.
            </p>
            <p>
              They loved it more than anything I'd shown them in the previous six months.
            </p>
            <p>
              Not slightly more. Noticeably more. One client asked if I'd hired someone new.
            </p>
            <p>
              I hadn't. I'd just stopped fighting the tools and started using better ones.
            </p>

            <div className="w-full rounded-xl overflow-hidden my-8 border border-brand-surface bg-gray-900 flex items-center justify-center" style={{height: '320px'}}>
              <div className="text-center text-gray-600">
                <div className="text-5xl mb-4">🖼</div>
                <p className="font-mono text-sm">[ INSERT IMAGE HERE ]</p>
                <p className="font-mono text-xs mt-2 text-gray-700">
                  Recommended: side-by-side comparison of stock photo vs Midjourney generation
                </p>
              </div>
            </div>

            <H3>The Midjourney Revelation</H3>
            <p>
              Midjourney in particular caught me off guard. I expected it to produce the kind of generic AI imagery you see everywhere.
            </p>
            <p>
              Instead, with the right prompts, it was producing visuals that felt <span className="font-bold text-white">more considered and original</span> than stock photos ever did.
            </p>
            <p>
              The 30 days ended. I didn't go back.
            </p>
          </motion.div>

          <PullQuote>
            "One client asked if I'd hired someone new. I hadn't. I'd just started using better tools."
          </PullQuote>

          <SectionDivider />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <H2 id="the-honest-part">THE HONEST PART</H2>
            <p>
              Here's what I actually lost and won't pretend I didn't.
            </p>
            
            <div className="w-full rounded-xl overflow-hidden my-8 border border-brand-surface bg-gray-900 flex items-center justify-center" style={{height: '320px'}}>
              <div className="text-center text-gray-600">
                <div className="text-5xl mb-4">🖼</div>
                <p className="font-mono text-sm">[ INSERT IMAGE HERE ]</p>
                <p className="font-mono text-xs mt-2 text-gray-700">
                  Recommended: complex Photoshop layers panel or Illustrator vectors
                </p>
              </div>
            </div>

            <H3>Where Adobe Still Wins</H3>
            <p>
              <span className="font-bold text-white">Photoshop for complex photo retouching</span> — nothing fully replaces it if that's your core service.
            </p>
            <p>
              Midjourney generates, it doesn't retouch. If you're a beauty photographer editing skin at pixel level, keep Photoshop.
            </p>
            <p>
              <span className="font-bold text-white">Illustrator for precise vector work</span> — Canva is not Illustrator.
            </p>
            <p>
              If you're building technical diagrams or complex brand systems from scratch, you'll feel the gap.
            </p>
            <p>
              <span className="font-bold text-white">After Effects</span> — I don't have a good free replacement for motion graphics at a professional level. That's just the truth.
            </p>
            
            <H3>The Final Verdict</H3>
            <p>
              If 80% of your work is client presentations, social media visuals, marketing materials and general creative work — you probably don't need Adobe anymore.
            </p>
            <p>
              If your entire business runs on pixel-level retouching or complex motion work — keep it.
            </p>
            <p className="font-bold text-white mt-6">
              Know exactly which type of designer you are before you cancel.
            </p>
          </motion.div>

          <SectionDivider />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <H2 id="the-numbers">THE NUMBERS</H2>
            
            <BeforeAfter
              before={<>Adobe Creative Cloud — <Money>$55/month</Money></>}
              after={<>Midjourney <Money>$10/mo</Money> + Canva free + Descript free + PDF24 free</>}
              saving="$45/mo"
            />

            <div className="w-full rounded-xl overflow-hidden my-8 border border-brand-surface bg-gray-900 flex items-center justify-center" style={{height: '320px'}}>
              <div className="text-center text-gray-600">
                <div className="text-5xl mb-4">🖼</div>
                <p className="font-mono text-sm">[ INSERT IMAGE HERE ]</p>
                <p className="font-mono text-xs mt-2 text-gray-700">
                  Recommended: chart showing subscription costs over time
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 my-8">
              {[
                { label: 'Monthly saving', value: '$45' },
                { label: 'Annual saving', value: '$540' },
                { label: 'Over 5 years', value: '$2,700' },
              ].map(stat => (
                <div key={stat.label} className="bg-gray-900 border border-gray-800 p-4">
                  <div className="text-2xl font-bold font-mono text-brand-cyan">{stat.value}</div>
                  <div className="text-xs text-gray-500 font-mono mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            <p>
              That's a flight somewhere nice. Or a very good camera.
            </p>
            <p>
              Or just <span className="font-bold text-white"><Money>$2,700</Money> you keep</span> instead of handing it to a software company.
            </p>
            <CalloutTip>
              Calculate your own software ROI. If you use a tool less than 5 times a month, you are overpaying.
            </CalloutTip>
          </motion.div>

          <SectionDivider />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <H2 id="one-more-thing">ONE MORE THING</H2>
            <p>
              The tool I genuinely missed most wasn't Photoshop.
            </p>
            <p>
              It was <span className="font-bold text-white">Bridge</span>. Adobe's file organizer.
            </p>
            <p>
              Boring, unglamorous, never mentioned in any "I quit Adobe" post I've ever read.
            </p>
            
            <div className="w-full rounded-xl overflow-hidden my-8 border border-brand-surface bg-gray-900 flex items-center justify-center" style={{height: '320px'}}>
              <div className="text-center text-gray-600">
                <div className="text-5xl mb-4">🖼</div>
                <p className="font-mono text-sm">[ INSERT IMAGE HERE ]</p>
                <p className="font-mono text-xs mt-2 text-gray-700">
                  Recommended: Adobe Bridge interface screenshot
                </p>
              </div>
            </div>

            <p>
              Turns out I used it constantly without realizing. Still haven't found a perfect replacement.
            </p>
            <p>
              <em>Every honest review has a footnote. That's mine.</em>
            </p>
            <p className="font-bold text-white mt-6">
              You will miss the boring utilities more than the flagship apps.
            </p>
          </motion.div>

          <SectionDivider />

          <div className="w-full rounded-xl overflow-hidden my-8 border border-brand-surface bg-gray-900 flex items-center justify-center" style={{height: '280px'}}>
            <div className="text-center text-gray-600">
              <div className="text-5xl mb-4">🖼</div>
              <p className="font-mono text-sm">
                [ INSERT IMAGE HERE ]
              </p>
              <p className="font-mono text-xs mt-2 text-gray-700">
                Recommended: before/after of your design workflow or tool comparison
              </p>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <H2 id="want-the-full-picture">WANT THE FULL PICTURE?</H2>
            <p>
              If this post made you curious about what else in your software stack has a cheaper AI alternative, I put together a free guide called <span className="font-bold text-white">The AI Tools Starter Kit</span>.
            </p>
            <p>
              5 tools. Real savings numbers. No fluff.
            </p>
            <p>
              It covers everything I actually use day to day — including Midjourney, Claude, Perplexity, Gamma and Notion.
            </p>
            <p>
              It includes free tiers, honest limitations and a 7-day plan to get started without paying for anything upfront.
            </p>
            
            <H3>Key Takeaways</H3>
            <ul className="list-disc pl-6 space-y-2 text-gray-300 my-4">
              <li>You are likely paying for software capacity you don't use.</li>
              <li>AI tools can replace 80% of standard design workflows.</li>
              <li>The emotional cost of switching is higher than the technical cost.</li>
            </ul>

            <div className="mt-8">
              <a href="/" className="inline-flex items-center justify-center px-6 py-3 bg-brand-cyan text-brand-bg font-bold font-inter rounded-lg hover:bg-white transition-colors">
                Download the Free Guide at domskysolutions.com
              </a>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              No email required. No catch. Just the guide.
            </p>
          </motion.div>

          <div className="mt-16 p-6 bg-gray-900 border border-gray-800 text-sm text-gray-400">
            <div className="font-bold font-mono text-white mb-2">ABOUT THIS ARTICLE</div>
            domskysolutions.com reviews AI tools and SaaS software for founders, solopreneurs and builders. We test every tool we recommend and update our reviews regularly as products evolve. Some links in this article are affiliate links — we may earn a commission if you sign up through them at no extra cost to you.
          </div>
        </div>
      </div>

      {/* Related Articles Section */}
      <div className="max-w-5xl mx-auto px-6 mt-24 border-t border-gray-800 pt-16">
        <h2 className="text-2xl font-bold font-mono text-white mb-8">Related Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {BLOG_POSTS.filter(p => p.slug !== "/blog/cancelled-adobe-never-looked-back").slice(0, 2).map(post => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};
```
