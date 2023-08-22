import React from "react";
import pallete from "./theme";
import { useSettings } from "./SettingsProvider";

const useTheme = () => {
  const { theme } = useSettings();

  const {
    primaryBg,
    secondaryBg,
    primaryText,
    secondaryText,
    accent,
    accentSecondary,
    border,
    shadow,
    inputBg,
  } = pallete[theme];

  return {
    primaryBg,
    secondaryBg,
    primaryText,
    secondaryText,
    accent,
    accentSecondary,
    border,
    shadow,
    inputBg,
  };
};

export default useTheme;
