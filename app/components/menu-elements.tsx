import {Link} from '@remix-run/react'
import {Wallet2} from 'lucide-react'
import {useRootData} from '~/utils/use-root-data'

const RowSoftwares = () => {
  const {user} = useRootData()
  return (
    <div className="grid h-full w-[380px] grid-cols-2 items-center gap-x-2">
      <div className="col-span-1">
        <Link to={user ? '/cash-flow' : '/intro/cashflow'} prefetch="intent">
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
        <Link to={user ? '/cash-flow' : '/intro/cashflow'} prefetch="intent">
          <div className="w-full rounded-lg px-3 py-2 hover:bg-gray-100 hover:dark:bg-gray-800">
            <div className="flex items-center gap-x-2">
              <Wallet2 size={18} />
              <p className="text-md font-medium">Personal Finance</p>
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

export {RowSoftwares, RowAdmin}
