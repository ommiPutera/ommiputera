import type {Id, Task} from '~/routes/personal-finance+'
import {useSortable} from '@dnd-kit/sortable'
import {CSS} from '@dnd-kit/utilities'

interface Props {
  task: Task
  deleteTask: (id: Id) => void
  updateTask: (id: Id, content: string) => void
}

function TaskCard({task, deleteTask, updateTask}: Props) {
  const {setNodeRef, attributes, listeners, transform, transition, isDragging} =
    useSortable({
      id: task.id,
      data: {
        type: 'Task',
        task,
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
        className="
        bg-mainBackgroundColor
      border-rose-500 relative flex h-[100px] min-h-[100px] cursor-grab items-center rounded-xl border-2 p-2.5  text-left opacity-30
      "
      />
    )
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {task.content}
    </div>
  )
}

export default TaskCard
