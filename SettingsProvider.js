import React, { useContext } from "react";
import SettingsContext from "./SettingsContext";
import { usePersistedContext } from "./usePersistedContext";

const SettingsProvider = ({ children }) => {
  const [state, setState] = usePersistedContext({
    theme: "dark",
    language: "en",
    fontSize: 20,
  });

  const toggleTheme = () => {
    setState((prevState) => ({
      ...prevState,
      theme: prevState.theme === "light" ? "dark" : "light",
    }));
  };

  const setLanguage = (newLanguage) => {
    setState((prevState) => ({ ...prevState, language: newLanguage }));
  };

  const setFontSize = (newFontSize) => {
    setState((prevState) => ({ ...prevState, fontSize: newFontSize }));
  };
  return (
    <SettingsContext.Provider
      value={{ ...state, toggleTheme, setLanguage, setFontSize }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  return useContext(SettingsContext);
};

export default SettingsProvider;
