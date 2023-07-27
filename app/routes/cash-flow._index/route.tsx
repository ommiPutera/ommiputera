import { Link, type V2_MetaFunction } from '@remix-run/react'
import { UIButton } from '~/components/shadcn/button'
import { ActivitySquare, Trello, FilePlus, Settings, MoreHorizontal, ChevronRight } from 'lucide-react'
import type { LoaderFunction } from '@remix-run/node'
import { storage } from '~/utils/session.server'
import { getPostByAuthor } from '~/utils/post.session'
import type { Post } from '@prisma/client'
import type { TabProps } from '@reach/tabs';
import { Tab as ReachTab, TabList, TabPanel, TabPanels, Tabs, TabsOrientation, useTabsContext } from '@reach/tabs'
import Board from './board'
import clsx from 'clsx'
import { Logo } from '~/components/navbar'
import Analytics from './analytics'
import { Popover, PopoverContent, PopoverTrigger } from '~/components/shadcn/popover'
import React from 'react'

export const meta: V2_MetaFunction = ({ matches }) => {
  return [{ title: 'Cash Flow Managament' }]
}

export type LoaderData = {
  posts: Post[] | null
}

export const loader: LoaderFunction = async ({ request }) => {
  let session = await storage.getSession()
  const posts = await getPostByAuthor({ authorId: session.get('userId') })
  const data: LoaderData = { posts }
  return data
}

export default function Index() {
  return (
    <>
      <LayoutTitle />
      <div className="relative mx-auto grid lg:max-w-7xl">
        <Tabs
          className="w-full grid-cols-12 gap-x-8 overflow-visible"
          orientation={TabsOrientation.Horizontal}
        >
          <TabList
            className='z-0 border-b border-b-gray-800 flex gap-1 overflow-x-scroll bg-transparent px-5vw lg:col-span-3 lg:overflow-x-hidden lg:px-0'
          >
            <Tab index={0} className="flex items-center gap-x-2">
              <Trello size={20} />
              <div>Board</div>
            </Tab>
            <Tab index={1} className="flex items-center gap-x-2">
              <ActivitySquare size={20} />
              <div>Analytics</div>
            </Tab>
          </TabList>
          <Contents />
        </Tabs>
      </div>
    </>
  )
}

function Tab({ children, index, className, ...props }: { children: JSX.Element | React.ReactNode, index: 0 | 1, className?: string } & TabProps) {
  const { selectedIndex } = useTabsContext();
  return (
    <ReachTab
      className={clsx('border-b-transparent border-b-2 p-0 px-1')}
      {...props}
    >
      <div
        className={clsx('p-2 font-medium', {
          'text-white': selectedIndex === index,
          'text-gray-200': selectedIndex !== index
        }, className)}
      >
        {children}
      </div>
    </ReachTab>
  )
}

function Contents() {
  const { selectedIndex } = useTabsContext();
  return (
    <TabPanels className='mt-8'>
      <TabPanel hidden={selectedIndex !== 0}>
        <Board />
      </TabPanel>
      <TabPanel hidden={selectedIndex !== 1}>
        <Analytics />
      </TabPanel>
    </TabPanels>
  )
}

function LayoutTitle() {
  return (
    <>
      <div className="absolute -z-10 h-[50vh] w-screen bg-red-900 bg-gradient-to-b from-black to-gray-900"></div>
      <div className="w-full px-[4vw] xl:px-10vw">
        <div className="relative grid grid-cols-12 mx-auto max-w-7xl items-center py-9 lg:py-12">
          <div className="text-left col-span-4">
            <Logo withoutUnderlined size="lg" />
          </div>
          <div className='text-center col-span-4'>
            <h1 className="leading-tigh px-0 text-xl font-medium capitalize lg:text-lg">
              Cashflow Managament
            </h1>
            <p className="text-secondary mt-1 text-md font-light">
              Powerd by Ommi
            </p>
          </div>
          <div className='flex items-center justify-end col-span-4'>
            <Link to="/cash-flow" prefetch="intent">
              <UIButton type="button" variant="subtle" size="sm" className='flex items-center gap-x-2'>
                <FilePlus size={18} />
                Template
              </UIButton>
            </Link>
            <UIButton size="sm" variant="subtle" className='flex items-center gap-x-2'>
              <Settings size={18} />
              Settings
            </UIButton>
            <MoreAction />
          </div>
        </div>
      </div>
    </>
  )
}

function MoreAction() {
  return (
    <Popover>
      <PopoverTrigger className='flex items-center px-2'>
        <MoreHorizontal size={20} />
      </PopoverTrigger>
      <MoreMenus />
    </Popover>
  )
}

function MoreMenus() {
  return (
    <PopoverContent className='mt-4 w-auto px-2 py-2'>
      <p className='mb-3 mt-1 px-2 font-semibold'>View Options</p>
      <MoreMenuWrapper>
        <div className='flex items-center gap-x-2'>
          <FilePlus size={18} />
          <p>Settings</p>
        </div>
        <div className='flex items-center gap-x-1 text-secondary'>
          <p className='text-md'>Pengaturan</p>
          <ChevronRight size={16} />
        </div>
      </MoreMenuWrapper>
      <MoreMenuWrapper>
        <div className='flex items-center gap-x-2'>
          <FilePlus size={18} />
          <p>Test</p>
        </div>
        <div className='flex items-center gap-x-1 text-secondary'>
          <p className='text-md'>Test</p>
          <ChevronRight size={16} />
        </div>
      </MoreMenuWrapper>
    </PopoverContent>
  )
}

function MoreMenuWrapper({ children }: { children: JSX.Element | React.ReactNode[] }) {
  return (
    <button className='w-full px-2 py-1 gap-x-16 flex justify-between hover:bg-gray-700 rounded-md'>
      {children}
    </button>
  )
}