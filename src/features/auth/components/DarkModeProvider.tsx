"use client";

import { ReactNode, useEffect } from "react";
import usePrefersColorScheme from "use-prefers-color-scheme";

import { DARK_MODE_LOCAL_STORAGE_KEY } from "@/helpers/darkMode";

export default function ClientApp({ children }: { children: ReactNode }) {
  const isDarkMode = usePrefersColorScheme();

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!(DARK_MODE_LOCAL_STORAGE_KEY in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return children;
}
