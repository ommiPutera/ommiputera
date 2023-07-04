import { Link, type V2_MetaFunction } from '@remix-run/react'
import type { LoaderFunction } from '@remix-run/node'
import { requireUserSession } from '~/utils/session.server'

export const meta: V2_MetaFunction = ({ matches }) => {
  return [{ title: 'Cash Flow Managament' }]
}

export const loader: LoaderFunction = async ({ request }) => {
  const user = await requireUserSession(request)
  if (!user) {
    throw new Response('Unauthorized', { status: 401 })
  }
  return {}
}

export default function Index() {
  return (
    <>
      <LayoutTitle />
      <div className="px-[4vw] pb-9 lg:pb-12 xl:px-10vw">
        <div className="relative mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-3 lg:gap-x-8">
          <div className='col-span-1 border border-gray-800 bg-black p-6 pb-5 rounded-lg cursor-pointer hover:border-gray-700 shadow-[1px_10px_47px_0px_#19191987]'>
            <MonthlyCashflow />
          </div>
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
          <h1 className="leading-tigh px-0 text-xl font-medium capitalize lg:text-xl">
            Personal Cashflow Managament
          </h1>
          <p className="text-secondary mt-1 text-md font-light">
            Query and visualize your Vercel usage, traffic, and more with the
            fields below.
          </p>
        </div>
      </div>
    </div>
  )
}

function MonthlyCashflow() {
  return (
    <Link to="/cash-flow/monthly" prefetch='intent'>
      <div className="flex flex-col">
        <div className="flex items-center gap-x-5">
          <img src="/vectors/expanses.png" alt="" className="h-10 w-10" />
          <div>
            <h4 className="font-light text-base">Monthly Expense</h4>
            <p className="text-md text-secondary leading-tight mt-1 font-light">Vercel usage, traffic, and more with the fields below.</p>
          </div>
        </div>
        <p className="text-md text-secondary text-left font-light mt-6">Updated 13h ago..</p>
      </div>
    </Link>
  )
}
