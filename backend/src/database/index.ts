import { Schema, model } from 'mongoose'

import connectDB from './connect'

connectDB()

const todoSchema = new Schema({
  title: {
    type: String,
    unique: true,
    required: true
  },
  description: String,
  done: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
})

const Todo = model('todo', todoSchema)

export {
  Todo
}