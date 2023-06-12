import type { V2_MetaFunction } from '@remix-run/react'
import React from 'react'

export const meta: V2_MetaFunction = () => {
  return [{ title: 'Ommi Putera - Dashboard' }]
}

export default function Index() {
  return (
    <div className="relative h-full min-h-screen w-full">
      <div>
        <h1>Digital Product index</h1>
      </div>
    </div>
  )
}
