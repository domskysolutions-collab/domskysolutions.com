export type SaasAuditInput = {
  oldRecurringCash: number;
  retainedRecurringCash: number;
  replacementRecurringCash: number;
  oneTimeMigrationCash: number;
  externalServiceCash: number;
};

export type SaasAuditResult = {
  monthlyNetReduction: number;
  annualizedRecurringReduction: number;
  firstYearNetCashReduction: number;
  externalServiceCash: number;
};

export type SaasAuditField = keyof SaasAuditInput;
export type SaasAuditFormValues = Record<SaasAuditField, string>;

export function parseSaasAuditValues(values: SaasAuditFormValues) {
  const input = {} as SaasAuditInput;
  const errors: Partial<Record<SaasAuditField, string>> = {};
  for (const [key, raw] of Object.entries(values) as [SaasAuditField, string][]) {
    const value = raw.trim() === '' ? 0 : Number(raw);
    if (!Number.isFinite(value) || value < 0) errors[key] = 'Enter zero or a positive number.';
    else input[key] = value;
  }
  return Object.keys(errors).length ? { input:null, errors } : { input, errors };
}

export const currencies = {
  EUR: { symbol:'€', locale:'en-IE' },
  USD: { symbol:'$', locale:'en-US' },
  GBP: { symbol:'£', locale:'en-GB' },
} as const;
export type Currency = keyof typeof currencies;
export function formatCurrency(value: number, currency: Currency) {
  return new Intl.NumberFormat(currencies[currency].locale, { style:'currency', currency, maximumFractionDigits:2 }).format(Math.abs(value));
}

export function calculateSaasAudit(input: SaasAuditInput): SaasAuditResult {
  for (const [label, value] of Object.entries(input)) {
    if (!Number.isFinite(value) || value < 0) {
      throw new Error(`${label} must be a finite, non-negative number.`);
    }
  }

  const monthlyNetReduction = input.oldRecurringCash
    - input.retainedRecurringCash
    - input.replacementRecurringCash;
  const annualizedRecurringReduction = monthlyNetReduction * 12;
  const firstYearNetCashReduction = annualizedRecurringReduction - input.oneTimeMigrationCash;

  return { monthlyNetReduction, annualizedRecurringReduction, firstYearNetCashReduction, externalServiceCash:input.externalServiceCash };
}

export function describeMonthlyResult(value: number, formattedAmount: string) {
  if (value > 0) return `Your proposed stack reduces recurring software cash by ${formattedAmount} per month.`;
  if (value < 0) return `The proposed stack costs ${formattedAmount} more per month. Proceed only if the added coverage or reduced risk justifies it.`;
  return 'No recurring cash change. Compare coverage, risk and time before switching.';
}
