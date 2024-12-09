"use client";

import { ArrowLeft } from "lucide-react";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { cn } from "~/lib/utils";

type THeaderProps = {
  withHome?: boolean;
  title?: string;
};

export default function ShellPage({
  title = "ommiputera.com",
  withHome = false,
  children,
  withBack = false,
}: {
  children: React.ReactNode;
  withBack?: boolean;
} & THeaderProps) {
  return (
    <div className="mx-auto max-w-[680px]">
      <div className="flex flex-col relative">
        <div className="z-10 flex flex-col space-y-1 min-h-[var(--hero-height-mobile)] md:min-h-[var(--hero-height)] md:space-y-2 sticky top-0 pt-12 md:pt-20">
          <Header title={title} withHome={withHome} />
          {withBack && <BackBtn />}
          <RoundedBorder />
        </div>
        <main role="main" className="px-2.5 md:px-14 relative overflow-hidden">
          <div className="min-h-screen bg-white dark:bg-black border-x border-b border-neutral-200 dark:border-neutral-800 divide-y divide-neutral-200 dark:divide-neutral-800 relative">
            {children}
            <Footer />
          </div>
        </main>
      </div>
    </div>
  );
}

function BackBtn() {
  const router = useRouter();
  return (
    <div className="absolute -top-0.5 -.5 px-7 md:px-20 pt-4 md:pt-6 w-6 h-6">
      <button onClick={() => router.back()}>
        <ArrowLeft className="w-5 h-5 stroke-neutral-900 dark:stroke-neutral-100 stroke-3" />
      </button>
    </div>
  );
}

function Header({ title, withHome }: THeaderProps) {
  const pathname = usePathname();
  return (
    <nav
      role="navigation"
      className="absolute top-0 px-7 md:px-20 bg-background text-center w-full h-full pt-4 md:pt-6"
    >
      <header role="banner">
        <h1 className="text-sm font-bold">{title}</h1>
      </header>
      <nav role="navigation">
        <ul className="flex gap-5 text-sm justify-center md:mt-1">
          <li className="underline text-muted-foreground">
            <Link href="/" className="flex items-center">
              Resume
            </Link>
          </li>
          <li
            className={cn(
              "underline text-muted-foreground",
              pathname.startsWith("/blog") && "text-blue-500",
            )}
          >
            <Link href="/blog" className="flex items-center">
              Blog
            </Link>
          </li>
          <li
            className={cn(
              "underline text-muted-foreground",
              pathname.startsWith("/projects") && "text-blue-500",
            )}
          >
            <Link href="/projects" className="flex items-center">
              Projects
            </Link>
          </li>
          {withHome && (
            <li className="underline text-muted-foreground">
              <Link href="/">Home</Link>
            </li>
          )}
        </ul>
      </nav>
    </nav>
  );
}

function RoundedBorder() {
  return (
    <div>
      <div className="w-full h-[1px] top-[calc(var(--hero-height-mobile)_-_0.5px)] md:top-[calc(var(--hero-height)_-_0.5px)] absolute overflow-hidden">
        <div className="w-[calc(100%_-_96px)] md:w-[calc(100%_-_190px)] left-1/2 -translate-x-1/2 absolute bottom-0 border-t border-neutral-200 dark:border-neutral-800"></div>
      </div>
      <div className="w-10 h-10 top-[var(--hero-height-mobile)] md:top-[var(--hero-height)] absolute overflow-hidden left-2.5 md:left-14">
        <div className="absolute top-0 left-0 w-14 h-12 border border-neutral-200 dark:border-neutral-800 rounded-tl-3xl shadow-circle"></div>
      </div>
      <div className="w-10 h-10 top-[var(--hero-height-mobile)] md:top-[var(--hero-height)] absolute overflow-hidden right-2.5 md:right-14">
        <div className="absolute top-0 right-0 w-14 h-12 border border-neutral-200 dark:border-neutral-800 rounded-tr-3xl shadow-circle"></div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer
      role="contentinfo"
      className="px-4 pb-12 pt-28 text-center md:px-6 md:pt-32 md:pb-16"
    >
      <p className="text-xs prose dark:prose-invert max-w-96 mx-auto">
        © {new Date().getFullYear()} Ommi Putera. All rights reserved.
      </p>
      <p className="text-xs prose dark:prose-invert max-w-72 mx-auto">
        Build with Kapal Api and 76 Mangga.
      </p>
    </footer>
  );
}
