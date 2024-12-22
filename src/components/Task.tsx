import { useSelector } from "react-redux"
import { Column, Task as TaskProp } from "../interfaces/boardInterface"
import { useState } from "react"

interface TaskProps {
    taskIndex : number,
    colIndex : number,
}

export const Task: React.FC<TaskProps> = ({taskIndex, colIndex}) => {
    const boards = useSelector((state:boards) => state.boards)
    const board = boards.find((board:board) => board.isActive)
    const columns = board.columns
    const col = columns.find((col:Column, i:number) => i === taskIndex)
    const task = col.tasks.find((task:TaskProp, i:number) => i === taskIndex)

    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false)
  return (
    <div>Task</div>
  )
}
