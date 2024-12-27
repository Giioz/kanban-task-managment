import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Boards, {Subtask } from '../interfaces/boardInterface'
import { Column } from '../components/Column'
import dots from '../assets/dots.svg'
import { ElipsisMenu } from '../components/ElipsisMenu'
import { Subtask as SubtaskComp } from '../components/Subtask'
import boardsSlice from '../redux/boardsSlice'

interface TaskModalProps {
  colIndex : number,
  taskIndex : number,
  setIsTaskModalOpen : React.Dispatch<React.SetStateAction<boolean>>
}

export const TaskModal: React.FC<TaskModalProps> = ({colIndex, taskIndex, setIsTaskModalOpen}) => {
  const dispatch = useDispatch()
  const boards = useSelector((state:Boards) => state.boards)
  const board = boards.find(board => board.isActive)
  const columns = board?.columns
  const col = columns?.find((column, i) => colIndex === i)
  const task = col?.tasks.find((col, i) => taskIndex === i)
  const subtasks = task?.subtasks

  let completed = 0
  if(subtasks) 
    subtasks.forEach((subtask:Subtask) => {
      if(subtask.isCompleted)
        completed++
    })

  const [status, setStatus] = useState(task?.status)
  const [elipsisMenuOpen, setElipsisMenuOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  
  const [newColIndex, setNewColIndex] = useState<number>(col && columns ? columns.indexOf(col) : -1);

  const setOpenEditModal = () => {

  }

  const setOpenDeleteModal = () => {
    setIsDeleteModalOpen(true)
  }

  const onChange = (e : React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value)
    setNewColIndex(e.target.selectedIndex)
  }


  return (
    <div

      className=' fixed right-0 left-0 top-0 px-2 py-4 overflow-scroll
      scrollbar-hide z-50 bottom-0 justify-center items-center flex bg-[#00000080]'
    >
      {/* modal */}
      <div
        className='scrollbar-hide overflow-y-scroll max-h-[95vh] my-auto bg-white
        dark:bg-[#2b2c37] text-black dark:text-white font bold shadow-md shadow-[#364e7e1a]
        max-w-md mx-auto w-full px-8 py-8 rounded-xl'
      >

        <div
        className='relative flex justify-between w-full items-center'
        >
          <h1 className='text-lg'>
            {task?.title}
          </h1>
          
          <img src={dots} 
            onClick={() => {
              setElipsisMenuOpen(state => !state)
            }}
            className='cursor-pointer h-6'
          />

          {
            elipsisMenuOpen && <ElipsisMenu 
            setOpenEditModal={setOpenEditModal}
            setOpenDeleteModal={setOpenDeleteModal}
            type='Task'/>
            
          }

        </div>

        <p
          className='text-gray-500 font-semibold tracking-wide text-sm pt-6'
        >
          {task?.description}
        </p>

        <p
          className='pt-6 text-gray-500 tracking-widest text-sm'
        >
          Subtasks ({completed} of {subtasks?.length})
        </p>

        {/* subtasks */}

        <div
          className='mt-3 space-y-2'
        >
          {
            subtasks?.map((subtask, i) => (
              <SubtaskComp 
                index={i}
                taskIndex={taskIndex}
                colIndex={colIndex}
                key={i}/>
            ))
          }
        </div>
        
         {/* Status  */}

         <div
         className='mt-8 flex flex-col space-y-3'
         >
          <label
          className='text-sm dark:text-white text-gray-500'
          >
            Current Status
          </label>

          <select
            className='select-status flex-grow px-4 py-2 rounded-md text-sm
            bg-transparent focus:border-0 border border-gray-300 focus:outline-[#635fc7]
            outline-none'
            value={status}
            onChange={onChange}
          >
            {
              columns?.map((column,index) => (
                <option
                className='status-option'
                >
                  {column.name}
                </option>
              ))
            }
          </select>

         </div>

      </div>

    </div>
  )
}
