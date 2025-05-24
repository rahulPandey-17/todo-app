const mongoose = require('mongoose')
require('dotenv').config()

const uri = process.env.DATABASE_URI

mongoose.connect(uri)

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: true
  },
  description: String,
  completed: {
    type: Boolean,
    default: false
  }
})

const Todo = mongoose.model('Todo', todoSchema)

module.exports = { Todo }