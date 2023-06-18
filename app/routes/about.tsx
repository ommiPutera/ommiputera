import { Link, type V2_MetaFunction } from '@remix-run/react'
import { getImgProps, images } from '~/images'

export const meta: V2_MetaFunction = ({ matches }) => {
  return [{ title: 'About Ommi Putera' }]
}

export default function Index() {
  return (
    <main className="flex flex-col gap-5 pb-44 lg:gap-16">
      <div className="px-5vw py-9 lg:px-15vw lg:py-12">
        <AboutMe />
      </div>
    </main>
  )
}

function AboutMe() {
  return (
    <div className="relative mx-auto flex max-w-8xl flex-col gap-8 lg:flex-row lg:gap-x-24 xl:gap-x-36">
      <div className="w-full lg:w-1/2">
        <img
          id="about-me"
          className="rounded-lg object-cover"
          {...getImgProps(images.ommi, {
            widths: [840, 1100, 1300, 2600, 3984],
            sizes: ['(max-width:1620px) 1090px', '60vh'],
          })}
        />
      </div>
      <div className="flex w-full flex-col gap-y-8 lg:w-1/2 lg:gap-y-28">
        <div className="flex flex-col gap-y-4">
          <h3 className="text-left text-xl font-medium leading-tight lg:text-3xl">
            Big extreme sports enthusiast.
          </h3>
          <p className="font-medium text-gray-300">
            I help companies from all over the world with tailor-made solutions.
            With each project, I push my work to new horizons, always putting
            quality first.
            <br />
            <br />
            Always exploring...
          </p>
        </div>
        <div className="flex flex-col gap-y-4">
          <h3 className="text-left text-xl font-medium leading-tight lg:text-3xl">
            I can help you with ..
          </h3>
          <div>
            <p className="font-medium text-gray-300">
              A complete website from concept to implementation, that's what
              makes me stand out. My great sense for design and my development
              skills enable me to create kick-ass projects.
            </p>
          </div>
          <div>
            <h4 className="pb-2 text-left text-xl font-medium leading-tight lg:text-xl">
              Design
            </h4>
            <p className="font-medium text-gray-300">
              With a solid track record in designing websites and apps, I
              deliver strong and user-friendly digital designs. Solid company
              branding is the foundation of any succesful website.
            </p>
          </div>
          <div className="flex justify-start pt-12">
            <Link to="/about">
              <button className="group relative rounded-full bg-gray-700 px-6 py-2 hover:bg-gray-800">
                <p className="whitespace-nowrap text-md font-medium">
                  Learn more about me
                </p>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
