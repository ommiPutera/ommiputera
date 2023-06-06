import {handle, type LoaderData} from '~/root'
import {useMatchLoaderData} from './providers'

export const useRootData = () => useMatchLoaderData<LoaderData>(handle.id)

export function useUser() {
  const {user} = useRootData()
  if (!user) throw new Error('User is required when using useUser')
  return user
}
