import {HomeHeroSection} from '~/components/sections/hero'
// import Pricing from './pricing'
// import RecentWork from './recent-work'
// import WorkinOn from './working-on'
// import { SectionSpacer } from '~/components/spacer'
// import MiniApp from './mini-app'
import clsx from 'clsx'
import {useRootData} from '~/utils/use-root-data'

// bg-gradient-to-b from-black to-gray-900
export default function Index() {
  const {user} = useRootData()
  return (
    <main
      className={clsx('flex flex-col gap-5 lg:gap-32 ', {
        'bg-gradient dark:border-gray-800': user,
      })}
    >
      <div className="px-5vw py-9 lg:px-15vw lg:py-12">
        <HomeHeroSection />
      </div>
      {/* <div className="px-5vw lg:px-15vw">
        <Certifed />
      </div>
      <SectionSpacer withoutBorder size="xs" />
      <div className="px-5vw lg:px-15vw">
        <MiniApp />
      </div>
      <SectionSpacer withoutBorder size="xs" />
      <div className="px-5vw lg:px-15vw">
        <RecentWork />
      </div>
      <SectionSpacer />
      <div className="px-5vw lg:px-15vw">
        <WorkinOn />
      </div>
      <div className="px-5vw lg:px-15vw">
        <Pricing />
      </div> */}
    </main>
  )
}

// function Certifed() {
//   return (
//     <div className="flex flex-col">
//       <p className="text-secondary text-center text-lg font-medium">
//         I am certified
//       </p>
//       <h3 className="text-center text-lg font-medium lg:text-5xl">
//         Professional and Constantly Learning.
//       </h3>
//       <p className="px-0 text-center text-lg font-normal text-gray-200 lg:mt-2 lg:px-9 lg:text-xl lg:leading-normal">
//         I am curious. I spend 30 minutes a day on my personal learning.
//       </p>
//       <div className="mx-auto mt-24 flex max-w-5xl flex-wrap items-center justify-center gap-x-14 gap-y-8 overflow-hidden lg:gap-y-0">
//         <img src="/purwadhika-logo.png" alt="" className="w-56 opacity-60" />
//         <img src="/udemy-logo.png" alt="" className="w-44 opacity-60" />
//         <img src="/hackerrank-logo.png" alt="" className="w-48 opacity-60" />
//         <img src="/testgorilla-logo.png" alt="" className="w-44 opacity-60" />
//       </div>
//     </div>
//   )
// }
