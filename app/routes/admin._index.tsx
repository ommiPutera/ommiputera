import type { V2_MetaFunction } from "@remix-run/react"

export const meta: V2_MetaFunction = () => {
  return [{title: 'Admin Panel - General'}]
}

export default function Index() {
  return (
    <div className="px-10vw py-5vw text-center">
      <h1 className="text-animate-2 font-bold leading-loose lg:text-4xl">
        General
      </h1>
      <p className="text-animate-3 mt-6 text-md font-light leading-relaxed">
        Monitoring is a powerful query editor that allows you to visualize and
        gain insight into bandwidth, errors, performance, traffic, Top Paths
        usage, and more across all projects.
      </p>
    </div>
  )
}