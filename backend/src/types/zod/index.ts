import { z } from 'zod'

const signupSchema = z.object({
  firstName: z.string().min(1, 'First name required').max(100),
  lastName: z.string().max(100).optional(),
  email: z.string().email().max(100),
  password: z.string().min(6, 'Password must be atleast 6 characters long')
})

const loginSchema = z.object({
  email: z.string().email().max(100),
  password: z.string().min(6, 'Password must be atleast 6 characters long')
})

const todoSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  description: z.string().max(300)
})

type SignupInput = z.infer<typeof signupSchema>
type LoginInput = z.infer<typeof loginSchema>
type TodoInput = z.infer<typeof todoSchema>

export {
  TodoInput,
  todoSchema,
  LoginInput,
  loginSchema,
  SignupInput,
  signupSchema
}