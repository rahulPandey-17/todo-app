import express from 'express'
import dotenv from 'dotenv'

import authRoutes from './routes/authorization/auth'
import { PrismaClient } from './generated/prisma'

const app = express()

dotenv.config()

const PORT = process.env.PORT
const prisma = new PrismaClient()

app.use(express.json())
app.use('/auth', authRoutes)

process.on('SIGINT', async () => {
  await prisma.$disconnect()
  process.exit(0)
})

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`)
})