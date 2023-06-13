import type {Project} from '@prisma/client'
import type {LoaderFunction} from '@remix-run/node'
import type {V2_MetaFunction} from '@remix-run/react'
import {useLoaderData} from '@remix-run/react'
import {tableUtils} from '~/components/table'
import {db} from '~/utils/db.server'
import {getUser} from '~/utils/session.server'

type LoaderData = {projects: Array<Project>}
type ColumnData = {name: string; key: string; className: string}

export const loader: LoaderFunction = async ({request}) => {
  const user = await getUser(request)
  const projects = await db.project.findMany({where: {userId: user?.id}})
  let data: LoaderData = {projects}
  return data
}

export const meta: V2_MetaFunction = () => {
  return [{title: 'Admin Panel - Manage Project'}]
}

export default function Index() {
  return (
    <div className="flex w-full flex-col gap-y-8 py-8 lg:gap-y-3 lg:py-4">
      <div className="px-6">
        <h3 className="leading-tigh text-xl font-medium">
          List Data Recent Project
        </h3>
        <p className="text-secondary mt-4 text-md font-light leading-tight lg:mt-2 lg:leading-relaxed">
          Monitoring is a powerful query editor that allows you to visualize and
          gain insight into bandwidth, errors, performance, traffic, Top Paths
          usage, and more across all projects.
        </p>
      </div>
      <div className="flex justify-end">
        <button>Create</button>
      </div>
      <Table />
    </div>
  )
}

function Table() {
  const data = useLoaderData<LoaderData>()
  const {sliceStr} = tableUtils

  const columns: ColumnData[] = [
    {name: 'Name', key: 'name', className: ''},
    {name: 'Description', key: 'description', className: ''},
    {name: 'Createdat', key: 'createdat', className: ''},
    {name: 'Updatedat', key: 'updatedat', className: ''},
    {name: 'Action', key: 'id', className: 'action'},
  ]

  return (
    <div className="wrapper-styled-table">
      <table
        border={0}
        cellSpacing="0"
        cellPadding="0"
        className="styled-table"
      >
        <thead>
          <tr>
            {columns.map(column => (
              <th key={column.key} className={column.className}>
                {column.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.projects.map(project => (
            <tr key={project.id}>
              {columns.map(column => (
                <td key={column.key} className={column.className}>
                  {project['name']}
                </td>
              ))}
              <td>{sliceStr(project.name)}</td>
              <td>{sliceStr(project.description)}</td>
              <td>{sliceStr(project.createdAt)}</td>
              <td>{sliceStr(project.updatedAt)}</td>
              <td className="action">Detail</td>
            </tr>
          ))}
        </tbody>
      </table>
      {!data.projects.length && (
        <div>
          <p className="no-data">No Project Found..</p>
        </div>
      )}
    </div>
  )
}
