import type {Editor} from '@tiptap/core'
import {Check, ChevronDown} from 'lucide-react'
import type {Dispatch, FC, SetStateAction} from 'react'
import * as Popover from '@radix-ui/react-popover'

export interface BubbleColorMenuItem {
  name: string
  color: string
}

interface ColorSelectorProps {
  editor: Editor
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

const TEXT_COLORS: BubbleColorMenuItem[] = [
  {
    name: 'Default',
    color: 'var(--color-black)',
  },
  {
    name: 'Purple',
    color: '#9333EA',
  },
  {
    name: 'Red',
    color: '#E00000',
  },
  {
    name: 'Yellow',
    color: '#EAB308',
  },
  {
    name: 'Blue',
    color: '#2563EB',
  },
  {
    name: 'Green',
    color: '#008A00',
  },
  {
    name: 'Orange',
    color: '#FFA500',
  },
  {
    name: 'Pink',
    color: '#BA4081',
  },
  {
    name: 'Gray',
    color: '#A8A29E',
  },
]

const HIGHLIGHT_COLORS: BubbleColorMenuItem[] = [
  {
    name: 'Default',
    color: 'var(--color-orange-900)',
  },
  {
    name: 'Purple',
    color: 'var(--color-violet-900)',
  },
  {
    name: 'Red',
    color: 'var(--color-red-900)',
  },
  {
    name: 'Yellow',
    color: 'var(--color-orange-900)',
  },
  {
    name: 'Blue',
    color: 'var(--color-violet-900)',
  },
  {
    name: 'Green',
    color: 'var(--color-green-900)',
  },
  {
    name: 'Orange',
    color: 'var(--color-orange-900)',
  },
  {
    name: 'Pink',
    color: 'var(--color-red-900)',
  },
  {
    name: 'Gray',
    color: 'var(--color-gray-900)',
  },
]

export const ColorSelector: FC<ColorSelectorProps> = ({
  editor,
  isOpen,
  setIsOpen,
}) => {
  const activeColorItem = TEXT_COLORS.find(({color}) =>
    editor.isActive('textStyle', {color}),
  )

  const activeHighlightItem = HIGHLIGHT_COLORS.find(({color}) =>
    editor.isActive('highlight', {color}),
  )

  return (
    <Popover.Root open={isOpen}>
      <div className="relative h-full">
        <Popover.Trigger
          className="flex h-full items-center gap-1 p-2 text-sm font-medium text-gray-600 hover:bg-gray-100 active:bg-gray-200"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span
            className="rounded-sm px-1"
            style={{
              color: activeColorItem?.color,
              backgroundColor: activeHighlightItem?.color,
            }}
          >
            A
          </span>

          <ChevronDown className="h-4 w-4" />
        </Popover.Trigger>

        <Popover.Content
          align="start"
          className="rounded z-[99999] my-1 flex max-h-80 w-48 flex-col overflow-hidden overflow-y-auto border border-gray-200 bg-white p-1 shadow-xl animate-in fade-in slide-in-from-top-1"
        >
          <div className="my-1 px-2 text-sm text-gray-500">Color</div>
          {TEXT_COLORS.map(({name, color}, index) => (
            <button
              key={index}
              onClick={() => {
                editor.commands.unsetColor()
                name !== 'Default' &&
                  editor
                    .chain()
                    .focus()
                    .setColor(color || '')
                    .run()
                setIsOpen(false)
              }}
              className="flex items-center justify-between rounded-sm px-2 py-1 text-sm text-gray-600 hover:bg-gray-100"
              type="button"
            >
              <div className="flex items-center space-x-2">
                <div
                  className="rounded-sm border border-gray-200 px-1 py-px font-medium"
                  style={{color}}
                >
                  A
                </div>
                <span>{name}</span>
              </div>
              {editor.isActive('textStyle', {color}) && (
                <Check className="h-4 w-4" />
              )}
            </button>
          ))}

          <div className="mb-1 mt-2 px-2 text-sm text-gray-500">Background</div>

          {HIGHLIGHT_COLORS.map(({name, color}, index) => (
            <button
              key={index}
              onClick={() => {
                editor.commands.unsetHighlight()
                name !== 'Default' && editor.commands.setHighlight({color})
                setIsOpen(false)
              }}
              className="flex items-center justify-between rounded-sm px-2 py-1 text-sm text-gray-600 hover:bg-gray-100"
              type="button"
            >
              <div className="flex items-center space-x-2">
                <div
                  className="rounded-sm border border-gray-200 px-1 py-px font-medium"
                  style={{backgroundColor: color}}
                >
                  A
                </div>
                <span>{name}</span>
              </div>
              {editor.isActive('highlight', {color}) && (
                <Check className="h-4 w-4" />
              )}
            </button>
          ))}
        </Popover.Content>
      </div>
    </Popover.Root>
  )
}
