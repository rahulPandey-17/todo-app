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

type TodoInput = z.infer<typeof todoSchema>

export {
  todoSchema,
  TodoInput,
  idSchema,
  titleSchema,
  descriptionSchema
}