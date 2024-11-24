"use client";

import React from "react";

import { useTheme } from "next-themes";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <span
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="text-blue-700 dark:text-blue-500 font-medium"
    >
      <span className="inline-block dark:hidden hover:underline">Dark</span>
      <span className="hidden dark:inline-block hover:underline">Light</span>
    </span>
  );
}

export function ModeEmoji() {
  return (
    <>
      <span className="inline-block dark:hidden">🌕</span>
      <span className="hidden dark:inline-block">💡</span>
    </>
  );
}

export function ModeClickable({ children }: { children: React.ReactNode }) {
  const { theme, setTheme } = useTheme();
  return (
    <div onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      {children}
    </div>
  );
}
