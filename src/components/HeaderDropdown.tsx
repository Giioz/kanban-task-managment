// redux
import { useDispatch, useSelector } from "react-redux"
import Boards from "../interfaces/boardInterface";
// images
import boardImage from "../assets/board-image.svg"
import lightIcon from "../assets/lightIcon.svg"
import darkIcon from "../assets/darkIcon.svg"
// comp
import { Switch } from "@headlessui/react";
import useDarkMode from "../hooks/useDarkMode";
import { useState } from "react";
import boardsSlice from "../redux/boardsSlice";

export const HeaderDropdown = ({setDropdown, setBoardModelOpen}:any) => {
  const dispatch = useDispatch()
    // dark mode switch
  const [colorTheme, setTheme] = useDarkMode()
  const [darkSide, setDarkSide] = useState(
        colorTheme === 'light' ? true : false
  )

  const toggleDarkMode = (checked:boolean) => {
        setTheme(colorTheme)    
        setDarkSide(checked)
  }


  const boards = useSelector((state:Boards) => state.boards)
  
  
  return (
    <div 
    className="py-10 px-6 absolute left-0 right-0 bottom-[-100vh] 
    top-16 bg-[#00000080]"
    onClick={
        (e) => {
            if(e.target !== e.currentTarget)
                return
            setDropdown(false)
        }
    }
    >

        <div 
        className="bg-white dark:bg-[#2B2C37] shadow-md shadow-[#364e7Ee1] w-full
        py-4 rounded-xl">
            
            <h3 
            className="dark:text-gray-300 text-gray-600 font-semibold mx-4 mb-8">
                All Boards ({boards?.length})
            </h3>
            <div>
                {boards.map((board, index) => (
                    <div
                    className={`flex items-baseline space-x-2 px-5 py-4 
                    ${board.isActive && 'bg-[#635FC7] rounded-r-full text-white mr-8'}`}
                    key={index}
                    onClick={() => {
                        dispatch(boardsSlice.actions.setBoardActive({index}))
                    }}
                    >
                        <img src={boardImage} className="h-4 text-red-400"/>
                        <p
                        className={`text-lg font-bold ${!board.isActive && 'dark:text-gray-300 text-gray-600'}`}>
                            {board.name}
                        </p>
                    </div>
                ))}

                <div 
                className="flex items-center space-x-2 px-5 py-4 text-[#635FC7]"
                >
                    <img src={boardImage} alt="" />
                    <p
                    className="text-lg font-bold cursor-pointer"
                    onClick={() => {
                        setBoardModelOpen(true);
                        setDropdown(false)
                    }}
                    >
                        + Create New Board
                    </p>

                </div>
                <div
                className="mx-2 p-4 space-x-2 bg-slate-100 dark:bg-[#20212c] flex justify-center items-center rounded-lg"
                >
                    <img src={lightIcon} alt="" />
                    <Switch
                        checked={darkSide}
                        onChange={toggleDarkMode}
                        className={` ${darkSide ? ' bg-[#635fc7]' 
                        : ' bg-gray-200'}
                        relative inline-flex h-6 w-11
                        items-center rounded-full
                        }`}
                    >
                        <span
                        className={`${darkSide ? 'translate-x-6'
                        : 'translate-x-1'}
                        inline-block h-4 w-4 transform
                        rounded-full bg-white transition
                        }`}
                        >

                        </span>
                    </Switch>
                    <img src={darkIcon} alt="" />
                </div>
            </div>
        </div>
    </div>
  )
}
