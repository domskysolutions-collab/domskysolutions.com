import { parseAnswers, recommend, segments, summaryFor, tagsFor } from '../src/data/leanStack';
type Env = Record<string, string | undefined>;
export async function subscribeStack(body: unknown, env: Env, fetcher: typeof fetch = fetch) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) return { status:400, body:{ error:'Invalid request.' } };
  const input = body as Record<string, unknown>;
  const answers = parseAnswers(input.answers);
  if (typeof input.email !== 'string' || input.email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email.trim()) ||
      typeof input.firstName !== 'string' || input.firstName.length > 80 || input.consent !== true || !answers) {
    return { status:400, body:{ error:'Check your email, consent and quiz answers.' } };
  }
  let tags: Record<string, number>;
  try { tags = JSON.parse(env.KIT_STACK_TAG_IDS || '{}'); } catch { tags = {}; }
  const form = env.KIT_STACK_FORM_ID;
  if (!env.CONVERTKIT_API_KEY || !form || !/^\d+$/.test(form) || !tags || segments.some(tag => !Number.isSafeInteger(tags[tag]) || tags[tag] <= 0)) {
    return { status:503, body:{ error:'Quiz signup is not configured.' } };
  }
  const result = recommend(answers);
  const fields = {
    stack_business:answers.business, stack_team:answers.team, stack_goal:answers.goal,
    stack_tasks:answers.tasks.join(', '), stack_budget:answers.budget, stack_existing:answers.existing.join(', '),
    stack_technical:answers.technical, stack_result:result.name, stack_summary:summaryFor(result),
    stack_consent:'Results and occasional practical emails; consent v1',
  };
  try {
    const response = await fetcher(`https://api.convertkit.com/v3/forms/${form}/subscribe`, {
      method:'POST', headers:{ 'Content-Type':'application/json' }, signal:AbortSignal.timeout(10000),
      body:JSON.stringify({ api_key:env.CONVERTKIT_API_KEY, email:input.email.trim(), first_name:input.firstName.trim(), tags:tagsFor(answers).map(tag => tags[tag]), fields }),
    });
    const data = await response.json();
    if (!response.ok || !data?.subscription?.subscriber?.id) return { status:502, body:{ error:'Email provider did not accept the signup.' } };
    // Inactive is a valid form subscription waiting for the form's incentive confirmation.
    return { status:200, body:{ ok:true, pendingConfirmation:data.subscription.state !== 'active' } };
  } catch { return { status:502, body:{ error:'Email provider is unavailable. Try again.' } }; }
}
