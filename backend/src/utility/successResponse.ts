import { Response } from 'express'
import ResponseCodes from './ResponseCodes'

interface DataType {
  [key: string]: any
}

interface MetaType {
  [key: string]: any
}

export function successResponse(
  res: Response,
  message: string,
  data: DataType = {},
  meta: MetaType = {}
) {
  res.status(ResponseCodes.OK).json({
    success: true,
    message,
    data,
    meta
  })
}