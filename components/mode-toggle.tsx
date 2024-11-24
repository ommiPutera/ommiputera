"use client";

import { useTheme } from "next-themes";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <span
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="text-blue-700 dark:text-blue-500 font-medium"
    >
      <span className="inline-block dark:hidden">Dark 🌕</span>
      <span className="hidden dark:inline-block">Light 💡</span>
    </span>
  );
}
