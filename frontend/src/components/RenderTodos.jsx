import markAdDone from '../utility/axios/markAsCompleted'
import RenderTodoWrapper from '../wrapper_components/RenderTodoWrapper'

export default function RenderTodos({ todos }) {
  return (
    <div>
      {
        todos.map((todo, index) => {
          return (
            <RenderTodoWrapper key={index}>
              <h3> {todo.title} </h3>
              <h3> {todo.description} </h3>
              <button
               className='rounded rounded-b-md bg-white text-black font-semibold cursor-pointer text-shadow-2xs w-full h-10'
               onClick={() => markAdDone(todo._id)}
              >
                { (todo.completed)? 'Completed': 'Mark as done' }
              </button>
            </RenderTodoWrapper>
          )
        })
      }
    </div>
  )
}