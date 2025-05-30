const { z } = require('zod')

const todoSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100),
  description: z.string().max(300).optional()
})

const idSchema = z.object({
  id: z.string()
})

module.exports = {
  todoSchema,
  idSchema
}