import { LoginInput, SignupInput, TodoInput } from '../zod'

declare global {
  namespace Express {
  interface Request {
    signupPayload?: SignupInput,
    parsedLoginPayload?: LoginInput,
    todoPayload?: TodoInput,
    userId?: string,
    userEmail?: string
  }
}
}