import { Request, Response, NextFunction } from 'express'
import { checkReqBody } from '../utility/checkReqBody'
import { TodoInput, todoSchema } from '../types/zodSchema'
import ResposeCodes from '../utility/ResponseCodes'

export function todoValidation(req: Request, res: Response, next: NextFunction) {
  checkReqBody(req, res)
  const payload = req.body as TodoInput
  const _payload = todoSchema.safeParse(payload)

  if (!_payload.success) {
    res.status(ResposeCodes.BAD_REQUEST).json({
      success: false,
      message: 'Invalid inputs',
      error: _payload.error.format(),
      meta: {
        timestamp: new Date().toISOString(),
        requestId: req.id
      }
    })
    return
  }

  req.validatedTodo = _payload.data
  next()
}