import { useState } from "react"
import { AddEditBoardModal } from "../modals/AddEditBoardModal"

interface EmptyBoardProps {
    type: string
}

export const EmptyBoard: React.FC<EmptyBoardProps> = ({type}) => {

    const [isBoardModelOpen, setIsBoardModelOpen] = useState(false)

  return (
    <div
    className="bg-white dark:bg-[#2b2c37] h-screen flex flex-col
    items-center justify-center"
    >
        <h3
        className="text-gray-500 font-bold px-2"
        >
            {
                type === 'edit' ? 'This board is empty. create a new column to get' +
                'started' : 'There are no boards avaliable. Create a new board to get started'
            }
        </h3>
        <button
        onClick={() => {
            setIsBoardModelOpen(true)
        }}
        className="w-full items-center max-w-xs font-bold hover:opacity-70
        dark:text-white dark:bg-[#635fc7] mt-8 relative text-white bg-[#635fc7]
        py-2 rounded-full"
        >
          { type === 'edit' ? '+ Add New Column' : '+ Add New Board'} 
        </button>

        {
            isBoardModelOpen && (
                <AddEditBoardModal
                type={type}
                setBoardModelOpen={setIsBoardModelOpen}
                />
            )
        }
    </div>
  )
}


