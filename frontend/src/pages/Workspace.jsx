import { darkTheme, lightTheme } from "../themes";
import { useState } from "react";
import "../App.css";
import RepoInput from "../components/RepoInput";
import FileTree from "../components/FileTree";
import CodeViewer from "../components/CodeViewer";
import QueryBox from "../components/QueryBox";
import ResponsePanel from "../components/ResponsePanel";
import { useLocation } from "react-router-dom";
import { FaFolder, FaCode, FaRobot } from "react-icons/fa";

function Workspace({ theme, isDarkMode, setIsDarkMode, isMobile, isTablet }) {
  const [fileTree, setFileTree] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [activeTab, setActiveTab] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Track ALL selected files
  const [selectedFilePaths, setSelectedFilePaths] = useState([]);

  // ✅ Mobile tab state
  const [mobileTab, setMobileTab] = useState("explorer");

  const location = useLocation();
  const repoUrl = location.state?.repoUrl || "";
  const action = location.state?.action || "load";

  // ── Bottom Nav Tab Config ──
  const tabs = [
    { id: "explorer", label: "Explorer", icon: <FaFolder size={18} /> },
    { id: "code", label: "Code", icon: <FaCode size={18} /> },
    { id: "ai", label: "AI", icon: <FaRobot size={18} /> },
  ];

  // ── Mobile Layout ──
  if (isMobile) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          background: theme.sidebar,
          color: theme.text,
        }}
      >
        {/* Top Bar */}
        <RepoInput
          setFileTree={setFileTree}
          setAnalysis={setAnalysis}
          setLoading={setLoading}
          loading={loading}
          theme={theme}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          initialUrl={repoUrl}
          initialAction={action}
          isMobile={isMobile}
        />

        {/* Active Panel */}
        <div
          style={{
            flex: 1,
            overflow: "auto",
            paddingBottom: "60px", // space for bottom nav
          }}
        >
          {mobileTab === "explorer" && (
            <FileTree
              tree={fileTree}
              setSelectedFiles={setSelectedFiles}
              setActiveTab={setActiveTab}
              selectedFilePaths={selectedFilePaths}
              setSelectedFilePaths={setSelectedFilePaths}
              theme={theme}
              isMobile={isMobile}
            />
          )}

          {mobileTab === "code" && (
            <div style={{ height: "100%", background: theme.background }}>
              <CodeViewer
                selectedFiles={selectedFiles}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                setSelectedFiles={setSelectedFiles}
                selectedFilePaths={selectedFilePaths}
                setSelectedFilePaths={setSelectedFilePaths}
                theme={theme}
                isDarkMode={isDarkMode}
                isMobile={isMobile}
              />
            </div>
          )}

          {mobileTab === "ai" && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                background: theme.sidebar,
              }}
            >
              <ResponsePanel
                analysis={analysis}
                response={aiResponse}
                loading={loading}
                theme={theme}
                isDarkMode={isDarkMode}
                isMobile={isMobile}
              />
              <QueryBox
                selectedFiles={selectedFiles}
                setAiResponse={setAiResponse}
                theme={theme}
                isMobile={isMobile}
              />
            </div>
          )}
        </div>

        {/* ✅ Bottom Navigation */}
        <div
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            background: theme.panel,
            borderTop: `1px solid ${theme.border}`,
            padding: "8px 0",
            zIndex: 100,
          }}
        >
          {tabs.map((tab) => {
            const isActive = mobileTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setMobileTab(tab.id)}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "4px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: isActive ? "#f5b942" : theme.text,
                  opacity: isActive ? 1 : 0.6,
                  fontSize: "11px",
                  fontWeight: isActive ? "700" : "400",
                  transition: "all 0.15s ease",
                  padding: "4px 16px",
                }}
              >
                {tab.icon}
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // ── Desktop Layout (unchanged) ──
  return (
    <div className="app-container" style={{ background: theme.sidebar }}>
      <RepoInput
        setFileTree={setFileTree}
        setAnalysis={setAnalysis}
        setLoading={setLoading}
        loading={loading}
        theme={theme}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        initialUrl={repoUrl}
        initialAction={action}
      />

      <div className="main-layout">
        <div
          className="sidebar"
          style={{ borderColor: theme.border, background: theme.sidebar }}
        >
          <FileTree
            tree={fileTree}
            setSelectedFiles={setSelectedFiles}
            setActiveTab={setActiveTab}
            selectedFilePaths={selectedFilePaths}
            setSelectedFilePaths={setSelectedFilePaths}
            theme={theme}
          />
        </div>
        <div
          className="editor-panel"
          style={{ borderColor: theme.border, background: theme.background }}
        >
          <CodeViewer
            selectedFiles={selectedFiles}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            setSelectedFiles={setSelectedFiles}
            selectedFilePaths={selectedFilePaths}
            setSelectedFilePaths={setSelectedFilePaths}
            theme={theme}
            isDarkMode={isDarkMode}
            isMobile={isMobile}
          />
        </div>
        <div
          className="ai-panel"
          style={{ borderColor: theme.border, background: theme.sidebar }}
        >
          <ResponsePanel
            analysis={analysis}
            response={aiResponse}
            loading={loading}
            theme={theme}
            isDarkMode={isDarkMode}
            isMobile={isMobile}
          />
          <QueryBox
            selectedFiles={selectedFiles}
            setAiResponse={setAiResponse}
            theme={theme}
            isMobile={isMobile}
          />
        </div>
      </div>
    </div>
  );
}

export default Workspace;

