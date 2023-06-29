import type {Project} from '@prisma/client'
import type {ActionFunction} from '@remix-run/node'
import {type LoaderFunction} from '@remix-run/node'
import {DialogOverlay, DialogContent} from '@reach/dialog'
import {
  Form,
  Link,
  useActionData,
  useLoaderData,
  useNavigation,
  type V2_MetaFunction,
} from '@remix-run/react'
import React from 'react'
import {Button} from '~/components/button'
import {Input, Label} from '~/components/form-elements'
import {db} from '~/utils/db.server'
import {
  createProject,
  deleteProject,
  updateProject,
} from '~/utils/project.session'
import {getUserId} from '~/utils/session.server'

type LoaderData = {project: Project | null}
type ActionData = {
  formError?: string
  fieldErrors?: {
    projectName: string | undefined
    type: string | undefined
    description: string | undefined
    heroId: string | undefined
    liveLink: string | undefined
    content: string | undefined
  }
  fields?: {
    projectName: string
    type: string
    description: string
    heroId: string
    liverLink: string
    content: string
  }
}
enum ActionEnums {
  DELETE = 'DELETE',
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
}

export const meta: V2_MetaFunction = () => {
  return [{title: 'Manage Project - Form'}]
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
  const userId = await getUserId(request)
  const formData = await request.formData()
  const {
    _action,
    projectId,
    projectName,
    type,
    description,
    heroId,
    liveLink,
    content,
  } = Object.fromEntries(formData)

  if (typeof projectId !== 'string') {
    return {formError: 'Form not submitted correctly'}
  }
  if (_action === ActionEnums.DELETE) {
    return await deleteProject(projectId, '/admin/manage-project')
  }

  if (
    typeof projectName !== 'string' ||
    typeof type !== 'string' ||
    typeof description !== 'string' ||
    typeof heroId !== 'string' ||
    typeof projectId !== 'string' ||
    typeof liveLink !== 'string' ||
    typeof content !== 'string'
  ) {
    return {formError: 'Form not submitted correctly'}
  }
  const fields = {
    projectName,
    description,
    type,
    heroId,
    userId,
    liveLink,
    content,
  }
  switch (_action) {
    case ActionEnums.CREATE: {
      return await createProject({
        redirectTo: '/admin/manage-project',
        ...fields,
      })
    }
    case ActionEnums.UPDATE: {
      return await updateProject({
        projectId: projectId,
        redirectTo: '/admin/manage-project',
        ...fields,
      })
    }
    default: {
      return {fields, formError: `Action type invalid`}
    }
  }
}

export default function Index() {
  const data = useLoaderData<LoaderData>()
  const project = data.project

  const isUpdateAndRead = Boolean(project)

  return (
    <div className="px-6 py-2">
      <div className="flex items-center justify-between">
        <div className="w-min">
          <Link to="/admin/manage-project" prefetch="intent">
            <Button size="md" type="button">
              <span className="mr-2 text-md">↩️</span>
              Back
            </Button>
          </Link>
        </div>
        <h1 className="text-md lg:text-lg">
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
  const navigation = useNavigation()
  const data = useLoaderData<LoaderData>()
  const project = data.project

  const [isShowDeleteModal, setIsShowDeleteModal] = React.useState(false)
  const openDeleteModal = () => setIsShowDeleteModal(true)
  const closeDeleteModal = () => setIsShowDeleteModal(false)

  let actionData = useActionData<ActionData>()
  const [submitted, setSubmitted] = React.useState(false)
  const [formValues, setFormValues] = React.useState({
    projectName: '',
    description: '',
    type: '',
    heroId: '',
    liveLink: '',
    content: '',
  })
  let formIsValid =
    (formValues.projectName !== project?.name && formValues.projectName) ||
    (formValues.description !== project?.description &&
      formValues.description) ||
    (formValues.type !== project?.type && formValues.type) ||
    (formValues.heroId !== project?.heroId && formValues.heroId) ||
    (formValues.liveLink !== project?.liveLink && formValues.liveLink) ||
    (formValues.content !== project?.content && formValues.content)

  const isCreate = Boolean(!project)
  const getLabelCreateOrUpdate = () => {
    if (navigation.state === 'loading')
      return 'Redirecting to /manage-project..'
    if (isCreate) {
      if (navigation.state === 'submitting') return 'Creating your project..'
      return 'Create'
    } else {
      if (navigation.state === 'submitting') return 'Updating your project..'
      return 'Update'
    }
  }

  return (
    <>
      <Form
        onChange={e => {
          const form = e.currentTarget
          setFormValues({
            projectName: form.projectName.value,
            description: form.description.value,
            type: form.type.value,
            heroId: form.heroId.value,
            liveLink: form.liveLink.value,
            content: form.content.value,
          })
        }}
        method="POST"
        className="flex w-full flex-col gap-y-4"
        onSubmit={() => {
          setSubmitted(true)
        }}
      >
        <input type="hidden" name="projectId" value={project?.id || ''} />
        <div className="grid grid-cols-1 gap-x-6 lg:grid-cols-3">
          <div className="col-span-1 mb-3">
            <div className="mb-1.5 flex flex-wrap items-baseline justify-between">
              <Label htmlFor="projectName-field">Project Name</Label>
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
              <Label htmlFor="type-field">Project Type</Label>
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
              <Label htmlFor="heroId-field">Hero Id</Label>
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
        <div className="grid grid-cols-1 gap-x-6 lg:grid-cols-3">
          <div className="col-span-1 mb-3">
            <div className="mb-1.5 flex flex-wrap items-baseline justify-between">
              <Label htmlFor="liveLink-field">Live URL</Label>
            </div>
            <Input
              type="text"
              name="liveLink"
              defaultValue={project?.liveLink}
              placeholder="liveLink"
              id="liveLink-field"
              aria-describedby={
                actionData?.fieldErrors?.liveLink ? 'liveLink-error' : undefined
              }
            />
          </div>
          <div className="col-span-1 mb-3 lg:col-span-2">
            <div className="mb-1.5 flex flex-wrap items-baseline justify-between">
              <Label htmlFor="description-field">Description</Label>
            </div>
            <Input
              type="text"
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
        <div className="grid grid-cols-1 gap-x-6">
          <div className="col-span-1 mb-3">
            <div className="mb-1.5 flex flex-wrap items-baseline justify-between">
              <Label htmlFor="description-field">Content</Label>
            </div>
            <Input
              type="textarea"
              name="content"
              rows={15}
              defaultValue={project?.content}
              placeholder="content"
              id="content-field"
              aria-describedby={
                actionData?.fieldErrors?.content ? 'content-error' : undefined
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
              disabled={submitted}
            >
              Delete Project
            </Button>
          </div>
          <div className="w-min">
            <Button
              type="submit"
              size="md"
              className="mt-4"
              name="_action"
              disabled={!formIsValid || submitted}
              value={isCreate ? ActionEnums.CREATE : ActionEnums.UPDATE}
            >
              {getLabelCreateOrUpdate()}
            </Button>
          </div>
        </div>
      </Form>
      <DialogOverlay
        aria-label="Delete project"
        isOpen={isShowDeleteModal}
        onDismiss={closeDeleteModal}
        style={{backgroundColor: 'rgba(0, 0, 0, 0.682)'}}
        className="flex w-full items-center"
      >
        <DialogContent className="mx-4 flex w-full max-w-[100vw] flex-col gap-y-6 rounded-lg border border-gray-700 bg-black p-0 lg:mx-auto lg:max-w-[24vw]">
          <Form method="POST">
            <input type="hidden" name="projectId" value={project?.id || ''} />
            <div className="border-b border-gray-700 px-6 py-4 text-center">
              <h1 className="text-lg">Are you sure you want to delete?</h1>
            </div>
            <div className="px-6 py-4">
              <p className="text-secondary mt-4 text-md font-light leading-tight lg:mt-2 lg:leading-relaxed">
                Monitoring is a powerful query editor that allows you to
                visualize and gain insight into bandwidth, errors, performance,
                traffic, Top Paths usage, and more across all projects.
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
                name="_action"
                value={ActionEnums.DELETE}
                className="w-min"
                variant="danger"
              >
                Yes, delete project
              </Button>
            </div>
          </Form>
        </DialogContent>
      </DialogOverlay>
    </>
  )
}
