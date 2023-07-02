import { Outlet } from "@remix-run/react";

export default function Index() {
  return (
    <main className="flex flex-col gap-5 pb-44 lg:gap-24 lg:pt-8">
      <div className="px-5vw py-9 lg:px-10vw lg:py-12 min-h-screen">
        <Outlet />
      </div>
    </main>
  )
}
