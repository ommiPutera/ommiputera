import { useSortable } from '@dnd-kit/sortable'
import TaskCard from './task-card'
import { CSS } from '@dnd-kit/utilities'
import type { Column, Id, Task } from './types'
import clsx from 'clsx'

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
      disabled: true
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
        {...attributes}
        {...listeners}
        className="relative flex h-[100px] min-h-[100px] cursor-grab items-center rounded-md border-2 p-2.5 text-left opacity-30"
      />
    )
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={clsx("flex w-[250px] flex-col")}
    >
      <div className={clsx("border-b-2 mb-2 pb-1 px-2 w-full flex item-center", {
        'border-red-900': column.id === 'toPlan',
        'border-orange-900': column.id === 'onPlanning',
        'border-green-900': column.id === 'achieve',
        'border-violet-900': column.id === 'onGoing',
        'border-gray-700': column.id === 'failed',
      })}>
        <span className={clsx("w-2 h-2 my-auto mr-2 rounded-full", {
          'bg-red-900': column.id === 'toPlan',
          'bg-orange-900': column.id === 'onPlanning',
          'bg-green-900': column.id === 'achieve',
          'bg-violet-900': column.id === 'onGoing',
          'bg-gray-700': column.id === 'failed',
        })}></span>
        <p className="text-sm font-semibold leading-[13px] mt-0.5">{column.title}</p>
      </div>
      <div className="flex flex-grow flex-col overflow-y-auto overflow-x-hidden gap-1.5">
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
