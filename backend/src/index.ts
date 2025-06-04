import express from 'express'
import cors from 'cors'

import env from './types/env'
import generateReqId from './middleware/requestId'
import todoRoutes from './routes/todo'

const app = express()

const PORT = env.PORT

app.use(express.json())
app.use(cors())
app.use(generateReqId)

app.use('/todo', todoRoutes)

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`)
})