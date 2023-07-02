import {type V2_MetaFunction} from '@remix-run/react'
import type {LoaderFunction} from '@remix-run/node'
import {requireUserSession} from '~/utils/session.server'

export const meta: V2_MetaFunction = ({matches}) => {
  return [{title: 'Cash Flow Managament'}]
}

export const loader: LoaderFunction = async ({request}) => {
  const user = await requireUserSession(request)
  if (!user) {
    throw new Response('Unauthorized', {status: 401})
  }
  return {}
}

export default function Index() {
  return (
    <div className="text-primary relative mx-auto grid w-full max-w-8xl gap-5 py-4 lg:gap-y-16 lg:py-12">
      Index App
    </div>
  )
}
