import { createContext } from "react";

export const settingsInitialState = {
  theme: "dark",
  language: "en", // default language
  fontSize: 20,
  toggleTheme: () => {},
  setLanguage: () => {},
  setFontSize: () => {},
  infoText: "",
  infoTitle: "",
  setInfoTitle: () => {},
  setInfoText: () => {},
  bookmarks: [], // Array to store bookmarks
  toggleBookmark: (language, slug, prayerId, name, category) => {}, // Function to add or remove a bookmark
  isBookmarked: (language, slug, prayerId) => false, // Function to check if a prayer is bookmarked
};

const SettingsContext = createContext(settingsInitialState);

export default SettingsContext;
