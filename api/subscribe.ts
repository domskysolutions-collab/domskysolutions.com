import type { VercelRequest, VercelResponse } from '@vercel/node';
import { rateLimit, readJsonRequest } from '../server/apiSecurity.js';
import { subscribeNewsletter } from '../server/newsletterSubscription.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Cache-Control', 'no-store'); res.setHeader('X-Content-Type-Options', 'nosniff');
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return res.status(405).json({ error: 'Use POST.', code: 'invalid_request' }); }
  const limited = rateLimit(req, 'newsletter', 5, 10 * 60_000);
  if (!limited.allowed) { res.setHeader('Retry-After', String(limited.retryAfter)); return res.status(429).json({ error: 'Too many requests. Try again later.', code: 'rate_limited' }); }
  const request = readJsonRequest(req, 2048);
  if (request.status !== 200) return res.status(request.status).json(request.body);
  const result = await subscribeNewsletter(request.body, process.env);
  return res.status(result.status).json(result.body);
}
