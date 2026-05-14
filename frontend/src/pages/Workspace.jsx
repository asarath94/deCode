import { darkTheme, lightTheme } from "../themes";
import { useState } from "react";
import "../App.css";
import RepoInput from "../components/RepoInput";
import FileTree from "../components/FileTree";
import CodeViewer from "../components/CodeViewer";
import QueryBox from "../components/QueryBox";
import ResponsePanel from "../components/ResponsePanel";
import { useLocation } from "react-router-dom";

function App() {
  const [fileTree, setFileTree] = useState([]);
  // const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [activeTab, setActiveTab] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Track ALL selected files
  const [selectedFilePaths, setSelectedFilePaths] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const theme = isDarkMode ? darkTheme : lightTheme;
  const location = useLocation();
  const repoUrl = location.state?.repoUrl || "";
  const action = location.state?.action || "load";

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
          />
          <QueryBox
            selectedFiles={selectedFiles}
            setAiResponse={setAiResponse}
            theme={theme}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
