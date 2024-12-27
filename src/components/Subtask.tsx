import { useDispatch, useSelector } from "react-redux"
import Boards from "../interfaces/boardInterface"
import boardsSlice from "../redux/boardsSlice"

interface SubtaskProps {
  index:number,
  taskIndex:number,
  colIndex:number
}

export const Subtask:React.FC<SubtaskProps> = ({index, taskIndex, colIndex}) => {
  const dispatch = useDispatch()
  const boards = useSelector((state:Boards) => state.boards)
  const board = boards.find(board => board.isActive)
  const columns = board?.columns
  const col = columns?.find((column, i) => colIndex === i)
  const task = col?.tasks.find((col, i) => taskIndex === i)
  const subtasks = task?.subtasks.find((subtask,i) => i === index)
  const checked = subtasks?.isCompleted

  const onChange = () => {
    dispatch(
      boardsSlice.actions.setSubtaskCompleted({index, taskIndex, colIndex})
    )
  }

  return (
    <div
      className="w-full flex hover:bg-[#635fc740] dark:hover:bg-[#635fc740]
      rounded-md relative items-center justify-start dark:bg-[#20212c]
      p-3 gap-4 bg-[#f4f7fd]"
    >
      <input type="checkbox" className="w-4 h-4 accent-[#635fc7]
      cursor-pointer"
      checked={checked}
      onChange={onChange}
      />
      <p
      className={checked ? 'line-through opacity-30' : ''}
      >
        {subtasks?.title}
      </p>
    </div>
  )
}
