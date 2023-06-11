import {Link, useLocation, type V2_MetaFunction} from '@remix-run/react'
import clsx from 'clsx'
import React from 'react'
import {ProjectHeroSection} from '~/components/sections/hero'
import {getImgProps, images} from '~/images'

export const meta: V2_MetaFunction = () => {
  return [{title: 'Ommi Projects'}]
}

export default function Index() {
  const location = useLocation()
  const isSelected = (to: string) =>
    to === location.pathname || location.pathname.startsWith(`${to}/`)

  const NavLink = ({to, children}: {to: string; children: React.ReactNode}) => {
    return (
      <Link
        prefetch="intent"
        to={to}
        className={clsx(
          'block whitespace-nowrap rounded-full border bg-gray-900 px-6 py-1.5 text-lg font-medium focus:outline-none lg:tracking-wide',
          {
            'text-white': isSelected(to),
            'text-secondary': !isSelected(to),
          },
        )}
      >
        {children}
      </Link>
    )
  }

  return (
    <>
      <img
        src="/hero-background.png"
        alt=""
        className="lg:h-100 absolute -z-10 h-[100vh] w-[100vw] object-cover opacity-60 lg:opacity-100"
      />
      <main className="flex flex-col gap-5 pb-44 lg:gap-16">
        <div className="px-5vw pr-9 lg:px-15vw lg:pt-12">
          <ProjectHeroSection />
        </div>
        <div className="sticky top-0 h-full w-full bg-black py-4">
          <div className="flex flex-col gap-4 px-5vw text-center lg:px-15vw">
            <div className="mx-auto flex w-fit justify-between gap-x-4">
              <NavLink to="/project">All</NavLink>
              <NavLink to="/project/digital-product">Digital Product</NavLink>
              <NavLink to="/project/product-development">
                Product Development
              </NavLink>
              <NavLink to="/project/product-design">Product Design</NavLink>
            </div>
          </div>
        </div>
        <div className="px-5vw py-9 lg:px-15vw lg:py-12">
          <NaufalProject />
        </div>
      </main>
    </>
  )
}

function NaufalProject() {
  return (
    <div className="flex flex-col gap-20">
      <div className="flex flex-col gap-5">
        <h1 className="px-0 text-left text-3xl font-medium leading-tight lg:px-9 lg:text-5xl">
          Naufal
        </h1>
        <h4 className="mt-2 px-0 text-left text-xl font-medium text-gray-300 lg:mt-0 lg:w-1/2 lg:px-9">
          2 years of proven experience in helping to create and maintain a
          better code base for re-usability and best practices. Experience in
          developing projects from concept to launch. Eager to tackle more
          complex problems, and continues to find ways to maximize user
          efficiency
        </h4>
      </div>
      <img
        id="about-me"
        className="rounded-lg object-cover"
        {...getImgProps(images.bengkuluBeach, {
          widths: [840, 1100, 1300, 2600, 3984],
          sizes: ['(min-width:1620px) 3984px', '100vw'],
        })}
      />
      <h4 className="mt-2 px-0 text-lg font-medium lg:mt-4">
        Sungai Suci Beach, Bengkulu
      </h4>
      <p className="px-0 text-sm font-medium text-gray-300">
        src:https://unsplash.com/@surealis
      </p>
    </div>
  )
}
