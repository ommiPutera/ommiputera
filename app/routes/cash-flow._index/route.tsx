import {type V2_MetaFunction} from '@remix-run/react'
import {ActivitySquare, Trello} from 'lucide-react'
import type {LoaderFunction} from '@remix-run/node'
import {getUser} from '~/utils/session.server'
import {Tab} from '@headlessui/react'
import {AnimatePresence, motion, useReducedMotion} from 'framer-motion'
import type {Post} from '@prisma/client'
import Board from './board'
import clsx from 'clsx'
import Analytics from './analytics'
import React from 'react'
import {db} from '~/utils/db.server'
import {LayoutTitle} from './misc'

export const meta: V2_MetaFunction = ({matches}) => {
  return [{title: 'Cash Flow Managament'}]
}

export type LoaderData = {
  posts: Post[] | null
}

export const loader: LoaderFunction = async ({request}) => {
  const user = await getUser(request)
  const posts = await db.post.findMany({where: {authorId: user?.id}})
  const data: LoaderData = {posts}
  return data
}

export default function Index() {
  const shouldReduceMotion = useReducedMotion()
  return (
    <div className="bg-gradient-to-b from-black to-gray-900 pb-24">
      <LayoutTitle
        title="Cashflow Managament"
        float
        subTitle="atomic CSS and recipes in a type-safe and readable manner."
      />
      <div className="relative mx-auto lg:max-w-7xl">
        <AnimatePresence>
          <motion.div
            className="-mt-36 rounded-lg border border-gray-100 bg-black dark:border-gray-800"
            initial={{y: 140, opacity: 0}}
            animate={{y: 0, opacity: 1, transition: {duration: 0.3}}}
            exit={{y: 220, opacity: 0}}
            transition={{
              opacity: {duration: shouldReduceMotion ? 0 : 0.5},
              ease: 'linear',
            }}
          >
            <Tab.Group
              as="div"
              className="w-full grid-cols-12 gap-x-8 overflow-visible"
            >
              <Tab.List className="z-0 mx-6 mt-4 flex overflow-x-scroll bg-transparent px-0 lg:col-span-3 lg:overflow-x-hidden">
                <TabComponent index={0} className="flex items-center gap-x-2">
                  <Trello size={18} />
                  <p className="text-md">Board</p>
                </TabComponent>
                <TabComponent index={1} className="flex items-center gap-x-2">
                  <ActivitySquare size={18} />
                  <p className="text-md">Analytics</p>
                </TabComponent>
              </Tab.List>
              <Contents />
            </Tab.Group>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

function TabComponent({
  children,
  index,
  className,
  ...props
}: {
  children: JSX.Element | React.ReactNode
  index: 0 | 1
  className?: string
}) {
  return (
    <Tab
      className={clsx(
        'relative my-1 rounded-md border-b-0 border-b-transparent px-2 py-1 focus:outline-none',
      )}
      {...props}
    >
      {({selected}) => (
        <>
          <div
            className={clsx(
              'font-medium',
              {
                'text-white': selected,
                'text-gray-200': !selected,
              },
              className,
            )}
          >
            {children}
          </div>
          <div
            className={clsx('absolute -bottom-1 left-0 h-0.5 w-full', {
              'bg-white': selected,
              'bg-transparent': !selected,
            })}
          ></div>
        </>
      )}
    </Tab>
  )
}

function Contents() {
  return (
    <Tab.Panels className="min-h-screen rounded-md p-6 outline-gray-400">
      {({selectedIndex}) => (
        <>
          <Tab.Panel hidden={selectedIndex !== 0}>
            <Board />
          </Tab.Panel>
          <Tab.Panel hidden={selectedIndex !== 1}>
            <Analytics />
          </Tab.Panel>
        </>
      )}
    </Tab.Panels>
  )
}
