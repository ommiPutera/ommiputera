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
        <div className="z-10 w-full max-w-[var(--shell-page-width)] mx-auto flex flex-col space-y-1 h-[var(--header-height-mobile)] md:h-[var(--header-height)] md:space-y-2 sticky top-0 pt-12 md:pt-20">
          <Header />
          {withBack && (
            <div className="fixed -top-3 px-7 md:px-20 pt-4 md:pt-6 w-6 h-6">
              <BackBtn />
            </div>
          )}
          <RoundedBorder />
        </div>
        <div className="absolute top-0 h-[var(--header-height-mobile)] md:h-[var(--header-height)] bg-white dark:bg-black border-x border-neutral-200 dark:border-neutral-800"></div>
        <div className="px-2.5 md:px-14 relative overflow-hidden">
          <div className="min-h-screen bg-white dark:bg-black border-x border-b border-neutral-200 dark:border-neutral-800 relative">
            <main
              role="main"
              className="divide-y divide-neutral-200 dark:divide-neutral-800"
            >
              {children}
            </main>
          </div>
        </div>
        <div className="z-10 w-full max-w-[var(--shell-page-width)] mx-auto flex flex-col space-y-1 h-[var(--bottom-border-height-mobile)] md:h-[var(--bottom-border-height)] md:space-y-2 sticky bottom-0">
          <footer
            role="contentinfo"
            className="px-6 text-center pt-10 pb-20 md:px-6 bg-background h-full w-full absolute"
          >
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} Ommi Putera. All Rights Reserved.
            </p>
            <p className="text-xs font-normal text-muted-foreground max-w-[250px] mx-auto">
              Built with Kapal Api and 76 Mangga.
            </p>
          </footer>
          <RoundedBorderBottom />
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

function RoundedBorderBottom() {
  return (
    <div>
      <div className="w-full h-[1px] bottom-[var(--bottom-border-height-mobile)] md:bottom-[var(--bottom-border-height)] z-10 absolute overflow-hidden">
        <div className="h-[1px] w-[calc(100%_-_96px)] md:w-[calc(100%_-_190px)] left-1/2 -translate-x-1/2 absolute top-0 border-t border-neutral-200 dark:border-neutral-800"></div>
      </div>
      <div className="w-10 h-10 bottom-[var(--bottom-border-height-mobile)] md:bottom-[var(--bottom-border-height)] absolute overflow-hidden left-2.5 md:left-14">
        <div className="absolute bottom-0 left-0 w-14 h-12 border border-neutral-200 dark:border-neutral-800 rounded-bl-3xl shadow-circle"></div>
      </div>
      <div className="w-10 h-10 bottom-[var(--bottom-border-height-mobile)] md:bottom-[var(--bottom-border-height)] absolute overflow-hidden right-2.5 md:right-14">
        <div className="absolute bottom-0 right-0 w-14 h-12 border border-neutral-200 dark:border-neutral-800 rounded-br-3xl shadow-circle"></div>
      </div>
    </div>
  );
}
