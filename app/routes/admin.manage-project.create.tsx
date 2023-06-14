import {useNavigate, type V2_MetaFunction} from '@remix-run/react'
import {Button} from '~/components/button'

export const meta: V2_MetaFunction = () => {
  return [{title: 'Admin Panel - Create'}]
}

export default function Index() {
  const navigate = useNavigate()
  return (
    <div className="px-4">
      <div className="flex items-center justify-between">
        <div className="w-20">
          <Button size="md" onClick={() => navigate(-1)}>
            Back
          </Button>
        </div>
        <div className="rounded-lg bg-green-100 px-4 py-2">
          <h1 className="text-sm text-green-900">Create New Project</h1>
        </div>
      </div>
      <div className="pb-6 pt-12">
        <h1>TODO: Crete form.</h1>
      </div>
    </div>
  )
}
