import { useEffect, useState } from "react";

type Theme = "light" | "dark";

/**
 * The inline script in index.html applies the saved or OS preference before first
 * paint, so React only needs to read the resulting class, never guess.
 */
const readInitialTheme = (): Theme => {
  if (typeof document === "undefined") return "light";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
};

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(readInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    try {
      localStorage.setItem("theme", theme);
    } catch {
      /* private mode or storage disabled: theme still applies for this page view */
    }
  }, [theme]);

  return { theme, toggle: () => setTheme((t) => (t === "dark" ? "light" : "dark")) };
}
