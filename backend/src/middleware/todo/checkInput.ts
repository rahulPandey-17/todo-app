import { Request, Response, NextFunction } from 'express'

import { todoSchema, TodoInput } from '../../types/zod'
import { HttpResponse } from '../../constants/ResponseEnums'

export function checkInput(req: Request, res: Response, next: NextFunction) {
  if (!req.body) {
    res.status(HttpResponse.BAD_REQUEST).json({
      success: false,
      msg: 'Payload not provided in the request body'
    })
    return
  }

  const payload: TodoInput = req.body
  const parsedPayload = todoSchema.safeParse(payload)

  if (!parsedPayload.success) {
    res.status(HttpResponse.BAD_REQUEST).json({
      success: false,
      msg: parsedPayload.error.flatten().fieldErrors
    })
    return
  }
  
  req.todoPayload = parsedPayload.data
  next()
}