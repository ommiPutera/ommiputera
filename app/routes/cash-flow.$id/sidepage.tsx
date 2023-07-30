import type { JSONContent } from '@tiptap/core'
import { filter, map, sum } from 'lodash'
import { ChevronDownSquare, Clock10, Currency } from 'lucide-react'
import React from 'react'
import { Logo } from '~/components/navbar'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '~/components/shadcn/accordion'

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

  const getJsonAbouve = React.useCallback((fromIndex: number, toindex?: number) => {
    return json?.filter(
      (_, index) => index > fromIndex && index <= (toindex ?? lastJsonLength),
    )
  }, [json, lastJsonLength])

  const calculate = React.useCallback(() => {
    if (json) {
      const jsonIndexing = map(json, (item, index) => {
        return { json: item, index: index }
      })

      const marksFilteringHeading3 = filter(jsonIndexing, item => {
        return item.json.type === 'heading' && item.json.attrs?.level === 3
      })
      const marksFilteringHeading2 = filter(jsonIndexing, item => {
        return item.json.type === 'heading' && item.json.attrs?.level === 2
      })

      const result = map(marksFilteringHeading3, (item, index) => {
        const nextIndex = marksFilteringHeading3?.[index + 1]?.index
        const jsonAbouveList = getJsonAbouve(item.index, nextIndex)?.filter(item => item.type === 'taskList')
        const taskItems = filter(jsonAbouveList?.[0]?.content, item => item.attrs?.checked === true && !item.content?.[0].content?.[0].text?.includes('Expect: '))
        // console.log(taskItems)
        const taskItem = map(taskItems, item => {
          return item.content?.[0]?.content?.[0].text
        })
        const calculate = map(taskItem, item => {
          return Number(item?.replace(new RegExp("Rp.", "g"), '').replace(new RegExp(",", "g"), '').replace(new RegExp(" ", "g"), ''))
        })
        // console.log(sum(calculate))

        return {
          name: item.json.content?.[0].text || '~',
          cals: jsonAbouveList,
          index: item.index,
          total: sum(calculate)
        }
      })
      const finalResut = map(marksFilteringHeading2, item => {
        const nextIndex = marksFilteringHeading2?.[item.index + 1]?.index
        const cals = filter(result, resItem => resItem.index > item.index && resItem.index <= (nextIndex ?? lastJsonLength))
        const calculate = map(cals, (item, index) => {
          return item.total
        })

        return {
          name: item.json.content?.[0].text,
          index: item.index,
          nextIndex: nextIndex,
          cals: cals,
          total: sum(calculate)
        }
      })
      // console.log('finalResut: ', finalResut)
      // @ts-ignore
      setMarks(finalResut)
    }
  }, [getJsonAbouve, json, lastJsonLength])

  React.useEffect(() => {
    if (content) {
      calculate()
    }
  }, [calculate, content])

  return (
    <div className="flex h-screen flex-col gap-y-4">
      <div className="rounded-lg border border-gray-800 bg-black px-3 py-3">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-lg font-semibold text-secondary">
            Data of {title ?? ''} Page
          </h1>
          <div className="mt-2 flex items-center">
            <div className="flex items-center gap-x-2">
              <ChevronDownSquare size={16} className="text-secondary" />
              <p className="text-secondary w-max min-w-[120px] max-w-[140px] text-md font-normal">
                Status
              </p>
            </div>
            <p className="text-md">Not Completed</p>
          </div>
          <div className="flex items-center">
            <div className="flex items-center gap-x-2">
              <Clock10 size={16} className="text-secondary" />
              <p className="text-secondary w-max min-w-[120px] max-w-[140px] text-md font-normal">
                Created Date
              </p>
            </div>
            <p className="text-md">July 24, 2023 9:58 AM</p>
          </div>
          <div className="flex items-center">
            <div className="flex items-center gap-x-2">
              <Currency size={16} className="text-secondary" />
              <p className="text-secondary w-max min-w-[120px] max-w-[140px] text-md font-normal">
                Currency
              </p>
            </div>
            <p className="text-md">Rupiah</p>
          </div>
        </div>
      </div>
      <div className="sticky top-16">
        <div className="z-50 rounded-lg border border-gray-800 bg-black px-3 py-3">
          <div className="flex flex-col gap-y-4">
            <h1 className="text-lg font-semibold text-secondary">Data Summary</h1>
            {marks.map(mark => <CalcItem key={mark.name} mark={mark} />)}
          </div>
        </div>
        <div className="mt-4 flex items-center justify-center gap-1.5">
          <Logo size="xs" className="z-0 w-min" />
          <p className="pt-1 text-sm font-normal">powerd by Ommi © 2023</p>
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

function CalcItem({ mark }: { mark: TResult }) {
  return (
    <div>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1" className='border-none'>
          <AccordionTrigger className='py-0 text-base font-medium'>{mark.name}</AccordionTrigger>
          <AccordionContent className='border rounded-md border-gray-600 py-2 px-2 my-2'>
            {mark?.cals?.map(item => (
              <div key={item.name}>
                <p>{item.name}: {toIDR(item.total)}</p>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <h4 className='text-secondary text-md font-medium'>Total: {toIDR(mark.total)}</h4>
    </div>
  )
}
