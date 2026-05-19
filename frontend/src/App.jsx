import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import Workspace from "./pages/Workspace";

import { useState } from "react";
import { darkTheme, lightTheme } from "./themes";
import useResponsive from "./hooks/useResponsive";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const theme = isDarkMode ? darkTheme : lightTheme;

  const { isMobile, isTablet, isDesktop } = useResponsive();

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
              isMobile={isMobile}
              isTablet={isTablet}
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
              isMobile={isMobile}
              isTablet={isTablet}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
