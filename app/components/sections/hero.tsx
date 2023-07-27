import { Link } from '@remix-run/react'

function HomeHeroSection() {
  return (
    <div className="text-primary relative mx-auto grid max-w-7xl gap-8 lg:gap-12">
      <FloatingBtn
        to="/"
        className="absolute -bottom-14 -left-28 hidden lg:block"
      >
        <p className="whitespace-nowrap font-medium">Server-side rendering</p>
        <p className="pointer-events-none absolute -right-10 -top-6 text-xl transition-[10] delay-200 group-hover:-right-24 group-hover:-top-14 group-hover:text-3xl">
          🚀
        </p>
      </FloatingBtn>
      <FloatingBtn
        to="/"
        className="absolute -bottom-6 -right-12 hidden lg:block"
      >
        <p className="whitespace-nowrap font-medium">Javascript</p>
        <p className="pointer-events-none absolute -bottom-6 -left-10 text-xl transition-[5] delay-200 group-hover:-left-12 group-hover:bottom-2 group-hover:text-2xl">
          🛸
        </p>
      </FloatingBtn>
      <FloatingBtn
        to="/"
        className="absolute top-[3vh] left-[1vw] hidden lg:block"
      >
        <p className="whitespace-nowrap font-medium">React.js</p>
        <p className="pointer-events-none absolute -bottom-6 -left-10 text-xl transition-[25] delay-200 group-hover:bottom-14 group-hover:left-14 group-hover:-rotate-12 group-hover:text-2xl">
          🏂🏾
        </p>
      </FloatingBtn>
      <div className="flex flex-col items-center justify-center gap-8">
        <div className="rounded-full bg-gray-800 px-6 py-3">
          <p className="font-medium">Open Source Project</p>
        </div>
        <h1 className="2xl:w-3/5 px-0 text-center text-4xl font-semibold leading-tight md:w-2/3 lg:w-3/4 lg:text-7xl lg:leading-[4.2rem]">
          Helping brands and peoples through quality software.
        </h1>
        <p className="mt-2 px-0 text-center text-lg font-normal text-gray-200 md:w-2/3 lg:mt-4 lg:px-9 lg:text-xl lg:leading-normal xl:w-3/5">
          2 years of proven experience in helping to create and maintain a
          better code base for re-usability and best practices. Experience in
          developing projects from concept to launch.
        </p>
      </div>
    </div>
  )
}

function ProjectHeroSection() {
  return (
    <div className="text-primary relative mx-auto grid w-full max-w-7xl gap-5 py-4 lg:gap-y-16 lg:py-12">
      <h1 className="text-center text-2xl font-medium leading-tight lg:px-[5rem] lg:text-7xl xl:px-[10rem]">
        Creating next <br /> level digital products
      </h1>
      <h4 className="mt-2 px-0 text-center text-md font-medium leading-snug text-gray-400 lg:px-[20rem] lg:text-lg lg:text-gray-200">
        First of all, thank you for interested in reading about me, On this
        page, I will tell all about my life and my experiences
      </h4>
    </div>
  )
}

function FloatingBtn({
  to,
  children,
  ...rest
}: Omit<Parameters<typeof Link>['0'], 'to'> & { to: string }) {
  return (
    <Link to={to} {...rest}>
      <button className="group relative rounded-full bg-gray-700 px-4 py-2 hover:bg-gray-800">
        {children}
      </button>
    </Link>
  )
}

export { HomeHeroSection, ProjectHeroSection }
