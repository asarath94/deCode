function CodeViewer({ selectedFiles }) {
  return (
    <div style={{ padding: "10px", overflow: "auto" }}>
      <h4>Selected Files</h4>

      {selectedFiles.length === 0 && <p>No files selected</p>}

      {selectedFiles.map((file, index) => (
        <div key={index} style={{ marginBottom: "20px" }}>
          <h5>{file.name}</h5>
          <pre style={{ whiteSpace: "pre-wrap" }}>
            {file.content.slice(0, 500)}
          </pre>
        </div>
      ))}
    </div>
  );
}

export default CodeViewer;
