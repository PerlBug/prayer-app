import React, { useContext } from "react";
import pallete from "./theme";
import ThemeContext from "./ThemeContext";

const useTheme = () => {
  const { theme } = useContext(ThemeContext);
  console.log({ theme });
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
