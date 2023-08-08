import {SortableContext, useSortable} from '@dnd-kit/sortable'
import {CSS} from '@dnd-kit/utilities'
import {useMemo, useState} from 'react'
import TaskCard from './task-card'
import type {Column, Id, Task} from '~/routes/personal-finance+'
import {TrashIcon} from 'lucide-react'

interface Props {
  column: Column
  deleteColumn: (id: Id) => void
  updateColumn: (id: Id, title: string) => void

  createTask: (columnId: Id) => void
  updateTask: (id: Id, content: string) => void
  deleteTask: (id: Id) => void
  tasks: Task[]
}

function ColumnContainer({
  column,
  deleteColumn,
  updateColumn,
  tasks,
  deleteTask,
  updateTask,
}: Props) {
  const [editMode, setEditMode] = useState(false)

  const tasksIds = useMemo(() => {
    return tasks.map(task => task.id)
  }, [tasks])

  const {setNodeRef, attributes, listeners, transform, transition, isDragging} =
    useSortable({
      id: column.id,
      data: {
        type: 'Column',
        column,
      },
      disabled: editMode,
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
        className="
      bg-columnBackgroundColor
      border-pink-500
      flex
      h-[500px]
      max-h-[500px]
      w-[350px]
      flex-col
      rounded-md
      border-2
      opacity-40
      "
      ></div>
    )
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex w-[350px]
  flex-col
  rounded-md
  "
    >
      {/* Column title */}
      <div
        {...attributes}
        {...listeners}
        onClick={() => {
          setEditMode(true)
        }}
        className="flex cursor-grab items-center justify-between rounded-md border text-md font-bold"
      >
        <div className="flex gap-2 border">
          {!editMode && column.title}
          {editMode && (
            <input
              className="focus:border-rose-500 bg-black px-2 outline-none"
              value={column.title}
              onChange={e => updateColumn(column.id, e.target.value)}
              autoFocus
              onBlur={() => {
                setEditMode(false)
              }}
              onKeyDown={e => {
                if (e.key !== 'Enter') return
                setEditMode(false)
              }}
            />
          )}
        </div>
        <button
          onClick={() => {
            deleteColumn(column.id)
          }}
          className="
        hover:bg-columnBackgroundColor
        rounded
        stroke-gray-500
        px-1
        py-2
        hover:stroke-white
        "
        >
          <TrashIcon />
        </button>
      </div>
      <div className="flex flex-grow flex-col gap-1 overflow-y-auto overflow-x-hidden p-2">
        <SortableContext items={tasksIds}>
          {tasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              deleteTask={deleteTask}
              updateTask={updateTask}
            />
          ))}
        </SortableContext>
      </div>
    </div>
  )
}

export default ColumnContainer
