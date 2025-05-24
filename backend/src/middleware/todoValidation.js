const { todoSchema } = require('../types/zodSchema')

function todoValidation(req, res, next) {
  if (!req.body) {
    res.status(400).json({
      success: false,
      msg: 'Request body not provided'
    })
    return
  }

  const payload = req.body
  const parsedPayload = todoSchema.safeParse(payload)

  if (!parsedPayload.success) {
    res.status(400).json({
      success: false,
      msg: 'Invalid inputs',
      error: parsedPayload.error.flatten().fieldErrors
    })
    return
  }

  req.validatedTodoInput = parsedPayload.data
  next()
  return
}

module.exports = { todoValidation }