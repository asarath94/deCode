import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

function CodeViewer({
  selectedFiles,
  activeTab,
  setActiveTab,
  setSelectedFiles,
  selectedFilePaths,
  setSelectedFilePaths,
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
        background: "#16171d",
        color: "#e4e4e4",
      }}
    >
      {/* ✅ TABS */}
      <div
        style={{
          display: "flex",
          background: "#252526",
          borderBottom: "1px solid #333",
          overflowX: "auto",
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
                background: isActive ? "#1e1e1e" : "#2d2d2d",
                borderRight: "1px solid #333",
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
                  color: "#999",
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
              style={vscDarkPlus}
              showLineNumbers={true}
              wrapLines={true}
              customStyle={{
                margin: 0,
                padding: "16px",
                fontSize: "14px",
                lineHeight: "1.5",
                background: "#1e1e1e",
                borderRadius: "6px",
              }}
              PreTag="div"
              children={formattedCode}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default CodeViewer;
