import { Request, Response } from 'express'

import ResponseCodes from './ResponseCodes'


export function checkReqBody(req: Request, res: Response) {
  if (!req.body) {
    res.status(ResponseCodes.BAD_REQUEST).json({
      success: false,
      message: 'Request body not provided',
      meta: {
        timestamp: new Date().toISOString(),
        requestId: req.id
      }
    })
    return
  }
}