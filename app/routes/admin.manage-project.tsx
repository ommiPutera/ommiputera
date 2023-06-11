import type { Joke } from '@prisma/client';
import type { V2_MetaFunction } from '@remix-run/react';
import { useLoaderData } from '@remix-run/react';
import { db } from '~/utils/db.server';

type LoaderData = {jokes: Array<Joke>}

export const loader = async () => {
  let jokes = await db.joke.findMany()
  let data: LoaderData = {jokes}
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
      <Table />
    </div>
  )
}

function Table() {
  const data = useLoaderData<LoaderData>()
  const sliceStr = (str: string, max?: number) => {
    let MAX_CHAR = max ?? 22
    if (str.length > MAX_CHAR) return str.slice(0, MAX_CHAR).trim() + '..'
    return str
  }

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
            <th>Content</th>
            <th>Name</th>
            <th>Createdat</th>
            <th>Updatedat</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.jokes.map(joke => (
            <tr key={joke.id}>
              <td>{sliceStr(joke.content)}</td>
              <td>{sliceStr(joke.name)}</td>
              <td>{sliceStr(joke.createdAt)}</td>
              <td>{sliceStr(joke.updatedAt)}</td>
              <td>Detail</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
