import {Tab} from '@headlessui/react'
import type {Post} from '@prisma/client'
import type {LoaderFunction} from '@remix-run/node'
import clsx from 'clsx'
import {BookOpenCheck, Layout, PieChart} from 'lucide-react'
import React from 'react'
import {ButtonLink} from '~/components/button'
import {db} from '~/utils/db.server'
import {getUser} from '~/utils/session.server'
import Analytics from './analytics'
import Board from './board'
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
        <Tab.Group
          as="div"
          selectedIndex={selectedIndex}
          onChange={setSelectedIndex}
          className="w-full grid-cols-12 gap-x-8 overflow-visible"
        >
          <div className="sticky top-0 z-[99] w-full bg-white/[0.65] px-3 py-4 backdrop-blur-md dark:bg-black/[0.65] lg:px-6">
            <h2 className="mb-6 mt-2 text-left text-xl font-semibold">
              Beranda
            </h2>
            <Tab.List className="z-0 mx-auto flex overflow-x-scroll border-b border-gray-100 dark:border-gray-800 lg:col-span-3 lg:overflow-x-hidden">
              <TabComponent index={0}>
                <div className="relative flex w-auto items-center gap-2">
                  <Layout size={18} strokeWidth={2.5} />
                  <h2 className="text-md">Board</h2>
                  <div
                    className={clsx(
                      'absolute -bottom-3 left-0 h-[3.5px] w-full rounded-lg',
                      {
                        'bg-black dark:bg-white': selectedIndex === 0,
                      },
                    )}
                  ></div>
                </div>
              </TabComponent>
              <TabComponent index={1}>
                <div className="relative flex w-auto items-center gap-2">
                  <PieChart size={18} strokeWidth={2.5} />
                  <h2 className="text-md">Analytics</h2>
                  <div
                    className={clsx(
                      'absolute -bottom-3 left-0 h-[3.5px] w-full rounded-lg',
                      {
                        'bg-black dark:bg-white': selectedIndex === 1,
                      },
                    )}
                  ></div>
                </div>
              </TabComponent>
            </Tab.List>
          </div>
          <Tab.Panels className="px-3 py-2">
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
        <Guides />
        <BrowseTemplate />
      </OutletRight>
    </WrapperOutlet>
  )
}

function Guides() {
  return (
    <div className="relative flex flex-col items-center justify-center rounded-md border border-gray-100 dark:border-gray-800">
      <div className="flex flex-col gap-6 p-6">
        <div className="flex flex-col">
          <h1 className="text-left text-base font-semibold leading-10">
            Personal Financial
          </h1>
          <p className="px-0 text-left text-xs font-normal text-gray-400 dark:text-gray-200">
            So I started to walk into the water. I won't lie to you boys, I was
            terrified.
          </p>
          <ButtonLink
            className="mt-4 py-1.5"
            size="sm"
            rounded="sm"
            type="button"
            to="/personal-finance/new"
          >
            <p className="text-sm">Get Started</p>
          </ButtonLink>
        </div>
        <div className="flex flex-col">
          <h1 className="text-left text-base font-semibold leading-10">
            Read Guides
          </h1>
          <p className="px-0 text-left text-xs font-normal text-gray-400 dark:text-gray-200">
            So I started to walk into the water. I won't lie to you boys, I was
            terrified. But I pressed on.
          </p>
          <ButtonLink
            type="button"
            size="sm"
            rounded="sm"
            to="/personal-finance/guides"
            className="mt-4 flex items-center gap-x-2 py-1.5"
          >
            <BookOpenCheck size={16} />
            <p className="text-sm">Guides</p>
          </ButtonLink>
        </div>
      </div>
    </div>
  )
}

function BrowseTemplate() {
  return (
    <div className="relative flex flex-col items-center justify-center rounded-md border border-gray-100 dark:border-gray-800">
      <div className="flex flex-col gap-6 p-6">
        <div className="flex flex-col">
          <h1 className="text-left text-base font-semibold leading-10">
            Browse Template
          </h1>
          <p className="px-0 text-left text-xs font-normal text-gray-400 dark:text-gray-200">
            So I started to walk into the water. I won't lie to you boys, I was
            terrified.
          </p>
          <ButtonLink
            className="mt-4 py-1.5"
            size="sm"
            rounded="sm"
            type="button"
            to="/personal-finance/new"
          >
            <p className="text-sm">Get Started</p>
          </ButtonLink>
        </div>
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
          'relative flex w-full justify-center rounded-t-lg border-b-0 border-b-transparent py-3 font-semibold focus:outline-none',
          {
            'text-black dark:text-white': selected,
            'text-gray-300 dark:text-gray-400': !selected,
          },
          className,
        )
      }
      {...props}
    >
      {children}
    </Tab>
  )
}
