import type { VercelRequest, VercelResponse } from '@vercel/node';
import { rateLimit, readJsonRequest } from '../server/apiSecurity.js';
import { generateWithAnthropic } from '../server/anthropicGeneration.js';

const allowedOrigins = new Set(['https://domskysolutions.com', 'https://www.domskysolutions.com']);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Cache-Control', 'no-store'); res.setHeader('X-Content-Type-Options', 'nosniff'); res.setHeader('Vary', 'Origin');
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return res.status(405).json({ error: 'Use POST.', code: 'invalid_request' }); }
  const origin = String(req.headers.origin || '');
  if (origin && !allowedOrigins.has(origin)) return res.status(403).json({ error: 'Forbidden.', code: 'invalid_request' });
  const limited = rateLimit(req, 'anthropic', 10, 60_000);
  if (!limited.allowed) { res.setHeader('Retry-After', String(limited.retryAfter)); return res.status(429).json({ error: 'Too many requests. Try again later.', code: 'rate_limited' }); }
  const request = readJsonRequest(req, 12_000);
  if (request.status !== 200) return res.status(request.status).json(request.body);
  const result = await generateWithAnthropic(request.body, process.env);
  return res.status(result.status).json(result.body);
}
