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
