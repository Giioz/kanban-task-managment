import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Header } from './components/Header'
import { useState } from 'react'

function App() {
  const [boardModelOpen, setBoardModelOpen] = useState(false)
  return (
    <Header boardModelOpen={boardModelOpen} setBoardModelOpen={setBoardModelOpen}/>
  )
}

export default App
