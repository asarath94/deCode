import { useState } from "react";
import logo from "../assets/logo.png";

function RepoInput({
  setFileTree,
  setAnalysis,
  setLoading,
  loading,
  isDarkMode,
  setIsDarkMode,
  theme,
}) {
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
    <div
      style={{
        padding: "0px 20px 0px 20px",
        display: "grid",
        gridTemplateColumns: "1fr auto 1fr",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "flex-start" }}>
        <img src={logo} alt="Logo" style={{ height: "70px" }} />
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        <input
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
            setRepoLoaded(false);
          }}
          placeholder="Enter GitHub repo URL..."
          style={{
            width: "300px",
            padding: "8px",
            background: theme.input,
            color: theme.text,
            border: `1px solid ${theme.border}`,
            borderRadius: "6px",
            outline: "none",
          }}
        />

        <button
          onClick={handleLoad}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#d49b1f")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#f5b942")}
          style={{
            padding: "8px 12px",
            background: "#f5b942",
            color: "#1a1a1a",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "600",
            transition: "background 0.15s ease",
          }}
        >
          Load Repo
        </button>
        <button
          onClick={handleAnalyze}
          disabled={loading}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#d49b1f")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#f5b942")}
          style={{
            padding: "8px 12px",
            background: "#f5b942",
            color: "#1a1a1a",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "600",
            transition: "background 0.15s ease",
          }}
        >
          {loading ? "Analyzing..." : "Analyze Repo"}
        </button>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: "12px",
        }}
      >
        {/* ✅ Repo Status */}
        {repoLoaded && (
          <p
            style={{
              fontSize: "13px",
              color: "#4ade80",
              margin: 0,
              fontWeight: "500",
            }}
          >
            Repo loaded successfully ✅
          </p>
        )}

        {/* ✅ Theme Toggle */}
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          style={{
            padding: "5px 7px",
            borderRadius: "6px",
            cursor: "pointer",
            background: theme.input,
            color: theme.text,
            border: `1px solid ${theme.border}`,
            fontSize: "14px",
          }}
        >
          {isDarkMode ? "☀ Light" : "🌙 Dark"}
        </button>
      </div>
    </div>
  );
}

export default RepoInput;
