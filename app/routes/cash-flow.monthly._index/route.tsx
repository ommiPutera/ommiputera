import loadable from '@loadable/component'
import {Form, useLoaderData} from '@remix-run/react'
import {MoveLeftIcon} from 'lucide-react'
import {UIButton} from '~/components/shadcn/button'
import type {Post} from '@prisma/client'
import type {ActionFunction, LoaderFunction} from '@remix-run/node'
import React from 'react'
import {create} from 'zustand'
import {
  createPost,
  deletePost,
  getPost,
  getPostByAuthor,
  updatePost,
} from '~/utils/post.session'
import {getUserId} from '~/utils/session.server'
import CreateData from './create'
import UpdateData from './update'

export const EditorJs = loadable(() => import('~/components/editor'))

export type LoaderData = {
  posts: Post[] | null
  post: Post | null
}

export enum FormType {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

export type ActionData = {
  formError?: string
  fieldErrors?: {
    title: string | undefined
  }
  newPostId?: string
  deletedPostId?: string
  fields?: {
    title: string
  }
}

interface MonthlyState {
  isEditorReady: boolean
  setIsEditorReady: (isInitialize: boolean) => void

  isSubmited: boolean
  setIsSubmited: (isSubmited: boolean) => void

  isRequestForDismis: boolean
  setIsRequestForDismis: (isRequest: boolean) => void

  isShowEditorCreate: boolean
  setShowEditorCreate: (isShow: boolean) => void

  isShowEditorUpdate: boolean
  setShowEditorUpdate: (isShow: boolean) => void
}

export const useMonthlyState = create<MonthlyState>(set => ({
  isEditorReady: false,
  setIsEditorReady: isReady => set(() => ({isEditorReady: isReady})),

  isSubmited: false,
  setIsSubmited: isSubmited => set(() => ({isSubmited: isSubmited})),

  isRequestForDismis: false,
  setIsRequestForDismis: isRequest =>
    set(() => ({isRequestForDismis: isRequest})),

  isShowEditorCreate: false,
  setShowEditorCreate: isShow => set(() => ({isShowEditorCreate: isShow})),

  isShowEditorUpdate: false,
  setShowEditorUpdate: isShow => set(() => ({isShowEditorUpdate: isShow})),
}))

export async function getLoaderData({request}: {request: Request}) {
  const {searchParams} = new URL(request.url)
  const id = searchParams.get('id')
  const userId = await getUserId(request)

  const post = await getPost({id: id ?? ''})
  const posts = await getPostByAuthor({authorId: userId})
  return {post, posts}
}

export const loader: LoaderFunction = async ({request}) => {
  const {post, posts} = await getLoaderData({request})
  const data: LoaderData = {post, posts}
  return data
}

export const action: ActionFunction = async ({request}) => {
  const formData = await request.formData()
  const {_action, postId, title, authorId, postJSON, newPostId} =
    Object.fromEntries(formData)

  switch (_action) {
    case FormType.DELETE: {
      if (typeof postId !== 'string') {
        return {formError: `Form not submitted correctly.`}
      }
      const post = await deletePost({id: postId})
      return {deletedPostId: post.id}
    }
    case FormType.CREATE: {
      if (
        typeof title !== 'string' ||
        typeof authorId !== 'string' ||
        typeof postJSON !== 'string' ||
        typeof newPostId !== 'string'
      ) {
        return {formError: `Form not submitted correctly.`}
      }
      console.log('hereeeeeee')
      const post = await createPost({
        title,
        authorId,
        published: true,
        content: JSON.parse(postJSON),
      })
      return {newPostId: post.id}
    }
    case FormType.UPDATE: {
      if (
        typeof title !== 'string' ||
        typeof authorId !== 'string' ||
        typeof postId !== 'string' ||
        typeof postJSON !== 'string'
      ) {
        return {formError: `Form not submitted correctly.`}
      }
      const post = await updatePost({
        id: postId,
        title,
        authorId,
        published: true,
        content: JSON.parse(postJSON),
      })
      return post
    }
    default: {
      return {formError: `Action type invalid`}
    }
  }
}

export default function Index() {
  const {posts} = useLoaderData<LoaderData>()
  const isPostsExist = Boolean(posts?.length)

  return (
    <div className="">
      <div className="flex items-center justify-between py-4">
        <div className="text-left">
          <h1 className="leading-tigh px-0 text-xl font-medium capitalize lg:text-lg">
            Monthly Expense
          </h1>
          <p className="text-secondary mt-1 text-md font-light">
            Query and visualize your Vercel usage.
          </p>
        </div>
        <CreateData />
      </div>
      <div className="block md:hidden">
        <Tools />
      </div>
      <div className="grid grid-cols-12 gap-x-5 py-4 md:gap-x-7">
        <div className="col-span-6 md:col-span-9">
          <Tools />
          <div className="grid grid-cols-1 gap-3 md:grid-cols-6 lg:grid-cols-12">
            {isPostsExist ? (
              posts?.map(post => (
                <div className="col-span-3" key={post.id}>
                  <UpdateData {...JSON.parse(JSON.stringify(post))} />
                </div>
              ))
            ) : (
              <div className="col-span-12">
                <NoData />
              </div>
            )}
          </div>
        </div>
        <div className="col-span-6 md:col-span-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="text-secondary col-span-1 flex flex-col items-center justify-center gap-2 rounded-md border border-gray-800 px-3 py-6 text-center">
              <img
                src="/vectors/expenses-vector.png"
                alt=""
                className="h-10 w-10"
              />
              <h3 className="text-lg font-medium text-green-900">100%</h3>
              <h5 className="text-sm font-light leading-snug">
                Kesehatan Financial
              </h5>
            </div>
            <div className="text-secondary col-span-1 flex flex-col items-center justify-center gap-2 rounded-md border border-gray-800 px-3 py-6 text-center">
              <img
                src="/vectors/expenses-vector.png"
                alt=""
                className="h-10 w-10"
              />
              <h3 className="text-lg font-medium text-green-900">100%</h3>
              <h5 className="text-sm font-light leading-snug">
                Kesehatan Financial
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Tools() {
  const {posts} = useLoaderData<LoaderData>()
  const isPostsExist = Boolean(posts?.length)

  if (!isPostsExist) return <></>
  return (
    <div className="mb-4 rounded-md border border-gray-800 py-4">tools</div>
  )
}

function NoData() {
  return (
    <div className="grid gap-y-4 rounded-lg border border-gray-800 py-36 text-center">
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
        <CreateData />
      </div>
    </div>
  )
}

export function HeaderEditor({type}: {type: FormType}) {
  const {setShowEditorUpdate, setShowEditorCreate} = useMonthlyState()
  const {post} = useLoaderData<LoaderData>()
  return (
    <div className="flex items-center justify-between border-b border-gray-800 px-6 py-3">
      <UIButton
        onClick={() => {
          if (type === FormType.CREATE) {
            setShowEditorCreate(false)
          }
          if (type === FormType.UPDATE) {
            setShowEditorUpdate(false)
          }
        }}
        variant="subtle"
        className="h-fit p-0 text-md text-orange-500"
      >
        <MoveLeftIcon className="mr-2.5" size="18" />
        <p>Back</p>
      </UIButton>
      {type === FormType.UPDATE && (
        <Form method="POST">
          <UIButton
            type="submit"
            name="_action"
            value={FormType.DELETE}
            variant="subtle"
            className="h-fit p-0 text-md text-red-900"
          >
            Delete
          </UIButton>
          <input
            type="text"
            className="hidden"
            name="postId"
            value={post?.id}
          />
        </Form>
      )}
    </div>
  )
}
