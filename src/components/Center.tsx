import { useEffect, useState } from "react";
import { SideBar } from "./SideBar";
import { useSelector } from "react-redux";
import Boards, { Board } from "../interfaces/boardInterface";
import { Column } from "./Column";

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

        {
            columns?.map((col, index) => (
                <Column key={index} colIndex={index} />
            ))
        }


    </div>
  )
}
