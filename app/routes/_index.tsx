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
          <div className="flex flex-col gap-5 lg:gap-0 items-start justify-between gap-x-48 lg:flex-row">
            <h1 className="text-center text-3xl font-medium leading-tight lg:text-left lg:text-6xl">
              Helping brands thrive in the digital world
            </h1>
            <p className="mt-2 text-center font-medium text-gray-300 md:w-1/2 lg:mt-3 lg:text-left">
              2 years of proven experience in helping to create and maintain a
              better code base for re-usability and best practices.
            </p>
          </div>
          <div className="flex flex-col gap-6">
            <h3 className="border-b border-gray-600 py-4 text-right text-lg font-medium lg:text-xl">
              Recent Work
            </h3>
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
    <div className="flex items-center justify-between py-9">
      <p className="text-lg font-medium">
        Website Development / Personal Website
      </p>
      <div className="flex flex-col lg:flex-row items-center gap-6">
        <h2 className="text-3xl pb-2 font-medium leading-tight lg:text-4xl">
          Naufal Ghifari Website
        </h2>
        <Link to="http://naufalghfr.com/">
          <button className="rounded-full bg-gray-700 px-4 py-2 hover:bg-gray-800">
            See Project
          </button>
        </Link>
      </div>
    </div>
  )
}
