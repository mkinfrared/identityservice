import { useCallback, useEffect, useState } from "react";
import { useLocalStorage } from "react-use";

import { Theme } from "./useTheme.type";

const useTheme = (themeKey: string) => {
  const darkSchemeQuery = window.matchMedia("(prefers-color-scheme: dark)");

  const [preferredTheme, setPreferredTheme] = useState<Theme>(() =>
    darkSchemeQuery.matches ? "dark" : "light",
  );

  const [savedTheme, setSavedTheme] = useLocalStorage<Theme>(themeKey);

  const handleColorPreferenceChange = (event: MediaQueryListEvent) => {
    setPreferredTheme(event.matches ? "dark" : "light");
  };

  const toggleTheme = useCallback(() => {
    const prevTheme = savedTheme ?? preferredTheme;
    const newTheme = prevTheme === "dark" ? "light" : "dark";

    setSavedTheme(newTheme);
  }, [preferredTheme, savedTheme, setSavedTheme]);

  useEffect(() => {
    darkSchemeQuery.addEventListener("change", handleColorPreferenceChange);

    return () => {
      darkSchemeQuery.removeEventListener(
        "change",
        handleColorPreferenceChange,
      );
    };
  }, []);

  return { theme: savedTheme || preferredTheme, toggleTheme };
};

export { useTheme };
