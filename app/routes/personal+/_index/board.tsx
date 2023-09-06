import type { Post } from '@prisma/client'
import { Form, Link, useLoaderData, useSearchParams } from '@remix-run/react'
import clsx from 'clsx'
import { id as idLocale } from 'date-fns/locale'
import { format, formatDistance } from 'date-fns'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, Plus, Star, ArrowDownUp, X, Lock, FilterIcon, LayoutGrid, LayoutList } from 'lucide-react'
import React from 'react'
import { Button, ButtonLink } from '~/components/button'
import useScrollPosition from '~/lib/hooks/use-scroll-position'
import { FormType, type LoaderData } from '.'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/shadcn/dropdown-menu'
import { Badge } from '~/components/shadcn/badge'
import useGrid, { layoutEnums } from '~/lib/hooks/use-grid'

export default function Board() {
  return (
    <div className="relative mt-4 flex flex-col">
      <div className="mb-6 flex flex-col px-6">
        <Tools />
      </div>
      <div className="flex flex-col px-6">
        <ActiveSort />
      </div>
      <div className="z-[5] flex justify-center">
        <Bubble />
      </div>
      <div className="mt-6 px-6">
        <Cards />
      </div>
    </div>
  )
}

function Cards() {
  const { posts } = useLoaderData<LoaderData>()
  const isPostsExist = Boolean(posts?.length)
  const { layout } = useGrid()

  return (
    <>
      {isPostsExist ? (
        <div className={clsx("", {
          "grid grid-cols-2 gap-x-2.5 gap-y-5 lg:grid-cols-4 xl:grid-cols-3": layout === layoutEnums.GRID,
          "flex flex-col gap-5": layout === layoutEnums.NO_GRID,
        })}
        >
          {posts?.map(post => (
            <Card key={post.id} {...JSON.parse(JSON.stringify(post))} />
          ))}
        </div>
      ) : (
        <NoData />
      )}
    </>
  )
}

function Tools() {
  const { posts } = useLoaderData<LoaderData>()
  const isPostsExist = Boolean(posts?.length)
  const { layout, setLayout } = useGrid()

  if (!isPostsExist) return <></>
  return (
    <div className="relative mx-auto flex w-full justify-between">
      <div className="flex">
        <Button
          variant="subtle"
          className={clsx("py-2", {
            "text-white": layout === layoutEnums.GRID,
            "text-gray-400": layout !== layoutEnums.GRID
          })}
          onClick={() => setLayout(layoutEnums.GRID)}
        >
          <LayoutGrid size={20} strokeWidth={2.5} />
        </Button>
        <Button variant="subtle"
          className={clsx("py-2", {
            "text-white": layout === layoutEnums.NO_GRID,
            "text-gray-400": layout !== layoutEnums.NO_GRID
          })}
          onClick={() => setLayout(layoutEnums.NO_GRID)}
        >
          <LayoutList size={20} strokeWidth={2.5} />
        </Button>
      </div>
      <div className="flex justify-end gap-6">
        <div className="flex items-center gap-4">
          <Filter />
        </div>
        <div className="flex items-center gap-4">
          <Sort />
        </div>
        <ButtonLink
          size="md"
          rounded="md"
          type="button"
          to="/personal/new"
          className="flex items-center gap-1 w-full"
        >
          <Plus size={16} strokeWidth={2.5} />
          <p className="text-sm">Baru</p>
        </ButtonLink>
      </div>
    </div>
  )
}

function Sort() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        <div className="ml-1 flex w-full max-w-[200px] items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <ArrowDownUp size={16} strokeWidth={2.5} />
            <p className="text-md font-normal">Sortir</p>
          </div>
        </div>
      </DropdownMenuTrigger>
      <SortMenus />
    </DropdownMenu>
  )
}

function Filter() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        <div className="ml-1 flex w-full max-w-[200px] items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <FilterIcon size={16} strokeWidth={2.5} />
            <p className="text-md font-normal">Filter</p>
          </div>
        </div>
      </DropdownMenuTrigger>
      <FilterMenus />
    </DropdownMenu>
  )
}

function FilterMenus() {
  const [searchParams, setSearchParams] = useSearchParams()
  const order = searchParams.get('order')
  const orderField = searchParams.get('orderField')

  const handleRemove = () => {
    if (order) searchParams.delete('order')
    if (orderField) searchParams.delete('orderField')
    setSearchParams(searchParams)
  }

  return (
    <DropdownMenuContent className="p-0">
      <DropdownMenuLabel className="flex items-center justify-between px-3 pb-1 pt-2">
        <p className="text-sm text-gray-400 dark:text-gray-200">
          Filter berdasarkan
        </p>
        <button
          onClick={handleRemove}
          className="visually-hidden text-red-900"
          aria-hidden={!order}
        >
          Reset
        </button>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup className="p-0">
        <FilterItem
          title="Waktu Dibuat: Terbaru"
          orderBy="desc"
          orderField="createdAt"
        />
        <FilterItem
          title="Waktu Dibuat: Terlama"
          orderBy="asc"
          orderField="createdAt"
        />
        <FilterItem title="Judul: A-Z" orderBy="asc" orderField="title" />
        <FilterItem title="Judul: Z-A" orderBy="desc" orderField="title" />
      </DropdownMenuGroup>
    </DropdownMenuContent>
  )
}

function FilterItem({
  title,
  orderBy,
  orderField,
}: {
  title: string
  orderBy: 'asc' | 'desc'
  orderField: 'createdAt' | 'title'
}) {
  const [searchParams, setSearchParams] = useSearchParams()
  const orderItem = searchParams.get('orderField')
  const order = searchParams.get('order')
  const isSelected = order === orderBy && orderItem === orderField

  const handleParams = () => {
    if (isSelected) setSearchParams({})
    else
      setSearchParams({
        order: orderBy,
        orderField: orderField,
      })
  }

  return (
    <DropdownMenuItem
      onClick={handleParams}
      className={clsx(
        'flex w-full min-w-[240px] items-center justify-between gap-12 rounded-none border-transparent px-3 hover:bg-gray-100 hover:dark:bg-gray-800',
        {
          'bg-green-900 text-white hover:bg-green-900/90 dark:hover:bg-green-900/40':
            isSelected,
        },
      )}
    >
      {title}
      <Check
        className="visually-hidden"
        aria-hidden={!isSelected}
        size={16}
        strokeWidth={2.5}
      />
    </DropdownMenuItem>
  )
}

function ActiveSort() {
  const [searchParams, setSearchParams] = useSearchParams()
  const order = searchParams.get('order')
  const orderField = searchParams.get('orderField')

  const generatedOrderField = () => {
    switch (orderField) {
      case 'createdAt':
        return `Waktu dibuat: ${order === 'desc' ? 'Terbaru' : 'Terlama'}`
      case 'title':
        return `Judul: ${order === 'desc' ? 'Z-A' : 'A-Z'}`
      default:
        break
    }
  }

  const handleRemove = () => {
    if (order) searchParams.delete('order')
    if (orderField) searchParams.delete('orderField')
    setSearchParams(searchParams)
  }

  if (!order) return <></>
  return (
    <Badge
      variant="success"
      size="default"
      className="flex w-fit items-center gap-2"
    >
      {generatedOrderField()}
      <button
        onClick={handleRemove}
        className="visually-hidden text-sm text-black dark:text-white"
        aria-hidden={!order}
      >
        <X size={14} />
      </button>
    </Badge>
  )
}

function SortMenus() {
  const [searchParams, setSearchParams] = useSearchParams()
  const order = searchParams.get('order')
  const orderField = searchParams.get('orderField')

  const handleRemove = () => {
    if (order) searchParams.delete('order')
    if (orderField) searchParams.delete('orderField')
    setSearchParams(searchParams)
  }

  return (
    <DropdownMenuContent className="p-0">
      <DropdownMenuLabel className="flex items-center justify-between  px-3 pb-1 pt-2">
        <p className="text-sm text-gray-400 dark:text-gray-200">
          Urutkan berdasarkan
        </p>
        <button
          onClick={handleRemove}
          className="visually-hidden text-red-900"
          aria-hidden={!order}
        >
          Reset
        </button>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup className="p-0">
        <SortItem
          title="Waktu Dibuat: Terbaru"
          orderBy="desc"
          orderField="createdAt"
        />
        <SortItem
          title="Waktu Dibuat: Terlama"
          orderBy="asc"
          orderField="createdAt"
        />
        <SortItem title="Judul: A-Z" orderBy="asc" orderField="title" />
        <SortItem title="Judul: Z-A" orderBy="desc" orderField="title" />
      </DropdownMenuGroup>
    </DropdownMenuContent>
  )
}

function SortItem({
  title,
  orderBy,
  orderField,
}: {
  title: string
  orderBy: 'asc' | 'desc'
  orderField: 'createdAt' | 'title'
}) {
  const [searchParams, setSearchParams] = useSearchParams()
  const orderItem = searchParams.get('orderField')
  const order = searchParams.get('order')
  const isSelected = order === orderBy && orderItem === orderField

  const handleParams = () => {
    if (isSelected) setSearchParams({})
    else
      setSearchParams({
        order: orderBy,
        orderField: orderField,
      })
  }

  return (
    <DropdownMenuItem
      onClick={handleParams}
      className={clsx(
        'flex w-full min-w-[240px] items-center justify-between gap-12 rounded-none border-transparent px-3 hover:bg-gray-100 hover:dark:bg-gray-800',
        {
          'bg-green-900 text-white hover:bg-green-900/90 dark:hover:bg-green-900/40':
            isSelected,
        },
      )}
    >
      {title}
      <Check
        className="visually-hidden"
        aria-hidden={!isSelected}
        size={16}
        strokeWidth={2.5}
      />
    </DropdownMenuItem>
  )
}

function Bubble() {
  const scrollPosition = useScrollPosition()
  return (
    <AnimatePresence>
      {scrollPosition > 70 && (
        <motion.div
          initial={{ y: -160, opacity: 0 }}
          animate={{ y: 0, opacity: 1, transition: { duration: 0.6 } }}
          exit={{ y: -160, opacity: 0, transition: { duration: 0.6 } }}
          transition={{
            delay: 0.3,
            ease: 'linear',
          }}
          className="fixed top-36 w-fit rounded-full bg-green-900 px-2 py-1 shadow-2xl"
        >
          <ButtonLink
            type="button"
            size="sm"
            variant="subtle"
            to="/personal/new"
            className="flex items-center gap-x-2 text-white"
          >
            <Plus size={18} strokeWidth={2.5} />
            <p>Baru</p>
          </ButtonLink>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function NoData() {
  return (
    <div className="mx-auto grid max-w-3xl gap-y-4 rounded-lg py-16 text-center">
      <div className="mx-auto mb-16 w-fit">
        <img src="/vectors/checklist.png" alt="" className="h-24 w-24" />
      </div>
      <div>
        <h5 className="text-xl font-semibold">No expense data created</h5>
        <p className="text-center text-md font-normal leading-normal text-gray-400 dark:text-gray-200">
          You don't have any records yet, start creating your record..
        </p>
      </div>
      <div className="mx-auto">
        <ButtonLink
          type="button"
          size="sm"
          variant="subtle"
          to="/personal/new"
          className="flex items-center gap-x-2"
        >
          <Plus size={16} />
          <p>Baru</p>
        </ButtonLink>
      </div>
    </div>
  )
}

function Card(data: Post) {
  const { id, title, createdAt, updatedAt, isFavorite } = data
  const [isHover, setIsHover] = React.useState(false)
  const [isFav, setIsFav] = React.useState(isFavorite)

  React.useEffect(() => {
    setIsFav(isFavorite)
  }, [isFavorite])

  const locale = {
    ...idLocale,
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <Link to={`/personal/${id}`}>
        <div className="col-span-1 flex cursor-default flex-col gap-2 overflow-hidden">
          <div
            className={clsx(
              'flex h-[150px] flex-col justify-center gap-3 rounded-md border border-gray-100 bg-[#FFF9F0] px-5 dark:border-gray-800',
              { 'border-green-900': isHover },
            )}
          >
            <CardBadge title="Completed" variant="green" />
            <div>
              <h4 className="whitespace-normal text-lg font-semibold leading-4 text-gray-500">
                {modifyTitle(title)}
              </h4>
              <p className="mt-1 text-xs font-normal text-gray-400 dark:text-gray-300">
                {format(new Date(createdAt), 'dd/MM/yyyy')}
              </p>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              <CardBadge title="Month" variant="violet" />
              <CardBadge title="Debt" variant="orange" />
            </div>
          </div>
          <div className="flex flex-col">
            <h4 className="whitespace-normal text-sm font-normal">
              {modifyTitle(title)}
            </h4>
            <p className="mt-0.5 text-[11px] font-normal text-gray-200 dark:text-gray-400">
              Diedit{' '}
              {formatDistance(new Date(updatedAt), new Date(), {
                addSuffix: true,
                includeSeconds: true,
                locale: locale,
              })}
            </p>
          </div>
        </div>
      </Link>
      {isHover && (
        <div className="absolute right-2 top-2 flex gap-1 rounded-sm p-1">
          <FavoritePage {...data}>
            <button
              className="rounded-sm bg-black p-1"
              onClick={() => setIsFav(!isFav)}
              type="submit"
            >
              <Star
                size={12}
                strokeWidth={1.5}
                color={isFav ? 'orange' : ' white'}
                fill={isFav ? 'orange' : 'black'}
              />
            </button>
          </FavoritePage>
          <div className="w-full">
            <button className="rounded-sm bg-black p-1">
              <Lock size={12} strokeWidth={1.5} color="white" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function CardBadge({
  title,
  variant,
}: {
  title: string
  variant: 'green' | 'violet' | 'orange'
}) {
  return (
    <div
      className={clsx('w-fit rounded-sm px-1.5', {
        'bg-green-900 text-white': variant === 'green',
        'bg-violet-100 text-violet-700 dark:bg-violet-900 dark:text-white':
          variant === 'violet',
        'bg-orange-900/50 text-orange-500 dark:bg-orange-400 dark:text-white':
          variant === 'orange',
      })}
    >
      <p className="pt-[0.3px] text-[10px] leading-[14px]">{title}</p>
    </div>
  )
}

export function FavoritePage({
  id,
  isFavorite,
  children,
}: Post & { children: JSX.Element | React.ReactNode }) {
  return (
    <Form method="POST" className="w-full">
      {children}
      <input type="hidden" name="postId" value={id} />
      <input type="hidden" name="isFavorite" value={isFavorite ? 1 : 0} />
      <input type="hidden" name="_action" value={FormType.FAVORITE} />
    </Form>
  )
}

const modifyTitle = (title: string) => {
  return title.length >= 28
    ? title.slice(0, 28) + '..'
    : !title.length
      ? 'Untitled - draf'
      : title
}
