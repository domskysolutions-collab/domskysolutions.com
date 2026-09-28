import assert from 'node:assert/strict';
import { readJsonRequest, resetRateLimits } from '../server/apiSecurity';
import { subscribeNewsletter } from '../server/newsletterSubscription';
import { generateWithAnthropic } from '../server/anthropicGeneration';
import newsletterHandler from '../api/subscribe';
import generateHandler from '../api/generate';

const errorCode = (result: { status:number; body:unknown }) => {
  assert.notEqual(result.status, 200);
  return (result.body as { code:string }).code;
};

const kitEnv = {
  CONVERTKIT_API_KEY:'test-secret-never-log', CONVERTKIT_FORM_ID:'10', CONVERTKIT_NEWSLETTER_TAG_ID:'99',
};
const kitCalls: Array<{ url:string; options?:RequestInit }> = [];
const providerSuccess = async (url: string | URL | Request, options?: RequestInit) => {
  kitCalls.push({ url:String(url), options });
  return new Response(JSON.stringify({ subscriber:{ id:123, state:'inactive' } }), { status:200, headers:{'content-type':'application/json'} });
};
const providerTimeout = async (_url: string | URL | Request, options?: RequestInit) => new Promise<Response>((_resolve, reject) => {
  const hold = setTimeout(() => reject(new Error('Mock timeout signal was not received.')), 100);
  options?.signal?.addEventListener('abort', () => { clearTimeout(hold); reject(options.signal?.reason); }, { once:true });
});

const newsletter = await subscribeNewsletter({email:'reader@example.com',marketingConsent:true}, kitEnv, providerSuccess as typeof fetch);
assert.equal(newsletter.status, 200);
assert.deepEqual(kitCalls.map(call => call.url), [
  'https://api.kit.com/v4/subscribers',
  'https://api.kit.com/v4/forms/10/subscribers',
  'https://api.kit.com/v4/tags/99/subscribers',
]);
assert(kitCalls.every(call => (call.options?.headers as Record<string,string>)['X-Kit-Api-Key'] === kitEnv.CONVERTKIT_API_KEY));
assert(!kitCalls.some(call => String(call.options?.body).includes(kitEnv.CONVERTKIT_API_KEY)));
assert.equal((await subscribeNewsletter({email:'invalid',marketingConsent:true}, kitEnv, providerSuccess as typeof fetch)).status, 400);
assert.equal((await subscribeNewsletter({email:'reader@example.com',marketingConsent:false}, kitEnv, providerSuccess as typeof fetch)).status, 400);
assert.equal((await subscribeNewsletter({email:'reader@example.com',marketingConsent:true}, kitEnv, providerTimeout as typeof fetch, 5)).status, 504);
assert.equal(errorCode(await subscribeNewsletter({email:'reader@example.com',marketingConsent:true}, kitEnv, async()=>new Response('{}',{status:429}))), 'provider_rate_limited');
assert.equal(errorCode(await subscribeNewsletter({email:'reader@example.com',marketingConsent:true}, kitEnv, async()=>new Response('{}',{status:500}))), 'provider_unavailable');

const generation = { model:'claude-sonnet-4-20250514', max_tokens:400, messages:[{role:'user',content:'Draft a short example.'}] };
let anthropicKey = '';
const anthropicSuccess = async (_url: string | URL | Request, options?: RequestInit) => { anthropicKey = String((options?.headers as Record<string,string>)['x-api-key']); return new Response('{"id":"msg_test","content":[]}',{status:200}); };
assert.equal((await generateWithAnthropic(generation,{ANTHROPIC_API_KEY:'anthropic-test-only'},anthropicSuccess as typeof fetch)).status,200);
assert.equal(anthropicKey,'anthropic-test-only');
assert.equal((await generateWithAnthropic({...generation,max_tokens:1001},{ANTHROPIC_API_KEY:'x'},anthropicSuccess as typeof fetch)).status,400);
assert.equal((await generateWithAnthropic(generation,{},anthropicSuccess as typeof fetch)).status,503);
assert.equal(errorCode(await generateWithAnthropic(generation,{ANTHROPIC_API_KEY:'x'},providerTimeout as typeof fetch,5)),'provider_timeout');
assert.equal(errorCode(await generateWithAnthropic(generation,{ANTHROPIC_API_KEY:'x'},async()=>new Response('{}',{status:429}))),'provider_rate_limited');
assert.equal(errorCode(await generateWithAnthropic(generation,{ANTHROPIC_API_KEY:'x'},async()=>new Response('{}',{status:500}))),'provider_unavailable');

assert.equal(readJsonRequest({headers:{'content-type':'text/plain'},body:{}},100).status,415);
assert.equal(readJsonRequest({headers:{'content-type':'application/json','content-length':'101'},body:{}},100).status,413);
assert.equal(readJsonRequest({headers:{'content-type':'application/json'},body:'{'},100).status,400);
assert.equal(readJsonRequest({headers:{'content-type':'application/json'},body:{text:'x'.repeat(101)}},100).status,413);

const response = () => ({ code:0, headers:{} as Record<string,string>, payload:undefined as unknown, setHeader(key:string,value:unknown){this.headers[key]=String(value);}, status(code:number){this.code=code;return this;}, json(value:unknown){this.payload=value;return value;} });
let reply = response();
await newsletterHandler({method:'POST',headers:{'content-type':'text/plain'}} as never, reply as never); assert.equal(reply.code,415);
reply=response(); await newsletterHandler({method:'POST',headers:{'content-type':'application/json','content-length':'3000'},body:{}} as never,reply as never); assert.equal(reply.code,413);
resetRateLimits();
for(let index=0;index<11;index++){reply=response();await generateHandler({method:'POST',headers:{'content-type':'application/json','x-forwarded-for':'203.0.113.10'},body:{}} as never,reply as never);}
assert.equal(reply.code,429); assert(reply.headers['Retry-After']);

console.log('PASS API security: validation, size limits, newsletter consent, provider success/timeout/rate-limit/failure mocks, stable errors and abuse controls.');
