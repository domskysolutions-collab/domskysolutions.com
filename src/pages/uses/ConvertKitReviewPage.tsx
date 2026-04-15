import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'motion/react';
import { CheckCircle2, ArrowRight, Star, XCircle, Check, ChevronRight } from 'lucide-react';

export const ConvertKitReviewPage = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    document.title = "ConvertKit Review | Tools We Use | domskysolutions.com";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-brand-bg min-h-screen">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-brand-cyan origin-left z-50"
        style={{ scaleX }}
      />

      <div className="pt-32 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen">
        <div className="text-gray-500 font-mono text-sm mb-8 flex items-center gap-2 flex-wrap">
          <Link to="/uses" className="hover:text-brand-cyan transition-colors">Tools We Use</Link>
          <ChevronRight size={14} className="text-gray-600" />
          <span className="text-gray-300">ConvertKit</span>
        </div>

        <div className="bg-brand-surface border border-gray-800 p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-cyan to-blue-500"></div>

          {/* HERO */}
          <div className="mb-12">
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="px-3 py-1 bg-gray-800 text-gray-300 text-xs font-mono uppercase tracking-wider">
                EMAIL MARKETING
              </span>
              <span className="px-3 py-1 bg-brand-amber/10 border border-brand-amber/20 text-brand-amber text-xs font-mono font-bold tracking-wide">
                WE USE THIS
              </span>
              <div className="flex items-center gap-1 text-brand-amber text-xs font-mono uppercase tracking-wider">
                <Star size={16} fill="currentColor" /> 4.6/5
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold font-mono text-white mb-6 leading-tight">
              ConvertKit Review 2026: The Best Email Platform for Creators?
            </h1>

            <div className="prose prose-invert max-w-none mb-10">
              <p className="text-gray-300 text-lg leading-relaxed mb-4">
                ConvertKit is an email marketing platform built specifically for creators — newsletter writers, bloggers, educators, podcasters, and solopreneurs who want to grow an audience and monetize it over time.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed mb-4">
                Instead of trying to be a “marketing suite for everyone,” it focuses on the workflows creators actually use: simple forms and landing pages, subscriber tagging, automations, and broadcasts that are fast to write and send.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed mb-0">
                In this review we’re focusing on what matters day-to-day: setup speed, segmentation, automations, deliverability basics (domain authentication), and whether the pricing makes sense as your list grows.
              </p>
            </div>

            <div className="mb-10 border border-gray-800 overflow-hidden bg-brand-bg">
              <img
                src="/images/screenshots/convertkit-dashboard.jpg"
                alt="ConvertKit dashboard screenshot"
                className="w-full h-auto block"
                loading="lazy"
              />
            </div>

            <div className="bg-[#1a1a2e] border-l-4 border-brand-cyan p-6">
              <div className="font-mono font-bold text-brand-cyan text-sm uppercase mb-2">Quick Verdict</div>
              <div className="text-xl font-bold text-white mb-4">4.6/5 — Recommended</div>
              <div className="flex flex-wrap gap-3">
                <span className="bg-brand-bg px-3 py-1 text-sm text-gray-300 rounded-full flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-brand-cyan" /> Creator-first UX
                </span>
                <span className="bg-brand-bg px-3 py-1 text-sm text-gray-300 rounded-full flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-brand-cyan" /> Strong automations
                </span>
                <span className="bg-brand-bg px-3 py-1 text-sm text-gray-300 rounded-full flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-brand-cyan" /> Solid deliverability tools
                </span>
              </div>
            </div>
          </div>

          <div className="border-l-4 border-brand-cyan bg-gray-800/30 p-8 my-12 italic text-lg text-gray-200">
            Getting from zero to a working signup form that automatically delivers a lead magnet took us under an hour — even with no email marketing experience.
          </div>

        {/* KEY FEATURES */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold font-mono mb-6 text-white border-b border-gray-800 pb-2">
            Key Features
          </h2>
          
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: "📧", title: "Free up to 10,000 subscribers", desc: "Unlimited email sends included" },
              { icon: "🤖", title: "Visual Automation Builder", desc: "Create sequences without coding" },
              { icon: "🏪", title: "Built-in Commerce", desc: "Sell digital products directly" },
              { icon: "🌐", title: "Creator Network", desc: "Grow your list organically" },
              { icon: "🏷️", title: "Subscriber Tagging", desc: "Segment your audience precisely" },
              { icon: "📊", title: "Broadcast Analytics", desc: "Track opens, clicks and growth" },
              { icon: "🔗", title: "90+ Integrations", desc: "Connects with your existing tools" },
              { icon: "🔒", title: "Custom Domain Sending", desc: "Send from your own domain" }
            ].map((feature, i) => (
              <div key={i} className="bg-brand-bg border border-gray-800 p-5 hover:border-brand-cyan transition-colors">
                <div className="flex items-start gap-3">
                  <div className="text-xl mt-0.5">{feature.icon}</div>
                  <div>
                    <div className="font-bold text-white text-base mb-1">{feature.title}</div>
                    <div className="text-gray-400 text-sm">{feature.desc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

          <div className="my-10 border border-gray-800 overflow-hidden bg-brand-bg">
            <img
              src="/images/screenshots/convertkit-form-builder.jpg"
              alt="ConvertKit form builder screenshot"
              className="w-full h-auto block"
              loading="lazy"
            />
          </div>

        {/* PROS AND CONS */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold font-mono mb-6 text-white border-b border-gray-800 pb-2">
            Pros & Cons
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-900/10 border border-green-900/30 p-6">
              <h3 className="text-xl font-bold font-mono mb-4 text-green-400">Pros</h3>
              <ul className="space-y-4">
                {[
                  { bold: "Generous", text: "free plan — 10,000 subscribers before paying anything" },
                  { bold: "Built", text: "for creators not enterprises — the product makes sense immediately" },
                  { bold: "Powerful", text: "subscriber tagging for segmenting your audience over time" },
                  { bold: "Intuitive", text: "visual automation builder — no technical knowledge needed" },
                  { bold: "Excellent", text: "deliverability — emails reach inbox not spam" }
                ].map((p, i) => (
                  <li key={i} className="text-gray-300 flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-green-500 shrink-0 mt-1" />
                    <span><strong className="text-white">{p.bold}</strong> {p.text}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-red-900/10 border border-red-900/30 p-6">
              <h3 className="text-xl font-bold font-mono mb-4 text-red-400">Cons</h3>
              <ul className="space-y-4">
                {[
                  { bold: "Limited", text: "email editor design flexibility compared to some competitors" },
                  { bold: "Basic", text: "reporting and analytics on lower tier plans" },
                  { bold: "Steep", text: "price increases after you pass the free tier limits" },
                  { bold: "Restricted", text: "A/B testing capabilities on the standard Creator plan" },
                  { default: "New accounts default to double opt-in which can confuse early testing" }
                ].map((c, i) => (
                  <li key={i} className="text-gray-300 flex items-start gap-3">
                    <XCircle size={18} className="text-red-500 shrink-0 mt-1" />
                    <span>{c.bold ? <><strong className="text-white">{c.bold}</strong> {c.text}</> : c.default}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* OUR HONEST EXPERIENCE */}
        <div className="bg-brand-bg border border-gray-800 p-8 mb-16">
          <div className="font-mono font-bold text-brand-amber text-sm uppercase mb-6 tracking-wider">
            OUR ACTUAL EXPERIENCE
          </div>

          <h3 className="font-bold text-white text-xl mb-3">The Setup</h3>
          <p className="text-gray-300 mb-6">
            Setup took us roughly <strong>45 minutes</strong> from zero — creating an account, building our first form, connecting it to our site via API, and setting up the welcome email that delivers our free PDF guide to new subscribers.
          </p>

          <h3 className="font-bold text-white text-xl mb-3">Domain Authentication</h3>
          <p className="text-gray-300 mb-6">
            The domain authentication process — setting up DKIM, SPF, and DMARC records through Cloudflare — took longer than expected, around <strong>two hours</strong> working through DNS settings. Once completed our emails consistently reach the inbox rather than spam folders, which is the whole point.
          </p>

          <h3 className="font-bold text-white text-xl mb-3">The Double Opt-In Surprise</h3>
          <p className="text-gray-300 mb-6">
            The one thing that caught us early: new accounts default to double opt-in confirmation. Subscribers need to click a confirmation email before they appear in your list. This is good for list quality but caused confusion when we first tested the form and subscribers were not appearing immediately. Once we understood what was happening it was straightforward to manage.
          </p>

          <h3 className="font-bold text-white text-xl mb-3">After 3 Months of Use</h3>
          <p className="text-gray-300 mb-6">
            The free plan handles everything a new newsletter needs. We have been building domskysolutions.com on it since day one and it has not limited us in any meaningful way. We rely on it <strong>every Thursday</strong>.
          </p>

          <div className="bg-brand-amber/10 border border-brand-amber/20 p-5 rounded-md mt-8">
            <div className="font-bold text-brand-amber mb-2 flex items-center gap-2">
              <span>Pro tip from our experience</span>
            </div>
            <div className="text-brand-amber/90 text-base">
              Set up your custom domain authentication before sending your first broadcast. It takes a bit of technical wrangling in your DNS settings, but it's the single most important thing you can do for your deliverability.
            </div>
          </div>
        </div>

          <div className="my-10 border border-gray-800 overflow-hidden bg-brand-bg">
            <img
              src="/images/screenshots/convertkit-email-preview.jpg"
              alt="ConvertKit email preview screenshot"
              className="w-full h-auto block"
              loading="lazy"
            />
          </div>

        {/* PRICING */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold font-mono mb-6 text-white border-b border-gray-800 pb-2">
            Pricing
          </h2>
          
          <div className="grid md:grid-cols-3 gap-4">
            {/* Free */}
            <div className="bg-brand-bg border-t-4 border-gray-600 border-x border-b border-gray-800 p-6 flex flex-col">
              <div className="text-xs font-bold text-gray-400 tracking-wider mb-4">START HERE</div>
              <div className="text-3xl font-bold text-white mb-6">$0<span className="text-lg text-gray-500 font-normal">/mo</span></div>
              <ul className="space-y-3 mb-8 flex-grow text-sm text-gray-300">
                <li className="flex items-start gap-2"><Check size={16} className="text-gray-500 shrink-0 mt-0.5" /> Up to 10,000 subscribers</li>
                <li className="flex items-start gap-2"><Check size={16} className="text-gray-500 shrink-0 mt-0.5" /> Unlimited broadcasts</li>
                <li className="flex items-start gap-2"><Check size={16} className="text-gray-500 shrink-0 mt-0.5" /> Forms & landing pages</li>
                <li className="flex items-start gap-2"><Check size={16} className="text-gray-500 shrink-0 mt-0.5" /> Basic automations</li>
              </ul>
              <a href="https://convertkit.com" target="_blank" rel="noopener noreferrer" className="block w-full text-center py-2 px-4 border border-gray-600 text-gray-300 hover:bg-gray-800 transition-colors font-bold rounded-sm">
                Start Free
              </a>
            </div>

            {/* Creator */}
            <div className="bg-[#1a1a2e] border-t-4 border-brand-cyan border-x border-b border-gray-800 p-6 flex flex-col relative transform md:-translate-y-2 shadow-xl">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-amber text-brand-bg text-[10px] font-bold px-3 py-1 rounded-full whitespace-nowrap">
                MOST POPULAR
              </div>
              <div className="text-xs font-bold text-brand-cyan tracking-wider mb-4 mt-2">CREATOR</div>
              <div className="text-3xl font-bold text-brand-cyan mb-6">$25<span className="text-lg text-brand-cyan/60 font-normal">/mo</span></div>
              <ul className="space-y-3 mb-8 flex-grow text-sm text-gray-300">
                <li className="flex items-start gap-2"><Check size={16} className="text-brand-cyan shrink-0 mt-0.5" /> Everything in Free</li>
                <li className="flex items-start gap-2"><Check size={16} className="text-brand-cyan shrink-0 mt-0.5" /> Advanced automations</li>
                <li className="flex items-start gap-2"><Check size={16} className="text-brand-cyan shrink-0 mt-0.5" /> Visual builder</li>
                <li className="flex items-start gap-2"><Check size={16} className="text-brand-cyan shrink-0 mt-0.5" /> 3rd party integrations</li>
              </ul>
              <a href="https://convertkit.com" target="_blank" rel="noopener noreferrer" className="block w-full text-center py-2 px-4 bg-brand-cyan text-brand-bg hover:bg-teal-400 transition-colors font-bold rounded-sm">
                Try Creator
              </a>
            </div>

            {/* Creator Pro */}
            <div className="bg-brand-bg border-t-4 border-brand-amber border-x border-b border-gray-800 p-6 flex flex-col">
              <div className="text-xs font-bold text-brand-amber tracking-wider mb-4">POWER USERS</div>
              <div className="text-3xl font-bold text-brand-amber mb-6">$50<span className="text-lg text-brand-amber/60 font-normal">/mo</span></div>
              <ul className="space-y-3 mb-8 flex-grow text-sm text-gray-300">
                <li className="flex items-start gap-2"><Check size={16} className="text-brand-amber shrink-0 mt-0.5" /> Everything in Creator</li>
                <li className="flex items-start gap-2"><Check size={16} className="text-brand-amber shrink-0 mt-0.5" /> Advanced reporting</li>
                <li className="flex items-start gap-2"><Check size={16} className="text-brand-amber shrink-0 mt-0.5" /> Subscriber scoring</li>
                <li className="flex items-start gap-2"><Check size={16} className="text-brand-amber shrink-0 mt-0.5" /> Referral system</li>
              </ul>
              <a href="https://convertkit.com" target="_blank" rel="noopener noreferrer" className="block w-full text-center py-2 px-4 border border-brand-amber text-brand-amber hover:bg-brand-amber/10 transition-colors font-bold rounded-sm">
                Try Pro
              </a>
            </div>
          </div>
        </div>

          <div className="my-10 border border-gray-800 overflow-hidden bg-brand-bg">
            <img
              src="/images/screenshots/convertkit-automation.jpg"
              alt="ConvertKit automation builder screenshot"
              className="w-full h-auto block"
              loading="lazy"
            />
          </div>

          <div className="text-gray-300 space-y-6 mb-16">
            <h3 className="text-xl font-bold font-mono text-white">Who is it best for?</h3>
          <p>
            ConvertKit is the right choice for bloggers, newsletter operators, podcasters, course creators, and anyone building an audience around expertise or content. If your primary goal is growing and eventually monetising an email list — rather than running complex e-commerce campaigns — ConvertKit was built specifically for your situation.
          </p>
          <p>
            If you need deep e-commerce integration, complex HTML email templates, or enterprise-level reporting — Klaviyo or ActiveCampaign may serve you better. For everyone else in the creator and solopreneur space ConvertKit is our recommendation.
          </p>
          </div>

        {/* VERDICT SECTION */}
          <div className="bg-brand-bg border border-gray-800 p-8 text-center mb-12">
            <h3 className="text-2xl font-bold font-mono mb-6 text-white">Final Verdict</h3>
            <div className="text-gray-300 text-lg italic leading-relaxed mb-6">
              <p className="mb-4 last:mb-0">
                ConvertKit is the email platform we recommend for creators who want a clean, focused product that makes forms, tagging, and automations easy — without turning every send into a complicated campaign build.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4 mt-6 pt-6 border-t border-gray-800">
              <div className="text-sm">
                <span className="text-gray-500 font-mono">Score:</span> <span className="text-brand-amber font-bold">4.6/5</span>
              </div>
              <div className="text-sm">
                <span className="text-gray-500 font-mono">Best For:</span> <span className="text-brand-cyan">Creators & newsletters</span>
              </div>
              <div className="text-sm">
                <span className="text-gray-500 font-mono">Pricing:</span> <span className="text-brand-amber">Free / $25 / $50</span>
              </div>
            </div>
          </div>

        {/* BOTTOM CTA SECTION */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <a
              href="https://convertkit.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-brand-cyan text-brand-bg px-8 py-4 font-bold text-lg hover:bg-teal-400 transition-all glow-cyan flex items-center justify-center gap-2"
            >
              Try ConvertKit Free →
            </a>
            <Link
              to="/uses"
              className="w-full sm:w-auto bg-transparent border border-gray-600 text-white px-8 py-4 font-bold text-lg hover:border-white hover:bg-brand-surface transition-all flex items-center justify-center gap-2"
            >
              <ArrowRight className="rotate-180" size={20} /> Back to Tools We Use
            </Link>
          </div>
        
          <p className="text-gray-500 text-sm text-center mt-6">
            Affiliate disclosure: This link is an affiliate link. We may earn a commission if you sign up — at no extra cost to you. We only recommend tools we actually use.
          </p>
        </div>
      </div>
    </div>
  );
};
