require("dotenv").config();
const express = require("express");
const cors = require("cors");
const simpleGit = require("simple-git");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173", "https://de-code-phi.vercel.app"],
    methods: ["GET", "POST"],
    credentials: true,
  }),
);
app.use(express.json());

const git = simpleGit();

const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ================== FILE TREE ==================
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

// ================== IMPORTANT FILES ==================
function getImportantFiles(dir, depth = 0) {
  const result = [];

  if (depth > 2) return result;

  let files;
  try {
    files = fs.readdirSync(dir);
  } catch {
    return result;
  }

  files.forEach((file) => {
    if (file === "node_modules" || file === ".git") return;

    const fullPath = path.join(dir, file);

    let stat;
    try {
      stat = fs.statSync(fullPath);
    } catch {
      return;
    }

    if (stat.isDirectory()) {
      result.push(...getImportantFiles(fullPath, depth + 1));
    } else {
      if (
        file === "README.md" ||
        file === "package.json" ||
        file.endsWith(".js") ||
        file.endsWith(".jsx") ||
        file.endsWith(".ts") ||
        file.endsWith(".tsx")
      ) {
        result.push({ name: file, path: fullPath });
      }
    }
  });

  // PRIORITY SORT
  result.sort((a, b) => {
    const priority = (file) => {
      if (file.name === "README.md") return 1;
      if (file.name === "package.json") return 2;
      if (file.name.includes("index")) return 3;
      if (file.name.includes("app")) return 4;
      return 5;
    };
    return priority(a) - priority(b);
  });

  return result.slice(0, 5);
}

// ================== LOAD REPO ==================
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
    res.status(500).json({
      error: "Invalid repository URL or repository does not exist",
    });
  }
});

// ================== GET FILE ==================
app.post("/get-file", (req, res) => {
  const { filePath } = req.body;

  try {
    const content = fs.readFileSync(filePath, "utf-8");
    res.json({ content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to read file" });
  }
});

// ================== ASK AI (FILE LEVEL) ==================
app.post("/ask-ai", async (req, res) => {
  const { content, question } = req.body;

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
You are a senior software engineer.

Analyze the following files:

${content}

Question:
${question}

Answer in:
1. Summary
2. Key functionality
3. How files interact
4. Format your response using Markdown with headings, bullet points, and code blocks where appropriate.
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;

    res.json({ answer: response.text() });
  } catch (err) {
    console.error("Gemini Error:", err);
    res.status(500).json({ error: "AI request failed" });
  }
});

// ================== ANALYZE REPO (FIXED VERSION) ==================
app.post("/analyze-repo", async (req, res) => {
  const repoPath = path.join(__dirname, "repos", "project");

  try {
    const importantFiles = getImportantFiles(repoPath);
    console.log("Important files:", importantFiles);

    if (importantFiles.length === 0) {
      return res.json({
        analysis: "Could not find relevant files in this repository.",
      });
    }

    // 🔥 COMBINE ALL FILE CONTENT (SINGLE AI CALL)
    const combinedContent = importantFiles
      .map((file) => {
        const content = fs.readFileSync(file.path, "utf-8").slice(0, 1500);
        return `File: ${file.name}\n${content}`;
      })
      .join("\n\n");

    const prompt = `
You are a senior software engineer.

Analyze the following project files:

${combinedContent}

Explain clearly:
1. What this project does
2. Key features
3. Tech stack
4. High-level architecture
Keep the explanation concise and avoid unnecessary assumptions.
Format your response using Markdown with headings, bullet points, and code blocks where appropriate.
`;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;

    res.json({ analysis: response.text() });
  } catch (err) {
    console.error("Analyze Repo Error:", err);
    res.status(500).json({ error: "Repo analysis failed" });
  }
});

// ================== START SERVER ==================
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
