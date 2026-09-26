import assert from 'node:assert/strict';
import fs from 'node:fs';
import { emptyAnswers, parseAnswers, questions, questionValid, recommend, selection, tagsFor, segments, summaryFor } from '../src/data/leanStack';
import { createQuizSubscriber, restoreQuiz, SubmissionBusyError } from '../src/lib/stackQuiz';
import { subscribeStack } from '../server/stackSubscription';
import handler from '../api/stack-subscribe';
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
assert.equal(restoreQuiz(JSON.stringify({version:1,answers:base,step:6,stage:'partial'}))?.stage,'partial');
assert.equal(restoreQuiz(JSON.stringify({version:1,answers:emptyAnswers(),step:5,stage:'partial'}))?.step,0);

const env={CONVERTKIT_API_KEY:'unit-test-only',KIT_STACK_FORM_ID:'123',KIT_STACK_TAG_IDS:JSON.stringify(Object.fromEntries(segments.map((s,i)=>[s,i+1])))};
const payload={email:'qa@example.com',firstName:'QA',consent:true,answers:base};
let received:any;
const success=(async (url,options)=>{received={url,body:JSON.parse(String(options?.body))};return new Response(JSON.stringify({subscription:{state:'inactive',subscriber:{id:1}}}),{status:200});}) as typeof fetch;
const res=await subscribeStack(payload,env,success);
assert.equal(res.status,200);assert.equal(res.body.pendingConfirmation,true);
assert.equal(received.body.fields.stack_result,'Lean Content Builder');
assert.equal(received.body.tags.length,4);assert.equal(received.body.api_key,'unit-test-only');
assert(!('businessOther' in received.body.fields));
assert.equal((await subscribeStack({...payload,consent:false},env,success)).status,400);
assert.equal((await subscribeStack({...payload,email:4},env,success)).status,400);
assert.equal((await subscribeStack(payload,{},success)).status,503);
assert.equal((await subscribeStack(payload,{...env,KIT_STACK_TAG_IDS:'invalid'},success)).status,503);
assert.equal((await subscribeStack(payload,env,async()=>new Response('{}',{status:422}))).status,502);
assert.equal((await subscribeStack(payload,env,async()=>new Response('{}',{status:200}))).status,502);
assert.equal((await subscribeStack(payload,env,async()=>{throw Error('network');})).status,502);
let calls=0;let release!:()=>void;
const submit=createQuizSubscriber(async()=>{calls++;await new Promise<void>(r=>release=r);return new Response(JSON.stringify({ok:true,pendingConfirmation:true}));});
const first=submit(payload);await assert.rejects(submit(payload),SubmissionBusyError);release();await first;assert.equal(calls,1);
await assert.rejects(createQuizSubscriber(async()=>new Response('{}',{status:503}))(payload),/not configured/);
await assert.rejects(createQuizSubscriber(async()=>new Response('{}',{status:200}))(payload));
const reply:any={code:0,headers:{},setHeader(k:string,v:string){this.headers[k]=v;},status(c:number){this.code=c;return this;},json(b:unknown){return b;}};
await handler({method:'GET',headers:{}} as any,reply);assert.equal(reply.code,405);
await handler({method:'POST',headers:{'content-type':'text/plain'}} as any,reply);assert.equal(reply.code,415);
await handler({method:'POST',headers:{'content-type':'application/json'},body:'{' } as any,reply);assert.equal(reply.code,400);
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
console.log(`PASS: ${count} recommendation combinations; four decision states, dated facts, first-task fixtures, persistence, API handling, retirement redirects and overlap prevention.`);


for (const status of [200, 500, 502, 504]) {
  await assert.rejects(createQuizSubscriber(async()=>new Response('A server error has occurred',{status}))(payload), /couldn’t complete your signup/);
}
await assert.rejects(createQuizSubscriber(async()=>new Response('<html>Error</html>',{status:503}))(payload), /not configured/);
await assert.rejects(createQuizSubscriber(async()=>{throw new TypeError('Failed to fetch');})(payload), /couldn’t reach the signup service/);
let attempts=0;
const retry=createQuizSubscriber(async()=>++attempts===1 ? new Response('A server error',{status:500}) : new Response('{"ok":true}'));
await assert.rejects(retry(payload), /couldn’t complete/);
assert.deepEqual(await retry(payload),{pendingConfirmation:false});
