import { Link, useLoaderData } from '@remix-run/react'
import { Filter, Plus } from 'lucide-react'
import type { Post } from '@prisma/client'
import { ButtonLink } from '~/components/button'
import React from 'react'
import type { LoaderFunction } from '@remix-run/node'
import { getUser } from '~/utils/session.server'
import { db } from '~/utils/db.server'

export type LoaderData = {
  posts: Post[] | null
}

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request)
  const posts = await db.post.findMany({ where: { authorId: user?.id } })
  const data: LoaderData = { posts }
  return data
}

export default function Board() {
  const { posts } = useLoaderData<LoaderData>()
  const isPostsExist = Boolean(posts?.length)
  return (
    <div className="flex flex-col">
      <Tools />
      <div className="relative grid grid-cols-1 md:grid-cols-4 lg:gap-x-4">
        {isPostsExist ? (
          posts?.map(post => (
            <div
              key={post.id}
              className="col-span-1 cursor-pointer rounded-lg bg-gray-100 dark:bg-gray-900 border border-white p-4 hover:border-gray-100 dark:border-gray-800"
            >
              <UpdatePage {...JSON.parse(JSON.stringify(post))} />
            </div>
          ))
        ) : (
          <div className="col-span-12">
            <NoData />
          </div>
        )}
      </div>
    </div>
  )
}

function Tools() {
  const { posts } = useLoaderData<LoaderData>()
  const isPostsExist = Boolean(posts?.length)

  if (!isPostsExist) return <></>
  return (
    <div className="relative mx-auto max-w-5xl mb-7 flex w-full justify-between">
      <div className="">
        <ButtonLink
          type="button"
          size="sm"
          variant="subtle"
          to="/cash-flow/new"
          className="flex items-center gap-x-2 border border-gray-100 px-3 rounded-lg bg-black dark:bg-white text-white dark:text-black dark:border-gray-800"
        >
          <Plus size={16} />
          <p>New Plan</p>
        </ButtonLink>
      </div>
      <div className="">
        <ButtonLink
          type="button"
          size="sm"
          variant="subtle"
          to="/cash-flow/new"
          className="flex items-center gap-x-2 px-3 text-blue-500 rounded-lg"
        >
          <Filter size={16} />
          <p>Filter</p>
        </ButtonLink>
      </div>
    </div>
  )
}

function UpdatePage({ id, title }: Post) {
  return (
    <div className="flex flex-col">
      <Link to={`/cash-flow/${id}`}>
        <div className="flex items-center gap-x-5">
          <h4 className="text-lg font-semibold">{title}</h4>
          <div className="mt-2 flex flex-wrap gap-2">
            <p className="rounded-sm bg-red-800 px-1.5 text-xs text-white">
              Not Completed
            </p>
            <p className="rounded-sm bg-gray-800 px-1.5 text-xs text-white">Rupiah</p>
            <p className="rounded-sm bg-orange-300 px-1.5 text-xs text-white">
              July 24, 2023 9:58 AM
            </p>
            <p className="rounded-sm bg-gray-800 px-1.5 text-xs text-white">
              Template:Monthly-Expanse
            </p>
          </div>
        </div>
        <p className="text-secondary mt-6 text-left text-sm font-light">
          Updated 13h ago..
        </p>
      </Link>
    </div>
  )
}

function NoData() {
  return (
    <div className="grid w-full gap-y-4 rounded-lg border bg-gray-100 dark:bg-gray-900 border-white py-32 text-center dark:border-gray-800">
      <div className="mx-auto w-fit rounded-full bg-gray-800 p-5">
        <img src="/vectors/checklist.png" alt="" className="h-10 w-10" />
      </div>
      <div>
        <h5 className="text-3xl font-medium">
          No expense data created.
        </h5>
        <p className="text-base text-center font-normal leading-normal text-gray-400 dark:text-gray-200">
          You don't have any posts yet. Start creating content.
        </p>
      </div>
      <div>
        <ButtonLink
          type="button"
          size="sm"
          variant="subtle"
          to="/cash-flow/new"
          className="flex items-center gap-x-2"
        >
          <Plus size={16} />
          <p>New Plan</p>
        </ButtonLink>
      </div>
    </div>
  )
}
