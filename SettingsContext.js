import { createContext } from "react";

const SettingsContext = createContext({
  theme: "dark",
  language: "en", // default language
  fontSize: 20,
  toggleSettings: () => {},
  setLanguage: () => {},
});

export default SettingsContext;
