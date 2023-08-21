import type { Post } from '@prisma/client'
import { Link, useLoaderData } from '@remix-run/react'
import { Filter, Plus, PlusCircle } from 'lucide-react'
import React from 'react'
import { ButtonLink } from '~/components/button'
import type { LoaderData } from '.'
import { format } from 'date-fns'

export default function Board() {
  const { posts } = useLoaderData<LoaderData>()
  const isPostsExist = Boolean(posts?.length)

  return (
    <>
      <div className="mb-6 flex flex-col">
        <Tools />
      </div>
      {isPostsExist ? (
        <div className="grid grid-cols-3 gap-4">
          {posts?.map(post => (
            <UpdatePage key={post.id} {...JSON.parse(JSON.stringify(post))} />
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

  if (!isPostsExist) return <></>
  return (
    <div className="relative mx-auto flex w-full max-w-3xl justify-between">
      <ButtonLink
        size="md"
        rounded="md"
        type="button"
        to="/personal-finance/new"
        className="flex items-center gap-x-2"
      >
        <PlusCircle size={16} strokeWidth={2.5} />
        <p className="text-sm">New Plan</p>
      </ButtonLink>
      <div className="">
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
    </div>
  )
}

function NoData() {
  return (
    <div className="mx-auto grid max-w-3xl gap-y-4 rounded-lg py-16 text-center">
      <div className="mx-auto w-fit pb-2">
        <img src="/vectors/checklist.png" alt="" className="w-h-20 h-20" />
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

function UpdatePage({ id, title, updatedAt }: Post) {
  return (
    <Link to={`/personal-finance/${id}`}>
      <div className="col-span-1 cursor-pointer flex flex-col gap-1">
        <div className='h-36 px-5 py-4 flex flex-col gap-4 justify-center border border-gray-100 dark:border-gray-800 rounded-md hover:border-green-900 bg-[#FFF9F0]'>
          <div className='bg-green-900 text-white px-1.5 rounded-sm w-fit'>
            <p className='text-[10px] leading-4'>Completed</p>
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
  )
}