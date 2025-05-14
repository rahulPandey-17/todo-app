import { Request, Response, NextFunction } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import dotenv from 'dotenv'
import { HttpResponse } from '../../constants/ResponseEnums'

dotenv.config()

interface CustomJwtPayload extends JwtPayload {
  id?: string
}

export function checkToken(req: Request, res: Response, next: NextFunction) {
  if (!req.headers.cookie) {
    res.status(HttpResponse.BAD_REQUEST).json({
      success: false,
      msg: 'Token not provided in the cookie'
    })
    return
  }

  const token = req.headers.cookie.split(' ')[1]
  const key = process.env.JWT_KEY

  try {
    if (!key) {
      res.status(HttpResponse.BAD_REQUEST).json({
        success: false,
        msg: 'JWT key is not provided'
      })
      return
    }

    const decode = jwt.verify(token, key) as CustomJwtPayload
    req.userId = decode.id
    next()
  } catch(err) {
    res.status(HttpResponse.UNAUTHORIZED).json({
      success: false,
      msg: err instanceof Error? err.message: 'Invalid token'
    })
  }
}