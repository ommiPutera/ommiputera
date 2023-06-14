import { useNavigate, type V2_MetaFunction } from '@remix-run/react'
import { Button } from '~/components/button'

export const meta: V2_MetaFunction = () => {
  return [{ title: 'Admin Panel - Create' }]
}

export default function Index() {
  const navigate = useNavigate()
  return (
    <div className="px-4">
      <div className='flex justify-between items-center'>
        <Button className='w-20' size="md" onClick={() => navigate(-1)}>Back</Button>
        <h1>Create</h1>
      </div>
      <div>
        <h1>create here</h1>
      </div>
    </div>
  )
}
