import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Column as col, Task } from "../interfaces/boardInterface";
import { shuffle } from "lodash";
import { Task as TaskComp } from "./Task";
import boardsSlice from "../redux/boardsSlice";
interface ColumnProps {
    colIndex: number;
  }

export const Column: React.FC<ColumnProps> = ({colIndex}) => {
    const colors: string[] = [
        'bg-red-500',
        'bg-orange-500',
        'bg-blue-500',
        'bg-purple-500',
        'bg-green-500',
        'bg-indigo-500',
        'bg-yellow-500',
        'bg-pink-500',
        'bg-sky-500',
    ]

    const [color, setColor] = useState<string | null>(null)

    const dispatch =useDispatch()
    const boards = useSelector((state:any) => state.boards)
    const board = boards.find((board:any) => board.isActive)
    const col = board?.columns.find((_col:col, i:number) => i === colIndex)
    if (!col) return null
    useEffect(() => {
      setColor(shuffle(colors).pop() || null)
    
      
    }, [dispatch])

    const handleOnDragOver = (e:React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
    }

    const handleOnDrop = (e:React.DragEvent<HTMLDivElement>) => {
      const { prevColIndex, taskIndex } = JSON.parse(e.dataTransfer.getData("text"))

      if(colIndex !== prevColIndex){
        dispatch(boardsSlice.actions.dragTask({colIndex, prevColIndex, taskIndex}))
      }
    }

  return (
    <div
    onDrop={handleOnDrop}
    onDragOver={handleOnDragOver}
    className="scrollbar-hide mx-5 pt-[90px] min-w-[280px]"
    >
      <p
      className="font-semibold flex items-center gap-2 tracking-widest
      md:tracking-normal text-[#828fa3]"
      >
        <div className={`rounded-full w-4 h-4 ${color}`}/>
        {/* bug here when choosing new created board */}
        {col.name} ({col?.tasks?.length})
      </p>

      {
        col.tasks?.map((task:Task, index:number) => (
          <TaskComp key={index} taskIndex={index} colIndex={colIndex} />
        ))
      }

    </div>
  )
}
