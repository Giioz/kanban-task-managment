import { useSelector } from "react-redux"
import { Column, Subtask, Task as TaskProp } from "../interfaces/boardInterface"
import { useState } from "react"
import { TaskModal } from "../modals/TaskModal"

interface TaskProps {
    taskIndex : number,
    colIndex : number,
}

export const Task: React.FC<TaskProps> = ({taskIndex, colIndex}) => {
    const boards = useSelector((state:any) => state.boards)
    const board = boards.find((board:any) => board.isActive)
    const columns = board.columns
    const col = columns.find((col:Column, i:number) => i === colIndex)
    const task : TaskProp = col?.tasks.find((task:TaskProp, i:number) => i === taskIndex)

    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false)

    let completed = 0
    let subtasks = task?.subtasks
    if(subtasks) 
      subtasks.forEach((subtask:Subtask) => {
        if(subtask.isCompleted)
          completed++
      })
    
    const handleOnDrag = (e:React.DragEvent<HTMLDivElement>) => {
      e.dataTransfer.setData("text", JSON.stringify({taskIndex, prevColIndex : colIndex}))
    }


  return (
    <div>
        <div
        draggable
        onDragStart={handleOnDrag}
        onClick={() => {
          setIsTaskModalOpen(true)
        }}
        className="w-[280px] first:my-5 rounded-lg bg-white dark:bg-[#2b2c37]
        shadow-[#364e7e1a] py-6 px-3 shadow-lg hover:text-[#635fc7]
        dark:text-white dark:hover:text-[#635fc7] cursor-pointer"
        >
          <p
          className="font-bold tracking-wide"
          >
            {task?.title}
          </p>
          <p
          className="font-bold text-xs tracking-lighter mt-2 text-gray-500"
          >
            {completed} of {subtasks?.length} completed tasks
          </p>
        </div>
        {
            isTaskModalOpen && (
              <TaskModal 
              colIndex={colIndex}
              taskIndex={taskIndex}
              setIsTaskModalOpen={setIsTaskModalOpen}
              />
            )
        }
    </div>
  )
}
