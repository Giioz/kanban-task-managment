import { useEffect, useState } from "react"
import { v4 as uuidv4 } from 'uuid'

import crossIcon from '../assets/crossIcon.svg'
import { useDispatch, useSelector } from "react-redux"
import Boards, { Column, Subtask, Task } from "../interfaces/boardInterface"
import boardsSlice from "../redux/boardsSlice"


interface AddEditTaskModalProps {
  type: string,
  device: string,
  setopenAddEditTask: React.Dispatch<React.SetStateAction<boolean>>,
  setIsTaskModalOpen?: React.Dispatch<React.SetStateAction<boolean>>,
  taskIndex?: number,
  prevColIndex?: number,
}

export const AddEditTaskModal: React.FC<AddEditTaskModalProps> = ({ type, device, setopenAddEditTask, setIsTaskModalOpen, taskIndex, prevColIndex }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [isValid, setIsValid] = useState(true)

  const board = useSelector((state: Boards) => state.boards).find((board) => board.isActive)

  const dispatch = useDispatch()

  const columns: any = board?.columns
  const col = columns?.find((col: Column, index: number) => index === prevColIndex)

  const task = col ? col.tasks.find((task: Task, index: number) => index === taskIndex) : []

  const [isFirstLoad, setIsFirstLoad] = useState(true)
  const [newColIndex, setNewColIndex] = useState(prevColIndex)

  const [status, setStatus] = useState(
    columns && prevColIndex != undefined && prevColIndex >= 0 && prevColIndex < columns.length
      ? columns[prevColIndex].name
      : null
  )

  const [subtasks, setSubtasks] = useState([
    { title: '', isCompleted: false, id: uuidv4() },
    { title: '', isCompleted: false, id: uuidv4() }
  ])

  useEffect(() => {
    if (type === 'edit' && isFirstLoad && task) {
      setSubtasks(
        task.subtasks.map((subtask: Subtask) => {
          return { ...subtask, id: uuidv4() }
        })
      )
      setTitle(task.title)
      setDescription(task.description)
      setIsFirstLoad(false)
    }
  }, [isFirstLoad, task, type])

  const onChange = (id: string, newValue: string) => {
    setSubtasks((prevState) => {
      const newState = [...prevState]
      const subtask = newState.find((subtask) => subtask.id === id)
      if (subtask) subtask.title = newValue
      return newState
    })
  }

  const onDelete = (id: string) => {
    setSubtasks((prevState) => prevState.filter((cl) => cl.id !== id))
  }

  const validateTask = () => {
    setIsValid(false)
    if (!title.trim()) {
      return false
    }
    for (let i = 0; i < subtasks.length; i++) {
      if (!subtasks[i].title.trim()) {
        return false
      }
    }

    setIsValid(true)
    return true
  }

  const onSubmit = (type: string) => {
    if (type === 'add') {
      dispatch(boardsSlice.actions.addTask({
        title,
        description,
        subtasks,
        status,
        newColIndex
      }))
    } else {
      dispatch(
        boardsSlice.actions.editTask({
          title,
          description,
          subtasks,
          status,
          taskIndex,
          prevColIndex,
          newColIndex
        })
      )
    }
    setopenAddEditTask(false)
  }

  const onStatusChange = (e: any) => {
    setStatus(e.target.value)
    setNewColIndex(e.target.selectedIndex)
  }

  return (
    <div
      onClick={(e) => {
        if (e.target !== e.currentTarget) return
        setopenAddEditTask(false)
      }}
      className={
        device === 'mobile' ? 'p-6 pt-10 pb-40 absolute overflow-y-scroll left-0 flex right-0 bottom-[-100vh] top-0 bg-[#00000080]' :
          'p-6 pb-40 absolute overflow-y-scroll left-0 flex right-0 bottom-0 top-0 bg-[#00000080]'
      }
    >
      <div
        className="scrollbar-hide overflow-y-scroll max-h-[95vh] my-auto
        bg-white dark:bg-[#2b2c37] text-black dark:text-white font-bold
        shadow-md shadow-[#364e7e1a] max-w-md mx-auto w-full p-8 rounded-xl"
      >
        <h3 className="text-lg">
          {type === 'edit' ? 'Edit' : 'Add New'} Task
        </h3>

        <div className="mt-8 flex flex-col space-y-1">
          <label className="text-sm dark:text-white text-gray-500">
            Task Name
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-transparent px-4 py-2 outline-none focus:border-0 rounded-md text-sm border border-gray-600 focus:outline-[#635fc7] ring-0"
            placeholder="e.g Take coffee break"
            type="text" />
        </div>

        <div className="mt-8 flex flex-col space-y-1">
          <label className="text-sm dark:text-white text-gray-500">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-transparent px-4 py-2 outline-none focus:border-0 min-h-[200px] rounded-md text-sm border border-gray-600 focus:outline-[#635fc7] ring-0"
            placeholder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little."
          />
        </div>

        <div className="mt-8 flex flex-col">
          <label className="text-sm dark:text-white text-gray-500">
            Subtasks
          </label>

          {
            subtasks.map((subtask, index) => (
              <div
                key={index}
                className="flex items-center w-full"
              >
                <input
                  onChange={(e) => {
                    onChange(subtask.id, e.target.value)
                  }}
                  type="text"
                  value={subtask.title}
                  className="bg-transparent outline-none focus:border-0 border flex-grow px-4 py-2 rounded-md text-sm border-gray-600 foucs:outline-[#635fc7]"
                  placeholder="e.g Take coffee break"
                />
                <img
                  onClick={() => {
                    onDelete(subtask.id)
                  }}
                  src={crossIcon} className="m-4 cursor-pointer"
                />
              </div>
            ))
          }

          <button
            className="mt-3 w-full items-center dark:text-[#635fc7] dark:bg-white text-white bg-[#635fc7] py-2 rounded-full"
          >
            + Add New Subtask
          </button>
        </div>

        <div className="flex flex-col space-y-3 mt-6">
          <label className="text-sm dark:text-white text-gray-500">
            Current Status
          </label>
          <select
            value={status ?? ''}
            onChange={onStatusChange}
            className="select-status flex flex-grow px-4 py-2 rounded-md text-sm bg-transparent focus:border-0 border border-gray-300 dark:border-gray-600 focus:outline-[#635fc7] outline-none">
            {
              columns?.map((column: Column, index: number) => (
                <option
                  value={column.name}
                  key={index}
                >
                  {column.name}
                </option>
              ))
            }
          </select>

          <button
            onClick={() => {
              const isValid = validateTask()
              if (isValid) onSubmit(type)
            }}
            className="w-full items-center text-white bg-[#635fc7] py-2 rounded-full"
          >
            {type === 'edit' ? 'Save Changes' : 'Create Task'}
          </button>

        </div>
      </div>
    </div>
  )
}
