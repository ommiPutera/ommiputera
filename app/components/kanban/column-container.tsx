import { useSortable } from '@dnd-kit/sortable'
import TaskCard from './task-card'
import { CSS } from '@dnd-kit/utilities'
import type { Column, Id, Task } from './types'

interface Props {
  column: Column
  deleteColumn: (id: Id) => void
  updateColumn: (id: Id, title: string) => void

  createTask: (columnId: Id) => void
  updateTask: (id: Id, content: string) => void
  deleteTask: (id: Id) => void
  tasks: Task[]
  disabled?: boolean
}

function ColumnContainer({
  column,
  deleteColumn,
  updateColumn,
  tasks,
  deleteTask,
  updateTask,
  disabled,
}: Props) {
  const { setNodeRef, attributes, listeners, transform, transition, isDragging } =
    useSortable({
      id: column.id,
      data: {
        type: 'Column',
        column,
      },
    })

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  }

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes} {...listeners}
        className="relative flex h-[100px] min-h-[100px] cursor-grab items-center rounded-md border-2 p-2.5 text-left opacity-30"
      />
    )
  }


  return (
    <div
      ref={setNodeRef} style={style} {...attributes} {...listeners}
      className="flex w-[300px] flex-col rounded-lg border border-red-900"
    >
      <div
        className="flex cursor-grab items-center justify-between rounded-t-lg px-2 py-2 text-md font-bold"
      >
        <div className="rounded-md bg-white dark:bg-gray-800 px-2.5 py-1">
          <p className='text-sm font-medium'>{column.title}</p>
        </div>
      </div>
      <div className="flex min-h-[4rem] flex-grow flex-col gap-2 overflow-y-auto overflow-x-hidden p-2">
        {tasks.map(task => (
          <TaskCard
            key={task.id}
            task={task}
            deleteTask={deleteTask}
            updateTask={updateTask}
          />
        ))}
      </div>
    </div>
  )
}

export default ColumnContainer
