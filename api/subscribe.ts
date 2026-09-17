import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  const { email, newsletter = false } = req.body ?? {};
  if (!email || !/^\\S+@\\S+\\.\\S+$/.test(email)) return res.status(400).json({ error: 'Invalid email' });
  const tags = newsletter && process.env.CONVERTKIT_NEWSLETTER_TAG_ID ? [Number(process.env.CONVERTKIT_NEWSLETTER_TAG_ID)] : undefined;
  try {
    const response = await fetch(`https://api.convertkit.com/v3/forms/${process.env.CONVERTKIT_FORM_ID}/subscribe`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ api_key: process.env.CONVERTKIT_API_KEY, email, ...(tags ? { tags } : {}) }) });
    const data = await response.json();
    return res.status(response.ok ? 200 : 500).json(data);
  } catch { return res.status(500).json({ error: 'Internal server error' }); }
}
