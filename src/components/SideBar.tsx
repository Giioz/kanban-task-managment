import { useDispatch, useSelector } from "react-redux"
import useDarkMode from "../hooks/useDarkMode"
import { useState } from "react"
import boardsSlice from "../redux/boardsSlice"
import Boards, { Board } from "../interfaces/boardInterface"

// images
import boardImage from "../assets/board-image.svg"

export const SideBar = ({setIsSidebarOpen, IsSideBarOpen}:any) => {
  const dispatch = useDispatch()
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
    <div>
     
        <div
        className={IsSideBarOpen
          ? `min-w-[261px] bg-white dark:bg-[#2b2c37]  fixed top-[72px] h-screen  items-center left-0 `
          : ` bg-[#635FC7] dark:bg-[#2b2c37] dark:hover:bg-[#635FC7] top-auto bottom-20 justify-center items-center hover:opacity-80 cursor-pointer  p-0 transition duration-300 transform fixed flex w-[56px] h-[48px] rounded-r-full  `}
        >
          <div>
            {
              IsSideBarOpen && (
                <div
                className="bg-white dark:bg-[#2b2c37]
                w-full py-4 rounded-xl top-0">
                  <h3
                  className="dark:text-gray-300 text-gray-600 font-semibold mx-4 mb-8"
                  >
                    ALL BOARDS ({boards?.length})
                  </h3>
                  <div
                  className="flex flex-col h-[70vh] justify-between"
                  >
                      <div>
                        {boards.map((board, index) => (
                          <div
                          className={`flex items-baseline space-x-2 px-5 mr-8 rounded-r-full
                          duration-500 ease-in-out py-4 cursor-pointer hover:bg-[#635fc71a] hover:text-[#635fc7] dark:hover:bg-white dark:hover:text-[#635fc7]
                          dark:text-white ${board.isActive && "bg-[#635fc7] rounded-r-full text-white mr-8"}`}
                          key={index}
                          onClick={() => {
                            dispatch(boardsSlice.actions.setBoardActive({index}))
                          }}
                          >
                            <img src={boardImage} className="h-4"/>
                            <p className="text-lg font-bold">
                              {board.name}
                            </p>
                          </div>
                        ))}
                      </div>
                  </div>
                </div>
              )
            }
          </div>
        </div>
    </div>
  )
}
