export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const webhookUrl = process.env.WEBHOOK_URL;
  if (!webhookUrl) {
    return res.status(500).json({ error: 'Webhook URL not configured' });
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    });

    if (!response.ok) {
      return res.status(502).json({ error: 'Upstream error' });
    }

    return res.status(200).json({ ok: true });
  } catch {
    return res.status(502).json({ error: 'Failed to reach webhook' });
  }
}
