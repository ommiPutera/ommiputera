import type { Project } from '@prisma/client'
import { type LoaderFunction } from '@remix-run/node'
import { useLoaderData, useNavigate, type V2_MetaFunction } from '@remix-run/react'
import React from 'react'
import { Button } from '~/components/button'
import { db } from '~/utils/db.server'

type LoaderData = { project: Project | null }

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

export default function Index() {
  const navigate = useNavigate()
  const data = useLoaderData<LoaderData>()
  const project = data.project

  return (
    <div className="px-4">
      <div className="flex items-center justify-between">
        <div className="w-20">
          <Button size="md" onClick={() => navigate(-1)}>
            Back
          </Button>
        </div>
        <div className="rounded-lg border border-green-200 bg-green-100 px-4 py-2.5">
          <h1 className="text-sm text-green-900">Create New Project</h1>
        </div>
      </div>
      <div className="pb-6 pt-12">
        <h1>TODO: Crete form.</h1>
        <h1>{project?.name}</h1>
      </div>
    </div>
  )
}
