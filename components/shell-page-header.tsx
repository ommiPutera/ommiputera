"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { ArrowLeft, Ellipsis } from "lucide-react";
import { useTheme } from "next-themes";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

export function BackBtn() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      aria-label="back"
      className="p-2 rounded-full"
    >
      <ArrowLeft className="w-4 h-4 stroke-neutral-900 dark:stroke-neutral-100 stroke-3" />
    </button>
  );
}

export function Menu() {
  const { theme, setTheme } = useTheme();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button aria-label="menu" className="p-2 rounded-full">
          <Ellipsis className="w-4 h-4 stroke-neutral-900 dark:stroke-neutral-100 stroke-3" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[180px]" alignOffset={-10}>
        <DropdownMenuItem asChild>
          <Link href="/">Home</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="https://read.cv/ommiputera" target="_blank">
            View my resume
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/about">About me</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/short">Read the short</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/blog">Read the blog</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/projects">Read the projects</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/#contact">Contact me</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="w-full"
          >
            {theme === "dark" ? "Light" : "Dark"} mode
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function Header() {
  return (
    <nav
      role="navigation"
      className="absolute top-0 bg-background w-full h-full flex items-center justify-center"
    >
      <header role="banner">
        <h1 className="text-sm font-bold hover:text-neutral-400">
          <Link href="/">ommiputera.com</Link>
        </h1>
      </header>
    </nav>
  );
}
