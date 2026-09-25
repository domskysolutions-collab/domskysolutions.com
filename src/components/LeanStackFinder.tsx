import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Check, Copy, Printer } from 'lucide-react';
import { Answers, emptyAnswers, labelFor, questionValid, questions, recommend, selection, summaryFor } from '../data/leanStack';
import { createQuizSubscriber, initialQuiz, restoreQuiz, STORAGE_KEY, trackQuiz } from '../lib/stackQuiz';

export function LeanStackFinder() {
  const [answers, setAnswers] = useState<Answers>(emptyAnswers);
  const [stage, setStage] = useState<'intro' | 'questions' | 'partial' | 'full'>('intro');
  const [step, setStep] = useState(0);
  const [hydrated, setHydrated] = useState(false);
  const [error, setError] = useState('');
  const [storageNotice, setStorageNotice] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [consent, setConsent] = useState(false);
  const [pending, setPending] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  const [copyMessage, setCopyMessage] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const focusNext = useRef(false);
  const busy = useRef(false);
  const submit = useRef<ReturnType<typeof createQuizSubscriber> | null>(null);
  useEffect(() => {
    submit.current = createQuizSubscriber();
    try {
      const saved = restoreQuiz(localStorage.getItem(STORAGE_KEY));
      if (saved) { setAnswers(saved.answers); setStep(saved.step); setStage(saved.stage); }
    } catch { setStorageNotice('Progress can’t be saved in this browser. Keep this page open until you finish.'); }
    setHydrated(true);
  }, []);
  useEffect(() => {
    if (!hydrated) return;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ version:1, answers, step, stage:stage === 'full' ? 'partial' : stage })); }
    catch { setStorageNotice('Progress can’t be saved in this browser. Keep this page open until you finish.'); }
  }, [answers, step, stage, hydrated]);
  useEffect(() => {
    if (focusNext.current) {
      heading.current?.focus({ preventScroll:true });
      (heading.current?.closest('.lf-question, .lf-results') || heading.current)?.scrollIntoView({ block:'start', behavior:'instant' });
      focusNext.current = false;
    }
  }, [stage, step]);
  function move(nextStage: typeof stage, nextStep = step) { setError(''); focusNext.current = true; setStep(nextStep); setStage(nextStage); }
  function restart() {
    if (busy.current) return;
    const fresh = initialQuiz(); setAnswers(fresh.answers); setEmail(''); setFirstName(''); setConsent(false); setUnlocked(false); setCopyMessage('');
    move('intro',0); trackQuiz('restarted');
    try { localStorage.removeItem(STORAGE_KEY); } catch { /* In-memory restart still works. */ }
  }
  const q = questions[step];
  const selected = Array.isArray(answers[q.key]) ? answers[q.key] as string[] : [answers[q.key] as string];
  const result = stage === 'partial' || stage === 'full' ? recommend(answers) : null;
  function choose(value: string) {
    if (q.key === 'tasks' && !selected.includes(value) && selected.length >= 3) { setError('Choose up to three tasks. Deselect one before adding another.'); return; }
    setError('');
    setAnswers(a => {
      const next = { ...a, [q.key]: q.multi ? selection(a[q.key] as string[], value, q.key as 'tasks' | 'existing') : value };
      const values = Array.isArray(next[q.key]) ? next[q.key] : [next[q.key]];
      if (q.other && !values.includes('other')) (next[q.other] as string) = '';
      return next;
    });
  }
  function continueQuiz(e: React.FormEvent) {
    e.preventDefault();
    if (!questionValid(answers,q.key)) { setError(q.multi ? 'Select at least one answer to continue.' : 'Choose one answer to continue.'); return; }
    trackQuiz('question_completed',step + 1);
    if (step < 6) move('questions',step + 1);
    else { move(unlocked ? 'full' : 'partial'); trackQuiz(unlocked ? 'completed' : 'partial_result_viewed'); }
  }
  async function unlock(e: React.FormEvent) {
    e.preventDefault();
    if (busy.current) return;
    if (!consent || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) { setError('Enter a valid email and confirm you want to receive these emails.'); return; }
    busy.current = true; setPending(true); setError(''); trackQuiz('email_submitted');
    try {
      const response = await submit.current!({ email:email.trim(), firstName:firstName.trim(), consent, answers });
      setConfirmation(response.pendingConfirmation); setUnlocked(true); setEmail(''); setFirstName(''); move('full'); trackQuiz('completed');
    } catch (err) { setError(err instanceof Error ? err.message : 'Signup failed. Please try again.'); }
    finally { busy.current = false; setPending(false); }
  }
  async function copy() {
    try { await navigator.clipboard.writeText(summaryFor(result!)); setCopyMessage('Summary copied.'); }
    catch { setCopyMessage('Copy is unavailable here. Select the summary below and copy it manually.'); }
  }
  return <section id="stack-finder" className="lean-finder" aria-label="The Lean AI & SaaS Stack Finder">
    <div className="lf-shell">
      <div className="lf-masthead"><span>domskysolutions</span><span>The Lean AI &amp; SaaS Stack Finder</span></div>
      {stage === 'intro' && <div className="lf-intro">
        <div><p className="lf-eyebrow">Free personalized tool finder</p><h2 ref={heading} tabIndex={-1}>Find the Right AI and SaaS Tools for Your Business</h2>
          <p className="lf-lead">Answer seven questions and receive a personalized, budget-conscious tool stack for creating content, automating work, or building products.</p>
          <button className="lf-primary" disabled={!hydrated} onClick={() => { move('questions'); trackQuiz('started'); }}>Show My Recommended Stack <ArrowRight size={18} aria-hidden="true" /></button>
          <p className="lf-fine">About 3 minutes · Rule-based recommendations · Preview before email</p>
        </div>
        <aside className="lf-preview"><p className="lf-eyebrow">A clear plan for your next move</p>
          {[['01','What to use','A focused stack for the work that matters now.'],['02','What to keep','Get more from the tools you already have.'],['03','What to skip','Leave overlapping subscriptions and unnecessary upgrades behind.']].map(([n,t,d]) => <div key={n}><span>{n}</span><section><h3>{t}</h3><p>{d}</p></section></div>)}
          <p className="lf-trust">No bloated tool list. No generic recommendations. Just practical options matched to your goals, team, and budget.</p>
        </aside>
      </div>}
      {stage === 'questions' && <div className="lf-question" key={step}>
        <div className="lf-progress-label"><span>Question {step + 1} of 7</span><span>{Math.round(step / 7 * 100)}% complete</span></div>
        <progress max={7} value={step} aria-label={`Question ${step + 1} of 7`} />
        <h2 ref={heading} tabIndex={-1} id="lf-question-title">{q.title}</h2><p id="lf-question-help">{q.help}</p>
        <form onSubmit={continueQuiz}>
          <fieldset aria-labelledby="lf-question-title" aria-describedby="lf-question-help lf-question-error"><legend className="sr-only">{q.title}</legend>
            <div className={`lf-options ${q.key === 'technical' ? 'lf-single-column' : ''}`}>{q.options.map(([value,label]) => <label key={value} className={`lf-option ${selected.includes(value) ? 'lf-selected' : ''}`}>
              <input type={q.multi ? 'checkbox' : 'radio'} name={`lean-${q.key}`} value={value} checked={selected.includes(value)} onChange={() => choose(value)} /><span>{label}</span>{selected.includes(value) && <Check size={17} aria-hidden="true" />}
            </label>)}</div>
            {q.multi && q.key === 'tasks' && <p className="lf-fine" aria-live="polite">{answers.tasks.length} of 3 selected</p>}
            {q.other && selected.includes('other') && <label className="lf-field">Tell me a little more (optional)<input maxLength={160} value={answers[q.other] as string} onChange={e => setAnswers(a => ({ ...a, [q.other!]:e.target.value }))} /><span className="lf-fine">Keep this general. This text stays in your browser and does not affect the rules.</span></label>}
          </fieldset>
          <p className="lf-error" id="lf-question-error" role={error ? 'alert' : undefined}>{error}</p>
          <div className="lf-actions"><button type="button" className="lf-secondary" onClick={() => move(step ? 'questions' : 'intro', Math.max(0,step-1))}>Back</button><button type="submit" className="lf-primary">{step === 6 ? 'See My Stack Preview' : 'Continue'}<ArrowRight size={17} aria-hidden="true" /></button></div>
        </form>
        <button className="lf-text-button" onClick={restart}>Restart quiz</button>
      </div>}
      {result && <div className="lf-results" data-full={stage === 'full' ? 'true' : 'false'}>
        <p className="lf-eyebrow">{stage === 'full' ? 'Your recommended stack' : 'Your likely stack'}</p>
        <h2 ref={heading} tabIndex={-1}>{result.name}</h2><p className="lf-lead">{result.explanation}</p>
        <div className="lf-result-stats"><div><span>Incremental spend</span><strong>{result.cost}</strong></div><div><span>Current decisions</span><strong>{result.essentials.length} job-based categories</strong><small>Existing tools and manual workflows come first.</small></div></div>
        <p className="lf-fine">{result.budgetNote}</p>
        <div className="lf-insight"><span className="lf-eyebrow">Your keep-or-skip insight</span><p>{result.insight}</p></div>
        {stage === 'partial' ? <>
          <p>Your full result includes specific tools, lower-cost alternatives, what to skip, and where your budget will have the greatest impact.</p>
          <div className="lf-gate"><div><p className="lf-eyebrow">Your plan, in practical detail</p><h3>Unlock Your Complete Lean Stack</h3><p>Enter your email to see your personalized tool recommendations, affordable alternatives, and the tools you can safely skip.</p></div>
            <form onSubmit={unlock} aria-label="Unlock your complete stack" aria-busy={pending}>
              <label className="lf-field">First name (optional)<input name="firstName" autoComplete="given-name" maxLength={80} value={firstName} disabled={pending} onChange={e => setFirstName(e.target.value)} /></label>
              <label className="lf-field">Email address<input name="email" type="email" autoComplete="email" maxLength={254} required value={email} disabled={pending} aria-describedby="lf-consent lf-signup-error" onChange={e => setEmail(e.target.value)} /></label>
              <label className="lf-consent" id="lf-consent"><input type="checkbox" checked={consent} required disabled={pending} onChange={e => setConsent(e.target.checked)} /><span>I agree to receive my results and occasional practical emails from Domsky Solutions. I can unsubscribe at any time. <a href="/privacy">Privacy policy</a>.</span></label>
              <p className="lf-error" id="lf-signup-error" role={error ? 'alert' : undefined}>{error}</p>
              <button className="lf-primary" disabled={pending} type="submit">{pending ? 'Submitting…' : 'Show My Complete Stack'} {!pending && <ArrowRight size={17} aria-hidden="true" />}</button>
              <p className="lf-fine">Your result opens here after signup. If confirmation is enabled, check your inbox to confirm future emails.</p>
            </form>
          </div>
        </> : <>
          <p className="lf-success lf-no-print" role="status">Your complete stack is unlocked.{confirmation ? ' Check your inbox to confirm your email subscription.' : ''}</p>
          <section><h3>Best for</h3><p>{result.bestFor}</p><p className="lf-fine">{result.businessNote}</p></section>
          <div className="lf-actions lf-no-print"><button className="lf-secondary" onClick={copy}><Copy size={17} aria-hidden="true" />Copy summary</button><button className="lf-secondary" onClick={() => window.print()}><Printer size={17} aria-hidden="true" />Print / save PDF</button></div>
          {copyMessage && <div className="lf-no-print"><p role="status">{copyMessage}</p>{copyMessage.startsWith('Copy is') && <textarea aria-label="Result summary to copy" readOnly value={summaryFor(result)} rows={8} />}</div>}
          <h3 className="lf-section-title">Your keep, trial or skip plan</h3>
          <div className="lf-products">{result.essentials.map((item,index) => <article className="lf-product" key={item.category}><div className="lf-product-top"><span>0{index+1} / {item.categoryName}</span><span>{item.decision === 'keep' ? 'Keep' : item.decision === 'trial' ? 'Trial' : 'Skip purchase'}</span></div><h4>{item.name}</h4><p className="lf-price">{item.price}</p><p>{item.reason}</p><dl><dt>Current gap</dt><dd>{item.gap}</dd><dt>Trial rule</dt><dd>{item.trial}</dd><dt>Incremental cost</dt><dd>{item.incrementalCost}</dd></dl>
            {item.product ? <><dl><dt>Who should use it</dt><dd>{item.product.use}</dd><dt>Who should skip it</dt><dd>{item.product.skip}</dd><dt>Free or lower-cost alternative</dt><dd>{item.product.alternative}</dd></dl>
              <a href={item.product.url} rel={item.product.affiliate ? 'sponsored noopener noreferrer' : 'noopener noreferrer'} target="_blank" onClick={() => { if (item.product?.affiliate) trackQuiz('affiliate_link_clicked'); }}>Explore {item.product.name} <ArrowRight size={15} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a>
              <a className="lf-source" href={item.product.pricingUrl} target="_blank" rel="noopener noreferrer">Check current plans and limits<span className="sr-only"> (opens in a new tab)</span></a>
              {item.product.affiliate && <p className="lf-fine">Affiliate link: Domsky Solutions may earn a commission at no extra cost to you. Recommendations are based on suitability, not commission.</p>}
            </> : <dl><dt>Who should use it</dt><dd>{item.owned ? 'You, if your current setup covers this job reliably.' : 'People who can begin with a simple list or built-in report.'}</dd><dt>Who should skip a new purchase</dt><dd>Anyone whose current process already solves this job.</dd><dt>Lower-cost alternative</dt><dd>Keep a manual checklist or use features already included in your current software.</dd></dl>}
          </article>)}</div>
          <section className="lf-upgrade"><p className="lf-eyebrow">Optional upgrades</p><h3>Spend only where it helps.</h3><p>{result.upgrade}</p></section>
          <div className="lf-next-grid"><section><h3>What you should skip for now</h3><ul>{result.skip.map(text => <li key={text}>{text}</li>)}</ul></section><section><p className="lf-eyebrow">Your next best step</p><h3>One achievable action.</h3><p>{result.next}</p></section></div>
          <p className="lf-fine">Product free-plan information checked 25 September 2026. Limits may change; use the official pricing links before choosing a plan.</p>
        </>}
        <div className="lf-actions lf-no-print"><button className="lf-secondary" disabled={pending} onClick={() => move('questions',0)}>Edit answers</button><button className="lf-text-button" disabled={pending} onClick={restart}>Restart quiz</button></div>
        <details className="lf-method lf-no-print"><summary>How I choose your recommendations</summary><p>Your current goal and selected tasks identify up to four relevant capabilities. Existing sufficient tools are kept, manual coverage can justify skipping a purchase, and a named candidate is presented as a trial rather than a default purchase. The result does not publish a universal bundle total: it asks you to count incremental cost only after a candidate proves the gap. The quiz runs on predefined rules, not an AI service. Optional text stays in your browser and does not affect the rules. No affiliate ranking is used.</p></details>
        <p className="lf-print-footer">The Lean AI &amp; SaaS Stack Finder · domskysolutions.com</p>
      </div>}
      {storageNotice && <p className="lf-fine lf-no-print" role="status">{storageNotice}</p>}
    </div>
  </section>;
}
