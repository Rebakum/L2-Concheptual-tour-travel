import express, { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import bookingRouter from './module/booking/booking.route'
import tourRouter from './module/tour/tour.route'
import userRouter from './module/user/user.route'
const app = express()
app.use(express.json())
app.use('/api/user', userRouter)
app.use('/api/tour', tourRouter)
app.use('/api/booking', bookingRouter)
//post: /api/user/create-user
app.get('/', (req: Request, res: Response) => {
  res.send({
    status: 'true',
    message: 'Server is running',
  })
})
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log('error from global error handler', err)
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    success: 'false',
    message: err.message,
    error: err,
  })
})
export default app
