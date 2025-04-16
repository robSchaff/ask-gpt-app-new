export default async function handler(req) {
  try {
    const body = await req.json();
    const prompt = body.prompt;

    if (!process.env.OPENAI_API_KEY) {
      return new Response("Missing OpenAI API key", { status: 500 });
    }

    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7
      })
    });

    const data = await openaiRes.json();

    if (!data.choices || !data.choices.length) {
      return new Response("No response from OpenAI", { status: 500 });
    }

    const reply = data.choices[0].message.content;

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });

  } catch (err) {
    console.error("Error in /api/chat:", err);
  
    return new Response(JSON.stringify({
      error: "An error occurred while processing your request."
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}