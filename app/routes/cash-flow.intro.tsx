import { Link, type V2_MetaFunction } from '@remix-run/react'
import { UIButton } from '~/components/shadcn/button'

export const meta: V2_MetaFunction = ({ matches }) => {
  return [{ title: 'Cash Flow Managament' }]
}

export default function Index() {
  return (
    <div className="text-primary relative mx-auto grid w-full max-w-8xl gap-5 py-4 lg:gap-y-16 lg:py-12">
      <h1 className="text-center text-2xl font-medium leading-tight lg:px-[5rem] lg:text-7xl xl:px-[10rem]">
        Manage and tracking <br /> your personal cashflow
      </h1>
      <h4 className="mt-2 px-0 text-center text-md font-medium leading-snug text-gray-400 lg:px-[20rem] lg:text-xl lg:text-gray-200">
        First of all, thank you for interested in reading about me, On this
        page, I will tell all about my life and my experiences
      </h4>
      <div className="mx-auto">
        <Link to="/login?to=/cash-flow" prefetch='intent'>
          <UIButton size="md">Get started!</UIButton>
        </Link>
      </div>
    </div>
  )
}
