import { useState } from 'react'

import addTodo from '../utility/axios/addTodo'

export default function TodoForm({ setTodos, todos }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      const newTodo = await addTodo(title, description)
      setTodos([newTodo, ...todos])
      setTitle('')
      setDescription('')
      alert('Todo added!')
    } catch(err) {
      console.error('Failed to add todo:', err)
      alert('Failed to add todo!')
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className='flex flex-col space-y-4 max-w-lg'>
          <input type="text" placeholder='title' value={title} onChange={(e) => setTitle(e.target.value)}
            className='border border-gray-400 p-2 rounded focus:outline-none focus:border-blue-700
                                w-full'
          />
            <textarea type="text" placeholder='description' value={description} onChange={(e) => setDescription(e.target.value)} 
              className='border border-gray-400 p-2 rounded focus:outline-none focus:border-blue-700
                                w-full'
          />
          <button type='submit'
            className='w-full bg-blue-800 text-white rounded h-10 hover:bg-blue-900 cursor-pointer'
          >
            Add Todo
          </button>
        </div>
      </form>
    </div>
  )
}