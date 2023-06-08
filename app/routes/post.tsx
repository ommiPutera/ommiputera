import type {Joke} from '@prisma/client'
import {type V2_MetaFunction, useLoaderData} from '@remix-run/react'
import {db} from '~/utils/db.server'

type LoaderData = {jokes: Array<Joke>}

export const loader = async () => {
  let jokes = await db.joke.findMany()
  let data: LoaderData = {jokes}
  return data
}

export const meta: V2_MetaFunction = ({matches}) => {
  return [{title: 'Post pages'}]
}

export default function Index() {
  const data = useLoaderData<LoaderData>()
  return (
    <div className="border border-red-500 px-5vw py-9 lg:px-15vw lg:py-12">
      <div className="text-primary mx-auto flex max-w-8xl items-center justify-between">
        <div>
          {data.jokes.map(joke => (
            <p key={joke.id}>{joke.name}</p>
          ))}
        </div>
      </div>
    </div>
  )
}
