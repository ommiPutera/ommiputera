import {type V2_MetaFunction} from '@remix-run/react'
import clsx from 'clsx'
import {PersonalFinanceHeroSection} from '~/components/sections/hero'
import {useRootData} from '~/utils/use-root-data'

export const meta: V2_MetaFunction = ({matches}) => {
  return [{title: 'Introduction Personal Financial'}]
}

export default function PersonalFinance() {
  const {user} = useRootData()
  return (
    <main
      className={clsx(
        'flex flex-col gap-5 dark:bg-gray-900 lg:gap-32 lg:py-8',
        {'bg-gradient dark:border-gray-800': user},
      )}
    >
      <div className="px-5vw py-9 lg:px-15vw lg:py-12">
        <PersonalFinanceHeroSection />
      </div>
    </main>
  )
}
