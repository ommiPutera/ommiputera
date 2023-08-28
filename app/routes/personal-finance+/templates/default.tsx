import {Tab} from '@headlessui/react'
import clsx from 'clsx'
import {Wallet} from 'lucide-react'
import React from 'react'

export default function Default() {
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  return (
    <div className="m-6">
      <Tab.Group
        as="div"
        selectedIndex={selectedIndex}
        onChange={setSelectedIndex}
        className="w-full grid-cols-12 gap-x-8 overflow-visible"
      >
        <Tab.List className="z-0 mx-auto">
          <div className="flex w-full gap-4 pr-6">
            <TabItem title="Bulanan" index={0} selectedIndex={selectedIndex} />
            <TabItem title="Hutang" index={1} selectedIndex={selectedIndex} />
          </div>
        </Tab.List>
        <Tab.Panels className="py-4">
          <Tab.Panel>
            <MonthlyCards />
          </Tab.Panel>
          <Tab.Panel>Hutang</Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}

function TabItem({
  title,
  index,
  selectedIndex,
}: {
  title: string
  index: number
  selectedIndex: number
}) {
  return (
    <TabComponent index={index}>
      <div className="relative flex w-44 flex-col gap-2 rounded-md bg-gray-100 px-6 py-4 text-left dark:bg-gray-900">
        <Wallet strokeWidth={2.5} />
        <div>
          <h2 className="mt-0.5 text-lg font-semibold">{title}</h2>
          <p className="text-sm font-normal text-gray-400">12 Templat</p>
        </div>
        <div
          className={clsx(
            'absolute bottom-0 left-0 h-[4px] w-full rounded-lg',
            {
              'bg-green-900': selectedIndex === index,
            },
          )}
        ></div>
      </div>
    </TabComponent>
  )
}

function TabComponent({
  children,
  index,
  className,
  ...props
}: {
  children: JSX.Element | React.ReactNode
  index: number
  className?: string
}) {
  return (
    <Tab
      className={({selected}) =>
        clsx(
          'relative flex items-start border-b-0 border-b-transparent py-3 font-semibold focus:outline-none',
          {
            'text-black dark:text-white': selected,
            'text-gray-300 dark:text-gray-300': !selected,
          },
          className,
        )
      }
      {...props}
    >
      {children}
    </Tab>
  )
}

function MonthlyCards() {
  return (
    <div className="flex flex-col gap-12">
      <div>
        <h2 className="text-2xl font-semibold">Pencatatan bulanan</h2>
        <p className="text-md font-medium text-gray-400 dark:text-gray-200">
          Build anything with thousands of templates
        </p>
      </div>
      <div>
        <h4 className="mb-4 text-lg font-semibold">Yang disediakan</h4>
        <div className="grid grid-cols-2 gap-4">
          <Card />
          <Card />
          <Card />
        </div>
      </div>
      <div>
        <h4 className="mb-4 text-lg font-semibold">Dari Komunitas</h4>
        <div className="grid grid-cols-2 gap-4">
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    </div>
  )
}

function Card() {
  return (
    <div className="col-span-1 w-full">
      <div className="border">content</div>
      <div className="">title</div>
    </div>
  )
}
