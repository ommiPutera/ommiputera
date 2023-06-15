import { Link, Outlet, useLocation, type V2_MetaFunction } from '@remix-run/react'
import clsx from 'clsx'
import React from 'react'
import { ProjectHeroSection } from '~/components/sections/hero'

export const meta: V2_MetaFunction = () => {
  return [{ title: 'Ommi Projects' }]
}

export default function Index() {
  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <main className="flex flex-col gap-5 pb-44 bg-gray-900 lg:gap-16">
      <div className="px-5vw pr-9 lg:px-15vw lg:pt-12">
        <ProjectHeroSection />
      </div>
      <div className="sticky top-0 z-50 h-full w-full">
        <ProjectNavigation />
      </div>
      <div className="relative lg:pb-24 lg:pt-8">
        <div className="text-primary mx-auto grid gap-5 lg:gap-12">
          <Outlet />
        </div>
      </div>
    </main>
  )
}

function ProjectNavigation() {
  const location = useLocation()
  const isSelected = (to: string) => to === location.pathname

  const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => {
    return (
      <Link
        prefetch="intent"
        to={to}
        preventScrollReset={true}
        className={clsx(
          'block whitespace-nowrap rounded-full border bg-gray-900 px-6 py-1.5 text-md font-medium focus:outline-none lg:text-lg lg:tracking-wide',
          {
            'text-white border-white': isSelected(to),
            'text-secondary border-gray-500': !isSelected(to),
          },
        )}
      >
        {children}
      </Link>
    )
  }

  return (
    <div className='w-full relative h-[5rem]'>
      <div className='glass h-full'>
      </div>
      <div className="no-scrollbar bg-transparent absolute top-0 left-0 right-0 flex flex-col py-5 gap-4 overflow-scroll px-5vw text-center lg:px-15vw">
        <div className="mx-auto flex w-fit justify-between gap-x-2 lg:gap-x-4">
          <NavLink to="/project">All</NavLink>
          <NavLink to="/project/digital-product">Digital Product</NavLink>
          <NavLink to="/project/product-development">Product Development</NavLink>
          <NavLink to="/project/product-design">Product Design</NavLink>
        </div>
      </div>
    </div>
  )
}
