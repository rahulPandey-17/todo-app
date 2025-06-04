import { Request, Response } from 'express'
import ResponseCodes from './ResponseCodes'

export function errorResponse(req: Request, res: Response, err: unknown) {
  res.status(ResponseCodes.INTERNAL_ERROR).json({
    success: false,
    message: 'Internal server error',
    error: (err instanceof Error) && err.message,
    meta: {
      timestamp: new Date().toISOString(),
      requestId: req.id
    }
  })
}