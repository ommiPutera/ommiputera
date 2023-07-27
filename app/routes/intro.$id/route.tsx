import {type LoaderArgs} from '@remix-run/node'
import {useLoaderData, type V2_MetaFunction} from '@remix-run/react'
import Cashflow from './cashflow'
import React from 'react'
import {FourOhFour} from '~/components/errors'

enum IntroType {
  CASHFLOW = 'cashflow',
}

type LoaderData = {
  introId?: string
}

export const meta: V2_MetaFunction = ({matches}) => {
  return [{title: 'Cash Flow Managament'}]
}

export const loader = async ({request, params}: LoaderArgs) => {
  const {id} = params
  const data: LoaderData = {introId: id}
  return data
}

export default function Index() {
  const {introId} = useLoaderData<LoaderData>()
  switch (introId) {
    case IntroType.CASHFLOW: {
      return <Cashflow />
    }
    default: {
      return <FourOhFour />
    }
  }
}

// export function ErrorBoundary() {
//   const error = useRouteError()
//   if (isRouteErrorResponse(error)) {
//     console.error('CatchBoundary', error)
//     if (error.data.blogRecommendations) {
//       return <FourOhFour />
//     }
//     throw new Error(`Unhandled error: ${error.status}`)
//   }
// }
