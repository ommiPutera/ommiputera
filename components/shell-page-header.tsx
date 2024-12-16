"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { ArrowLeft } from "lucide-react";

import { cn } from "~/lib/utils";

export type THeaderProps = {
  withHome?: boolean;
};
export function BackBtn() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      aria-label="back button"
      className="p-2 bg-white/30 dark:bg-black/30 backdrop-blur-sm rounded-full border"
    >
      <ArrowLeft className="w-4 h-4 stroke-neutral-900 dark:stroke-neutral-100 stroke-3" />
    </button>
  );
}

export function Header({ withHome }: THeaderProps) {
  const pathname = usePathname();
  return (
    <nav
      role="navigation"
      className="absolute top-0 px-7 md:px-20 bg-background text-center w-full h-full pt-3.5 md:pt-6"
    >
      <header role="banner">
        <h1 className="text-sm font-bold">ommiputera.com</h1>
      </header>
      <nav role="navigation">
        <ul className="flex text-sm justify-center items-center">
          <li className="text-muted-foreground">
            <Link
              href="https://read.cv/ommiputera"
              target="_blank"
              className="flex items-center py-1 px-1.5 md:px-2"
            >
              Resume
            </Link>
          </li>
          <li
            className={cn(
              "text-muted-foreground",
              pathname.startsWith("/blog") &&
              "text-blue-600 dark:text-blue-400 font-semibold",
            )}
          >
            <Link
              href="/blog"
              className="flex items-center py-1 px-1.5 md:px-2"
            >
              Blog
            </Link>
          </li>
          <li
            className={cn(
              "text-muted-foreground",
              pathname.startsWith("/project") &&
              "text-blue-600 dark:text-blue-400 font-semibold",
            )}
          >
            <Link
              href="/projects"
              className="flex items-center py-1 px-1.5 md:px-2"
            >
              Projects
            </Link>
          </li>
          {withHome && (
            <li className="text-muted-foreground">
              <Link href="/" className="flex items-center py-1 px-1.5 md:px-2">
                Home
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </nav>
  );
}
