import { Tab } from '@headlessui/react'
import type { Post } from '@prisma/client'
import TextareaAutosize from 'react-textarea-autosize'
import type { LoaderFunction } from '@remix-run/node'
import clsx from 'clsx'
import { BookOpenCheck, Layout, PieChart } from 'lucide-react'
import React from 'react'
import { Button, ButtonLink } from '~/components/button'
import { db } from '~/utils/db.server'
import { getUser } from '~/utils/session.server'
import Analytics from './analytics'
import Board from './board'
import { OutletCenter, OutletRight, WrapperOutlet } from '../_layout'
import { Form } from '@remix-run/react'

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
  const [selectedIndex, setSelectedIndex] = React.useState(0)

  return (
    <WrapperOutlet>
      <OutletCenter>
        <Section />
        {/* <NewPost /> */}
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
        <Guides />
      </OutletRight>
    </WrapperOutlet>
  )
}

function Section() {
  return (
    <div className="sticky top-0 z-[99] w-full border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-black px-6 py-4">
      <h2 className="text-xl font-semibold text-center">Beranda</h2>
    </div>
  )
}

function NewPost() {
  const titletRef = React.useRef<HTMLTextAreaElement>(null)
  return (
    <div className="mx-auto my-0 w-full justify-between gap-x-8 px-6 py-6 border-b border-gray-100 dark:border-gray-800">
      <div className="relative h-auto w-full">
        <Form method="POST" className="w-full" action=".">
          <div className="px-6 md:px-0">
            <TextareaAutosize
              ref={titletRef}
              id="title-field"
              name="title"
              placeholder="Untitled"
              className="w-full resize-none appearance-none overflow-hidden bg-transparent text-3xl font-bold leading-tight focus:outline-none lg:text-5xl"
            />
          </div>
          <Button variant='primary' className='w-full'>Posting</Button>
        </Form>
      </div>
    </div>
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
            to="/personal-finance/new"
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
      className={({ selected }) =>
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
      {({ selected }) => (
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
