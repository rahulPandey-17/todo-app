import { TodoInput } from './zodSchema'

declare global {
  namespace Express {
    interface Request {
      id?: string,
      validatedTodo?: TodoInput
    }
  }
}