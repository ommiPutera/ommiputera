import { Link } from '@remix-run/react'
import { getImgProps, images } from '~/images'
import { AnimatePresence, motion } from 'framer-motion'
import clsx from 'clsx'
import React from 'react'
import { debounce } from 'lodash'

export default function Index() {
  return (
    <main className="flex flex-col gap-5 pb-44 lg:gap-16">
      <div className="px-5vw py-9 lg:px-0 lg:py-12">
        <div className="flex flex-col items-center justify-center gap-5">
          <AnimatePresence mode="wait">
            <ProfileCard />
          </AnimatePresence>
        </div>
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

function ProfileCard() {
  const [isFliped, setIsFlip] = React.useState(false)
  const debouncedHandleMouseEnter = debounce(() => setIsFlip(true), 300)
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
            className="rotate- relative flex h-44 w-44 items-center justify-center rounded-full bg-gray-800"
          >
            <p className="text-lg">About me</p>
          </div>
        </Link>
      ) : (
        <>
          <div className="jelly-effects absolute h-44 w-44 rounded-full"></div>
          <img src="/profile.png" alt="" className="h-44 w-44" />
        </>
      )}
    </motion.div>
  )
}
