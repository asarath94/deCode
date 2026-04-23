function CodeViewer() {
  return (
    <div style={{ padding: "10px" }}>
      <h4>Code Viewer</h4>
      <pre>
{`function hello() {
  console.log("Hello World");
}`}
      </pre>
    </div>
  );
}

export default CodeViewer;