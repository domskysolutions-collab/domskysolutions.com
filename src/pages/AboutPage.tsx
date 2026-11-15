
import { BLOG_POSTS } from '../data/blogPosts';
import { reviewCount } from '../data/reviewCatalog';
import React, { useEffect } from 'react';
import { useScroll } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';
import { H2, SectionDivider } from '../components/ui';
import { motion } from 'motion/react';
import { ConvertKitForm } from '../components/ConvertKitForm';
import { AUTHOR_NAME } from '../data/site';

export const AboutPage = () => {
  const { scrollYProgress } = useScroll();
  return (
    <div className="bg-brand-bg min-h-screen text-secondary font-sans pb-24">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-action origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />
      
      <div className="max-w-[680px] mx-auto px-6 pt-32">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold font-mono text-ink leading-tight mb-6">
            "A Designer’s Perspective.<br />No Hype. Just What Works."
          </h1>
          <p className="text-xl text-secondary">
            Hi — I'm {AUTHOR_NAME}, also known as Domsky. I publish documented software research for solo builders.
          </p>

          <div className="flex items-center gap-6 my-12 p-6 bg-brand-surface border border-line rounded-xl hover:border-brand-cyan transition-all duration-300">
            <div>
              <div className="text-ink font-bold text-lg font-inter">{AUTHOR_NAME}</div>
              <div className="text-link text-sm font-mono mt-0.5">Graphic & Web Designer</div>
              <div className="text-subtle text-xs mt-1.5 font-inter">
                Designer · PC enthusiast · AI tools reviewer
              </div>
              <a
                href="https://x.com/domskysolutions"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-line text-secondary text-sm font-mono hover:border-brand-cyan hover:text-link transition-all duration-200 mt-4"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.213 5.567L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>
                </svg>
                @domskysolutions
              </a>
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
              My background spans graphic design, gaming, web building and a long-running curiosity about technology. This site applies that perspective to software research for solo businesses.
            </p>
            <p>
              I started this site because software coverage often hides evidence limits, tradeoffs and commercial relationships. Domsky Solutions makes those limits visible.
            </p>
            <p>
              You might know me as Domsky — the name I use online and the brand behind this site.
            </p>
            <p>
              domskysolutions.com is the professional home for everything I have learned about AI tools, software, and building things on the internet.
            </p>
            <p className="font-bold text-ink">
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
              <div className="bg-surface border-l-[3px] border-l-brand-cyan p-6 rounded-r-xl">
                <div className="text-3xl text-emphasis mb-4">🎨</div>
                <h3 className="font-bold text-ink mb-2 text-lg">Graphic & Web Designer</h3>
                <p className="text-sm text-secondary m-0 leading-relaxed">Professional eye for UI, aesthetics and what makes design actually work.</p>
              </div>
              <div className="bg-surface border-l-[3px] border-l-brand-cyan p-6 rounded-r-xl">
                <div className="text-3xl text-emphasis mb-4">🎮</div>
                <h3 className="font-bold text-ink mb-2 text-lg">Gamer & PC Builder</h3>
                <p className="text-sm text-secondary m-0 leading-relaxed">An interest in complex systems informs how I explain software workflows and tradeoffs.</p>
              </div>
              <div className="bg-surface border-l-[3px] border-l-brand-cyan p-6 rounded-r-xl">
                <div className="text-3xl text-emphasis mb-4">💻</div>
                <h3 className="font-bold text-ink mb-2 text-lg">Self-Taught Coder</h3>
                <p className="text-sm text-secondary m-0 leading-relaxed">Enough to build real things and know when AI coding tools are helping vs hallucinating.</p>
              </div>
              <div className="bg-surface border-l-[3px] border-l-brand-cyan p-6 rounded-r-xl">
                <div className="text-3xl text-emphasis mb-4">🔍</div>
                <h3 className="font-bold text-ink mb-2 text-lg">Software Researcher</h3>
                <p className="text-sm text-secondary m-0 leading-relaxed">Editorial opinions with evidence disclosures and practical limitations.</p>
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
                <CheckCircle2 size={32} className="text-link flex-shrink-0 mt-1" />
                <div>
                  <p className="font-bold text-ink text-lg m-0">I distinguish documented testing from vendor documentation and editorial assessment.</p>
                  <p className="text-secondary text-[15px] mt-1 mb-0">If a dated testing record is missing, I do not present personal use as established fact.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <CheckCircle2 size={32} className="text-link flex-shrink-0 mt-1" />
                <div>
                  <p className="font-bold text-ink text-lg m-0">I publish material limitations alongside strengths.</p>
                  <p className="text-secondary text-[15px] mt-1 mb-0">A recommendation is bounded to a stated use case.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <CheckCircle2 size={32} className="text-link flex-shrink-0 mt-1" />
                <div>
                  <p className="font-bold text-ink text-lg m-0">Commercial links are disclosed before the first compensated link.</p>
                  <p className="text-secondary text-[15px] mt-1 mb-0">Official evidence links remain direct and non-affiliate.</p>
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
              <div className="bg-brand-surface border border-line p-6 rounded-lg text-center">
                <div className="text-4xl md:text-5xl font-bold font-mono text-link mb-2">{reviewCount}</div>
                <div className="text-sm text-secondary">Tools Reviewed</div>
              </div>
              <div className="bg-brand-surface border border-line p-6 rounded-lg text-center">
                <div className="text-4xl md:text-5xl font-bold font-mono text-link mb-2">{BLOG_POSTS.length}</div>
                <div className="text-sm text-secondary">Blog Posts</div>
              </div>
              <div className="bg-brand-surface border border-line p-6 rounded-lg text-center">
                <div className="text-xl font-bold font-mono text-link mb-2">Personal</div>
                <div className="text-sm text-secondary">Perspective</div>
              </div>
              <div className="bg-brand-surface border border-line p-6 rounded-lg text-center">
                <div className="text-xl font-bold font-mono text-link mb-2">Named</div>
                <div className="text-sm text-secondary">Author Identity</div>
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
              <div className="bg-brand-surface border-t-[3px] border-t-brand-amber border-x border-b border-line p-6 rounded-b-xl">
                <div className="text-3xl text-link mb-4">🔬</div>
                <h3 className="font-bold text-ink mb-2 text-lg">AI Tool Reviews</h3>
                <p className="text-sm text-secondary m-0 leading-relaxed">Evidence scope, use cases and limitations explained clearly.</p>
              </div>
              <div className="bg-brand-surface border-t-[3px] border-t-brand-amber border-x border-b border-line p-6 rounded-b-xl">
                <div className="text-3xl text-link mb-4">⚖️</div>
                <h3 className="font-bold text-ink mb-2 text-lg">SaaS Comparisons</h3>
                <p className="text-sm text-secondary m-0 leading-relaxed">Head to head. Who wins for your use case.</p>
              </div>
              <div className="bg-brand-surface border-t-[3px] border-t-brand-amber border-x border-b border-line p-6 rounded-b-xl">
                <div className="text-3xl text-link mb-4">📧</div>
                <h3 className="font-bold text-ink mb-2 text-lg">The Weekly Edge</h3>
                <p className="text-sm text-secondary m-0 leading-relaxed">Free Thursday newsletter. One tool. One tip. No spam ever.</p>
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
            <div className="bg-brand-surface border-l-4 border-l-brand-amber border-y border-r border-line p-6 rounded-r-lg my-8">
              <p className="m-0 text-secondary">
                AI tools may assist with drafting and production. I remain responsible for the published editorial judgment, and product claims must be supported by cited sources or a dated testing record. AI assistance is not evidence that a product was personally tested.
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
            <p className="text-secondary">
              I read every message personally.
            </p>
            <div className="my-8 not-prose flex flex-wrap items-center gap-2">
              <span className="text-secondary">Contact:</span>
              <a href="mailto:domskysolutions@gmail.com" className="text-link hover:underline break-all">domskysolutions@gmail.com</a>
            </div>
            <p className="text-secondary">
              Review requests are welcome. Supplied access and commercial relationships must be disclosed, and they do not guarantee coverage or a favorable conclusion.
            </p>
          </motion.div>

          <div className="mt-24 mb-12 text-center not-prose">
            <p className="text-2xl md:text-3xl font-mono text-ink font-bold leading-relaxed mb-12">
              Built by {AUTHOR_NAME} — known as Domsky.<br />
              Evidence and limitations disclosed.<br />
              Independent editorial responsibility.
            </p>
            
            <div className="relative z-10 bg-brand-bg border border-brand-cyan p-8 rounded-xl text-center max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold font-mono text-ink mb-4">GET THE WEEKLY EDGE</h2>
              <p className="text-secondary mb-6">
                The best way to stay connected is the weekly newsletter — <span className="font-bold text-ink">The Weekly Edge</span>.
              </p>
              
              <ConvertKitForm 
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                inputClassName="flex-1 bg-brand-bg border border-line px-4 py-3 rounded text-ink focus:outline-none focus:border-brand-cyan transition-colors"
                buttonClassName="bg-action text-ink px-6 py-3 rounded font-bold hover:bg-action-hover transition-colors  whitespace-nowrap"
                buttonText="Get the Weekly Edge"
                placeholder="Enter your email"
              />
              <p className="text-xs text-subtle mt-4">
                Joining is free. Unsubscribing is one click. I do not send spam.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};


