import { parseAnswers, recommend, segments, summaryFor, tagsFor } from '../src/data/leanStack.js';
type Env = Record<string, string | undefined>;

type KitSubscriber = { id?: number; state?: string };

async function kitPost(fetcher: typeof fetch, apiKey: string, path: string, body: Record<string, unknown>) {
  const response = await fetcher(`https://api.kit.com/v4${path}`, {
    method:'POST',
    headers:{ 'Content-Type':'application/json', 'X-Kit-Api-Key':apiKey },
    signal:AbortSignal.timeout(10000),
    body:JSON.stringify(body),
  });
  const data = await response.json().catch(() => null);
  if (!response.ok) throw new Error(`Kit rejected ${path}`);
  return data;
}

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
  const apiKey = env.KIT_API_KEY;
  const form = env.KIT_STACK_FORM_ID;
  const sequence = env.KIT_STACK_SEQUENCE_ID;
  if (!apiKey || !form || !/^\d+$/.test(form) || !sequence || !/^\d+$/.test(sequence) || !tags || segments.some(tag => !Number.isSafeInteger(tags[tag]) || tags[tag] <= 0)) {
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
    const created = await kitPost(fetcher, apiKey, '/subscribers', {
      email_address:input.email.trim(), first_name:input.firstName.trim() || null, state:'inactive', fields,
    });
    const subscriber = created?.subscriber as KitSubscriber | undefined;
    if (!Number.isSafeInteger(subscriber?.id) || subscriber!.id! <= 0) throw new Error('Kit returned no subscriber');
    const id = subscriber!.id!;
    const tagIds = tagsFor(answers).map(tag => tags[tag]);
    const [formResult] = await Promise.all([
      kitPost(fetcher, apiKey, `/forms/${form}/subscribers/${id}`, { referrer:'https://www.domskysolutions.com/#stack-finder' }),
      ...tagIds.map(tagId => kitPost(fetcher, apiKey, `/tags/${tagId}/subscribers/${id}`, {})),
      kitPost(fetcher, apiKey, `/sequences/${sequence}/subscribers/${id}`, {}),
    ]);
    const formSubscriber = formResult?.subscriber as KitSubscriber | undefined;
    return { status:200, body:{ ok:true, pendingConfirmation:(formSubscriber?.state || subscriber?.state) !== 'active' } };
  } catch { return { status:502, body:{ error:'Email provider is unavailable. Try again.' } }; }
}
