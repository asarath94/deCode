function ResponsePanel({ analysis, response }) {
  return (
    <div style={{ padding: "10px", flex: 1, overflowY: "auto" }}>
      <h4>AI Output</h4>
      
      {analysis && (
        <div style={{ marginBottom: "20px" }}>
          <h5 style={{ color: "#555" }}>Repo Analysis:</h5>
          <div style={{ whiteSpace: "pre-wrap" }}>{analysis}</div>
        </div>
      )}

      {response && (
        <div>
          <h5 style={{ color: "#555" }}>Q&A Response:</h5>
          <div style={{ whiteSpace: "pre-wrap" }}>{response}</div>
        </div>
      )}

      {!analysis && !response && (
        <p>Click "Analyze repo" or "Ask AI" to get insights...</p>
      )}
    </div>
  );
}

export default ResponsePanel;
