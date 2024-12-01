// states
import { useState } from 'react'

// interfaces
import boardInterface from '../interfaces/boardInterface'

// image svgs
import iconDown from '../assets/dropdown.svg'
import iconUp from '../assets/dropdown-up.svg'
import logo from '../assets/Group 15.svg'
import plus from '../assets/+.svg'
import dots from '../assets/dots.svg'
// components
import { HeaderDropdown } from './HeaderDropdown'
import { AddEditBoardModal } from '../modals/AddEditBoardModal'
import { useDispatch, useSelector } from 'react-redux'

export const Header = ({boardModelOpen, setBoardModelOpen}:any) => {
  const dispatch = useDispatch()

  const [openDropdown, setDropdown] = useState(false);
  const [boardType, setBoardType] = useState('add')

  const boards = useSelector((state:boardInterface) => state.boards)
  const board = boards.find( board => board.isActive)
  return (
    <div className='p-4 fixed left-0 right-0 bg-white dark:bg-[#2b2c37] z-50'>
        <header className='flex justify-between dark:text-white items-center'>

            <div className='flex items-center space-x-2 md:space-x-4'>
                <img className='h-6 w-6' src={logo} alt="" />
                <h3 className='hidden md:inline-block font-bold font-sans md:text-4xl'>Kanban</h3>
                <div className='flex items-center space-x-2'>
                    <h3 className='max-w-[200px] md:text-2xl text-xl font-bold md:ml-20 font-sans'>{board?.name}</h3>
                    <div className='h-4 flex items-center' onClick={() => setDropdown(state => !state)}>
                        <img className='md:hidden cursor-pointer' src={openDropdown ? iconUp : iconDown} alt="" />
                    </div>
                </div>
            </div>

            <div className='flex space-x-4 items-center md:space-x-6'>
                <button 
                className='button hidden md:inline-block'>
                    + Add New Task
                </button>
                <button
                className='button py-1 px-3 w-[48px] flex items-center justify-center h-[32px] md:hidden'>
                    <img className='w-3 h-3' src={plus} alt="" />
                </button>
                <img className='cursor-pointer h-6' src={dots} alt="" />
            </div>

        </header>

        {openDropdown && <HeaderDropdown setDropdown={setDropdown} setBoardModelOpen={setBoardModelOpen}/>}
        
        {
            boardModelOpen && <AddEditBoardModal type={boardType} setBoardModelOpen={setBoardModelOpen} setDropDown={setDropdown}/>
        }
    </div>

  )
}
