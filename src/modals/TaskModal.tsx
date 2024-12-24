import React from 'react'
import { useDispatch } from 'react-redux'

interface TaskModalProps {
  colIndex : number,
  taskIndex : number,
  setIsTaskModalOpen : React.Dispatch<React.SetStateAction<boolean>>
}

export const TaskModal: React.FC<TaskModalProps> = ({colIndex, taskIndex, setIsTaskModalOpen}) => {
  const dispatch = useDispatch()
  const co = colIndex

  return (
    <div>

    </div>
  )
}
