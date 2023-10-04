import StarterKit from '@tiptap/starter-kit'
import HorizontalRule from '@tiptap/extension-horizontal-rule'
import TiptapLink from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import Placeholder from '@tiptap/extension-placeholder'
import TiptapUnderline from '@tiptap/extension-underline'
import TextStyle from '@tiptap/extension-text-style'
import {Color} from '@tiptap/extension-color'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import {Markdown} from 'tiptap-markdown'
import Highlight from '@tiptap/extension-highlight'
import SlashCommand from './slash-command'
import {InputRule} from '@tiptap/core'
import UpdatedImage from './updated-image'
import CustomKeymap from './custom-keymap'
import DragAndDrop from './drag-and-drop'
import UploadImagesPlugin from '../plugins/upload-images'

export const defaultExtensions = [
  StarterKit.configure({
    heading: {
      HTMLAttributes: {
        class: 'font-bold',
      },
    },
    paragraph: {
      HTMLAttributes: {
        class: 'text-sm relative top-[4px] p-0 font-medium',
      },
    },
    bulletList: {
      HTMLAttributes: {
        class: 'list-disc list-outside leading-3 -mt-2',
      },
    },
    orderedList: {
      HTMLAttributes: {
        class: 'list-decimal list-outside leading-3 -mt-2',
      },
    },
    listItem: {
      HTMLAttributes: {
        class: 'leading-normal -mb-2',
      },
    },
    blockquote: {
      HTMLAttributes: {
        class: 'border-l-4 border-gray-100 dark:border-gray-800',
      },
    },
    codeBlock: {
      HTMLAttributes: {
        class: 'rounded-sm bg-gray-100 p-5 font-mono font-medium text-gray-100',
      },
    },
    code: {
      HTMLAttributes: {
        class:
          'rounded-md bg-gray-200 px-1.5 py-1 font-mono font-medium text-gray-900',
        spellcheck: 'false',
      },
    },
    horizontalRule: false,
    dropcursor: {
      color: '#DBEAFE',
      width: 4,
    },
    gapcursor: false,
  }),
  // patch to fix horizontal rule bug: https://github.com/ueberdosis/tiptap/pull/3859#issuecomment-1536799740
  HorizontalRule.extend({
    addInputRules() {
      return [
        new InputRule({
          find: /^(?:---|—-|___\s|\*\*\*\s)$/,
          handler: ({state, range}) => {
            const attributes = {}

            const {tr} = state
            const start = range.from
            let end = range.to

            tr.insert(start - 1, this.type.create(attributes)).delete(
              tr.mapping.map(start),
              tr.mapping.map(end),
            )
          },
        }),
      ]
    },
  }).configure({
    HTMLAttributes: {
      class: 'mt-4 mb-6 border-t border-gray-300',
    },
  }),
  TiptapLink.configure({
    HTMLAttributes: {
      class:
        'text-gray-400 underline underline-offset-[3px] hover:text-gray-600 transition-colors cursor-pointer',
    },
  }),
  Image.extend({
    addProseMirrorPlugins() {
      return [UploadImagesPlugin()]
    },
  }).configure({
    allowBase64: true,
    HTMLAttributes: {
      class: 'rounded-lg border border-gray-200',
    },
  }),
  UpdatedImage.configure({
    HTMLAttributes: {
      class: 'rounded-lg border border-gray-200',
    },
  }),
  Placeholder.configure({
    placeholder: ({node}) => {
      if (node.type.name === 'heading') {
        return `Heading ${node.attrs.level}`
      }
      return "Press '/' for commands, or '++' for AI autocomplete..."
    },
    includeChildren: true,
  }),
  SlashCommand,
  TiptapUnderline,
  TextStyle,
  Color,
  Highlight.configure({
    multicolor: true,
  }),
  TaskList.configure({
    HTMLAttributes: {
      class: 'not-prose items-start pl-[2px] my-0',
    },
  }),
  TaskItem.configure({
    HTMLAttributes: {
      class: 'flex my-0',
    },
    nested: true,
  }),
  Markdown.configure({
    html: false,
    transformCopiedText: true,
  }),
  CustomKeymap,
  DragAndDrop,
]
