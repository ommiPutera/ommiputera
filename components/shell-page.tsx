// import Image from "next/image";

export default function ShellPage({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto max-w-screen-sm">
      <main className="flex flex-col min-h-screen relative">
        <div className="flex flex-col space-y-1 min-h-[var(--hero-height-mobile)] max-h-[var(--hero-height-mobile)] md:min-h-[var(--hero-height)] md:max-h-[var(--hero-height)] md:space-y-2 sticky top-0 pt-16 md:pt-20 bg-white z-10 px-6 md:px-14">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-center">Hi, I&apos;m Ommi 👋</h1>
          <p className="text-md md:text-xl font-normal leading-6 text-center">Software Engineer turned Entrepreneur. I love building things and helping people. Very active on Twitter.</p>
          <div className=" relative pt-24">
          </div>
        </div>
        <div className="sticky top-[var(--hero-height-mobile)] md:top-[var(--hero-height)] w-full h-[1px] bg-slate-200 z-10">
          <div className="relative">
            <div className="absolute top-0 left-0">
              <div className="relative w-12 md:w-20 h-6 bg-white">
                <div className="absolute top-0 right-0 w-6 h-6 bg-slate-100 border-l border-t border-slate-200 rounded-tl-full"></div>
              </div>
            </div>
            <div className="absolute top-0 right-0">
              <div className="relative w-12 md:w-20 h-6 bg-white">
                <div className="absolute top-0 left-0 w-6 h-6 bg-slate-100 border-r border-t border-slate-200 rounded-tr-full"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="px-6 md:px-14 relative overflow-hidden">
          <div className="bg-slate-100 shadow-md border-l border-r border-b border-slate-200 relative min-h-[200vh] p-6">
            {children}
          </div>
        </div>
      </main>
      <nav>
        {/* <Image src="https://media.licdn.com/dms/image/v2/D5603AQFxiQc9Cj18rw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1710850007608?e=1737590400&v=beta&t=PiDFnJESphnnmrbzVCr12atCTA_PCJkM_GXShmBqUW0" width={30} height={30} alt={""} /> */}
      </nav>
    </div>
  )
} 