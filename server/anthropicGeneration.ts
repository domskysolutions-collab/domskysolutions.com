import { failure, fetchJsonWithTimeout, safeApiWarning, type ApiResult } from './apiSecurity.js';

const ALLOWED_MODELS = new Set(['claude-sonnet-4-20250514']);
type Env = Record<string, string | undefined>;
type Message = { role: 'user' | 'assistant'; content: string };

export async function generateWithAnthropic(body: unknown, env: Env, fetcher: typeof fetch = fetch, timeoutMs = 12000): Promise<ApiResult<unknown>> {
  if (!body || typeof body !== 'object' || Array.isArray(body)) return failure(400, 'invalid_request', 'Invalid request.');
  const input = body as Record<string, unknown>;
  if (!ALLOWED_MODELS.has(String(input.model)) || !Number.isInteger(input.max_tokens) || Number(input.max_tokens) < 1 || Number(input.max_tokens) > 1000 || !Array.isArray(input.messages) || input.messages.length < 1 || input.messages.length > 5) return failure(400, 'invalid_request', 'Invalid generation request.');
  const messages: Message[] = [];
  for (const value of input.messages) {
    if (!value || typeof value !== 'object' || Array.isArray(value)) return failure(400, 'invalid_request', 'Invalid messages.');
    const message = value as Record<string, unknown>;
    if (!['user', 'assistant'].includes(String(message.role)) || typeof message.content !== 'string' || !message.content.trim() || message.content.length > 2000) return failure(400, 'invalid_request', 'Invalid messages.');
    messages.push({ role: message.role as Message['role'], content: message.content });
  }
  if (!env.ANTHROPIC_API_KEY) return failure(503, 'not_configured', 'Generation is not configured.');
  const provider = await fetchJsonWithTimeout('https://api.anthropic.com/v1/messages', {
    method: 'POST', headers: { 'Content-Type': 'application/json', 'x-api-key': env.ANTHROPIC_API_KEY, 'anthropic-version': '2023-06-01' },
    body: JSON.stringify({ model: input.model, max_tokens: input.max_tokens, messages }),
  }, fetcher, timeoutMs);
  if (provider.status !== 200) safeApiWarning('anthropic_provider_failure', provider.status);
  return provider;
}
