import express, { Request, Response } from 'express'

import { PrismaClient } from '../../generated/prisma'
import { todoMiddleware } from '../../middleware/todo/todo'
import { HttpResponse } from '../../constants/ResponseEnums'
import { TodoInput } from '../../types/zod'

const router = express.Router()

const prisma = new PrismaClient()

const message = 'Internal server error'

router.post('/add', todoMiddleware, async (req: Request, res: Response) => {
  try {
    const { title, description } = req.todoPayload as TodoInput
  } catch(err) {
    res.status(HttpResponse.INTERNAL_ERROR).json({
      success: false,
      msg: err instanceof Error? err: message
    })
  }
})

export default router