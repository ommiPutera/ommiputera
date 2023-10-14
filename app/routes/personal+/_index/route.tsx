import { Menu, Tab } from '@headlessui/react'
import type { Post } from '@prisma/client'
import type { ActionFunction, LoaderFunction } from '@remix-run/node'
import { Link, useLoaderData, useLocation } from '@remix-run/react'
import clsx from 'clsx'
import { MoveRight, Star } from 'lucide-react'
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
import { favoritePost } from '~/utils/post.session'
import { getUser } from '~/utils/session.server'
import { OutletCenter, OutletRight, WrapperOutlet } from '../_layout'
import Analytics from './analytics'
import Board, { FavoritePage } from './board'
import { DarkModeToggle } from '~/components/navbar'
import { BurgerMenu } from '~/utils/icons'
import { AnimatePresence, useReducedMotion, motion } from 'framer-motion'

export type LoaderData = {
  posts: Post[] | null
  recentPosts: Post[] | null
  favoritePosts: Post[] | null
}

export enum FormType {
  FAVORITE = 'FAVORITE',
}

const MOBILE_LINKS = [{ name: 'Beranda', to: '/personal', asParent: false }]

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

  const recentPosts = await db.post.findMany({
    where: { authorId: user?.id },
    orderBy: { updatedAt: 'desc' },
    take: 3,
  })

  const favoritePosts = await db.post.findMany({
    where: { authorId: user?.id, isFavorite: true },
    orderBy: { updatedAt: 'desc' },
  })

  const data: LoaderData = {
    posts,
    recentPosts,
    favoritePosts,
  }
  return data
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const { _action, postId, isFavorite } = Object.fromEntries(formData)

  switch (_action) {
    case FormType.FAVORITE: {
      if (typeof postId !== 'string') {
        return { formError: `Form not submitted correctly.` }
      }
      return await favoritePost({ id: postId, bool: !Number(isFavorite) })
    }
    default: {
      return { formError: `Action type invalid` }
    }
  }
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
      <div className="glass sticky top-0 z-[10] mb-4 w-full border-b border-gray-100 bg-white/[0.65] p-0 pt-6 backdrop-blur-lg dark:border-gray-800 dark:bg-black/[0.65] dark:backdrop-blur-lg lg:pt-4">
        <div className="mb-6 mt-2 flex items-center justify-between px-6">
          <h2 className="mt-1 text-left text-xl font-semibold">Beranda</h2>
          <div className='md:hidden'>
            <MobileNav />
          </div>
        </div>
        <Tab.List className="z-0 mx-auto flex overflow-x-scroll lg:col-span-3 lg:overflow-x-hidden">
          <TabItem title="Board" index={0} selectedIndex={selectedIndex} />
          <TabItem title="Analytics" index={1} selectedIndex={selectedIndex} />
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
  const { recentPosts, favoritePosts } = useLoaderData<LoaderData>()
  return (
    <Accordion
      type="multiple"
      defaultValue={['item-1', 'item-2']}
      className="sticky top-24 mb-28 h-fit w-full"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger>Favorite pages</AccordionTrigger>
        <AccordionContent className="-mt-2 flex flex-col">
          {favoritePosts?.length ? (
            favoritePosts?.map(post => (
              <div key={post.id} className="relative">
                <Link to={`/personal/${post.id}`} prefetch="intent">
                  <div className="flex w-full items-center gap-3 rounded-md px-6 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-800">
                    <p className="text-sm">{post.title}</p>
                  </div>
                </Link>
                <FavoritePage {...JSON.parse(JSON.stringify(post))}>
                  <button
                    className="absolute bottom-0 right-4 top-0"
                    type="submit"
                  >
                    <Star
                      size={13}
                      strokeWidth={2.5}
                      color="orange"
                      fill="orange"
                    />
                  </button>
                </FavoritePage>
              </div>
            ))
          ) : (
            <p className="px-0 text-left text-sm font-normal text-gray-400 dark:text-gray-200">
              Arahkan kursor ke file manapun dan klik simbol bintang untuk
              menambahkannya di sini
            </p>
          )}
        </AccordionContent>
      </AccordionItem>
      <SectionSpacer size="sm" />
      <AccordionItem value="item-2">
        <AccordionTrigger>Baru baru ini</AccordionTrigger>
        <AccordionContent className="-mt-2 flex flex-col">
          {recentPosts?.map(post => (
            <Link to={`/personal/${post.id}`} key={post.id}>
              <div className="flex w-full items-center gap-3 rounded-md px-6 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-800">
                <p className="text-sm">{post.title}</p>
              </div>
            </Link>
          ))}
        </AccordionContent>
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
            to="/personal/new"
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
  selectedIndex,
}: {
  title: string
  index: number
  selectedIndex: number
}) {
  return (
    <TabComponent index={index}>
      <div className="relative flex w-auto items-center">
        <h2 className="mb-0.5 text-md">{title}</h2>
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
          'relative flex w-full justify-center border-b-0 border-b-transparent py-3 font-medium hover:bg-gray-100/30 focus:outline-none dark:hover:bg-gray-800/40',
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

function MobileNav() {
  const [isOpen, setIsOpen] = React.useState(false)
  return (
    <div className="flex items-center justify-end lg:hidden">
      <div className="flex items-center gap-3">
        <div className="text-primary inline-flex items-center justify-center rounded-full transition focus:outline-none">
          <DarkModeToggle />
        </div>
        <Menu>
          <Menu.Button className="focus:border-primary hover:border-primary border-secondary text-primary inline-flex h-12 w-12 items-center justify-center rounded-full border-2 p-1 transition focus:outline-none">
            {({ open }) => {
              const state = open ? 'open' : 'closed'
              setIsOpen(open)
              return <BurgerMenu state={state} />
            }}
          </Menu.Button>
          <MobileMenuList isOpen={isOpen} />
        </Menu>
      </div>
    </div>
  )
}

function MobileMenuList({ isOpen }: { isOpen: boolean }) {
  const shouldReduceMotion = useReducedMotion()
  React.useEffect(() => {
    if (isOpen) {
      document.body.classList.add('fixed')
      document.body.classList.add('overflow-y-scroll')
      document.body.style.height = '100vh'
      document.body.style.width = '100vw'
    } else {
      document.body.classList.remove('fixed')
      document.body.classList.remove('overflow-y-scroll')
      document.body.style.removeProperty('height')
      document.body.style.removeProperty('width')
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      <Menu.Items
        className="absolute left-0 right-0 z-[9999] mt-8 w-full origin-top-right rounded-md bg-white shadow-lg focus:outline-none"
        as="div"
      >
        {({ open }) => {
          const state = open ? 'open' : 'closed'
          if (state === 'closed') return <></>
          return (
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{
                opacity: { duration: shouldReduceMotion ? 0 : 0.2 },
                rotate: { duration: shouldReduceMotion ? 0 : 0.5 },
                scale: { duration: shouldReduceMotion ? 0 : 0.5 },
                ease: 'linear',
              }}
              className="fixed mt-12 flex h-screen w-full flex-col overflow-y-scroll bg-white pb-12 dark:border-gray-100 dark:bg-gray-900"
            >
              <div className="border-none bg-transparent">
                {MOBILE_LINKS.map(link => (
                  <MobileNavLink
                    key={link.to}
                    to={link.to}
                    asParent={link.asParent}
                  >
                    {link.name}
                  </MobileNavLink>
                ))}
              </div>
            </motion.div>
          )
        }}
      </Menu.Items>
    </AnimatePresence>
  )
}

function MobileNavLink({
  to,
  asParent,
  children,
}: Omit<Parameters<typeof Link>['0'], 'to'> & {
  to?: string
  asParent: boolean
}) {
  const location = useLocation()
  const isSelected = Boolean(
    to === location.pathname || location.pathname.startsWith(`${to}/`),
  )

  if (to && !asParent) {
    return (
      <Menu.Item as={Link} to={to}>
        <div className="m-0 flex items-center justify-between border-t border-gray-200 px-5vw py-10 text-md dark:border-gray-600">
          {children}
          {isSelected && <div className="h-2 w-2 rounded-full bg-white"></div>}
        </div>
      </Menu.Item>
    )
  }
  return <></>
}