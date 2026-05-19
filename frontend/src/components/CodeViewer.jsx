import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  vscDarkPlus,
  prism,
} from "react-syntax-highlighter/dist/esm/styles/prism";

function CodeViewer({
  selectedFiles,
  activeTab,
  setActiveTab,
  setSelectedFiles,
  selectedFilePaths,
  setSelectedFilePaths,
  theme,
  isDarkMode,
  isMobile,
}) {
  // ✅ Find active file
  const activeFile =
    selectedFiles.find((file) => file.name === activeTab) || selectedFiles[0];

  // ✅ Close tab
  const handleClose = (name) => {
    const updatedFiles = selectedFiles.filter((file) => file.name !== name);

    setSelectedFiles(updatedFiles);
    setSelectedFilePaths((prev) => prev.filter((path) => !path.includes(name)));

    // if closing active tab
    if (activeTab === name) {
      setActiveTab(updatedFiles[0]?.name || "");
    }
  };

  const getLanguage = (fileName) => {
    if (fileName.endsWith(".js")) return "javascript";
    if (fileName.endsWith(".jsx")) return "jsx";
    if (fileName.endsWith(".ts")) return "typescript";
    if (fileName.endsWith(".tsx")) return "tsx";
    if (fileName.endsWith(".css")) return "css";
    if (fileName.endsWith(".json")) return "json";
    if (fileName.endsWith(".md")) return "markdown";

    return "javascript";
  };

  const rawContent = activeFile?.content || "";
  const formattedCode =
    typeof rawContent === "string"
      ? rawContent.replace(/\\n/g, "\n").replace(/\\r/g, "").trim()
      : JSON.stringify(rawContent, null, 2);

  return (
    <div
      style={{
        height: "99.9%",
        display: "flex",
        flexDirection: "column",
        background: theme.sidebar,
        color: theme.text,
      }}
    >
      {/* ✅ TABS */}
      <div
        style={{
          display: "flex",
          background: theme.panel,
          borderBottom: `1px solid ${theme.border}`,
          overflowX: "auto",
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none", // Hide scrollbar in Firefox
        }}
      >
        {selectedFiles.map((file) => {
          const isActive = activeTab === file.name;

          return (
            <div
              key={file.name}
              onClick={() => setActiveTab(file.name)}
              style={{
                padding: "10px 14px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                cursor: "pointer",
                background: isActive ? theme.activeTab : theme.inactiveTab,

                borderRight: `1px solid ${theme.border}`,
                minWidth: "fit-content",
              }}
            >
              <span>{file.name}</span>

              <span
                onClick={(e) => {
                  e.stopPropagation();
                  handleClose(file.name);
                }}
                style={{
                  color: theme.text,
                  opacity: 0.7,
                  fontSize: "12px",
                  cursor: "pointer",
                }}
              >
                ✕
              </span>
            </div>
          );
        })}
      </div>

      {/* ✅ FILE CONTENT */}
      <div
        style={{
          padding: "12px",
          overflow: "auto",
          flex: 1,
        }}
      >
        {!activeFile && <p>No file selected</p>}

        {activeFile && (
          <>
            {/* <h4>{activeFile.name}</h4> */}

            <SyntaxHighlighter
              language={getLanguage(activeFile.name)}
              style={isDarkMode ? vscDarkPlus : prism}
              showLineNumbers={true}
              lineNumberStyle={{
                color: isDarkMode ? "#858585" : "#999",
              }}
              wrapLines={false}
              customStyle={{
                margin: 0,
                padding: isMobile ? "8px" : "16px",
                fontSize: isMobile ? "12px" : "14px",
                lineHeight: "1.5",
                background: theme.background,
                borderRadius: "6px",
                overflowX: "auto",
                WebkitOverflowScrolling: "touch",
              }}
              PreTag="div"
              children={formattedCode.slice(0, 600)}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default CodeViewer;
