import type { Project } from '@prisma/client'
import type { LoaderFunction } from '@remix-run/node'
import type { V2_MetaFunction } from '@remix-run/react'
import { useLoaderData } from '@remix-run/react'
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { tableUtils } from '~/components/table'
import { db } from '~/utils/db.server'
import { getUser } from '~/utils/session.server'

type LoaderData = { projects: Array<Project> }

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request)
  const projects = await db.project.findMany({ where: { userId: user?.id } })
  let data: LoaderData = { projects }
  return data
}

export const meta: V2_MetaFunction = () => {
  return [{ title: 'Admin Panel - Manage Project' }]
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

const { sliceStr } = tableUtils
const columnHelper = createColumnHelper<Project>();
const columns = [
  columnHelper.accessor("name", {
    cell: value => value.getValue(),
    header: "Name"
  }),
  columnHelper.accessor("description", {
    cell: value => value.getValue(),
    header: "Description"
  }),
  columnHelper.accessor("createdAt", {
    cell: value => value.getValue(),
    header: "CreatedAt"
  }),
  columnHelper.accessor("updatedAt", {
    cell: value => value.getValue(),
    header: "UpdatedAt"
  })
];

function Table() {
  const data = useLoaderData<LoaderData>()
  const options = {
    data: data.projects,
    columns: columns,
    getCoreRowModel: getCoreRowModel()
  }

  // @ts-expect-error 🤷‍♂️ no idea why defaultColumn isn't work ing here...
  const { getHeaderGroups, getRowModel } = useReactTable(options)

  return (
    <div className="wrapper-styled-table">
      <table
        border={0}
        cellSpacing="0"
        cellPadding="0"
        className="styled-table"
      >
        <thead>
          {getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
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
