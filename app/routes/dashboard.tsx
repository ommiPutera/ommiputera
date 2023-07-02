import type {LoaderFunction} from '@remix-run/node'
import {Outlet} from '@remix-run/react'
import {getUserRole, requireUserSession} from '~/utils/session.server'

export const loader: LoaderFunction = async ({request}) => {
  const user = await requireUserSession(request)
  const role = await getUserRole(request)
  if (!user) {
    throw new Response('Unauthorized', {status: 401})
  }
  if (role === 'USER') {
    throw new Response('Unauthorized', {status: 401})
  }
  return {}
}

export default function Index() {
  return (
    <main className="flex flex-col gap-5 pb-44 lg:gap-9">
      <LayoutTitle />
      <div className="pb-9 lg:px-10vw lg:pb-12">
        <div className="relative h-full min-h-screen w-full">
          <div className="relative mx-auto grid lg:max-w-7xl">
            <Outlet />
          </div>
        </div>
      </div>
    </main>
  )
}

function LayoutTitle() {
  return (
    <div className="w-full bg-gradient-to-b from-black to-gray-900 px-5vw lg:px-10vw">
      <div className="relative mx-auto flex max-w-7xl items-center justify-between border-b border-gray-700 py-9 lg:pb-9 lg:pt-24">
        <div className="text-left">
          <h1 className="leading-tigh px-0 text-xl font-medium capitalize lg:text-3xl">
            Dashboard Index
          </h1>
          <p className="text-secondary mt-1 text-sm font-medium">
            Query and visualize your Vercel usage, traffic, and more with the
            fields below.
          </p>
        </div>
      </div>
    </div>
  )
}
