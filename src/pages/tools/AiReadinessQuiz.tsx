import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, Check, Copy, Share2, Loader2, ArrowRight, ExternalLink } from 'lucide-react';
import { ConvertKitForm } from '../../components/ConvertKitForm';

type Role = 'writer' | 'designer' | 'business' | 'freelancer' | 'student' | 'other' | '';
type TimeWaster = 'writing' | 'research' | 'design' | 'technical' | 'productivity' | 'video' | '';
type Budget = 'free' | 'low' | 'medium' | 'high' | '';
type Comfort = 'nervous' | 'cautious' | 'open' | 'experienced' | '';
type Goal = 'time' | 'cost' | 'quality' | 'understand' | 'build' | '';

type Answers = {
  role: Role;
  timeWaster: TimeWaster;
  budget: Budget;
  comfort: Comfort;
  goal: Goal;
};

type ResultId = 'claude' | 'perplexity' | 'midjourney' | 'cursor' | 'notion' | 'elevenlabs' | 'full-stack';

type ToolResult = {
  id: ResultId;
  icon: string;
  name: string;
  tagline: string;
  freeTier: boolean;
  difficulty: string;
  timeToValue: string;
  pros: [string, string, string];
  firstStep: string;
  reviewLink?: string;
  toolUrl?: string;
  reviewLinks?: string[];
  toolUrls?: string[];
};

const STEP_1_OPTIONS = [
  { value: 'writer', icon: '✍️', title: 'Writer / Blogger', desc: 'Content creation, articles, copywriting, communication' },
  { value: 'designer', icon: '🎨', title: 'Designer / Creative', desc: 'Visual work, branding, creative projects' },
  { value: 'business', icon: '🚀', title: 'Small Business Owner', desc: 'Running a business, managing everything solo' },
  { value: 'freelancer', icon: '💼', title: 'Freelancer / Consultant', desc: 'Client work, proposals, delivering services' },
  { value: 'student', icon: '🎓', title: 'Student / Researcher', desc: 'Learning, studying, academic or personal research' },
  { value: 'other', icon: '🤷', title: 'Something Else', desc: 'None of the above quite fits' },
] as const;

const STEP_2_OPTIONS = [
  { value: 'writing', icon: '📧', title: 'Writing emails and documents', desc: 'Staring at blank pages, drafting and redrafting' },
  { value: 'research', icon: '🔍', title: 'Finding information', desc: 'Research taking forever, too many tabs open' },
  { value: 'design', icon: '🖼️', title: 'Creating visuals', desc: 'Need graphics, images or design assets constantly' },
  { value: 'technical', icon: '💻', title: 'Technical tasks', desc: 'Website fixes, code issues, things I need a developer for' },
  { value: 'productivity', icon: '📋', title: 'Managing notes and tasks', desc: 'Information scattered everywhere, hard to stay organised' },
  { value: 'video', icon: '🎬', title: 'Video and audio content', desc: 'Editing takes too long, production is expensive' },
] as const;

const STEP_3_OPTIONS = [
  { value: 'free', icon: '🆓', title: '$0 — Free only', desc: 'Free tiers only please' },
  { value: 'low', icon: '💚', title: 'Up to $20/month', desc: 'One essential tool' },
  { value: 'medium', icon: '💛', title: 'Up to $50/month', desc: 'A small focused stack' },
  { value: 'high', icon: '🚀', title: '$50+ per month', desc: 'I want the best tools' },
] as const;

const STEP_4_OPTIONS = [
  { value: 'nervous', icon: '😰', title: 'Pretty nervous honestly', desc: 'Technology and I have a complicated relationship' },
  { value: 'cautious', icon: '🤔', title: 'Curious but cautious', desc: 'I will try it if someone shows me where to start' },
  { value: 'open', icon: '😊', title: 'Open and willing', desc: 'I am ready to learn something new' },
  { value: 'experienced', icon: '🔥', title: 'Already using some AI', desc: 'I want to use it better and more strategically' },
] as const;

const STEP_5_OPTIONS = [
  { value: 'time', icon: '⏰', title: 'Save 1 hour every day', desc: 'Get time back for the work that actually matters' },
  { value: 'cost', icon: '💰', title: 'Cut my software costs', desc: 'Pay less for the same or better results' },
  { value: 'quality', icon: '⭐', title: 'Produce better quality work', desc: 'Output that genuinely impresses clients or readers' },
  { value: 'understand', icon: '💡', title: 'Finally understand AI', desc: 'Stop feeling left behind and actually get it' },
  { value: 'build', icon: '🏗️', title: 'Build something new', desc: 'Launch a project, site or idea I have been sitting on' },
] as const;

const TOOL_RESULTS: Record<ResultId, ToolResult> = {
  claude: {
    id: 'claude',
    icon: '✍️',
    name: 'Claude by Anthropic',
    tagline: 'Your perfect thinking and writing partner',
    freeTier: true,
    difficulty: 'Very easy',
    timeToValue: 'Same day',
    pros: [
      'Free tier handles most daily tasks',
      'Feels like talking to a smart colleague',
      'Improves everything you write instantly',
    ],
    firstStep:
      'Go to claude.ai, sign up free and ask it to write one email you have been putting off. Time how long it takes.',
    reviewLink: '/tools/claude',
    toolUrl: 'https://claude.ai',
  },
  perplexity: {
    id: 'perplexity',
    icon: '🔍',
    name: 'Perplexity AI',
    tagline: 'Research in seconds instead of hours',
    freeTier: true,
    difficulty: 'Very easy',
    timeToValue: 'Same day',
    pros: [
      'Replaces 90 minutes of tab switching',
      'Every answer cites its sources',
      'Free tier is genuinely powerful',
    ],
    firstStep:
      'Go to perplexity.ai and ask it the question you most need answered about your industry today. No tabs needed.',
    reviewLink: '/tools/perplexity',
    toolUrl: 'https://perplexity.ai',
  },
  midjourney: {
    id: 'midjourney',
    icon: '🎨',
    name: 'Midjourney',
    tagline: 'Professional visuals from a text description',
    freeTier: false,
    difficulty: 'Easy to start',
    timeToValue: 'Day one',
    pros: [
      'Replaces expensive stock photo subscriptions',
      'Unique images nobody else has',
      'Gets better the more you use it',
    ],
    firstStep:
      'Go to midjourney.com, start a subscription and type: dark professional workspace, laptop glowing, cinematic lighting --ar 16:9',
    reviewLink: '/reviews/midjourney',
    toolUrl: 'https://midjourney.com',
  },
  cursor: {
    id: 'cursor',
    icon: '💻',
    name: 'Cursor',
    tagline: 'Build and fix technical things without a developer',
    freeTier: true,
    difficulty: 'Easy with guidance',
    timeToValue: 'First week',
    pros: [
      'Free tier — 2000 completions per month',
      'Describe what you want in plain English',
      'Removes technical bottlenecks permanently',
    ],
    firstStep:
      'Download Cursor free at cursor.sh. Open any file and ask it to explain what the file does in plain English. Do not try to edit anything yet.',
    reviewLink: '/tools/cursor',
    toolUrl: 'https://cursor.sh',
  },
  notion: {
    id: 'notion',
    icon: '📋',
    name: 'Notion AI',
    tagline: 'Your second brain with actual intelligence',
    freeTier: true,
    difficulty: 'Very easy',
    timeToValue: 'Same day',
    pros: ['Organises everything you know', 'Summarises long documents instantly', 'Free workspace to get started'],
    firstStep:
      'Go to notion.so, create a free account and move your most used notes into it. Then ask Notion AI to summarise them.',
    reviewLink: '/tools/notion-ai',
    toolUrl: 'https://notion.so',
  },
  elevenlabs: {
    id: 'elevenlabs',
    icon: '🎬',
    name: 'ElevenLabs',
    tagline: 'Professional voice and audio without a studio',
    freeTier: true,
    difficulty: 'Easy',
    timeToValue: 'Same day',
    pros: ['Voice cloning and generation', 'Replaces expensive voiceover costs', 'Free tier for getting started'],
    firstStep:
      'Go to elevenlabs.io, sign up free and generate your first voiceover from a text script in under 2 minutes.',
    reviewLink: '/tools/elevenlabs',
    toolUrl: 'https://elevenlabs.io',
  },
  'full-stack': {
    id: 'full-stack',
    icon: '🚀',
    name: 'Claude + Perplexity',
    tagline: 'The two tools that replace the most friction',
    freeTier: true,
    difficulty: 'Easy',
    timeToValue: 'Day one',
    pros: [
      'Claude handles all your writing and thinking',
      'Perplexity handles all your research',
      'Together they free up 2+ hours per day',
    ],
    firstStep: 'Start with Claude today. Add Perplexity on day 3. Use both for one week before adding anything else.',
    reviewLinks: ['/tools/claude', '/tools/perplexity'],
    toolUrls: ['https://claude.ai', 'https://perplexity.ai'],
  },
};

const roleLabel = (role: Role) => {
  if (role === 'writer') return 'writing and communication';
  if (role === 'designer') return 'creative and visual work';
  if (role === 'business') return 'running a business solo';
  if (role === 'freelancer') return 'client work and proposals';
  if (role === 'student') return 'learning and research';
  return 'your daily work';
};

const timeWasterLabel = (tw: TimeWaster) => {
  if (tw === 'writing') return 'writing and communication';
  if (tw === 'research') return 'research and finding information';
  if (tw === 'design') return 'creating visuals and design assets';
  if (tw === 'technical') return 'technical tasks';
  if (tw === 'productivity') return 'notes, tasks and staying organised';
  if (tw === 'video') return 'video and audio content';
  return 'your biggest bottleneck';
};

const decideResult = (a: Answers): ResultId => {
  if (a.timeWaster === 'writing' || a.role === 'writer' || a.role === 'freelancer') return 'claude';
  if (a.timeWaster === 'research' || a.role === 'student') return 'perplexity';
  if (a.timeWaster === 'design' || a.role === 'designer') return 'midjourney';
  if (a.timeWaster === 'technical' || a.goal === 'build') return 'cursor';
  if (a.timeWaster === 'productivity') return 'notion';
  if (a.timeWaster === 'video') return 'elevenlabs';
  if (a.budget === 'free') return 'claude';
  if (a.comfort === 'experienced' && a.budget === 'high') return 'full-stack';
  return 'claude';
};

export const AiReadinessQuiz = () => {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [answers, setAnswers] = useState<Answers>({
    role: '',
    timeWaster: '',
    budget: '',
    comfort: '',
    goal: '',
  });
  const [isCalculating, setIsCalculating] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [loadingTextIndex, setLoadingTextIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const loadingTexts = ['Analysing your answers...', 'Matching tools to your situation...', 'Building your recommendation...'];

  useEffect(() => {
    document.title = 'AI Readiness Quiz — domskysolutions.com';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Answer 5 quick questions and get a personalised recommendation for your perfect first AI tool. No technical knowledge required.'
      );
    }
  }, []);

  useEffect(() => {
    if (!isCalculating) return;

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
  }, [isCalculating]);

  const resultId = useMemo(() => decideResult(answers), [answers]);
  const result = TOOL_RESULTS[resultId];

  const personalisedReason = useMemo(() => {
    const tw = timeWasterLabel(answers.timeWaster);
    const role = roleLabel(answers.role);

    if (resultId === 'claude') return `You spend most time on ${tw} — Claude turns that bottleneck into your biggest strength.`;
    if (resultId === 'perplexity') return `You spend most time on ${tw} — Perplexity gives you answers with sources in seconds.`;
    if (resultId === 'midjourney') return `Your work depends on ${role} — Midjourney gives you professional visuals from a simple description.`;
    if (resultId === 'cursor') return `You’re blocked by ${tw} — Cursor removes the developer bottleneck so you can ship faster.`;
    if (resultId === 'notion') return `Your biggest friction is ${tw} — Notion AI turns scattered info into organised action.`;
    if (resultId === 'elevenlabs') return `You want more output from ${tw} — ElevenLabs gets you studio-quality voice in minutes.`;
    return `Claude handles your writing and thinking, while Perplexity handles your research — together they remove the most daily friction.`;
  }, [answers, resultId]);

  const canGoNext =
    (step === 1 && !!answers.role) ||
    (step === 2 && !!answers.timeWaster) ||
    (step === 3 && !!answers.budget) ||
    (step === 4 && !!answers.comfort) ||
    (step === 5 && !!answers.goal);

  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? 120 : -120, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d < 0 ? 120 : -120, opacity: 0 }),
  };

  const handleBack = () => {
    if (step <= 1) return;
    setDirection(-1);
    setStep((s) => s - 1);
  };

  const handleNext = () => {
    if (!canGoNext) return;
    if (step < 5) {
      setDirection(1);
      setStep((s) => s + 1);
      return;
    }
    setIsCalculating(true);
  };

  const handleSelect = (field: keyof Answers, value: any, autoAdvance = true) => {
    setAnswers((prev) => ({ ...prev, [field]: value }));
    if (!autoAdvance) return;
    if (step < 5) {
      setTimeout(() => handleNext(), 120);
    } else {
      setTimeout(() => handleNext(), 150);
    }
  };

  const reset = () => {
    setStep(1);
    setDirection(1);
    setAnswers({ role: '', timeWaster: '', budget: '', comfort: '', goal: '' });
    setIsCalculating(false);
    setShowResults(false);
    setLoadingTextIndex(0);
    setCopied(false);
  };

  const shareText = useMemo(() => {
    const toolName = result.name;
    return `I just found my perfect first AI tool using this free quiz 👇

My result: ${toolName}
${personalisedReason}

Find yours in 60 seconds — free:
domskysolutions.com/tools/ai-readiness-quiz

#AItools #beginners`;
  }, [result.name, personalisedReason]);

  const copyShareText = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      // ignore
    }
  };

  const shareOnX = () => {
    const url = `https://x.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const renderDots = () => {
    const total = 5;
    return (
      <div className="flex items-center justify-center">
        {Array.from({ length: total }).map((_, i) => {
          const n = i + 1;
          const completed = n < step || showResults || isCalculating;
          const active = n === step && !showResults && !isCalculating;
          const upcoming = n > step && !showResults && !isCalculating;
          return (
            <div key={n} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all ${
                  completed
                    ? 'bg-brand-cyan border-brand-cyan text-brand-bg'
                    : active
                    ? 'border-brand-cyan text-brand-cyan bg-[#00F5D4]/10 animate-pulse'
                    : upcoming
                    ? 'border-gray-700 text-gray-600 bg-[#1a1a2e]'
                    : 'border-gray-700'
                }`}
              >
                {completed ? <Check size={18} /> : <span className="font-mono text-xs">{n}</span>}
              </div>
              {n !== total && <div className={`w-10 h-[2px] ${completed ? 'bg-brand-cyan' : 'bg-gray-800'}`} />}
            </div>
          );
        })}
      </div>
    );
  };

  const optionCardClass = (selected: boolean) =>
    `flex items-start gap-4 p-6 rounded-xl text-left transition-all duration-200 border cursor-pointer min-h-[104px] ${
      selected ? 'border-brand-cyan bg-[#00F5D4]/10' : 'border-gray-800 bg-[#1a1a2e] hover:border-gray-600'
    }`;

  if (isCalculating) {
    return (
      <div className="pt-32 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen">
        <div className="bg-brand-surface border border-gray-800 p-10 md:p-14 relative overflow-hidden text-center">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-cyan to-blue-500" />
          <div className="flex justify-center mb-6">
            <Loader2 className="text-brand-cyan animate-spin" size={40} />
          </div>
          <div className="text-brand-cyan font-mono text-xs uppercase tracking-wider mb-3">Building your recommendation</div>
          <div className="text-white text-2xl font-bold font-mono mb-2">{loadingTexts[loadingTextIndex]}</div>
          <div className="text-gray-500 font-inter">This takes about 2 seconds.</div>
        </div>
      </div>
    );
  }

  if (showResults) {
    const isFullStack = resultId === 'full-stack';
    return (
      <div className="pt-32 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen">
        <Link to="/tools" className="inline-flex items-center gap-2 text-brand-cyan hover:underline font-mono text-sm mb-8">
          <ArrowRight className="rotate-180" size={16} /> Back to all tools
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="bg-[#1a1a2e] border-l-4 border-brand-cyan p-8 md:p-10 shadow-2xl"
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="px-3 py-1 bg-brand-amber/10 text-brand-amber text-xs font-mono uppercase tracking-wider border border-brand-amber/30">
              YOUR PERFECT FIRST AI TOOL
            </span>
          </div>

          <div className="flex items-start justify-between gap-6 flex-col md:flex-row">
            <div className="flex items-start gap-5">
              <div className="text-5xl">{result.icon}</div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl md:text-4xl font-bold text-white font-mono leading-tight">{result.name}</h1>
                  <span className="px-3 py-1 bg-brand-amber text-brand-bg text-xs font-mono font-bold uppercase tracking-wider rounded-full">
                    START HERE
                  </span>
                </div>
                <p className="text-gray-300 text-lg mb-2">{result.tagline}</p>
                <p className="text-gray-400">{personalisedReason}</p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <span className="px-4 py-2 rounded-full bg-brand-bg border border-gray-800 text-sm font-mono text-gray-300">
              Free to start: <span className="text-white font-bold">{result.freeTier ? 'YES' : 'NO'}</span>
            </span>
            <span className="px-4 py-2 rounded-full bg-brand-bg border border-gray-800 text-sm font-mono text-gray-300">
              Time to value: <span className="text-white font-bold">{result.timeToValue}</span>
            </span>
            <span className="px-4 py-2 rounded-full bg-brand-bg border border-gray-800 text-sm font-mono text-gray-300">
              Difficulty: <span className="text-white font-bold">{result.difficulty}</span>
            </span>
          </div>

          <div className="mt-8 space-y-3">
            {result.pros.map((p) => (
              <div key={p} className="text-gray-300 flex items-start gap-3">
                <span className="text-brand-cyan font-bold">✅</span> {p}
              </div>
            ))}
          </div>

          <div className="mt-10 p-6 bg-brand-surface border border-brand-cyan/30 rounded-xl">
            <div className="text-brand-cyan font-mono text-xs uppercase tracking-wider mb-2">YOUR FIRST STEP:</div>
            <div className="text-white font-inter leading-relaxed">{result.firstStep}</div>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            {!isFullStack ? (
              <>
                <Link
                  to={result.reviewLink!}
                  className="inline-flex items-center justify-center gap-2 bg-brand-amber text-brand-bg font-bold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity min-h-[44px]"
                >
                  Read Full Review → <ArrowRight size={18} />
                </Link>
                <a
                  href={result.toolUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border border-brand-cyan text-brand-cyan font-bold px-6 py-3 rounded-lg hover:bg-[#00F5D4]/10 transition-colors min-h-[44px]"
                >
                  Start Free at {new URL(result.toolUrl!).hostname} → <ExternalLink size={18} />
                </a>
              </>
            ) : (
              <>
                <Link
                  to={result.reviewLinks![0]}
                  className="inline-flex items-center justify-center gap-2 bg-brand-amber text-brand-bg font-bold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity min-h-[44px]"
                >
                  Read Claude Review → <ArrowRight size={18} />
                </Link>
                <Link
                  to={result.reviewLinks![1]}
                  className="inline-flex items-center justify-center gap-2 border border-brand-cyan text-brand-cyan font-bold px-6 py-3 rounded-lg hover:bg-[#00F5D4]/10 transition-colors min-h-[44px]"
                >
                  Read Perplexity Review → <ArrowRight size={18} />
                </Link>
              </>
            )}
          </div>
        </motion.div>

        <div className="my-12 bg-brand-surface border border-brand-cyan/30 rounded-xl p-8">
          <div className="text-brand-cyan font-mono text-xs uppercase tracking-wider mb-2">
            🎯 Want your free {resultId === 'full-stack' ? 'starter guide' : `${result.name} starter guide`}?
          </div>
          <h3 className="text-white font-bold text-2xl font-mono mb-2">Get The AI Tools Starter Kit</h3>
          <p className="text-gray-400 mb-6">
            Our free guide covering exactly how to get value from {resultId === 'full-stack' ? 'these tools' : result.name} in your first week. Delivered to your inbox instantly.
          </p>
          <ConvertKitForm
            className="flex flex-col sm:flex-row gap-3"
            inputClassName="flex-1 px-4 py-3 rounded-lg bg-brand-bg border border-gray-700 text-white placeholder:text-gray-500 focus:outline-none focus:border-brand-cyan min-h-[44px]"
            buttonClassName="px-6 py-3 rounded-lg bg-brand-amber text-brand-bg font-bold hover:opacity-90 transition-opacity min-h-[44px]"
            buttonText="Send Me the Guide →"
            placeholder="Your email address"
            successMessage="Perfect. Check your inbox for the Starter Kit."
          />
        </div>

        <div className="bg-brand-surface border border-gray-800 p-8">
          <div className="flex items-center gap-3 mb-4">
            <Share2 className="text-brand-cyan" size={18} />
            <h3 className="text-white font-bold font-mono text-xl">Share your result</h3>
          </div>
          <div className="bg-brand-bg border border-gray-800 p-4 text-gray-300 font-inter whitespace-pre-line leading-relaxed">
            {shareText}
          </div>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={copyShareText}
              className="inline-flex items-center justify-center gap-2 border border-gray-600 text-gray-200 font-bold px-6 py-3 rounded-lg hover:border-white hover:bg-[#1a1a2e] transition-colors min-h-[44px]"
            >
              <Copy size={18} /> {copied ? 'Copied!' : 'Copy Share Text'}
            </button>
            <button
              onClick={shareOnX}
              className="inline-flex items-center justify-center gap-2 border border-brand-cyan text-brand-cyan font-bold px-6 py-3 rounded-lg hover:bg-[#00F5D4]/10 transition-colors min-h-[44px]"
            >
              <Share2 size={18} /> Share on X
            </button>
          </div>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row gap-3">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 border border-gray-600 text-gray-200 font-bold px-6 py-3 rounded-lg hover:border-white hover:bg-brand-surface transition-colors min-h-[44px]"
          >
            Retake Quiz
          </button>
          <Link
            to="/tools"
            className="inline-flex items-center justify-center gap-2 bg-brand-cyan text-brand-bg font-bold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity min-h-[44px]"
          >
            Explore All Tools → <ArrowRight size={18} />
          </Link>
        </div>

        <div className="mt-4 text-sm text-gray-500">
          Not the right fit? Retake the quiz or browse all our reviews.
        </div>
      </div>
    );
  }

  const renderStep = () => {
    if (step === 1) {
      return (
        <div className="w-full">
          <h2 className="text-3xl font-bold text-white mb-2 font-mono">What do you do for work?</h2>
          <p className="text-gray-400 mb-8">Pick the one that fits best — we will personalise your result</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {STEP_1_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleSelect('role', opt.value)}
                className={optionCardClass(answers.role === opt.value)}
              >
                <div className="text-3xl">{opt.icon}</div>
                <div>
                  <h3 className={`font-bold text-lg mb-1 ${answers.role === opt.value ? 'text-white' : 'text-gray-300'}`}>
                    {opt.title}
                  </h3>
                  <p className={answers.role === opt.value ? 'text-gray-300' : 'text-gray-500'}>{opt.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      );
    }

    if (step === 2) {
      return (
        <div className="w-full">
          <h2 className="text-3xl font-bold text-white mb-2 font-mono">What wastes most of your time right now?</h2>
          <p className="text-gray-400 mb-8">Be honest — this shapes your recommendation most</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {STEP_2_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleSelect('timeWaster', opt.value)}
                className={optionCardClass(answers.timeWaster === opt.value)}
              >
                <div className="text-3xl">{opt.icon}</div>
                <div>
                  <h3 className={`font-bold text-lg mb-1 ${answers.timeWaster === opt.value ? 'text-white' : 'text-gray-300'}`}>
                    {opt.title}
                  </h3>
                  <p className={answers.timeWaster === opt.value ? 'text-gray-300' : 'text-gray-500'}>{opt.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      );
    }

    if (step === 3) {
      return (
        <div className="w-full">
          <h2 className="text-3xl font-bold text-white mb-2 font-mono">What is your monthly budget for AI tools?</h2>
          <p className="text-gray-400 mb-8">We will match tools to what you can afford</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {STEP_3_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleSelect('budget', opt.value)}
                className={optionCardClass(answers.budget === opt.value)}
              >
                <div className="text-3xl">{opt.icon}</div>
                <div>
                  <h3 className={`font-bold text-lg mb-1 ${answers.budget === opt.value ? 'text-white' : 'text-gray-300'}`}>
                    {opt.title}
                  </h3>
                  <p className={answers.budget === opt.value ? 'text-gray-300' : 'text-gray-500'}>{opt.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      );
    }

    if (step === 4) {
      return (
        <div className="w-full">
          <h2 className="text-3xl font-bold text-white mb-2 font-mono">How do you feel about trying new technology?</h2>
          <p className="text-gray-400 mb-8">Honest answer — no judgement here</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {STEP_4_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleSelect('comfort', opt.value)}
                className={optionCardClass(answers.comfort === opt.value)}
              >
                <div className="text-3xl">{opt.icon}</div>
                <div>
                  <h3 className={`font-bold text-lg mb-1 ${answers.comfort === opt.value ? 'text-white' : 'text-gray-300'}`}>
                    {opt.title}
                  </h3>
                  <p className={answers.comfort === opt.value ? 'text-gray-300' : 'text-gray-500'}>{opt.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="w-full">
        <h2 className="text-3xl font-bold text-white mb-2 font-mono">What would success look like for you in 30 days?</h2>
        <p className="text-gray-400 mb-8">Pick the outcome that excites you most</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {STEP_5_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => handleSelect('goal', opt.value)}
              className={optionCardClass(answers.goal === opt.value)}
            >
              <div className="text-3xl">{opt.icon}</div>
              <div>
                <h3 className={`font-bold text-lg mb-1 ${answers.goal === opt.value ? 'text-white' : 'text-gray-300'}`}>
                  {opt.title}
                </h3>
                <p className={answers.goal === opt.value ? 'text-gray-300' : 'text-gray-500'}>{opt.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="pt-32 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen">
      <Link to="/tools" className="inline-flex items-center gap-2 text-brand-cyan hover:underline font-mono text-sm mb-8">
        <ArrowRight className="rotate-180" size={16} /> Back to all tools
      </Link>

      <div className="bg-brand-surface border border-gray-800 p-8 md:p-12 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-cyan to-blue-500" />

        <div className="mb-10">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#00F5D4]/10 border border-brand-cyan/30 text-brand-cyan text-xs font-mono uppercase tracking-wider mb-5">
            FREE — 60 SECONDS
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-mono text-white leading-tight mb-4">
            Which AI Tool Should You Start With?
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed max-w-2xl">
            Answer 5 quick questions. Get a personalised recommendation for your perfect first AI tool. No technical knowledge required.
          </p>

          <div className="mt-6 flex flex-wrap gap-3 text-sm text-gray-300">
            {[
              '✓ Takes 60 seconds',
              '✓ No signup required',
              '✓ Personalised to your situation',
              '✓ Free forever',
            ].map((t) => (
              <span key={t} className="px-3 py-1 rounded-full bg-brand-bg border border-gray-800 font-inter">
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-8">
          {renderDots()}
          <div className="text-center mt-4 text-gray-500 font-mono text-sm">Question {step} of 5</div>
        </div>

        <div className="min-h-[420px]">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={step}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex items-center justify-between gap-4">
          <div>
            {step > 1 && (
              <button
                onClick={handleBack}
                className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors font-mono"
              >
                <ChevronLeft size={18} /> Back
              </button>
            )}
          </div>

          <button
            onClick={handleNext}
            disabled={!canGoNext}
            className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-bold min-h-[44px] ${
              canGoNext
                ? 'bg-brand-amber text-brand-bg hover:opacity-90 transition-opacity'
                : 'bg-gray-800 text-gray-500 cursor-not-allowed'
            }`}
          >
            {step === 5 ? (
              <>
                Get my result <ArrowRight size={18} />
              </>
            ) : (
              <>
                Next <ArrowRight size={18} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

