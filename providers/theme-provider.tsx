"use client";

import type React from "react";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";
type ColorTheme = "blue" | "green" | "purple" | "orange";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  defaultColorTheme?: ColorTheme;
  storageKey?: string;
  colorStorageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  colorTheme: ColorTheme;
  setTheme: (theme: Theme) => void;
  setColorTheme: (colorTheme: ColorTheme) => void;
};

const initialState: ThemeProviderState = {
  theme: "light",
  colorTheme: "blue",
  setTheme: () => null,
  setColorTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "light",
  defaultColorTheme = "blue",
  storageKey = "waba-ui-theme",
  colorStorageKey = "waba-ui-color-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const [colorTheme, setColorTheme] = useState<ColorTheme>(defaultColorTheme);

  useEffect(() => {
    const root = window.document.documentElement;

    // Remove previous theme classes
    root.classList.remove("light", "dark");
    root.removeAttribute("data-theme");

    // Apply new theme
    root.classList.add(theme);
    root.setAttribute("data-theme", colorTheme);
  }, [theme, colorTheme]);

  useEffect(() => {
    const storedTheme = localStorage.getItem(storageKey) as Theme;
    const storedColorTheme = localStorage.getItem(
      colorStorageKey
    ) as ColorTheme;

    if (storedTheme) {
      setTheme(storedTheme);
    }

    if (storedColorTheme) {
      setColorTheme(storedColorTheme);
    }
  }, [storageKey, colorStorageKey]);

  const value = {
    theme,
    colorTheme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
    setColorTheme: (colorTheme: ColorTheme) => {
      localStorage.setItem(colorStorageKey, colorTheme);
      setColorTheme(colorTheme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
