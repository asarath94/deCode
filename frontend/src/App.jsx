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
  const [aiResponse, setAiResponse] = useState("");
  const [analysis, setAnalysis] = useState("");

  return (
    <div className="app-container">
      <RepoInput setFileTree={setFileTree} setAnalysis={setAnalysis} />

      <div className="main-layout">
        <FileTree tree={fileTree} setSelectedFiles={setSelectedFiles} />
        <CodeViewer selectedFiles={selectedFiles} />
        <div className="ai-panel">
          <QueryBox
            selectedFiles={selectedFiles}
            setAiResponse={setAiResponse}
          />
          <ResponsePanel analysis={analysis} response={aiResponse} />
        </div>
      </div>
    </div>
  );
}

export default App;
