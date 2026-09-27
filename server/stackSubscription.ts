import { parseAnswers, recommend, segments, summaryFor, tagsFor } from '../src/data/leanStack.js';
import { failure, fetchJsonWithTimeout, safeApiWarning, validEmail, type ApiResult } from './apiSecurity.js';
type Env = Record<string, string | undefined>;
export async function subscribeStack(body: unknown, env: Env, fetcher: typeof fetch = fetch, timeoutMs = 10000): Promise<ApiResult<{ ok: true; pendingConfirmation: boolean; result: ReturnType<typeof recommend> }>> {
  if (!body || typeof body !== 'object' || Array.isArray(body)) return failure(400, 'invalid_request', 'Invalid request.');
  const input = body as Record<string, unknown>;
  const answers = parseAnswers(input.answers);
  if (!validEmail(input.email) || typeof input.firstName !== 'string' || input.firstName.length > 80 || input.deliveryRequested !== true || typeof input.marketingConsent !== 'boolean' || !answers) {
    return failure(400, 'invalid_request', 'Check your email, delivery request and quiz answers.');
  }
  let tags: Record<string, number>;
  try { tags = JSON.parse(env.KIT_STACK_TAG_IDS || '{}'); } catch { tags = {}; }
  const form = env.KIT_STACK_FORM_ID;
  if (!env.CONVERTKIT_API_KEY || !form || !/^\d+$/.test(form) || !tags || segments.some(tag => !Number.isSafeInteger(tags[tag]) || tags[tag] <= 0)) {
    return failure(503, 'not_configured', 'Quiz signup is not configured.');
  }
  const result = recommend(answers);
  const fields = {
    stack_business:answers.business, stack_team:answers.team, stack_goal:answers.goal,
    stack_tasks:answers.tasks.join(', '), stack_budget:answers.budget, stack_existing:answers.existing.join(', '),
    stack_technical:answers.technical, stack_result:result.name, stack_summary:summaryFor(result),
    stack_delivery_request:'On-page result and configured result-form delivery requested',
    stack_marketing_consent:input.marketingConsent ? 'Weekly Edge opt-in v1' : 'No marketing consent',
  };
  const newsletterTag = Number(env.CONVERTKIT_NEWSLETTER_TAG_ID);
  if (input.marketingConsent && (!Number.isSafeInteger(newsletterTag) || newsletterTag <= 0)) return failure(503, 'not_configured', 'Newsletter consent tagging is not configured.');
  const provider = await fetchJsonWithTimeout(`https://api.convertkit.com/v3/forms/${form}/subscribe`, {
    method:'POST', headers:{ 'Content-Type':'application/json' },
    body:JSON.stringify({ api_key:env.CONVERTKIT_API_KEY, email:input.email.trim(), first_name:input.firstName.trim(), tags:[...tagsFor(answers).map(tag => tags[tag]), ...(input.marketingConsent ? [newsletterTag] : [])], fields }),
  }, fetcher, timeoutMs);
  if (provider.status !== 200) { safeApiWarning('stack_provider_failure', provider.status); return provider; }
  const data = provider.body as { subscription?: { state?: string; subscriber?: { id?: unknown } } };
  if (!Number.isSafeInteger(data.subscription?.subscriber?.id)) { safeApiWarning('stack_provider_shape'); return failure(502, 'provider_unavailable', 'The email provider returned an invalid response.'); }
  return { status:200, body:{ ok:true, pendingConfirmation:data.subscription?.state !== 'active', result } };
}
