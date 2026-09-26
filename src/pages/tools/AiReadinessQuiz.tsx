import React, { useState } from 'react';
import { ArrowRight, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { firstTaskOptions, firstTaskPlan, type FirstTaskId } from '../../data/aiReadiness';

export const AiReadinessQuiz = () => {
  const [choice, setChoice] = useState<FirstTaskId | ''>('');
  const [result, setResult] = useState<FirstTaskId | ''>('');
  const plan = result ? firstTaskPlan(result) : null;

  return <main className="min-h-screen bg-brand-bg px-4 pb-24 pt-32 text-gray-300 sm:px-6">
    <div className="mx-auto max-w-3xl">
      <Link to="/tools" className="text-sm font-mono text-brand-cyan hover:underline">← Back to free tools</Link>
      <header className="mt-8 mb-10">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-brand-cyan">Simple first-task quiz</p>
        <h1 className="font-mono text-4xl font-bold leading-tight text-white md:text-5xl">What first AI task should I try?</h1>
        <p className="mt-5 text-lg leading-8 text-gray-400">Choose one type of low-risk work. This quiz suggests a task and a success check. It does not select products or estimate time savings.</p>
      </header>

      {!plan ? <form onSubmit={event => { event.preventDefault(); if (choice) setResult(choice); }} className="rounded-2xl border border-gray-800 bg-brand-surface p-6 sm:p-8">
        <fieldset><legend className="font-mono text-2xl font-bold text-white">Where would a careful first experiment help?</legend>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">{firstTaskOptions.map(option => <label key={option.id} className={`flex min-h-20 cursor-pointer items-center gap-3 rounded-xl border p-4 ${choice === option.id ? 'border-brand-cyan bg-brand-cyan/10' : 'border-gray-700 bg-brand-bg'}`}>
            <input type="radio" name="first-task" value={option.id} checked={choice === option.id} onChange={() => setChoice(option.id)} className="h-5 w-5 accent-brand-cyan" />
            <span>{option.label}</span>
          </label>)}</div>
        </fieldset>
        <button type="submit" disabled={!choice} className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-lg bg-brand-cyan px-5 py-3 font-bold text-brand-bg disabled:cursor-not-allowed disabled:opacity-50">Show my first task <ArrowRight size={18} aria-hidden="true" /></button>
      </form> : <section aria-live="polite" className="rounded-2xl border border-brand-cyan/40 bg-brand-surface p-6 sm:p-8">
        <p className="text-xs font-bold uppercase tracking-widest text-brand-cyan">Your first experiment</p>
        <h2 className="mt-3 font-mono text-3xl font-bold text-white">{plan.title}</h2>
        <dl className="mt-7 space-y-5"><div><dt className="font-bold text-white">Task</dt><dd className="mt-2 leading-7 text-gray-300">{plan.task}</dd></div><div><dt className="font-bold text-white">Success check</dt><dd className="mt-2 leading-7 text-gray-300">{plan.success}</dd></div><div><dt className="font-bold text-white">Keep in mind</dt><dd className="mt-2 leading-7 text-gray-300">{plan.caution}</dd></div></dl>
        <div className="mt-8 flex flex-wrap gap-3"><button type="button" onClick={() => { setChoice(''); setResult(''); }} className="inline-flex min-h-12 items-center gap-2 rounded-lg border border-gray-700 px-5 py-3 font-bold text-white"><RotateCcw size={17} aria-hidden="true" /> Choose another task</button><Link to="/#stack-finder" className="inline-flex min-h-12 items-center gap-2 rounded-lg border border-brand-cyan/50 px-5 py-3 font-bold text-brand-cyan">Need help choosing tools? Open the Lean Stack Finder</Link></div>
      </section>}
    </div>
  </main>;
};
