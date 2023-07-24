import type { V2_MetaFunction } from '@remix-run/react'
import { Outlet } from '@remix-run/react'

export const meta: V2_MetaFunction = () => {
  return [{ title: 'Cashflow' }]
}

export default function Index() {
  return (
    <>
      <div className="absolute -z-10 h-[50vh] w-screen bg-red-900 bg-gradient-to-b from-black to-gray-900"></div>
      <div className="w-full px-[4vw] xl:px-10vw">
        <div className="relative mx-auto flex max-w-7xl items-center justify-between py-9 lg:pb-12 lg:pt-12">
          <div className="w-full">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  )
}