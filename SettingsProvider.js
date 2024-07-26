import React, { useContext, useState, useReducer } from "react";
import SettingsContext from "./SettingsContext";
import { usePersistedContext } from "./usePersistedContext";

// Bookmark reducer
const bookmarkReducer = (state, action) => {
  switch (action.type) {
    case "ADD_BOOKMARK":
      return [...state, action.payload];
    case "REMOVE_BOOKMARK":
      return state.filter(
        (bookmark) =>
          bookmark.language !== action.payload.language ||
          bookmark.slug !== action.payload.slug ||
          bookmark.prayerId !== action.payload.prayerId
      );
    default:
      return state;
  }
};
export const defaultPersistedState = {
  theme: "dark",
  language: "en",
  fontSize: 20,
  bookmarks: [], // Initialize bookmarks as an empty array
};

const SettingsProvider = ({ children }) => {
  const [persistedState, setPersistedState] = usePersistedContext(
    defaultPersistedState
  );
  console.log({ persistedState });
  const [bookmarks, dispatchBookmarks] = useReducer(
    bookmarkReducer,
    persistedState.bookmarks || []
  );

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

  // Function to add or remove a bookmark
  const toggleBookmark = (language, slug, prayerId, name, category) => {
    const bookmarkExists = isBookmarked(language, slug, prayerId);
    const action = {
      type: bookmarkExists ? "REMOVE_BOOKMARK" : "ADD_BOOKMARK",
      payload: { language, slug, prayerId, name, category },
    };

    console.log({ persistedState });
    const updatedBookmarks = bookmarkReducer(
      persistedState.bookmarks || [],
      action
    );

    dispatchBookmarks(action);

    setPersistedState((prevState) => ({
      ...prevState,
      bookmarks: updatedBookmarks,
    }));
  };

  // Function to check if a prayer is bookmarked
  const isBookmarked = (language, slug, prayerId) => {
    return (persistedState.bookmarks || []).some(
      (bookmark) =>
        bookmark.language === language &&
        bookmark.slug === slug &&
        bookmark.prayerId === prayerId
    );
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
        toggleBookmark,
        isBookmarked,
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
