import express, { Request, Response } from 'express'
import mongoose from 'mongoose'
const { MongoServerError } = mongoose.mongo

import { todoValidation } from '../middleware/todo/todoValidation'
import { Todo, User } from '../database'
import { successResponse } from '../utility/successResponse'
import ResponseCodes from '../utility/ResponseCodes'
import { errorResponse } from '../utility/errorResponse'
import { idValidation } from '../middleware/todo/idValidation'
import { titleValidation } from '../middleware/todo/titleValidation'
import { descValidation } from '../middleware/todo/descValidation'
import { tokenValidation } from '../middleware/jwt/tokenValidation'

const router = express.Router()

// create todo
router.post('/create', tokenValidation, todoValidation, async (req: Request, res: Response) => {
  try {
    const { title, description } = req.validatedTodo!
    const session = await mongoose.startSession()
    session.startTransaction()

    // creating a todo
    const todo = await Todo.create([{
      title,
      description
    }], { session })

    // pushing the object id into user collection
    const userId = req.decodedJwt._id as string
    await User.findOneAndUpdate(
      { _id: userId },
      { $push: { todos: todo[0]._id } },
      { session }
    )

    await session.commitTransaction()
    session.endSession()

    successResponse(
      res,
      'Todo created successfully',
      { todo: todo[0] },
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
router.get('/todos', tokenValidation, async (req: Request, res: Response) => {
  try {
    const userId = req.decodedJwt._id as string
    const user = await User.findById(userId).populate({
      path: 'todos',
      select: 'title description -_id'
    }).orFail()

    successResponse(
      res,
      'Todo\'s fetched successfully',
      { todos: user.todos },
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