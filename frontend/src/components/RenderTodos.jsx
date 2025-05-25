export default function RenderTodos({ todos }) {
  return (
    <div>
      {
        todos.map((todo, index) => {
          return (
            <div key={index}>
              <h3> {todo.title} </h3>
              <h3> {todo.description} </h3>
              <button>
                { (todo.completed)? 'Completed': 'Mark as done' }
              </button>
            </div>
          )
        })
      }
    </div>
  )
}