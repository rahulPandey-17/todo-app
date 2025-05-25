import axios from 'axios'

const base_url = import.meta.env.VITE_BASE_URL

export default async function addTodo(title, description) {
  const res = await axios.post(`${base_url}/add`, {
    title,
    description
  }, {
    headers: {
      'Content-type': 'application/json'
    }
  })
  console.log('Todo added successfully:', res.data.todo)
}