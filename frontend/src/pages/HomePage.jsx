import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRobot, FaCode } from "react-icons/fa";
import logo from "../assets/logo.png";
import { FaMoon, FaSun, FaGithub, FaLinkedin } from "react-icons/fa";

function HomePage({ theme, loading, isDarkMode, setIsDarkMode, isMobile, isTablet }) {
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
        padding: "20px clamp(16px, 5vw, 40px)",
        boxSizing: "border-box",
        overflowX: "hidden",
        width: "100%",
      }}
    >
      {/* NAV BAR */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          maxWidth: "900px",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "16px",
            fontSize: "clamp(14px, 3vw, 18px)",
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
              display: "flex",
              alignItems: "center",
              gap: "5px",
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
              display: "flex",
              alignItems: "center",
              gap: "5px",
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
          width: "100%",
        }}
      >
        <img
          src={logo}
          alt="Logo"
          style={{ height: "clamp(80px, 15vw, 160px)" }}
        />
        <h2
          style={{
            fontSize: "clamp(22px, 5vw, 32px)",
            marginBottom: "20px",
            fontWeight: "700",
            color: theme.text,
          }}
        >
          AI Codebase Assistant
        </h2>

        <p
          style={{
            fontSize: "clamp(15px, 3.5vw, 20px)",
            lineHeight: "1.7",
            opacity: 0.9,
            marginBottom: "40px",
            padding: "0 10px",
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
            flexDirection: isMobile ? "column" : "row",
            gap: "12px",
            justifyContent: "center",
            alignItems: "stretch",
            marginBottom: "50px",
            width: "100%",
            maxWidth: isMobile ? "100%" : "800px",
            margin: "0 auto 50px auto",
            padding: "0 10px",
            boxSizing: "border-box",
          }}
        >
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter GitHub repository URL..."
            style={{
              flex: 1,
              width: "100%",
              minWidth: "0",
              padding: isMobile ? "16px 20px" : "14px 16px",
              borderRadius: "10px",
              border: `1px solid ${theme.border}`,
              background: theme.panel,
              color: theme.text,
              fontSize: "clamp(15px, 4vw, 16px)",
              outline: "none",
              boxSizing: "border-box",
            }}
          />

          <div
            style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              gap: "12px",
            }}
          >
            <button
              onClick={() => handleEnterWorkspace("load")}
              disabled={loading}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#dd7600ff")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "#F28F20")
              }
              style={{
                width: isMobile ? "100%" : "auto",
                padding: isMobile ? "16px" : "14px 22px",
                borderRadius: "10px",
                border: `1px solid ${theme.border}`,
                background: "#F28F20",
                color: theme.text,
                cursor: "pointer",
                fontSize: "clamp(15px, 4vw, 16px)",
                fontWeight: "600",
                transition: "background 0.15s ease",
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
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "#F28F20")
              }
              style={{
                width: isMobile ? "100%" : "auto",
                padding: isMobile ? "16px" : "14px 22px",
                borderRadius: "10px",
                border: `1px solid ${theme.border}`,
                background: "#F28F20",
                color: theme.text,
                cursor: "pointer",
                fontSize: "clamp(15px, 4vw, 16px)",
                fontWeight: "600",
                transition: "background 0.15s ease",
              }}
            >
              Analyze Repo
            </button>
          </div>
        </div>

        {/* FEATURES */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(220px, 100%), 1fr))",
            gap: "20px",
            marginTop: "30px",
          }}
        >
          {/* CARD 1 */}
          <div
            style={{
              background: theme.panel,
              border: `1px solid ${theme.border}`,
              borderRadius: "16px",
              padding: "24px",
              textAlign: "left",
            }}
          >
            <FaGithub size={28} />
            <h3
              style={{ marginTop: "14px", fontSize: "clamp(16px, 3vw, 18px)" }}
            >
              Repository Exploration
            </h3>
            <p
              style={{
                opacity: 0.8,
                lineHeight: "1.6",
                fontSize: "clamp(13px, 2.5vw, 15px)",
              }}
            >
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
              padding: "24px",
              textAlign: "left",
            }}
          >
            <FaRobot size={28} />
            <h3
              style={{ marginTop: "14px", fontSize: "clamp(16px, 3vw, 18px)" }}
            >
              AI Repository Understanding
            </h3>
            <p
              style={{
                opacity: 0.8,
                lineHeight: "1.6",
                fontSize: "clamp(13px, 2.5vw, 15px)",
              }}
            >
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
              padding: "24px",
              textAlign: "left",
            }}
          >
            <FaCode size={28} />
            <h3
              style={{ marginTop: "14px", fontSize: "clamp(16px, 3vw, 18px)" }}
            >
              IDE-like Workspace
            </h3>
            <p
              style={{
                opacity: 0.8,
                lineHeight: "1.6",
                fontSize: "clamp(13px, 2.5vw, 15px)",
              }}
            >
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
