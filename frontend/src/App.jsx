import { useState } from "react";
import "./App.css";
import RepoInput from "./components/RepoInput";
import FileTree from "./components/FileTree";
import CodeViewer from "./components/CodeViewer";
import QueryBox from "./components/QueryBox";
import ResponsePanel from "./components/ResponsePanel";

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

  return (
    <div className="app-container">
      <RepoInput
        setFileTree={setFileTree}
        setAnalysis={setAnalysis}
        setLoading={setLoading}
        loading={loading}
      />

      <div className="main-layout">
        <div className="sidebar">
          <FileTree
            tree={fileTree}
            setSelectedFiles={setSelectedFiles}
            setActiveTab={setActiveTab}
            selectedFilePaths={selectedFilePaths}
            setSelectedFilePaths={setSelectedFilePaths}
          />
        </div>
        <div className="editor-panel">
          <CodeViewer
            selectedFiles={selectedFiles}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            setSelectedFiles={setSelectedFiles}
            selectedFilePaths={selectedFilePaths}
            setSelectedFilePaths={setSelectedFilePaths}
          />
        </div>
        <div className="ai-panel">
          <ResponsePanel
            analysis={analysis}
            response={aiResponse}
            loading={loading}
          />
          <QueryBox
            selectedFiles={selectedFiles}
            setAiResponse={setAiResponse}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
