import { type V2_MetaFunction } from '@remix-run/react'
import { ActivitySquare, Trello } from 'lucide-react'
import type { LoaderFunction } from '@remix-run/node'
import { getUser } from '~/utils/session.server'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import type { Post } from '@prisma/client'
import type { TabProps } from '@reach/tabs'
import {
  Tab as ReachTab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  TabsOrientation,
  useTabsContext,
} from '@reach/tabs'
import Board from './board'
import clsx from 'clsx'
import Analytics from './analytics'
import React from 'react'
import { db } from '~/utils/db.server'
import { LayoutTitle } from './misc'

export const meta: V2_MetaFunction = ({ matches }) => {
  return [{ title: 'Cash Flow Managament' }]
}

export type LoaderData = {
  posts: Post[] | null
}

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request)
  const posts = await db.post.findMany({ where: { authorId: user?.id } })
  const data: LoaderData = { posts }
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
            className="-mt-36 rounded-lg border border-gray-800 bg-black"
            initial={{ y: 140, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { duration: 0.3 } }}
            exit={{ y: 220, opacity: 0 }}
            transition={{
              opacity: { duration: shouldReduceMotion ? 0 : 0.5 },
              ease: 'linear',
            }}
          >
            <Tabs
              className="w-full grid-cols-12 gap-x-8 overflow-visible"
              orientation={TabsOrientation.Horizontal}
            >
              <TabList className="z-0 flex overflow-x-scroll bg-transparent lg:col-span-3 lg:overflow-x-hidden px-0 border-b border-b-gray-800">
                <Tab index={0} className="flex items-center gap-x-2">
                  <Trello size={18} />
                  <p className="text-md">Board</p>
                </Tab>
                <Tab index={1} className="flex items-center gap-x-2">
                  <ActivitySquare size={18} />
                  <p className="text-md">Analytics</p>
                </Tab>
              </TabList>
              <Contents />
            </Tabs>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

function Tab({
  children,
  index,
  className,
  ...props
}: {
  children: JSX.Element | React.ReactNode
  index: 0 | 1
  className?: string
} & TabProps) {
  const { selectedIndex } = useTabsContext()
  return (
    <ReachTab
      className={clsx(
        'relative my-1 px-2 py-1 rounded-md border-b-0 border-b-transparent outline-gray-500',
      )}
      {...props}
    >
      <div
        className={clsx(
          'font-medium',
          {
            'text-white': selectedIndex === index,
            'text-gray-200': selectedIndex !== index,
          },
          className,
        )}
      >
        {children}
      </div>
      <div
        className={clsx('absolute -bottom-1 left-0 h-0.5 w-full', {
          'bg-white': selectedIndex === index,
          'bg-transparent': selectedIndex !== index,
        })}
      ></div>
    </ReachTab>
  )
}

function Contents() {
  const { selectedIndex } = useTabsContext()
  return (
    <TabPanels className="min-h-screen rounded-md p-6 outline-gray-400">
      <TabPanel hidden={selectedIndex !== 0}>
        <Board />
      </TabPanel>
      <TabPanel hidden={selectedIndex !== 1}>
        <Analytics />
      </TabPanel>
    </TabPanels>
  )
}
