import type { VercelRequest, VercelResponse } from '@vercel/node';

const ALLOWED_MODELS = ['claude-sonnet-4-20250514'];
const MAX_TOKENS_LIMIT = 1000;
const MAX_MESSAGE_LENGTH = 2000;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Block non-POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // CORS — only allow your own domain
  const origin = req.headers.origin;
  if (origin !== 'https://domskysolutions.com') {
    return res.status(403).json({ error: 'Forbidden' });
  }

  const { messages, model, max_tokens } = req.body;

  // Validate model — only allow specific safe models
  if (!ALLOWED_MODELS.includes(model)) {
    return res.status(400).json({ error: 'Invalid model' });
  }

  // Cap max_tokens
  const safeMaxTokens = Math.min(Number(max_tokens) || 1000, MAX_TOKENS_LIMIT);

  // Validate messages
  if (!Array.isArray(messages) || messages.length === 0 || messages.length > 5) {
    return res.status(400).json({ error: 'Invalid messages' });
  }

  for (const msg of messages) {
    if (typeof msg.content !== 'string' || msg.content.length > MAX_MESSAGE_LENGTH) {
      return res.status(400).json({ error: 'Message too long' });
    }
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY || '',
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({ model, max_tokens: safeMaxTokens, messages }),
    });

    const data = await response.json();
    if (!response.ok) return res.status(response.status).json(data);
    return res.status(200).json(data);
  } catch {
    return res.status(500).json({ error: 'Internal server error' });
  }
}
