import type { Post } from '@prisma/client'
import type { ActionFunction, LoaderArgs } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { Form, useActionData, useLoaderData } from '@remix-run/react'
import type { JSONContent } from '@tiptap/core'
import React from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import { useDebouncedCallback } from 'use-debounce'
// import Editor from '~/components/editor'
import {
  createPost,
  deletePost,
  getPost,
  updateContent,
  updateTitle,
} from '~/utils/post.session'
import { useUser } from '~/utils/use-root-data'
import { OutletCenter, OutletRight, WrapperOutlet } from '../_layout'
import { Header } from './misc'
import SidePage from './sidepage'
// @ts-ignore
import { Check, ChevronsUpDownIcon, icons } from 'lucide-react'
import { Listbox, Transition } from '@headlessui/react'
import { format } from 'date-fns'
import { capitalize } from 'lodash'
import clsx from 'clsx'

const Editor = React.lazy(async () => await import('~/components/editor'))

export type SaveStatus = 'Saved' | 'Unsaved' | 'Saving..'
type LoaderData = {
  post?: Post | null
  postId?: string
  isNewPage: boolean
}
type ActionData = {
  formError?: string
  fieldErrors?: {
    title: string | undefined
  }
  post?: Post
  fields?: {
    title?: string
    postJSON?: string
  }
  formMessage?: string
}

export enum FormType {
  CREATE = 'CREATE',
  UPDATE_TITLE = 'UPDATE_TITLE',
  UPDATE_CONTENT = 'UPDATE_CONTENT',
  DELETE = 'DELETE',
}

export const loader = async ({ request, params }: LoaderArgs) => {
  const { id } = params
  const post = await getPost({ id: id ?? '' })
  if (id === 'new') return { postId: id, isNewPage: true }

  if (!id || !post) return redirect('/personal')
  const data: LoaderData = { post, postId: id, isNewPage: false }
  return data
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const { _action, postId, title, authorId, postJSON } =
    Object.fromEntries(formData)

  switch (_action) {
    case FormType.DELETE: {
      if (typeof postId !== 'string') {
        return { formError: `Form not submitted correctly.` }
      }
      await deletePost({ id: postId })
      return redirect('/personal', {})
    }
    case FormType.CREATE: {
      if (typeof authorId !== 'string') {
        return { formError: `Form not submitted correctly.` }
      }
      let content
      if (postJSON) {
        // @ts-ignore
        content = JSON.parse(postJSON)
      } else {
        content = JSON.parse(JSON.stringify({ blocks: ['none'] }))
      }
      return await createPost({
        title: title ? String(title) : 'Untitled Page...',
        authorId,
        isPublished: true,
        content,
        redirectTo: '/personal/',
      })
    }
    case FormType.UPDATE_TITLE: {
      if (typeof title !== 'string' || typeof postId !== 'string') {
        return { formError: `Form not submitted correctly.` }
      }
      const post = await updateTitle({
        id: postId,
        title,
      })
      return { post }
    }
    case FormType.UPDATE_CONTENT: {
      if (typeof postId !== 'string' || typeof postJSON !== 'string') {
        return { formError: `Form not submitted correctly.` }
      }
      return await updateContent({
        id: postId,
        content: JSON.parse(postJSON),
      })
    }
    default: {
      return { formError: `Action type invalid` }
    }
  }
}

export default function Index() {
  const { post, postId } = useLoaderData<LoaderData>()
  const submitContentRef = React.useRef<HTMLInputElement>(null)
  const titletRef = React.useRef<HTMLTextAreaElement>(null)
  const submitTitleRef = React.useRef<HTMLInputElement>(null)
  const [isEditorFocus, setIsEditorFocus] = React.useState<boolean>(false)
  const [saveStatus, setSaveStatus] = React.useState<SaveStatus>('Saved')
  const [content, setContent] = React.useState<JSONContent | null>(
    // @ts-ignore
    post?.content,
  )
  const [pageTitle, setPageTitle] = React.useState(post?.title)

  const actionData = useActionData<ActionData>()
  const user = useUser()

  const submitTitleDebounce = useDebouncedCallback(() => {
    if (submitTitleRef.current) {
      submitTitleRef.current.click()
    }
  }, 750)

  const submitContentDebounce = useDebouncedCallback(() => {
    submitContent()
  }, 750)

  const submitContent = React.useCallback(() => {
    if (submitContentRef.current) {
      submitContentRef.current.click()
    }
  }, [])

  const alertUser = React.useCallback(
    (event: any) => {
      event.preventDefault()
      if (saveStatus === 'Unsaved') {
        event.returnValue = ''
      }
    },
    [saveStatus],
  )

  React.useEffect(() => {
    window.addEventListener('beforeunload', alertUser)
    window.addEventListener('unload', () => {
      submitContent()
      submitTitleDebounce()
    })
    return () => {
      window.removeEventListener('beforeunload', alertUser)
      window.removeEventListener('unload', () => {
        submitContent()
        submitTitleDebounce()
      })
    }
  }, [alertUser, submitContent, submitTitleDebounce])

  return (
    <WrapperOutlet>
      <OutletCenter>
        <Header
          type={postId === 'new' ? FormType.CREATE : FormType.UPDATE_CONTENT}
          title={pageTitle}
          saveStatus={saveStatus}
          submitContent={submitContent}
        />
        <div className="mx-auto my-0 mt-6 w-full justify-between gap-x-8 px-4 pb-[30vh] lg:mt-20 lg:px-20">
          <div className="relative h-auto w-full">
            <Form method="POST" className="w-full" action=".">
              <div className="">
                <TextareaAutosize
                  ref={titletRef}
                  autoFocus={pageTitle ? false : true}
                  id="title-field"
                  name="title"
                  onChange={e => {
                    submitTitleDebounce()
                    setPageTitle(e.target.value)
                  }}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === 'ArrowDown') {
                      e.preventDefault()
                      setIsEditorFocus(true)
                    }
                  }}
                  onFocus={() => {
                    setIsEditorFocus(false)
                  }}
                  defaultValue={post?.title}
                  placeholder="Untitled"
                  className="w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold leading-tight text-gray-500 focus:outline-none dark:text-gray-100"
                />
              </div>
              <input
                type="hidden"
                name="_action"
                value={
                  postId === 'new' ? FormType.CREATE : FormType.UPDATE_TITLE
                }
              />
              <input ref={submitTitleRef} type="submit" className="hidden" />
              <input type="hidden" name="authorId" value={user?.id} />
              <input
                type="hidden"
                name="postId"
                value={postId ?? actionData?.post?.id}
              />
            </Form>
            <PageData />
            <Form method="POST" className="w-full">
              <div className="pt-14 lg:pt-0">
                <React.Suspense fallback={<div>Loading...</div>}>
                  <Editor
                    titletEl={titletRef}
                    focus={isEditorFocus}
                    content={content}
                    setContent={setContent}
                    setSaveStatus={setSaveStatus}
                    submit={submitContentDebounce}
                  />
                </React.Suspense>
              </div>
              <input
                type="hidden"
                name="_action"
                value={
                  postId === 'new' ? FormType.CREATE : FormType.UPDATE_CONTENT
                }
              />
              <input type="hidden" name="authorId" value={user?.id} />
              <input ref={submitContentRef} type="submit" className="hidden" />
              <input
                defaultValue={JSON.stringify(content)}
                type="hidden"
                name="postJSON"
              />
              <input
                type="hidden"
                name="postId"
                value={postId ?? actionData?.post?.id}
              />
            </Form>
          </div>
        </div>
      </OutletCenter>
      <OutletRight>
        <SidePage title={pageTitle} content={content} />
      </OutletRight>
    </WrapperOutlet>
  )
}

function PageData() {
  const { post } = useLoaderData<LoaderData>()
  if (!post) return <></>
  return (
    <Form>
      <div className="flex flex-col gap-1.5 my-3">
        <PageDataItem
          name="Status"
          iconName='ChevronDownSquare'
          value={post.status.toString()}
        />
        <PageDataItem
          name="Created"
          iconName='Clock10'
          readOnly
          value={format(new Date(post.createdAt), 'MMMM dd, yyyy mm:ss')}
        />
      </div>
    </Form>
  )
}

function PageDataItem({
  name,
  iconName,
  readOnly = false,
  value
}: {
  name: string,
  iconName: string,
  readOnly?: boolean,
  value: string | Date
}) {
  const LucideIcon = icons[iconName]

  return (
    <div className="flex items-center">
      <div className="flex items-center gap-2">
        <LucideIcon size={14} strokeWidth={2.5} className="text-gray-300" />
        <p className="w-[70px] text-sm font-medium text-gray-300">
          {name}
        </p>
      </div>
      {readOnly ?
        <p className='pl-2 text-sm font-medium text-gray-500 dark:text-gray-100'>{value.toString()}</p>
        :
        <Select value={value} items={arrStatus} />
      }
    </div>
  )
}

const arrStatus: string[] = ['COMPLETED', 'NOT_STARTED', 'UNDERWAY']

function Select({ value, items }: { value: string | Date, items: string[] }) {
  const [selected, setSelected] = React.useState(value)

  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className="relative -ml-1">
        <Listbox.Button className="relative w-full cursor-default rounded-sm bg-transparent py-1 pl-3 pr-8 text-left focus:outline-none focus-visible:border-none focus:bg-gray-100/50 dark:focus:bg-gray-800 dark:active::bg-gray-800 active::bg-gray-100/50: focus-visible:ring-0 sm:text-sm">
          <p className="pointer-events-none text-sm text-gray-500 dark:text-gray-100 font-medium">{capitalize(selected.toString()).replace(/_/g, ' ')}</p>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronsUpDownIcon
              strokeWidth={2.5}
              className="h-4 w-4 text-gray-500 dark:text-gray-100"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Transition
          as={React.Fragment}
          leave="transition ease-in duration-100 w-full"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="z-50 absolute mt-1  bg-white/[0.65] dark:border-gray-800 dark:bg-gray-900/[0.65] dark:backdrop-blur-lg p-0 shadow-lg backdrop-blur-lg max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base border border-gray-100 focus:outline-none sm:text-sm">
            {items.map((item) => (
              <Listbox.Option
                key={item}
                className={({ selected }) => clsx('relative px-3 py-1 flex w-full min-w-[120px] items-center justify-between gap-12 cursor-pointer', {
                  "bg-green-900 hover:bg-green-900/90 dark:hover:bg-green-900/40": selected,
                  "hover:bg-gray-100 hover:dark:bg-gray-800": !selected
                })}
                value={item}
              >
                {({ selected, }) => (
                  <>
                    <span className={clsx('block truncate text-sm text-gray-500 dark:text-gray-100 font-normal', {
                      'text-white': selected
                    })}>
                      {capitalize(item).replace(/_/g, ' ')}
                    </span>
                    {selected ? (
                      <Check
                        className="visually-hidden text-white"
                        aria-hidden={!selected}
                        size={16}
                        strokeWidth={2.5}
                      />
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  )
}