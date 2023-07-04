import type {LoaderFunction} from '@remix-run/node'
import {Outlet} from '@remix-run/react'
import {getUserRole, requireUserSession} from '~/utils/session.server'

export const loader: LoaderFunction = async ({request}) => {
  const user = await requireUserSession(request)
  const role = await getUserRole(request)
  if (!user) {
    throw new Response('Unauthorized', {status: 401})
  }
  if (role === 'BASIC') {
    throw new Response('Unauthorized', {status: 401})
  }
  return {}
}

export default function Index() {
  return (
    <main className="flex flex-col pb-44">
      <LayoutTitle />
      <div className="px-[4vw] pb-9 lg:pb-12 xl:px-10vw">
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
    <>
      <div className="absolute -z-10 h-[50vh] w-screen bg-red-900 bg-gradient-to-b from-black to-gray-900"></div>
      <div className="w-full px-[4vw] xl:px-10vw">
        <div className="relative mx-auto flex max-w-7xl items-center justify-between py-9 lg:pb-9 lg:pt-14">
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
    </>
  )
}
