import { useState } from 'react'
import axios from 'axios'

export default function TodoInput() {
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')

  async function createTodo() {
    // execute axios
  }

  return (
    <div>
      <input type="text" placeholder='title' onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)} />
      <br /><br />
      <input type="text" placeholder='description' onChange={ (e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value) } />
      <br /><br />
      <button onClick={createTodo}>
        Add Todo
      </button>
    </div>
  )
}