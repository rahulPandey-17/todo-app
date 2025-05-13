import { LoginInput, SignupInput } from '../zod'

declare global {
  namespace Express {
  interface Request {
    signupPayload?: SignupInput,
    parsedLoginPayload?: LoginInput
  }
}
}