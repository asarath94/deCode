function FileTree({ tree, setSelectedFiles }) {
  const handleClick = async (node) => {
    if (node.isDirectory) return;

    const res = await fetch("http://localhost:5000/get-file", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ filePath: node.path }),
    });

    const data = await res.json();

    setSelectedFiles((prev) => [
      ...prev,
      { name: node.name, content: data.content },
    ]);
  };

  const renderTree = (nodes) => {
    return nodes.map((node, index) => (
      <li
        key={index}
        onClick={() => handleClick(node)}
        style={{ cursor: "pointer" }}
      >
        {node.name}
        {node.isDirectory && node.children.length > 0 && (
          <ul>{renderTree(node.children)}</ul>
        )}
      </li>
    ));
  };

  return (
    <div style={{ padding: "10px", overflow: "auto" }}>
      <h4>Files</h4>
      <ul>{renderTree(tree)}</ul>
    </div>
  );
}

export default FileTree;
