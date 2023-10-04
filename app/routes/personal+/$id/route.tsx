import {PostStatus, type Post, PostType} from '@prisma/client'
import type {ActionFunction, LoaderArgs} from '@remix-run/node'
import {redirect} from '@remix-run/node'
import {Form, useActionData, useLoaderData} from '@remix-run/react'
import type {JSONContent} from '@tiptap/core'
import React from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import {useDebouncedCallback} from 'use-debounce'
import {
  createPost,
  deletePost,
  getPost,
  updateContent,
  updateTitle,
  updateStatusPost,
  updateTypePost,
} from '~/utils/post.session'
import {useUser} from '~/utils/use-root-data'
import {OutletCenter, OutletRight, WrapperOutlet} from '../_layout'
import {Header} from './misc'
import SidePage from './sidepage'
// @ts-ignore
import {Check, ChevronsUpDownIcon, icons} from 'lucide-react'
import {Listbox, Transition} from '@headlessui/react'
import {format} from 'date-fns'
import {capitalize} from 'lodash'
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
  UPDATE_STATUS = 'UPDATE_STATUS',
  UPDATE_TYPE = 'UPDATE_TYPE',
  DELETE = 'DELETE',
}

export const loader = async ({request, params}: LoaderArgs) => {
  const {id} = params
  const post = await getPost({id: id ?? ''})
  if (id === 'new') return {postId: id, isNewPage: true}

  if (!id || !post) return redirect('/personal')
  const data: LoaderData = {post, postId: id, isNewPage: false}
  return data
}

export const action: ActionFunction = async ({request}) => {
  const formData = await request.formData()
  const formPayload = Object.fromEntries(formData)

  switch (formPayload._action) {
    case FormType.UPDATE_STATUS: {
      if (typeof formPayload.postId !== 'string') {
        return {formError: `Form not submitted correctly.`}
      }
      if (
        formPayload.status === PostStatus.COMPLETED ||
        formPayload.status === PostStatus.NOT_STARTED ||
        formPayload.status === PostStatus.UNDERWAY
      ) {
        const post = await updateStatusPost({
          id: formPayload.postId,
          status: formPayload.status,
        })
        return {post}
      } else {
        return {formError: `Form not submitted correctly.`}
      }
    }
    case FormType.UPDATE_TYPE: {
      if (typeof formPayload.postId !== 'string') {
        return {formError: `Form not submitted correctly.`}
      }
      if (
        formPayload.type === PostType.BASIC_NOTES ||
        formPayload.type === PostType.MONTHLY_PLANNING
      ) {
        const post = await updateTypePost({
          id: formPayload.postId,
          type: formPayload.type,
        })
        return {post}
      } else {
        return {formError: `Form not submitted correctly.`}
      }
    }
    case FormType.DELETE: {
      if (typeof formPayload.postId !== 'string') {
        return {formError: `Form not submitted correctly.`}
      }
      await deletePost({id: formPayload.postId})
      return redirect('/personal', {})
    }
    case FormType.CREATE: {
      if (typeof formPayload.authorId !== 'string') {
        return {formError: `Form not submitted correctly.`}
      }
      let content
      if (formPayload.postJSON) {
        // @ts-ignore
        content = JSON.parse(postJSON)
      } else {
        content = JSON.parse(JSON.stringify({blocks: ['none']}))
      }
      return await createPost({
        title: formPayload.title
          ? String(formPayload.title)
          : 'Untitled Page...',
        authorId: formPayload.authorId,
        isPublished: true,
        content,
        redirectTo: '/personal/',
      })
    }
    case FormType.UPDATE_TITLE: {
      if (
        typeof formPayload.title !== 'string' ||
        typeof formPayload.postId !== 'string'
      ) {
        return {formError: `Form not submitted correctly.`}
      }
      const post = await updateTitle({
        id: formPayload.postId,
        title: formPayload.title,
      })
      return {post}
    }
    case FormType.UPDATE_CONTENT: {
      if (
        typeof formPayload.postId !== 'string' ||
        typeof formPayload.postJSON !== 'string'
      ) {
        return {formError: `Form not submitted correctly.`}
      }
      return await updateContent({
        id: formPayload.postId,
        content: JSON.parse(formPayload.postJSON),
      })
    }
    default: {
      return {formError: `Action type invalid`}
    }
  }
}

export default function Index() {
  const {post, postId} = useLoaderData<LoaderData>()
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

const optsStatus: string[] = [
  PostStatus.COMPLETED,
  PostStatus.NOT_STARTED,
  PostStatus.UNDERWAY,
]
const optsType: string[] = [PostType.BASIC_NOTES, PostType.MONTHLY_PLANNING]

function PageData() {
  const {post, postId} = useLoaderData<LoaderData>()
  if (!post) return <></>
  return (
    <div className="my-3 flex flex-col gap-1.5">
      <Form method="POST" className="w-full">
        <PageDataItem
          name="Status"
          iconName="ChevronDownSquare"
          value={post.status.toString()}
          options={optsStatus}
          payloadName="status"
        />
        <input type="hidden" name="_action" value={FormType.UPDATE_STATUS} />
        <input type="hidden" name="postId" value={postId} />
      </Form>
      <Form method="POST" className="w-full">
        <PageDataItem
          name="Type"
          iconName="ChevronDownSquare"
          value={post.type.toString()}
          options={optsType}
          payloadName="type"
        />
        <input type="hidden" name="_action" value={FormType.UPDATE_TYPE} />
        <input type="hidden" name="postId" value={postId} />
      </Form>
      <PageDataItem
        name="Created"
        iconName="Clock10"
        readOnly
        value={format(new Date(post.createdAt), 'MMMM dd, yyyy mm:ss')}
      />
    </div>
  )
}

function PageDataItem({
  name,
  iconName,
  payloadName,
  readOnly = false,
  options = [],
  value,
}: {
  name: string
  iconName: string
  payloadName?: string
  readOnly?: boolean
  options?: string[]
  value: string | Date
}) {
  const LucideIcon = icons[iconName]
  return (
    <div className="flex items-center">
      <div className="flex items-center gap-2">
        <LucideIcon size={14} strokeWidth={2.5} className="text-gray-300" />
        <p className="w-[70px] text-sm font-medium text-gray-300">{name}</p>
      </div>
      {readOnly ? (
        <div className="flex h-[30px] items-center">
          <p className="pl-2 text-sm font-medium text-gray-500 dark:text-gray-100">
            {value.toString()}
          </p>
        </div>
      ) : (
        <Select value={value} items={options} payloadName={payloadName ?? ''} />
      )}
    </div>
  )
}

function Select({
  value,
  items,
  payloadName,
}: {
  value: string | Date
  items: string[]
  payloadName: string
}) {
  const [selected, setSelected] = React.useState(value)

  return (
    <>
      <input type="hidden" name={payloadName} value={selected.toString()} />
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative -ml-1 h-[30px]">
          <Listbox.Button className="dark:active::bg-gray-800 active::bg-gray-100/50: sm:text-sm relative w-full cursor-default rounded-sm bg-transparent py-1 pl-3 pr-8 text-left focus:bg-gray-100/50 focus:outline-none focus-visible:border-none focus-visible:ring-0 dark:focus:bg-gray-800">
            <p className="pointer-events-none text-sm font-medium text-gray-500 dark:text-gray-100">
              {capitalize(selected.toString()).replace(/_/g, ' ')}
            </p>
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
            <Listbox.Options className="sm:text-sm absolute z-50  mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-100 bg-white bg-white/[0.65] p-0 py-1 text-base shadow-lg backdrop-blur-lg focus:outline-none dark:border-gray-800 dark:bg-gray-900/[0.65] dark:backdrop-blur-lg">
              {items.map(item => (
                <Listbox.Option
                  as="button"
                  type="submit"
                  key={item}
                  className={({selected}) =>
                    clsx(
                      'relative flex w-full min-w-[120px] cursor-pointer items-center justify-between gap-12 px-3 py-1',
                      {
                        'bg-green-900 hover:bg-green-900/90 dark:hover:bg-green-900/40':
                          selected,
                        'hover:bg-gray-100 hover:dark:bg-gray-800': !selected,
                      },
                    )
                  }
                  value={item}
                >
                  {({selected}) => (
                    <>
                      <span
                        className={clsx(
                          'block truncate text-sm font-normal text-gray-500 dark:text-gray-100',
                          {
                            'text-white': selected,
                          },
                        )}
                      >
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
    </>
  )
}
