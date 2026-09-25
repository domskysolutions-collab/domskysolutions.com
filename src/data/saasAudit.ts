export type SaasAuditInput = {
  oldRecurringCash: number;
  retainedRecurringCash: number;
  replacementRecurringCash: number;
  oneTimeMigrationCash: number;
};

export type SaasAuditResult = {
  monthlyNetReduction: number;
  annualizedRecurringReduction: number;
  firstYearNetCashReduction: number;
};

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

  return { monthlyNetReduction, annualizedRecurringReduction, firstYearNetCashReduction };
}

export function describeMonthlyResult(value: number, formattedAmount: string) {
  if (value > 0) return `Your proposed stack reduces recurring software cash by ${formattedAmount} per month.`;
  if (value < 0) return `The proposed stack costs ${formattedAmount} more per month. Proceed only if the added coverage or reduced risk justifies it.`;
  return 'No recurring cash change. Compare coverage, risk and time before switching.';
}
