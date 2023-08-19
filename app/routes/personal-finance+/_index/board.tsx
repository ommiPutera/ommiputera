import type { DragEndEvent, DragOverEvent, DragStartEvent } from '@dnd-kit/core'
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import type { Post } from '@prisma/client'
import { Link, useLoaderData } from '@remix-run/react'
import { Filter, Plus, PlusCircle } from 'lucide-react'
import React from 'react'
import { ButtonLink } from '~/components/button'
import ColumnContainer from '~/components/kanban/column-container'
import TaskCard from '~/components/kanban/task-card'
import type { Column, Id, Task } from '~/components/kanban/types'
import type { LoaderData } from '.'
import { format } from 'date-fns'

export default function Board() {
  const { posts } = useLoaderData<LoaderData>()
  const isPostsExist = Boolean(posts?.length)
  const defaultCols: Column[] = [
    {
      id: 'toPlan',
      title: 'To Plan',
    },
    {
      id: 'onPlanning',
      title: 'On Planning',
    },
    {
      id: 'onGoing',
      title: 'On Going',
    },
    {
      id: 'achieve',
      title: 'Achieve',
    },
    {
      id: 'failed',
      title: 'Failed',
    },
  ]

  const postTest: Task[] | undefined = posts?.map((post, index) => {
    return {
      id: post.id,
      columnId: index % 2 === 0 ? 'onPlanning' : 'toPlan',
      content: (
        <UpdatePage key={post.id} {...JSON.parse(JSON.stringify(post))} />
      ),
    }
  })

  return (
    <>
      <div className="mb-6 flex flex-col px-3">
        <Tools />
      </div>
      {isPostsExist ? (
        <div className="full-bleed-kanban">
          <Kanban defaultCols={defaultCols} defaultTasks={postTest ?? []} />
        </div>
      ) : (
        <NoData />
      )}
    </>
  )
}

function Tools() {
  const { posts } = useLoaderData<LoaderData>()
  const isPostsExist = Boolean(posts?.length)

  if (!isPostsExist) return <></>
  return (
    <div className="relative mx-auto flex w-full max-w-3xl justify-between px-3">
      <ButtonLink
        size="sm"
        rounded="sm"
        type="button"
        to="/personal-finance/new"
        className="flex items-center gap-x-2"
      >
        <PlusCircle size={16} />
        <p className="text-sm">New Plan</p>
      </ButtonLink>
      <div className="">
        <ButtonLink
          type="button"
          size="sm"
          variant="subtle"
          to="/personal-finance/new"
          className="flex items-center gap-x-2 rounded-lg px-3 text-blue-500"
        >
          <Filter size={16} />
          <p>Filter</p>
        </ButtonLink>
      </div>
    </div>
  )
}

function NoData() {
  return (
    <div className="mx-auto grid max-w-3xl gap-y-4 rounded-lg py-16 text-center">
      <div className="mx-auto w-fit rounded-full bg-gray-100 p-5 dark:bg-gray-800">
        <img src="/vectors/checklist.png" alt="" className="h-10 w-10" />
      </div>
      <div>
        <h5 className="text-lg font-medium">No expense data created.</h5>
        <p className="text-center text-sm font-normal leading-normal text-gray-400 dark:text-gray-200">
          You don't have any posts yet. Start creating content.
        </p>
      </div>
      <div className="mx-auto">
        <ButtonLink
          type="button"
          size="sm"
          variant="subtle"
          to="/personal-finance/new"
          className="flex items-center gap-x-2"
        >
          <Plus size={16} />
          <p>New Plan</p>
        </ButtonLink>
      </div>
    </div>
  )
}

function UpdatePage({ id, title, updatedAt }: Post) {
  return (
    <div className="col-span-1 cursor-pointer py-2.5 border-b border-gray-100 dark:border-gray-800">
      <Link to={`/personal-finance/${id}`}>
        <div className="flex flex-col">
          <h4 className="text-md font-semibold leading-4 whitespace-normal">{title.length >= 35 ? title.slice(0, 35) + '..' : title}</h4>
          <p className='text-sm font-normal text-gray-400 dark:text-gray-200'>{format(new Date(updatedAt), 'dd/MM/yy')}</p>
        </div>
      </Link>
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

  const [tasks, setTasks] = React.useState<Task[]>(defaultTasks)
  const [activeColumn, setActiveColumn] = React.useState<Column | null>(null)
  const [activeTask, setActiveTask] = React.useState<Task | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 30,
      },
    }),
  )

  const tasksIds = React.useMemo(() => {
    return tasks.map(task => task.id)
  }, [tasks])

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
    >
      <div className="wrapper-full-bleed-kanban">
        {columns.map(col => (
          <SortableContext
            key={col.id}
            items={tasksIds}
            strategy={verticalListSortingStrategy}
          >
            <ColumnContainer
              column={col}
              deleteColumn={deleteColumn}
              updateColumn={updateColumn}
              createTask={createTask}
              deleteTask={deleteTask}
              updateTask={updateTask}
              tasks={tasks.filter(task => task.columnId === col.id)}
            />
          </SortableContext>
        ))}
      </div>
      <DragOverlay>
        {activeColumn && (
          <SortableContext
            items={tasksIds}
            strategy={verticalListSortingStrategy}
          >
            <ColumnContainer
              column={activeColumn}
              deleteColumn={deleteColumn}
              updateColumn={updateColumn}
              createTask={createTask}
              deleteTask={deleteTask}
              updateTask={updateTask}
              tasks={tasks.filter(task => task.columnId === activeColumn.id)}
            />
          </SortableContext>
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
    const { active, over } = event
    const isActiveATask = active.data.current?.type === 'Task'
    const isOverATask = over?.data.current?.type === 'Task'
    if (active.id !== over?.id && isActiveATask === isOverATask) {
      setColumns(columns => {
        const activeColumnIndex = columns.findIndex(col => col.id === active.id)
        const overColumnIndex = columns.findIndex(col => col.id === over?.id)
        return arrayMove(columns, activeColumnIndex, overColumnIndex)
      })
    }
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
