import { type V2_MetaFunction } from '@remix-run/react'

export const meta: V2_MetaFunction = ({ matches }) => {
  return [{ title: 'Post pages' }]
}

export default function Index() {
  return (
    <div className="border border-red-500 px-5vw py-9 lg:px-15vw lg:py-12">
      <div className="text-primary mx-auto flex max-w-7xl items-center justify-between">
        post
      </div>
    </div>
  )
}
