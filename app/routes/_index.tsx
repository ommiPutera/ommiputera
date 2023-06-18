import type { Project } from '@prisma/client'
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@reach/tabs'
import type { LoaderFunction } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import clsx from 'clsx'
import { Button } from '~/components/button'
import { GalerySection } from '~/components/sections/galery'
import { HomeHeroSection } from '~/components/sections/hero'
import { db } from '~/utils/db.server'

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
      <main className="flex flex-col gap-5 pb-44 lg:gap-16">
        <div className="px-5vw py-9 lg:px-15vw lg:py-12">
          <HomeHeroSection />
        </div>
        <div className="px-5vw py-9 lg:px-15vw lg:py-12">
          <Certifed />
        </div>
        <div className="px-5vw py-9 lg:px-15vw lg:py-12">
          <RecentWork />
        </div>
        <div className="pb-9 lg:pb-12">
          <GalerySection />
        </div>
        <div className="px-5vw py-9 lg:px-15vw lg:py-12">
          <Team />
        </div>
      </main>
    </>
  )
}

function Team() {
  return (
    <div className="mx-auto grid max-w-8xl gap-8 lg:gap-y-12">
      <div className="flex lg:grid grid-cols-7 flex-col items-center justify-between gap-5 lg:gap-x-48 lg:flex-row lg:items-start">
        <h1 className="text-center col-span-4 text-3xl font-medium leading-tight lg:text-left lg:text-5xl">
          Our Team ready to achive your goal
        </h1>
        <p className="mt-2 text-center col-span-3 font-medium text-gray-300 lg:mt-3 lg:text-left">
          I have a talented team that can help me produce high-quality software and provide a range of services.
        </p>
      </div>
      <Tabs className='mt-12'>
        <TabList className='w-full flex justify-center gap-x-6'>
          <Tab className='pt-4 pb-10 border-b-2 px-8 max-w-sm flex flex-col gap-y-2 text-left rounded-t-xl bg-gray-800'>
            <p className="text-4xl">🚀</p>
            <h4 className='text-2xl'>Web Development</h4>
            <p className='font-light text-gray-200 text-md leading-snug'>Happy Monday everyone! Let’s look at one of our favourite German Fintechs we’ve got to work on – Denario.</p>
          </Tab>
          <Tab className='pt-4 pb-10 border-b-2 px-8 max-w-sm flex flex-col gap-y-2 text-left rounded-t-xl bg-gray-800'>
            <p className="text-4xl">🚀</p>
            <h4 className='text-2xl'>Mobile Development</h4>
            <p className='font-light text-gray-200 text-md leading-snug'>Happy Monday everyone! Let’s look at one of our favourite German Fintechs we’ve got to work on – Denario.</p>
          </Tab>
          <Tab className='pt-4 pb-10 border-b-2 px-8 max-w-sm flex flex-col gap-y-2 text-left rounded-t-xl bg-gray-800'>
            <p className="text-4xl">🚀</p>
            <h4 className='text-2xl'>Product Designer</h4>
            <p className='font-light text-gray-200 text-md leading-snug'>Happy Monday everyone! Let’s look at one of our favourite German Fintechs we’ve got to work on – Denario.</p>
          </Tab>
        </TabList>
        <TabPanels className='mt-24'>
          <TabPanel>
            <h4 className='text-4xl mb-4'>Web Development</h4>
            <p className='font-medium text-gray-200 text-lg leading-snug'>
              We are a web and mobile design and development agency. Making websites and apps, creating brand identities, and launching startups. Our goal is to help companies build relationships with their customers online through great design and technical performance.
            </p>
            <br />
            <p className='font-medium text-gray-200 text-lg leading-snug'>
              The Dribbble shot depicts a web page design concept for a company that specializes in designing and developing apps for other businesses. The overall aesthetic of the page is sleek and professional, with a dark grey background and bold white typography that gives the design a high-contrast, modern look. Each case study is presented as a thumbnail with a brief description to showcase them in a clear and concise manner. Overall, this shot shows a well-designed agency page that effectively communicates the company's services, values, and contact information in a visually appealing and easy-to-navigate format.
            </p>
            <br />
            <p className='font-medium text-gray-200 text-lg leading-snug'>
              The Dribbble shot depicts a web page design concept.
            </p>
            <Link to="/" className='text-2xl text-green-700'>info@shakuro.com</Link>
          </TabPanel>
          <TabPanel>
            <h4 className='text-4xl mb-4'>Mobile Development</h4>
            <p className='font-medium text-gray-200 text-lg leading-snug'>
              We are a web and mobile design and development agency. Making websites and apps, creating brand identities, and launching startups. Our goal is to help companies build relationships with their customers online through great design and technical performance.
            </p>
            <br />
            <p className='font-medium text-gray-200 text-lg leading-snug'>
              The Dribbble shot depicts a web page design concept for a company that specializes in designing and developing apps for other businesses. The overall aesthetic of the page is sleek and professional, with a dark grey background and bold white typography that gives the design a high-contrast, modern look. Each case study is presented as a thumbnail with a brief description to showcase them in a clear and concise manner. Overall, this shot shows a well-designed agency page that effectively communicates the company's services, values, and contact information in a visually appealing and easy-to-navigate format.
            </p>
            <br />
            <p className='font-medium text-gray-200 text-lg leading-snug'>
              The Dribbble shot depicts a web page design concept.
            </p>
            <Link to="/" className='text-2xl text-green-700'>info@shakuro.com</Link>
          </TabPanel>
          <TabPanel>
            <h4 className='text-4xl mb-4'>Product Designer</h4>
            <p className='font-medium text-gray-200 text-lg leading-snug'>
              We are a web and mobile design and development agency. Making websites and apps, creating brand identities, and launching startups. Our goal is to help companies build relationships with their customers online through great design and technical performance.
            </p>
            <br />
            <p className='font-medium text-gray-200 text-lg leading-snug'>
              The Dribbble shot depicts a web page design concept for a company that specializes in designing and developing apps for other businesses. The overall aesthetic of the page is sleek and professional, with a dark grey background and bold white typography that gives the design a high-contrast, modern look. Each case study is presented as a thumbnail with a brief description to showcase them in a clear and concise manner. Overall, this shot shows a well-designed agency page that effectively communicates the company's services, values, and contact information in a visually appealing and easy-to-navigate format.
            </p>
            <br />
            <p className='font-medium text-gray-200 text-lg leading-snug'>
              The Dribbble shot depicts a web page design concept.
            </p>
            <Link to="/" className='text-2xl text-green-700'>info@shakuro.com</Link>
          </TabPanel>
        </TabPanels>
      </Tabs>
      <div className="flex mt-24 flex-col items-center justify-between gap-5 lg:gap-x-48">
        <h1 className="text-center text-3xl font-medium leading-tight lg:text-5xl">
          Choose the plan that <br /> fits your needs.
        </h1>
        <p className="mt-2 text-center col-span-3 font-medium text-gray-300 lg:mt-3">
          I have a talented team that can help me produce high-quality <br /> software and provide a range of services.
        </p>
      </div>
      <div className='grid grid-cols-12 gap-x-6 py-4'>
        <PricingCard
          title='Personal Website / Company Profile'
          price={18}
          desc="From your imagination to real live."
          directTo='/learn'
          variant='danger'
          list={[
            "- 6 Month Maintaince",
            "- Your Website including Your Site CMS",
            "- Maxium 12 module / page",
            "- Free Domain",
          ]}
        />
        <PricingCard
          title='Digital Product'
          price={45}
          desc="From your imagination to real live."
          directTo='/learn'
          variant='danger'
          list={[
            "- 6 Month Maintaince",
            "- Your Website including Your Site CMS",
            "- Maxium 10 module / page ",
            "- With design first",
          ]}
        />
        <PricingCard
          title='Custom Website'
          price={35}
          desc="From your imagination to real live."
          directTo='/learn'
          variant='danger'
          list={[
            "- 6 Month Maintaince",
            "- Your Website including Your Site CMS",
            "- Maxium 10 module / page ",
            "- With design first",
          ]}
        />
      </div>
    </div>
  )
}

function PricingCard({
  title,
  price,
  desc,
  list,
  directTo,
  variant
}: {
  title: string,
  price: number,
  desc: string,
  list: Array<string>,
  directTo: string,
  variant: 'danger'
}) {
  return (
    <div className='lg:gap-y-10 cursor-pointer col-span-4 flex flex-col rounded-xl py-12 px-10 border border-gray-600 hover:border-red-300'>
      <h4 className='text-xs border rounded-full bg-red-100 border-red-200 w-fit font-medium px-5 py-2.5'>{title}</h4>
      <div>
        <h1 className='text-4xl leading-none'>Start from <br /> Rp. {price}jt</h1>
        <p className='text-md font-light text-gray-200 mt-6'>{desc}</p>
      </div>
      <ul className='flex flex-col gap-y-4 font-light text-md text-gray-200'>
        {list.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <Link to={directTo} prefetch='intent'>
        <Button size='lg' variant={variant}>Learn More</Button>
      </Link>
    </div>
  )
}

function RecentWork() {
  const data = useLoaderData<LoaderData>()

  return (
    <div className="mx-auto grid max-w-8xl gap-8 lg:gap-12">
      <div className="flex lg:grid grid-cols-7 flex-col items-center justify-between gap-5 lg:gap-x-48 lg:flex-row lg:items-start">
        <h1 className="text-center col-span-4 text-3xl font-medium leading-tight lg:text-left lg:text-5xl">
          I help brands and people with tailor-made solutions
        </h1>
        <p className="mt-2 text-center col-span-3 font-medium text-gray-300 lg:mt-3 lg:text-left">
          You can explore my recent work here, or view the complete project portfolio at {" "}
          <Link to="/project" prefetch='intent'>
            <span className='underlined text-white'>
              /project
            </span>
          </Link>
        </p>
      </div>
      <div className="flex flex-col gap-2 lg:gap-6">
        <div className="flex items-center justify-between border-b border-gray-600">
          <Link to="/project" prefetch='intent'>
            <h3 className="py-4 font-medium text-gray-300 lg:text-xl">
              View All Project
            </h3>
          </Link>
          <h3 className="py-4 text-xl font-medium md:text-2xl lg:text-3xl">
            Recent Work
          </h3>
        </div>
        {data.projects.map(project => (
          <ProjectSection
            key={project.id}
            title={project.name}
            detailRoute={
              '/project/' + project.name.toLowerCase().replace(' ', '-')
            }
            liveLink={project.liveLink}
            desc={project.description}
          />
        ))}
      </div>
    </div>
  )
}

function Certifed() {
  return (
    <div className="flex flex-col gap-14">
      <h3 className="text-center text-lg font-medium lg:text-xl">
        Certified By
      </h3>
      <div className="mx-auto flex max-w-8xl flex-wrap items-center justify-center gap-x-16 gap-y-8 overflow-hidden lg:gap-y-0">
        <img src="/purwadhika-logo.png" alt="" className="w-36 lg:w-52" />
        <img src="/udemy-logo.png" alt="" className="w-32 lg:w-36" />
        <img src="/hackerrank-logo.png" alt="" className="w-32 lg:w-44" />
        <img src="/testgorilla-logo.png" alt="" className="w-32 lg:w-44" />
      </div>
    </div>
  )
}

function ProjectSection({
  title,
  detailRoute = '',
  liveLink = '',
  desc,
}: {
  title: string
  detailRoute: string
  liveLink?: string
  desc: string
}) {
  return (
    <div className="flex flex-col items-center justify-between pt-9 md:flex-row">
      <p className="mb-4 text-lg font-medium text-gray-300 md:mb-0">{desc}</p>
      <div className="flex flex-col items-center gap-6 md:flex-row md:gap-12">
        <Link
          target="_blank"
          to={liveLink}
          className={clsx(
            liveLink && 'underlined',
            !liveLink && 'pointer-events-none',
          )}
        >
          <h2 className="pb-2 text-3xl font-medium leading-tight md:text-xl lg:text-4xl">
            {title}
          </h2>
        </Link>
        <Link to={detailRoute}>
          <button className="rounded-full bg-gray-700 px-4 py-2 hover:bg-gray-800">
            Detail
          </button>
        </Link>
      </div>
    </div>
  )
}
