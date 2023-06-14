import type { V2_MetaFunction } from '@remix-run/react'
import { Outlet } from '@remix-run/react'

export const meta: V2_MetaFunction = () => {
  return [{ title: 'Admin Panel - Manage Project' }]
}

export default function Index() {
  return (
    <div className="flex w-full flex-col gap-y-8 pt-8 lg:gap-y-3 lg:pt-6">
      <Outlet />
    </div>
  )
}
