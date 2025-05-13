import { Request, Response, NextFunction } from 'express';

import { signupSchema, SignupInput } from '../../types/zod'
import { HttpResponse } from '../../constants/ResponseEnums'

export function signupMiddleware(req: Request, res: Response, next: NextFunction) {
  const payload: SignupInput = req.body

  try {
    const parsedPayload = signupSchema.safeParse(payload)
    req.signupPayload = parsedPayload.data
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message)
    }

    res.status(HttpResponse.BAD_REQUEST).json({
      success: false,
      msg: 'Invalid inputs'
    })
  }
}