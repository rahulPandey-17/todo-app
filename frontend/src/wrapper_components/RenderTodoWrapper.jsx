export default function RenderTodoWrapper({ children, className = '', ...props }) {
  return (
    <div
      { ...props }
      className = {`flex flex-col mt-4 max-w-lg rounded rounded-b-md bg-purple-800 p-3 ${className}`}
    >
      { children }
    </div>
  )
}