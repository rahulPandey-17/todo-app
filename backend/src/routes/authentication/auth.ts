import express, { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import mongoose from 'mongoose'
const { MongoServerError } = mongoose.mongo
import jwt from 'jsonwebtoken'

import env from '../../types/env'
import { userValidation } from '../../middleware/authentication/userValidation'
import { User } from '../../database'
import { successResponse } from '../../utility/successResponse'
import ResponseCodes from '../../utility/ResponseCodes'
import { errorResponse } from '../../utility/errorResponse'
import { loginValidation } from '../../middleware/authentication/loginValidation'
import { checkJWTKey } from '../../utility/jwt/checkKey'

const router = express.Router()

// signup
router.post('/signup', userValidation, async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password } = req.validatedUserInput!
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword
    })

    successResponse(
      res,
      'User created successfully',
      { user: newUser },
      {
        timestamp: new Date().toISOString(),
        requestId: req.id
      }
    )
  } catch(err) {
    if (err instanceof MongoServerError && err.code === 11000) {
      res.status(ResponseCodes.CONFLICT).json({
        success: false,
        message: 'User with this email already exists',
        meta: {
          timestamp: new Date().toISOString(),
          requestId: req.id
        }
      })
      return
    }

    errorResponse(req, res, err)
  }
})

// login
router.post('/login', loginValidation, async (req: Request, res: Response) => {
  try {
    const message = 'Invalid username or password'
    const { email, password } = req.validatedLoginInput!
    const user = await User.findOne({ email })
    if (!user) {
      res.status(ResponseCodes.BAD_REQUEST).json({
        success: false,
        message,
        meta: {
          timestamp: new Date().toISOString(),
          requestId: req.id
        }
      })
      return
    }

    const checkPassword = await bcrypt.compare(password, user.password)
    if (!checkPassword) {
      res.status(ResponseCodes.BAD_REQUEST).json({
        success: false,
        message,
        meta: {
          timestamp: new Date().toISOString(),
          requestId: req.id
        }
      })
      return
    }

    // issuing token
    const key = env.JWT_KEY
    checkJWTKey(req, res)
    const { firstName, lastName, _id } = user
    const token = jwt.sign({ _id, firstName, lastName, email}, key, { expiresIn: '1d' })

    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000
    })

    successResponse(
      res,
      'Logged in successfully and cookie send',
      { user: { email } },
      {
        timestamp: new Date().toISOString(),
        requestId: req.id
      }
    )
  } catch(err) {
    errorResponse(req, res, err)
  }
})

export default router