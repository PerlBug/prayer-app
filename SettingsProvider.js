import React, { useContext } from "react";
import SettingsContext from "./SettingsContext";
import { usePersistedContext } from "./usePersistedContext";

const SettingsProvider = ({ children }) => {
  const [state, setState] = usePersistedContext({
    theme: "light",
    language: "en",
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

  return (
    <SettingsContext.Provider value={{ ...state, toggleTheme, setLanguage }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  return useContext(SettingsContext);
};

export default SettingsProvider;
