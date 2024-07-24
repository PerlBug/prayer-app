import React, { useContext, useState } from "react";
import SettingsContext from "./SettingsContext";
import { usePersistedContext } from "./usePersistedContext";

const SettingsProvider = ({ children }) => {
  const [persistedState, setPersistedState] = usePersistedContext({
    theme: "dark",
    language: "en",
    fontSize: 20,
  });

  const [nonPersistedState, setNonPersistedState] = useState({
    infoText: "",
    infoTitle: "",
  });

  const toggleTheme = () => {
    setPersistedState((prevState) => ({
      ...prevState,
      theme: prevState.theme === "light" ? "dark" : "light",
    }));
  };

  const setLanguage = (newLanguage) => {
    setPersistedState((prevState) => ({ ...prevState, language: newLanguage }));
  };

  const setFontSize = (newFontSize) => {
    setPersistedState((prevState) => ({ ...prevState, fontSize: newFontSize }));
  };

  const setInfoText = (newInfoText) => {
    setNonPersistedState((prevState) => ({
      ...prevState,
      infoText: newInfoText,
    }));
  };

  const setInfoTitle = (newInfoTitle) => {
    setNonPersistedState((prevState) => ({
      ...prevState,
      infoTitle: newInfoTitle,
    }));
  };

  return (
    <SettingsContext.Provider
      value={{
        ...persistedState,
        ...nonPersistedState,
        toggleTheme,
        setLanguage,
        setFontSize,
        setInfoText,
        setInfoTitle,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  return useContext(SettingsContext);
};

export default SettingsProvider;
