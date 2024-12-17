"use client";

import {
  ArrowLeftIcon,
  HouseIcon,
  PenLineIcon,
  SunMoonIcon,
  XIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";

import { useTheme } from "next-themes";

import { FloatingDock } from "~/components/ui/floating-dock";

export function ProjectNavigation() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  const links = [
    {
      title: "Toggle dark/light mode",
      icon: (
        <SunMoonIcon className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      onClick: () => setTheme(theme === "dark" ? "light" : "dark"),
    },
    {
      title: "Blog",
      icon: (
        <PenLineIcon className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/blog",
    },
    {
      title: "Home",
      icon: (
        <HouseIcon className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/",
    },
    {
      title: "Back",
      icon: (
        <ArrowLeftIcon className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      onClick: () => router.back(),
    },
  ];

  return (
    <div className="fixed bottom-10 right-0 md:bottom-12 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2">
      <FloatingDock items={links} />
    </div>
  );
}

export function BackBtn() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      aria-label="back button"
      className="p-2 bg-white/60 backdrop-blur-sm rounded-full border"
    >
      <XIcon className="w-4 h-4 stroke-neutral-900 dark:stroke-neutral-100 stroke-3" />
    </button>
  );
}
