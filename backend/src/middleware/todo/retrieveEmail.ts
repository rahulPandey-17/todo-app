import { Request, Response, NextFunction } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import dotenv from 'dotenv'
import { HttpResponse } from '../../constants/ResponseEnums'

dotenv.config()

interface CustomJwtPayload extends JwtPayload {
  email?: string
}

export function retrieveEmail(req: Request, res: Response, next: NextFunction) {
  if (!req.headers.cookie) {
    res.status(HttpResponse.BAD_REQUEST).json({
      success: false,
      msg: 'JWT not provided'
    })
    return
  }

  const token = req.headers.cookie.split(' ')[1]
  const key = process.env.JWT_KEY

  if (!key) {
    res.status(HttpResponse.BAD_REQUEST).json({
      success: false,
      msg: 'JWT key not provided'
    })
    return
  }

  try {
    const decode = jwt.verify(token, key) as CustomJwtPayload
    req.userEmail = decode.email
    next()
  } catch(err) {
    res.status(HttpResponse.UNAUTHORIZED).json({
      success: false,
      msg: err instanceof Error? err.message: 'Invalid token'
    })
  }
}