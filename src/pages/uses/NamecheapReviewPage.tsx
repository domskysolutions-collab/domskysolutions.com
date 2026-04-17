import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'motion/react';
import { CheckCircle2, Star, XCircle, Check, ChevronRight } from 'lucide-react';

export const NamecheapReviewPage = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    document.title = 'Namecheap Review 2026 | Tools I Use | domskysolutions.com';
    window.scrollTo(0, 0);
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute(
      'content',
      'My honest Namecheap review after using it to register domskysolutions.com. Real pricing, real pros and cons, no sponsored fluff.',
    );
  }, []);

  return (
    <div className="bg-brand-bg min-h-screen">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-brand-cyan origin-left z-50"
        style={{ scaleX }}
      />

      <div className="pt-32 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen">
        <div className="text-gray-500 font-mono text-sm mb-8 flex items-center gap-2 flex-wrap">
          <Link to="/uses" className="hover:text-brand-cyan transition-colors">
            Tools I Use
          </Link>
          <ChevronRight size={14} className="text-gray-600" />
          <span className="text-gray-300">Namecheap Review</span>
        </div>

        <div className="bg-brand-surface border border-gray-800 p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-cyan to-blue-500"></div>

          {/* HERO */}
          <div className="mb-12">
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="px-3 py-1 bg-gray-800 text-gray-300 text-xs font-mono uppercase tracking-wider">
                DOMAIN REGISTRAR
              </span>
              <span className="px-3 py-1 bg-brand-amber/10 border border-brand-amber/20 text-brand-amber text-xs font-mono font-bold tracking-wide flex items-center gap-1.5">
                🛠️ I USE THIS
              </span>
              <div className="flex items-center gap-1 text-brand-amber text-xs font-mono uppercase tracking-wider">
                <Star size={16} fill="currentColor" /> 4.5/5
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold font-mono text-white mb-6 leading-tight">
              Namecheap Review 2026: The Domain Registrar That Does Not Treat You Like an ATM
            </h1>

            <div className="text-gray-400 text-sm font-mono mb-6 flex flex-wrap gap-3">
              <span>⭐ 4.5/5</span>
              <span className="text-gray-600">·</span>
              <span>Domain &amp; Hosting</span>
              <span className="text-gray-600">·</span>
              <span>Updated April 2026</span>
              <span className="text-gray-600">·</span>
              <span>6 min read</span>
            </div>

            <div className="mb-10 border border-gray-800 overflow-hidden bg-brand-bg">
              {/* SCREENSHOT 1 — Namecheap dashboard */}
              <img
                src="/images/screenshots/namecheap-dashboard.jpg"
                alt="Namecheap domain management dashboard"
                className="w-full h-auto block"
                loading="lazy"
              />
            </div>

            <div className="bg-[#1a1a2e] border-l-4 border-brand-cyan p-6">
              <div className="font-mono font-bold text-brand-cyan text-sm uppercase mb-2">Quick Verdict</div>
              <div className="text-xl font-bold text-white mb-4">4.5/5 — Recommended</div>
              <div className="flex flex-wrap gap-3">
                <span className="bg-brand-bg px-3 py-1 text-sm text-gray-300 rounded-full flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-brand-cyan" /> Free privacy protection
                </span>
                <span className="bg-brand-bg px-3 py-1 text-sm text-gray-300 rounded-full flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-brand-cyan" /> Transparent pricing
                </span>
                <span className="bg-brand-bg px-3 py-1 text-sm text-gray-300 rounded-full flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-brand-cyan" /> No aggressive upselling
                </span>
              </div>
            </div>
          </div>

          {/* INTRODUCTION */}
          <div className="prose prose-invert max-w-none mb-10">
            <p className="text-gray-300 text-lg leading-relaxed mb-4">
              Every website starts with a domain name. And the registrar you choose matters more than most people
              realise — not just for the initial purchase price but for renewal rates, privacy protection, DNS
              management, and whether you will be hit with surprise fees every time you need to do something basic.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed mb-4">
              I used Namecheap to register domskysolutions.com and have been managing the DNS through them since day
              one. This review is based on that real experience — not a test account, not a sponsored overview.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed mb-4">
              Namecheap has built its reputation over 20+ years on one simple positioning: transparent pricing with no
              dark patterns. In a market where GoDaddy has become notorious for upselling, renewal price shocks, and
              aggressive marketing, Namecheap is the alternative that the developer and creator community has quietly
              rallied around.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed mb-0">
              WhoisGuard privacy protection — which hides your personal information from public WHOIS lookup — is
              included free. GoDaddy charges separately for this. That single difference tells you everything about the
              philosophy difference between the two companies.
            </p>
          </div>

          {/* PULL QUOTE 1 */}
          <div className="border-l-4 border-brand-cyan bg-gray-800/30 p-8 my-12 italic text-[22px] text-gray-200 font-serif">
            "The name is not just marketing — .com domains start around $8-10 with renewal rates that actually stay
            reasonable after year one."
          </div>

          {/* KEY FEATURES */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold font-mono mb-6 text-white border-b border-gray-800 pb-2">
              Key Features
            </h2>

            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { icon: '🔒', title: 'Free WhoisGuard Privacy', desc: 'Your personal data hidden from public WHOIS — included free' },
                { icon: '💰', title: 'Transparent Pricing', desc: 'No surprise renewal shocks or hidden fees at checkout' },
                { icon: '🌐', title: 'DNS Management', desc: 'Full DNS control built into your dashboard' },
                { icon: '📧', title: 'Email Forwarding', desc: 'Forward domain email to any inbox — included free' },
                { icon: '🔄', title: 'Auto-Renewal', desc: 'Advance notice before any domain renewal charge' },
                { icon: '🔐', title: 'Two Factor Authentication', desc: '2FA support for account security' },
                { icon: '🏷️', title: 'Multi-Domain Management', desc: 'Manage entire domain portfolio from one clean dashboard' },
                { icon: '💬', title: '24/7 Live Chat Support', desc: 'Real support when you need it' },
              ].map((feature, i) => (
                <div
                  key={i}
                  className="bg-brand-bg border border-gray-800 border-l-4 border-l-brand-cyan p-5 hover:border-brand-cyan transition-colors"
                >
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

          {/* SCREENSHOT 2 */}
          <div className="my-10 border border-gray-800 overflow-hidden bg-brand-bg">
            {/* SCREENSHOT 2 — domain search */}
            <img
              src="/images/screenshots/namecheap-domain-search.jpg"
              alt="Namecheap domain search interface"
              className="w-full h-auto block"
              loading="lazy"
            />
            <div className="px-4 py-3 border-t border-gray-800 text-sm text-gray-400">
              Domain search — clean with no misleading upsells
            </div>
          </div>

          {/* PROS AND CONS */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold font-mono mb-6 text-white border-b border-gray-800 pb-2">
              Pros &amp; Cons
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-900/10 border-t-4 border-t-green-500 border-x border-b border-green-900/30 p-6">
                <h3 className="text-xl font-bold font-mono mb-4 text-green-400">What I Like</h3>
                <ul className="space-y-4">
                  {[
                    'Transparent pricing — no surprise renewal shocks after year one',
                    'Free WhoisGuard privacy protection included with every domain',
                    'Clean intuitive dashboard that does not overwhelm beginners',
                    'Good DNS management interface — straightforward to configure',
                    'Strong 20+ year reputation in the developer and creator community',
                    'No aggressive upselling at checkout',
                    'Competitive pricing across most TLDs',
                    'Responsive 24/7 live chat support',
                  ].map((text, i) => (
                    <li key={i} className="text-gray-300 flex items-start gap-3">
                      <CheckCircle2 size={18} className="text-green-500 shrink-0 mt-1" />
                      <span>{text}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-red-900/10 border-t-4 border-t-red-500 border-x border-b border-red-900/30 p-6">
                <h3 className="text-xl font-bold font-mono mb-4 text-red-400">What Could Be Better</h3>
                <ul className="space-y-4">
                  {[
                    'Hosting plans basic compared to specialist hosts like Vercel',
                    'Dashboard design feels slightly dated compared to newer registrars',
                    'Not always cheapest for every TLD',
                    'Some upselling exists at checkout — just less aggressive than others',
                    'Advanced DNS features less robust than using Cloudflare separately',
                    'Domain transfer process can be slow compared to competitors',
                  ].map((text, i) => (
                    <li key={i} className="text-gray-300 flex items-start gap-3">
                      <XCircle size={18} className="text-red-500 shrink-0 mt-1" />
                      <span>{text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* HOW IT COMPARES */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold font-mono mb-6 text-white border-b border-gray-800 pb-2">
              HOW IT COMPARES
            </h2>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-brand-bg border border-gray-800 p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold font-mono text-white">vs GoDaddy</h3>
                  <span className="px-2 py-1 rounded-full text-[10px] font-mono font-bold bg-green-500/10 text-green-400 border border-green-500/40">
                    NAMECHEAP WINS
                  </span>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Namecheap wins on pricing transparency, free privacy protection, and not feeling like you need a
                  lawyer to navigate checkout without buying something you did not want.
                </p>
              </div>

              <div className="bg-brand-bg border border-gray-800 p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold font-mono text-white">vs Cloudflare Registrar</h3>
                  <span className="px-2 py-1 rounded-full text-[10px] font-mono font-bold bg-brand-amber/10 text-brand-amber border border-brand-amber/40">
                    DEPENDS ON YOU
                  </span>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Cloudflare wins on price — they sell at cost with zero markup. But they require a Cloudflare account
                  and are less beginner friendly. Technical users should consider Cloudflare. Everyone else — Namecheap.
                </p>
              </div>

              <div className="bg-brand-bg border border-gray-800 p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold font-mono text-white">vs Squarespace Domains</h3>
                  <span className="px-2 py-1 rounded-full text-[10px] font-mono font-bold bg-green-500/10 text-green-400 border border-green-500/40">
                    NAMECHEAP WINS
                  </span>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Squarespace Domains (formerly Google Domains) is clean but more expensive. Namecheap gives you more
                  control at a lower price.
                </p>
              </div>
            </div>
          </div>

          {/* SCREENSHOT 3 */}
          <div className="my-10 border border-gray-800 overflow-hidden bg-brand-bg">
            {/* SCREENSHOT 3 — DNS management */}
            <img
              src="/images/screenshots/namecheap-dns.jpg"
              alt="DNS Management"
              className="w-full h-auto block"
              loading="lazy"
            />
            <div className="px-4 py-3 border-t border-gray-800 text-sm text-gray-400">
              DNS management panel — where I configured Cloudflare and email routing for domskysolutions.com
            </div>
          </div>

          {/* MY HONEST EXPERIENCE */}
          <div className="bg-brand-bg border border-gray-800 border-l-4 border-l-brand-amber p-8 mb-16">
            <div className="font-mono font-bold text-brand-amber text-sm uppercase mb-6 tracking-wider">
              MY ACTUAL EXPERIENCE
            </div>

            <h3 className="font-bold text-white text-xl mb-3">Registering domskysolutions.com</h3>
            <p className="text-gray-300 mb-6">
              I registered domskysolutions.com through Namecheap in a matter of minutes. The search was clean, the
              checkout was straightforward, and I was not hit with five upsell screens before completing the purchase.
              WhoisGuard was already included — I did not need to add it or pay extra.
            </p>

            <h3 className="font-bold text-white text-xl mb-3">Setting Up DNS</h3>
            <p className="text-gray-300 mb-6">
              The DNS configuration was the one area where I felt the interface showing its age. Getting the
              nameservers pointed to Cloudflare was simple but the DNS record interface is not as polished as
              Cloudflare&apos;s own dashboard.
            </p>
            <p className="text-gray-300 mb-6">That said — it worked.</p>

            <h3 className="font-bold text-white text-xl mb-3">After 12 Months</h3>
            <p className="text-gray-300 mb-6">
              I have had zero issues that were Namecheap&apos;s fault. The domain renews automatically, the privacy
              protection works, and I have never needed to contact support. That is exactly what you want from a domain
              registrar — it should be invisible.
            </p>

            <div className="bg-brand-amber/10 border border-brand-amber/20 p-5 rounded-md mt-8">
              <div className="font-bold text-brand-amber mb-2">💡 My setup tip:</div>
              <div className="text-brand-amber/90 text-base">
                Register your domain with Namecheap then immediately point nameservers to Cloudflare. You get
                Namecheap&apos;s pricing with Cloudflare&apos;s superior DNS management. Best of both worlds.
              </div>
            </div>
          </div>

          {/* PULL QUOTE 2 */}
          <div className="border-l-4 border-brand-cyan bg-gray-800/30 p-8 my-12 italic text-[22px] text-gray-200 font-serif">
            "After 12 months I have had zero issues. The domain renews automatically, the privacy works, and I have
            never needed to contact support. That is exactly what you want from a registrar."
          </div>

          {/* PRICING */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold font-mono mb-2 text-white border-b border-gray-800 pb-2">PRICING</h2>
            <p className="text-gray-400 text-sm mb-6 font-mono">
              Prices vary by TLD — these are typical ranges
            </p>

            <div className="grid md:grid-cols-3 gap-4">
              {/* .com */}
              <div className="bg-brand-bg border-t-4 border-brand-cyan border-x border-b border-gray-800 p-6 flex flex-col">
                <div className="text-xs font-bold text-gray-400 tracking-wider mb-2">.COM DOMAINS</div>
                <div className="inline-block bg-brand-cyan/10 text-brand-cyan text-[10px] font-mono font-bold px-2 py-0.5 rounded-full mb-4 uppercase tracking-wider">
                  MOST POPULAR
                </div>
                <div className="text-lg font-bold text-white mb-1">~$9/year first year</div>
                <div className="text-sm text-gray-400 mb-4">Renewal: ~ $14/year</div>
                <ul className="space-y-2 mb-8 flex-grow text-sm text-gray-300">
                  <li className="flex items-start gap-2">
                    <Check size={16} className="text-gray-500 shrink-0 mt-0.5" /> Free WhoisGuard privacy
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={16} className="text-gray-500 shrink-0 mt-0.5" /> DNS management included
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={16} className="text-gray-500 shrink-0 mt-0.5" /> Email forwarding included
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={16} className="text-gray-500 shrink-0 mt-0.5" /> Auto-renewal available
                  </li>
                </ul>
                <a
                  href="https://namecheap.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center py-2 px-4 border border-gray-600 text-gray-300 hover:bg-gray-800 transition-colors font-bold rounded-sm"
                >
                  Search .com Domains →
                </a>
              </div>

              {/* .io */}
              <div className="bg-[#1a1a2e] border-t-4 border-brand-amber border-x border-b border-gray-800 p-6 flex flex-col">
                <div className="text-xs font-bold text-gray-400 tracking-wider mb-2">.IO DOMAINS</div>
                <div className="inline-block bg-brand-amber/10 text-brand-amber text-[10px] font-mono font-bold px-2 py-0.5 rounded-full mb-4 uppercase tracking-wider">
                  POPULAR FOR TECH
                </div>
                <div className="text-lg font-bold text-white mb-1">~$32/year</div>
                <div className="text-sm text-gray-400 mb-4">Renewal: ~ $35/year</div>
                <ul className="space-y-2 mb-8 flex-grow text-sm text-gray-300">
                  <li className="flex items-start gap-2">
                    <Check size={16} className="text-brand-amber shrink-0 mt-0.5" /> All .com features included
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={16} className="text-brand-amber shrink-0 mt-0.5" /> Popular with startups
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={16} className="text-brand-amber shrink-0 mt-0.5" /> Growing brand recognition
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={16} className="text-brand-amber shrink-0 mt-0.5" /> Good availability
                  </li>
                </ul>
                <a
                  href="https://namecheap.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center py-2 px-4 border border-brand-amber text-brand-amber hover:bg-brand-amber/10 transition-colors font-bold rounded-sm"
                >
                  Search .io Domains →
                </a>
              </div>

              {/* .ai */}
              <div className="bg-brand-bg border-t-4 border-gray-600 border-x border-b border-gray-800 p-6 flex flex-col">
                <div className="text-xs font-bold text-gray-400 tracking-wider mb-2">.AI DOMAINS</div>
                <div className="inline-block bg-gray-800 text-gray-300 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full mb-4 uppercase tracking-wider">
                  AI NICHE
                </div>
                <div className="text-lg font-bold text-white mb-1">~$70/year</div>
                <div className="text-sm text-gray-400 mb-4">Renewal: ~ $80/year</div>
                <ul className="space-y-2 mb-8 flex-grow text-sm text-gray-300">
                  <li className="flex items-start gap-2">
                    <Check size={16} className="text-gray-500 shrink-0 mt-0.5" /> All standard features included
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={16} className="text-gray-500 shrink-0 mt-0.5" /> Perfect for AI projects
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={16} className="text-gray-500 shrink-0 mt-0.5" /> Premium positioning
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={16} className="text-gray-500 shrink-0 mt-0.5" /> Limited availability
                  </li>
                </ul>
                <a
                  href="https://namecheap.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center py-2 px-4 border border-gray-600 text-gray-300 hover:bg-gray-800 transition-colors font-bold rounded-sm"
                >
                  Search .ai Domains →
                </a>
              </div>
            </div>
          </div>

          {/* SCREENSHOT 4 */}
          <div className="my-10 border border-gray-800 overflow-hidden bg-brand-bg">
            {/* SCREENSHOT 4 — pricing page */}
            <img
              src="/images/screenshots/namecheap-pricing.jpg"
              alt="Namecheap pricing page"
              className="w-full h-auto block"
              loading="lazy"
            />
            <div className="px-4 py-3 border-t border-gray-800 text-sm text-gray-400">
              Namecheap pricing page — transparent with no hidden fees
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

