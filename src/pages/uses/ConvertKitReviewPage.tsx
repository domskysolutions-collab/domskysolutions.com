import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'motion/react';
import { CheckCircle2, ArrowRight, Star, ExternalLink, XCircle, Check } from 'lucide-react';

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
    <div className="bg-brand-bg min-h-screen pt-32 pb-24 font-['Lora',serif] text-[18px] leading-[1.9]">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-brand-cyan origin-left z-50"
        style={{ scaleX }}
      />

      <div className="max-w-[680px] mx-auto px-4 sm:px-6">
        {/* HERO SECTION */}
        <div className="mb-12">
          <div className="text-gray-500 font-mono text-sm mb-6">
            <Link to="/uses" className="hover:text-brand-cyan transition-colors">Tools We Use</Link> → ConvertKit Review
          </div>

          <div className="flex flex-wrap gap-3 mb-6">
            <span className="px-3 py-1 bg-gray-800 text-gray-300 text-xs font-mono uppercase tracking-wider">
              EMAIL MARKETING
            </span>
            <span className="px-3 py-1 bg-brand-amber/10 border border-brand-amber/20 text-brand-amber text-xs font-mono font-bold tracking-wide">
              ⭐ WE USE THIS
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold font-sans text-white mb-6 leading-tight">
            ConvertKit Review 2026: The Best Email Platform for Creators?
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm font-mono text-gray-400 mb-10 pb-6 border-b border-gray-800">
            <div className="flex items-center gap-1 text-brand-amber">
              <Star size={16} fill="currentColor" /> 4.6/5
            </div>
            <span>|</span>
            <span>Email Marketing</span>
            <span>|</span>
            <span>Updated: April 2026</span>
            <span>|</span>
            <span>8 min read</span>
          </div>

          {/* SCREENSHOT 1 — ConvertKit dashboard
              src="/images/screenshots/convertkit-dashboard.jpg" */}
          <div className="my-10 border-2 border-dashed border-gray-700 rounded-xl overflow-hidden h-[400px] flex items-center justify-center bg-[#1a1a2e]">
            <div className="text-center p-8">
              <div className="text-4xl mb-3">📸</div>
              <div className="text-brand-cyan font-mono text-sm uppercase tracking-wider font-bold">
                ConvertKit Dashboard
              </div>
              <div className="text-gray-500 text-xs mt-2">
                Replace with: ConvertKit dashboard overview screenshot
              </div>
            </div>
          </div>

          <div className="bg-[#1a1a2e] border-l-4 border-brand-cyan p-6 mb-12">
            <div className="font-mono font-bold text-brand-cyan text-sm uppercase mb-2">Quick Verdict</div>
            <div className="text-xl font-bold text-white mb-4">⭐ 4.6/5 — Recommended</div>
            <div className="flex flex-wrap gap-3">
              <span className="bg-brand-bg px-3 py-1 text-sm text-gray-300 rounded-full flex items-center gap-2">
                <CheckCircle2 size={14} className="text-brand-cyan" /> Free up to 10K subs
              </span>
              <span className="bg-brand-bg px-3 py-1 text-sm text-gray-300 rounded-full flex items-center gap-2">
                <CheckCircle2 size={14} className="text-brand-cyan" /> Best for creators
              </span>
              <span className="bg-brand-bg px-3 py-1 text-sm text-gray-300 rounded-full flex items-center gap-2">
                <CheckCircle2 size={14} className="text-brand-cyan" /> We use it daily
              </span>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="text-gray-300 space-y-6 mb-12">
          <p>
            We do not recommend tools we have not personally used. ConvertKit is the email platform we use to run The Weekly Edge — the domskysolutions.com newsletter. This review is based on real daily usage from setting up our first form to authenticating our domain and delivering our lead magnet PDF to new subscribers automatically.
          </p>
          <p>
            That context matters. There are hundreds of ConvertKit reviews written by people who spent an afternoon with a trial account. This one was written by someone who went through the actual setup process, hit the actual friction points, and now relies on it every Thursday to deliver content to real subscribers.
          </p>
          <p>
            ConvertKit was built specifically for creators — bloggers, newsletter operators, course builders, podcasters — and that focus shows in every part of the product. Where general platforms like Mailchimp try to serve everyone from e-commerce stores to enterprise marketing teams, ConvertKit is designed for one thing: helping individual creators build and monetise an audience through email.
          </p>
        </div>

        <div className="border-l-4 border-brand-cyan bg-gray-800/30 p-8 my-12 italic text-[22px] text-gray-200">
          Getting from zero to a working signup form that automatically delivers a lead magnet took us under an hour — even with no email marketing experience.
        </div>

        <div className="text-gray-300 space-y-6 mb-16">
          <p>
            The result is a platform that feels genuinely right-sized for what most independent publishers actually need. Getting from zero to a working signup form on your site that automatically delivers a lead magnet and sends a welcome email takes under an hour — even if you have never used an email platform before.
          </p>
        </div>

        {/* KEY FEATURES */}
        <div className="mb-16">
          <h2 className="font-mono font-bold text-brand-cyan uppercase text-2xl mb-8 border-b border-brand-cyan/30 pb-2 inline-block">
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
              <div key={i} className="bg-[#1a1a2e] border-l-[3px] border-brand-cyan p-5">
                <div className="flex items-start gap-3">
                  <div className="text-xl mt-0.5">{feature.icon}</div>
                  <div>
                    <div className="font-sans font-bold text-white text-base mb-1">{feature.title}</div>
                    <div className="text-gray-400 text-sm font-sans">{feature.desc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* REPLACE SRC WITH REAL SCREENSHOT:
            /images/screenshots/form-builder.jpg
            Recommended size: 1200x800px */}
        <div className="my-10 border-2 border-dashed border-gray-700 rounded-xl overflow-hidden">
          <div className="bg-brand-surface p-8 text-center">
            <div className="text-4xl mb-3">📸</div>
            <div className="text-brand-cyan font-mono text-sm uppercase tracking-wider font-bold">
              Form Builder
            </div>
            <div className="text-gray-500 text-xs mt-2">
              Replace with form creation screenshot
            </div>
          </div>
        </div>

        {/* PROS AND CONS */}
        <div className="mb-16">
          <h2 className="font-mono font-bold text-brand-cyan uppercase text-2xl mb-8 border-b border-brand-cyan/30 pb-2 inline-block">
            Pros & Cons
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-[#1a1a2e] border-t-[3px] border-green-500 p-6">
              <h3 className="font-sans font-bold text-green-400 mb-4 text-xl">Pros</h3>
              <ul className="space-y-4">
                {[
                  { bold: "Generous", text: "free plan — 10,000 subscribers before paying anything" },
                  { bold: "Built", text: "for creators not enterprises — the product makes sense immediately" },
                  { bold: "Powerful", text: "subscriber tagging for segmenting your audience over time" },
                  { bold: "Intuitive", text: "visual automation builder — no technical knowledge needed" },
                  { bold: "Excellent", text: "deliverability — emails reach inbox not spam" }
                ].map((p, i) => (
                  <li key={i} className="text-gray-300 text-base font-sans flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-green-500 shrink-0 mt-1" />
                    <span><strong className="text-white">{p.bold}</strong> {p.text}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-[#1a1a2e] border-t-[3px] border-red-500 p-6">
              <h3 className="font-sans font-bold text-red-400 mb-4 text-xl">Cons</h3>
              <ul className="space-y-4">
                {[
                  { bold: "Limited", text: "email editor design flexibility compared to some competitors" },
                  { bold: "Basic", text: "reporting and analytics on lower tier plans" },
                  { bold: "Steep", text: "price increases after you pass the free tier limits" },
                  { bold: "Restricted", text: "A/B testing capabilities on the standard Creator plan" },
                  { default: "New accounts default to double opt-in which can confuse early testing" }
                ].map((c, i) => (
                  <li key={i} className="text-gray-300 text-base font-sans flex items-start gap-3">
                    <XCircle size={18} className="text-red-500 shrink-0 mt-1" />
                    <span>{c.bold ? <><strong className="text-white">{c.bold}</strong> {c.text}</> : c.default}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* OUR HONEST EXPERIENCE */}
        <div className="bg-[#111827] border-l-4 border-brand-amber p-8 mb-16">
          <div className="font-mono font-bold text-brand-amber text-sm uppercase mb-6 tracking-wider">
            OUR ACTUAL EXPERIENCE
          </div>

          <h3 className="font-sans font-bold text-brand-amber text-xl mb-3">The Setup</h3>
          <p className="text-gray-300 mb-6">
            Setup took us roughly <strong>45 minutes</strong> from zero — creating an account, building our first form, connecting it to our site via API, and setting up the welcome email that delivers our free PDF guide to new subscribers.
          </p>

          <h3 className="font-sans font-bold text-brand-amber text-xl mb-3">Domain Authentication</h3>
          <p className="text-gray-300 mb-6">
            The domain authentication process — setting up DKIM, SPF, and DMARC records through Cloudflare — took longer than expected, around <strong>two hours</strong> working through DNS settings. Once completed our emails consistently reach the inbox rather than spam folders, which is the whole point.
          </p>

          <h3 className="font-sans font-bold text-brand-amber text-xl mb-3">The Double Opt-In Surprise</h3>
          <p className="text-gray-300 mb-6">
            The one thing that caught us early: new accounts default to double opt-in confirmation. Subscribers need to click a confirmation email before they appear in your list. This is good for list quality but caused confusion when we first tested the form and subscribers were not appearing immediately. Once we understood what was happening it was straightforward to manage.
          </p>

          <h3 className="font-sans font-bold text-brand-amber text-xl mb-3">After 3 Months of Use</h3>
          <p className="text-gray-300 mb-6">
            The free plan handles everything a new newsletter needs. We have been building domskysolutions.com on it since day one and it has not limited us in any meaningful way. We rely on it <strong>every Thursday</strong>.
          </p>

          <div className="bg-brand-amber/10 border border-brand-amber/20 p-5 rounded-md mt-8">
            <div className="font-sans font-bold text-brand-amber mb-2 flex items-center gap-2">
              <span>💡</span> Pro tip from our experience:
            </div>
            <div className="text-brand-amber/90 text-base font-sans">
              Set up your custom domain authentication before sending your first broadcast. It takes a bit of technical wrangling in your DNS settings, but it's the single most important thing you can do for your deliverability.
            </div>
          </div>
        </div>

        {/* REPLACE SRC WITH REAL SCREENSHOT:
            /images/screenshots/subscriber-analytics.jpg
            Recommended size: 1200x800px */}
        <div className="my-10 border-2 border-dashed border-gray-700 rounded-xl overflow-hidden">
          <div className="bg-brand-surface p-8 text-center">
            <div className="text-4xl mb-3">📸</div>
            <div className="text-brand-cyan font-mono text-sm uppercase tracking-wider font-bold">
              Subscriber Analytics
            </div>
            <div className="text-gray-500 text-xs mt-2">
              Replace with analytics dashboard
            </div>
          </div>
        </div>

        <div className="border-l-4 border-brand-cyan bg-gray-800/30 p-8 my-12 italic text-[22px] text-gray-200">
          The free plan handles everything a new newsletter needs. We built domskysolutions.com on it from day one.
        </div>

        {/* PRICING */}
        <div className="mb-16">
          <h2 className="font-mono font-bold text-brand-cyan uppercase text-2xl mb-8 border-b border-brand-cyan/30 pb-2 inline-block">
            Pricing
          </h2>
          
          <div className="grid md:grid-cols-3 gap-4 font-sans">
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
                Start Free →
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
                Try Creator →
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
                Try Pro →
              </a>
            </div>
          </div>
        </div>

        {/* REPLACE SRC WITH REAL SCREENSHOT:
            /images/screenshots/automation-builder.jpg
            Recommended size: 1200x800px */}
        <div className="my-10 border-2 border-dashed border-gray-700 rounded-xl overflow-hidden">
          <div className="bg-brand-surface p-8 text-center">
            <div className="text-4xl mb-3">📸</div>
            <div className="text-brand-cyan font-mono text-sm uppercase tracking-wider font-bold">
              Automation Builder
            </div>
            <div className="text-gray-500 text-xs mt-2">
              Replace with visual automation screenshot
            </div>
          </div>
        </div>

        <div className="text-gray-300 space-y-6 mb-16">
          <h3 className="font-sans font-bold text-brand-amber text-xl mb-3">Who is it best for?</h3>
          <p>
            ConvertKit is the right choice for bloggers, newsletter operators, podcasters, course creators, and anyone building an audience around expertise or content. If your primary goal is growing and eventually monetising an email list — rather than running complex e-commerce campaigns — ConvertKit was built specifically for your situation.
          </p>
          <p>
            If you need deep e-commerce integration, complex HTML email templates, or enterprise-level reporting — Klaviyo or ActiveCampaign may serve you better. For everyone else in the creator and solopreneur space ConvertKit is our recommendation.
          </p>
        </div>

        {/* VERDICT SECTION */}
        <div className="bg-brand-cyan/5 border border-brand-cyan p-8 mb-16">
          <div className="font-mono font-bold text-brand-cyan text-sm uppercase mb-4 tracking-wider">
            FINAL VERDICT
          </div>
          <div className="text-4xl mb-6">⭐ 4.6/5</div>
          <p className="font-sans font-bold text-white text-xl leading-relaxed mb-6">
            We recommend ConvertKit because we use ConvertKit every single week. That is the most honest endorsement possible. The free plan is generous enough to build a real newsletter operation for a long time before needing to spend anything.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-gray-400 font-sans text-sm">Best for:</span>
            <span className="bg-brand-amber/20 text-brand-amber px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Newsletter operators</span>
            <span className="bg-brand-amber/20 text-brand-amber px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Bloggers</span>
            <span className="bg-brand-amber/20 text-brand-amber px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Solopreneurs</span>
          </div>
        </div>

        {/* BOTTOM CTA SECTION */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6 font-sans">
          <a href="https://convertkit.com" target="_blank" rel="noopener noreferrer" className="flex-1 bg-brand-amber text-brand-bg px-8 py-4 font-bold text-lg hover:bg-yellow-400 transition-all text-center flex items-center justify-center gap-2">
            Try ConvertKit Free <ArrowRight size={20} />
          </a>
          <Link to="/uses" className="flex-1 border border-brand-cyan text-brand-cyan px-8 py-4 font-bold text-lg hover:bg-brand-cyan/10 transition-all text-center flex items-center justify-center gap-2">
            <ArrowRight size={20} className="rotate-180" /> Back to Tools We Use
          </Link>
        </div>
        
        <p className="text-gray-500 text-sm font-sans text-center mb-24">
          This link is an affiliate link. We may earn a commission if you sign up — at no extra cost to you. We only recommend tools we actually use.
        </p>

        {/* RELATED TOOLS SECTION */}
        <div className="border-t border-gray-800 pt-16">
          <h3 className="font-mono font-bold text-white text-xl mb-8 text-center">Also in our stack</h3>
          <div className="grid sm:grid-cols-2 gap-6 font-sans">
            <Link to="/uses/namecheap" className="block bg-brand-surface border border-gray-800 p-6 opacity-50 cursor-not-allowed hover:border-gray-700 transition-colors">
              <div className="text-xs font-mono text-gray-500 mb-2 uppercase tracking-wider">Domain Registrar</div>
              <div className="text-xl font-bold text-white mb-2">Namecheap</div>
              <div className="text-brand-cyan text-sm mb-4">Coming soon</div>
            </Link>
            <Link to="/uses/vercel" className="block bg-brand-surface border border-gray-800 p-6 opacity-50 cursor-not-allowed hover:border-gray-700 transition-colors">
              <div className="text-xs font-mono text-gray-500 mb-2 uppercase tracking-wider">Hosting & Deployment</div>
              <div className="text-xl font-bold text-white mb-2">Vercel</div>
              <div className="text-brand-cyan text-sm mb-4">Coming soon</div>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};
