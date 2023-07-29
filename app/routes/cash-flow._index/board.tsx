import { Link, useLoaderData } from '@remix-run/react'
import { Plus, X } from 'lucide-react'
import type { Post } from '@prisma/client'
import type { LoaderData } from './route'
import { ButtonLink } from '~/components/button'
import React from 'react'
import { UIButton } from '~/components/shadcn/button'

export default function Board() {
  const { posts } = useLoaderData<LoaderData>()
  const isPostsExist = Boolean(posts?.length)
  return (
    <div className="flex flex-col">
      <Guides />
      <Tools />
      <div className="relative grid max-w-7xl grid-cols-1 md:grid-cols-4 lg:gap-x-4">
        {isPostsExist ? (
          posts?.map(post => (
            <div
              key={post.id}
              className="col-span-1 cursor-pointer rounded-lg border border-gray-800 bg-black hover:border-gray-700 p-4"
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

function Guides() {
  const [show, setShow] = React.useState(true)

  if (!show) return <></>
  return (
    <div className='bg-black py-6 px-8 mb-4 rounded-lg border border-gray-600 flex items-center justify-between'>
      <div>
        <h4 className='text-lg font-medium'>Read Guides</h4>
        <p className='text-secondary'>Panda is a styling engine that generates styling primitives to author atomic CSS and recipes in a type-safe and readable manner.</p>
      </div>
      <div className='flex items-center gap-x-4'>
        <ButtonLink
          type="button"
          size="sm"
          variant="subtle"
          to="/cash-flow/new"
          className="flex items-center gap-x-2 border border-gray-600 bg-black"
        >
          <p>General Guides</p>
        </ButtonLink>
        <UIButton
          variant="subtle"
          onClick={() => setShow(false)}
          className=''
        >
          <X size={16} />
        </UIButton>
      </div>
    </div>
  )
}

function Tools() {
  const { posts } = useLoaderData<LoaderData>()
  const isPostsExist = Boolean(posts?.length)

  if (!isPostsExist) return <></>
  return (
    <div className="relative mx-auto w-full max-w-7xl mb-4">
      <div className="">
        <ButtonLink
          type="button"
          size="sm"
          variant="subtle"
          to="/cash-flow/new"
          className="flex items-center gap-x-2 border border-gray-600 bg-black"
        >
          <Plus size={16} />
          <p>New Plan</p>
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
    <div className="grid w-full gap-y-4 rounded-lg border border-gray-600 bg-black py-44 text-center">
      <div className="mx-auto w-fit rounded-full bg-gray-800 p-5">
        <img src="/vectors/checklist.png" alt="" className="h-10 w-10" />
      </div>
      <div>
        <h5 className="text-xl font-medium lg:text-xl">
          No expense data created.
        </h5>
        <p className="text-secondary mt-1 text-md font-light">
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
