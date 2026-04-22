import "./App.css";
import RepoInput from "./components/RepoInput";
import FileTree from "./components/FileTree";
import CodeViewer from "./components/CodeViewer";
import QueryBox from "./components/QueryBox";
import ResponsePanel from "./components/ResponsePanel";

function App() {
  return (
    <div className="app-container">
      <RepoInput />

      <div className="main-layout">
        <FileTree />
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
