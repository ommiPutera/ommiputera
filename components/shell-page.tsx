import Link from "next/link";

import { ModeClickable } from "./mode-toggle";
import { BackBtn, Header } from "./shell-page-header";

export default function ShellPage({
  children,
  withBack = false,
}: {
  children: React.ReactNode;
  withBack?: boolean;
}) {
  return (
    <div className="mx-auto w-full max-w-[var(--shell-page-width)]">
      <section className="flex flex-col relative">
        <div className="z-10 w-full max-w-[var(--shell-page-width)] mx-auto flex flex-col space-y-1 h-[var(--header-height-mobile)] md:h-[var(--header-height)] md:space-y-2 fixed top-0 pt-12 md:pt-20">
          <Header />
          {withBack && (
            <div className="fixed -top-3 px-7 md:px-20 pt-4 md:pt-6 w-6 h-6">
              <BackBtn />
            </div>
          )}
          <RoundedBorder />
        </div>
        <div className="sticky top-0 h-[var(--header-height-mobile)] md:h-[var(--header-height)] bg-white dark:bg-black border-x border-neutral-200 dark:border-neutral-800"></div>
        <div className="px-2.5 md:px-14 relative overflow-hidden">
          <div className="min-h-screen bg-white dark:bg-black border-x border-b border-neutral-200 dark:border-neutral-800 relative">
            <main
              role="main"
              className="divide-y divide-neutral-200 dark:divide-neutral-800"
            >
              {children}
            </main>
            <Footer />
          </div>
        </div>
      </section>
    </div>
  );
}

function RoundedBorder() {
  return (
    <div>
      <div className="w-full h-[1px] top-[var(--header-height-mobile)] md:top-[var(--header-height)] z-10 absolute overflow-hidden">
        <div className="h-[1px] w-[calc(100%_-_96px)] md:w-[calc(100%_-_190px)] left-1/2 -translate-x-1/2 absolute bottom-0 border-t border-neutral-200 dark:border-neutral-800"></div>
      </div>
      <div className="w-10 h-10 top-[var(--header-height-mobile)] md:top-[var(--header-height)] absolute overflow-hidden left-2.5 md:left-14">
        <div className="absolute top-0 left-0 w-14 h-12 border border-neutral-200 dark:border-neutral-800 rounded-tl-3xl shadow-circle"></div>
      </div>
      <div className="w-10 h-10 top-[var(--header-height-mobile)] md:top-[var(--header-height)] absolute overflow-hidden right-2.5 md:right-14">
        <div className="absolute top-0 right-0 w-14 h-12 border border-neutral-200 dark:border-neutral-800 rounded-tr-3xl shadow-circle"></div>
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <div className="pt-24 md:pt-32">
      <nav role="navigation" className="pb-32">
        <div className="text-center pb-6">
          <h1 className="text-sm font-normal text-muted-foreground max-w-[250px] mx-auto">
            Built with Kapal Api and 76 Mangga.
          </h1>
        </div>
        <ul className="flex justify-center items-center">
          <li className="text-muted-foreground hover:text-neutral-600">
            <Link
              href="https://read.cv/ommiputera"
              target="_blank"
              className="flex items-center py-6 px-4 md:px-3 text-sm"
            >
              Resume
            </Link>
          </li>
          <li className="text-muted-foreground hover:text-neutral-600">
            <Link
              href="/blog"
              className="flex items-center py-6 px-4 md:px-3 text-sm"
            >
              Blog
            </Link>
          </li>
          <li className="text-muted-foreground hover:text-neutral-600">
            <ModeClickable>
              <span className="flex items-center py-6 px-4 md:px-3 text-sm">
                Dark/Ligth
              </span>
            </ModeClickable>
          </li>
        </ul>
        <ul className="flex text-sm justify-center items-center">
          <li className="text-muted-foreground hover:text-neutral-600">
            <Link
              href="/about"
              className="flex items-center py-6 px-4 md:px-3 text-sm"
            >
              About
            </Link>
          </li>
          <li className="text-muted-foreground hover:text-neutral-600">
            <Link
              href="/projects"
              className="flex items-center py-6 px-4 md:px-3 text-sm"
            >
              Projects
            </Link>
          </li>
        </ul>
      </nav>
      <footer role="contentinfo" className="px-6 text-center pb-12 md:px-6">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Ommi Putera. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}
