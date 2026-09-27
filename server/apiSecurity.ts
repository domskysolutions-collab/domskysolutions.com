import { createHash } from 'node:crypto';

export type ApiFailureCode = 'invalid_request' | 'unsupported_media_type' | 'request_too_large' | 'rate_limited' | 'not_configured' | 'provider_timeout' | 'provider_rate_limited' | 'provider_unavailable';
type ApiFailureStatus = 400 | 403 | 413 | 415 | 429 | 502 | 503 | 504;
export type ApiResult<T> = { status: 200; body: T } | { status: ApiFailureStatus; body: { error: string; code: ApiFailureCode } };
type RequestLike = { headers: Record<string, string | string[] | undefined>; body?: unknown; socket?: { remoteAddress?: string | undefined } };

export const failure = (status: ApiFailureStatus, code: ApiFailureCode, error: string) => ({ status, body: { error, code } } as const);
export const validEmail = (value: unknown): value is string => typeof value === 'string' && value.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

export function readJsonRequest(req: RequestLike, maximumBytes: number): ApiResult<unknown> {
  const contentType = String(req.headers['content-type'] || '').split(';', 1)[0].trim().toLowerCase();
  if (contentType !== 'application/json') return failure(415, 'unsupported_media_type', 'Use application/json.');
  const declared = Number(req.headers['content-length'] || 0);
  if (!Number.isFinite(declared) || declared < 0) return failure(400, 'invalid_request', 'Invalid request.');
  if (declared > maximumBytes) return failure(413, 'request_too_large', 'Request too large.');
  let body = req.body;
  if (typeof body === 'string') {
    if (Buffer.byteLength(body, 'utf8') > maximumBytes) return failure(413, 'request_too_large', 'Request too large.');
    try { body = JSON.parse(body); } catch { return failure(400, 'invalid_request', 'Invalid JSON.'); }
  }
  try {
    if (Buffer.byteLength(JSON.stringify(body ?? null), 'utf8') > maximumBytes) return failure(413, 'request_too_large', 'Request too large.');
  } catch { return failure(400, 'invalid_request', 'Invalid request.'); }
  return { status: 200, body };
}

const buckets = new Map<string, { count: number; resetAt: number }>();
export function resetRateLimits() { buckets.clear(); }
export function rateLimit(req: RequestLike, scope: string, limit: number, windowMs: number, now = Date.now()) {
  const forwarded = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim();
  const address = forwarded || req.socket?.remoteAddress || 'unknown';
  const key = scope + ':' + createHash('sha256').update(address).digest('hex');
  const current = buckets.get(key);
  const bucket = !current || current.resetAt <= now ? { count: 0, resetAt: now + windowMs } : current;
  bucket.count += 1; buckets.set(key, bucket);
  if (buckets.size > 5000) for (const [candidate, value] of buckets) if (value.resetAt <= now) buckets.delete(candidate);
  return { allowed: bucket.count <= limit, retryAfter: Math.max(1, Math.ceil((bucket.resetAt - now) / 1000)) };
}

export async function fetchJsonWithTimeout(url: string, init: RequestInit, fetcher: typeof fetch, timeoutMs: number): Promise<ApiResult<unknown>> {
  try {
    const response = await fetcher(url, { ...init, signal: AbortSignal.timeout(timeoutMs) });
    if (response.status === 429) return failure(503, 'provider_rate_limited', 'The provider is temporarily busy. Try again later.');
    const data = await response.json().catch(() => null);
    if (!response.ok || data === null) return failure(502, 'provider_unavailable', 'The provider could not complete the request.');
    return { status: 200, body: data };
  } catch (error) {
    if (error instanceof Error && (error.name === 'TimeoutError' || error.name === 'AbortError')) return failure(504, 'provider_timeout', 'The provider timed out. Try again.');
    return failure(502, 'provider_unavailable', 'The provider is unavailable. Try again.');
  }
}

export function safeApiWarning(event: string, status?: number) {
  console.warn('[api]', event, ...(status ? [{ status }] : []));
}
