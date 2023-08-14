import {Tab} from '@headlessui/react'
import type {Post} from '@prisma/client'
import type {LoaderFunction} from '@remix-run/node'
import clsx from 'clsx'
import {BookOpenCheck, Layout, PieChart, X} from 'lucide-react'
import React from 'react'
import {ButtonLink} from '~/components/button'
import {UIButton} from '~/components/shadcn/button'
import {db} from '~/utils/db.server'
import {getUser} from '~/utils/session.server'
import Analytics from './analytics'
import Board from './board'
import {ProfileGroup} from '~/components/navbar'
import {OutletCenter, OutletRight, WrapperOutlet} from '../_layout'

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
  const [selectedIndex, setSelectedIndex] = React.useState(0)

  return (
    <WrapperOutlet>
      <OutletCenter>
        <Section />
        <Guides />
        <Tab.Group
          as="div"
          selectedIndex={selectedIndex}
          onChange={setSelectedIndex}
          className="w-full grid-cols-12 gap-x-8 overflow-visible"
        >
          <Tab.List className="z-0 mx-auto flex overflow-x-scroll border-b border-gray-100 px-6 dark:border-gray-800 lg:col-span-3 lg:overflow-x-hidden">
            <TabComponent index={0} className="flex items-center gap-x-2">
              <Layout size={18} strokeWidth={2.5} />
              <p className="mt-1 text-md">Board</p>
            </TabComponent>
            <TabComponent index={1} className="flex items-center gap-x-2">
              <PieChart size={18} strokeWidth={2.5} />
              <p className="mt-1 text-md">Analytics</p>
            </TabComponent>
          </Tab.List>
          <Tab.Panels className="py-6">
            <Tab.Panel>
              <Board />
            </Tab.Panel>
            <Tab.Panel>
              <Analytics />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </OutletCenter>
      <OutletRight>
        <ProfileGroup />
      </OutletRight>
    </WrapperOutlet>
  )
}

function Section() {
  return (
    <div className="sticky top-0 z-[99] w-full border-b border-gray-100 bg-white px-6 py-3 dark:border-gray-800 dark:bg-black">
      <h2 className="text-xl font-semibold">Beranda</h2>
    </div>
  )
}

function Guides() {
  const [isClose, setIsClose] = React.useState(false)

  if (isClose) return <></>
  return (
    <div className="relative mx-3 my-3 flex flex-col items-center justify-center gap-6 rounded-md border border-gray-100 dark:border-gray-800 md:gap-8">
      <div className="grid grid-cols-2 gap-6 px-3 py-4">
        <div className="col-span-1 flex flex-col">
          <h1 className="text-left text-xl font-semibold leading-10">
            Personal Financial
          </h1>
          <p className="px-0 text-left text-sm font-normal leading-snug text-gray-400 dark:text-gray-200">
            So I started to walk into the water. I won't lie to you boys, I was
            terrified.
          </p>
          <ButtonLink
            className="mt-4"
            size="sm"
            rounded="sm"
            type="button"
            to="/personal-finance/new"
          >
            <p className="text-sm">Get Started</p>
          </ButtonLink>
        </div>
        <div className="col-span-1 flex flex-col">
          <h1 className="text-left text-xl font-semibold leading-10">
            Read Guides
          </h1>
          <p className="px-0 text-left text-sm font-normal leading-snug text-gray-400 dark:text-gray-200">
            So I started to walk into the water. I won't lie to you boys, I was
            terrified. But I pressed on.
          </p>
          <ButtonLink
            type="button"
            size="sm"
            rounded="sm"
            to="/personal-finance/new"
            className="mt-4 flex items-center gap-x-2"
          >
            <BookOpenCheck size={16} />
            <p className="text-sm">Guides</p>
          </ButtonLink>
        </div>
      </div>
      <div className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-200 hover:dark:bg-gray-800">
        <UIButton
          onClick={() => setIsClose(true)}
          type="button"
          size="sm"
          variant="subtle"
        >
          <X size={16} />
        </UIButton>
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
      className={({selected}) =>
        clsx(
          'relative my-1 rounded-md border-b-0 border-b-transparent px-2 py-1 font-semibold focus:outline-none',
          {
            'text-black dark:text-white': selected,
            'text-gray-400 dark:text-gray-200': !selected,
          },
          className,
        )
      }
      {...props}
    >
      {({selected}) => (
        <>
          {children}
          <div
            className={clsx(
              'absolute -bottom-1 left-0 h-[3.5px] w-full rounded-lg',
              {
                'bg-black dark:bg-white': selected,
                'bg-transparent': !selected,
              },
            )}
          ></div>
        </>
      )}
    </Tab>
  )
}
