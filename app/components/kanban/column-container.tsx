import {useSortable} from '@dnd-kit/sortable'
import TaskCard from './task-card'
import {CSS} from '@dnd-kit/utilities'
import type {Column, Id, Task} from './types'
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
  const {setNodeRef, attributes, listeners, transform, transition, isDragging} =
    useSortable({
      id: column.id,
      data: {
        type: 'Column',
        column,
      },
      disabled: true,
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
      className={clsx('flex w-[240px] flex-col')}
    >
      <div
        className={clsx('item-center mb-2 flex w-full border-b-2 pb-1', {
          'border-red-900/50': column.id === 'toPlan',
          'border-orange-900/50': column.id === 'onPlanning',
          'border-green-900/50': column.id === 'achieve',
          'border-violet-900/50': column.id === 'onGoing',
          'border-gray-700/50': column.id === 'failed',
        })}
      >
        <span
          className={clsx('my-auto mr-2 h-2 w-2 rounded-full', {
            'bg-red-900': column.id === 'toPlan',
            'bg-orange-900': column.id === 'onPlanning',
            'bg-green-900': column.id === 'achieve',
            'bg-violet-900': column.id === 'onGoing',
            'bg-gray-700': column.id === 'failed',
          })}
        ></span>
        <p className="mt-0.5 text-sm font-semibold leading-[13px]">
          {column.title}
        </p>
      </div>
      <div
        className={clsx(
          'flex flex-grow flex-col overflow-y-auto overflow-x-hidden',
        )}
      >
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
