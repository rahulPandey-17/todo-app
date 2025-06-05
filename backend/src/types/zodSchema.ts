import { z } from 'zod'

const todoSchema = z.object({
  title: z.string().min(1, 'title is required').max(100),
  description: z.string().max(300).optional()
})

const idSchema = z.string().min(1, 'todo id is required')

const titleSchema = z.object({
  title: z.string().min(1, 'title is required').max(100)
})

const descriptionSchema = z.object({
  description: z.string().max(300).optional()
})

const userSchema = z.object({
  firstName: z.string().min(1, 'first name is required').max(100),
  lastName: z.string().max(150).optional(),
  email: z.string().email().min(1, 'email is required').max(150),
  password: z.string().min(6, 'password must be atleast 6 characters long')
})

const loginSchema = z.object({
  email: z.string().email().min(1, 'email is required').max(150),
  password: z.string().min(6, 'password must be atleast 6 characters long')
})

type TodoInput = z.infer<typeof todoSchema>
type UserInput = z.infer<typeof userSchema>
type LoginInput = z.infer<typeof loginSchema>

export {
  todoSchema,
  TodoInput,
  idSchema,
  titleSchema,
  descriptionSchema,
  userSchema,
  UserInput,
  loginSchema,
  LoginInput
}