"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { ArrowLeft, ChevronDown } from "lucide-react";
import { useTheme } from "next-themes";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

import { cn } from "~/lib/utils";

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
        <button
          aria-label="menu"
          className="p-1 mt-0.5 rounded-full border bg-white dark:bg-black"
        >
          <ChevronDown className="w-4 h-4 stroke-neutral-900 dark:stroke-neutral-100 stroke-3" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]" alignOffset={-10}>
        <DropdownMenuItem asChild>
          <Link href="/">Highlights</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/posts">Posts</Link>
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

export function Header({ title }: { title: string }) {
  const pathname = usePathname();
  return (
    <nav
      role="navigation"
      className="absolute top-0 bg-background w-full h-full flex items-center justify-center"
    >
      {title ? (
        <header
          role="banner"
          className="inline-flex gap-8 w-full ml-16 md:ml-28"
        >
          <h1 className="text-xs text-foreground font-semibold max-w-[200px] md:max-w-[380px] line-clamp-1">
            {title}
          </h1>
        </header>
      ) : (
        <header role="banner" className="inline-flex gap-8 cursor-pointer">
          <h1
            className={cn(
              "text-xs text-muted-foreground/80 font-semibold",
              pathname === "/" && "text-foreground",
            )}
          >
            <Link href="/">Highlights</Link>
          </h1>
          <h1
            className={cn(
              "text-xs text-muted-foreground/80 font-semibold",
              pathname === "/posts" && "text-foreground",
            )}
          >
            <Link href="/posts">Posts</Link>
          </h1>
        </header>
      )}
    </nav>
  );
}
