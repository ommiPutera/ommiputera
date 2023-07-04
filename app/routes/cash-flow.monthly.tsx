import type { V2_MetaFunction } from '@remix-run/react'
import { Outlet } from '@remix-run/react'
import { MoveLeftIcon } from 'lucide-react'
import { useNavigate } from '@remix-run/react'
import { UIButton } from '~/components/shadcn/button'

export const meta: V2_MetaFunction = () => {
  return [{ title: 'Cashflow' }]
}

export default function Index() {
  const navigate = useNavigate()
  return (
    <>
      <div className='bg-red-900 w-screen h-[50vh] bg-gradient-to-b from-black to-gray-900 absolute -z-10'></div>
      <div className="w-full px-[4vw] xl:px-10vw">
        <div className="relative mx-auto flex max-w-7xl items-center justify-between py-9 lg:pb-12 lg:pt-12">
          <div className='w-full'>
            <UIButton
              onClick={() => navigate(-1)}
              variant="subtle"
              className="text-md text-orange-500"
            >
              <MoveLeftIcon className="mr-2.5" size="20" />
              <p> Back to cashflow</p>
            </UIButton>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  )
}
