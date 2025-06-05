import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

import env from '../../types/env'
import ResponseCodes from '../../utility/ResponseCodes'
import { checkJWTKey } from '../../utility/jwt/checkKey'
import { Decoded } from '../../types/jwt'

export function tokenValidation(req: Request, res: Response, next: NextFunction) {
  if (!req.cookies) {
    res.status(ResponseCodes.UNAUTHORIZED).json({
      success: false,
      message: 'Cookie not provided',
      meta: {
        timestamp: new Date().toISOString(),
        requestId: req.id
      }
    })
    return
  }

  const token = req.cookies.token as string
  const key = env.JWT_KEY
  checkJWTKey(req, res)

  // verifying the token
  try {
    const decoded = jwt.verify(token, key) as Decoded
    req.decodedJwt = decoded
    next()
  } catch(err) {
    res.status(ResponseCodes.UNAUTHORIZED).json({
      success: false,
      message: 'token authorization failed',
      error: (err instanceof Error) && err.message,
      meta: {
        timestamp: new Date().toISOString(),
        requestId: req.id
      }
    })
  }
}