import type {Joke} from '@prisma/client'
import {type V2_MetaFunction, useLoaderData} from '@remix-run/react'
import { db } from '~/utils/db.server'

type LoaderData = {jokes: Array<Joke>}

export const loader = async () => {
  let jokes = await db.joke.findMany()
  let data: LoaderData = {jokes}
  return data
}

export const meta: V2_MetaFunction = ({matches}) => {
  const parentMeta = matches.flatMap(match => match.meta ?? [])
  const domain = parentMeta.flatMap(match => match ?? [])
  console.log(domain)
  return [{title: `Login to`}]
}

export default function Index() {
  const data = useLoaderData<LoaderData>()
  return (
    <div className="px-5vw py-9 lg:px-15vw lg:py-12">
      <div className="flex flex-col items-center justify-center gap-5">
        <h1 className="px-0 text-center text-3xl font-medium leading-tight md:w-2/3 lg:px-9 lg:text-5xl xl:w-3/5">
          Log in to your account.
        </h1>
        <p className="mt-2 px-0 text-center font-medium text-gray-300 md:w-2/3 lg:mt-0 lg:px-9 xl:w-3/5">
          2 years of proven experience in helping to create and maintain a
          better code base for re-usability and best practices. Experience in
          developing projects from concept to launch. Eager to tackle more
          complex problems, and continues to find ways to maximize user
          efficiency
        </p>
      </div>
    </div>
  )
}
