import Link from "next/link"

export default function ShellPage({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto max-w-screen-sm">
      <main className="flex flex-col relative">
        <div className="z-10 flex flex-col space-y-1 min-h-[var(--hero-height-mobile)] md:min-h-[var(--hero-height)] md:space-y-2 sticky top-0 pt-12 md:pt-20">
          <Intro />
          <RoundedBorder />
        </div>
        <div className="px-3 md:px-14 relative overflow-hidden">
          <div className="bg-white border-x border-b border-neutral-300 divide-y divide-neutral-300 relative">
            {children}
            <Footer />
          </div>
        </div>
      </main>
    </div>
  )
}

function Intro() {
  return (
    <div className="absolute top-0 px-7 md:px-20 bg-background w-full h-full pt-6 md:pt-11">
      <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Hi, I&apos;m Ommi 👋</h1>
      <p className="mt-1 md:mt-3 text-base md:text-xl text-slate-800 font-medium leading-5 max-w-[265px] md:max-w-[450px]">Software Engineer based in Jakarta, Indonesia. I love building things with Remix.</p>
      <ul className="flex gap-3 text-sm md:text-base mt-2 md:mt-4">
        <li className="underline text-muted-foreground">
          <Link href="/">Github</Link>
        </li>
        <li className="underline text-muted-foreground">
          <Link href="/">Resume</Link>
        </li>
        <li className="underline text-muted-foreground">
          <Link href="/">Portfolio</Link>
        </li>
      </ul>
    </div>
  )
}

function RoundedBorder() {
  return (
    <div>
      <div className="w-full h-3 top-[calc(var(--hero-height-mobile)_-_11px)] md:top-[calc(var(--hero-height)_-_11px)] absolute overflow-hidden">
        <div className="w-[calc(100%_-_100px)] md:w-[calc(100%_-_190px)] left-1/2 -translate-x-1/2 absolute bottom-0 border-b border-neutral-300"></div>
      </div>
      <div className="w-10 h-10 top-[var(--hero-height-mobile)] md:top-[var(--hero-height)] absolute overflow-hidden left-3 md:left-14">
        <div className="absolute top-0 left-0 w-14 h-12 border border-neutral-300 rounded-tl-3xl shadow-circle"></div>
      </div>
      <div className="w-10 h-10 top-[var(--hero-height-mobile)] md:top-[var(--hero-height)] absolute overflow-hidden right-3 md:right-14">
        <div className="absolute top-0 right-0 w-14 h-12 border border-neutral-300 rounded-tr-3xl shadow-circle"></div>
      </div>
    </div>
  )
}

function Footer() {
  return (
    <div className="px-4 pb-8 pt-24 text-center md:px-6 md:pt-24 md:pb-12">
      <p className="text-sm font-normal leading-5 text-muted-foreground max-w-52 md:max-w-72 mx-auto">© {new Date().getFullYear()} Ommi Putera. All rights reserved.</p>
    </div>
  )
}