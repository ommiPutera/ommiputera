import React from "react";

import { Footer } from "~/components/shell-page";

import { ProjectNavigation } from "./project-nav";

export function ProjectShell({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="flex flex-col relative">
        <ProjectNavigation />
        <div className="z-10 flex flex-col space-y-1 md:space-y-2 pt-12 md:pt-20">
          <Header />
        </div>
        <main role="main" className="relative overflow-hidden">
          <div className="min-h-screen relative p-2 md:p-0 pb-12 md:pb-32 flex flex-col gap-6 md:gap-14">
            {children}
            <Footer />
          </div>
        </main>
      </div>
    </div>
  );
}

function Header() {
  return (
    <nav
      role="navigation"
      className="absolute top-0 px-7 md:px-20 bg-background text-center w-full pt-3.5 md:pt-6"
    >
      <header role="banner">
        <h1 className="text-sm font-bold">ommiputera.com</h1>
      </header>
    </nav>
  );
}

export function Container({ children }: { children: React.ReactNode }) {
  return <div className="px-4 md:px-7 mx-auto max-w-screen-md">{children}</div>;
}

export function FullContainer({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto w-full">{children}</div>;
}
