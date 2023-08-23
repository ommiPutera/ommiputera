import type {JSONContent} from '@tiptap/core'
import {filter, map, sum} from 'lodash'
import {
  ArrowRightFromLine,
  ArrowRightToLine,
  ChevronDownSquare,
  Clock10,
  Currency,
  DollarSign,
  MoveRight,
} from 'lucide-react'
import React from 'react'
import {ButtonLink} from '~/components/button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/shadcn/accordion'
import {SectionSpacer} from '~/components/spacer'

type TResult = {
  name: string
  cals: JSONContent[] | undefined
  total: number
}

export default function SidePage({
  title,
  content,
}: {
  title?: string
  content: JSONContent | null
}) {
  const [marks, setMarks] = React.useState<TResult[]>([])
  const json = content?.content
  const lastJsonLength = json ? json?.length - 1 : 0

  const getJsonAbouve = React.useCallback(
    (fromIndex: number, toindex?: number) => {
      return json?.filter(
        (_, index) => index > fromIndex && index <= (toindex ?? lastJsonLength),
      )
    },
    [json, lastJsonLength],
  )

  const calculate = React.useCallback(() => {
    if (json) {
      const jsonIndexing = map(json, (item, index) => {
        return {json: item, index: index}
      })

      const marksFilteringHeading3 = filter(jsonIndexing, item => {
        return item.json.type === 'heading' && item.json.attrs?.level === 3
      })
      const marksFilteringHeading2 = filter(jsonIndexing, item => {
        return item.json.type === 'heading' && item.json.attrs?.level === 2
      })

      const result = map(marksFilteringHeading3, (item, index) => {
        const nextIndex = marksFilteringHeading3?.[index + 1]?.index
        const jsonAbouveList = getJsonAbouve(item.index, nextIndex)?.filter(
          item => item.type === 'taskList',
        )

        function getContents() {
          if (!jsonAbouveList) return []
          if (jsonAbouveList?.length > 1) {
            const merges = []
            for (const item of jsonAbouveList) {
              merges.push(item.content?.[0])
            }
            return merges
          } else {
            return jsonAbouveList?.[0]?.content
          }
        }
        const json = getContents()

        const taskItems = filter(json, item => item?.attrs?.checked === true)
        const taskItem = map(
          taskItems,
          item => item?.content?.[0]?.content?.[0].text,
        )
        const calculate = map(taskItem, item =>
          Number(item?.replace(/\D/g, '')),
        )

        return {
          name: item.json.content?.[0].text || '~',
          cals: jsonAbouveList,
          index: item.index,
          total: sum(calculate),
        }
      })
      const finalResut = map(marksFilteringHeading2, item => {
        const nextIndex = marksFilteringHeading2?.[item.index + 1]?.index
        const cals = filter(
          result,
          resItem =>
            resItem.index > item.index &&
            resItem.index <= (nextIndex ?? lastJsonLength),
        )
        const calculate = map(cals, (item, index) => {
          return item.total
        })

        return {
          name: item.json.content?.[0].text,
          index: item.index,
          nextIndex: nextIndex,
          cals: cals,
          total: sum(calculate),
        }
      })
      // @ts-ignore
      setMarks(finalResut)
    }
  }, [getJsonAbouve, json, lastJsonLength])

  React.useEffect(() => {
    if (content) {
      calculate()
    }
  }, [calculate, content])

  if (!title?.length) {
    return <Guide />
  }

  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-secondary text-md font-semibold">
          Data of{' '}
          {title
            ? title.length >= 25
              ? title.slice(0, 25) + '..'
              : title
            : '~ Untitled'}{' '}
          Page
        </h1>
        <div className="mt-2 flex items-center">
          <div className="flex items-center gap-1">
            <ChevronDownSquare size={14} className="text-gray-300" />
            <p className="w-max min-w-[70px] max-w-[140px] text-sm font-normal text-gray-300">
              Status
            </p>
          </div>
          <p className="text-sm">Not Completed</p>
        </div>
        <div className="flex items-center">
          <div className="flex items-center gap-1">
            <Clock10 size={14} className="text-gray-300" />
            <p className="w-max min-w-[70px] max-w-[140px] text-sm font-normal text-gray-300">
              Created
            </p>
          </div>
          <p className="text-sm">July 24, 2023 9:58 AM</p>
        </div>
        <div className="flex items-center">
          <div className="flex items-center gap-1">
            <Currency size={14} className="text-gray-300" />
            <p className="w-max min-w-[70px] max-w-[140px] text-sm font-normal text-gray-300">
              Currency
            </p>
          </div>
          <p className="text-sm">Rupiah</p>
        </div>
      </div>
      <div className="bg-white dark:bg-black">
        <div className="flex flex-col">
          <h1 className="text-secondary text-md font-semibold">Data Summary</h1>
          {marks.map(mark => (
            <CalcItem key={mark.name} mark={mark} />
          ))}
          <FreeCash marks={marks} />
        </div>
      </div>
    </div>
  )
}

function BoldThis({children}: {children: JSX.Element | React.ReactNode}) {
  return <b className="font-semibold text-black dark:text-white">{children}</b>
}

function Guide() {
  return (
    <div className="">
      <div className="flex flex-col gap-4">
        <h1 className="text-xl font-semibold leading-10">
          How to use this template
        </h1>
        <ul className="flex flex-col gap-4">
          <li className="text-sm font-normal text-gray-700 dark:text-gray-100">
            <BoldThis>1. Establish goals:</BoldThis> Fill in the problem to be
            solved, goal of brainstorm and any additional context that might be
            helpful for everyone to know below.
          </li>
          <li className="text-sm font-normal text-gray-700 dark:text-gray-100">
            <BoldThis>2. Sketch out ideas:</BoldThis> Each team member gets 8
            minutes to sketch out 8 ideas. One idea for each rectangle.
          </li>
          <li className="text-sm font-normal text-gray-700 dark:text-gray-100">
            <BoldThis>3. Share:</BoldThis> Each team member will take a few
            minutes to share out their ideas and discuss them with the team.
            Once everyone has gone, vote on your favourite solutions!
          </li>
        </ul>
      </div>
      <SectionSpacer size="md" />
      <div>
        <h1 className="text-xl font-semibold leading-10">Explore</h1>
        <p className="px-0 text-left text-sm font-normal text-gray-700 dark:text-gray-100">
          Explore our collection of <BoldThis>300+ FigJam templates</BoldThis>{' '}
          by navigating to the templates modal in the top left of your screen.
        </p>
        <div className="mt-4">
          <ButtonLink
            size="md"
            rounded="md"
            type="button"
            to="/personal-finance/new"
            className="gap-2"
          >
            <p className="text-sm">Explore more templates</p>
            <MoveRight size={16} strokeWidth={2.5} />
          </ButtonLink>
        </div>
      </div>
    </div>
  )
}

const toIDR = (arrayNumb: number) => {
  return arrayNumb.toLocaleString('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
}

enum MarkName {
  INCOME = 'Income',
  EXPENSE = 'Expense',
  FREE_CASH = 'Free Cash',
}

const getMarkName = (name: MarkName | string) => {
  switch (name) {
    case MarkName.INCOME: {
      return (
        <div className="flex items-center gap-2">
          <ArrowRightToLine size={18} />
          <h4 className="text-base font-medium">{name}</h4>
        </div>
      )
    }
    case MarkName.EXPENSE: {
      return (
        <div className="flex items-center gap-2">
          <ArrowRightFromLine size={18} />
          <h4 className="text-base font-medium">{name}</h4>
        </div>
      )
    }
    case MarkName.FREE_CASH: {
      return (
        <div className="flex items-center gap-2">
          <DollarSign size={18} />
          <h4 className="text-base font-medium">{name}</h4>
        </div>
      )
    }
    default:
      return <div>{name}</div>
  }
}

function CalcItem({mark}: {mark: TResult}) {
  return (
    <div className="rounded-sm py-2">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1" className="border-none">
          <AccordionTrigger className="py-0">
            {getMarkName(mark.name)}
          </AccordionTrigger>
          <AccordionContent className="my-2">
            {mark?.cals?.map(item => (
              <div key={item.name}>
                <p>
                  {item.name}: {toIDR(item.total)}
                </p>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <h4 className="text-md font-normal">{toIDR(mark.total)}</h4>
    </div>
  )
}

function FreeCash({marks}: {marks: TResult[]}) {
  const income = marks.find(mark => mark.name === 'Income')
  const expense = marks.find(mark => mark.name === 'Expense')
  const free =
    income?.total && expense?.total ? income?.total - expense?.total : 0
  if (!income?.name || !expense?.name) return <></>
  return (
    <div className="rounded-sm py-2">
      <h3 className="text-base font-medium">
        {getMarkName(MarkName.FREE_CASH)}
      </h3>
      <h4 className="text-md font-medium">{toIDR(free)}</h4>
    </div>
  )
}
