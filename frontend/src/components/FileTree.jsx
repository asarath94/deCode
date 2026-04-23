function FileTree({ tree }) {
  const renderTree = (nodes) => {
    return nodes.map((node, index) => (
      <li key={index}>
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