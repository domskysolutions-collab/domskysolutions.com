import React, { useMemo, useState } from 'react';
import { ArrowRight, Calculator, CheckCircle2, Clock3, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { calculateSaasAudit, describeMonthlyResult, type SaasAuditInput } from '../../data/saasAudit';

type Currency = 'EUR' | 'USD' | 'GBP';
type InputKey = keyof SaasAuditInput;

const cashFields: Array<{ key: InputKey; label: string; help: string }> = [
  { key: 'oldRecurringCash', label: 'Current recurring software cash', help: 'Your normalized monthly total before any proposed changes.' },
  { key: 'retainedRecurringCash', label: 'Recurring cash you will keep', help: 'Subscriptions that remain after the audit, including downgraded plans.' },
  { key: 'replacementRecurringCash', label: 'New recurring replacement cash', help: 'Only new monthly costs introduced by the proposed stack.' },
  { key: 'oneTimeMigrationCash', label: 'One-time migration cash', help: 'Setup, export, contractor or other one-time switching costs.' },
];

const currencies: Record<Currency, { symbol: string; locale: string }> = {
  EUR: { symbol: '€', locale: 'en-IE' }, USD: { symbol: '$', locale: 'en-US' }, GBP: { symbol: '£', locale: 'en-GB' },
};
const parseAmount = (value: string) => value.trim() === '' ? 0 : Number(value);

export const SaasCalculatorPage = () => {
  const [currency, setCurrency] = useState<Currency>('EUR');
  const [values, setValues] = useState<Record<InputKey, string>>({ oldRecurringCash: '104', retainedRecurringCash: '74', replacementRecurringCash: '0', oneTimeMigrationCash: '30' });
  const [time, setTime] = useState({ before: '', after: '', migration: '' });
  const input = useMemo(() => Object.fromEntries(Object.entries(values).map(([key, value]) => [key, parseAmount(value)])) as SaasAuditInput, [values]);
  const result = calculateSaasAudit(input);
  const money = (value: number) => new Intl.NumberFormat(currencies[currency].locale, { style: 'currency', currency, maximumFractionDigits: 2 }).format(Math.abs(value));
  const signedMoney = (value: number) => `${value > 0 ? '+' : value < 0 ? '−' : ''}${money(value)}`;
  const resultTone = result.monthlyNetReduction > 0 ? 'border-brand-cyan/40 bg-brand-cyan/10 text-brand-cyan' : result.monthlyNetReduction < 0 ? 'border-brand-amber/40 bg-brand-amber/10 text-brand-amber' : 'border-gray-700 bg-white/[0.03] text-white';

  return (
    <main className="min-h-screen bg-brand-bg px-4 pb-24 pt-32 text-gray-300 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="max-w-3xl">
          <p className="mb-5 inline-flex rounded-full border border-brand-cyan/30 bg-brand-cyan/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-brand-cyan">Free audit tool · no signup</p>
          <h1 className="mb-6 font-mono text-4xl font-bold leading-tight text-white md:text-6xl">Audit your software stack</h1>
          <p className="text-lg leading-8 text-gray-400 md:text-xl">Test a proposed stack with transparent recurring-cash math. Keep migration cash and owner time visible instead of hiding them inside a savings claim.</p>
        </header>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.05fr_.95fr]">
          <section aria-labelledby="cash-inputs" className="rounded-2xl border border-gray-800 bg-[#111827]/70 p-6 md:p-8">
            <div className="mb-8 flex items-start justify-between gap-4">
              <div><h2 id="cash-inputs" className="font-mono text-2xl font-bold text-white">Recurring cash inputs</h2><p className="mt-2 text-sm leading-6 text-gray-400">Normalize annual plans to a monthly amount. Enter non-refundable commitments as costs, not expected refunds.</p></div>
              <select aria-label="Currency" value={currency} onChange={event => setCurrency(event.target.value as Currency)} className="rounded-lg border border-gray-700 bg-brand-bg px-3 py-2 text-sm text-white"><option value="EUR">EUR</option><option value="USD">USD</option><option value="GBP">GBP</option></select>
            </div>
            <div className="space-y-6">
              {cashFields.map(field => <div key={field.key}>
                <label htmlFor={field.key} className="mb-2 block font-semibold text-white">{field.label}</label>
                <div className="relative"><span aria-hidden="true" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">{currencies[currency].symbol}</span><input id={field.key} type="number" min="0" step="0.01" inputMode="decimal" value={values[field.key]} onChange={event => setValues(current => ({ ...current, [field.key]: event.target.value }))} className="w-full rounded-xl border border-gray-700 bg-brand-bg py-3 pl-9 pr-4 text-white outline-none transition focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/20" /></div>
                <p className="mt-2 text-sm text-gray-500">{field.help}</p>
              </div>)}
            </div>
            <div className="mt-10 border-t border-gray-800 pt-8">
              <h2 className="flex items-center gap-2 font-mono text-xl font-bold text-white"><Clock3 size={20} className="text-brand-amber" /> Track time separately</h2>
              <p className="mt-2 text-sm leading-6 text-gray-400">Hours are operational context. They do not change the software-cash result.</p>
              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                {([['before', 'Hours before / month'], ['after', 'Hours after / month'], ['migration', 'Migration hours']] as const).map(([key, label]) => <label key={key} className="text-sm text-gray-300">{label}<input type="number" min="0" step="0.25" value={time[key]} onChange={event => setTime(current => ({ ...current, [key]: event.target.value }))} className="mt-2 w-full rounded-lg border border-gray-700 bg-brand-bg px-3 py-2 text-white outline-none focus:border-brand-cyan" /></label>)}
              </div>
            </div>
          </section>

          <aside aria-live="polite" className="space-y-6">
            <section className={`rounded-2xl border p-6 md:p-8 ${resultTone}`}>
              <div className="mb-5 flex items-center gap-3"><Calculator size={24} /><h2 className="font-mono text-2xl font-bold">Audit result</h2></div>
              <p className="text-4xl font-bold md:text-5xl">{signedMoney(result.monthlyNetReduction)}<span className="ml-2 text-base font-normal opacity-75">/ month</span></p>
              <p className="mt-4 max-w-md leading-7">{describeMonthlyResult(result.monthlyNetReduction, money(result.monthlyNetReduction))}</p>
              <dl className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                <div className="rounded-xl bg-black/20 p-4"><dt className="text-sm opacity-70">Annualized recurring change</dt><dd className="mt-1 text-2xl font-bold">{signedMoney(result.annualizedRecurringReduction)}</dd></div>
                <div className="rounded-xl bg-black/20 p-4"><dt className="text-sm opacity-70">First-year cash after migration</dt><dd className="mt-1 text-2xl font-bold">{signedMoney(result.firstYearNetCashReduction)}</dd></div>
              </dl>
            </section>
            <section className="rounded-2xl border border-gray-800 bg-[#111827]/70 p-6">
              <h2 className="flex items-center gap-2 font-mono text-xl font-bold text-white"><ShieldCheck size={20} className="text-brand-cyan" /> Before changing the stack</h2>
              <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-400">{['Confirm every required job still has coverage.', 'Export data and document rollback options.', 'Check contract terms and cancellation dates.', 'Run a limited trial before removing the old tool.'].map(item => <li key={item} className="flex gap-3"><CheckCircle2 size={17} className="mt-1 shrink-0 text-brand-cyan" />{item}</li>)}</ul>
            </section>
            <Link to="/blog/replaced-saas-stack-with-ai-tools" className="group flex items-center justify-between rounded-2xl border border-brand-amber/30 bg-brand-amber/10 p-6 text-white transition hover:border-brand-amber/60"><span><span className="block text-xs font-bold uppercase tracking-widest text-brand-amber">Full guide and worksheet</span><span className="mt-2 block font-mono text-lg font-bold">Decide what to keep, downgrade, cancel or trial</span></span><ArrowRight className="shrink-0 text-brand-amber transition group-hover:translate-x-1" /></Link>
          </aside>
        </div>

        <section className="mx-auto mt-16 max-w-3xl border-t border-gray-800 pt-10">
          <h2 className="font-mono text-2xl font-bold text-white">How the calculation works</h2>
          <div className="mt-5 space-y-3 rounded-xl border border-gray-800 bg-black/20 p-5 font-mono text-sm text-gray-300"><p>Monthly net reduction = old recurring cash − retained recurring cash − new replacement recurring cash</p><p>First-year net cash reduction = monthly net reduction × 12 − one-time migration cash</p></div>
          <p className="mt-5 leading-7 text-gray-400">A positive result is a reduction in recurring software cash. Zero means the recurring totals are equal. A negative result means the proposed stack costs more. The calculation does not value owner time or promise that a provider will issue a refund.</p>
        </section>
      </div>
    </main>
  );
};
