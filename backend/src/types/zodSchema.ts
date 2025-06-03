import { z } from 'zod'

const todoSchema = z.object({
  title: z.string().min(1, 'title is required').max(100),
  description: z.string().max(300).optional()
})

type TodoInput = z.infer<typeof todoSchema>

export {
  todoSchema,
  TodoInput
}