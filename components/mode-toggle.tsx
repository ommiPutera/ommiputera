"use client";

import React from "react";

import { useTheme } from "next-themes";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <span
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="text-blue-600 dark:text-blue-400 font-medium"
    >
      <span className="inline-block dark:hidden underline">Dark</span>
      <span className="hidden dark:inline-block underline">Light</span>
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
    <span
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="cursor-pointer"
    >
      {children}
    </span>
  );
}
