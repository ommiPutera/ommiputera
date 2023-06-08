import {useMatches} from '@remix-run/react'

function useMatchLoaderData<LoaderData>(handleId: string) {
  const matches = useMatches()
  const match = matches.find(({handle}) => handle?.id === handleId)
  if (!match) {
    throw new Error(`No active route has a handle ID of ${handleId}`)
  }
  return match.data as LoaderData
}

export {useMatchLoaderData}
