import Decoded from './jwt'
import { LoginInput, TodoInput, UserInput } from './zodSchema'

declare global {
  namespace Express {
    interface Request {
      id?: string,
      validatedTodo?: TodoInput,
      validatedId?: string,
      validatedTitle?: string,
      validatedDescription?: string,
      validatedUserInput?: UserInput,
      validatedLoginInput?: LoginInput,
      decodedJwt?: Decoded
    }
  }
}