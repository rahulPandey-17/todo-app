import express, { Request, Response } from 'express'
import mongoose from 'mongoose'
const { MongoServerError } = mongoose.mongo

import { todoValidation } from '../middleware/todoValidation'
import { Todo } from '../database'
import { successResponse } from '../utility/successResponse'
import ResponseCodes from '../utility/ResponseCodes'
import { errorResponse } from '../utility/errorResponse'
import { idValidation } from '../middleware/idValidation'
import { titleValidation } from '../middleware/titleValidation'
import { descValidation } from '../middleware/descValidation'

const router = express.Router()

// create todo
router.post('/create', todoValidation, async (req: Request, res: Response) => {
  try {
    const { title, description } = req.validatedTodo!
    const newTodo = await Todo.create({
      title,
      description
    })

    successResponse(
      res,
      'Todo created successfully',
      { todo: newTodo },
      {
        timestamp: new Date().toISOString(),
        requestId: req.id
      }
    )
  } catch(err) {
    if (err instanceof MongoServerError && err.code === 11000) {
      res.status(ResponseCodes.CONFLICT).json({
        success: false,
        message: 'Todo with this title already exists',
        error: (err instanceof MongoServerError) && err.message,
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

// retrieve todo's
router.get('/todos', async (req: Request, res: Response) => {
  try {
    const allTodos = await Todo.find({})

    successResponse(
      res,
      'Todo\'s retrieved successfully',
      { todos: allTodos },
      {
        timestamp: new Date().toISOString(),
        requestId: req.id
      }
    )
  } catch(err) {
    errorResponse(req, res, err)
  }
})

// mark todo as done
router.put('/completed/:todoId', idValidation, async (req: Request, res: Response) => {
  try {
    const { todoId } = req.params
    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: todoId },
      { $set: { done: true } },
      { new: true }
    )

    successResponse(
      res,
      'Todo marked as done',
      { todo: updatedTodo },
      {
        timestamp: new Date().toISOString(),
        requestId: req.id
      }
    )
  } catch(err) {
    errorResponse(req, res, err)
  }
})

// change title
router.put('/title/:todoId', idValidation, titleValidation, async (req: Request, res: Response) => {
  try {
    const { todoId } = req.params
    const { title } = req.body
    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: todoId },
      { $set: { title } },
      { new: true }
    )

    successResponse(
      res,
      'Title changed successfully',
      { todo: updatedTodo },
      {
        timestamp: new Date().toISOString(),
        requestId: req.id
      }
    )
  } catch(err) {
    errorResponse(req, res, err)
  }
})

// change description
router.put('/description/:todoId', idValidation, descValidation, async (req: Request, res: Response) => {
  try {
    const { todoId } = req.params
    const { description } = req.body
    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: todoId },
      { $set: { description } },
      { new: true }
    )

    successResponse(
      res,
      'Description changed successfully',
      { todo: updatedTodo },
      {
        timestamp: new Date().toISOString(),
        requestId: req.id
      }
    )
  } catch(err) {
    errorResponse(req, res, err)
  }
})

// delete a todo
router.delete('/remove/:todoId', idValidation, async (req: Request, res: Response) => {
  try {
    const { todoId } = req.params
    const deletedTodo = await Todo.findOneAndDelete({ _id: todoId })

    successResponse(
      res,
      'Todo deleted successfully',
      { todo: deletedTodo },
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