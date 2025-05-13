import express, { NextFunction, Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

import { signupMiddleware } from '../../middleware/authorization/signup'
import { PrismaClient } from '../../generated/prisma'
import { HttpResponse } from '../../constants/ResponseEnums'
import { loginMiddleware } from '../../middleware/authorization/login'
import { LoginInput, SignupInput } from '../../types/zod'

const router = express.Router()

dotenv.config()

const prisma = new PrismaClient()

const message = 'Internal server error'

router.post('/signup', signupMiddleware, async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password } = req.signupPayload as SignupInput
    const userExists = await prisma.users.findUnique({
      where: { email }
    })

    if (userExists) {
      res.status(HttpResponse.CONFLICT).json({
        success: false,
        msg: 'User with this email already exists'
      })
      return
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await prisma.users.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword
      }
    })

    res.status(HttpResponse.CREATED).json({
      success: true,
      msg: 'User created successfully'
    })
  } catch(err) {
    res.status(HttpResponse.INTERNAL_ERROR).json({
      success: false,
      msg: err instanceof Error ? err.message : message
    })
  }
})

router.post('/login', loginMiddleware, async (req: Request, res: Response) => {
  try {
    const { email, password } = req.parsedLoginPayload as LoginInput
    const normalizedEmail = email.trim().toLowerCase()
    const user = await prisma.users.findUnique({
      where: { email: normalizedEmail },
      select: { email: true, password: true, id: true }
    })

    const error_message = 'Invalid username or password'
    
    if (!user) {
      res.status(HttpResponse.UNAUTHORIZED).json({
        success: false,
        msg: error_message
      })
      return
    }
    
    const checkPassword = await bcrypt.compare(password, user.password)

    if (!checkPassword) {
      res.status(HttpResponse.UNAUTHORIZED).json({
        success: false,
        msg: error_message
      })
      return
    }

    const id = user.id
    const token = jwt.sign({ id, email }, process.env.JWT_KEY as string, { expiresIn: '1h' })

    res.cookie('jwt', token, {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60,
      secure: true
    })

    res.status(HttpResponse.OK).json({
      success: true,
      msg: 'Login successfull',
      token
    })
  } catch(err) {
    res.status(HttpResponse.INTERNAL_ERROR).json({
      success: false,
      msg: err instanceof Error ? err.message : message
    })
  }
})


router.use((req: Request, res: Response) => {
  res.status(HttpResponse.NOT_FOUND).json({
    success: false,
    msg: 'Route not found'
  })
})

export default router