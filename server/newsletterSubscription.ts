import { failure, fetchJsonWithTimeout, safeApiWarning, validEmail, type ApiResult } from './apiSecurity.js';

type Env = Record<string, string | undefined>;
export async function subscribeNewsletter(body: unknown, env: Env, fetcher: typeof fetch = fetch, timeoutMs = 10000): Promise<ApiResult<{ ok: true; pendingConfirmation: boolean }>> {
  if (!body || typeof body !== 'object' || Array.isArray(body)) return failure(400, 'invalid_request', 'Check your email and consent.');
  const input = body as Record<string, unknown>;
  if (!validEmail(input.email) || input.marketingConsent !== true) return failure(400, 'invalid_request', 'Check your email and consent.');
  const form = env.CONVERTKIT_FORM_ID;
  const tag = Number(env.CONVERTKIT_NEWSLETTER_TAG_ID);
  if (!env.CONVERTKIT_API_KEY || !form || !/^\d+$/.test(form) || !Number.isSafeInteger(tag) || tag <= 0) return failure(503, 'not_configured', 'Newsletter signup is not configured.');
  const email = input.email.trim();
  const headers = { 'Content-Type': 'application/json', 'X-Kit-Api-Key': env.CONVERTKIT_API_KEY };
  const subscriber = await fetchJsonWithTimeout('https://api.kit.com/v4/subscribers', {
    method: 'POST', headers, body: JSON.stringify({ email_address: email, state: 'inactive' }),
  }, fetcher, timeoutMs);
  if (subscriber.status !== 200) { safeApiWarning('newsletter_subscriber_failure', subscriber.status); return subscriber; }
  const subscriberData = subscriber.body as { subscriber?: { id?: unknown } };
  if (!Number.isSafeInteger(subscriberData.subscriber?.id)) { safeApiWarning('newsletter_subscriber_shape'); return failure(502, 'provider_unavailable', 'The email provider returned an invalid response.'); }

  const formSubscription = await fetchJsonWithTimeout(`https://api.kit.com/v4/forms/${form}/subscribers`, {
    method: 'POST', headers, body: JSON.stringify({ email_address: email }),
  }, fetcher, timeoutMs);
  if (formSubscription.status !== 200) { safeApiWarning('newsletter_form_failure', formSubscription.status); return formSubscription; }
  const formData = formSubscription.body as { subscriber?: { id?: unknown; state?: string } };
  if (!Number.isSafeInteger(formData.subscriber?.id)) { safeApiWarning('newsletter_form_shape'); return failure(502, 'provider_unavailable', 'The email provider returned an invalid response.'); }

  const tagging = await fetchJsonWithTimeout(`https://api.kit.com/v4/tags/${tag}/subscribers`, {
    method: 'POST', headers, body: JSON.stringify({ email_address: email }),
  }, fetcher, timeoutMs);
  if (tagging.status !== 200) { safeApiWarning('newsletter_tag_failure', tagging.status); return tagging; }
  const tagData = tagging.body as { subscriber?: { id?: unknown } };
  if (!Number.isSafeInteger(tagData.subscriber?.id)) { safeApiWarning('newsletter_tag_shape'); return failure(502, 'provider_unavailable', 'The email provider returned an invalid response.'); }
  return { status: 200, body: { ok: true, pendingConfirmation: formData.subscriber?.state !== 'active' } };
}
