import {Link} from '@remix-run/react'
import {HomeHeroSection} from '~/components/sections/hero'

export default function Index() {
  return (
    <div className="flex flex-col gap-5 lg:gap-16">
      <img
        src="/hero-background.png"
        alt=""
        className="lg:h-100 absolute -z-10 h-[100vh] w-[100vw] object-cover opacity-60 lg:opacity-100"
      />
      <div className="px-5vw py-9 lg:px-15vw lg:py-12">
        <HomeHeroSection />
      </div>
      <div className="flex flex-col gap-8 px-5vw py-9 lg:gap-12 lg:px-15vw">
        <h3 className="text-center text-lg font-medium lg:text-xl">
          Certified By
        </h3>
        <div className="mx-auto flex max-w-8xl items-center justify-center gap-x-9">
          <img src="/purwadhika-logo.png" alt="" className="w-32 lg:w-52" />
          <img src="/udemy-logo.png" alt="" className="w-24 lg:w-36" />
        </div>
      </div>
      <div className="px-5vw py-9 lg:px-15vw lg:py-12">
        <div className="mx-auto grid max-w-8xl gap-8 lg:gap-12">
          <div className="flex flex-col items-start justify-between gap-5 gap-x-48 lg:flex-row">
            <h1 className="text-center text-3xl font-medium leading-tight lg:text-left lg:text-6xl">
              Helping brands thrive in the digital world
            </h1>
            <p className="mt-2 text-center font-medium text-gray-300 md:w-1/2 lg:mt-3 lg:text-left">
              2 years of proven experience in helping to create and maintain a
              better code base for re-usability and best practices.
            </p>
          </div>
          <div className="flex flex-col gap-2 lg:gap-6">
            <div className="flex justify-between border-b border-gray-600 lg:justify-end">
              <h3 className="py-4 font-medium text-gray-300 lg:hidden lg:text-xl">
                See all
              </h3>
              <h3 className="py-4 text-lg font-medium lg:text-xl">
                Recent Work
              </h3>
            </div>
            <Project />
            <Project />
          </div>
        </div>
      </div>
    </div>
  )
}

function Project() {
  return (
    <div className="flex flex-col items-center justify-between pt-9 lg:py-9 lg:flex-row">
      <p className="text-md mb-4 font-medium text-gray-300 lg:mb-0">
        Website Development / Personal Website
      </p>
      <div className="flex flex-col items-center gap-6 lg:gap-12 lg:flex-row">
        <Link to="http://naufalghfr.com/">
          <h2 className="underlined pb-1 text-3xl font-medium leading-tight lg:text-4xl">
            Naufal Ghifari Website
          </h2>
        </Link>
        <Link to="/">
          <button className="rounded-full bg-gray-700 px-4 py-2 hover:bg-gray-800">
            Details
          </button>
        </Link>
      </div>
    </div>
  )
}
