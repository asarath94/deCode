import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRobot, FaCode } from "react-icons/fa";
import logo from "../assets/logo.png";
import { FaMoon, FaSun, FaGithub, FaLinkedin } from "react-icons/fa";

function HomePage({ theme, loading, isDarkMode, setIsDarkMode }) {
  const [url, setUrl] = useState("");
  const navigate = useNavigate();
  const handleEnterWorkspace = (actionType) => {
    if (!url.trim()) {
      alert("Please enter a GitHub repo URL");
      return;
    }

    navigate("/workspace", {
      state: {
        repoUrl: url,
        action: actionType,
      },
    });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: theme.sidebar,
        color: theme.text,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingRight: "40px",
        paddingLeft: "40px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "16px",
            fontSize: "18px",
          }}
        >
          <a
            href="https://github.com/asarath94"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: theme.text,
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            <FaGithub />
            Github
          </a>
          <a
            href="https://www.linkedin.com/in/sai-sharat-chandra/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: theme.text,
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            <FaLinkedin />
            Linkedin
          </a>
        </div>
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
          {isDarkMode ? (
            <>
              <FaSun /> Light
            </>
          ) : (
            <>
              <FaMoon /> Dark
            </>
          )}
        </button>
      </div>
      {/* HERO SECTION */}
      <div
        style={{
          textAlign: "center",
          maxWidth: "900px",
        }}
      >
        <img src={logo} alt="Logo" style={{ height: "160px" }} />
        <h2
          style={{
            fontSize: "32px",
            marginBottom: "20px",
            fontWeight: "700",
            color: theme.text,
          }}
        >
          AI Codebase Assistant
        </h2>

        <p
          style={{
            fontSize: "20px",
            lineHeight: "1.7",
            opacity: 0.9,
            marginBottom: "50px",
          }}
        >
          Analyze repositories, explore file structures, inspect code, and ask
          AI questions about any public codebase using an IDE-style developer
          workspace.
        </p>
        {/* INPUT SECTION */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            justifyContent: "center",
            marginBottom: "60px",
            flexWrap: "wrap",
          }}
        >
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter GitHub repository URL..."
            style={{
              width: "500px",
              maxWidth: "90vw",
              padding: "16px",
              borderRadius: "10px",
              border: `1px solid ${theme.border}`,
              background: theme.panel,
              color: theme.text,
              fontSize: "16px",
              outline: "none",
            }}
          />

          <button
            onClick={() => handleEnterWorkspace("load")}
            disabled={loading}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "#dd7600ff")
            }
            onMouseLeave={(e) => (e.currentTarget.style.background = "#F28F20")}
            style={{
              padding: "16px 24px",
              borderRadius: "10px",
              border: `1px solid ${theme.border}`,
              background: "#F28F20",
              color: theme.text,
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "600",
            }}
          >
            Load Repo
          </button>

          <button
            onClick={() => handleEnterWorkspace("analyze")}
            disabled={loading}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "#dd7600ff")
            }
            onMouseLeave={(e) => (e.currentTarget.style.background = "#F28F20")}
            style={{
              padding: "16px 24px",
              borderRadius: "10px",
              border: `1px solid ${theme.border}`,
              background: "#F28F20",
              color: theme.text,
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "600",
            }}
          >
            Analyze Repo
          </button>
        </div>
        {/* FEATURES */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "24px",
            marginTop: "40px",
          }}
        >
          {/* CARD 1 */}
          <div
            style={{
              background: theme.panel,
              border: `1px solid ${theme.border}`,
              borderRadius: "16px",
              padding: "28px",
            }}
          >
            <FaGithub size={32} />

            <h3 style={{ marginTop: "18px" }}>Repository Exploration</h3>

            <p style={{ opacity: 0.8, lineHeight: "1.6" }}>
              Load any GitHub repository and explore its structure using an
              IDE-style file explorer.
            </p>
          </div>

          {/* CARD 2 */}
          <div
            style={{
              background: theme.panel,
              border: `1px solid ${theme.border}`,
              borderRadius: "16px",
              padding: "28px",
            }}
          >
            <FaRobot size={32} />

            <h3 style={{ marginTop: "18px" }}>AI Repository Understanding</h3>

            <p style={{ opacity: 0.8, lineHeight: "1.6" }}>
              Ask questions about architecture, functionality, tech stack, and
              implementation details.
            </p>
          </div>
          {/* CARD 3 */}
          <div
            style={{
              background: theme.panel,
              border: `1px solid ${theme.border}`,
              borderRadius: "16px",
              padding: "28px",
            }}
          >
            <FaCode size={32} />

            <h3 style={{ marginTop: "18px" }}>IDE-like Workspace</h3>

            <p style={{ opacity: 0.8, lineHeight: "1.6" }}>
              View syntax-highlighted code with tabs, search, theme switching,
              and recursive file navigation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default HomePage;
