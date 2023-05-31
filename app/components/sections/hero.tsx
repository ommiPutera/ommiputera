import {Link} from '@remix-run/react'
import clsx from 'clsx'
import {AnimatePresence, motion} from 'framer-motion'
import {debounce} from 'lodash'
import {useState} from 'react'

function HomeHeroSection() {
  return (
    <div className="text-primary relative mx-auto grid max-w-8xl gap-5 lg:gap-12">
      <FloatingBtn to="/" className="absolute left-28 top-8 hidden lg:block">
        <p>Server-side rendering</p>
        <p className="absolute -right-10 -top-6 text-2xl transition-[10] pointer-events-none group-hover:-right-12 group-hover:-top-8">
          🚀
        </p>
      </FloatingBtn>
      <FloatingBtn to="/" className="absolute right-48 top-32 hidden lg:block">
        <p>Javascript</p>
        <p className="absolute -bottom-6 -left-10 text-3xl transition-[5] pointer-events-none group-hover:-left-12 group-hover:bottom-2">
          🛸
        </p>
      </FloatingBtn>
      <FloatingBtn
        to="/"
        className="absolute bottom-[10vh] left-[10vw] hidden lg:block"
      >
        <p>React.js</p>
        <p className="absolute -bottom-6 -left-10 text-2xl transition-[15] pointer-events-none group-hover:bottom-28 group-hover:left-14 group-hover:-rotate-12">
          🛩
        </p>
      </FloatingBtn>
      <div className="flex flex-col items-center justify-center gap-5">
        <AnimatePresence mode="wait">
          <ProfileCard />
        </AnimatePresence>
        <div className="text-center">
          <h3 className="text-xl font-medium lg:text-2xl">Hi👋, I'm Ommi</h3>
          <p className="mt-1 font-medium text-gray-300">Software Engineer</p>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-5">
        <h1 className="text-center text-3xl font-medium leading-tight md:w-2/3 lg:text-5xl xl:w-1/2">
          Helping people make the world a better place through quality software.
        </h1>
        <p className="mt-2 text-center font-medium text-gray-300 md:w-2/3 lg:mt-0 xl:w-1/2">
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

function FloatingBtn({
  to,
  children,
  ...rest
}: Omit<Parameters<typeof Link>['0'], 'to'> & {to: string}) {
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
      initial={{rotateY: isFliped ? 180 : 0}}
      animate={{rotateY: isFliped ? 170 : 0, transition: {duration: 0.5}}}
      exit={{rotateY: isFliped ? 170 : 0, transition: {duration: 0.2}}}
      className={clsx('cursor-pointer')}
    >
      {isFliped ? (
        <Link to="/post" prefetch="intent">
          <div
            style={{transform: 'scale(-1, 1)'}}
            className="rotate- relative flex h-48 w-48 items-center justify-center rounded-full bg-gray-800"
          >
            <p className="text-xl">About me</p>
          </div>
        </Link>
      ) : (
        <img src="/profile.png" alt="" className="h-48 w-48" />
      )}
    </motion.div>
  )
}

export {HomeHeroSection}
