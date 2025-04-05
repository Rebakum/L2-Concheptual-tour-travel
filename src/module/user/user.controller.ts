import { StatusCodes } from 'http-status-codes'

import { catchAsync } from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { userService } from './user.service'

//Request and Response manage
const createUser = catchAsync(async (req, res) => {
  const payload = req.body
  const result = await userService.createUser(payload)
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: 'User created successfully',
    data: result,
  })
})
const getAllUser = catchAsync(async (req, res) => {
  const result = await userService.getAllUser()
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'User recive successfully',
    data: result,
  })
})
const getSingleUser = catchAsync(async (req, res) => {
  const userId = req.params.userId
  const result = await userService.getSingleUser(userId)
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'User recive successfully',
    data: result,
  })
})
const updateUser = catchAsync(async (req, res) => {
  const userId = req.params.userId
  const body = req.body
  const result = await userService.updateUser(userId, body)

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'User updated successfully',
    data: result,
  })
})
const deleteUser = catchAsync(async (req, res) => {
  const userId = req.params.userId

  const result = await userService.deleteUser(userId)
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'User deleted successfully',
    data: result,
  })
})
export const userController = {
  createUser,
  getAllUser,
  getSingleUser,
  updateUser,
  deleteUser,
}
