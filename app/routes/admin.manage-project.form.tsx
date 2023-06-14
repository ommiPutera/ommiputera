import type { Project } from '@prisma/client'
import type { ActionFunction } from '@remix-run/node';
import { type LoaderFunction } from '@remix-run/node'
import {
  Form,
  Link,
  useActionData,
  useLoaderData,
  type V2_MetaFunction,
} from '@remix-run/react'
import clsx from 'clsx'
import React from 'react'
import { Button } from '~/components/button'
import { Input, Label } from '~/components/form-elements'
import { db } from '~/utils/db.server'
import { createProject, updateProject } from '~/utils/project.session';
import { getUserId } from '~/utils/session.server';

type LoaderData = { project: Project | null }
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
  return [{ title: 'Admin Panel - Form' }]
}

async function getLoaderData({ request }: { request: Request }) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  const project = await db.project.findUnique({ where: { id: id ?? '' } })
  return project
}

export const loader: LoaderFunction = async ({ request }) => {
  const project = await getLoaderData({ request })
  let data: LoaderData = { project }
  return data
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const actionType = formData.get("actionType");
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
    return { formError: 'Form not submitted correctly' }
  }

  let fields = { projectName, description, type, heroId, userId }
  switch (actionType) {
    case "create": {
      const project = await createProject({ ...fields })
      return project
    }
    case "updateAndRead": {
      const project = await updateProject({ projectId: projectId, ...fields })
      return project
    }
    default: {
      return { fields, formError: `Login type invalid` };
    }
  }
}

export default function Index() {
  const data = useLoaderData<LoaderData>()
  const project = data.project

  const isCreate = Boolean(!project)
  const isUpdateAndRead = Boolean(project)

  return (
    <div className="px-6 py-2">
      <div className="flex items-center justify-between">
        <div className="w-min">
          <Link to="/admin/manage-project" prefetch='intent'>
            <Button size="md">
              <span className='text-md mr-2'>↩️</span>
              Back
            </Button>
          </Link>
        </div>
        <div className={clsx("rounded-lg border px-4 py-2.5", {
          "border-green-200 bg-green-100 text-green-900": isCreate,
          "border-orange-300 bg-orange-100 text-orange-800": isUpdateAndRead,
        })}
        >
          <h1 className="text-md">{isUpdateAndRead ? "Update" : "Create"} New Project</h1>
        </div>
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

  let actionData = useActionData<ActionData | undefined>()
  const [submitted, setSubmitted] = React.useState(false)
  const [formValues, setFormValues] = React.useState({
    projectName: '',
    description: '',
    type: '',
    heroId: '',
    actionType: ''
  })

  const isCreate = Boolean(!project)
  const isUpdateAndRead = Boolean(project)
  const actionType = () => {
    if (isCreate) return 'create'
    if (isUpdateAndRead) return 'updateAndRead'
    return ''
  }

  return (
    <Form
      onChange={e => {
        const form = e.currentTarget
        setFormValues({
          projectName: form.projectName.value,
          description: form.description.value,
          type: form.type.value,
          heroId: form.heroId.value,
          actionType: actionType()
        })
        setSubmitted(false)
      }}
      method="POST"
      className="w-full"
      onSubmit={() => setSubmitted(true)}
    >
      <input type="hidden" name="actionType" value={actionType()} />
      <input type="hidden" name="projectId" value={project?.id || ""} />
      <div className='grid grid-cols-3 gap-x-4'>
        <div className='mb-3 col-span-1'>
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
        <div className='mb-3 col-span-1'>
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
              actionData?.fieldErrors?.type
                ? 'type-error'
                : undefined
            }
          />
        </div>
        <div className='mb-3 col-span-1'>
          <div className="mb-1.5 flex flex-wrap items-baseline justify-between">
            <Label htmlFor="name-field">Description</Label>
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
      <div className='grid grid-cols-3 gap-x-4'>
        <div className='mb-3 col-span-1'>
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
              actionData?.fieldErrors?.heroId
                ? 'heroId-error'
                : undefined
            }
          />
        </div>
      </div>
      <div className='w-full flex justify-end'>
        <div className='w-min'>
          <Button
            type="submit"
            size="md"
            className="mt-4"
          >
            {isCreate ? "Create" : "Update"}
            <span className='ml-2 text-md'>💣</span>
          </Button>
        </div>
      </div>
    </Form>
  )
}
