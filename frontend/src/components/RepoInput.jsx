import { useState } from "react";

function RepoInput({ setFileTree, setAnalysis }) {
  const [url, setUrl] = useState("");

  const handleLoad = async () => {
    const res = await fetch("http://localhost:5000/load-repo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ repoUrl: url }),
    });

    const data = await res.json();
    setFileTree(data.tree);
  };

  const handleAnalyze = async () => {
    const res = await fetch("http://localhost:5000/analyze-repo", {
      method: "POST",
    });

    const data = await res.json();
    setAnalysis(data.analysis);
  };

  return (
    <div style={{ padding: "10px" }}>
      <input
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter GitHub repo URL..."
      />

      <button onClick={handleLoad}>Load Repo</button>
      <button onClick={handleAnalyze}>Analyze Repo</button>
    </div>
  );
}

export default RepoInput;
