import {type V2_MetaFunction} from '@remix-run/react'
import type {LoaderFunction} from '@remix-run/node'
import {requireUserSession} from '~/utils/session.server'

export const meta: V2_MetaFunction = ({matches}) => {
  return [{title: 'Cash Flow Managament'}]
}

export const loader: LoaderFunction = async ({request}) => {
  const user = await requireUserSession(request)
  if (!user) {
    throw new Response('Unauthorized', {status: 401})
  }
  return {}
}

export default function Index() {
  return (
    <>
      <LayoutTitle />
      <div className="px-[4vw] pb-9 lg:pb-12 xl:px-10vw">
        <div className="relative mx-auto max-w-7xl">
          <h1 className="text-animate-2 font-bold leading-loose lg:text-4xl">
            Personal Cashflow Index
          </h1>
        </div>
      </div>
    </>
  )
}

function LayoutTitle() {
  return (
    <div className="w-full bg-gradient-to-b from-black to-gray-900 px-[4vw] xl:px-10vw">
      <div className="relative mx-auto flex max-w-7xl items-center justify-between py-9 lg:pb-9 lg:pt-14">
        <div className="text-left">
          <h1 className="leading-tigh px-0 text-xl font-medium capitalize lg:text-3xl">
            Personal Cashflow Index
          </h1>
          <p className="text-secondary mt-1 text-sm font-medium">
            Query and visualize your Vercel usage, traffic, and more with the
            fields below.
          </p>
        </div>
      </div>
    </div>
  )
}
