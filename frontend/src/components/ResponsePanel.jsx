import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";
function ResponsePanel({ analysis, response, loading }) {
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div
      style={{
        padding: "15px",
        flex: 1,
        overflowY: "auto",
        background: "#16171d",
      }}
    >
      <h4 style={{ marginBottom: "10px", marginTop: "10px" }}>AI Output</h4>

      {/* 🔄 Loading State */}
      {loading && <p style={{ color: "#777" }}>⏳ Analyzing repository...</p>}

      {/* 📊 Repo Analysis */}
      {!loading && analysis && (
        <div style={{ marginBottom: "25px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h4 style={{ color: "#444" }}>Repo Analysis</h4>
            <button onClick={() => handleCopy(analysis)}>Copy</button>
          </div>

          <div style={{ marginTop: "8px" }}>
            <ReactMarkdown
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || "");

                  return !inline && match ? (
                    <SyntaxHighlighter
                      style={tomorrow}
                      language={match[1]}
                      PreTag="div"
                    >
                      {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                  ) : (
                    <code
                      style={{ background: "#8b8989ff", padding: "2px 4px" }}
                    >
                      {children}
                    </code>
                  );
                },
              }}
            >
              {analysis}
            </ReactMarkdown>
          </div>
        </div>
      )}

      {/* 💬 Q&A Response */}
      {!loading && response && (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h4 style={{ color: "#444" }}>Q&A Response</h4>
            <button onClick={() => handleCopy(response)}>Copy</button>
          </div>

          <div style={{ marginTop: "8px" }}>
            <ReactMarkdown
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || "");

                  return !inline && match ? (
                    <SyntaxHighlighter
                      style={tomorrow}
                      language={match[1]}
                      PreTag="div"
                    >
                      {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                  ) : (
                    <code
                      style={{ background: "#8b8989ff", padding: "2px 4px" }}
                    >
                      {children}
                    </code>
                  );
                },
              }}
            >
              {response}
            </ReactMarkdown>
          </div>
        </div>
      )}

      {/* 📭 Empty State */}
      {!loading && !analysis && !response && (
        <p style={{ color: "#777" }}>
          Load a repository and click "Analyze Repo" or ask a question.
        </p>
      )}
    </div>
  );
}

export default ResponsePanel;
