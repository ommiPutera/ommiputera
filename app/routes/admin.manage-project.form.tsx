import type {Project} from '@prisma/client'
import type {ActionFunction} from '@remix-run/node'
import {type LoaderFunction} from '@remix-run/node'
import {DialogOverlay, DialogContent} from '@reach/dialog'
import {
  Form,
  Link,
  useActionData,
  useLoaderData,
  type V2_MetaFunction,
} from '@remix-run/react'
import React from 'react'
import {Button} from '~/components/button'
import {Input, Label} from '~/components/form-elements'
import {db} from '~/utils/db.server'
import {createProject, updateProject} from '~/utils/project.session'
import {getUserId} from '~/utils/session.server'

type LoaderData = {project: Project | null}
type ActionData = {
  formError?: string
  fieldErrors?: {
    projectName: string | undefined
    type: string | undefined
    description: string | undefined
    heroId: string | undefined
  }
  fields?: {
    projectName: string
    type: string
    description: string
    heroId: string
  }
}

export const meta: V2_MetaFunction = () => {
  return [{title: 'Admin Panel - Form'}]
}

async function getLoaderData({request}: {request: Request}) {
  const {searchParams} = new URL(request.url)
  const id = searchParams.get('id')
  const project = await db.project.findUnique({where: {id: id ?? ''}})
  return project
}

export const loader: LoaderFunction = async ({request}) => {
  const project = await getLoaderData({request})
  let data: LoaderData = {project}
  return data
}

export const action: ActionFunction = async ({request}) => {
  const formData = await request.formData()
  const actionType = formData.get('actionType')
  const projectId = formData.get('projectId')
  const projectName = formData.get('projectName')
  const type = formData.get('type')
  const description = formData.get('description')
  const heroId = formData.get('heroId')
  const userId = await getUserId(request)
  if (
    typeof projectName !== 'string' ||
    typeof type !== 'string' ||
    typeof description !== 'string' ||
    typeof heroId !== 'string' ||
    typeof projectId !== 'string' ||
    typeof actionType !== 'string'
  ) {
    return {formError: 'Form not submitted correctly'}
  }

  console.log('actionType:................... ', actionType)
  let fields = {projectName, description, type, heroId, userId}
  switch (actionType) {
    case 'CREATE': {
      return await createProject({
        redirectTo: '/admin/manage-project',
        ...fields,
      })
    }
    case 'UPDATE': {
      return await updateProject({
        projectId: projectId,
        redirectTo: '/admin/manage-project',
        ...fields,
      })
    }
    case 'DELETE': {
      console.log('delete--------------------------------')
      return {fields, formError: `Login type invalid`}
    }
    default: {
      return {fields, formError: `Login type invalid`}
    }
  }
}

export default function Index() {
  const data = useLoaderData<LoaderData>()
  const project = data.project

  // const isCreate = Boolean(!project)
  const isUpdateAndRead = Boolean(project)

  return (
    <div className="px-6 py-2">
      <div className="flex items-center justify-between">
        <div className="w-min">
          <Link to="/admin/manage-project" prefetch="intent">
            <Button size="md">
              <span className="mr-2 text-md">↩️</span>
              Back
            </Button>
          </Link>
        </div>
        <h1 className="text-lg">
          {isUpdateAndRead ? 'Update Existing' : 'Create New'} Project
        </h1>
      </div>
      <div className="pb-6 pt-12">
        <FormAction />
      </div>
    </div>
  )
}

function FormAction() {
  const data = useLoaderData<LoaderData>()
  const project = data.project

  const [showDeleteModal, setShowDeleteModal] = React.useState(false)
  const openDeleteModal = () => setShowDeleteModal(true)
  const closeDeleteModal = () => setShowDeleteModal(false)

  let actionData = useActionData<ActionData>()
  const [submitted, setSubmitted] = React.useState(false)
  const [formValues, setFormValues] = React.useState({
    projectName: '',
    description: '',
    type: '',
    heroId: '',
  })

  const isCreate = Boolean(!project)

  return (
    <Form
      onChange={e => {
        const form = e.currentTarget
        setFormValues({
          projectName: form.projectName.value,
          description: form.description.value,
          type: form.type.value,
          heroId: form.heroId.value,
        })
        setSubmitted(false)
      }}
      method="POST"
      className="flex w-full flex-col gap-y-4"
      onSubmit={() => {
        setSubmitted(true)
      }}
    >
      <input type="hidden" name="projectId" value={project?.id || ''} />
      <div className="grid grid-cols-3 gap-x-6">
        <div className="col-span-1 mb-3">
          <div className="mb-1.5 flex flex-wrap items-baseline justify-between">
            <Label htmlFor="name-field">Name</Label>
          </div>
          <Input
            type="text"
            name="projectName"
            placeholder="Project Name"
            defaultValue={project?.name}
            id="projectName-field"
            aria-describedby={
              actionData?.fieldErrors?.projectName
                ? 'projectName-error'
                : undefined
            }
          />
        </div>
        <div className="col-span-1 mb-3">
          <div className="mb-1.5 flex flex-wrap items-baseline justify-between">
            <Label htmlFor="name-field">type</Label>
          </div>
          <Input
            type="text"
            name="type"
            defaultValue={project?.type}
            placeholder="type"
            id="type-field"
            aria-describedby={
              actionData?.fieldErrors?.type ? 'type-error' : undefined
            }
          />
        </div>
        <div className="col-span-1 mb-3">
          <div className="mb-1.5 flex flex-wrap items-baseline justify-between">
            <Label htmlFor="name-field">heroId</Label>
          </div>
          <Input
            type="text"
            name="heroId"
            defaultValue={project?.heroId}
            placeholder="heroId"
            id="heroId-field"
            aria-describedby={
              actionData?.fieldErrors?.heroId ? 'heroId-error' : undefined
            }
          />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-x-6">
        <div className="col-span-2 mb-3">
          <div className="mb-1.5 flex flex-wrap items-baseline justify-between">
            <Label htmlFor="name-field">Description</Label>
          </div>
          <Input
            type="textarea"
            name="description"
            defaultValue={project?.description}
            placeholder="description"
            id="description-field"
            aria-describedby={
              actionData?.fieldErrors?.description
                ? 'description-error'
                : undefined
            }
          />
        </div>
      </div>
      <div className="mt-8 flex w-full justify-end gap-x-4">
        <div className="w-min" hidden={isCreate}>
          <Button
            type="button"
            size="md"
            variant="danger"
            className="mt-4"
            onClick={openDeleteModal}
          >
            Delete Project
          </Button>
        </div>
        <div className="w-min">
          <Button
            type="submit"
            size="md"
            className="mt-4"
            name="actionType"
            value={isCreate ? 'CREATE' : 'UPDATE'}
          >
            {isCreate ? 'Create' : 'Update'}
          </Button>
        </div>
      </div>
      <DialogOverlay
        aria-label="Delete project"
        isOpen={showDeleteModal}
        onDismiss={closeDeleteModal}
        style={{backgroundColor: 'rgba(0, 0, 0, 0.682)'}}
        className="flex items-center"
      >
        <DialogContent className="flex max-w-[24vw] flex-col gap-y-6 rounded-md border border-gray-700 bg-black p-0">
          <div className="border-b border-gray-700 px-6 py-4 text-center">
            <h1 className="text-lg">Are you sure you want to delete?</h1>
          </div>
          <div className="px-6 py-4">
            <p className="text-secondary mt-4 text-md font-light leading-tight lg:mt-2 lg:leading-relaxed">
              Monitoring is a powerful query editor that allows you to visualize
              and gain insight into bandwidth, errors, performance, traffic, Top
              Paths usage, and more across all projects.
            </p>
          </div>
          <div className="flex w-full justify-between border-t border-gray-700 px-6 py-4">
            <Button
              size="md"
              type="button"
              className="w-min"
              onClick={closeDeleteModal}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="md"
              name="actionType"
              value="DELETE"
              className="w-min"
              variant="danger"
            >
              Yes, delete project
            </Button>
          </div>
        </DialogContent>
      </DialogOverlay>
    </Form>
  )
}
