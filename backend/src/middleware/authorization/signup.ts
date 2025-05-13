import { Request, Response, NextFunction } from 'express';

import { signupSchema, SignupInput } from '../../types/zod'
import { HttpResponse } from '../../constants/ResponseEnums'

export function signupMiddleware(req: Request, res: Response, next: NextFunction) {
  if (!req.body) {
    res.status(HttpResponse.BAD_REQUEST).json({
      success: false,
      msg: 'Payload not provided in the request body'
    })
    return
  }
  
  const payload: SignupInput = req.body
  const parsedPayload = signupSchema.safeParse(payload)
  
  if (!parsedPayload.success) {
    res.status(HttpResponse.BAD_REQUEST).json({
      success: false,
      msg: parsedPayload.error?.flatten().fieldErrors
    })
    return
  }
  
  req.signupPayload = parsedPayload.data
  next()
}