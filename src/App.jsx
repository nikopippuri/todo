import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [task,setTask] = useState("")
  const [tasks,setTasks] = useState([])

  return (
    <>
      <div id="container"></div>
      <h3>Todos</h3>
      <form>
        <input placeholder='Add new task'/>
      </form>
    <ul></ul>
    </>
  )
}

export default App
