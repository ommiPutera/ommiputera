import { Link, useLoaderData } from '@remix-run/react'
import { UIButton } from '~/components/shadcn/button'
import { Plus } from 'lucide-react'
import type { Post } from '@prisma/client'
import type { LoaderData } from './route'

export default function Board() {
  const { posts } = useLoaderData<LoaderData>()
  const isPostsExist = Boolean(posts?.length)
  return (
    <div className="flex flex-col gap-y-6 pb-9 lg:pb-12">
      <div className="relative mx-auto w-full max-w-7xl">
        <Tools />
      </div>
      <div className="relative grid max-w-7xl grid-cols-1 md:grid-cols-4 lg:gap-x-4">
        {isPostsExist ? (
          posts?.map(post => (
            <div
              key={post.id}
              className="col-span-1 cursor-pointer rounded-lg border border-gray-800 bg-black px-5 py-5 hover:border-gray-700"
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
    <div className="py-4">
      <Link to="/cash-flow/new" prefetch="intent">
        <UIButton type="button" size="sm">
          <Plus className="m-0 mr-1 h-3.5 w-3.5 p-0" />
          New Plan
        </UIButton>
      </Link>
    </div>
  )
}

function UpdatePage({ id, title }: Post) {
  return (
    <div className="flex flex-col">
      <Link to={`/cash-flow/${id}`}>
        <div className="flex items-center gap-x-5">
          <img src="/vectors/spreadsheet.png" alt="" className="h-10 w-10" />
          <div>
            <h4 className="text-base font-normal">{title}</h4>
            <p className="text-secondary mt-1 text-md font-light leading-tight">
              Vercel usage, traffic, and more with the fields below.
            </p>
          </div>
        </div>
        <p className="text-secondary mt-6 text-left text-md font-light">
          Updated 13h ago..
        </p>
      </Link>
    </div>
  )
}

function NoData() {
  return (
    <div className="grid w-full gap-y-4 rounded-lg border border-gray-600 py-36 text-center">
      <div className="mx-auto w-fit rounded-full bg-gray-800 p-5">
        <img src="/vectors/checklist.png" alt="" className="h-10 w-10" />
      </div>
      <div>
        <h5 className="text-xl font-medium lg:text-lg">
          No expense data created.
        </h5>
        <p className="text-secondary mt-1 text-md font-light">
          You don't have any posts yet. Start creating content.
        </p>
      </div>
      <div>
        <Link to="/cash-flow/new" prefetch="intent">
          <UIButton type="button" size="sm">
            <Plus className="m-0 mr-1 h-3.5 w-3.5 p-0" />
            Plan
          </UIButton>
        </Link>
      </div>
    </div>
  )
}
