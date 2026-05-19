import { useState } from "react";
import logo from "../assets/logo.png";
import { useEffect } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

function RepoInput({
  initialUrl,
  initialAction,
  setFileTree,
  setAnalysis,
  setLoading,
  loading,
  isDarkMode,
  setIsDarkMode,
  theme,
  isMobile,
}) {
  const navigate = useNavigate();
  const [repoLoaded, setRepoLoaded] = useState(false);
  const [url, setUrl] = useState(initialUrl || "");
  const hasAutoLoaded = useRef(false);

  useEffect(() => {
    // prevent double execution
    if (hasAutoLoaded.current) return;

    hasAutoLoaded.current = true;

    const autoLoadAndAnalyze = async () => {
      if (!initialUrl) return;

      try {
        // LOAD REPO
        const res = await fetch(`${import.meta.env.VITE_API_URL}/load-repo`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ repoUrl: initialUrl }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Failed to load repository");
        }

        setFileTree(data.tree);
        setRepoLoaded(true);

        // AUTO ANALYZE
        if (initialAction === "analyze") {
          setLoading(true);

          const analysisRes = await fetch(
            `${import.meta.env.VITE_API_URL}/analyze-repo`,
            {
              method: "POST",
            },
          );

          const analysisData = await analysisRes.json();

          setAnalysis(analysisData.analysis);

          setLoading(false);
        }
      } catch (err) {
        console.error(err);
        alert(err.message);
      }
    };

    autoLoadAndAnalyze();
  }, []);
  const handleLoad = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/load-repo`, {
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

    const res = await fetch(`${import.meta.env.VITE_API_URL}/analyze-repo`, {
      method: "POST",
    });

    const data = await res.json();

    setAnalysis(data.analysis);
    setLoading(false);
  };

  if (isMobile) {
    return (
      <div
        style={{
          padding: "10px 16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: `1px solid ${theme.border}`,
          background: theme.sidebar,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            cursor: "pointer",
          }}
          onClick={() => navigate("/")}
        >
          <img src={logo} alt="Logo" style={{ height: "32px" }} />
          <span
            style={{ fontWeight: "700", fontSize: "16px", color: theme.text }}
          >
            AI Codebase Assistant
          </span>
        </div>

        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          style={{
            padding: "6px 8px",
            borderRadius: "6px",
            cursor: "pointer",
            background: theme.input,
            color: theme.text,
            border: `1px solid ${theme.border}`,
            fontSize: "14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {isDarkMode ? "☀" : "🌙"}
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "0px 20px 0px 20px",
        display: "grid",
        gridTemplateColumns: "1fr auto 1fr",
        alignItems: "center",
        gap: "10px",
        borderBottom: `1px solid ${theme.border}`,
        background: theme.sidebar,
      }}
    >
      <div style={{ display: "flex", justifyContent: "flex-start" }}>
        <img
          src={logo}
          alt="Logo"
          onClick={() => navigate("/")}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.03)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
          }}
          style={{ height: "70px", cursor: "pointer", transition: "0.2s", padding: "10px 0" }}
        />
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
            background: theme.panel,
            color: theme.text,
            border: `1px solid ${theme.border}`,
            borderRadius: "6px",
            outline: "none",
          }}
        />

        <button
          onClick={handleLoad}
          disabled={loading}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#dd7600ff")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#F28F20")}
          style={{
            padding: "8px 12px",
            background: "#F28F20",
            color: theme.text,
            border: `1px solid ${theme.border}`,
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
          onMouseEnter={(e) => (e.currentTarget.style.background = "#dd7600ff")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#F28F20")}
          style={{
            padding: "8px 12px",
            background: "#F28F20",
            color: theme.text,
            border: `1px solid ${theme.border}`,
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
