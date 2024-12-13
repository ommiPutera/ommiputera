"use client";

import {
  ArrowLeftIcon,
  HouseIcon,
  PenLineIcon,
  SunMoonIcon,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useTheme } from "next-themes";
import React from "react";
import { Footer } from "~/components/shell-page";

import { FloatingDock } from "~/components/ui/floating-dock";

export function ProjectShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  const links = [
    {
      title: "Back",
      icon: (
        <ArrowLeftIcon className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      onClick: () => router.back(),
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
      title: "Toggle dark/light mode",
      icon: (
        <SunMoonIcon className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      onClick: () => setTheme(theme === "dark" ? "light" : "dark"),
    },
  ];

  return (
    <div className="mt-8 md:mt-20">
      <div className="flex flex-col relative">
        <div className="fixed bottom-10 md:bottom-12 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2">
          <FloatingDock items={links} />
        </div>
        <header role="banner">
          <h1 className="text-sm font-medium underline text-center">
            <Link
              href="/"
              className="text-blue-600 dark:text-blue-400 font-bold cursor-pointer"
            >
              Ommi Putera
            </Link>
          </h1>
        </header>
        <main role="main" className="relative overflow-hidden">
          <div className="min-h-screen relative p-2 md:p-0 pb-12 md:pb-32 flex flex-col gap-6 md:gap-14">
            {children}
            <Footer />
          </div>
        </main>
      </div>
    </div>
  );
}

export function Container({ children }: { children: React.ReactNode }) {
  return <div className="px-4 md:px-7 mx-auto max-w-screen-sm">{children}</div>;
}

export function FullContainer({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto w-full">{children}</div>;
}
