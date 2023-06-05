import {Link} from '@remix-run/react'
import clsx from 'clsx'
import {GalerySection} from '~/components/sections/galery'
import {HomeHeroSection} from '~/components/sections/hero'

export default function Index() {
  return (
    <>
      <img
        src="/hero-background.png"
        alt=""
        className="lg:h-100 absolute -z-10 h-[100vh] w-[100vw] object-cover opacity-60 lg:opacity-100"
      />
      <main className="flex flex-col gap-5 lg:gap-16 pb-44">
        <div className="px-5vw py-9 lg:px-15vw lg:py-12">
          <HomeHeroSection />
        </div>
        <div className="px-5vw py-9 lg:px-15vw lg:py-12">
          <Certifed />
        </div>
        <div className="px-5vw py-9 lg:px-15vw lg:py-12">
          <RecentWork />
        </div>
        <div className="pb-9 lg:pb-12">
          <GalerySection />
        </div>
        <div className="px-0 py-9 lg:px-15vw lg:py-12">
          <AboutMe />
        </div>
      </main>
    </>
  )
}

function RecentWork() {
  return (
    <div className="mx-auto grid max-w-8xl gap-8 lg:gap-12">
      <div className="flex flex-col items-center justify-between gap-5 gap-x-48 lg:flex-row lg:items-start">
        <h1 className="text-center text-3xl font-medium leading-tight lg:text-left lg:text-6xl">
          Helping brands thrive in the digital world
        </h1>
        <p className="mt-2 text-center font-medium text-gray-300 md:w-1/2 lg:mt-3 lg:text-left">
          2 years of proven experience in helping to create and maintain a
          better code base for re-usability and best practices.
        </p>
      </div>
      <div className="flex flex-col gap-2 lg:gap-6">
        <div className="flex items-center justify-between border-b border-gray-600">
          <Link to="/">
            <h3 className="py-4 font-medium text-gray-300 lg:text-xl">
              See all
            </h3>
          </Link>
          <h3 className="py-4 text-xl font-medium md:text-2xl lg:text-3xl">
            Recent Work
          </h3>
        </div>
        <Project
          title="Naufal Ghifari"
          detailRoute="/"
          liveLink="https://www.naufalghfr.com/"
          desc=" Web Development / Personal Website"
        />
      </div>
    </div>
  )
}

function Certifed() {
  return (
    <div className="flex flex-col gap-8">
      <h3 className="text-center text-lg font-medium lg:text-xl">
        Certified By
      </h3>
      <div className="mx-auto flex max-w-8xl flex-wrap items-center justify-center gap-x-16 gap-y-8 overflow-hidden lg:gap-y-0">
        <img src="/purwadhika-logo.png" alt="" className="w-36 lg:w-52" />
        <img src="/udemy-logo.png" alt="" className="w-32 lg:w-36" />
        <img src="/hackerrank-logo.png" alt="" className="w-32 lg:w-44" />
        <img src="/testgorilla-logo.png" alt="" className="w-32 lg:w-44" />
      </div>
    </div>
  )
}

function AboutMe() {
  return (
    <div className="mx-auto flex max-w-8xl flex-col gap-8 lg:flex-row lg:gap-x-36 px-5vw">
      <div className="w-full lg:w-1/2">
        <img
          src="/ommi_aboutme.jpg"
          alt=""
          className="w-full rounded-xl object-cover lg:h-[45rem]"
        />
      </div>
      <div className="flex w-full flex-col gap-y-16 lg:w-1/2 lg:gap-y-28">
        <div className="flex flex-col gap-y-4">
          <h3 className="text-left text-xl font-medium leading-tight lg:text-3xl">
            Big extreme sports enthusiast.
          </h3>
          <p className="font-medium text-gray-300">
            I help companies from all over the world with tailor-made solutions.
            With each project, I push my work to new horizons, always putting
            quality first.
            <br />
            <br />
            Always exploring...
          </p>
        </div>
        <div className="flex flex-col gap-y-4">
          <h3 className="text-left text-xl font-medium leading-tight lg:text-3xl">
            I can help you with ..
          </h3>
          <div>
            <p className="font-medium text-gray-300">
              A complete website from concept to implementation, that's what
              makes me stand out. My great sense for design and my development
              skills enable me to create kick-ass projects.
            </p>
          </div>
          <div>
            <h4 className="pb-2 text-left text-xl font-medium leading-tight lg:text-xl">
              Design
            </h4>
            <p className="font-medium text-gray-300">
              With a solid track record in designing websites and apps, I
              deliver strong and user-friendly digital designs. Solid company
              branding is the foundation of any succesful website.
            </p>
          </div>
          <div className="flex justify-start pt-12">
            <Link to="/about">
              <button className="group relative rounded-full bg-gray-700 px-6 py-2 hover:bg-gray-800">
                <p className="text-md whitespace-nowrap font-medium">
                  Learn more about me
                </p>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

function Project({
  title,
  detailRoute = '',
  liveLink = '',
  desc,
}: {
  title: string
  detailRoute: string
  liveLink?: string
  desc: string
}) {
  return (
    <div className="flex flex-col items-center justify-between pt-9 md:flex-row md:py-9">
      <p className="text-md mb-4 font-medium text-gray-300 md:mb-0">{desc}</p>
      <div className="flex flex-col items-center gap-6 md:flex-row md:gap-12">
        <Link
          target="_blank"
          to={liveLink}
          className={clsx(
            liveLink && 'underlined',
            !liveLink && 'pointer-events-none',
          )}
        >
          <h2 className="pb-2 text-3xl font-medium leading-tight md:text-xl lg:text-4xl">
            {title}
          </h2>
        </Link>
        <Link to={detailRoute}>
          <button className="rounded-full bg-gray-700 px-4 py-2 hover:bg-gray-800">
            Detail
          </button>
        </Link>
      </div>
    </div>
  )
}
