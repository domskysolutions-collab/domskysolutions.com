
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Check, Copy, Sparkles, RefreshCw, MessageSquare, Target, Zap, ChevronDown, CheckCircle2, X } from 'lucide-react';
import { ConvertKitForm } from '../../components/ConvertKitForm';

const PROMPT_CATEGORIES = [
  { id: 'writing', icon: '✍️', label: 'Writing' },
  { id: 'research', icon: '🔍', label: 'Research' },
  { id: 'coding', icon: '💻', label: 'Coding' },
  { id: 'email', icon: '📧', label: 'Email' },
  { id: 'social', icon: '📱', label: 'Social Media' },
  { id: 'strategy', icon: '🎯', label: 'Strategy' },
  { id: 'analysis', icon: '📊', label: 'Analysis' },
  { id: 'creative', icon: '🎨', label: 'Creative' },
];
const ROLES = [
  'Solo founder / entrepreneur',
  'Freelancer / consultant',
  'Content creator / blogger',
  'Marketing professional',
  'Developer / technical person',
  'Designer / creative',
  'Student / researcher',
  'Small business owner',
  'Other'
];
const TONES = [
  'Professional', 'Casual', 'Direct', 'Friendly', 'Technical', 'Simple', 'Persuasive', 'Empathetic', 'Bold'
];
const FORMATS = [
  'Paragraph', 'Bullet points', 'Numbered list', 'Table', 'Step by step', 'Short & punchy', 'Long & detailed', 'Email format', 'Code block', 'Outline'
];
const EXAMPLES = [
  {
    category: 'writing',
    title: 'Blog post introduction',
    desc: 'Engaging opener for any topic',
    fields: {
      role: 'Content creator / blogger',
      task: 'Write an engaging blog post introduction that hooks the reader immediately.',
      tones: ['Professional', 'Friendly'],
      format: 'Paragraph',
      writingTopic: 'The future of AI in content creation',
      writingAudience: 'Marketing professionals and writers',
      writingLength: 'Short (under 300 words)',
    }
  },
  {
    category: 'email',
    title: 'Cold outreach email',
    desc: 'First contact with a prospect',
    fields: {
      role: 'Solo founder / entrepreneur',
      task: 'Write a cold outreach email to a potential client.',
      tones: ['Professional', 'Direct', 'Persuasive'],
      format: 'Email format',
      emailType: 'Cold outreach',
      emailRecipient: 'VP of Marketing at a mid-sized tech company',
      emailGoal: 'Get them to reply and book a 15-minute discovery call',
      emailLength: 'Short (under 150 words)',
    }
  },
  {
    category: 'social',
    title: 'LinkedIn thought leadership',
    desc: 'Authority-building post',
    fields: {
      role: 'Solo founder / entrepreneur',
      task: 'Write a thought leadership post sharing a contrarian opinion.',
      tones: ['Bold', 'Professional'],
      format: 'Short & punchy',
      socialPlatform: 'LinkedIn',
      socialGoal: 'Build authority',
      socialTopic: 'Why most companies fail at adopting AI tools',
      socialHashtags: true,
    }
  },
  {
    category: 'coding',
    title: 'Explain this code',
    desc: 'For non-developers',
    fields: {
      role: 'Developer / technical person',
      task: 'Explain what this code snippet does in simple terms.',
      tones: ['Simple', 'Friendly'],
      format: 'Bullet points',
      codingLanguage: 'JavaScript',
      codingTask: 'function debounce(func, wait) {\n  let timeout;\n  return function executedFunction(...args) {\n    const later = () => {\n      clearTimeout(timeout);\n      func(...args);\n    };\n    clearTimeout(timeout);\n    timeout = setTimeout(later, wait);\n  };\n}',
      codingExperience: 'Explain like I\'m not a developer',
    }
  },
  {
    category: 'strategy',
    title: 'Business idea validator',
    desc: 'Test your concept',
    fields: {
      role: 'Solo founder / entrepreneur',
      task: 'Act as a critical business advisor and validate my new business idea. Point out the biggest risks.',
      tones: ['Direct', 'Professional'],
      format: 'Step by step',
      strategyType: 'B2B SaaS for local gyms',
      strategyChallenge: 'I want to build a CRM specifically for independent gyms, but I am worried about churn and their willingness to pay.',
      strategyConstraints: 'Bootstrapped, solo developer, 6 months runway',
      strategyOutcome: 'A list of the top 3 reasons this might fail and how to mitigate them',
    }
  },
  {
    category: 'research',
    title: 'Competitive analysis',
    desc: 'Research a competitor',
    fields: {
      role: 'Marketing professional',
      task: 'Conduct a competitive analysis based on publicly available information.',
      tones: ['Professional', 'Direct'],
      format: 'Table',
      researchTopic: 'Stripe vs Paddle for SaaS billing',
      researchDepth: 'Detailed breakdown',
      researchQuestions: 'What are the exact fee differences?\nWhich is easier to integrate for a React app?\nHow do they handle global tax compliance?',
    }
  }
];

export const PromptBuilderPage = () => {
  const [category, setCategory] = useState('writing');
  const [fields, setFields] = useState<Record<string, any>>({
    role: '',
    task: '',
    tones: [],
    format: '',
    // writing
    writingTopic: '',
    writingAudience: '',
    writingLength: '',
    writingInclude: '',
    writingAvoid: '',
    // research
    researchTopic: '',
    researchDepth: '',
    researchQuestions: '',
    researchSources: '',
    // coding
    codingLanguage: '',
    codingTask: '',
    codingExperience: '',
    codingStyle: '',
    // email
    emailType: '',
    emailRecipient: '',
    emailGoal: '',
    emailInclude: '',
    emailLength: '',
    // social
    socialPlatform: '',
    socialGoal: '',
    socialTopic: '',
    socialHashtags: false,
    // strategy
    strategyType: '',
    strategyChallenge: '',
    strategyConstraints: '',
    strategyOutcome: '',
    // analysis
    analysisTopic: '',
    analysisType: '',
    analysisFormat: '',
    // creative
    creativeType: '',
    creativeStyle: '',
    creativeMessage: '',
  });

  const [copied, setCopied] = useState(false);
  const [showEmailCapture, setShowEmailCapture] = useState(false);
  const [emailDismissed, setEmailDismissed] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Claude Prompt Builder — domskysolutions.com";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', "Build perfect Claude prompts in seconds. Fill in the fields, get a professional prompt ready to copy. Free — no signup required.");
    }
    
    const dismissed = sessionStorage.getItem('promptBuilderEmailDismissed');
    if (dismissed) {
      setEmailDismissed(true);
    }
  }, []);

  const handleFieldChange = (key: string, value: any) => {
    setFields(prev => ({ ...prev, [key]: value }));
  };

  const toggleTone = (tone: string) => {
    setFields(prev => {
      const tones = prev.tones.includes(tone) 
        ? prev.tones.filter((t: string) => t !== tone)
        : [...prev.tones, tone];
      return { ...prev, tones };
    });
  };

  const generatePrompt = () => {
    let prompt = "";
    
    if (fields.role) {
      prompt += `You are helping a ${fields.role}.\n\n`;
    }
    
    if (fields.task) {
      prompt += `${fields.task}\n\n`;
    }
    
    if (fields.tones.length > 0) {
      prompt += `Write in a ${fields.tones.join(', ')} tone.\n\n`;
    }
    
    if (category === 'writing') {
      if (fields.writingAudience) prompt += `The audience is ${fields.writingAudience}.\n\n`;
      if (fields.writingTopic) prompt += `The topic is: ${fields.writingTopic}\n\n`;
      if (fields.writingLength) prompt += `Length: ${fields.writingLength}\n\n`;
      if (fields.writingInclude) prompt += `Include these points:\n${fields.writingInclude}\n\n`;
      if (fields.writingAvoid) prompt += `Avoid: ${fields.writingAvoid}\n\n`;
    } else if (category === 'research') {
      if (fields.researchTopic) prompt += `Topic to research: ${fields.researchTopic}\n\n`;
      if (fields.researchDepth) prompt += `Depth: ${fields.researchDepth}\n\n`;
      if (fields.researchQuestions) prompt += `Specific questions to answer:\n${fields.researchQuestions}\n\n`;
      if (fields.researchSources) prompt += `Sources to consider: ${fields.researchSources}\n\n`;
    } else if (category === 'coding') {
      if (fields.codingLanguage) prompt += `Programming language: ${fields.codingLanguage}\n\n`;
      if (fields.codingTask) prompt += `What to build or fix:\n${fields.codingTask}\n\n`;
      if (fields.codingExperience) prompt += `My experience level: ${fields.codingExperience}\n\n`;
      if (fields.codingStyle) prompt += `Code style preference: ${fields.codingStyle}\n\n`;
    } else if (category === 'email') {
      if (fields.emailType) prompt += `Email type: ${fields.emailType}\n\n`;
      if (fields.emailRecipient) prompt += `Recipient: ${fields.emailRecipient}\n\n`;
      if (fields.emailGoal) prompt += `Main goal: ${fields.emailGoal}\n\n`;
      if (fields.emailInclude) prompt += `Key information to include:\n${fields.emailInclude}\n\n`;
      if (fields.emailLength) prompt += `Length: ${fields.emailLength}\n\n`;
    } else if (category === 'social') {
      if (fields.socialPlatform) prompt += `Platform: ${fields.socialPlatform}\n\n`;
      if (fields.socialGoal) prompt += `Post goal: ${fields.socialGoal}\n\n`;
      if (fields.socialTopic) prompt += `Topic or hook: ${fields.socialTopic}\n\n`;
      if (fields.socialHashtags) prompt += `Please include relevant hashtags.\n\n`;
    } else if (category === 'strategy') {
      if (fields.strategyType) prompt += `Business or project type: ${fields.strategyType}\n\n`;
      if (fields.strategyChallenge) prompt += `Strategic challenge:\n${fields.strategyChallenge}\n\n`;
      if (fields.strategyConstraints) prompt += `Constraints to consider: ${fields.strategyConstraints}\n\n`;
      if (fields.strategyOutcome) prompt += `Desired outcome: ${fields.strategyOutcome}\n\n`;
    } else if (category === 'analysis') {
      if (fields.analysisTopic) prompt += `What to analyze:\n${fields.analysisTopic}\n\n`;
      if (fields.analysisType) prompt += `Analysis type: ${fields.analysisType}\n\n`;
      if (fields.analysisFormat) prompt += `Output format preference: ${fields.analysisFormat}\n\n`;
    } else if (category === 'creative') {
      if (fields.creativeType) prompt += `Creative type: ${fields.creativeType}\n\n`;
      if (fields.creativeStyle) prompt += `Style inspiration: ${fields.creativeStyle}\n\n`;
      if (fields.creativeMessage) prompt += `Key message: ${fields.creativeMessage}\n\n`;
    }
    
    if (fields.format) {
      prompt += `Format the output as ${fields.format}.\n\n`;
    }
    
    if (prompt.trim().length > 0) {
      prompt += `Begin your response directly without preamble or explanation.`;
    }
    
    return prompt.trim();
  };

  const generatedPrompt = generatePrompt();

  const handleCopy = () => {
    if (!generatedPrompt) return;
    navigator.clipboard.writeText(generatedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    
    if (!emailDismissed) {
      setShowEmailCapture(true);
    }
  };

  const handleClear = () => {
    setFields({
      role: '', task: '', tones: [], format: '',
      writingTopic: '', writingAudience: '', writingLength: '', writingInclude: '', writingAvoid: '',
      researchTopic: '', researchDepth: '', researchQuestions: '', researchSources: '',
      codingLanguage: '', codingTask: '', codingExperience: '', codingStyle: '',
      emailType: '', emailRecipient: '', emailGoal: '', emailInclude: '', emailLength: '',
      socialPlatform: '', socialGoal: '', socialTopic: '', socialHashtags: false,
      strategyType: '', strategyChallenge: '', strategyConstraints: '', strategyOutcome: '',
      analysisTopic: '', analysisType: '', analysisFormat: '',
      creativeType: '', creativeStyle: '', creativeMessage: '',
    });
  };

  const loadExample = (example: any) => {
    setCategory(example.category);
    handleClear();
    setFields(prev => ({ ...prev, ...example.fields }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const dismissEmail = () => {
    setShowEmailCapture(false);
    setEmailDismissed(true);
    sessionStorage.setItem('promptBuilderEmailDismissed', 'true');
  };

  const getFilledFieldsCount = () => {
    let count = 0;
    if (fields.role) count++;
    if (fields.task) count++;
    if (fields.tones.length > 0) count++;
    if (fields.format) count++;
    
    const catFields = Object.keys(fields).filter(k => k.startsWith(category));
    catFields.forEach(k => {
      if (typeof fields[k] === 'boolean') {
        if (fields[k]) count++;
      } else if (fields[k] && fields[k].length > 0) {
        count++;
      }
    });
    return count;
  };

  const filledCount = getFilledFieldsCount();
  let strengthLabel = "Weak";
  let strengthColor = "bg-red-500";
  let strengthText = "Add more detail for better results";
  let strengthBars = 2;
  
  if (filledCount >= 6) {
    strengthLabel = "Strong";
    strengthColor = "bg-brand-cyan";
    strengthText = "Great prompt — ready to use!";
    strengthBars = 10;
  } else if (filledCount >= 4) {
    strengthLabel = "Good";
    strengthColor = "bg-green-400";
    strengthText = "Looking good, add a bit more context if needed";
    strengthBars = 7;
  } else if (filledCount >= 2) {
    strengthLabel = "Basic";
    strengthColor = "bg-brand-amber";
    strengthText = "Add more detail for better results";
    strengthBars = 4;
  }

  return (
    <div className="pt-32 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block bg-brand-cyan/10 text-brand-cyan text-xs font-bold font-mono px-3 py-1 rounded-full mb-6 uppercase tracking-wider border border-brand-cyan/20">
            FREE TOOL — NO SIGNUP REQUIRED
          </div>
          <h1 className="text-4xl md:text-6xl font-bold font-mono mb-6">Claude Prompt Builder</h1>
          <p className="text-xl text-gray-400 mb-8">
            Stop writing prompts from scratch. Fill in what you need — get a professional Claude prompt ready to copy in seconds.
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm font-medium text-gray-300">
            <span className="flex items-center gap-1"><CheckCircle2 size={16} className="text-brand-cyan" /> Works with Claude Free & Pro</span>
            <span className="flex items-center gap-1"><CheckCircle2 size={16} className="text-brand-cyan" /> No signup required</span>
            <span className="flex items-center gap-1"><CheckCircle2 size={16} className="text-brand-cyan" /> Copy with one click</span>
            <span className="flex items-center gap-1"><CheckCircle2 size={16} className="text-brand-cyan" /> Built by domskysolutions.com</span>
          </div>
        </div>

        {/* Category Selector */}
        <div className="flex overflow-x-auto pb-4 mb-8 hide-scrollbar gap-3 justify-start md:justify-center">
          {PROMPT_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-full font-bold whitespace-nowrap transition-colors border ${
                category === cat.id 
                  ? 'bg-brand-cyan text-[#0D0F12] border-brand-cyan' 
                  : 'bg-[#1a1a2e] text-gray-400 border-gray-800 hover:border-gray-600'
              }`}
            >
              <span>{cat.icon}</span> {cat.label}
            </button>
          ))}
        </div>

        {/* Two Column Layout */}
        <div className="flex flex-col lg:flex-row gap-8 mb-20">
          
          {/* Left Column - Inputs */}
          <div className="w-full lg:w-1/2 space-y-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-8"
              >
                {/* Global Fields */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-gray-400 font-medium mb-2">Your Role / Context</label>
                    <select 
                      value={fields.role}
                      onChange={(e) => handleFieldChange('role', e.target.value)}
                      className="w-full bg-[#1a1a2e] border border-gray-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-cyan transition-colors appearance-none"
                    >
                      <option value="">Who are you?</option>
                      {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-400 font-medium mb-2">What do you need Claude to do?</label>
                    <textarea 
                      value={fields.task}
                      onChange={(e) => handleFieldChange('task', e.target.value)}
                      placeholder="e.g. Write a blog post introduction about AI tools"
                      className="w-full bg-[#1a1a2e] border border-gray-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-cyan transition-colors min-h-[100px]"
                    />
                    <div className="text-right text-xs text-gray-500 mt-1">{fields.task.length} characters</div>
                  </div>

                  <div>
                    <label className="block text-gray-400 font-medium mb-2">Tone of voice (select multiple)</label>
                    <div className="flex flex-wrap gap-2">
                      {TONES.map(tone => (
                        <button
                          key={tone}
                          onClick={() => toggleTone(tone)}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
                            fields.tones.includes(tone)
                              ? 'bg-brand-cyan/10 text-brand-cyan border-brand-cyan'
                              : 'bg-[#1a1a2e] text-gray-400 border-gray-800 hover:border-gray-600'
                          }`}
                        >
                          {tone}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-400 font-medium mb-2">How should Claude format the output?</label>
                    <div className="flex flex-wrap gap-2">
                      {FORMATS.map(format => (
                        <button
                          key={format}
                          onClick={() => handleFieldChange('format', fields.format === format ? '' : format)}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
                            fields.format === format
                              ? 'bg-brand-cyan/10 text-brand-cyan border-brand-cyan'
                              : 'bg-[#1a1a2e] text-gray-400 border-gray-800 hover:border-gray-600'
                          }`}
                        >
                          {format}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="h-px bg-gray-800 w-full my-8"></div>

                {/* Category Specific Fields */}
                <div className="space-y-6">
                  {category === 'writing' && (
                    <>
                      <div>
                        <label className="block text-gray-400 font-medium mb-2">Topic or title</label>
                        <input type="text" value={fields.writingTopic} onChange={e => handleFieldChange('writingTopic', e.target.value)} className="w-full bg-[#1a1a2e] border border-gray-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-cyan transition-colors" />
                      </div>
                      <div>
                        <label className="block text-gray-400 font-medium mb-2">Target audience</label>
                        <input type="text" value={fields.writingAudience} onChange={e => handleFieldChange('writingAudience', e.target.value)} className="w-full bg-[#1a1a2e] border border-gray-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-cyan transition-colors" />
                      </div>
                      <div>
                        <label className="block text-gray-400 font-medium mb-2">Word count / length</label>
                        <select value={fields.writingLength} onChange={e => handleFieldChange('writingLength', e.target.value)} className="w-full bg-[#1a1a2e] border border-gray-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-cyan transition-colors appearance-none">
                          <option value="">Select length</option>
                          <option value="Short (under 300 words)">Short (under 300 words)</option>
                          <option value="Medium (300-600 words)">Medium (300-600 words)</option>
                          <option value="Long (600-1000 words)">Long (600-1000 words)</option>
                          <option value="Very long (1000+ words)">Very long (1000+ words)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-gray-400 font-medium mb-2">Include these points</label>
                        <textarea value={fields.writingInclude} onChange={e => handleFieldChange('writingInclude', e.target.value)} className="w-full bg-[#1a1a2e] border border-gray-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-cyan transition-colors min-h-[100px]" />
                      </div>
                      <div>
                        <label className="block text-gray-400 font-medium mb-2">Avoid</label>
                        <input type="text" value={fields.writingAvoid} onChange={e => handleFieldChange('writingAvoid', e.target.value)} className="w-full bg-[#1a1a2e] border border-gray-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-cyan transition-colors" />
                      </div>
                    </>
                  )}

                  {category === 'research' && (
                    <>
                      <div>
                        <label className="block text-gray-400 font-medium mb-2">Topic to research</label>
                        <input type="text" value={fields.researchTopic} onChange={e => handleFieldChange('researchTopic', e.target.value)} className="w-full bg-[#1a1a2e] border border-gray-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-cyan transition-colors" />
                      </div>
                      <div>
                        <label className="block text-gray-400 font-medium mb-2">Depth of research</label>
                        <select value={fields.researchDepth} onChange={e => handleFieldChange('researchDepth', e.target.value)} className="w-full bg-[#1a1a2e] border border-gray-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-cyan transition-colors appearance-none">
                          <option value="">Select depth</option>
                          <option value="Quick overview">Quick overview</option>
                          <option value="Detailed breakdown">Detailed breakdown</option>
                          <option value="Expert level deep dive">Expert level deep dive</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-gray-400 font-medium mb-2">Specific questions to answer</label>
                        <textarea value={fields.researchQuestions} onChange={e => handleFieldChange('researchQuestions', e.target.value)} className="w-full bg-[#1a1a2e] border border-gray-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-cyan transition-colors min-h-[100px]" />
                      </div>
                      <div>
                        <label className="block text-gray-400 font-medium mb-2">Sources to consider</label>
                        <select value={fields.researchSources} onChange={e => handleFieldChange('researchSources', e.target.value)} className="w-full bg-[#1a1a2e] border border-gray-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-cyan transition-colors appearance-none">
                          <option value="">Select sources</option>
                          <option value="Any sources">Any sources</option>
                          <option value="Focus on recent (last 6 months)">Focus on recent (last 6 months)</option>
                          <option value="Academic / credible only">Academic / credible only</option>
                          <option value="Industry specific">Industry specific</option>
                        </select>
                      </div>
                    </>
                  )}

                  {category === 'coding' && (
                    <>
                      <div>
                        <label className="block text-gray-400 font-medium mb-2">Programming language</label>
                        <select value={fields.codingLanguage} onChange={e => handleFieldChange('codingLanguage', e.target.value)} className="w-full bg-[#1a1a2e] border border-gray-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-cyan transition-colors appearance-none">
                          <option value="">Select language</option>
                          <option value="JavaScript">JavaScript</option>
                          <option value="Python">Python</option>
                          <option value="React">React</option>
                          <option value="TypeScript">TypeScript</option>
                          <option value="HTML/CSS">HTML/CSS</option>
                          <option value="PHP">PHP</option>
                          <option value="SQL">SQL</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-gray-400 font-medium mb-2">What to build or fix</label>
                        <textarea value={fields.codingTask} onChange={e => handleFieldChange('codingTask', e.target.value)} className="w-full bg-[#1a1a2e] border border-gray-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-cyan transition-colors min-h-[100px]" />
                      </div>
                      <div>
                        <label className="block text-gray-400 font-medium mb-2">Experience level</label>
                        <select value={fields.codingExperience} onChange={e => handleFieldChange('codingExperience', e.target.value)} className="w-full bg-[#1a1a2e] border border-gray-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-cyan transition-colors appearance-none">
                          <option value="">Select experience</option>
                          <option value="Explain like I'm not a developer">Explain like I'm not a developer</option>
                          <option value="I understand basics">I understand basics</option>
                          <option value="I am comfortable with code">I am comfortable with code</option>
                          <option value="Advanced developer">Advanced developer</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-gray-400 font-medium mb-2">Code style preference</label>
                        <select value={fields.codingStyle} onChange={e => handleFieldChange('codingStyle', e.target.value)} className="w-full bg-[#1a1a2e] border border-gray-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-cyan transition-colors appearance-none">
                          <option value="">Select style</option>
                          <option value="Clean and simple">Clean and simple</option>
                          <option value="Well commented">Well commented</option>
                          <option value="Production ready">Production ready</option>
                          <option value="Quick prototype">Quick prototype</option>
                        </select>
                      </div>
                    </>
                  )}

                  {category === 'email' && (
                    <>
                      <div>
                        <label className="block text-gray-400 font-medium mb-2">Email type</label>
                        <select value={fields.emailType} onChange={e => handleFieldChange('emailType', e.target.value)} className="w-full bg-[#1a1a2e] border border-gray-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-cyan transition-colors appearance-none">
                          <option value="">Select type</option>
                          <option value="Cold outreach">Cold outreach</option>
                          <option value="Follow up">Follow up</option>
                          <option value="Newsletter issue">Newsletter issue</option>
                          <option value="Client proposal">Client proposal</option>
                          <option value="Rejection response">Rejection response</option>
                          <option value="Thank you">Thank you</option>
                          <option value="Introduction">Introduction</option>
                          <option value="Sales email">Sales email</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-gray-400 font-medium mb-2">Recipient</label>
                        <input type="text" value={fields.emailRecipient} onChange={e => handleFieldChange('emailRecipient', e.target.value)} className="w-full bg-[#1a1a2e] border border-gray-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-cyan transition-colors" />
                      </div>
                      <div>
                        <label className="block text-gray-400 font-medium mb-2">Main goal of email</label>
                        <input type="text" value={fields.emailGoal} onChange={e => handleFieldChange('emailGoal', e.target.value)} className="w-full bg-[#1a1a2e] border border-gray-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-cyan transition-colors" />
                      </div>
                      <div>
                        <label className="block text-gray-400 font-medium mb-2">Key information to include</label>
                        <textarea value={fields.emailInclude} onChange={e => handleFieldChange('emailInclude', e.target.value)} className="w-full bg-[#1a1a2e] border border-gray-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-cyan transition-colors min-h-[100px]" />
                      </div>
                      <div>
                        <label className="block text-gray-400 font-medium mb-2">Email length</label>
                        <select value={fields.emailLength} onChange={e => handleFieldChange('emailLength', e.target.value)} className="w-full bg-[#1a1a2e] border border-gray-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-cyan transition-colors appearance-none">
                          <option value="">Select length</option>
                          <option value="Very short (3-4 lines)">Very short (3-4 lines)</option>
                          <option value="Short (under 150 words)">Short (under 150 words)</option>
                          <option value="Medium (150-300 words)">Medium (150-300 words)</option>
                          <option value="Long (300+ words)">Long (300+ words)</option>
                        </select>
                      </div>
                    </>
                  )}

                  {category === 'social' && (
                    <>
                      <div>
                        <label className="block text-gray-400 font-medium mb-2">Platform</label>
                        <div className="flex flex-wrap gap-2">
                          {['X/Twitter', 'LinkedIn', 'Instagram', 'Facebook', 'TikTok', 'YouTube desc'].map(platform => (
                            <button
                              key={platform}
                              onClick={() => handleFieldChange('socialPlatform', fields.socialPlatform === platform ? '' : platform)}
                              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
                                fields.socialPlatform === platform
                                  ? 'bg-brand-cyan/10 text-brand-cyan border-brand-cyan'
                                  : 'bg-[#1a1a2e] text-gray-400 border-gray-800 hover:border-gray-600'
                              }`}
                            >
                              {platform}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="block text-gray-400 font-medium mb-2">Post goal</label>
                        <select value={fields.socialGoal} onChange={e => handleFieldChange('socialGoal', e.target.value)} className="w-full bg-[#1a1a2e] border border-gray-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-cyan transition-colors appearance-none">
                          <option value="">Select goal</option>
                          <option value="Drive engagement / comments">Drive engagement / comments</option>
                          <option value="Drive clicks to website">Drive clicks to website</option>
                          <option value="Build authority">Build authority</option>
                          <option value="Share a tip or insight">Share a tip or insight</option>
                          <option value="Promote something">Promote something</option>
                          <option value="Tell a story">Tell a story</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-gray-400 font-medium mb-2">Topic or hook</label>
                        <input type="text" value={fields.socialTopic} onChange={e => handleFieldChange('socialTopic', e.target.value)} className="w-full bg-[#1a1a2e] border border-gray-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-cyan transition-colors" />
                      </div>
                      <div className="flex items-center gap-3">
                        <label className="text-gray-400 font-medium">Include hashtags?</label>
                        <button
                          onClick={() => handleFieldChange('socialHashtags', !fields.socialHashtags)}
                          className={`w-12 h-6 rounded-full transition-colors relative ${fields.socialHashtags ? 'bg-brand-cyan' : 'bg-gray-700'}`}
                        >
                          <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${fields.socialHashtags ? 'left-7' : 'left-1'}`}></span>
                        </button>
                        <span className="text-white text-sm">{fields.socialHashtags ? 'Yes' : 'No'}</span>
                      </div>
                    </>
                  )}

                  {category === 'strategy' && (
                    <>
                      <div>
                        <label className="block text-gray-400 font-medium mb-2">Business or project type</label>
                        <input type="text" value={fields.strategyType} onChange={e => handleFieldChange('strategyType', e.target.value)} className="w-full bg-[#1a1a2e] border border-gray-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-cyan transition-colors" />
                      </div>
                      <div>
                        <label className="block text-gray-400 font-medium mb-2">Strategic challenge</label>
                        <textarea value={fields.strategyChallenge} onChange={e => handleFieldChange('strategyChallenge', e.target.value)} className="w-full bg-[#1a1a2e] border border-gray-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-cyan transition-colors min-h-[100px]" />
                      </div>
                      <div>
                        <label className="block text-gray-400 font-medium mb-2">Constraints to consider</label>
                        <input type="text" value={fields.strategyConstraints} onChange={e => handleFieldChange('strategyConstraints', e.target.value)} placeholder="budget, time, team size" className="w-full bg-[#1a1a2e] border border-gray-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-cyan transition-colors" />
                      </div>
                      <div>
                        <label className="block text-gray-400 font-medium mb-2">Desired outcome</label>
                        <input type="text" value={fields.strategyOutcome} onChange={e => handleFieldChange('strategyOutcome', e.target.value)} className="w-full bg-[#1a1a2e] border border-gray-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-cyan transition-colors" />
                      </div>
                    </>
                  )}

                  {category === 'analysis' && (
                    <>
                      <div>
                        <label className="block text-gray-400 font-medium mb-2">What to analyze</label>
                        <textarea value={fields.analysisTopic} onChange={e => handleFieldChange('analysisTopic', e.target.value)} placeholder="paste content or describe what to analyze" className="w-full bg-[#1a1a2e] border border-gray-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-cyan transition-colors min-h-[100px]" />
                      </div>
                      <div>
                        <label className="block text-gray-400 font-medium mb-2">Analysis type</label>
                        <select value={fields.analysisType} onChange={e => handleFieldChange('analysisType', e.target.value)} className="w-full bg-[#1a1a2e] border border-gray-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-cyan transition-colors appearance-none">
                          <option value="">Select type</option>
                          <option value="Pros and cons">Pros and cons</option>
                          <option value="SWOT analysis">SWOT analysis</option>
                          <option value="Competitive comparison">Competitive comparison</option>
                          <option value="Risk assessment">Risk assessment</option>
                          <option value="Performance review">Performance review</option>
                          <option value="Content audit">Content audit</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-gray-400 font-medium mb-2">Output format preference</label>
                        <select value={fields.analysisFormat} onChange={e => handleFieldChange('analysisFormat', e.target.value)} className="w-full bg-[#1a1a2e] border border-gray-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-cyan transition-colors appearance-none">
                          <option value="">Select format</option>
                          <option value="Summary">Summary</option>
                          <option value="Table">Table</option>
                          <option value="Detailed report">Detailed report</option>
                          <option value="Bullet points">Bullet points</option>
                        </select>
                      </div>
                    </>
                  )}

                  {category === 'creative' && (
                    <>
                      <div>
                        <label className="block text-gray-400 font-medium mb-2">Creative type</label>
                        <select value={fields.creativeType} onChange={e => handleFieldChange('creativeType', e.target.value)} className="w-full bg-[#1a1a2e] border border-gray-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-cyan transition-colors appearance-none">
                          <option value="">Select type</option>
                          <option value="Blog post">Blog post</option>
                          <option value="Story / narrative">Story / narrative</option>
                          <option value="Product description">Product description</option>
                          <option value="Tagline / headline">Tagline / headline</option>
                          <option value="Video script">Video script</option>
                          <option value="Podcast outline">Podcast outline</option>
                          <option value="Ad copy">Ad copy</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-gray-400 font-medium mb-2">Style inspiration</label>
                        <input type="text" value={fields.creativeStyle} onChange={e => handleFieldChange('creativeStyle', e.target.value)} placeholder="describe the style or mention a reference" className="w-full bg-[#1a1a2e] border border-gray-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-cyan transition-colors" />
                      </div>
                      <div>
                        <label className="block text-gray-400 font-medium mb-2">Key message</label>
                        <input type="text" value={fields.creativeMessage} onChange={e => handleFieldChange('creativeMessage', e.target.value)} className="w-full bg-[#1a1a2e] border border-gray-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-cyan transition-colors" />
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column - Preview */}
          <div className="w-full lg:w-1/2">
            <div className="sticky top-28">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white font-mono">Your Claude Prompt</h2>
                <div className="flex items-center gap-3">
                  <button onClick={handleClear} className="px-4 py-2 rounded border border-gray-700 text-gray-300 hover:bg-gray-800 transition-colors text-sm font-bold">
                    Clear All
                  </button>
                  <button 
                    onClick={handleCopy}
                    className={`px-4 py-2 rounded font-bold transition-colors text-sm flex items-center gap-2 ${
                      copied ? 'bg-green-500 text-white' : 'bg-brand-amber text-brand-bg hover:bg-yellow-400'
                    }`}
                  >
                    {copied ? <CheckCircle2 size={16} /> : <Copy size={16} />}
                    {copied ? 'Copied! ✓' : 'Copy Prompt'}
                  </button>
                </div>
              </div>

              <div className="bg-[#0D0F12] border border-brand-cyan rounded-lg p-6 min-h-[400px] max-h-[600px] overflow-y-auto">
                {generatedPrompt ? (
                  <motion.div 
                    key={generatedPrompt}
                    initial={{ opacity: 0.8 }}
                    animate={{ opacity: 1 }}
                    className="font-mono text-[16px] leading-[1.8] text-white whitespace-pre-wrap"
                  >
                    {generatedPrompt}
                  </motion.div>
                ) : (
                  <div className="text-gray-500 italic font-mono text-[16px] leading-[1.8]">
                    Your prompt will appear here as you fill in the fields above.<br/><br/>
                    Start by selecting a category and filling in what you need.
                  </div>
                )}
              </div>

              {/* Prompt Quality Indicator */}
              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-white">Prompt Strength</span>
                  <span className={`text-sm font-bold ${strengthColor.replace('bg-', 'text-')}`}>{strengthLabel}</span>
                </div>
                <div className="flex gap-1 h-2 mb-2">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div 
                      key={i} 
                      className={`flex-1 rounded-full ${i < strengthBars ? strengthColor : 'bg-gray-800'}`}
                    ></div>
                  ))}
                </div>
                <div className="text-xs text-gray-400">{strengthText}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Example Prompts Section */}
        <div className="mb-20 pt-12 border-t border-gray-800">
          <h2 className="text-2xl font-bold font-mono text-white mb-8 text-center">Need inspiration? Try these examples</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {EXAMPLES.map((ex, i) => (
              <div key={i} className="bg-brand-surface border border-gray-800 rounded-xl p-6 flex flex-col items-start">
                <div className="bg-brand-amber/10 text-brand-amber text-xs font-bold px-2 py-1 rounded uppercase tracking-wider mb-4">
                  {PROMPT_CATEGORIES.find(c => c.id === ex.category)?.label}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{ex.title}</h3>
                <p className="text-gray-400 text-sm mb-6 flex-1">{ex.desc}</p>
                <button 
                  onClick={() => loadExample(ex)}
                  className="text-brand-cyan font-bold text-sm hover:underline flex items-center gap-1"
                >
                  Use this template →
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Email Capture Slide-up */}
      <AnimatePresence>
        {showEmailCapture && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 w-full z-50 p-4 pointer-events-none"
          >
            <div className="max-w-3xl mx-auto bg-[#1a1a2e] border border-brand-cyan shadow-2xl rounded-xl p-6 relative pointer-events-auto flex flex-col sm:flex-row items-center gap-6">
              <button 
                onClick={dismissEmail}
                className="absolute top-3 right-3 text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>
              
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-1">Want 50 more proven Claude prompts?</h3>
                <p className="text-gray-400 text-sm">Get our free prompt swipe file.</p>
              </div>
              
              <div className="w-full sm:w-auto">
                <ConvertKitForm 
                  className="flex gap-2"
                  inputClassName="bg-[#0D0F12] border border-gray-700 rounded px-4 py-2 text-white focus:outline-none focus:border-brand-cyan transition-colors w-full sm:w-64"
                  buttonClassName="bg-brand-cyan text-brand-bg px-4 py-2 rounded font-bold hover:bg-teal-400 transition-colors whitespace-nowrap"
                  buttonText="Send Me the Prompts →"
                  successMessage="Check your inbox! 🎉"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
