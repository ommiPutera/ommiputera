import {Outlet} from '@remix-run/react'

export default function Index() {
  return (
    <main className="flex flex-col gap-5 pb-44 lg:gap-9">
      <div className="pb-9 lg:pb-12">
        <div className="relative h-full min-h-screen w-full">
          <Outlet />
        </div>
      </div>
    </main>
  )
}
