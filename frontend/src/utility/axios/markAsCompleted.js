import axios from 'axios'

const base_url = import.meta.env.VITE_BASE_URL

export default async function markAdDone(id) {
  try {
    const res = await axios.put(`${base_url}/completed`, {
      id
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    alert('Marked as done successfully')
    console.log('Operation successful', res.data.updatedTodo.completed)
  } catch(err) {
    alert('Operation failed')
    console.error(err)
  }
}