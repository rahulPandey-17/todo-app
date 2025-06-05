import { Request, Response, NextFunction } from 'express'
import { LoginInput, loginSchema } from '../../types/zodSchema'
import { checkReqBody } from '../../utility/checkReqBody'
import ResponseCodes from '../../utility/ResponseCodes'

export function loginValidation(req: Request, res: Response, next: NextFunction) {
  checkReqBody(req, res)
  const payload = req.body as LoginInput
  const _payload = loginSchema.safeParse(payload)

  if (!_payload.success) {
    res.status(ResponseCodes.BAD_REQUEST).json({
      success: false,
      message: 'Invalid inputs',
      error: _payload.error.format(),
      meta: {
        timestamp: new Date().toString(),
        requestId: req.id
      }
    })
    return
  }

  req.validatedLoginInput = _payload.data
  next()
}