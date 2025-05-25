import axios from 'axios'

const base_url = import.meta.env.VITE_BASE_URL

export default async function getTodos(setTodos) {
  const res = await axios.get(`${base_url}/todos`)
  setTodos(res.data.todos)
}