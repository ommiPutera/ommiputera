import {HomeHeroSection} from '~/components/sections/hero'

export default function Index() {
  return (
    <div className="flex flex-col gap-5 lg:gap-16">
      <img
        src="/hero-background.png"
        alt=""
        className="lg:h-100 absolute -z-10 h-[100vh] w-[100vw] object-cover opacity-60 lg:opacity-100"
      />
      <div className="px-5vw py-9 lg:px-15vw lg:py-12">
        <HomeHeroSection />
      </div>
      <div className="flex flex-col gap-8 bg-gray-800 px-5vw py-9 lg:px-15vw">
        <h3 className="text-center text-xl font-medium">Certified By</h3>
        <div className="mx-auto flex max-w-8xl items-center justify-center gap-x-9">
          <img src="/purwadhika-logo.png" alt="" className="w-32 lg:w-52" />
          <img src="/udemy-logo.png" alt="" className="w-24 lg:w-36" />
        </div>
      </div>
      <div className="px-5vw py-9 lg:px-15vw lg:py-12">
        <div className="mx-auto grid max-w-8xl">
          <h1 className="text-left text-3xl font-medium leading-tight md:w-2/3 lg:text-6xl xl:w-1/2">
            Helping brands thrive in the digital world
          </h1>
        </div>
      </div>
    </div>
  )
}
