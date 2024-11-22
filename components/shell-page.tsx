export default function ShellPage({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto max-w-screen-sm">
      <main className="flex flex-col min-h-screen relative">
        <div className="flex flex-col space-y-1 min-h-[var(--hero-height-mobile)] max-h-[var(--hero-height-mobile)] md:min-h-[var(--hero-height)] md:max-h-[var(--hero-height)] md:space-y-2 sticky top-0 pt-12 md:pt-20 bg-white z-10 px-4 md:px-14">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-center">Hi, I&apos;m Ommi 👋</h1>
          <p className="text-md md:text-xl font-normal leading-6 max-w-xs mx-auto text-center">Software Engineer based in Jakarta, Indonesia. I love building things with Remix.</p>
          <div className=" relative pt-24">
          </div>
        </div>
        <div className="sticky top-[var(--hero-height-mobile)] md:top-[var(--hero-height)] w-full h-[1px] bg-neutral-300 z-10">
          <div className="relative">
            <div className="absolute top-0 left-0">
              <div className="relative w-10 md:w-20 h-6 bg-white">
                <div className="absolute top-0 right-0 w-6 h-6 border-l border-t border-neutral-300 rounded-tl-full"></div>
              </div>
            </div>
            <div className="absolute top-0 right-0">
              <div className="relative w-10 md:w-20 h-6 bg-white">
                <div className="absolute top-0 left-0 w-6 h-6 border-r border-t border-neutral-300 rounded-tr-full"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 md:px-14 relative overflow-hidden">
          <div className="bg-white border-l border-r divide-y divide-neutral-300 border-b border-neutral-300 relative min-h-[200vh]">
            {children}
          </div>
        </div>
      </main>
    </div>
  )
} 