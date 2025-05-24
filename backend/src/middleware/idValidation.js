const { idSchema } = require('../types/zodSchema')

function idValidation(req, res, next) {
  if (!req.body) {
    res.status(400).json({
      success: false,
      msg: 'Request body not provided'
    })
    return
  }

  const payload = req.body
  const parsedPayload = idSchema.safeParse(payload)

  if (!parsedPayload.success) {
    res.status(400).json({
      success: false,
      msg: 'Invalid input',
      error: parsedPayload.error.flatten().fieldErrors
    })
    return
  }

  req.validatedIdInput = parsedPayload.data.id
  next()
  return
}

module.exports = { idValidation }