function ResponsePanel({ analysis, response, loading }) {
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div
      style={{
        padding: "15px",
        flex: 1,
        overflowY: "auto",
        background: "#fafafa",
      }}
    >
      <h3 style={{ marginBottom: "10px" }}>AI Output</h3>

      {/* 🔄 Loading State */}
      {loading && <p style={{ color: "#777" }}>⏳ Analyzing repository...</p>}

      {/* 📊 Repo Analysis */}
      {!loading && analysis && (
        <div style={{ marginBottom: "25px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h4 style={{ color: "#444" }}>Repo Analysis</h4>
            <button onClick={() => handleCopy(analysis)}>Copy</button>
          </div>

          <div
            style={{
              whiteSpace: "pre-wrap",
              lineHeight: "1.6",
              marginTop: "8px",
            }}
          >
            {analysis}
          </div>
        </div>
      )}

      {/* 💬 Q&A Response */}
      {!loading && response && (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h4 style={{ color: "#444" }}>Q&A Response</h4>
            <button onClick={() => handleCopy(response)}>Copy</button>
          </div>

          <div
            style={{
              whiteSpace: "pre-wrap",
              lineHeight: "1.6",
              marginTop: "8px",
            }}
          >
            {response}
          </div>
        </div>
      )}

      {/* 📭 Empty State */}
      {!loading && !analysis && !response && (
        <p style={{ color: "#777" }}>
          Load a repository and click "Analyze Repo" or ask a question.
        </p>
      )}
    </div>
  );
}

export default ResponsePanel;
