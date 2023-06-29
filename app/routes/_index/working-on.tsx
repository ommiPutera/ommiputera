import { UIButton } from '~/components/shadcn/button'

export default function WorkinOn() {
  return (
    <div className="mx-auto grid max-w-8xl gap-8 lg:gap-y-12">
      <div className="flex grid-cols-1 lg:grid-cols-7 flex-col items-center justify-between gap-5 lg:grid lg:flex-row lg:items-start lg:gap-x-48">
        <h1 className="col-span-1 lg:col-span-4 text-center text-3xl font-light leading-tight lg:text-left lg:text-5xl">
          What I'm <b>Working On</b>
        </h1>
        <p className="col-span-1 lg:col-span-3 mt-2 text-center text-lg font-medium text-gray-300 lg:mt-3 lg:text-left lg:text-xl">
          I'm building a freelance platform that caters to both small-scale and
          large-scale projects.
        </p>
      </div>
      <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-8 lg:gap-y-0">
        <div className="col-span-1 lg:col-span-4 flex w-fit flex-col justify-center lg:justify-start gap-y-4">
          <h3 className="text-center text-3xl font-bold leading-tight lg:text-left lg:text-4xl">
            twon.com
          </h3>
          <p className="col-span-3 text-center text-md font-light text-white lg:text-left lg:text-lg">
            I'm building a freelance platform that caters to both small-scale
            and large-scale projects. I'm building a freelance platform that
            caters to both small-scale and large-scale projects.
          </p>
          <div className='w-full flex justify-center lg:justify-start'>
            <UIButton className="rounded-full" size="md" hoverChild="twon.com">
              Explore
            </UIButton>
          </div>
        </div>
        <div className="col-span-1 lg:col-span-8 lg:-mr-32 h-96 rounded-lg border border-gray-700">
          Asset
        </div>
      </div>
      <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-8 lg:gap-y-0">
        <div className="col-span-1 lg:col-span-4 flex w-fit flex-col justify-center lg:justify-start gap-y-4">
          <h3 className="text-center text-3xl font-bold leading-tight lg:text-left lg:text-4xl">
            twon.com
          </h3>
          <p className="col-span-3 text-center text-md font-light text-white lg:text-left lg:text-lg">
            I'm building a freelance platform that caters to both small-scale
            and large-scale projects. I'm building a freelance platform that
            caters to both small-scale and large-scale projects.
          </p>
          <div className='w-full flex justify-center lg:justify-start'>
            <UIButton className="rounded-full" size="md" hoverChild="twon.com">
              Explore
            </UIButton>
          </div>
        </div>
        <div className="col-span-1 lg:col-span-8 lg:-mr-32 h-96 rounded-lg border border-gray-700">
          Asset
        </div>
      </div>
    </div>
  )
}
