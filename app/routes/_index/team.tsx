import {Tab, TabList, TabPanel, TabPanels, Tabs} from '@reach/tabs'
import {Link} from '@remix-run/react'

export default function Team() {
  return (
    <div className="mx-auto grid max-w-7xl gap-8 lg:gap-y-12">
      <div className="flex grid-cols-7 flex-col items-center justify-between gap-5 lg:grid lg:flex-row lg:items-start lg:gap-x-48">
        <h1 className="col-span-4 text-center text-3xl font-light leading-tight lg:text-left lg:text-5xl">
          Our Team ready to achive your <b>goal</b>
        </h1>
        <p className="col-span-3 mt-2 text-center text-base font-medium text-gray-300 lg:mt-3 lg:text-left lg:text-base">
          I have a talented team that can help me produce high-quality software
          and provide a range of services.
        </p>
      </div>
      <div className="mt-12 grid gap-y-16 lg:hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          <div className="col-span-1 flex w-fit flex-col justify-center gap-y-4 lg:col-span-4 lg:justify-start">
            <div className="relative">
              <p className="absolute -top-1.5 left-0 text-3xl text-green-500">
                01
              </p>
              <h3 className="text-center text-xl font-medium leading-tight">
                Web Development
              </h3>
            </div>
            <p className="text-lg font-medium leading-snug text-gray-200 lg:text-base">
              Happy Monday everyone! Let’s look at one of our favourite German
              Fintechs we’ve got to work on – Denario.
            </p>
          </div>
          <br />
          <div className="col-span-1 rounded-lg lg:col-span-8 lg:-mr-32">
            <p className="text-lg font-medium leading-relaxed text-gray-200 lg:text-base">
              We are a web and mobile design and development agency.
              Makingasadasd websites and apps, creating brand identities, and
              launching startups. Our goal is to help companies build
              relationships with their customers online through great design and
              technical performance.
            </p>
            <br />
            <p className="text-lg font-medium leading-snug text-gray-200 lg:text-base">
              The Dribbble shot depicts a web page design concept.
            </p>
            <Link to="/" className="text-lg text-green-500">
              info@shakuro.com
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12">
          <div className="col-span-1 flex w-fit flex-col justify-center gap-y-4 lg:col-span-4 lg:justify-start">
            <div className="relative">
              <p className="absolute -top-1.5 left-0 text-3xl text-red-500">
                02
              </p>
              <h3 className="text-center text-xl font-medium leading-tight">
                Mobile Development
              </h3>
            </div>
            <p className="text-lg font-medium leading-snug text-gray-200 lg:text-base">
              Happy Monday everyone! Let’s look at one of our favourite German
              Fintechs we’ve got to work on – Denario.
            </p>
          </div>
          <br />
          <div className="col-span-1 rounded-lg lg:col-span-8 lg:-mr-32">
            <p className="text-lg font-medium leading-snug text-gray-200 lg:text-base">
              We are a web and mobile design and development agency. Making
              websites and apps, creating brand identities, and launching
              startups. Our goal is to help companies build relationships with
              their customers online through great design and technical
              performance.
            </p>
            <br />
            <p className="text-lg font-medium leading-snug text-gray-200 lg:text-base">
              The Dribbble shot depicts a web page design concept.
            </p>
            <Link to="/" className="text-lg text-red-500">
              info@shakuro.com
            </Link>
          </div>
        </div>
      </div>
      <Tabs className="mt-12 hidden lg:block">
        <TabList className="flex w-full justify-center gap-x-6">
          <Tab className="max-w flex flex-col gap-y-2 rounded-t-xl border-b-2 bg-gray-800 px-8 pb-10 pt-4 text-left">
            <p className="mb-4 text-3xl text-green-500">01</p>
            <h4 className="text-xl">Web Development</h4>
            <p className="text-base font-light text-gray-200">
              Happy Monday everyone! Let’s look at one of our favourite German
              Fintechs we’ve got to work on – Denario.
            </p>
          </Tab>
          <Tab className="max-w flex flex-col gap-y-2 rounded-t-xl border-b-2 bg-gray-800 px-8 pb-10 pt-4 text-left">
            <p className="mb-4 text-3xl text-red-500">02</p>
            <h4 className="text-xl">Mobile Development</h4>
            <p className="text-base font-light text-gray-200">
              Happy Monday everyone! Let’s look at one of our favourite German
              Fintechs we’ve got to work on – Denario.
            </p>
          </Tab>
          <Tab className="max-w flex flex-col gap-y-2 rounded-t-xl border-b-2 bg-gray-800 px-8 pb-10 pt-4 text-left">
            <p className="mb-4 text-3xl text-orange-500">03</p>
            <h4 className="text-xl">Product Designer</h4>
            <p className="text-base font-light text-gray-200">
              Happy Monday everyone! Let’s look at one of our favourite German
              Fintechs we’ve got to work on – Denario.
            </p>
          </Tab>
        </TabList>
        <TabPanels className="mt-8">
          <TabPanel className="grid grid-cols-2 gap-x-14">
            <div className="col-span-1">
              <h4 className="mb-4 text-3xl">Web Development</h4>
              <p className="text-lg font-medium leading-relaxed text-gray-200 lg:text-base">
                We are a web and mobile design and development agency. Making
                websites and apps, creating brand identities, and launching
                startups. Our goal is to help companies build relationships with
                their customers online through great design and technical
                performance.
              </p>
              <br />
              <p className="text-lg font-medium leading-snug text-gray-200 lg:text-base">
                The Dribbble shot depicts a web page design concept.
              </p>
              <Link to="/" className="text-lg text-green-700">
                info@shakuro.com
              </Link>
            </div>
            <div className="col-span-1 rounded-lg bg-gray-800 p-8">assets</div>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  )
}
