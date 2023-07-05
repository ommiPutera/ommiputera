import type { LoaderFunction } from '@remix-run/node'
import { Outlet } from '@remix-run/react'
import { requireUserSession } from '~/utils/session.server'

export const loader: LoaderFunction = async ({ request }) => {
  const exepctionRoute = ['/cash-flow/intro']
  const user = await requireUserSession(request, exepctionRoute)
  if (!user) {
    throw new Response('Unauthorized', { status: 401 })
  }
  return {}
}

export default function Index() {
  return (
    <main className="flex flex-col pb-44">
      <div className="pb-9 lg:pb-12">
        <div className="relative h-full min-h-screen w-full">
          <Outlet />
        </div>
      </div>
    </main>
  )
}
