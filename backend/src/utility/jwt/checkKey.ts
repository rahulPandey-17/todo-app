import { Request, Response } from 'express'

import env from '../../types/env'
import ResponseCodes from '../ResponseCodes'

export function checkJWTKey(req: Request, res: Response) {
  const key = env.JWT_KEY

  if (!key) {
    res.status(ResponseCodes.UNAUTHORIZED).json({
      success: false,
      message: 'JWT key not provided',
      meta: {
        timestamp: new Date().toISOString(),
        requestId: req.id
      }
    })
    return
  }
}