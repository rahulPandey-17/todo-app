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
  },
  user: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: 'user'
  }
}, {
  timestamps: true
})

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: String,
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  todos: [{
    type: Schema.Types.ObjectId,
    ref: 'todo'
  }]
}, {
  timestamps: true
})

const Todo = model('todo', todoSchema)
const User = model('user',userSchema)

export {
  Todo,
  User
}