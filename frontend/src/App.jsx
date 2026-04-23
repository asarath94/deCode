import { useState } from "react";
import "./App.css";
import RepoInput from "./components/RepoInput";
import FileTree from "./components/FileTree";
import CodeViewer from "./components/CodeViewer";
import QueryBox from "./components/QueryBox";
import ResponsePanel from "./components/ResponsePanel";

function App() {
  const [fileTree, setFileTree] = useState([]);
  return (
    <div className="app-container">
      <RepoInput setFileTree={setFileTree} />

      <div className="main-layout">
        <FileTree tree={fileTree} />
        <CodeViewer />
        <div className="ai-panel">
          <QueryBox />
          <ResponsePanel />
        </div>
      </div>
    </div>
  );
}

export default App;
