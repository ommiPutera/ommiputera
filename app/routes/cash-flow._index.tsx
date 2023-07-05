import { Link, type V2_MetaFunction } from '@remix-run/react'
import { UIButton } from '~/components/shadcn/button'
import { Settings } from 'lucide-react'

export const meta: V2_MetaFunction = ({ matches }) => {
  return [{ title: 'Cash Flow Managament' }]
}

export default function Index() {
  return (
    <>
      <LayoutTitle />
      <div className="px-[4vw] pb-9 lg:pb-12 xl:px-10vw">
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 md:grid-cols-3 lg:gap-x-5">
          <div className="col-span-1 cursor-pointer rounded-lg border border-gray-800 bg-black px-5 py-5 shadow-[1px_10px_47px_0px_#19191987] hover:border-gray-700">
            <MonthlyCashflow />
          </div>
          <div className="col-span-1 cursor-pointer rounded-lg border border-gray-800 bg-black px-5 py-5 shadow-[1px_10px_47px_0px_#19191987] hover:border-gray-700">
            <MonthlyCashflow />
          </div>
        </div>
      </div>
    </>
  )
}

function LayoutTitle() {
  return (
    <>
      <div className="absolute -z-10 h-[50vh] w-screen bg-red-900 bg-gradient-to-b from-black to-gray-900"></div>
      <div className="w-full px-[4vw] xl:px-10vw">
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
          <div>
            <UIButton size="sm">
              <Settings className="m-0 mr-2 mt-[1px] h-4 w-4 p-0" />
              Settings
            </UIButton>
          </div>
        </div>
      </div>
    </>
  )
}

function MonthlyCashflow() {
  return (
    <Link to="/cash-flow/monthly" prefetch="intent">
      <div className="flex flex-col">
        <div className="flex items-center gap-x-5">
          <img src="/vectors/spreadsheet.png" alt="" className="h-10 w-10" />
          <div>
            <h4 className="text-base font-light">Monthly Expense</h4>
            <p className="text-secondary mt-1 text-md font-light leading-tight">
              Vercel usage, traffic, and more with the fields below.
            </p>
          </div>
        </div>
        <p className="text-secondary mt-6 text-left text-md font-light">
          Updated 13h ago..
        </p>
      </div>
    </Link>
  )
}
