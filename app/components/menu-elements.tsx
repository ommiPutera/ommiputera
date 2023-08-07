import { Link } from '@remix-run/react'
import { Building2, Wallet2 } from 'lucide-react'
import { useRootData } from '~/utils/use-root-data'

const RowSoftwares = () => {
  const { user } = useRootData()
  return (
    <div className="grid h-full w-[380px] grid-cols-2 items-center gap-x-2">
      <div className="col-span-1">
        <Link to={user ? '/cash-flow' : '/intro/personal-finance'} prefetch="intent">
          <div className="w-full rounded-lg px-3 py-2 hover:bg-gray-100 hover:dark:bg-gray-800">
            <div className="flex items-center gap-x-2">
              <Wallet2 size={18} />
              <p className="text-md font-medium">Personal Finance</p>
            </div>
            <p className="mt-1 text-sm font-light leading-tight text-gray-300">
              A collection of links for navigating websites.
            </p>
          </div>
        </Link>
      </div>
      <div className="col-span-1">
        <Link to={user ? '/personal-finance' : '/intro/personal-finance'} prefetch="intent">
          <div className="w-full rounded-lg px-3 py-2 hover:bg-gray-100 hover:dark:bg-gray-800">
            <div className="flex items-center gap-x-2">
              <Building2 size={18} />
              <p className="text-md font-medium">Enterprise Finance</p>
            </div>
            <p className="mt-1 text-md font-light leading-tight text-gray-300">
              A collection of links for navigating websites.
            </p>
          </div>
        </Link>
      </div>
    </div>
  )
}

const RowProducts = () => {
  const { user } = useRootData()
  return (
    <div className="grid h-full w-[380px] grid-cols-2 items-center gap-x-2">
      <div className="col-span-1">
        <Link to={user ? '/cash-flow' : '/intro/personal-finance'} prefetch="intent">
          <div className="w-full rounded-lg px-3 py-2 hover:bg-gray-100 hover:dark:bg-gray-800">
            <div className="flex items-center gap-x-2">
              <Wallet2 size={18} />
              <p className="text-md font-medium">Personal Finance</p>
            </div>
            <p className="mt-1 text-sm font-light leading-tight text-gray-300">
              A collection of links for navigating websites.
            </p>
          </div>
        </Link>
      </div>
      <div className="col-span-1">
        <Link to={user ? '/personal-finance' : '/intro/personal-finance'} prefetch="intent">
          <div className="w-full rounded-lg px-3 py-2 hover:bg-gray-100 hover:dark:bg-gray-800">
            <div className="flex items-center gap-x-2">
              <Building2 size={18} />
              <p className="text-md font-medium">Enterprise Finance</p>
            </div>
            <p className="mt-1 text-md font-light leading-tight text-gray-300">
              A collection of links for navigating websites.
            </p>
          </div>
        </Link>
      </div>
    </div>
  )
}

const RowAdmin = () => {
  return (
    <div className="grid h-full w-[380px] grid-cols-2 items-center gap-x-2">
      <div className="col-span-1">
        <Link to="/admin/manage-project" prefetch="intent">
          <div className="w-full rounded-lg px-3 py-2 hover:bg-gray-100 hover:dark:bg-gray-800">
            <div className="flex items-center gap-x-2">
              <Wallet2 size={18} />
              <p className="text-md font-medium">Manage Projects</p>
            </div>
            <p className="mt-1 text-sm font-light leading-tight text-gray-300">
              A collection of links for navigating websites.
            </p>
          </div>
        </Link>
      </div>
      <div className="col-span-1">
        <Link to="/admin" prefetch="intent">
          <div className="w-full rounded-lg px-3 py-2 hover:bg-gray-100 hover:dark:bg-gray-800">
            <div className="flex items-center gap-x-2">
              <Wallet2 size={18} />
              <p className="text-md font-medium">General</p>
            </div>
            <p className="mt-1 text-md font-light leading-tight text-gray-300">
              A collection of links for navigating websites.
            </p>
          </div>
        </Link>
      </div>
    </div>
  )
}

export { RowSoftwares, RowProducts, RowAdmin }
