import express, { Request, Response } from 'express'
import userRouter from './module/user/user.route'
const app = express()
app.use(express.json())
app.use('/api/user', userRouter)
//post: /api/user/create-user
app.get('/', (req: Request, res: Response) => {
  res.send({
    status: 'true',
    message: 'Hello World',
  })
})
export default app
