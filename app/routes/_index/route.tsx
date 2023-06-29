import type { Project } from '@prisma/client'
import type { LoaderFunction } from '@remix-run/node'
import { HomeHeroSection } from '~/components/sections/hero'
import { db } from '~/utils/db.server'
import Pricing from './pricing'
import RecentWork from './recent-work'
import Team from './team'
import WorkinOn from './working-on'
import { SectionSpacer } from '~/components/spacer'

type LoaderData = { projects: Array<Project> }

export const loader: LoaderFunction = async ({ request }) => {
  const owner = await db.user.findMany({ where: { role: 'OWNER' } })
  const projects = await db.project.findMany({ where: { userId: owner[0].id } })
  let data: LoaderData = { projects }
  return data
}

export default function Index() {
  return (
    <>
      <img
        src="/hero-background.png"
        alt=""
        className="lg:h-100 absolute -z-10 h-[100vh] w-[100vw] object-cover opacity-60 lg:opacity-80"
      />
      <main className="flex flex-col gap-5 pb-44 lg:gap-24">
        <div className="px-5vw py-9 lg:px-15vw lg:py-12">
          <HomeHeroSection />
        </div>
        <div className="px-5vw lg:px-15vw">
          <Certifed />
        </div>
        <SectionSpacer withoutBorder size="xs" />
        <div className="px-5vw lg:px-15vw">
          <RecentWork />
        </div>
        <SectionSpacer />
        <div className="px-5vw lg:px-15vw">
          <WorkinOn />
        </div>
        <SectionSpacer />
        <div className="px-5vw lg:px-15vw">
          <Team />
        </div>
        {/* <div className="px-5vw lg:px-15vw">
          <Pricing />
        </div> */}
      </main>
    </>
  )
}

function Certifed() {
  return (
    <div className="flex flex-col gap-14">
      <h3 className="text-center text-lg font-medium lg:text-xl">
        Certified By
      </h3>
      <div className="mx-auto flex max-w-8xl flex-wrap items-center justify-center gap-x-16 gap-y-8 overflow-hidden lg:gap-y-0">
        <img
          src="/purwadhika-logo.png"
          alt=""
          className="w-36 opacity-50 lg:w-52"
        />
        <img src="/udemy-logo.png" alt="" className="w-32 opacity-50 lg:w-36" />
        <img
          src="/hackerrank-logo.png"
          alt=""
          className="w-32 opacity-50 lg:w-44"
        />
        <img
          src="/testgorilla-logo.png"
          alt=""
          className="w-32 opacity-50 lg:w-44"
        />
      </div>
    </div>
  )
}
