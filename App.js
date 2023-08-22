import React, { useState, useMemo } from "react";
import ThemeContext from "./ThemeContext";
import Main from "./Main";

export default function App() {
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const themeValue = useMemo(() => ({ theme, toggleTheme }), [theme]);

  return (
    <>
      <ThemeContext.Provider value={themeValue}>
        <Main />
      </ThemeContext.Provider>
    </>
  );
}
