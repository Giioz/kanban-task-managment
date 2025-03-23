import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import { Center } from './components/Center'
import { Header } from './components/Header'
import { useState } from 'react'
import boardsSlice from './redux/boardsSlice'
import Boards, { Board } from './interfaces/boardInterface'
import { EmptyBoard } from './components/EmptyBoard'

function App() {
  const dispatch = useDispatch()
  const boards  = useSelector((state:Boards) => state.boards) 
  const activeBoard = boards.find((board:Board) => board.isActive)

  if(!activeBoard && boards.length > 0){
    dispatch(boardsSlice.actions.setBoardActive({index : 0}))
  }

  const [boardModelOpen, setBoardModelOpen] = useState(false)
  return (
    <div
      className='overflow-hidden overflow-x-scroll'
    >
      <>
        {boards.length > 0 ? 
          <>
            {/* HEADER */}
                    
            <Header boardModelOpen={boardModelOpen} setBoardModelOpen={setBoardModelOpen}/>

            {/* Center Section */}
            <Center boardModelOpen={boardModelOpen} setBoardModelOpen={setBoardModelOpen}/>
          </>
          :
          <>
            <EmptyBoard type='add'/>
          </>
        }
       
      </>
    </div>
  )
}

export default App
function useSelect(arg0: (state: any) => any) {
  throw new Error('Function not implemented.')
}

