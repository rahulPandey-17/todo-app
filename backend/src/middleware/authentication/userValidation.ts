import { Request, Response, NextFunction } from 'express'
import { UserInput, userSchema } from '../../types/zodSchema'
import { checkReqBody } from '../../utility/checkReqBody'
import ResponseCodes from '../../utility/ResponseCodes'

export function userValidation(req: Request, res: Response, next: NextFunction) {
  checkReqBody(req, res)
  const payload = req.body as UserInput
  const _payload = userSchema.safeParse(payload)

  if (!_payload.success) {
    res.status(ResponseCodes.BAD_REQUEST).json({
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

  req.validatedUserInput = _payload.data
  next()
}