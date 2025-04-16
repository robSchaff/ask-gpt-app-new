import { useState } from "react";

function App() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const askChatGPT = async () => {
    setLoading(true);
    setResponse("");

    const res = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ prompt })
    });

    const data = await res.json();
    setResponse(data.reply);
    setLoading(false);
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "auto" }}>
      <h1>Ask ChatGPT</h1>
      <textarea
        rows="4"
        style={{ width: "100%" }}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Type your question here..."
      />
      <button onClick={askChatGPT} style={{ marginTop: "1rem" }}>
        Ask ChatGPT v0.0.1
      </button>
      {loading && <p>Thinking...</p>}
      {response && (
        <div style={{ marginTop: "1rem", whiteSpace: "pre-wrap" }}>
          <strong>Response:</strong>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}

export default App;