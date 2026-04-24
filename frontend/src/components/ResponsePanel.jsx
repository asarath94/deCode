function ResponsePanel({ response }) {
  return (
    <div style={{ padding: "10px", flex: 1, overflowY: "auto" }}>
      <h4>AI Response</h4>
      <div style={{ whiteSpace: "pre-wrap" }}>
        {response || "Your response will appear here..."}
      </div>
    </div>
  );
}

export default ResponsePanel;