import assert from 'node:assert/strict';
import { calculateSaasAudit, describeMonthlyResult, formatCurrency, parseSaasAuditValues } from '../src/data/saasAudit';

const zeroExtras = { oneTimeMigrationCash:0, externalServiceCash:0 };

assert.deepEqual(calculateSaasAudit({
  oldRecurringCash: 104,
  retainedRecurringCash: 74,
  replacementRecurringCash: 0,
  oneTimeMigrationCash: 30,
  externalServiceCash: 45,
}), {
  monthlyNetReduction: 30,
  annualizedRecurringReduction: 360,
  firstYearNetCashReduction: 330,
  externalServiceCash:45,
});

assert.deepEqual(calculateSaasAudit({
  oldRecurringCash: 50,
  retainedRecurringCash: 30,
  replacementRecurringCash: 20,
  ...zeroExtras,
}), {
  monthlyNetReduction: 0,
  annualizedRecurringReduction: 0,
  firstYearNetCashReduction: 0,
  externalServiceCash:0,
});
assert.match(describeMonthlyResult(0, '€0'), /No recurring cash change/);

assert.deepEqual(calculateSaasAudit({
  oldRecurringCash: 50,
  retainedRecurringCash: 30,
  replacementRecurringCash: 28,
  ...zeroExtras,
}), {
  monthlyNetReduction: -8,
  annualizedRecurringReduction: -96,
  firstYearNetCashReduction: -96,
  externalServiceCash:0,
});
assert.match(describeMonthlyResult(-8, '€8'), /costs €8 more/);

const withoutMigration = calculateSaasAudit({ oldRecurringCash: 100, retainedRecurringCash: 70, replacementRecurringCash: 10, ...zeroExtras });
const withMigration = calculateSaasAudit({ oldRecurringCash: 100, retainedRecurringCash: 70, replacementRecurringCash: 10, oneTimeMigrationCash:75, externalServiceCash:0 });
assert.equal(withMigration.monthlyNetReduction, withoutMigration.monthlyNetReduction);
assert.equal(withMigration.annualizedRecurringReduction, withoutMigration.annualizedRecurringReduction);
assert.equal(withMigration.firstYearNetCashReduction, withoutMigration.firstYearNetCashReduction - 75);

const withExternalService = calculateSaasAudit({ oldRecurringCash:100, retainedRecurringCash:70, replacementRecurringCash:10, oneTimeMigrationCash:0, externalServiceCash:500 });
assert.equal(withExternalService.monthlyNetReduction, withoutMigration.monthlyNetReduction);
assert.equal(withExternalService.firstYearNetCashReduction, withoutMigration.firstYearNetCashReduction);
assert.equal(withExternalService.externalServiceCash, 500);

const withOwnerTime = { oldRecurringCash:100, retainedRecurringCash:70, replacementRecurringCash:10, ...zeroExtras, ownerHoursBefore:40, ownerHoursAfter:5 };
assert.equal(calculateSaasAudit(withOwnerTime).monthlyNetReduction, 20);

assert.deepEqual(parseSaasAuditValues({ oldRecurringCash:'', retainedRecurringCash:' ', replacementRecurringCash:'', oneTimeMigrationCash:'', externalServiceCash:'' }).input,
  { oldRecurringCash:0, retainedRecurringCash:0, replacementRecurringCash:0, oneTimeMigrationCash:0, externalServiceCash:0 });
assert(parseSaasAuditValues({ oldRecurringCash:'nope', retainedRecurringCash:'0', replacementRecurringCash:'0', oneTimeMigrationCash:'0', externalServiceCash:'0' }).errors.oldRecurringCash);
assert(parseSaasAuditValues({ oldRecurringCash:'-1', retainedRecurringCash:'0', replacementRecurringCash:'0', oneTimeMigrationCash:'0', externalServiceCash:'0' }).errors.oldRecurringCash);
assert.equal(calculateSaasAudit({ oldRecurringCash:1_000_000_000, retainedRecurringCash:250_000_000, replacementRecurringCash:250_000_000, ...zeroExtras }).monthlyNetReduction, 500_000_000);
assert.equal(formatCurrency(1234.5, 'EUR'), '€1,234.50');
assert.equal(formatCurrency(1234.5, 'USD'), '$1,234.50');
assert.equal(formatCurrency(1234.5, 'GBP'), '£1,234.50');

assert.throws(() => calculateSaasAudit({ oldRecurringCash: -1, retainedRecurringCash: 0, replacementRecurringCash: 0, ...zeroExtras }), /non-negative/);
assert.throws(() => calculateSaasAudit({ oldRecurringCash: Number.NaN, retainedRecurringCash: 0, replacementRecurringCash: 0, ...zeroExtras }), /finite/);

console.log('PASS: SaaS audit positive, zero, negative, blank, invalid, large, migration, owner-time, external-service and currency cases.');
