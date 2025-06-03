import { Request, Response, NextFunction } from 'express'
import { v4 as uuidv4 } from 'uuid'

export default function generateReqId(req: Request, res: Response, next: NextFunction) {
  req.id = uuidv4()
  next()
}