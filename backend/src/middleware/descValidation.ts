import { Request, Response, NextFunction } from 'express'
import { descriptionSchema } from '../types/zodSchema'
import { checkReqBody } from '../utility/checkReqBody'
import ResponseCodes from '../utility/ResponseCodes'

export function descValidation(req: Request, res: Response, next: NextFunction) {
  checkReqBody(req, res)
  const payload = req.body
  const _payload = descriptionSchema.safeParse(payload)

  if (!_payload.success) {
    res.status(ResponseCodes.BAD_REQUEST).json({
      success: false,
      message: 'Invalid input',
      error: _payload.error.format(),
      meta: {
        timestamp: new Date().toISOString(),
        requestId: req.id
      }
    })
    return
  }

  req.validatedTitle = _payload.data.description
  next()
}