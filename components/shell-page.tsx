import Link from "next/link"

export default function ShellPage({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto max-w-screen-sm">
      <main className="flex flex-col min-h-screen relative">
        <div className="z-10 flex flex-col space-y-1 min-h-[var(--hero-height-mobile)] bg-white md:min-h-[var(--hero-height)] md:space-y-2 sticky top-0 pt-12 md:pt-20">
          <Intro />
          <RoundedBorder />
        </div>
        <div className="px-3 md:px-14 relative overflow-hidden">
          <div className="bg-white border-x border-neutral-200 divide-y divide-neutral-200 relative min-h-[200vh]">
            {children}
          </div>
        </div>
      </main>
    </div>
  )
}

function Intro() {
  return (
    <div className="absolute top-0 px-3 md:px-14 bg-white w-full h-full pt-7 md:pt-16">
      <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-center">Hi, I&apos;m Ommi 👋</h1>
      <p className="mt-1 md:mt-2 text-md md:text-xl font-normal leading-5 max-w-xs md:max-w-md mx-auto text-center">Software Engineer based in Jakarta, Indonesia. I love building things with Remix.</p>
      <ul className="text-center flex justify-center gap-3 text-sm md:text-lg mt-4 md:mt-6">
        <li className="underline">
          <Link href="/">Github</Link>
        </li>
        <li className="underline">
          <Link href="/">Resume</Link>
        </li>
        <li className="underline">
          <Link href="/">Portfolio</Link>
        </li>
      </ul>
    </div>
  )
}

function RoundedBorder() {
  return (
    <div>
      <div className="w-full h-3 top-[calc(var(--hero-height-mobile)_-_11px)] md:top-[calc(var(--hero-height)_-_10px)] absolute overflow-hidden">
        <div className="w-[calc(100%_-_100px)] md:w-[calc(100%_-_190px)] left-1/2 -translate-x-1/2 absolute bottom-0 border-b border-neutral-200"></div>
      </div>
      <div className="w-10 h-10 top-[var(--hero-height-mobile)] md:top-[var(--hero-height)] absolute overflow-hidden left-3 md:left-14">
        <div className="absolute top-0 left-0 w-14 h-12 border border-neutral-200 rounded-tl-3xl shadow-circle"></div>
      </div>
      <div className="w-10 h-10 top-[var(--hero-height-mobile)] md:top-[var(--hero-height)] absolute overflow-hidden right-3 md:right-14">
        <div className="absolute top-0 right-0 w-14 h-12 border border-neutral-200 rounded-tr-3xl shadow-circle"></div>
      </div>
    </div>
  )
}