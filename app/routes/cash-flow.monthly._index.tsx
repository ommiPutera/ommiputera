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
import {db} from '~/utils/db.server'

const EditorJs = loadable(() => import('~/components/editor'))

type LoaderData = {post: Post | null}

type data = {
  name: string
  isClosed: boolean
}

type ActionData = {
  formError?: string
  fieldErrors?: {
    title: string | undefined
  }
  fields?: {
    title: string
  }
}

interface MonthlyState {
  isSubmitted: boolean
  setSubmitted: (isSubmit: boolean) => void
  isShowEditor: boolean
  setShowEditor: (isShow: boolean) => void
}
// interface EditorProps {
//   post: Pick<Post, 'id' | 'title' | 'content' | 'published'>
// }

const dataJSON: data[] = [
  {
    name: 'Agustus 2022',
    isClosed: true,
  },
  {
    name: 'September 2022',
    isClosed: true,
  },
  {
    name: 'Oktober 2022',
    isClosed: false,
  },
]

async function getLoaderData({request}: {request: Request}) {
  const {searchParams} = new URL(request.url)
  const id = searchParams.get('id')
  const post = await db.post.findUnique({where: {id: id ?? ''}})
  return post
}

export const loader: LoaderFunction = async ({request}) => {
  const post = await getLoaderData({request})
  let data: LoaderData = {post}
  return data
}

export const action: ActionFunction = async ({request}) => {
  const formData = await request.formData()
  const actionType = formData.get('actionType')
  const title = formData.get('title')
  const authorId = formData.get('authorId')
  const published = formData.get('published')
  const postJSON = formData.get('postJSON')
  console.table({
    title: title,
    postJSON: postJSON,
  })

  if (
    typeof title !== 'string' ||
    typeof authorId !== 'string' ||
    typeof postJSON !== 'string' ||
    typeof published !== 'boolean' ||
    typeof actionType !== 'boolean'
  ) {
    return {formError: `Form not submitted correctly.`}
  }
  let fields = {title, authorId, postJSON, published}

  switch (actionType) {
    case 'create': {
      console.log('create')
    }
    case 'update': {
      console.log('update')
    }
    default: {
      return {fields, formError: `Action type invalid`}
    }
  }
}

const useMonthlyState = create<MonthlyState>(set => ({
  isSubmitted: false,
  setSubmitted: isSubmit => set(() => ({isSubmitted: isSubmit})),
  isShowEditor: false,
  setShowEditor: isShow => set(() => ({isShowEditor: isShow})),
}))

export default function Monthly() {
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
            {dataJSON.map(month => (
              <div className="col-span-3" key={month.name}>
                <Month {...month} />
              </div>
            ))}
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
  return (
    <UIButton size="sm">
      <Plus className="m-0 mr-1.5 mt-[1px] h-3.5 w-3.5 p-0" />
      Create Data
    </UIButton>
  )
}

function Month({name, isClosed}: data) {
  const [searchParams, setSearchParams] = useSearchParams()
  const {setShowEditor, setSubmitted} = useMonthlyState()

  // Need for rerender Editor
  const [isEditorReady, setEditorReady] = React.useState(false)

  return (
    <div>
      <button
        onClick={() => {
          setShowEditor(true)
          setEditorReady(true)
          setSubmitted(false)
        }}
        onMouseOver={() => {
          EditorJs.preload()
          if (searchParams.get('id') !== 'cljraht7y0000orrxmcyy8b18') {
            setSearchParams({id: 'cljraht7y0000orrxmcyy8b18'})
          }
        }}
        className={clsx(
          'flex w-full cursor-pointer items-center gap-x-3 rounded-lg border border-gray-800 px-4 py-2.5 hover:border-gray-700',
          {
            'border-orange-200 bg-orange-100 hover:border-orange-300':
              !isClosed,
          },
        )}
      >
        {!isClosed && <FolderOpen className="m-0 h-5 w-5 p-0" />}
        {isClosed && <FolderClosed className="m-0 h-5 w-5 p-0" />}
        <p className="mt-0.5 text-md">{name}</p>
      </button>
      {isEditorReady && <EditData setEditorReady={setEditorReady} />}
    </div>
  )
}

function EditData({
  setEditorReady,
}: {
  setEditorReady: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const {isShowEditor, setShowEditor, setSubmitted} = useMonthlyState()

  React.useEffect(() => {
    if (!isShowEditor) {
      setEditorReady(false)
    }
  }, [isShowEditor, setEditorReady])

  return (
    <DialogOverlay
      aria-label=""
      isOpen={isShowEditor}
      onDismiss={() => {
        setSubmitted(true)
        setShowEditor(false)
      }}
      style={{backgroundColor: 'rgba(0, 0, 0, 0.682)'}}
      className="z-50 flex w-full items-center whitespace-nowrap"
    >
      <DialogContent className="fixed left-0 right-0 mx-auto flex h-screen w-screen flex-col bg-gray-900 p-0 lg:h-[88vh] lg:w-fit lg:rounded-md lg:border lg:border-gray-800">
        <HeaderEditor />
        <EditorForm />
      </DialogContent>
    </DialogOverlay>
  )
}

function HeaderEditor() {
  const {setShowEditor, setSubmitted} = useMonthlyState()
  return (
    <div className="flex items-center justify-between border-b border-gray-800 px-6 py-3">
      <UIButton
        onClick={() => {
          setSubmitted(true)
          setShowEditor(false)
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

function EditorForm() {
  const data = useLoaderData<LoaderData>()
  const post = data.post

  const {user} = useRootData()
  const {isSubmitted} = useMonthlyState()
  const [content] = React.useState(post?.content)
  const submitRef = React.useRef(null)
  const postJSONRef = React.useRef(null)

  let actionData = useActionData<ActionData | undefined>()
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
    // @ts-ignore
    const savedData = await editorCore.current.save()

    // save data
    if (postJSONRef.current) {
      // @ts-ignore
      postJSONRef.current.value = JSON.stringify(savedData)
    }

    // submit JSON
    if (submitRef.current || isSubmitted) {
      // @ts-ignore
      submitRef.current.click()
    }
  }, [isSubmitted])

  return (
    <Form
      id="editor-form"
      method="POST"
      className="overflow-scroll py-4 lg:py-14"
      onChange={e => {
        const form = e.currentTarget
        setFormValues({
          title: form.title,
          postJSON: form.postJSON,
        })
      }}
      aria-describedby={
        actionData?.formError ? 'form-error-message' : undefined
      }
    >
      <div className="wrapperEditor px-6 md:px-0">
        <TextareaAutosize
          autoFocus
          id="title-field"
          name="title"
          defaultValue={post?.title || 'Untitled'}
          placeholder="Post title"
          className="w-full resize-none appearance-none overflow-hidden bg-transparent text-3xl font-bold leading-tight focus:outline-none md:text-4xl"
        />
      </div>
      <EditorJs
        defaultValue={content}
        holder={post?.title || 'Untitled'}
        onInitialize={handleInitialize}
        handleSave={handleSave}
      />
      <input type="text" className="hidden" name="authorId" value={user?.id} />
      <input type="text" className="hidden" name="actionType" value="update" />
      <input ref={postJSONRef} type="text" className="hidden" name="postJSON" />
      <input className="hidden" ref={submitRef} type="submit" />
    </Form>
  )
}
