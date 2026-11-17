"use client";

import { useEffect } from "react";

/** Forces light mode while mounted; restores the visitor's theme on leave. */
export function RestoreThemeOnLeave() {
  useEffect(() => {
    document.documentElement.classList.remove("dark");
    return () => {
      try {
        const t = localStorage.getItem("theme");
        const dark = t ? t === "dark" : true;
        document.documentElement.classList.toggle("dark", dark);
      } catch {
        /* ignore */
      }
    };
  }, []);
  return null;
}
