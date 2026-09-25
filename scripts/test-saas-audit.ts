import assert from 'node:assert/strict';
import { calculateSaasAudit, describeMonthlyResult } from '../src/data/saasAudit';

assert.deepEqual(calculateSaasAudit({
  oldRecurringCash: 104,
  retainedRecurringCash: 74,
  replacementRecurringCash: 0,
  oneTimeMigrationCash: 30,
}), {
  monthlyNetReduction: 30,
  annualizedRecurringReduction: 360,
  firstYearNetCashReduction: 330,
});

assert.deepEqual(calculateSaasAudit({
  oldRecurringCash: 50,
  retainedRecurringCash: 30,
  replacementRecurringCash: 20,
  oneTimeMigrationCash: 0,
}), {
  monthlyNetReduction: 0,
  annualizedRecurringReduction: 0,
  firstYearNetCashReduction: 0,
});
assert.match(describeMonthlyResult(0, '€0'), /No recurring cash change/);

assert.deepEqual(calculateSaasAudit({
  oldRecurringCash: 50,
  retainedRecurringCash: 30,
  replacementRecurringCash: 28,
  oneTimeMigrationCash: 0,
}), {
  monthlyNetReduction: -8,
  annualizedRecurringReduction: -96,
  firstYearNetCashReduction: -96,
});
assert.match(describeMonthlyResult(-8, '€8'), /costs €8 more/);

const withoutMigration = calculateSaasAudit({ oldRecurringCash: 100, retainedRecurringCash: 70, replacementRecurringCash: 10, oneTimeMigrationCash: 0 });
const withMigration = calculateSaasAudit({ oldRecurringCash: 100, retainedRecurringCash: 70, replacementRecurringCash: 10, oneTimeMigrationCash: 75 });
assert.equal(withMigration.monthlyNetReduction, withoutMigration.monthlyNetReduction);
assert.equal(withMigration.annualizedRecurringReduction, withoutMigration.annualizedRecurringReduction);
assert.equal(withMigration.firstYearNetCashReduction, withoutMigration.firstYearNetCashReduction - 75);

assert.throws(() => calculateSaasAudit({ oldRecurringCash: -1, retainedRecurringCash: 0, replacementRecurringCash: 0, oneTimeMigrationCash: 0 }), /non-negative/);
assert.throws(() => calculateSaasAudit({ oldRecurringCash: Number.NaN, retainedRecurringCash: 0, replacementRecurringCash: 0, oneTimeMigrationCash: 0 }), /finite/);

console.log('PASS: SaaS audit positive, zero, negative, migration and invalid-input cases.');
