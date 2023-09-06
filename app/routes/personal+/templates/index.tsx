import {ButtonLink} from '~/components/button'
import {OutletCenter, OutletRight, WrapperOutlet} from '../_layout'
import {Tab} from '@headlessui/react'
import React from 'react'
import {Wallet} from 'lucide-react'
import clsx from 'clsx'
import Month from './month'

export default function Index() {
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  return (
    <WrapperOutlet>
      <OutletCenter>
        <div className="flex flex-col items-center px-6 pb-6 pt-12 text-center">
          <img
            src="/vectors/template.png"
            alt=""
            className="w-h-16 mb-4 h-16"
          />
          <h2 className="text-5xl font-semibold">Templat Perencanaan</h2>
          <p className="text-lg font-light text-gray-400 dark:text-gray-200">
            Build anything with thousands of templates
          </p>
        </div>
        <div className="m-6">
          <Tab.Group
            as="div"
            selectedIndex={selectedIndex}
            onChange={setSelectedIndex}
            className="w-full grid-cols-12 gap-x-8 overflow-visible"
          >
            <Tab.List className="z-0 mx-auto">
              <div className="grid w-full grid-cols-3 gap-x-4">
                <TabItem
                  title="Bulanan"
                  index={0}
                  selectedIndex={selectedIndex}
                />
                <TabItem
                  title="Hutang"
                  index={1}
                  selectedIndex={selectedIndex}
                />
              </div>
            </Tab.List>
            <Tab.Panels className="py-4">
              <Tab.Panel>
                <Month />
              </Tab.Panel>
              <Tab.Panel>Hutang</Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </OutletCenter>
      <OutletRight>
        <SubmitTemplate />
      </OutletRight>
    </WrapperOutlet>
  )
}

function SubmitTemplate() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col">
        <h1 className="mb-2 text-lg font-semibold leading-tight">
          Submit your template to Community
        </h1>
        <p className="px-0 text-left text-sm font-normal text-gray-400 dark:text-gray-200">
          A vertically stacked set of interactive headings that each reveal a
          section of content.
        </p>
        <div className="mt-4">
          <ButtonLink
            size="md"
            rounded="md"
            type="button"
            to="/personal/new"
            className="gap-2"
          >
            <p className="text-sm">Submit a template</p>
          </ButtonLink>
        </div>
      </div>
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
      <div className="relative flex w-full flex-col gap-2 rounded-md bg-gray-100 px-6 py-4 text-left dark:bg-gray-900">
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
