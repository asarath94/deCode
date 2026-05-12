import { useState } from "react";
import {
  FaFolder,
  FaFolderOpen,
  FaReact,
  FaJs,
  FaCss3Alt,
  FaMarkdown,
  FaFileAlt,
} from "react-icons/fa";

import { VscJson, VscChevronRight, VscChevronDown } from "react-icons/vsc";

function FileTree({
  tree,
  setSelectedFiles,
  setActiveTab,
  selectedFilePaths,
  setSelectedFilePaths,
}) {
  // ✅ Track expanded folders
  const [expandedFolders, setExpandedFolders] = useState({});

  // ================== FILE CLICK ==================
  const handleClick = async (node) => {
    // 📁 Folder click → toggle expand/collapse
    if (node.isDirectory) {
      setExpandedFolders((prev) => ({
        ...prev,
        [node.path]: !prev[node.path],
      }));

      return;
    }

    try {
      // ✅ Toggle selection
      const isAlreadySelected = selectedFilePaths.includes(node.path);

      // 🔴 If already selected → remove selection
      if (isAlreadySelected) {
        setSelectedFilePaths((prev) =>
          prev.filter((path) => path !== node.path),
        );
        setActiveTab(node.name);
        setSelectedFiles((prev) =>
          prev.filter((file) => file.name !== node.name),
        );

        return;
      }

      // 📄 Fetch file content
      const res = await fetch("http://localhost:5000/get-file", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ filePath: node.path }),
      });

      const data = await res.json();

      // ✅ Add highlight
      setSelectedFilePaths((prev) => [...prev, node.path]);

      // ✅ Add selected file
      setSelectedFiles((prev) => [
        ...prev,
        {
          name: node.name,
          content: data.content,
        },
      ]);
      setActiveTab(node.name);
    } catch (err) {
      console.error("File load error:", err);
    }
  };

  // ================== TREE RENDER ==================
  const renderTree = (nodes, level = 0) => {
    return nodes.map((node, index) => {
      const isExpanded = expandedFolders[node.path];
      const isSelected = selectedFilePaths.includes(node.path);

      return (
        <div key={index}>
          <div
            onClick={() => handleClick(node)}
            onMouseEnter={(e) => {
              if (!isSelected) {
                e.currentTarget.style.background = "#2a2d2e";
              }
            }}
            onMouseLeave={(e) => {
              if (!isSelected) {
                e.currentTarget.style.background = "transparent";
              }
            }}
            style={{
              cursor: "pointer",
              padding: "6px 8px",
              paddingLeft: `${level * 16 + 8}px`,
              display: "flex",
              alignItems: "center",
              gap: "8px",
              borderRadius: "6px",
              marginBottom: "2px",

              // ✅ Multi-select highlight
              background: isSelected ? "#f5b942" : "transparent",

              color: isSelected ? "#1a1a1a" : "#e4e4e4",

              transition: "all 0.15s ease",
              userSelect: "text",
            }}
          >
            {/* 📁 Folder Icons */}
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              {node.isDirectory &&
                (isExpanded ? (
                  <VscChevronDown color="#aaaaaa" />
                ) : (
                  <VscChevronRight color="#aaaaaa" />
                ))}

              {node.isDirectory ? (
                isExpanded ? (
                  <FaFolderOpen color="#e8c547" />
                ) : (
                  <FaFolder color="#e8c547" />
                )
              ) : (
                getFileIcon(node.name, isSelected)
              )}
            </div>

            <span style={{ fontSize: "14px" }}>{node.name}</span>
          </div>

          {/* ✅ Show children only if expanded */}
          {node.isDirectory && isExpanded && node.children.length > 0 && (
            <div>{renderTree(node.children, level + 1)}</div>
          )}
        </div>
      );
    });
  };

  const getFileIcon = (fileName, isSelected) => {
    const iconColor = isSelected ? "#1a1a1a" : undefined;

    if (fileName.endsWith(".jsx") || fileName.endsWith(".tsx")) {
      return <FaReact color={iconColor || "#61DBFB"} />;
    }

    if (fileName.endsWith(".js")) {
      return <FaJs color={iconColor || "#f7df1e"} />;
    }

    if (fileName.endsWith(".css")) {
      return <FaCss3Alt color={iconColor || "#2965f1"} />;
    }

    if (fileName.endsWith(".json")) {
      return <VscJson color={iconColor || "#f5f5f5"} />;
    }

    if (fileName.toLowerCase() === "readme.md") {
      return <FaMarkdown color={iconColor || "#42a5f5"} />;
    }

    return <FaFileAlt color={iconColor || "#9cdcfe"} />;
  };

  return (
    <div
      style={{
        padding: "10px",
        overflowY: "auto",
        height: "97.5%",
        background: "#16171d",
        color: "#e4e4e4",
      }}
    >
      <h4
        style={{
          marginBottom: "10px",
          marginTop: "10px",
          color: "#ffffff",
          fontWeight: "500",
        }}
      >
        Explorer
      </h4>

      <div>{renderTree(tree)}</div>
    </div>
  );
}

export default FileTree;
