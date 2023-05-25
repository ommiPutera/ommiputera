import type {Joke} from '@prisma/client'
import {type V2_MetaFunction, useLoaderData} from '@remix-run/react'
import {db} from '~/utils/db.server'

type LoaderData = {jokes: Array<Joke>}

export const loader = async () => {
  let jokes = await db.joke.findMany()
  let data: LoaderData = {jokes}
  return data
}

export const meta: V2_MetaFunction = () => {
  return [{title: 'Post pages'}]
}

export default function Index() {
  const data = useLoaderData<LoaderData>()
  return (
    <div>
      {data.jokes.map(joke => (
        <p key={joke.id}>{joke.name}</p>
      ))}
    </div>
  )
}
