import type {V2_MetaFunction} from '@remix-run/react'

export const meta: V2_MetaFunction = () => {
  return [{title: 'Ommi Putera - Dashboard'}]
}

export default function Index() {
  return (
    <div className="text-left">
      <h1 className="text-animate-2 font-bold leading-loose lg:text-4xl">
        Dashboard Index @@@
      </h1>
    </div>
  )
}
