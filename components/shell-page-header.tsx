"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { ArrowLeft, ChevronDown } from "lucide-react";
import { useTheme } from "next-themes";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

import { cn } from "~/lib/utils";

export function BackBtn() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      aria-label="back"
      className="inline-flex items-center gap-1 justify-center"
    >
      <ArrowLeft className="w-4 h-4 stroke-neutral-900 dark:stroke-neutral-100 stroke-3" />
      <span className="text-xs font-medium">Back</span>
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
      <DropdownMenuContent align="end" className="w-[230px]" alignOffset={-10}>
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
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/short">Read the Short</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/blog">Read the Blog</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/projects">Read the Projects</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/about">About me</Link>
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
          className="inline-flex gap-8 w-full ml-20 md:ml-36"
        >
          <h1 className="text-xs text-foreground font-bold truncate w-full max-w-[260px] md:max-w-[380px]">
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
