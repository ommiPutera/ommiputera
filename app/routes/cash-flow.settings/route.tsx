import { ButtonLink } from '~/components/button'
import { LayoutTitle } from '../cash-flow._index/misc'
import { MoveLeftIcon } from 'lucide-react'

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900">
      <LayoutTitle title="Settings" subTitle='atomic CSS and recipes in a type-safe and readable manner.' float={false} />
      <div className="relative mx-auto grid py-9 lg:max-w-7xl">
        <Back />
        settings
      </div>
    </div>
  )
}

function Back() {
  return (
    <div className="mt-2.5">
      <ButtonLink
        type="button"
        size="sm"
        variant="subtle"
        prefetch="intent"
        to="/cash-flow"
        className="flex items-center gap-x-2 hover:bg-gray-600 hover:text-white"
      >
        <MoveLeftIcon size={18} />
        <p>Back</p>
      </ButtonLink>
    </div>
  )
}
