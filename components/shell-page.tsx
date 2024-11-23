import { ArrowDown } from "lucide-react";

import Link from "next/link";

export default function ShellPage({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto max-w-screen-sm">
      <main className="flex flex-col relative">
        <div className="z-10 flex flex-col space-y-1 min-h-[var(--hero-height-mobile)] md:min-h-[var(--hero-height)] md:space-y-2 sticky top-0 pt-12 md:pt-20">
          <Header />
          <RoundedBorder />
        </div>
        <div className="px-3 md:px-14 relative overflow-hidden">
          <div className="bg-white border-x border-b border-neutral-200 divide-y divide-neutral-200 relative">
            {children}
            <Footer />
          </div>
        </div>
      </main>
    </div>
  );
}

function Header() {
  return (
    <div className="absolute top-0 px-7 md:px-20 bg-background text-center w-full h-full pt-8 md:pt-12">
      <h1 className="text-base md:text-lg font-bold">ommiputera.com</h1>
      <ul className="flex gap-3 text-sm justify-center md:text-base">
        <li className="underline text-muted-foreground">
          <Link href="/">Github</Link>
        </li>
        <li className="underline text-muted-foreground">
          <Link href="/">LinkedIn</Link>
        </li>
        <li className="underline text-muted-foreground">
          <Link href="/" className="flex items-center gap-1">
            <span>Resume</span>
            <ArrowDown className="w-4 h-4 md:w-5 md:h-5 stroke-1 stroke-neutral-900" />
          </Link>
        </li>
      </ul>
    </div>
  );
}

function RoundedBorder() {
  return (
    <div>
      <div className="w-full h-3 top-[calc(var(--hero-height-mobile)_-_11px)] md:top-[calc(var(--hero-height)_-_11px)] absolute overflow-hidden">
        <div className="w-[calc(100%_-_100px)] md:w-[calc(100%_-_190px)] left-1/2 -translate-x-1/2 absolute bottom-0 border-b border-neutral-200"></div>
      </div>
      <div className="w-10 h-10 top-[var(--hero-height-mobile)] md:top-[var(--hero-height)] absolute overflow-hidden left-3 md:left-14">
        <div className="absolute top-0 left-0 w-14 h-12 border border-neutral-200 rounded-tl-3xl shadow-circle"></div>
      </div>
      <div className="w-10 h-10 top-[var(--hero-height-mobile)] md:top-[var(--hero-height)] absolute overflow-hidden right-3 md:right-14">
        <div className="absolute top-0 right-0 w-14 h-12 border border-neutral-200 rounded-tr-3xl shadow-circle"></div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div className="px-4 pb-8 pt-24 text-center md:px-6 md:pt-24 md:pb-12">
      <p className="text-sm font-normal leading-5 text-muted-foreground max-w-52 md:max-w-72 mx-auto">
        © {new Date().getFullYear()} Ommi Putera. All rights reserved.
      </p>
    </div>
  );
}
