const router = require('express').Router()
const { MongoServerError } = require('mongodb')
const mongoose = require('mongoose')

const { todoValidation } = require('../middleware/todoValidation')
const { idValidation } = require('../middleware/idValidation')
const { Todo } = require('../database')

const error_message = 'Something went wrong, please try again'

router.post('/add', todoValidation, async (req, res) => {
  try {
    const { title, description } = req.validatedTodoInput
    const newTodo = await Todo.create({
      title,
      description
    })

    res.status(201).json({
      success: true,
      msg: 'Todo created successfully',
      todo: newTodo
    })
  } catch(err) {
    if (err instanceof MongoServerError && err.code === 11000) {
      res.status(409).json({
        success: false,
        msg: 'Todo with title already exists'
      })
      return
    }

    res.status(500).json({
      success: false,
      msg: error_message
    })
  }
})

router.get('/todos', async (req, res) => {
  try {
    const allTodos = await Todo.find({})

    res.status(200).json({
      success: true,
      msg: 'All todo\'s retrieved successfully',
      todos: allTodos
    })
  } catch(err) {
    res.status(500).json({
      success: false,
      msg: error_message
    })
  }
})

router.put('/completed', idValidation, async (req, res) => {
  try {
    const userId = mongoose.Types.ObjectId.createFromHexString(req.validatedIdInput)
    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: userId },
      { completed: true },
    )

    res.status(200).json({
      success: true,
      msg: 'Todo updated successfully',
      updatedTodo
    })
  } catch(err) {
    console.log(err)

    res.status(500).json({
      success: false,
      msg: error_message
    })
  }
})

module.exports = router