import { UIButton } from "~/components/shadcn/button";

export default function WorkinOn() {
  return (
    <div className="mx-auto grid max-w-8xl gap-8 lg:gap-y-12">
      <div className="flex grid-cols-7 flex-col items-center justify-between gap-5 lg:grid lg:flex-row lg:items-start lg:gap-x-48">
        <h1 className="col-span-4 text-center text-3xl font-light leading-tight lg:text-left lg:text-5xl">
          What I'm <b>Working On</b>
        </h1>
        <div className="col-span-3 mt-2 gap-y-4 lg:mt-3">
          <p className="text-center text-lg font-medium text-gray-300 lg:text-left lg:text-xl">
            I'm building a freelance platform that caters to both small-scale
            and large-scale projects.
          </p>
          <UIButton
            className="mt-6 rounded-full"
            size="lg"
            hoverChild="McroHub.com"
          >
            Get Started
          </UIButton>
        </div>
      </div>
    </div>
  )
}
