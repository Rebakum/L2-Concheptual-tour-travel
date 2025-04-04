import { model, Schema } from 'mongoose'
import { IUser } from './user.interface'

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: [true, 'Name is required'],
    minlength: [3, 'Name must be at least 3 characters long'],
    maxlength: [50, 'Name must be at most 50 characters long'],
  },
  age: {
    type: Number,
    required: [true, 'Age is required'],
    min: [16, 'Age must be at least 16'],
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Email is required'],
    immutable: true,
    validate: {
      validator: (value: string) =>
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(value),
      message: '{VALUE} is not a valid email address',
    },
  },
  photo: { type: String, default: null },
  role: {
    type: String,
    enum: {
      values: ['admin', 'user'],
      message: '{VALUE} is not a valid role, please use admin or user',
    },
    required: true,
    default: 'user',
  },
  userStatus: {
    type: String,
    enum: {
      values: ['active', 'inactive'],
      message: '{VALUE} is not a valid status, please use active or inactive',
    },
  },
})

//HOOK -> pre
userSchema.pre('find', function (this, next) {
  this.find({ userStatus: { $eq: 'active' } })
  next()
})

//Hook -> post
userSchema.post('find', function (docs, next) {
  docs.forEach((doc: IUser) => {
    doc.name = doc.name.toUpperCase()
  })

  console.log('Post Hook:', docs)
  next()
})
const User = model<IUser>('User', userSchema)
export default User
