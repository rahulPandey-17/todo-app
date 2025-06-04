import { Request, Response } from 'express'
import ResponseCodes from './ResponseCodes'

export function checkReqParam(req: Request, res: Response) {
  if (!req.params) {
    res.status(ResponseCodes.BAD_REQUEST).json({
      success: false,
      message: 'Request params not provided',
      meta: {
        timestamp: new Date().toISOString(),
        requestId: req.id
      }
    })
    return
  }
}