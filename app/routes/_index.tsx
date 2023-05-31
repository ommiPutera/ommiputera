import {Link} from '@remix-run/react'
import clsx from 'clsx'
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
          <div className="flex flex-col items-center lg:items-start justify-between gap-5 gap-x-48 lg:flex-row">
            <h1 className="text-center text-3xl font-medium leading-tight lg:text-left lg:text-6xl">
              Helping brands thrive in the digital world
            </h1>
            <p className="mt-2 text-center font-medium text-gray-300 md:w-1/2 lg:mt-3 lg:text-left">
              2 years of proven experience in helping to create and maintain a
              better code base for re-usability and best practices.
            </p>
          </div>
          <div className="flex flex-col gap-2 lg:gap-6">
            <div className="flex justify-between border-b border-gray-600">
              <Link to="/">
                <h3 className="py-4 font-medium text-gray-300 lg:text-xl">
                  See all
                </h3>
              </Link>
              <h3 className="py-4 text-lg font-medium lg:text-xl">
                Recent Work
              </h3>
            </div>
            <Project
              title="Naufal Ghifari Website"
              detailRoute="/"
              liveLink="https://www.naufalghfr.com/"
              desc=" Web Development / Personal Website"
            />
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
    <div className="flex flex-col items-center justify-between pt-9 lg:flex-row lg:py-9">
      <p className="text-md mb-4 font-medium text-gray-300 lg:mb-0">{desc}</p>
      <div className="flex flex-col items-center gap-6 lg:flex-row lg:gap-12">
        <Link
          to={liveLink}
          className={clsx(
            liveLink && 'underlined',
            !liveLink && 'pointer-events-none',
          )}
        >
          <h2 className="text-3xl pb-2 font-medium leading-tight lg:text-4xl">
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
