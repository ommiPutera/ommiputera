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
    <main className="flex flex-col gap-5 pb-44 lg:gap-24 lg:pt-8">
      <div className="px-5vw py-9 lg:px-15vw lg:py-12">
        <img
          id="about-me"
          className="object-cover"
          {...getImgProps(images.ommi, {
            widths: [840, 1100, 1300, 2600, 3984],
            sizes: ['(max-width:1620px) 1090px', '60vh'],
          })}
        />
      </div>
    </main>
  )
}
