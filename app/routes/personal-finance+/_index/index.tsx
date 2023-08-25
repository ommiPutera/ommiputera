import { Tab } from '@headlessui/react'
import type { Post } from '@prisma/client'
import type { LoaderFunction } from '@remix-run/node'
import clsx from 'clsx'
// @ts-ignore
import { Home, MoveRight, icons } from 'lucide-react'
import React from 'react'
import { ButtonLink } from '~/components/button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/shadcn/accordion'
import { SectionSpacer } from '~/components/spacer'
import { getImgProps, images } from '~/images'
import { db } from '~/utils/db.server'
import { getUser } from '~/utils/session.server'
import { OutletCenter, OutletRight, WrapperOutlet } from '../_layout'
import Analytics from './analytics'
import Board from './board'

export type LoaderData = {
  posts: Post[] | null
}

type PostFields = 'updatedAt' | 'title'
type SortOrder = 'asc' | 'desc'
type OrderField = PostFields
const isSortOrder = (s: unknown): s is SortOrder => s === 'asc' || s === 'desc'
const isOrderField = (s: unknown): s is OrderField =>
  s === 'title' || s === 'createdAt'

export const loader: LoaderFunction = async ({ request }) => {
  const { searchParams } = new URL(request.url)
  const user = await getUser(request)

  let order = 'desc'
  let orderField = 'createdAt'
  const spOrder = searchParams.get('order')
  const spOrderField = searchParams.get('orderField')
  if (isSortOrder(spOrder)) order = spOrder
  if (isOrderField(spOrderField)) orderField = spOrderField

  const posts = await db.post.findMany({
    where: { authorId: user?.id },
    orderBy: { [orderField]: order },
  })

  const data: LoaderData = { posts }
  return data
}

export default function Index() {
  return (
    <WrapperOutlet>
      <OutletCenter>
        <Tabs />
      </OutletCenter>
      <OutletRight>
        <BrowseTemplate />
        <SectionSpacer size="xxs" />
        <Pages />
      </OutletRight>
    </WrapperOutlet>
  )
}

function Tabs() {
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  return (
    <Tab.Group
      as="div"
      selectedIndex={selectedIndex}
      onChange={setSelectedIndex}
      className="w-full grid-cols-12 gap-x-8 overflow-visible"
    >
      <div className="sticky top-0 z-[10] mb-4 w-full border-b border-gray-100 bg-white/[0.65] p-0 pt-6 backdrop-blur-lg dark:border-gray-800 dark:bg-black/[0.65] dark:backdrop-blur-lg lg:pt-4">
        <div className="mb-6 mt-2 flex items-center gap-2.5 px-6">
          <Home size={22} strokeWidth={3} />
          <h2 className="mt-1 text-left text-xl font-semibold">Beranda</h2>
        </div>
        <Tab.List className="z-0 mx-auto flex overflow-x-scroll lg:col-span-3 lg:overflow-x-hidden">
          <TabItem
            title="Board"
            index={0}
            selectedIndex={selectedIndex}
            iconName="Layout"
          />
          <TabItem
            title="Analytics"
            index={1}
            selectedIndex={selectedIndex}
            iconName="PieChart"
          />
        </Tab.List>
      </div>
      <Tab.Panels className="pb-[18rem] pt-2">
        <Tab.Panel>
          <Board />
        </Tab.Panel>
        <Tab.Panel>
          <Analytics />
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  )
}

function Pages() {
  return (
    <Accordion
      type="multiple"
      defaultValue={['item-1', 'item-2']}
      className="w-full"
    >
      <AccordionItem value="item-2">
        <AccordionTrigger>Recent pages</AccordionTrigger>
        <AccordionContent>Test</AccordionContent>
      </AccordionItem>
      <SectionSpacer size="sm" />
      <AccordionItem value="item-1">
        <AccordionTrigger>Favorite pages</AccordionTrigger>
        <AccordionContent>Test</AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

function BrowseTemplate() {
  return (
    <div className="flex flex-col gap-4">
      <div className="">
        <img
          id="templateCover"
          className="rounded-sm object-cover"
          {...getImgProps(images.templateCover, {
            widths: [840, 1100, 1300, 2600, 3984],
            sizes: ['(max-width:1620px) 1090px', '60vh'],
          })}
        />
      </div>
      <div className="flex flex-col">
        <h1 className="text-lg font-semibold leading-10">Browse Template</h1>
        <p className="px-0 text-left text-sm font-normal text-gray-400 dark:text-gray-200">
          A vertically stacked set of interactive headings that each reveal a
          section of content.
        </p>
        <div className="mt-4">
          <ButtonLink
            size="md"
            rounded="md"
            type="button"
            to="/personal-finance/new"
            className="gap-2"
          >
            <p className="text-sm">Explore</p>
            <MoveRight size={16} strokeWidth={2.5} />
          </ButtonLink>
        </div>
      </div>
    </div>
  )
}

function TabItem({
  title,
  index,
  iconName,
  selectedIndex,
}: {
  title: string
  index: number
  selectedIndex: number
  iconName: string
}) {
  const LucideIcon = icons[iconName]

  return (
    <TabComponent index={index}>
      <div className="relative flex w-auto items-center gap-1.5">
        <LucideIcon size={18} strokeWidth={2.5} />
        <h2 className="mt-0.5 text-md font-semibold">{title}</h2>
        <div
          className={clsx(
            'absolute -bottom-3 left-0 h-[4px] w-full rounded-lg',
            {
              'bg-green-900': selectedIndex === index,
            },
          )}
        ></div>
      </div>
    </TabComponent>
  )
}

function TabComponent({
  children,
  index,
  className,
  ...props
}: {
  children: JSX.Element | React.ReactNode
  index: number
  className?: string
}) {
  return (
    <Tab
      className={({ selected }) =>
        clsx(
          'relative flex w-full justify-center border-b-0 border-b-transparent py-3 font-semibold hover:bg-gray-100/30 focus:outline-none dark:hover:bg-gray-800/40',
          {
            'text-black dark:text-white': selected,
            'text-gray-300 dark:text-gray-300': !selected,
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
