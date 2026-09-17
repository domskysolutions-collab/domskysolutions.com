import assert from 'node:assert/strict';
import { buildPlan, emptyAnswers, isComplete, questions, toggleExisting } from '../src/data/stackBuilder';
assert.deepEqual(toggleExisting(['website', 'email'], 'none'), ['none']);
assert.deepEqual(toggleExisting(['none'], 'website'), ['website']);
assert.deepEqual(toggleExisting(['website'], 'website'), []);
assert.equal(isComplete(emptyAnswers()), false);
assert.throws(() => buildPlan(emptyAnswers()));
const base = { business: 'newsletter', goal: 'audience', existing: ['none'], budget: 'free', problem: 'start' };
let plan = buildPlan(base);
assert.deepEqual(plan.items.filter(i => i.status === 'now').map(i => i.id), ['email']);
assert.equal(plan.items.find(i => i.id === 'payments')?.status, 'later');
assert.match(plan.next, /signup form/);
plan = buildPlan({ ...base, existing: ['email'] });
assert.equal(plan.items.find(i => i.id === 'email')?.owned, true);
assert.match(plan.next, /already have/);
assert.match(buildPlan({ ...base, problem: 'cost' }).next, /subscriptions/);
assert.match(buildPlan({ ...base, problem: 'integration' }).next, /integrations/);
assert.equal(isComplete({ ...base, existing: ['none', 'email'] }), false);
assert.equal(isComplete({ ...base, business: 'invalid' }), false);
let count = 0;
for (const [business] of questions[0].options) for (const [goal] of questions[1].options) for (const [budget] of questions[3].options) for (const [problem] of questions[4].options) {
  for (let mask = 0; mask < 128; mask++) {
    const existing = questions[2].options.slice(0, 7).filter((_, i) => mask & (1 << i)).map(([id]) => id);
    const answers = { business, goal, budget, problem, existing: existing.length ? existing : ['none'] };
    const result = buildPlan(answers);
    assert.equal(result.items.length, 11);
    assert.equal(new Set(result.items.map(i => i.id)).size, 11);
    assert.ok(result.items.every(i => i.explanation.length > 0));
    assert.ok(result.next.length > 0);
    assert.deepEqual(result, buildPlan(answers));
    count++;
  }
}
console.log(`Stack builder: ${count} answer combinations passed, plus ownership, exclusivity and challenge checks.`);
