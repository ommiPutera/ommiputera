import {DialogContent, DialogOverlay} from '@reach/dialog'
import clsx from 'clsx'
import {Plus, FolderClosed, FolderOpen, MoveLeftIcon} from 'lucide-react'
import loadable from '@loadable/component'
import TextareaAutosize from 'react-textarea-autosize'
import {UIButton} from '~/components/shadcn/button'
import {Form, useActionData, useSubmit} from '@remix-run/react'
// import type { Post } from '@prisma/client'
import {create} from 'zustand'
import React from 'react'
import type {ActionFunction} from '@remix-run/node'

const EditorJs = loadable(() => import('~/components/editor'))

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

export const action: ActionFunction = async ({request}) => {
  const formData = await request.formData()
  const title = formData.get('title')
  console.table({
    title: title,
  })

  // let fields = { username, password }
  return 'erroe'
}

const useMonthlyState = create<MonthlyState>(set => ({
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
  const {setShowEditor} = useMonthlyState()

  // Need for rerender Editor
  const [isEditorReady, setEditorReady] = React.useState(false)

  return (
    <div>
      <button
        onClick={() => {
          setShowEditor(true)
          setEditorReady(true)
        }}
        onMouseOver={() => EditorJs.preload()}
        onMouseLeave={() => EditorJs.preload()}
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
  const {isShowEditor, setShowEditor} = useMonthlyState()

  React.useEffect(() => {
    if (!isShowEditor) {
      setEditorReady(false)
    }
  }, [isShowEditor, setEditorReady])

  return (
    <DialogOverlay
      aria-label=""
      isOpen={isShowEditor}
      onDismiss={() => setShowEditor(false)}
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
  const {setShowEditor} = useMonthlyState()
  return (
    <div className="flex items-center justify-between border-b border-gray-800 px-6 py-3">
      <UIButton
        onClick={() => setShowEditor(false)}
        variant="subtle"
        className="h-fit p-0 text-md text-orange-500"
      >
        <MoveLeftIcon className="mr-2.5" size="18" />
        <p> Back</p>
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
  const formRef = React.useRef(null)
  let actionData = useActionData<ActionData | undefined>()
  const [draf, setDraf] = React.useState([])
  const [submitted, setSubmitted] = React.useState(false)
  const [formValues, setFormValues] = React.useState({
    title: '',
  })

  const editorCore = React.useRef(null)
  const post = {
    id: 'tesssst',
    title: 'unttiled',
    content: [],
    published: false,
  }

  const handleInitialize = React.useCallback((instance: null) => {
    editorCore.current = instance
  }, [])

  const handleSave = React.useCallback(async () => {
    // retrieve data inserted
    if (!editorCore.current) return 'some thing went wrong'
    // @ts-ignore
    const savedData = await editorCore.current.save()

    // save data
    setDraf(savedData)
    if (formRef.current) {
      // @ts-ignore
      // formRef.current.submit();
    }
  }, [])

  return (
    <Form
      ref={formRef}
      id="editor-form"
      method="POST"
      className="overflow-scroll py-4 lg:py-14"
      onChange={e => {
        const form = e.currentTarget
        setFormValues({
          title: form.title,
        })
      }}
      aria-describedby={
        actionData?.formError ? 'form-error-message' : undefined
      }
      onSubmit={e => {
        setSubmitted(true)
      }}
    >
      <div className="wrapperEditor px-6 md:px-0">
        <TextareaAutosize
          autoFocus
          id="title-field"
          name="title"
          defaultValue={post.title}
          placeholder="Post title"
          className="w-full resize-none appearance-none overflow-hidden bg-transparent text-3xl font-bold leading-tight focus:outline-none md:text-4xl"
        />
      </div>
      <EditorJs
        defaultValue={draf}
        holder={post.title}
        onInitialize={handleInitialize}
        handleSave={handleSave}
      />
      <button type="submit" value="simpan">
        simpan
      </button>
    </Form>
  )
}
