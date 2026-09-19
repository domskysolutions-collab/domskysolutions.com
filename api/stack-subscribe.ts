import type { VercelRequest, VercelResponse } from '@vercel/node';
import { subscribeStack } from '../server/stackSubscription.js';
export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') { res.setHeader('Allow','POST'); return res.status(405).json({ error:'Use POST.' }); }
  if (!String(req.headers['content-type'] || '').includes('application/json')) return res.status(415).json({ error:'Use JSON.' });
  if (Number(req.headers['content-length'] || 0) > 10000) return res.status(413).json({ error:'Request too large.' });
  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch { return res.status(400).json({ error:'Invalid JSON.' }); } }
  const result = await subscribeStack(body, process.env);
  return res.status(result.status).json(result.body);
}
