import React from "react";
import Main from "./Main";
import SettingsProvider from "./SettingsProvider";

export default function App() {
  return (
    <>
      <SettingsProvider>
        <Main />
      </SettingsProvider>
    </>
  );
}
