import express, { Request, Response } from 'express'
import tourRouter from './module/tour/tour.route'
import userRouter from './module/user/user.route'
const app = express()
app.use(express.json())
app.use('/api/user', userRouter)
app.use('/api/tour', tourRouter)
//post: /api/user/create-user
app.get('/', (req: Request, res: Response) => {
  res.send({
    status: 'true',
    message: 'Server is running',
  })
})
export default app
