import {Outlet} from '@remix-run/react'

export default function Index() {
  return (
    <main className="flex flex-col gap-5 pb-44 lg:gap-24 lg:pt-8">
      <div className="min-h-screen px-5vw py-9 lg:px-10vw lg:py-12">
        <Outlet />
      </div>
    </main>
  )
}
