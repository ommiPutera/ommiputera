import { type V2_MetaFunction } from '@remix-run/react'
import { UIButton } from '~/components/shadcn/button'
import {
  ActivitySquare,
  Trello,
  FilePlus,
  Settings,
  MoreHorizontal,
  LogOut,
  ChevronRight,
  BookOpenCheck,
} from 'lucide-react'
import type { LoaderFunction } from '@remix-run/node'
import { getUser } from '~/utils/session.server'
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
import { Logo } from '~/components/navbar'
import Analytics from './analytics'
import React from 'react'
import { db } from '~/utils/db.server'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuItem
} from '~/components/shadcn/dropdown-menu'

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
  return (
    <>
      <LayoutTitle />
      <div className="relative mx-auto grid lg:max-w-7xl">
        <Tabs
          className="w-full grid-cols-12 gap-x-8 overflow-visible"
          orientation={TabsOrientation.Horizontal}
        >
          <TabList className="z-0 flex overflow-x-scroll border-b border-b-gray-800 bg-transparent px-5vw lg:col-span-3 lg:overflow-x-hidden lg:px-0">
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
      className={clsx('border-b-0 relative border-b-transparent outline-gray-500 rounded-md px-1 my-2')}
      {...props}
    >
      <div
        className={clsx(
          'px-2 py-0.5 font-medium',
          {
            'text-white': selectedIndex === index,
            'text-gray-200': selectedIndex !== index,
          },
          className,
        )}
      >
        {children}
      </div>
      <div className={clsx('w-full absolute left-0 -bottom-2 h-0.5', {
        'bg-white': selectedIndex === index,
        'bg-transparent': selectedIndex !== index,
      })}></div>
    </ReachTab>
  )
}

function Contents() {
  const { selectedIndex } = useTabsContext()
  return (
    <TabPanels className="mt-4 px-4 -mx-4 rounded-md outline-gray-400">
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
        <div className="relative mx-auto grid max-w-7xl grid-cols-12 items-center py-9 lg:py-12">
          <div className="col-span-4 text-left">
            <Logo size="lg" className='w-min' />
          </div>
          <div className="col-span-4 text-center">
            <h1 className="leading-tigh px-0 text-xl font-medium capitalize lg:text-lg">
              Cashflow Managament
            </h1>
            <p className="text-secondary mt-1 text-md font-light">
              Powerd by Ommi
            </p>
          </div>
          <div className="col-span-4 flex items-center justify-end gap-x-2">
            <UIButton
              type="button"
              variant="subtle"
              size="sm"
              className="flex items-center gap-x-2 hover:bg-gray-600"
            >
              <FilePlus size={18} />
              <p>Template</p>
            </UIButton>
            <UIButton
              size="sm"
              variant="subtle"
              className="flex items-center gap-x-2 hover:bg-gray-600"
            >
              <Settings size={18} />
              <p>Settings</p>
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <UIButton size="sm" variant="subtle" className="flex items-center rounded-md px-2 hover:bg-gray-600">
          <MoreHorizontal size={18} />
        </UIButton>
      </DropdownMenuTrigger>
      <MoreMenus />
    </DropdownMenu>
  )
}

function MoreMenus() {
  return (
    <DropdownMenuContent className="">
      <DropdownMenuLabel className='px-2'>
        <p className="font-semibold">View Options</p>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup className='p-1'>
        <DropdownMenuItem className="border border-transparent rounded-md flex items-center gap-x-12 hover:bg-gray-800 hover:border-gray-700 px-2">
          <div className="flex items-center gap-x-2">
            <BookOpenCheck size={18} />
            <p>Guide</p>
          </div>
          <div className="text-secondary flex items-center gap-x-1">
            <p className="">Pengaturan</p>
            <ChevronRight size={16} />
          </div>
        </DropdownMenuItem>
        <form action="/logout" method="post">
          <UIButton variant="subtle" type="submit" className='w-full cursor-default'>
            <DropdownMenuItem className="border border-transparent rounded-md w-full hover:bg-red-200 hover:border-red-300 px-2">
              <div className="flex items-center gap-x-2">
                <LogOut size={18} className="text-red-800" />
                <p className="text-red-800">Log Out</p>
              </div>
            </DropdownMenuItem>
          </UIButton>
        </form>
      </DropdownMenuGroup>
    </DropdownMenuContent>
  )
}