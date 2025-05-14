import express, { Request, Response } from 'express'

import { PrismaClient } from '../../generated/prisma'
import { checkInput } from '../../middleware/todo/checkInput'
import { checkToken } from '../../middleware/todo/checkToken'
import { HttpResponse } from '../../constants/ResponseEnums'
import { TodoInput } from '../../types/zod'
import { PrismaClientKnownRequestError } from '../../generated/prisma/runtime/library'

const router = express.Router()

const prisma = new PrismaClient()

const message = 'Internal server error'

router.post('/add', checkInput, checkToken, async (req: Request, res: Response) => {
  try {
    const { title, description } = req.todoPayload as TodoInput
    const userId = Number(req.userId)

    await prisma.todo.create({
      data: {
        title,
        description,
        user: {
          connect: {id: userId}
        }
      }
    })

    res.status(HttpResponse.CREATED).json({
      success: true,
      msg: 'Todo created successfully'
    })
  } catch(err: unknown) {
    if (err instanceof PrismaClientKnownRequestError && err.code === 'P2002') {
      res.status(HttpResponse.BAD_REQUEST).json({
        success: false,
        msg: err.meta?.target
      })
    }

    res.status(HttpResponse.INTERNAL_ERROR).json({
      success: false,
      msg: message
    })
  }
})

router.get('/show', async (req: Request, res: Response) => {
  try {
    const todos = await prisma.users.findUnique({
      where: { email: req.userEmail },
      select: { todos: true }
    })

    res.status(HttpResponse.OK).json({
      success: true,
      todos
    })
  } catch(err) {
    res.status(HttpResponse.INTERNAL_ERROR).json({
      success: false,
      msg: err instanceof Error? err.message: message
    })
  }
})

export default router