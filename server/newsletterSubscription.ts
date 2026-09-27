import { failure, fetchJsonWithTimeout, safeApiWarning, validEmail, type ApiResult } from './apiSecurity.js';

type Env = Record<string, string | undefined>;
export async function subscribeNewsletter(body: unknown, env: Env, fetcher: typeof fetch = fetch, timeoutMs = 10000): Promise<ApiResult<{ ok: true; pendingConfirmation: boolean }>> {
  if (!body || typeof body !== 'object' || Array.isArray(body)) return failure(400, 'invalid_request', 'Check your email and consent.');
  const input = body as Record<string, unknown>;
  if (!validEmail(input.email) || input.marketingConsent !== true) return failure(400, 'invalid_request', 'Check your email and consent.');
  const form = env.CONVERTKIT_FORM_ID;
  const tag = Number(env.CONVERTKIT_NEWSLETTER_TAG_ID);
  if (!env.CONVERTKIT_API_KEY || !form || !/^\d+$/.test(form) || !Number.isSafeInteger(tag) || tag <= 0) return failure(503, 'not_configured', 'Newsletter signup is not configured.');
  const provider = await fetchJsonWithTimeout(`https://api.convertkit.com/v3/forms/${form}/subscribe`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ api_key: env.CONVERTKIT_API_KEY, email: input.email.trim(), tags: [tag] }),
  }, fetcher, timeoutMs);
  if (provider.status !== 200) { safeApiWarning('newsletter_provider_failure', provider.status); return provider; }
  const data = provider.body as { subscription?: { state?: string; subscriber?: { id?: unknown } } };
  if (!Number.isSafeInteger(data.subscription?.subscriber?.id)) { safeApiWarning('newsletter_provider_shape'); return failure(502, 'provider_unavailable', 'The email provider returned an invalid response.'); }
  return { status: 200, body: { ok: true, pendingConfirmation: data.subscription?.state !== 'active' } };
}
