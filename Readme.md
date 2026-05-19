# deCode (AI Codebase Assistant) 🚀

**deCode** is a powerful, IDE-style AI coding assistant that lets you instantly clone, explore, and analyze any public GitHub repository. Powered by Google Gemini AI, it provides a seamless developer workspace directly in your browser, allowing you to view syntax-highlighted code, interact with a smart AI chat to understand the codebase, and navigate file structures with ease.

### 🌟 Live Demo
**<a href="https://de-code-phi.vercel.app/" target="_blank">Try deCode out here!</a>**

---

## ✨ Features

- **Instant Repo Loading:** Enter any public GitHub URL and instantly clone and visualize its file tree.
- **IDE-Like Experience:** Read code with beautiful syntax highlighting, multi-tab support, and recursive folder navigation.
- **AI Repository Analysis:** Get an automatic high-level architectural overview of the entire repository upon loading.
- **Context-Aware AI Chat:** Select multiple files in the explorer and ask the AI specific questions about their implementation, bugs, or logic.
- **Fully Responsive Design:** A meticulously crafted UI that works flawlessly on both desktop and mobile devices (featuring a native-app-like bottom navigation on mobile).
- **Dark/Light Mode:** Toggle between sleek dark and clean light themes dynamically.

---

## 🛠️ Tech Stack

- **Frontend:** React, Vite, React Router, `react-syntax-highlighter`, `react-markdown`
- **Backend:** Node.js, Express, `simple-git`
- **AI Engine:** Google Gemini API (`@google/genai` or similar)
- **Deployment:** Vercel (Frontend), Node Server (Backend)

---

## 🚀 Getting Started (Local Development)

Follow these instructions to run the project locally with your own AI API keys.

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher)
- [Git](https://git-scm.com/) installed on your machine
- A [Google Gemini API Key](https://aistudio.google.com/app/apikey)

### 2. Clone the Repository
```bash
git clone <your-repo-url>
cd ai-codebase-assistant
```

### 3. Backend Setup
Navigate to the backend directory and install dependencies:
```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` folder and add your Gemini API Key:
```env
# backend/.env
GEMINI_API_KEY=your_gemini_api_key_here
PORT=5000
```

Start the backend server:
```bash
node server.js
```

### 4. Frontend Setup
Open a new terminal window, navigate to the frontend directory, and install dependencies:
```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend/` folder and point it to your local backend:
```env
# frontend/.env
VITE_API_URL=http://localhost:5000
```

Start the frontend development server:
```bash
npm run dev
```

The application will be running at `http://localhost:5173`.

---

## 🌍 Deployment

### Frontend (Vercel, Netlify, etc.)
The frontend is optimized for zero-config deployment on Vercel. 
1. Push your code to GitHub.
2. Import the `frontend` folder into Vercel.
3. In your Vercel project settings, add the Environment Variable:
   - `VITE_API_URL` = `https://your-deployed-backend-url.com`
4. Deploy!

### Backend (Render, Railway, Heroku)
The Node.js backend requires a server environment that supports Git (since it actively clones repositories to analyze them).
1. Deploy the `backend` folder as a Web Service on platforms like Render or Railway.
2. Ensure you add your Environment Variables in your hosting provider's dashboard:
   - `GEMINI_API_KEY` = `your_api_key`
   - `PORT` = `5000`
3. *Important:* Update the `cors` configuration in `backend/server.js` to whitelist your newly deployed frontend URL.

---

## 💡 Usage

1. Open the app and paste a public GitHub repository URL into the input field (e.g., `https://github.com/facebook/react`).
2. Click **Load Repo** to view the file tree.
3. Click **Analyze Repo** to generate an AI summary of the project.
4. Click on any file in the Explorer to read its code.
5. While reading, you can type questions into the AI chat box in the bottom right to ask about the specific files you have open!

---

*Built with ❤️ for developers.*
