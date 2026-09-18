import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Layers, Printer, RotateCcw } from 'lucide-react';
import { ConvertKitForm } from '../components/ConvertKitForm';
import { Answers, buildPlan, emptyAnswers, questions, toggleExisting } from '../data/stackBuilder';

export function StackBuilderPage() {
  const [stage, setStage] = useState<'intro' | 'questions' | 'calculating' | 'results'>('intro');
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>(emptyAnswers);
  const heading = useRef<HTMLHeadingElement>(null);
  const started = useRef(false);
  useEffect(() => {
    if (started.current) heading.current?.focus();
    started.current = true;
  }, [stage, step]);
  useEffect(() => {
    if (stage !== 'calculating') return;
    const timer = window.setTimeout(() => setStage('results'), 400);
    return () => window.clearTimeout(timer);
  }, [stage]);
  function restart() { setAnswers(emptyAnswers()); setStep(0); setStage('intro'); }
  const question = questions[step];
  const selected = question.key === 'existing' ? answers.existing : [answers[question.key]];
  const valid = selected.some(Boolean);
  const plan = stage === 'results' ? buildPlan(answers) : null;
  return <main className="stack-builder">
    <div className="sb-brand"><Layers size={20} aria-hidden="true" /><span>domskysolutions <span className="sb-brand-divider">/</span> Practical planning</span></div>
    {stage === 'intro' && <div className="sb-intro">
      <div><p className="sb-eyebrow">Simple Business Stack Builder</p>
        <h1 ref={heading} tabIndex={-1}>Build your business with <span>fewer, better tools.</span></h1>
        <p className="sb-lead">Answer five short questions and get a practical software plan showing what you need now, what you can add later, and what you can safely skip.</p>
        <p className="sb-trust">Free to use. No AI analysis. No complicated setup.</p>
        <button className="sb-primary" onClick={() => setStage('questions')}>Build my stack <ArrowRight size={19} aria-hidden="true" /></button>
        <p className="sb-small">Takes approximately 2 minutes</p>
      </div>
      <aside className="sb-preview" aria-label="What your plan includes"><p className="sb-eyebrow">A smaller stack. A clearer next step.</p>
        {[['01', 'Use now', 'The essentials for your next goal.'], ['02', 'Add later', 'Useful tools with a clear reason to wait.'], ['03', 'Skip for now', 'Subscriptions you don’t need to start.']].map(([n,t,d]) => <div className="sb-preview-row" key={n}><span>{n}</span><div><h2>{t}</h2><p>{d}</p></div></div>)}
        <p className="sb-small">Your answers stay in this page. No email needed to see or print your plan.</p>
      </aside>
    </div>}
    {stage === 'questions' && <section className="sb-assessment">
      <div className="sb-progress-label"><span>Step {step + 1} of 5</span><span>{['Business', 'Goal', 'Existing tools', 'Budget', 'Your challenge'][step]}</span></div>
      <progress value={step + 1} max={5} aria-label="Assessment progress" />
      <h1 ref={heading} tabIndex={-1} id="sb-question">{question.title}</h1>
      <p className="sb-small">{question.key === 'existing' ? 'Choose all that apply.' : 'Choose the answer that fits you best right now.'}</p>
      <form onSubmit={e => { e.preventDefault(); if (valid) step === 4 ? setStage('calculating') : setStep(step + 1); }}>
        <fieldset aria-labelledby="sb-question" className="sb-options"><legend className="sr-only">{question.title}</legend>
          {question.options.map(([value, label]) => <label key={value} className={`sb-option ${selected.includes(value) ? 'sb-selected' : ''}`}>
            <input type={question.key === 'existing' ? 'checkbox' : 'radio'} name={question.key} value={value} checked={selected.includes(value)} onChange={() => setAnswers(a => question.key === 'existing' ? { ...a, existing: toggleExisting(a.existing, value) } : { ...a, [question.key]: value })} />
            <span>{label}</span>{selected.includes(value) && <Check size={18} aria-hidden="true" />}
          </label>)}
        </fieldset>
        <div className="sb-actions"><button type="button" className="sb-secondary" onClick={() => step ? setStep(step - 1) : setStage('intro')}>Back</button>
          <button className="sb-primary" type="submit" disabled={!valid}>{step === 4 ? 'See my plan' : 'Continue'} <ArrowRight size={18} aria-hidden="true" /></button></div>
      </form>
      <button className="sb-text-button" onClick={restart}><RotateCcw size={14} aria-hidden="true" />Start again</button>
    </section>}
    {stage === 'calculating' && <section className="sb-assessment" role="status"><h1 ref={heading} tabIndex={-1}>Putting your plan together…</h1><p>Matching your answers to practical, local rules.</p></section>}
    {plan && <section className="sb-results">
      <p className="sb-eyebrow">Your simple business stack</p><h1 ref={heading} tabIndex={-1}>A practical plan.<br /><span>One step at a time.</span></h1>
      <p className="sb-lead">Start with what supports your next goal. Keep useful tools you already have.</p>
      <dl className="sb-summary">{questions.map(q => <div key={q.key}><dt>{q.key === 'existing' ? 'Already have' : q.key === 'problem' ? 'Challenge' : q.key[0].toUpperCase() + q.key.slice(1)}</dt><dd>{q.options.filter(([v]) => q.key === 'existing' ? answers.existing.includes(v) : answers[q.key] === v).map(([,l]) => l).join(', ')}</dd></div>)}</dl>
      <div className="sb-actions sb-no-print"><button className="sb-primary" onClick={() => window.print()}><Printer size={18} aria-hidden="true" />Print / save PDF</button><button className="sb-secondary" onClick={() => { setStep(0); setStage('questions'); }}>Edit answers</button><button className="sb-text-button" onClick={restart}>Start again</button></div>
      <div className="sb-next"><p className="sb-eyebrow">Your next practical step</p><h2>{plan.next}</h2></div>
      <div className="sb-plan-grid">{(['now', 'later', 'skip'] as const).map((status, index) => <section className="sb-plan-column" key={status}>
        <div className="sb-column-title"><span>0{index + 1}</span><h2>{['Use now', 'Add later', 'Skip for now'][index]}</h2></div>
        {plan.items.filter(i => i.status === status).map(item => <article key={item.id} className="sb-plan-item"><h3>{item.name}</h3>{item.owned && <span className="sb-owned">Already have it{status !== 'now' ? ' · Review before adding more' : ' · Keep using it'}</span>}<p>{item.explanation}</p></article>)}
        {!plan.items.some(i => i.status === status) && <p>Choose a small business idea to test before committing to new software.</p>}
      </section>)}</div>
      <div className="sb-notes"><section><h2>Your budget approach</h2><p>{plan.budget}</p></section><section><h2>Keep your stack simple</h2><p>{plan.focus}</p><p>“Add later” and “skip” mean no new purchase now. Don’t cancel a working tool without checking dependencies and exporting your data.</p></section></div>
      <details className="sb-method sb-no-print"><summary>How this plan is made</summary><p>Your business type establishes a starting set of categories. Your next goal adds the tools for that task. Existing tools are marked so you can reuse them; budget and challenges shape your next step. Advanced software stays optional. These are transparent planning rules, not AI analysis or a review of your accounts.</p></details>
      <aside className="sb-email sb-no-print"><div><p className="sb-eyebrow">Optional · The Weekly Edge</p><h2>Keep building with fewer tools.</h2><p>Get practical tool guides and workflows by email. Your plan is already available above, with no signup required.</p></div><ConvertKitForm className="sb-signup" inputClassName="sb-email-input" buttonClassName="sb-primary" buttonText="Subscribe to The Weekly Edge" successMessage="Thanks for subscribing. Check your inbox for any confirmation email. Your plan remains available above." /></aside>
      <p className="sb-no-print">Ready to compare your options? <Link className="sb-link" to="/reviews">Read our software reviews <ArrowRight size={15} aria-hidden="true" /></Link></p>
      <p className="sb-print-brand">Simple tools for building a small online business. · domskysolutions.com/stack-builder</p>
    </section>}
    {stage !== 'results' && <p className="sb-tagline">Simple tools for building a small online business.</p>}
  </main>;
}
