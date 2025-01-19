"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { ArrowLeft, Ellipsis } from "lucide-react";

// import { cn } from "~/lib/utils";

export function BackBtn() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      aria-label="back button"
      className="p-2 rounded-full border bg-white dark:bg-black"
    >
      <ArrowLeft className="w-4 h-4 stroke-neutral-900 dark:stroke-neutral-100 stroke-3" />
    </button>
  );
}

export function Menu() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      aria-label="menu"
      className="p-2 rounded-full border bg-white dark:bg-black"
    >
      <Ellipsis className="w-4 h-4 stroke-neutral-900 dark:stroke-neutral-100 stroke-3" />
    </button>
  );
}

export function Header() {
  // const pathname = usePathname();
  return (
    <nav
      role="navigation"
      className="absolute top-0 bg-background w-full h-full flex items-center justify-center"
    // className="absolute top-0 px-7 md:px-20 bg-background text-center w-full h-full pt-2.5 md:pt-4"
    >
      <header role="banner">
        <h1 className="text-sm font-bold hover:text-neutral-400">
          <Link href="/">ommiputera.com</Link>
        </h1>
      </header>
      {/* <nav role="navigation">
        <ul className="flex text-sm justify-center items-center">
          <li className="text-muted-foreground hover:text-neutral-600 cursor-pointer">
            <Link
              href="https://read.cv/ommiputera"
              target="_blank"
              className="flex items-center py-1.5 md:py-3 px-2 md:px-3"
            >
              Resume
            </Link>
          </li>
          <li
            className={cn(
              "text-muted-foreground hover:text-neutral-600 cursor-pointer",
              pathname.startsWith("/blog") &&
              "text-blue-600 dark:text-blue-400 font-semibold",
            )}
          >
            <Link
              href="/blog"
              className="flex items-center py-1.5 md:py-3 px-2 md:px-3"
            >
              Blog
            </Link>
          </li>
          <li
            className={cn(
              "text-muted-foreground hover:text-neutral-600 cursor-pointer",
              pathname.startsWith("/project") &&
              "text-blue-600 dark:text-blue-400 font-semibold",
            )}
          >
            <Link
              href="/projects"
              className="flex items-center py-1.5 md:py-3 px-2 md:px-3"
            >
              Projects
            </Link>
          </li>
        </ul>
      </nav> */}
    </nav>
  );
}
