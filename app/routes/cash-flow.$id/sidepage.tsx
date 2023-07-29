import type {JSONContent} from '@tiptap/core'
import {filter, map} from 'lodash'
import {ChevronDownSquare, Clock10} from 'lucide-react'
import React from 'react'
import {Logo} from '~/components/navbar'
import {UIButton} from '~/components/shadcn/button'

type TResult = {
  name: string
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

  const getJsonAbouve = (fromIndex: number, toindex?: number) => {
    return json?.filter(
      (_, index) => index > fromIndex && index <= (toindex ?? lastJsonLength),
    )
  }

  const calculate = () => {
    if (json) {
      const jsonIndexing = map(json, (item, index) => {
        return {json: item, index: index}
      })

      const marksFiltering = filter(jsonIndexing, item => {
        return item.json.type === 'heading' && item.json.attrs?.level === 3
      })

      console.log('marksFiltering: ', marksFiltering)
      const result = map(marksFiltering, (item, index) => {
        const nextIndex = marksFiltering?.[index + 1]?.index
        return {
          name: item.json.content?.[0].text || '~',
          cals: getJsonAbouve(item.index, nextIndex),
        }
      })
      setMarks(result)
      console.log('result: ', result)
    }
  }

  return (
    <div className="flex h-full flex-col gap-y-4">
      <div className="rounded-lg border border-gray-800 bg-black px-3 py-3">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-base font-semibold">
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
        </div>
      </div>
      <div className="sticky top-16">
        <div className="z-50 rounded-lg border border-gray-800 bg-black px-3 py-3">
          <div className="flex flex-col gap-y-4">
            <h1 className="text-base font-semibold">Calculation</h1>
            {marks.map(mark => (
              <p key={mark.name}>{mark.name}</p>
            ))}
            <UIButton size="sm" className="" onClick={calculate}>
              Hitung Ini
            </UIButton>
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
