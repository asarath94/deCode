import { useState } from "react";

function QueryBox({ selectedFiles, setAiResponse }) {
  const [query, setQuery] = useState("");

  const handleAsk = async () => {
    if (selectedFiles.length === 0) {
      setAiResponse(
        "Please select files from the tree first to provide context.",
      );
      return;
    }

    const combinedContent = selectedFiles
      .map((file) => `File: ${file.name}\n${file.content.slice(0, 2000)}`)
      .join("\n\n");

    const res = await fetch("http://localhost:5000/ask-ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: combinedContent,
        question: query,
      }),
    });

    const data = await res.json();
    setAiResponse(data.answer);
  };

  return (
    <div style={{ padding: "10px" }}>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="  Ask about selected files..."
        style={{ width: "100%", padding: "5px 0px 5px 0px" }}
      />

      <button onClick={handleAsk} style={{ marginTop: "10px" }}>
        Ask AI
      </button>
    </div>
  );
}

export default QueryBox;
