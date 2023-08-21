import type {Post} from '@prisma/client'
import {Link, useLoaderData} from '@remix-run/react'
import {Filter, Plus, Star} from 'lucide-react'
import React from 'react'
import {ButtonLink} from '~/components/button'
import type {LoaderData} from '.'
import {format} from 'date-fns'
import clsx from 'clsx'

export default function Board() {
  const {posts} = useLoaderData<LoaderData>()
  const isPostsExist = Boolean(posts?.length)

  return (
    <div className="relative flex flex-col gap-6">
      <div className="flex flex-col px-6">
        <Tools />
      </div>
      <Bubble />
      <div className="px-6">
        {isPostsExist ? (
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 xl:grid-cols-3">
            {posts?.map(post => (
              <UpdatePage key={post.id} {...JSON.parse(JSON.stringify(post))} />
            ))}
          </div>
        ) : (
          <NoData />
        )}
      </div>
    </div>
  )
}

function Tools() {
  const {posts} = useLoaderData<LoaderData>()
  const isPostsExist = Boolean(posts?.length)

  if (!isPostsExist) return <></>
  return (
    <div className="relative mx-auto flex w-full justify-between">
      <ButtonLink
        size="md"
        rounded="md"
        type="button"
        to="/personal-finance/new"
        className="flex items-center gap-x-2"
      >
        <Plus size={18} strokeWidth={2.5} />
        <p className="text-sm">New Plan</p>
      </ButtonLink>
      <ButtonLink
        type="button"
        size="sm"
        variant="subtle"
        to="/personal-finance/new"
        className="flex items-center gap-x-2 rounded-lg px-3 text-blue-500"
      >
        <Filter size={16} />
        <p>Filter</p>
      </ButtonLink>
    </div>
  )
}

function Bubble() {
  const [scrollPosition, setScrollPosition] = React.useState(0)
  const handleScroll = () => {
    const position = window.pageYOffset
    setScrollPosition(position)
  }

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll, {passive: true})

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  if (scrollPosition < 120) return <></>
  return (
    <div className="z-[999] flex justify-center">
      <div className="fixed top-40 w-fit rounded-full border-2 border-white bg-green-900 px-2 py-1 shadow-2xl">
        <ButtonLink
          type="button"
          size="sm"
          variant="subtle"
          to="/personal-finance/new"
          className="flex items-center gap-x-2 text-white"
        >
          <Plus size={18} strokeWidth={2.5} />
          <p>New Plan</p>
        </ButtonLink>
      </div>
    </div>
  )
}

function NoData() {
  return (
    <div className="mx-auto grid max-w-3xl gap-y-4 rounded-lg py-16 text-center">
      <div className="mx-auto mb-24 w-fit">
        <img src="/vectors/checklist.png" alt="" className="h-28 w-28" />
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
          to="/personal-finance/new"
          className="flex items-center gap-x-2"
        >
          <Plus size={16} />
          <p>New Plan</p>
        </ButtonLink>
      </div>
    </div>
  )
}

function UpdatePage({id, title, updatedAt}: Post) {
  const [isHover, setIsHover] = React.useState(false)
  const [isFav, setIsFav] = React.useState(false)
  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <Link to={`/personal-finance/${id}`}>
        <div className="col-span-1 flex cursor-pointer flex-col gap-1">
          <div
            className={clsx(
              'flex h-36 flex-col justify-center gap-4 rounded-md border border-gray-100 bg-[#FFF9F0] px-5 py-4 dark:border-gray-800',
              {'border-green-900': isHover},
            )}
          >
            <div className="w-fit rounded-sm bg-green-900 px-1.5 text-white">
              <p className="text-[10px] leading-4">Completed</p>
            </div>
            <h4 className="whitespace-normal text-xl font-bold leading-5 text-gray-500">
              {title.length >= 35 ? title.slice(0, 35) + '..' : title}
            </h4>
          </div>
          <div className="flex flex-col">
            <h4 className="whitespace-normal text-sm font-normal leading-4">
              {title.length >= 35 ? title.slice(0, 35) + '..' : title}
            </h4>
            <p className="text-sm font-normal text-gray-400 dark:text-gray-200">
              {format(new Date(updatedAt), 'dd/MM/yy')}
            </p>
          </div>
        </div>
      </Link>
      {isHover && (
        <button
          className="absolute right-2 top-2 rounded-sm bg-black p-1"
          onClick={() => setIsFav(!isFav)}
        >
          <Star
            size={12}
            strokeWidth={1.5}
            color={isFav ? 'orange' : ' white'}
            fill={isFav ? 'orange' : 'black'}
          />
        </button>
      )}
    </div>
  )
}
