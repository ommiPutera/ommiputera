import Link from "next/link";
import { Header, THeaderProps, BackBtn } from "./shell-page-header";

export default function ShellPage({
  withHome = false,
  children,
  withBack = false,
}: {
  children: React.ReactNode;
  withBack?: boolean;
} & THeaderProps) {
  return (
    <div className="mx-auto w-full max-w-[var(--shell-page-width)]">
      <section className="flex flex-col relative">
        <div className="z-10 w-full max-w-[var(--shell-page-width)] mx-auto flex flex-col space-y-1 h-[var(--header-height-mobile)] md:h-[var(--header-height)] md:space-y-2 fixed top-0 pt-12 md:pt-20">
          <Header withHome={withHome} />
          {withBack && (
            <div className="fixed -top-3 px-7 md:px-20 pt-4 md:pt-6 w-6 h-6">
              <BackBtn />
            </div>
          )}
          <RoundedBorder />
        </div>
        <div className="h-[var(--header-height-mobile)] md:h-[var(--header-height)] bg-white dark:bg-black border-x border-neutral-200 dark:border-neutral-800"></div>
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
      <nav role="navigation" className="pb-12 md:pb-24">
        <div className="text-center pb-6">
          <h1 className="text-base font-bold hover:text-neutral-400">
            <Link href="/">ommiputera.com</Link>
          </h1>
          <p className="text-sm text-muted-foreground">Software Engineer</p>
        </div>
        <ul className="flex text-sm justify-center items-center">
          <li className="text-muted-foreground hover:text-neutral-600">
            <Link
              href="https://read.cv/ommiputera"
              target="_blank"
              className="flex items-center py-1 px-1.5 md:px-2"
            >
              Resume
            </Link>
          </li>
          <li className="text-muted-foreground hover:text-neutral-600">
            <Link
              href="/blog"
              className="flex items-center py-1 px-1.5 md:px-2"
            >
              Blog
            </Link>
          </li>
          <li className="text-muted-foreground hover:text-neutral-600">
            <Link
              href="/about"
              className="flex items-center py-1 px-1.5 md:px-2"
            >
              About
            </Link>
          </li>
          <li className="text-muted-foreground hover:text-neutral-600">
            <Link
              href="/projects"
              className="flex items-center py-1 px-1.5 md:px-2"
            >
              Projects
            </Link>
          </li>
        </ul>
      </nav>
      <footer
        role="contentinfo"
        className="px-4 pb-6 text-center md:px-6 md:pb-10"
      >
        <p className="text-xs max-w-96 mx-auto font-medium text-muted-foreground">
          All rights reserved © Ommi Putera {new Date().getFullYear()}.
        </p>
        <p className="text-xs max-w-72 mx-auto font-medium text-muted-foreground">
          Build with Kapal Api and 76 Mangga.
        </p>
      </footer>
    </div>
  );
}
