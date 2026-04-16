
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
            Hi — I'm Dominik, also known as Domsky. I test AI tools so you do not have to.
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
              <div className="text-white font-bold text-lg">Dominik — "Domsky"</div>
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
            <p>
              You might know me as Domsky — it is the name I use online and the brand behind this site. It is short, memorable, and has followed me through 25 years of tech communities, design forums, and gaming circles.
            </p>
            <p>
              domskysolutions.com is the professional home for everything I have learned about AI tools, software, and building things on the internet.
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
            <p className="text-gray-400">
              I read every message personally.
            </p>
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
              Review requests welcome — send me access and I will add it to the queue. I publish what I actually find — positive, negative, or mixed.
            </p>
          </motion.div>

          <div className="mt-24 mb-12 text-center not-prose">
            <p className="text-2xl md:text-3xl font-mono text-white font-bold leading-relaxed mb-12">
              Built by Dominik — known as Domsky.<br />
              Tested on real work.<br />
              No team. No investors. Just honest reviews.
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
                Joining is free. Unsubscribing is one click. I do not send spam.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
