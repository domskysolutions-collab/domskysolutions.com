import assert from 'node:assert/strict';
import fs from 'node:fs';
import { emptyAnswers, parseAnswers, questions, questionValid, recommend, selection, tagsFor, summaryFor } from '../src/data/leanStack';
import { restoreQuiz } from '../src/lib/stackQuiz';
import { productFacts } from '../src/data/productFacts';
import { firstTaskOptions, firstTaskPlan } from '../src/data/aiReadiness';
import { retiredUtilityRedirects } from '../src/data/utilityRoutes';

const base = { ...emptyAnswers(), business:'content', team:'solo', goal:'content', tasks:['writing'], budget:'low', existing:['none'], technical:'beginner' };
assert.equal(parseAnswers(emptyAnswers()),null);
for (const q of questions) {
  assert(questionValid(base,q.key));
  assert(!questionValid({...base,[q.key]:q.multi ? [] : ''},q.key));
}
assert.deepEqual(selection(['writing','design','admin'],'sales','tasks'),['writing','design','admin']);
assert.deepEqual(selection(['assistant','email'],'none','existing'),['none']);
assert.deepEqual(selection(['none'],'assistant','existing'),['assistant']);
assert.equal(parseAnswers({...base,tasks:['writing','design','admin','sales']}),null);
assert.equal(parseAnswers({...base,existing:['none','email']}),null);
assert.equal(parseAnswers({...base,budget:'injected'}),null);
assert.equal(parseAnswers({...base,tasks:['writing','writing']}),null);
let count=0;
for(const [business] of questions[0].options) for(const [team] of questions[1].options) for(const [goal] of questions[2].options) for(const [budget] of questions[4].options) for(const [technical] of questions[6].options) {
  const a={...base,business,team,goal,budget,technical};const r=recommend(a);
  assert(r.essentials.length>=1 && r.essentials.length<=4);
  assert.equal(new Set(r.essentials.map(i=>i.category)).size,r.essentials.length);
  assert.equal(r.allowance,0);
  assert.equal(r.cost,'No universal total — calculate incremental cost after each successful trial.');
  assert(r.essentials.every(i=>['keep','trial','add','skip'].includes(i.decision)));
  if(technical==='beginner') assert(!r.essentials.some(i=>i.product?.id==='github'||i.product?.id==='make'));
  assert.equal(r.name,recommend({...a,business:'other'}).name);
  assert(summaryFor(r).includes(r.next));count++;
}
const owned=recommend({...base,existing:['assistant','workspace','email','website']});
assert(owned.essentials.every(i=>i.owned && !i.product));
assert(owned.essentials.every(i=>i.decision==='keep'));
const reduction=recommend({...base,goal:'cost-reduction',tasks:['admin'],existing:['none']});
assert(reduction.essentials.every(i=>i.decision==='skip' && !i.product));
assert(recommend({...base,budget:'high',tasks:['design']}).essentials.some(i=>i.category==='design'));
assert(recommend({...base,budget:'high',tasks:['design']}).essentials.some(i=>i.category==='design'&&i.decision==='add'));
assert(recommend({...base,tasks:['writing']}).essentials.filter(i=>i.category==='assistant').length<=1);
assert.deepEqual(tagsFor(base),['content','solo-founder','low-budget','AI-beginner']);
assert(summaryFor(recommend(base)).includes('https://domskysolutions.com/#stack-finder'));
assert(tagsFor({...base,team:'small',technical:'technical'}).includes('technical-founder'));
assert.equal(restoreQuiz('{bad'),null);
assert.equal(restoreQuiz(JSON.stringify({version:9})),null);
assert.equal(restoreQuiz(JSON.stringify({version:1,answers:base,step:6,stage:'full'}))?.stage,'full');
assert.equal(restoreQuiz(JSON.stringify({version:1,answers:emptyAnswers(),step:5,stage:'full'}))?.step,0);
for (const fact of Object.values(productFacts)) {
  assert.match(fact.verifiedOn,/^\d{4}-\d{2}-\d{2}$/);
  assert.match(fact.pricingUrl,/^https:\/\//);
  assert(!/\$|€|£/.test(fact.accessSummary),`Fixed price leaked into product facts: ${fact.id}`);
}
for (const option of firstTaskOptions) {
  const plan=firstTaskPlan(option.id);
  assert(plan.task&&plan.success&&plan.caution);
}
for(const removed of ['src/pages/StackBuilderPage.tsx','src/pages/stack-builder.css','src/data/stackBuilder.ts','scripts/test-stack-builder.ts','src/pages/tools/StackRecommenderPage.tsx','src/pages/StackScorecardPage.tsx']) assert(!fs.existsSync(removed),removed);
const redirects=JSON.parse(fs.readFileSync('vercel.json','utf8')).redirects;
for (const [source,destination] of Object.entries(retiredUtilityRedirects)) assert(redirects.some((r:any)=>r.source===source&&r.destination===destination&&r.permanent));
assert(fs.readFileSync('src/pages/HomePage.tsx','utf8').includes('<LeanStackFinder />'));
assert(!fs.readFileSync('src/components/Footer.tsx','utf8').includes('to="/stack-builder"'));
const finderSource=fs.readFileSync('src/components/LeanStackFinder.tsx','utf8');
assert(finderSource.includes("else { move('full'); trackQuiz('completed'); }"));
assert(finderSource.includes('<ConvertKitForm'));
assert(!finderSource.includes('/api/stack-subscribe'));
console.log(`PASS: ${count} recommendation combinations; four decision states, dated facts, first-task fixtures, immediate results, optional newsletter, persistence, retirement redirects and overlap prevention.`);
