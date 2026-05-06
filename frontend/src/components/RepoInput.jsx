import { useState } from "react";

function RepoInput({ setFileTree, setAnalysis, setLoading, loading }) {
  const [repoLoaded, setRepoLoaded] = useState(false);
  const [url, setUrl] = useState("");

  const handleLoad = async () => {
    try {
      const res = await fetch("http://localhost:5000/load-repo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ repoUrl: url }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Invalid Repo or Repo access denied");
      }
      setFileTree(data.tree);
      setRepoLoaded(true);
    } catch (err) {
      console.error(err);
      alert(err.message); // simple for now
      setRepoLoaded(false);
    }
  };

  const handleAnalyze = async () => {
    setLoading(true);

    const res = await fetch("http://localhost:5000/analyze-repo", {
      method: "POST",
    });

    const data = await res.json();

    setAnalysis(data.analysis);
    setLoading(false);
  };

  return (
    <div style={{ padding: "10px" }}>
      <input
        value={url}
        onChange={(e) => {
          setUrl(e.target.value);
          setRepoLoaded(false);
        }}
        placeholder="Enter GitHub repo URL..."
      />

      <button onClick={handleLoad}>Load Repo</button>
      <button onClick={handleAnalyze} disabled={loading}>
        {loading ? "Analyzing..." : "Analyze Repo"}
      </button>
      {repoLoaded && (
        <p style={{ fontSize: "12px", color: "green", marginTop: "8px" }}>
          Repo loaded successfully ✅
        </p>
      )}
    </div>
  );
}

export default RepoInput;
