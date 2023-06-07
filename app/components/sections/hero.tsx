import { Link } from '@remix-run/react'
import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import { debounce } from 'lodash'
import { useState } from 'react'
import { getImgProps, images } from '~/images'

function HomeHeroSection() {
  return (
    <div className="text-primary relative mx-auto grid max-w-8xl gap-5 lg:gap-12">
      <FloatingBtn to="/" className="absolute left-28 top-8 hidden lg:block">
        <p className="whitespace-nowrap font-medium">Server-side rendering</p>
        <p className="pointer-events-none absolute -right-10 -top-6 text-xl transition-[10] delay-200 group-hover:-right-24 group-hover:-top-14 group-hover:text-3xl">
          🚀
        </p>
      </FloatingBtn>
      <FloatingBtn to="/" className="absolute right-48 top-32 hidden lg:block">
        <p className="whitespace-nowrap font-medium">Javascript</p>
        <p className="pointer-events-none absolute -bottom-6 -left-10 text-xl transition-[5] delay-200 group-hover:-left-12 group-hover:bottom-2 group-hover:text-2xl">
          🛸
        </p>
      </FloatingBtn>
      <FloatingBtn
        to="/"
        className="absolute bottom-[10vh] left-[1vw] hidden lg:block"
      >
        <p className="whitespace-nowrap font-medium">React.js</p>
        <p className="pointer-events-none absolute -bottom-6 -left-10 text-xl transition-[25] delay-200 group-hover:bottom-14 group-hover:left-14 group-hover:-rotate-12 group-hover:text-2xl">
          🏂🏾
        </p>
      </FloatingBtn>
      <div className="flex flex-col items-center justify-center gap-5">
        <AnimatePresence mode="wait">
          <ProfileCard />
        </AnimatePresence>
        <div className="text-center">
          <h3 className="text-xl font-medium lg:text-2xl">
            Hi 👋, I'm Ommi Putera
          </h3>
          <p className="mt-1 font-medium text-gray-300">Software Engineer</p>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-5">
        <h1 className="px-0 text-center text-3xl font-medium leading-tight md:w-2/3 lg:px-9 lg:text-5xl xl:w-3/5">
          Helping people make the world a better place through quality software.
        </h1>
        <p className="mt-2 px-0 text-center font-medium text-gray-300 md:w-2/3 lg:mt-0 lg:px-9 xl:w-3/5">
          2 years of proven experience in helping to create and maintain a
          better code base for re-usability and best practices. Experience in
          developing projects from concept to launch. Eager to tackle more
          complex problems, and continues to find ways to maximize user
          efficiency
        </p>
      </div>
    </div>
  )
}

function AboutHeroSection() {
  return (
    <div className="text-primary relative mx-auto grid max-w-8xl gap-5 lg:gap-12">
      <div className="flex flex-col items-center justify-center gap-5">
        <h1 className="px-0 text-center text-3xl font-medium leading-tight md:w-2/3 lg:px-9 lg:text-5xl xl:w-3/5">
          Hi there 👋, I'm Ommi
        </h1>
        <h4 className="mt-2 px-0 text-center text-xl font-medium text-gray-300 md:w-2/3 lg:mt-0 lg:px-9 xl:w-3/5">
          First of all, thank you for interested in reading about me, On this
          page, I will tell all about my life and my experiences
        </h4>
      </div>
      <div className="pt-9 lg:pt-12">
        <img
          id="about-me"
          className="rounded-lg object-cover"
          {...getImgProps(images.bengkuluBeach, {
            widths: [840, 1100, 1300, 2600, 3984],
            sizes: ['(min-width:1620px) 3984px', '100vw'],
          })}
        />
        <h4 className="mt-2 px-0 text-lg font-medium lg:mt-4">
          Sungai Suci Beach, Bengkulu
        </h4>
        <p className="px-0 text-sm font-medium text-gray-300">
          src:https://unsplash.com/@surealis
        </p>
      </div>
    </div>
  )
}

function FloatingBtn({
  to,
  children,
  ...rest
}: Omit<Parameters<typeof Link>['0'], 'to'> & { to: string }) {
  return (
    <Link to={to} {...rest}>
      <button className="group relative rounded-full bg-gray-700 px-4 py-2 hover:bg-gray-800">
        {children}
      </button>
    </Link>
  )
}

function ProfileCard() {
  const [isFliped, setIsFlip] = useState(false)
  const debouncedHandleMouseEnter = debounce(() => setIsFlip(true), 400)
  const handlOnMouseLeave = () => {
    debouncedHandleMouseEnter.cancel()
    setIsFlip(false)
  }
  return (
    <motion.div
      onMouseEnter={debouncedHandleMouseEnter}
      onMouseLeave={handlOnMouseLeave}
      initial={{ rotateY: isFliped ? 180 : 0 }}
      animate={{ rotateY: isFliped ? 170 : 0, transition: { duration: 0.5 } }}
      exit={{ rotateY: isFliped ? 170 : 0, transition: { duration: 0.2 } }}
      className={clsx('cursor-pointer')}
    >
      {isFliped ? (
        <Link to="/post" prefetch="intent">
          <div
            style={{ transform: 'scale(-1, 1)' }}
            className="rotate- relative flex h-48 w-48 items-center justify-center rounded-full bg-gray-800"
          >
            <p className="text-xl">About me</p>
          </div>
        </Link>
      ) : (
        <>
          <div className="jelly-effects absolute h-48 w-48 rounded-full"></div>
          <img src="/profile.png" alt="" className="h-48 w-48" />
        </>
      )}
    </motion.div>
  )
}

export { HomeHeroSection, AboutHeroSection }
