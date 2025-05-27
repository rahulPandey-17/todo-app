export default function RenderTodoWrapper({ children, className = '', ...props }) {
  return (
    <div
      { ...props }
      className = {`flex flex-col space-y-4 mt-4 max-w-lg rounded-md rounded-b-md bg-gray-800 p-3 ${className}`}
    >
      { children }
    </div>
  )
}