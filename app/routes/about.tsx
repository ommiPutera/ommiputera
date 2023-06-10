import {Link, type V2_MetaFunction} from '@remix-run/react'
import {AboutHeroSection} from '~/components/sections/hero'
import {getImgProps, images} from '~/images'

export const meta: V2_MetaFunction = ({matches}) => {
  return [{title: 'About Ommi Putera'}]
}

export default function Index() {
  return (
    <>
      <img
        src="/hero-background.png"
        alt=""
        className="lg:h-100 absolute -z-10 h-[100vh] w-[100vw] object-cover opacity-60 lg:opacity-100"
      />
      <main className="flex flex-col gap-5 pb-44 lg:gap-16">
        <div className="px-5vw py-9 lg:px-15vw lg:py-12">
          <AboutHeroSection />
        </div>
        <div className="px-5vw pb-9 lg:px-15vw lg:pb-12">
          <LongStory />
        </div>
        <div className="px-5vw py-9 lg:px-15vw lg:py-12">
          <AboutMe />
        </div>
      </main>
    </>
  )
}

function LongStory() {
  return (
    <div className="mx-auto flex max-w-8xl flex-col gap-8 lg:gap-y-20">
      <h1 className="flex-1 text-center text-xl font-medium lg:text-4xl">
        How I got where we are now.
      </h1>
      <div className="flex flex-1 flex-col gap-y-4 lg:px-[8rem]">
        <h1 className="text-lg font-medium leading-tight lg:text-2xl">
          I was born in 1998 in Bengkulu, Indonesia.
        </h1>
        <h4 className="text-lg font-medium text-gray-300 lg:text-xl">
          After graduating High School and serving a 2 year mission in the
          Missouri Independence Mission for The Church of Jesus Christ of
          Latter-day Saints, I went to BYU where I graduated with a Master of
          Science in Information Systems degree in 2014.
        </h4>
        <h4 className="text-lg font-medium text-gray-300 lg:text-xl">
          Early on in my career I decided I wanted to be an expert in
          JavaScript. So I set my mind on mastering the world's most popular
          programming language. I spent countless hours writing JavaScript for
          the companies I worked for as well as in the evenings for open source
          and other side projects. Eventually I even represented PayPal on the
          TC-39 (the committee responsible for standardizing the JavaScript
          language). I feel like I achieved my goal of becoming an expert in
          JavaScript, but I do need to keep up just like everyone else, which is
          an enjoyable challenge.
        </h4>
        <h4 className="text-lg font-medium text-gray-300 lg:text-xl">
          I've also always been excited about sharing what I know with others.
          When I was in school, I signed up to be a tutor for my classmates and
          once I even got Firebase to sponsor pizza for me to give an informal
          workshop about Angular.js to my fellow students. I was a speaker at
          the first meetup I ever attended, and I've now delivered over a
          hundred talks on topics including JavaScript, React, Testing, Careers,
          and more. One of my talks got noticed by egghead and I was invited to
          turn that talk into an egghead course. The rest is history!
        </h4>
      </div>
    </div>
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
