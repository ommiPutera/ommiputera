import type { LoaderFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { requireUserSession } from "~/utils/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await requireUserSession(request)
  if (!user) {
    throw new Response('Unauthorized', { status: 401 })
  }
  return {}
}

export default function Index() {
  return (
    <main className="flex flex-col gap-5 pb-44 lg:gap-9">
      <div className="px-5vw py-9 lg:px-15vw lg:py-9 border-b border-gray-600">
        <div className="relative mx-auto text-center grid max-w-8xl">
          <h1 className="px-0 text-xl font-medium leading-tigh lg:text-2xl">
            Dashboard
          </h1>
          <p className="text-sm mt-1 text-secondary font-medium">Query and visualize your Vercel usage, traffic, and more with the fields below.</p>
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
