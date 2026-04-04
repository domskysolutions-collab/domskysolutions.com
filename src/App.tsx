import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Menu, X, ArrowRight, Star, ExternalLink, 
  PenTool, Palette, Code, Megaphone, Zap, Video, Mic, FlaskConical,
  Twitter, Linkedin, Youtube, CheckCircle2
} from 'lucide-react';

// --- Data ---

const featuredTools = [
  { name: 'Claude 3.5', category: 'Writing', desc: 'Anthropic\'s most capable model yet, excelling at coding and complex reasoning.', rating: 4.9, link: 'https://claude.ai' },
  { name: 'Perplexity', category: 'Research', desc: 'The AI search engine that actually cites its sources. A Google killer.', rating: 4.8, link: 'https://perplexity.ai' },
  { name: 'Notion AI', category: 'Productivity', desc: 'Your workspace, supercharged. Write, brainstorm, and summarize instantly.', rating: 4.7, link: 'https://notion.so' },
  { name: 'Runway Gen-3', category: 'Video', desc: 'High-fidelity, controllable video generation for creative professionals.', rating: 4.8, link: 'https://runwayml.com' },
  { name: 'ElevenLabs', category: 'Audio', desc: 'The undisputed king of AI voice generation and text-to-speech.', rating: 4.9, link: 'https://elevenlabs.io' },
  { name: 'Cursor', category: 'Coding', desc: 'The AI-first code editor that feels like pair programming with a genius.', rating: 5.0, link: 'https://cursor.sh' },
];

const saasReviews = [
  { name: 'Midjourney v6', score: 9.5, bestFor: 'Photorealistic image generation', tag: 'Editor\'s Pick 🏆', link: 'https://midjourney.com' },
  { name: 'Jasper', score: 8.2, bestFor: 'Enterprise marketing teams', tag: 'Best for Teams 👥', link: 'https://jasper.ai' },
  { name: 'Descript', score: 9.0, bestFor: 'Podcast and video editing', tag: 'Best Value 💰', link: 'https://descript.com' },
  { name: 'Framer AI', score: 8.5, bestFor: 'Rapid website prototyping', tag: 'Designers Choice 🎨', link: 'https://framer.com' },
  { name: 'Synthesia', score: 8.8, bestFor: 'AI avatar video creation', tag: 'Top Rated ⭐', link: 'https://synthesia.io' },
];

const newsArticles = [
  { tag: 'News', title: 'OpenAI Drops GPT-5: What Founders Need to Know', date: 'Apr 24, 2026', excerpt: 'The highly anticipated model brings agentic capabilities and massive context windows to the masses.' },
  { tag: 'Research', title: 'Anthropic\'s Claude Gets Memory — Here\'s What Changes', date: 'Apr 22, 2026', excerpt: 'Claude can now remember your preferences across sessions, making it a true personalized assistant.' },
  { tag: 'Launch', title: 'Top 10 AI Tools Replacing Traditional SaaS in 2025', date: 'Apr 20, 2026', excerpt: 'From CRM to design, these AI-native platforms are eating into the market share of legacy software.' },
];

const categories = [
  { name: 'Writing', icon: PenTool },
  { name: 'Design', icon: Palette },
  { name: 'Coding', icon: Code },
  { name: 'Marketing', icon: Megaphone },
  { name: 'Productivity', icon: Zap },
  { name: 'Video', icon: Video },
  { name: 'Audio', icon: Mic },
  { name: 'Research', icon: FlaskConical },
];

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
            <a href="#" className="font-mono text-2xl font-bold tracking-tighter">
              domskysolutions<span className="text-brand-cyan">.com</span>
            </a>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#tools" className="text-gray-300 hover:text-brand-cyan transition-colors text-sm font-medium">Tools</a>
            <a href="#reviews" className="text-gray-300 hover:text-brand-cyan transition-colors text-sm font-medium">SaaS Reviews</a>
            <a href="#news" className="text-gray-300 hover:text-brand-cyan transition-colors text-sm font-medium">AI News</a>
            <a href="#about" className="text-gray-300 hover:text-brand-cyan transition-colors text-sm font-medium">About</a>
            <a href="#newsletter" className="bg-brand-amber text-brand-bg px-5 py-2.5 rounded-none font-bold text-sm hover:bg-yellow-400 transition-colors glow-amber-hover flex items-center gap-2">
              Get Free Newsletter
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
      {isOpen && (
        <div className="md:hidden bg-brand-surface border-b border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#tools" className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-brand-cyan">Tools</a>
            <a href="#reviews" className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-brand-cyan">SaaS Reviews</a>
            <a href="#news" className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-brand-cyan">AI News</a>
            <a href="#newsletter" className="block px-3 py-2 text-base font-medium text-brand-amber">Get Free Newsletter</a>
          </div>
        </div>
      )}
    </nav>
  );
};

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
          <a href="#" className="hidden md:flex items-center gap-2 text-brand-cyan hover:underline font-mono text-sm">
            View All Tools <ArrowRight size={16} />
          </a>
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
              <a href={tool.link} className="inline-flex items-center gap-2 text-sm font-bold text-white group-hover:text-brand-cyan transition-colors mt-auto">
                Try It <ExternalLink size={16} />
              </a>
            </motion.div>
          ))}
        </div>
        <div className="mt-8 text-center md:hidden">
          <a href="#" className="inline-flex items-center gap-2 text-brand-cyan hover:underline font-mono text-sm">
            View All Tools <ArrowRight size={16} />
          </a>
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
              <a href={review.link} className="inline-flex items-center gap-2 text-sm font-bold text-brand-cyan hover:text-white transition-colors">
                Read Review <ArrowRight size={16} />
              </a>
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
          <a href="#" className="hidden md:flex items-center gap-2 text-brand-cyan hover:underline font-mono text-sm">
            All News <ArrowRight size={16} />
          </a>
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
              <motion.a
                href="#"
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="flex flex-col items-center justify-center p-6 bg-brand-bg border border-gray-800 hover:border-brand-cyan hover:bg-brand-cyan/5 transition-all group"
              >
                <Icon size={32} className="text-gray-500 mb-4 group-hover:text-brand-cyan transition-colors" />
                <span className="font-mono text-sm font-bold group-hover:text-brand-cyan transition-colors">{cat.name}</span>
              </motion.a>
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
          
          <form className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto mb-6" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Enter your email address..." 
              className="flex-grow bg-brand-surface border border-gray-700 px-6 py-4 text-white focus:outline-none focus:border-brand-cyan transition-colors font-mono text-sm"
              required
            />
            <button 
              type="submit" 
              className="bg-brand-amber text-brand-bg px-8 py-4 font-bold hover:bg-yellow-400 transition-colors glow-amber-hover whitespace-nowrap"
            >
              Subscribe Free
            </button>
          </form>
          
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

const Footer = () => {
  return (
    <footer className="bg-[#08090a] pt-20 pb-10 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          <div className="lg:col-span-2">
            <a href="#" className="font-mono text-2xl font-bold tracking-tighter block mb-4">
              domskysolutions<span className="text-brand-cyan">.com</span>
            </a>
            <p className="text-gray-400 text-sm mb-6 max-w-sm">
              Your Edge in the AI Era. We curate the best AI tools, software reviews, and news for builders and founders.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-500 hover:text-brand-cyan transition-colors"><Twitter size={20} /></a>
              <a href="#" className="text-gray-500 hover:text-brand-cyan transition-colors"><Linkedin size={20} /></a>
              <a href="#" className="text-gray-500 hover:text-brand-cyan transition-colors"><Youtube size={20} /></a>
            </div>
          </div>
          
          <div>
            <h4 className="font-mono font-bold text-white mb-4">Tools</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-brand-cyan transition-colors">Writing AI</a></li>
              <li><a href="#" className="hover:text-brand-cyan transition-colors">Coding Assistants</a></li>
              <li><a href="#" className="hover:text-brand-cyan transition-colors">Image Generators</a></li>
              <li><a href="#" className="hover:text-brand-cyan transition-colors">Video Creation</a></li>
              <li><a href="#" className="hover:text-brand-cyan transition-colors">Productivity</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-mono font-bold text-white mb-4">Reviews</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-brand-cyan transition-colors">Top SaaS 2025</a></li>
              <li><a href="#" className="hover:text-brand-cyan transition-colors">ChatGPT vs Claude</a></li>
              <li><a href="#" className="hover:text-brand-cyan transition-colors">Best AI Video Tools</a></li>
              <li><a href="#" className="hover:text-brand-cyan transition-colors">Marketing AI Stack</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-mono font-bold text-white mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#about" className="hover:text-brand-cyan transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-brand-cyan transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-brand-cyan transition-colors">Advertise</a></li>
              <li><a href="#" className="hover:text-brand-cyan transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-brand-cyan transition-colors">Terms of Service</a></li>
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

export default function App() {
  return (
    <div className="min-h-screen selection:bg-brand-cyan selection:text-brand-bg">
      <Navbar />
      <main>
        <Hero />
        <FeaturedTools />
        <SaasReviews />
        <CategoryExplorer />
        <AiNews />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}

