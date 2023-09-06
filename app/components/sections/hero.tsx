import {ArrowRight} from 'lucide-react'
import {Badge} from '../shadcn/badge'

function HomeHeroSection() {
  return (
    <div className="text-primary relative mx-auto grid max-w-5xl gap-8 lg:gap-12">
      <div className="flex flex-col items-center justify-center gap-6 md:gap-8">
        <button className="flex items-center gap-x-2 rounded-full border-2 border-gray-200 bg-gray-100 px-3 py-2 hover:border-black dark:border-gray-600 dark:bg-gray-800 dark:hover:border-gray-200">
          <Badge variant="orange" size="xs">
            New
          </Badge>
          <p className="text-sm font-medium">Open-Source Software</p>
          <ArrowRight size={16} />
        </button>
        <h1 className="2xl:w-3/5 px-0 text-center text-4xl font-semibold leading-10 md:w-2/3 lg:w-3/4 lg:text-7xl lg:leading-[4.5rem]">
          Helping brands and peoples through quality software.
        </h1>
        <p className="px-0 text-center text-lg font-normal leading-normal text-gray-400 dark:text-gray-200 md:w-2/3 lg:px-9 lg:text-xl xl:w-3/5">
          2 years of proven experience in helping to create and maintain a
          better code base for re-usability and best practices. Experience in
          developing projects from concept to launch.
        </p>
      </div>
    </div>
  )
}

function PersonalHeroSection() {
  return (
    <div className="text-primary relative mx-auto grid max-w-5xl gap-8 lg:gap-12">
      <div className="flex flex-col items-center justify-center gap-6 md:gap-8">
        <h1 className="2xl:w-3/5 w-[85vw] px-0 text-center text-4xl font-semibold leading-10 md:w-2/3 lg:w-3/4 lg:text-7xl lg:leading-[4.5rem]">
          Manage and Tracking Your Personal Financial
        </h1>
        <p className="px-0 text-center text-lg font-normal leading-normal text-gray-400 dark:text-gray-200 md:w-2/3 lg:px-9 lg:text-xl xl:w-3/5">
          First of all, thank you for interested in reading about me, On this
          page, I will tell all about my life and my experiences
        </p>
        <button className="rounded-full border-2 border-gray-200 bg-gray-100 px-6 py-2 hover:border-black dark:border-gray-600 dark:bg-gray-800 dark:hover:border-gray-200">
          <p className="pt-0.5 text-md font-semibold">Get Started</p>
        </button>
      </div>
    </div>
  )
}

function ProjectHeroSection() {
  return (
    <div className="text-primary relative mx-auto grid w-full max-w-5xl gap-5 py-4 lg:gap-y-16 lg:py-12">
      <h1 className="text-center text-2xl font-medium leading-tight lg:px-[5rem] lg:text-7xl xl:px-[10rem]">
        Creating next <br /> level digital products
      </h1>
      <h4 className="mt-2 px-0 text-center text-md font-medium leading-snug text-gray-400 lg:px-[20rem] lg:text-lg lg:text-gray-200">
        First of all, thank you for interested in reading about me, On this
        page, I will tell all about my life and my experiences
      </h4>
    </div>
  )
}

export {HomeHeroSection, PersonalHeroSection, ProjectHeroSection}
