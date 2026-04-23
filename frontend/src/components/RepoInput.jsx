import { useState } from "react";

function RepoInput({ setFileTree }) {
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

  return (
    <div style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
      <input
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter GitHub repo URL..."
        style={{ width: "70%", padding: "8px" }}
      />
      <button onClick={handleLoad} style={{ marginLeft: "10px", padding: "8px" }}>
        Load Repo
      </button>
    </div>
  );
}

export default RepoInput;