import type { DragEndEvent, DragOverEvent, DragStartEvent } from '@dnd-kit/core'
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { SortableContext, arrayMove } from '@dnd-kit/sortable'
import type { Post } from '@prisma/client'
import type { LoaderFunction } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import { Filter, Plus } from 'lucide-react'
import React from 'react'
import { ButtonLink } from '~/components/button'
import ColumnContainer from '~/components/kanban/column-container'
import TaskCard from '~/components/kanban/task-card'
import { db } from '~/utils/db.server'
import { getUser } from '~/utils/session.server'

export type LoaderData = {
  posts: Post[] | null
}

export type Id = string | number

export type Column = {
  id: Id
  title: string
}

export type Task = {
  id: Id
  columnId: Id
  content: JSX.Element | React.ReactNode | string
}

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request)
  const posts = await db.post.findMany({ where: { authorId: user?.id } })
  const data: LoaderData = { posts }
  return data
}

function Board() {
  const { posts } = useLoaderData<LoaderData>()
  const isPostsExist = Boolean(posts?.length)

  const defaultCols: Column[] = [
    {
      id: 'todo',
      title: 'Todo',
    },
    {
      id: 'doing',
      title: 'Doing',
    },
    {
      id: 'doing1',
      title: 'Doing 1',
    },
    {
      id: 'doing2',
      title: 'Doing 2',
    },
    {
      id: 'doing3',
      title: 'Doing 3',
    },
  ]

  const postTest: Task[] | undefined = posts?.map(post => {
    return {
      id: post.id,
      columnId: 'todo',
      content: (
        <div
          key={post.id}
          className="col-span-1 cursor-pointer rounded-lg border border-white bg-white p-4 hover:border-gray-100 dark:border-gray-800 dark:bg-gray-900"
        >
          <UpdatePage {...JSON.parse(JSON.stringify(post))} />
        </div>
      ),
    }
  })

  return (
    <div className="flex flex-col">
      <Tools />
      <div className="relative">
        {isPostsExist ? (
          <div className='w-screen'>
            <div className="full-bleed-kanban">
              <Kanban defaultCols={defaultCols} defaultTasks={postTest ?? []} />
            </div>
          </div>
        ) : (
          <div className="w-full">
            <NoData />
          </div>
        )}
      </div>
    </div>
  )
}

function Kanban({
  defaultCols,
  defaultTasks,
}: {
  defaultCols: Column[]
  defaultTasks: Task[]
}) {
  const [columns, setColumns] = React.useState<Column[]>(defaultCols)
  const columnsId = React.useMemo(() => columns.map(col => col.id), [columns])

  const [tasks, setTasks] = React.useState<Task[]>(defaultTasks)
  const [activeColumn, setActiveColumn] = React.useState<Column | null>(null)
  const [activeTask, setActiveTask] = React.useState<Task | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
  )

  return (
    <DndContext
      sensors={sensors}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
    >
      <SortableContext items={columnsId}>
        <div className="wrapper-full-bleed-kanban">
          {columns.map(col => (
            <div key={col.id} className='item-full-bleed-kanban'>
              <ColumnContainer
                column={col}
                deleteColumn={deleteColumn}
                updateColumn={updateColumn}
                createTask={createTask}
                deleteTask={deleteTask}
                updateTask={updateTask}
                tasks={tasks.filter(task => task.columnId === col.id)}
              />
            </div>
          ))}
        </div>
      </SortableContext>
      <DragOverlay>
        {activeColumn && (
          <ColumnContainer
            column={activeColumn}
            deleteColumn={deleteColumn}
            updateColumn={updateColumn}
            createTask={createTask}
            deleteTask={deleteTask}
            updateTask={updateTask}
            tasks={tasks.filter(task => task.columnId === activeColumn.id)}
          />
        )}
        {activeTask && (
          <TaskCard
            task={activeTask}
            deleteTask={deleteTask}
            updateTask={updateTask}
          />
        )}
      </DragOverlay>
    </DndContext>
  )

  function createTask(columnId: Id) {
    const newTask: Task = {
      id: generateId(),
      columnId,
      content: `Task ${tasks.length + 1}`,
    }

    setTasks([...tasks, newTask])
  }

  function deleteTask(id: Id) {
    const newTasks = tasks.filter(task => task.id !== id)
    setTasks(newTasks)
  }

  function updateTask(id: Id, content: JSX.Element | React.ReactNode | string) {
    const newTasks = tasks.map(task => {
      if (task.id !== id) return task
      return { ...task, content }
    })

    setTasks(newTasks)
  }

  function deleteColumn(id: Id) {
    const filteredColumns = columns.filter(col => col.id !== id)
    setColumns(filteredColumns)

    const newTasks = tasks.filter(t => t.columnId !== id)
    setTasks(newTasks)
  }

  function updateColumn(id: Id, title: string) {
    const newColumns = columns.map(col => {
      if (col.id !== id) return col
      return { ...col, title }
    })

    setColumns(newColumns)
  }

  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === 'Column') {
      setActiveColumn(event.active.data.current.column)
      return
    }

    if (event.active.data.current?.type === 'Task') {
      setActiveTask(event.active.data.current.task)
      return
    }
  }

  function onDragEnd(event: DragEndEvent) {
    setActiveColumn(null)
    setActiveTask(null)

    const { active, over } = event
    if (!over) return

    const activeId = active.id
    const overId = over.id

    if (activeId === overId) return

    setColumns(columns => {
      const activeColumnIndex = columns.findIndex(col => col.id === activeId)

      const overColumnIndex = columns.findIndex(col => col.id === overId)

      return arrayMove(columns, activeColumnIndex, overColumnIndex)
    })
  }

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event
    if (!over) return

    const activeId = active.id
    const overId = over.id

    if (activeId === overId) return

    const isActiveATask = active.data.current?.type === 'Task'
    const isOverATask = over.data.current?.type === 'Task'

    if (!isActiveATask) return

    // Im dropping a Task over another Task
    if (isActiveATask && isOverATask) {
      setTasks(tasks => {
        const activeIndex = tasks.findIndex(t => t.id === activeId)
        const overIndex = tasks.findIndex(t => t.id === overId)

        tasks[activeIndex].columnId = tasks[overIndex].columnId

        return arrayMove(tasks, activeIndex, overIndex)
      })
    }

    const isOverAColumn = over.data.current?.type === 'Column'

    // Im dropping a Task over a column
    if (isActiveATask && isOverAColumn) {
      setTasks(tasks => {
        const activeIndex = tasks.findIndex(t => t.id === activeId)

        tasks[activeIndex].columnId = overId

        return arrayMove(tasks, activeIndex, activeIndex)
      })
    }
  }
}

function generateId() {
  /* Generate a random number between 0 and 10000 */
  return Math.floor(Math.random() * 10001)
}

function Tools() {
  const { posts } = useLoaderData<LoaderData>()
  const isPostsExist = Boolean(posts?.length)

  if (!isPostsExist) return <></>
  return (
    <div className="relative mx-auto flex w-full max-w-5xl justify-between">
      <div className="">
        <ButtonLink
          type="button"
          size="sm"
          variant="subtle"
          to="/cash-flow/new"
          className="flex items-center gap-x-2 rounded-lg border border-gray-100 bg-black px-3 text-white dark:border-gray-800 dark:bg-white dark:text-black"
        >
          <Plus size={16} />
          <p>New Plan</p>
        </ButtonLink>
      </div>
      <div className="">
        <ButtonLink
          type="button"
          size="sm"
          variant="subtle"
          to="/cash-flow/new"
          className="flex items-center gap-x-2 rounded-lg px-3 text-blue-500"
        >
          <Filter size={16} />
          <p>Filter</p>
        </ButtonLink>
      </div>
    </div>
  )
}

function UpdatePage({ id, title }: Post) {
  return (
    <div className="flex flex-col">
      <Link to={`/cash-flow/${id}`}>
        <div className="flex items-center gap-x-5">
          <h4 className="text-lg font-semibold">{title}</h4>
          <div className="mt-2 flex flex-wrap gap-2">
            <p className="rounded-sm bg-red-800 px-1.5 text-xs text-white">
              Not Completed
            </p>
            <p className="rounded-sm bg-gray-800 px-1.5 text-xs text-white">
              Rupiah
            </p>
            <p className="rounded-sm bg-orange-300 px-1.5 text-xs text-white">
              July 24, 2023 9:58 AM
            </p>
            <p className="rounded-sm bg-gray-800 px-1.5 text-xs text-white">
              Template:Monthly-Expanse
            </p>
          </div>
        </div>
        <p className="text-secondary mt-6 text-left text-sm font-light">
          Updated 13h ago..
        </p>
      </Link>
    </div>
  )
}

function NoData() {
  return (
    <div className="grid w-full gap-y-4 rounded-lg border border-white bg-gray-100 py-32 text-center dark:border-gray-800 dark:bg-gray-900">
      <div className="mx-auto w-fit rounded-full bg-gray-800 p-5">
        <img src="/vectors/checklist.png" alt="" className="h-10 w-10" />
      </div>
      <div>
        <h5 className="text-3xl font-medium">No expense data created.</h5>
        <p className="text-center text-base font-normal leading-normal text-gray-400 dark:text-gray-200">
          You don't have any posts yet. Start creating content.
        </p>
      </div>
      <div>
        <ButtonLink
          type="button"
          size="sm"
          variant="subtle"
          to="/cash-flow/new"
          className="flex items-center gap-x-2"
        >
          {/* <Plus size={16} /> */}
          <p>New Plan</p>
        </ButtonLink>
      </div>
    </div>
  )
}

export default Board
