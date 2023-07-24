import {useEffect, useRef, useState} from 'react'
import {useEditor, EditorContent} from '@tiptap/react'
import {TiptapEditorProps} from './props'
import {TiptapExtensions} from './extensions'
import {useDebouncedCallback} from 'use-debounce'
import {useCompletion} from 'ai/react'
import {toast} from 'sonner'
import va from '@vercel/analytics'
import {EditorBubbleMenu} from './components'
import {getPrevText} from '~/lib/editor'

export default function Editor({
  submit,
  content,
  setContent,
  saveStatus,
  setSaveStatus,
}: {
  submit: () => void
  content: any
  setContent: React.Dispatch<React.SetStateAction<any>>
  saveStatus: 'Saved' | 'Unsaved' | 'Saving..'
  setSaveStatus: React.Dispatch<
    React.SetStateAction<'Saved' | 'Unsaved' | 'Saving..'>
  >
}) {
  const [hydrated, setHydrated] = useState(false)

  const debouncedUpdates = useDebouncedCallback(async ({editor}) => {
    const json = editor.getJSON()
    setSaveStatus('Saving..')
    setContent(json)

    // Simulate a delay in saving.
    setTimeout(() => {
      setSaveStatus('Saved')
      submit()
    }, 750)
  }, 950)

  const editor = useEditor({
    extensions: TiptapExtensions,
    editorProps: TiptapEditorProps,
    onUpdate: e => {
      setSaveStatus('Unsaved')
      const selection = e.editor.state.selection
      const lastTwo = getPrevText(e.editor, {
        chars: 2,
      })
      if (lastTwo === '++' && !isLoading) {
        e.editor.commands.deleteRange({
          from: selection.from - 2,
          to: selection.from,
        })
        complete(
          getPrevText(e.editor, {
            chars: 5000,
          }),
        )
        // complete(e.editor.storage.markdown.getMarkdown());
        va.track('Autocomplete Shortcut Used')
      } else {
        debouncedUpdates(e)
      }
    },
    autofocus: 'end',
  })

  const {complete, completion, isLoading, stop} = useCompletion({
    id: 'novel',
    api: '/api/generate',
    onFinish: (_prompt, completion) => {
      editor?.commands.setTextSelection({
        from: editor.state.selection.from - completion.length,
        to: editor.state.selection.from,
      })
    },
    onError: err => {
      toast.error(err.message)
      if (err.message === 'You have reached your request limit for the day.') {
        va.track('Rate Limit Reached')
      }
    },
  })

  const prev = useRef('')

  // Insert chunks of the generated text
  useEffect(() => {
    const diff = completion.slice(prev.current.length)
    prev.current = completion
    editor?.commands.insertContent(diff)
  }, [isLoading, editor, completion])

  useEffect(() => {
    // if user presses escape or cmd + z and it's loading,
    // stop the request, delete the completion, and insert back the "++"
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || (e.metaKey && e.key === 'z')) {
        stop()
        if (e.key === 'Escape') {
          editor?.commands.deleteRange({
            from: editor.state.selection.from - completion.length,
            to: editor.state.selection.from,
          })
        }
        editor?.commands.insertContent('++')
      }
    }
    const mousedownHandler = (e: MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()
      stop()
      if (window.confirm('AI writing paused. Continue?')) {
        complete(editor?.getText() || '')
      }
    }
    if (isLoading) {
      document.addEventListener('keydown', onKeyDown)
      window.addEventListener('mousedown', mousedownHandler)
    } else {
      document.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('mousedown', mousedownHandler)
    }
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('mousedown', mousedownHandler)
    }
  }, [stop, isLoading, editor, complete, completion.length])

  // Hydrate the editor with the content from localStorage.
  useEffect(() => {
    if (editor && content && !hydrated) {
      editor.commands.setContent(content)
      setHydrated(true)
    }
  }, [editor, content, hydrated])

  return (
    <div
      onClick={() => {
        editor?.chain().focus().run()
      }}
      className="sm:mb-[calc(20vh)] sm:rounded-lg sm:border sm:px-12 sm:shadow-lg relative min-h-[500px] w-full"
    >
      {editor && <EditorBubbleMenu editor={editor} />}
      <EditorContent editor={editor} />
    </div>
  )
}
