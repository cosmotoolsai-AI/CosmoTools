export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  try {
    const { prompt } = req.body;

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        max_tokens: 1000,
        messages: [{ role: 'user', content: prompt }]
      })
    });

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content || 'No response: ' + JSON.stringify(data);
    res.status(200).json({ text });

  } catch (err) {
    res.status(200).json({ text: 'Error: ' + err.message });
  }
}