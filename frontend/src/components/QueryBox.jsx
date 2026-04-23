import { useState } from "react";

function QueryBox() {
  const [query, setQuery] = useState("");

  return (
    <div style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Ask about the code..."
        style={{ width: "100%", padding: "8px" }}
      />
      <button style={{ marginTop: "10px", padding: "8px" }}>
        Ask AI
      </button>
    </div>
  );
}

export default QueryBox;