import { useEffect, useState } from 'react'

import TodoForm from './components/TodoForm'
import RenderTodos from './components/RenderTodos'
import getTodos from './utility/axios/getTodos'

function App() {
  const [todos, setTodos] = useState([])

  useEffect(() => {
    getTodos(setTodos)
  }, [])

  return (
    <div className='dark: bg-gray-900 min-h-screen text-white px-3 py-5'>
      <TodoForm setTodos={setTodos} todos={todos}></TodoForm>
      <RenderTodos todos={todos}></RenderTodos>
    </div>
  )
}

export default App
