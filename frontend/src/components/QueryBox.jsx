import { useState } from "react";
import { IoSend } from "react-icons/io5";

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
    <div
      style={{
        padding: "12px",
        background: "#2b2b2b",
        borderRadius: "20px",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        width: "96%",
        boxSizing: "border-box",
        margin: "10px",
      }}
    >
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Ask about selected files..."
        style={{
          flex: 1,
          background: "transparent",
          border: "none",
          outline: "none",
          color: "white",
          fontSize: "15px",
        }}
      />

      <button
        onClick={handleAsk}
        style={{
          background: "#444",
          border: "none",
          borderRadius: "50%",
          width: "38px",
          height: "38px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          color: "white",
        }}
      >
        <IoSend size={18} />
      </button>
    </div>
  );
}

export default QueryBox;
