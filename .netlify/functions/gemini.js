exports.handler = async (event) => {
  try {
    const { prompt } = JSON.parse(event.body);

    const response = await fetch(
      const response = await fetch(
  `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();
console.log(JSON.stringify(data, null, 2));

console.log(JSON.stringify(data, null, 2));

if (data.error) {
  return {
    statusCode: 500,
    body: JSON.stringify(data),
  };
}

const text =
  data.candidates?.[0]?.content?.parts?.[0]?.text ||
  "No response from Gemini.";

return {
  statusCode: 200,
  body: JSON.stringify({ text }),
};

    return {
      statusCode: 200,
      body: JSON.stringify({ text }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message,
      }),
    };
  }
};