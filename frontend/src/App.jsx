import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import Workspace from "./pages/Workspace";

import { useState } from "react";
import { darkTheme, lightTheme } from "./themes";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              theme={theme}
              isDarkMode={isDarkMode}
              setIsDarkMode={setIsDarkMode}
            />
          }
        />

        <Route
          path="/workspace"
          element={
            <Workspace
              theme={theme}
              isDarkMode={isDarkMode}
              setIsDarkMode={setIsDarkMode}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
