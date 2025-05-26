const express = require('express')
require('dotenv').config()
const cors = require('cors')

const todoRoutes = require('./routes/todo')

const app = express()

const PORT = process.env.PORT || 0

app.use(express.json())
app.use(cors())
app.use('/todo', todoRoutes)

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`)
})