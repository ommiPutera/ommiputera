import type { LoaderFunction } from '@remix-run/node'
import { Outlet } from '@remix-run/react'
import { requireUserSession } from '~/utils/session.server'

export const loader: LoaderFunction = async ({ request }) => {
  const exepctionRoute = ['/personal/intro']
  const user = await requireUserSession(request, exepctionRoute)
  if (!user) {
    throw new Response('Unauthorized', { status: 401 })
  }
  return {}
}

export default function Index() {
  return (
    <main className="flex flex-col">
      <div className="">
        <div className="relative h-full w-full">
          <Outlet />
        </div>
      </div>
    </main>
  )
}
