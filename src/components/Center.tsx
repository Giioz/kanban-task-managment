import { useEffect, useState } from "react";
import { SideBar } from "./SideBar";
import { useSelector } from "react-redux";
import Boards, { Board } from "../interfaces/boardInterface";
import { Column } from "./Column";
import { EmptyBoard } from "./EmptyBoard";
import { AddEditBoardModal } from "../modals/AddEditBoardModal";

interface CenterProps {
    boardModelOpen: boolean;
    setBoardModelOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }

export const Center: React.FC<CenterProps> = ({boardModelOpen, setBoardModelOpen}) => {

    const [windowSize, setWindowSize] = useState(
        [
            window.innerWidth,
            window.innerHeight,
            
        ]
    )
    const s = boardModelOpen
    
    const [isSideBarOpen, setIsSideBarOpen] = useState(true)

    const boards = useSelector((state:Boards) => state.boards)
    const board = boards.find((board:Board) => board.isActive === true)
    const columns = board?.columns

    useEffect(() => {
        const handleWindowResize = () => {
            setWindowSize([window.innerWidth, window.innerHeight])
        }
        window.addEventListener('resize', handleWindowResize)

        return () => {
            window.removeEventListener("resize", handleWindowResize)
        }
    })
  return (
    <div
    className={
        windowSize[0] >= 768 && isSideBarOpen ? 'bg-[#f4f7fd] scrollbar-hide h-screen flex dark:bg-[#20212c] overflow-x-scroll gap-6 ml-[261px]' :
        'bg-[#f4f7fd] scrollbar-hide h-screen flex dark:bg-[#20212c] overflow-x-scroll gap-6'
    }
    >
        {
            windowSize[0] >= 768 && (
                <SideBar />
            )
        }

        {/* cols section */}
        {columns && columns.length > 0 ? (
            <>
                {
                    columns?.map((col, index) => (
                        <Column key={index} colIndex={index} />
                    ))
                }
                <div
                onClick={() => {
                    setBoardModelOpen(true)
                }}
                className="h-screen dark:bg-[#2b2c3740] flex justify-center items-center
                font-bold text-2xl hover:text-[#635fc7] transition duration-300
                cursor-pointer bg-[#e9effa] scrollbar-hide mb-2 mx-5 pt-[90px] min-w-[280px] text-[#828fa3] mt-[135px] rounded-lg"
                >
                    + New Column
                </div>
            </>
            ):
            <>
                <EmptyBoard type='edit'/>
            </>
        }
        {
            boardModelOpen && (
                <AddEditBoardModal
                type='edit'
                setBoardModelOpen={setBoardModelOpen}
                />
            )
        }


    </div>
    )
    }
