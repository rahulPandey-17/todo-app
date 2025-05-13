import { Request, Response, NextFunction } from 'express'

import { LoginInput, loginSchema } from '../../types/zod'
import { HttpResponse } from '../../constants/ResponseEnums'

export function loginMiddleware(req: Request, res: Response, next: NextFunction) {
  if (!req.body) {
    throw new Error('Request body not provided')
  }
  
  const payload: LoginInput = req.body

  try {
    const parsedPayload = loginSchema.safeParse(payload)
    req.parsedLoginPayload = parsedPayload.data
    next()
  } catch(err) {
    res.status(HttpResponse.BAD_REQUEST).json({
      success: false,
      msg: err instanceof Error ? err.message : 'Invalid inputs'
    })
  }
}