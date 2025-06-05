import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import env from './types/env'
import generateReqId from './middleware/todo/requestId'
import todoRoutes from './routes/todo'
import authRoutes from './routes/authentication/auth'

const app = express()

const PORT = env.PORT

app.use(express.json())
app.use(cors())
app.use(generateReqId)
app.use(cookieParser())

app.use('/todo', todoRoutes)
app.use('/user/auth', authRoutes)

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`)
})