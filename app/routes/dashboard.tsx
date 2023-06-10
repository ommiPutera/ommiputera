import type {LoaderFunction} from '@remix-run/node'
import {Outlet} from '@remix-run/react'
import {requireUserSession} from '~/utils/session.server'

export const loader: LoaderFunction = async ({request}) => {
  const user = await requireUserSession(request)
  if (!user) {
    throw new Response('Unauthorized', {status: 401})
  }
  return {}
}

export default function Index() {
  return (
    <main className="flex flex-col gap-5 pb-44 lg:gap-9">
      <div className="border-b border-gray-600 bg-black px-5vw py-9 lg:px-15vw lg:py-12">
        <div className="relative mx-auto grid max-w-8xl text-center">
          <h1 className="leading-tigh px-0 text-xl font-medium lg:text-3xl">
            Dashboard
          </h1>
          <p className="text-secondary mt-1 text-sm font-medium">
            Query and visualize your Vercel usage, traffic, and more with the
            fields below.
          </p>
        </div>
      </div>
      <div className="px-5vw pb-9 lg:px-15vw lg:pb-12">
        <div className="relative h-full min-h-screen w-full">
          <Outlet />
        </div>
      </div>
    </main>
  )
}
