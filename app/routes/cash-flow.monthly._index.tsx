import loadable from '@loadable/component'
import { DialogContent, DialogOverlay } from '@reach/dialog'
import {
  Form,
  useActionData,
  useLoaderData,
  useSearchParams,
} from '@remix-run/react'
import clsx from 'clsx'
import { FolderClosed, FolderOpen, MoveLeftIcon, Plus } from 'lucide-react'
import TextareaAutosize from 'react-textarea-autosize'
import { UIButton } from '~/components/shadcn/button'
import type { Post } from '@prisma/client'
import type { ActionFunction, LoaderFunction } from '@remix-run/node'
import React from 'react'
import { create } from 'zustand'
import {
  createPost,
  deletePost,
  getPost,
  getPostByAuthor,
  updatePost,
} from '~/utils/post.session'
import { getUserId } from '~/utils/session.server'
import { useRootData } from '~/utils/use-root-data'

const EditorJs = loadable(() => import('~/components/editor'))

type LoaderData = {
  posts: Post[] | null
  post: Post | null;
}

enum FormType {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

type ActionData = {
  formError?: string
  fieldErrors?: {
    title: string | undefined
  }
  newPostId?: string
  fields?: {
    title: string
  }
}

interface MonthlyState {
  isShowEditorCreate: boolean
  setShowEditorCreate: (isShow: boolean) => void
  isShowEditorUpdate: boolean
  setShowEditorUpdate: (isShow: boolean) => void
}

const useMonthlyState = create<MonthlyState>(set => ({
  isShowEditorCreate: false,
  setShowEditorCreate: isShow => set(() => ({ isShowEditorCreate: isShow })),
  isShowEditorUpdate: false,
  setShowEditorUpdate: isShow => set(() => ({ isShowEditorUpdate: isShow })),
}))


async function getLoaderData({ request }: { request: Request }) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  const userId = await getUserId(request)

  const post = await getPost({ id: id ?? '' })
  const posts = await getPostByAuthor({ authorId: userId })
  return { post, posts }
}

export const loader: LoaderFunction = async ({ request }) => {
  const { post, posts } = await getLoaderData({ request })
  const data: LoaderData = { post, posts }
  return data
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const {
    _action,
    postId,
    title,
    authorId,
    postJSON,
    newPostId
  } = Object.fromEntries(formData)

  switch (_action) {
    case FormType.DELETE: {
      if (
        typeof postId !== 'string'
      ) {
        return { formError: `Form not submitted correctly.` }
      }
      const post = await deletePost({ id: postId })
      return post
    }
    case FormType.CREATE: {
      if (
        typeof title !== 'string' ||
        typeof authorId !== 'string' ||
        typeof postJSON !== 'string' ||
        typeof newPostId !== 'string'
      ) {
        return { formError: `Form not submitted correctly.` }
      }
      const post = await createPost({
        title,
        authorId,
        published: true,
        content: JSON.parse(postJSON),
      })
      return { newPostId: post.id }
    }
    case FormType.UPDATE: {
      if (
        typeof title !== 'string' ||
        typeof authorId !== 'string' ||
        typeof postId !== 'string' ||
        typeof postJSON !== 'string'
      ) {
        return { formError: `Form not submitted correctly.` }
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
      return { formError: `Action type invalid` }
    }
  }
}

export default function Index() {
  const { posts } = useLoaderData<LoaderData>()

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
      <div className="block rounded-md border border-gray-800 pb-4 md:hidden">
        tools
      </div>
      <div className="grid grid-cols-12 gap-x-5 py-4 md:gap-x-7">
        <div className="col-span-6 md:col-span-9">
          <div className="mb-3 hidden rounded-md border border-gray-800 py-4 md:block">
            tools
          </div>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-6 md:py-4 lg:grid-cols-12">
            {posts?.length ? (
              posts.map(post => (
                <div className="col-span-3" key={post.id}>
                  <UpdateData {...JSON.parse(JSON.stringify(post))} />
                </div>
              ))
            ) : (
              <div className="col-span-12">No Data</div>
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

function CreateData() {
  const [, setSearchParams] = useSearchParams()
  const { setShowEditorCreate } = useMonthlyState()
  // Need for rerender Editor
  const [isEditorReady, setEditorReady] = React.useState(false)

  return (
    <div>
      <UIButton
        type="button"
        size="sm"
        onClick={() => {
          setShowEditorCreate(true)
          setEditorReady(true)
        }}
        onMouseOver={() => {
          EditorJs.preload()
          setSearchParams({})
        }}
      >
        <Plus className="m-0 mr-1 h-3.5 w-3.5 p-0" />
        Create Data
      </UIButton>
      {isEditorReady && <EditorCreateData setEditorReady={setEditorReady} />}
    </div>
  )
}

function UpdateData({ id, title }: Post) {
  const [searchParams, setSearchParams] = useSearchParams()
  const { setShowEditorUpdate } = useMonthlyState()

  // Need for rerender Editor
  const [isEditorReady, setEditorReady] = React.useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setShowEditorUpdate(true)
          setEditorReady(true)
        }}
        onMouseOver={() => {
          EditorJs.preload()
          if (searchParams.get('id') !== id) {
            setSearchParams({ id: id })
          }
        }}
        className={clsx('flex w-full cursor-pointer items-center gap-x-3 rounded-lg border border-gray-800 px-4 py-2.5 hover:border-gray-700',
          {
            'border-orange-200 bg-orange-100 hover:border-orange-300': !title,
          },
        )}
      >
        {!title && <FolderOpen className="m-0 h-5 w-5 p-0" />}
        {title && <FolderClosed className="m-0 h-5 w-5 p-0" />}
        <p className="mt-0.5 text-md">{title}</p>
      </button>
      {isEditorReady && <EditorUpdateData setEditorReady={setEditorReady} />}
    </>
  )
}

function EditorCreateData({
  setEditorReady,
}: {
  setEditorReady: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const actionData = useActionData<ActionData | undefined>()
  const { isShowEditorCreate, setShowEditorCreate } = useMonthlyState()
  const [isCreated, setIsCreated] = React.useState(false)

  React.useEffect(() => {
    if (!isShowEditorCreate) {
      setEditorReady(false)
    }
    if (actionData?.newPostId) {
      setIsCreated(true)
    }
  }, [actionData?.newPostId, isShowEditorCreate, setEditorReady])

  return (
    <DialogOverlay
      aria-label=""
      isOpen={isShowEditorCreate}
      onDismiss={() => {
        setShowEditorCreate(false)
      }}
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.682)' }}
      className="z-50 flex w-full items-center whitespace-nowrap"
    >
      <DialogContent className="fixed left-0 right-0 mx-auto flex h-screen w-screen flex-col bg-gray-900 p-0 lg:h-[88vh] lg:w-fit lg:rounded-md lg:border lg:border-gray-800">
        <HeaderEditor type={FormType.CREATE} />
        <EditorForm type={isCreated ? FormType.UPDATE : FormType.CREATE} />
      </DialogContent>
    </DialogOverlay>
  )
}

function EditorUpdateData({
  setEditorReady,
}: {
  setEditorReady: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const { isShowEditorUpdate, setShowEditorUpdate } =
    useMonthlyState()

  React.useEffect(() => {
    if (!isShowEditorUpdate) {
      setEditorReady(false)
    }
  }, [isShowEditorUpdate, setEditorReady])

  return (
    <DialogOverlay
      aria-label=""
      isOpen={isShowEditorUpdate}
      onDismiss={() => {
        setShowEditorUpdate(false)
      }}
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.682)' }}
      className="z-50 flex w-full items-center whitespace-nowrap"
    >
      <DialogContent className="fixed left-0 right-0 mx-auto flex h-screen w-screen flex-col bg-gray-900 p-0 lg:h-[88vh] lg:w-fit lg:rounded-md lg:border lg:border-gray-800">
        <HeaderEditor type={FormType.UPDATE} />
        <EditorForm type={FormType.UPDATE} />
      </DialogContent>
    </DialogOverlay>
  )
}

function HeaderEditor({ type }: { type: FormType }) {
  const { setShowEditorUpdate, setShowEditorCreate } = useMonthlyState()
  const { post } = useLoaderData<LoaderData>()
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
      <Form method='POST'>
        <UIButton
          type='submit'
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
    </div>
  )
}

function EditorForm({ type }: { type: FormType }) {
  const { post } = useLoaderData<LoaderData>()
  const { user } = useRootData()
  const submitRef = React.useRef<HTMLInputElement>(null)
  const postJSONRef = React.useRef<HTMLInputElement>(null)

  const actionData = useActionData<ActionData | undefined>()
  const [, setFormValues] = React.useState({
    title: '',
    postJSON: '',
  })

  const editorCore = React.useRef<null>(null)

  const handleInitialize = React.useCallback((instance: null) => {
    editorCore.current = instance
  }, [])

  const handleSave = React.useCallback(async () => {
    // retrieve data inserted
    if (!editorCore.current) return 'some thing went wrong!'
    // @ts-ignore
    const savedData = await editorCore.current.save()

    // save data
    if (postJSONRef.current) {
      postJSONRef.current.value = JSON.stringify(savedData)
    }

    // submit JSON
    if (submitRef.current) {
      submitRef.current.click()
    }
  }, [])

  return (
    <Form
      method="POST"
      className="overflow-scroll py-4 lg:py-14"
      onChange={e => {
        const form = e.currentTarget
        setFormValues({
          title: form.title,
          postJSON: form.postJSON,
        })
      }}
    >
      <div className="wrapperEditor px-6 md:px-0">
        <TextareaAutosize
          autoFocus
          id="title-field"
          name="title"
          defaultValue={post?.title}
          placeholder="Post title"
          className="w-full resize-none appearance-none overflow-hidden bg-transparent text-3xl font-bold leading-tight focus:outline-none md:text-4xl"
        />
      </div>
      <EditorJs
        defaultValue={post?.content}
        holder={post?.title}
        onInitialize={handleInitialize}
        handleSave={handleSave}
      />
      {type}
      <input
        type="text"
        className="hidden"
        name="_action"
        value={type}
      />
      <input
        type="text"
        className="hidden"
        name="authorId"
        value={user?.id}
      />
      <input
        ref={postJSONRef}
        type="text"
        className="hidden"
        name="postJSON"
      />
      <input
        type="text"
        className="hidden"
        name="newPostId"
        value={actionData?.newPostId}
      />
      <input
        type="text"
        className="hidden"
        name="postId"
        value={actionData?.newPostId || post?.id}
      />
      <input
        ref={submitRef}
        type="submit"
        className="hidden"
      />
    </Form>
  )
}
