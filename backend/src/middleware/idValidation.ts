import { Request, Response, NextFunction } from 'express'
import { idSchema } from '../types/zodSchema'
import { checkReqParam } from '../utility/checkReqParam'
import ResponseCodes from '../utility/ResponseCodes'

export function idValidation(req: Request, res: Response, next: NextFunction) {
  checkReqParam(req, res)
  const payload = req.params.todoId
  const _payload = idSchema.safeParse(payload)

  if (!_payload.success) {
    res.status(ResponseCodes.BAD_REQUEST).json({
      success: false,
      message: 'Invalid id',
      error: _payload.error.format(),
      meta: {
        timestamp: new Date().toISOString(),
        requestId: req.id
      }
    })
    return
  }

  req.validatedId = _payload.data
  next()
}