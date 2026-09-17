import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Mail, Sparkles } from 'lucide-react';

const questions = [
  { id: 'work', title: 'What takes most of your time?', options: [['content', 'Content and marketing'], ['admin', 'Admin and client work'], ['research', 'Research and learning'], ['building', 'Building products or automations']] },
  { id: 'budget', title: 'What is your monthly AI budget?', options: [['lean', 'Under $50'], ['steady', '$50–150'], ['growth', '$150–300'], ['flexible', '$300+']] },
  { id: 'goal', title: 'What would you like to improve first?', options: [['save', 'Cut overlapping subscriptions'], ['speed', 'Move faster every week'], ['quality', 'Produce better work'], ['automate', 'Automate repetitive tasks']] },
  { id: 'experience', title: 'How do you currently use AI?', options: [['new', 'I am just getting started'], ['curious', 'I use a few tools casually'], ['regular', 'AI is part of my daily work'], ['advanced', 'I build repeatable AI workflows']] },
] as const;

type Answers = Record<string, string>;

function getReport(answers: Answers) {
  const work = answers.work;
  const budget = answers.budget;
  const goal = answers.goal;
  const starter = work === 'content' ? ['ChatGPT or Claude', 'Canva', 'ConvertKit'] : work === 'admin' ? ['ChatGPT or Claude', 'Notion', 'Zapier'] : work === 'research' ? ['Perplexity', 'Claude', 'Readwise'] : ['Claude', 'Cursor', 'Make'];
  const workflow = goal === 'save' ? 'Audit every subscription quarterly and cancel tools that solve the same job.' : goal === 'automate' ? 'Capture repeated tasks in a simple trigger → AI step → delivery workflow.' : goal === 'quality' ? 'Create one reusable project brief and give it to your AI tools every time.' : 'Batch your weekly planning, first drafts, and repurposing into one focused session.';
  const savings = budget === 'lean' ? 15 : budget === 'steady' ? 42 : budget === 'growth' ? 68 : 95;
  return { starter, workflow, savings, avoid: budget === 'lean' ? 'Avoid stacking multiple premium assistants before one becomes part of your daily workflow.' : 'Avoid adding another general-purpose assistant until you have measured the overlap in your current stack.' };
}

export function StackScorecardPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [email, setEmail] = useState('');
  const [newsletter, setNewsletter] = useState(false);
  const [status, setStatus] = useState<'idle'|'loading'|'success'|'error'>('idle');
  const report = useMemo(() => getReport(answers), [answers]);
  const current = questions[step];

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) return setStatus('error');
    setStatus('loading');
    try {
      const response = await fetch('/api/subscribe', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, scorecard: answers, newsletter }) });
      setStatus(response.ok ? 'success' : 'error');
    } catch { setStatus('error'); }
  }

  return <main className="min-h-screen bg-grid-pattern pt-28 pb-20 px-4 sm:px-6">
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12"><div className="inline-flex items-center gap-2 text-brand-cyan font-mono text-xs uppercase tracking-[0.2em] mb-4"><Sparkles size={15}/> Free personalized assessment</div><h1 className="text-3xl sm:text-5xl font-bold text-white mb-5">Find your best AI tool stack in 5 minutes.</h1><p className="text-gray-300 max-w-2xl mx-auto text-lg">Get a personalized recommendation based on your work, budget, and goals—not another generic listicle.</p></div>
      {step < questions.length && <section className="max-w-2xl mx-auto bg-brand-surface border border-brand-border rounded-2xl p-6 sm:p-10 shadow-2xl"><div className="flex justify-between text-xs font-mono text-gray-400 mb-8"><span>QUESTION {step + 1} OF {questions.length}</span><span>{Math.round((step / questions.length) * 100)}% complete</span></div><div className="h-1 bg-white/10 rounded-full mb-10"><div className="h-1 bg-brand-cyan rounded-full transition-all" style={{ width: `${((step + 1) / questions.length) * 100}%` }}/></div><h2 className="text-2xl text-white font-bold mb-6">{current.title}</h2><div className="grid gap-3">{current.options.map(([value, label]) => <button key={value} onClick={() => { setAnswers({...answers, [current.id]: value}); setStep(step + 1); }} className="text-left p-4 rounded-xl border border-white/10 hover:border-brand-cyan hover:bg-brand-cyan/10 transition-colors text-gray-200">{label}<ArrowRight size={16} className="float-right mt-1 text-brand-cyan"/></button>)}</div></section>}
      {step === questions.length && status !== 'success' && <section className="max-w-2xl mx-auto bg-brand-surface border border-brand-border rounded-2xl p-6 sm:p-10"><div className="flex items-center gap-2 text-brand-cyan font-mono text-sm mb-4"><Check size={18}/> Your scorecard is ready</div><h2 className="text-2xl text-white font-bold mb-3">Where should we send your personalized report?</h2><p className="text-gray-400 mb-7">See your recommended starter stack, estimated savings, next workflow, and tools to avoid.</p><form onSubmit={submit} className="space-y-4"><label className="block text-sm text-gray-300" htmlFor="scorecard-email">Email address</label><div className="flex flex-col sm:flex-row gap-3"><input id="scorecard-email" type="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" className="flex-1 rounded-lg bg-black/30 border border-white/15 px-4 py-3 text-white"/><button disabled={status==='loading'} className="rounded-lg bg-brand-cyan text-brand-bg px-5 py-3 font-bold hover:bg-brand-amber transition-colors">{status==='loading' ? 'Sending…' : 'Email my report'}</button></div><label className="flex gap-3 items-start text-sm text-gray-400"><input type="checkbox" checked={newsletter} onChange={e=>setNewsletter(e.target.checked)} className="mt-1 accent-brand-cyan"/>Yes, send me The Weekly Edge newsletter too. Unsubscribe anytime.</label>{status==='error' && <p role="alert" className="text-red-400 text-sm">We could not send that. Please check the address and try again.</p>}</form></section>}
      {status === 'success' && <section className="max-w-3xl mx-auto"><div className="bg-brand-surface border border-brand-cyan/40 rounded-2xl p-7 mb-6"><div className="flex items-center gap-2 text-brand-cyan font-mono text-sm mb-3"><Mail size={17}/> Report sent</div><h2 className="text-2xl text-white font-bold">Your recommended starter stack</h2><div className="grid sm:grid-cols-3 gap-3 mt-5">{report.starter.map(tool=><div key={tool} className="rounded-lg bg-black/20 border border-white/10 p-4 text-gray-200">{tool}</div>)}</div><p className="text-gray-300 mt-6">You could save an estimated <strong className="text-brand-cyan">${report.savings}/month</strong> by keeping your stack focused.</p></div><div className="grid sm:grid-cols-2 gap-4"><div className="bg-brand-surface border border-white/10 rounded-xl p-5"><h3 className="text-white font-bold mb-2">Automate next</h3><p className="text-gray-400 text-sm">{report.workflow}</p></div><div className="bg-brand-surface border border-white/10 rounded-xl p-5"><h3 className="text-white font-bold mb-2">Be careful with</h3><p className="text-gray-400 text-sm">{report.avoid}</p></div></div><p className="text-center text-gray-500 text-sm mt-8">Want to explore specific tools? <Link to="/tools" className="text-brand-cyan underline">Browse the free tools</Link>.</p></section>}
    </div>
  </main>;
}

