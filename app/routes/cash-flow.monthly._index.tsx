import {DialogContent, DialogOverlay} from '@reach/dialog'
import clsx from 'clsx'
import {Plus, FolderClosed, FolderOpen, MoveLeftIcon} from 'lucide-react'
import loadable from '@loadable/component'
import TextareaAutosize from 'react-textarea-autosize'
import {UIButton} from '~/components/shadcn/button'
import {
  Form,
  useActionData,
  useLoaderData,
  useSearchParams,
} from '@remix-run/react'
// import type { Post } from '@prisma/client'
import {create} from 'zustand'
import React from 'react'
import type {ActionFunction, LoaderFunction} from '@remix-run/node'
import {useRootData} from '~/utils/use-root-data'
import type {Post} from '@prisma/client'
import {
  createPost,
  getPost,
  getPostByAuthor,
  updatePost,
} from '~/utils/post.session'
import {getUserId} from '~/utils/session.server'

const EditorJs = loadable(() => import('~/components/editor'))

type LoaderData = {post: Post | null; posts: Post[] | null}

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
  isSubmitted: boolean
  setSubmitted: (isSubmit: boolean) => void
  isShowEditorCreate: boolean
  setShowEditorCreate: (isShow: boolean) => void
  isShowEditorUpdate: boolean
  setShowEditorUpdate: (isShow: boolean) => void
}
// interface EditorProps {
//   post: Pick<Post, 'id' | 'title' | 'content' | 'published'>
// }

async function getLoaderData({request}: {request: Request}) {
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
  const actionType = formData.get('actionType')
  const postId = formData.get('postId')
  const title = formData.get('title')
  const authorId = formData.get('authorId')
  const postJSON = formData.get('postJSON')
  const newPostId = formData.get('newPostId')

  switch (actionType) {
    case 'create': {
      if (
        typeof title !== 'string' ||
        typeof authorId !== 'string' ||
        typeof postJSON !== 'string' ||
        typeof newPostId !== 'string'
      ) {
        return {formError: `Form not submitted correctly.`}
      }
      console.log('--------------newPostId--------------: ', newPostId)
      const post = await createPost({
        title,
        authorId,
        published: true,
        content: JSON.parse(postJSON),
      })
      return {newPostId: post.id}
    }
    case 'update': {
      if (
        typeof title !== 'string' ||
        typeof authorId !== 'string' ||
        typeof postId !== 'string' ||
        typeof postJSON !== 'string'
      ) {
        return {formError: `Form not submitted correctly.`}
      }
      return await updatePost({
        id: postId,
        title,
        authorId,
        published: true,
        content: JSON.parse(postJSON),
      })
    }
    default: {
      return {formError: `Action type invalid`}
    }
  }
}

const useMonthlyState = create<MonthlyState>(set => ({
  isSubmitted: false,
  setSubmitted: isSubmit => set(() => ({isSubmitted: isSubmit})),
  isShowEditorCreate: false,
  setShowEditorCreate: isShow => set(() => ({isShowEditorCreate: isShow})),
  isShowEditorUpdate: false,
  setShowEditorUpdate: isShow => set(() => ({isShowEditorUpdate: isShow})),
}))

export default function Index() {
  const {posts} = useLoaderData<LoaderData>()

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
        <NewMonth />
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
                  <Month {...JSON.parse(JSON.stringify(post))} />
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

function NewMonth() {
  const [, setSearchParams] = useSearchParams()
  const {setShowEditorCreate, setSubmitted} = useMonthlyState()
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
          setSubmitted(false)
        }}
        onMouseOver={() => {
          EditorJs.preload()
          setSearchParams({})
        }}
      >
        <Plus className="m-0 mr-1.5 mt-[1px] h-3.5 w-3.5 p-0" />
        Create Data
      </UIButton>
      {isEditorReady && <CreateData setEditorReady={setEditorReady} />}
    </div>
  )
}

function Month({id, title}: Post) {
  const [searchParams, setSearchParams] = useSearchParams()
  const {setShowEditorUpdate, setSubmitted} = useMonthlyState()

  // Need for rerender Editor
  const [isEditorReady, setEditorReady] = React.useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setShowEditorUpdate(true)
          setEditorReady(true)
          setSubmitted(false)
        }}
        onMouseOver={() => {
          EditorJs.preload()
          if (searchParams.get('id') !== id) {
            setSearchParams({id: id})
          }
        }}
        className={clsx(
          'flex w-full cursor-pointer items-center gap-x-3 rounded-lg border border-gray-800 px-4 py-2.5 hover:border-gray-700',
          {
            'border-orange-200 bg-orange-100 hover:border-orange-300': !title,
          },
        )}
      >
        {!title && <FolderOpen className="m-0 h-5 w-5 p-0" />}
        {title && <FolderClosed className="m-0 h-5 w-5 p-0" />}
        <p className="mt-0.5 text-md">{title}</p>
      </button>
      {isEditorReady && <EditData setEditorReady={setEditorReady} />}
    </>
  )
}

function CreateData({
  setEditorReady,
}: {
  setEditorReady: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const actionData = useActionData<ActionData | undefined>()
  const {isShowEditorCreate, setShowEditorCreate, setSubmitted} =
    useMonthlyState()
  const [isUpadte, setIsUpdate] = React.useState(false)
  React.useEffect(() => {
    if (!isShowEditorCreate) {
      setEditorReady(false)
    }
    if (actionData?.newPostId) {
      setIsUpdate(true)
    }
  }, [actionData?.newPostId, isShowEditorCreate, setEditorReady])

  return (
    <DialogOverlay
      aria-label=""
      isOpen={isShowEditorCreate}
      onDismiss={() => {
        setSubmitted(true)
        setShowEditorCreate(false)
      }}
      style={{backgroundColor: 'rgba(0, 0, 0, 0.682)'}}
      className="z-50 flex w-full items-center whitespace-nowrap"
    >
      <DialogContent className="fixed left-0 right-0 mx-auto flex h-screen w-screen flex-col bg-gray-900 p-0 lg:h-[88vh] lg:w-fit lg:rounded-md lg:border lg:border-gray-800">
        <HeaderEditor type="create" />
        <EditorForm type={isUpadte ? 'update' : 'create'} />
      </DialogContent>
    </DialogOverlay>
  )
}

function EditData({
  setEditorReady,
}: {
  setEditorReady: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const {isShowEditorUpdate, setShowEditorUpdate, setSubmitted} =
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
        setSubmitted(true)
        setShowEditorUpdate(false)
      }}
      style={{backgroundColor: 'rgba(0, 0, 0, 0.682)'}}
      className="z-50 flex w-full items-center whitespace-nowrap"
    >
      <DialogContent className="fixed left-0 right-0 mx-auto flex h-screen w-screen flex-col bg-gray-900 p-0 lg:h-[88vh] lg:w-fit lg:rounded-md lg:border lg:border-gray-800">
        <HeaderEditor type="update" />
        <EditorForm type="update" />
      </DialogContent>
    </DialogOverlay>
  )
}

function HeaderEditor({type}: {type: 'update' | 'create'}) {
  const {setShowEditorUpdate, setShowEditorCreate, setSubmitted} =
    useMonthlyState()
  return (
    <div className="flex items-center justify-between border-b border-gray-800 px-6 py-3">
      <UIButton
        onClick={() => {
          setSubmitted(true)
          if (type === 'create') {
            setShowEditorCreate(false)
          }
          if (type === 'update') {
            setShowEditorUpdate(false)
          }
        }}
        variant="subtle"
        className="h-fit p-0 text-md text-orange-500"
      >
        <MoveLeftIcon className="mr-2.5" size="18" />
        <p>Back</p>
      </UIButton>
      <UIButton
        form="editor-form"
        variant="subtle"
        className="h-fit p-0 text-md text-white"
      >
        <p>Simpan</p>
      </UIButton>
    </div>
  )
}

function EditorForm({type}: {type: 'update' | 'create'}) {
  const {post} = useLoaderData<LoaderData>()
  const {user} = useRootData()
  const {setSubmitted} = useMonthlyState()
  const submitRef = React.useRef<HTMLInputElement>(null)
  const postJSONRef = React.useRef<HTMLInputElement>(null)

  const actionData = useActionData<ActionData | undefined>()
  const [, setFormValues] = React.useState({
    title: '',
    postJSON: '',
  })

  const editorCore = React.useRef(null)

  const handleInitialize = React.useCallback((instance: null) => {
    editorCore.current = instance
  }, [])

  const handleSave = React.useCallback(async () => {
    // retrieve data inserted
    if (!editorCore.current) return 'some thing went wrong'
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
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
      onSubmit={() => {
        setSubmitted(true)
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
      <p>{type}</p>
      <input type="text" className="hidden" name="authorId" value={user?.id} />
      <input type="text" className="hidden" name="actionType" value={type} />
      <input ref={postJSONRef} type="text" className="hidden" name="postJSON" />
      <input
        type="text"
        className="hidden"
        name="newPostId"
        value={actionData?.newPostId}
      />
      <input className="hidden" ref={submitRef} type="submit" />
      {post?.id && (
        <input type="text" className="hidden" name="postId" value={post.id} />
      )}
    </Form>
  )
}
