import { createContext } from "react";

const SettingsContext = createContext({
  theme: "light",
  language: "en", // default language
  toggleSettings: () => {},
  setLanguage: () => {},
});

export default SettingsContext;
