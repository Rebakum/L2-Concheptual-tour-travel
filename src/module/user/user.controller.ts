import { Request, Response } from 'express'
import { userService } from './user.service'

//Request and Response manage
const createUser = async (req: Request, res: Response) => {
  try {
    const payload = req.body
    const result = await userService.createUser(payload)
    res.send({
      status: 'true',
      message: 'User created successfully',
      data: result,
    })
  } catch (error) {
    res.json({
      status: 'false',
      Message: 'User not created',
      error: error,
    })
  }
}
const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.getAllUser()
    res.send({
      status: 'true',
      message: 'User recive successfully',
      data: result,
    })
  } catch (error) {
    res.json({
      status: 'false',
      Message: 'User not recive',
      error: error,
    })
  }
}
const getSingleUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId
    const result = await userService.getSingleUser(userId)
    res.send({
      status: 'true',
      message: 'User recive successfully',
      data: result,
    })
  } catch (error) {
    res.json({
      status: 'false',
      Message: 'User not recive',
      error: error,
    })
  }
}
const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId
    const body = req.body
    const result = await userService.updateUser(userId, body)
    console.log(result)
    res.send({
      status: 'true',
      message: 'User updated successfully',

      data: result,
    })
  } catch (error) {
    res.json({
      status: 'false',
      Message: 'User not updated',
      error: error,
    })
  }
}
const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId

    const result = await userService.deleteUser(userId)
    res.send({
      status: 'true',
      message: 'User deleted successfully',
      data: result,
    })
  } catch (error) {
    res.json({
      status: 'false',
      Message: 'User not deleted',
      error: error,
    })
  }
}
export const userController = {
  createUser,
  getAllUser,
  getSingleUser,
  updateUser,
  deleteUser,
}
