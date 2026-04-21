
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

        <div className="w-full rounded-xl overflow-hidden mb-12 border border-brand-surface shadow-2xl">
          <img
            src="/images/adobe-article.jpg"
            alt="After 12 Years I Cancelled Adobe — $65/mo saved"
            style={{
              width: '100%',
              height: '400px',
              objectFit: 'cover',
              objectPosition: 'center',
              borderRadius: '12px',
            }}
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

            <figure className="my-8">
              <img
                src="/images/screenshots/adobe-pricing.jpg"
                alt="Adobe Creative Cloud pricing — $65/month for tools I barely used"
                className="w-full rounded-xl border border-brand-surface bg-gray-900"
              />
              <figcaption className="mt-3 text-sm text-gray-500 font-inter">
                Adobe Creative Cloud pricing — $65/month for tools I barely used
              </figcaption>
            </figure>

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

            <figure className="my-8">
              <img
                src="/images/screenshots/adobe-account.jpg"
                alt="The cancellation screen — one of the best clicks I ever made"
                className="w-full rounded-xl border border-brand-surface bg-gray-900"
              />
              <figcaption className="mt-3 text-sm text-gray-500 font-inter">
                The cancellation screen — one of the best clicks I ever made
              </figcaption>
            </figure>

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

            <figure className="my-8">
              <img
                src="/images/screenshots/midjourney-results.jpg"
                alt="Midjourney results — what replaced a $65/month subscription"
                className="w-full rounded-xl border border-brand-surface bg-gray-900"
              />
              <figcaption className="mt-3 text-sm text-gray-500 font-inter">
                Midjourney results — what replaced a $65/month subscription
              </figcaption>
            </figure>

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

            <div className="my-10 rounded-xl overflow-hidden border border-gray-800 shadow-2xl">
              <img
                src="/images/screenshots/stock-vs-midjourney.jpg"
                alt="Stock photos vs Midjourney AI comparison"
                className="w-full object-cover"
                style={{ borderRadius: '12px' }}
              />
              <p className="text-gray-500 text-sm font-mono text-center py-3 bg-brand-surface">
                Why I stopped paying for stock photos and switched to AI
              </p>
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
            
            <div className="my-10 rounded-xl overflow-hidden border border-gray-800 shadow-2xl">
              <img
                src="/images/screenshots/photoshop-interface.jpg"
                alt="The complexity of old design software"
                className="w-full object-cover"
                style={{ borderRadius: '12px' }}
              />
              <p className="text-gray-500 text-sm font-mono text-center py-3 bg-brand-surface">
                The old way — complicated, expensive, and time consuming
              </p>
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

            <figure className="my-8">
              <img
                src="/images/screenshots/adobe-vs-midjourney-cost.jpg"
                alt="The cost comparison — $65/mo vs $10/mo for better results"
                className="w-full rounded-xl border border-brand-surface bg-gray-900"
              />
              <figcaption className="mt-3 text-sm text-gray-500 font-inter">
                The cost comparison — $65/mo vs $10/mo for better results
              </figcaption>
            </figure>

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
            
            <div className="my-10 rounded-xl overflow-hidden border border-gray-800 shadow-2xl">
              <img
                src="/images/screenshots/adobe-bridge.jpg"
                alt="The hidden cost of legacy software"
                className="w-full object-cover"
                style={{ borderRadius: '12px' }}
              />
              <p className="text-gray-500 text-sm font-mono text-center py-3 bg-brand-surface">
                What nobody tells you about expensive software subscriptions
              </p>
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

          <div className="my-10 rounded-xl overflow-hidden border border-gray-800 shadow-2xl">
            <img
              src="/images/screenshots/workflow-comparison.jpg"
              alt="My workflow before and after"
              className="w-full object-cover"
              style={{ borderRadius: '12px' }}
            />
            <p className="text-gray-500 text-sm font-mono text-center py-3 bg-brand-surface">
              From $85/month complicated to $10/month simple
            </p>
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