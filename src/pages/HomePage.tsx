
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
            <a
              href="https://x.com/domskysolutions"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-gray-500 text-sm hover:text-brand-cyan transition-colors duration-200 font-mono"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.213 5.567L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>
              </svg>
              Follow @domskysolutions on X
            </a>
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
