import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@reach/tabs'
import { Link, type V2_MetaFunction } from '@remix-run/react'
import { SectionSpacer } from '~/components/spacer'
import { getImgProps, images } from '~/images'

export const meta: V2_MetaFunction = ({ matches }) => {
  return [{ title: 'About Ommi Putera' }]
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
      <div className="max-w-[1090px] col-span-4">
        <img
          id="about-me"
          className="object-cover"
          {...getImgProps(images.ommi, {
            widths: [840, 1100, 1300, 2600, 3984],
            sizes: ['(max-width:1620px) 1090px', '60vh'],
          })}
        />
      </div>
      <div className="col-span-8 grid grid-cols-5 w-full lg:gap-x-16">
        <div className="col-span-3 flex gap-x-16">
          <div className='flex flex-col gap-y-6'>
            <p className="font-light text-md text-white text-justify">
              I help companies from all over the world with tailor-made solutions.
              With each project, I push my work to new horizons, always putting
              quality first. I help companies from all over the world with tailor-made solutions.
              With each project, I push my work to new horizons, always putting
              quality first.
            </p>
            <p className="font-light text-md text-white text-justify">
              I help companies from all over the world with tailor-made solutions.
              With each project, I push my work to new horizons, always putting
              quality first. I help companies from all over the world with tailor-made solutions.
              With each project, I push my work to new horizons, always putting
              quality first.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium lg:text-xl">
              Here are some of the values I live by.
            </h3>
            <p className="font-light text-md mt-4 text-white text-justify">
              I help companies from all over the world with tailor-made solutions.
              With each project, I push my work to new horizons, always putting
              quality first. I help companies from all over the world with tailor-made solutions.
              With each project, I push my work to new horizons, always putting
              quality first.
            </p>
          </div>
        </div>
        <div className="col-span-2 sticky top-12 flex flex-col gap-y-8 h-fit">
          <div className='bg-gray-800 xl:mr-16 2xl:mr-4 p-10'>
            <div>
              <p className="font-bold text-md text-white">
                " I help companies from all over the world with tailor-made solutions.
                With each project, I push my work to new horizons, always putting
                quality first. "
              </p>
              <SectionSpacer size="xs" />
              <div className=''>
                <h4 className='tracking-[0.15em] text-gray-300 font-light text-xs'>TESTIMONIAL BY</h4>
                <p className='text-sm font-light mt-1 tracking-wide'>Naufal Ghifari</p>
              </div>
            </div>
            <SectionSpacer withoutBorder />
            <Tabs>
              <TabList className='max-w flex gap-x-6'>
                <Tab className='w-full pb-2'>Social</Tab>
                <Tab className='w-full pb-2'>Contact</Tab>
                <Tab className='w-full pb-2'>Resume</Tab>
              </TabList>
              <TabPanels className='mt-4'>
                <TabPanel>
                  instagram
                </TabPanel>
              </TabPanels>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
