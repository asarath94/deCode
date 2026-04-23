const express = require("express");
const cors = require("cors");
const simpleGit = require("simple-git");
const fs = require("fs");
const path = require("path");

// ✅ CREATE APP FIRST
const app = express();

// ✅ MIDDLEWARE
app.use(cors());
app.use(express.json());

// ✅ INIT GIT
const git = simpleGit();


// ✅ HELPER FUNCTION
function getFileTree(dir) {
  const files = fs.readdirSync(dir);

  return files
    .filter((file) => file !== "node_modules" && file !== ".git")
    .map((file) => {
      const fullPath = path.join(dir, file);
      const isDirectory = fs.statSync(fullPath).isDirectory();

      return {
        name: file,
        path: fullPath,
        isDirectory,
        children: isDirectory ? getFileTree(fullPath) : [],
      };
    });
}


// ✅ ROUTE (AFTER app is defined)
app.post("/load-repo", async (req, res) => {
    console.log("Request received:", req.body);
  const { repoUrl } = req.body;
  const repoPath = path.join(__dirname, "repos", "project");

  try {
    if (fs.existsSync(repoPath)) {
      fs.rmSync(repoPath, { recursive: true, force: true });
    }

    await git.clone(repoUrl, repoPath);

    const tree = getFileTree(repoPath);

    res.json({ tree });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to process repo" });
  }
});


// ✅ START SERVER LAST
app.listen(5000, () => {
  console.log("Server running on port 5000");
});