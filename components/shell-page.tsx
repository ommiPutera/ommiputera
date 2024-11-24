"use client";

import { ArrowDown, ArrowLeft } from "lucide-react";

import Link from "next/link";
import { useRouter } from "next/navigation";

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
    <div className="container mx-auto max-w-screen-sm">
      <main className="flex flex-col relative">
        <div className="z-10 flex flex-col space-y-1 min-h-[var(--hero-height-mobile)] md:min-h-[var(--hero-height)] md:space-y-2 sticky top-0 pt-12 md:pt-20">
          <Header title={title} withHome={withHome} />
          {withBack && <BackBtn />}
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

function BackBtn() {
  const router = useRouter();
  return (
    <div className="absolute -top-0.5 -left-3 px-7 md:px-20 pt-4 md:pt-6 w-6 h-6">
      <button onClick={() => router.back()}>
        <ArrowLeft className="w-6 h-6 stroke-neutral-900 stroke-3" />
      </button>
    </div>
  );
}

function Header({ title, withHome }: THeaderProps) {
  return (
    <div className="absolute top-0 px-7 md:px-20 bg-background text-center w-full h-full pt-4 md:pt-6">
      <h1 className="text-base md:text-lg font-bold">{title}</h1>
      <ul className="flex gap-3 text-sm justify-center md:text-base">
        {withHome && (
          <li className="underline text-muted-foreground">
            <Link href="/">Home</Link>
          </li>
        )}
        <li className="underline text-muted-foreground">
          <Link href="https://github.com/ommiPutera" target="_blank">
            Github
          </Link>
        </li>
        <li className="underline text-muted-foreground">
          <Link href="/" className="flex items-center">
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
      <div className="w-full h-3 top-[calc(var(--hero-height-mobile)_-_11px)] md:top-[calc(var(--hero-height)_-_11.5px)] absolute overflow-hidden">
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
    <div className="px-4 pb-12 pt-28 text-center md:px-6 md:pt-32 md:pb-16">
      <p className="text-xs md:text-sm font-normal leading-5 text-muted-foreground max-w-72 mx-auto">
        © {new Date().getFullYear()} Ommi Putera. All rights reserved.
      </p>
      <p className="text-xs md:text-sm font-normal leading-5 text-muted-foreground max-w-72 mx-auto">
        Build with Kapal Api and 76 Mangga.
      </p>
    </div>
  );
}
