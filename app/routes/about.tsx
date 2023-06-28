import {Tab, TabList, TabPanel, TabPanels, Tabs} from '@reach/tabs'
import {Link, type V2_MetaFunction} from '@remix-run/react'
import {SectionSpacer} from '~/components/spacer'
import {getImgProps, images} from '~/images'

export const meta: V2_MetaFunction = ({matches}) => {
  return [{title: 'About Ommi Putera'}]
}

export default function Index() {
  return (
    <main className="flex flex-col gap-5 pb-44 lg:gap-16">
      <div className="px-5vw py-9 lg:px-0 lg:py-12">
        <AboutMe />
      </div>
    </main>
  )
}

function AboutMe() {
  return (
    <div className="relative mx-auto grid w-full max-w-[1800px] grid-cols-12 gap-x-16">
      <div className="col-span-4 max-w-[1090px]">
        <img
          id="about-me"
          className="object-cover"
          {...getImgProps(images.ommi, {
            widths: [840, 1100, 1300, 2600, 3984],
            sizes: ['(max-width:1620px) 1090px', '60vh'],
          })}
        />
      </div>
      <div className="col-span-8 grid w-full grid-cols-5 lg:gap-x-16">
        <div className="col-span-3 flex gap-x-16">
          <div className="flex flex-col gap-y-6">
            <p className="text-justify text-md font-light text-white">
              I help companies from all over the world with tailor-made
              solutions. With each project, I push my work to new horizons,
              always putting quality first. I help companies from all over the
              world with tailor-made solutions. With each project, I push my
              work to new horizons, always putting quality first.
            </p>
            <p className="text-justify text-md font-light text-white">
              I help companies from all over the world with tailor-made
              solutions. With each project, I push my work to new horizons,
              always putting quality first. I help companies from all over the
              world with tailor-made solutions. With each project, I push my
              work to new horizons, always putting quality first.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium lg:text-xl">
              Here are some of the values I live by.
            </h3>
            <p className="mt-4 text-justify text-md font-light text-white">
              I help companies from all over the world with tailor-made
              solutions. With each project, I push my work to new horizons,
              always putting quality first. I help companies from all over the
              world with tailor-made solutions. With each project, I push my
              work to new horizons, always putting quality first.
            </p>
          </div>
        </div>
        <div className="sticky top-12 col-span-2 flex h-fit flex-col gap-y-8">
          <div className="2xl:mr-4 bg-gray-800 p-10 xl:mr-16">
            <div>
              <p className="text-md font-bold text-white">
                " I help companies from all over the world with tailor-made
                solutions. With each project, I push my work to new horizons,
                always putting quality first. "
              </p>
              <SectionSpacer size="xs" />
              <div className="">
                <h4 className="text-xs font-light tracking-[0.15em] text-gray-300">
                  TESTIMONIAL BY
                </h4>
                <p className="mt-1 text-sm font-light tracking-wide">
                  Naufal Ghifari
                </p>
              </div>
            </div>
            <SectionSpacer withoutBorder />
            <Tabs>
              <TabList className="max-w flex gap-x-6">
                <Tab className="w-full pb-2">Social</Tab>
                <Tab className="w-full pb-2">Contact</Tab>
                <Tab className="w-full pb-2">Resume</Tab>
              </TabList>
              <TabPanels className="mt-4">
                <TabPanel>instagram</TabPanel>
              </TabPanels>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
