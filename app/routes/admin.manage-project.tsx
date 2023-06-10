import type { Joke } from "@prisma/client"
import { useLoaderData } from "@remix-run/react"
import { db } from '~/utils/db.server'

type LoaderData = { jokes: Array<Joke> }

export const loader = async () => {
  let jokes = await db.joke.findMany()
  let data: LoaderData = { jokes }
  return data
}


function Index() {
  return (
    <div className="pt-3 pb-4 w-full flex flex-col gap-y-3">
      <div className="px-6 ">
        <h3 className="font-medium leading-tigh text-xl">List Data Recent Project</h3>
        <p className="text-md text-secondary leading-relaxed font-light mt-2">Monitoring is a powerful query editor that allows you to visualize and gain insight into bandwidth, errors, performance, traffic, Top Paths usage, and more across all projects.</p>
      </div>
      <Table />
    </div>
  )
}

function Table() {
  const data = useLoaderData<LoaderData>()
  const sliceStr = (str: string, max?: number) => {
    let MAX_CHAR = max ?? 32;
    if (str.length > MAX_CHAR) return str.slice(0, MAX_CHAR).trim() + ".."
    return str
  }

  return (
    <div className="wrapper-styled-table">
      <table border={0} cellSpacing="0" cellPadding="0" className="styled-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Content</th>
            <th>Createdat</th>
            <th>Updatedat</th>
          </tr>
        </thead>
        <tbody>
          {data.jokes.map(joke => (
            <tr key={joke.id}>
              <td>{sliceStr(joke.name)}</td>
              <td>{sliceStr(joke.content)}</td>
              <td>{sliceStr(joke.createdAt)}</td>
              <td>{sliceStr(joke.updatedAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Index