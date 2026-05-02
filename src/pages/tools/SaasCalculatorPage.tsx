
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Check, Plus, Trash2, DollarSign, TrendingDown, Zap, Sparkles, CheckCircle2, Copy } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AI_ALTERNATIVES, RECOMMENDED_TOOLS } from '../../data/saasCalculatorShared';
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
