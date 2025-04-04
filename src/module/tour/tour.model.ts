import { model, Schema } from 'mongoose'

const tourSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  durationHours: {
    type: Number,
    required: true,
  },
  avarageRating: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  coverImage: {
    type: String,
    required: true,
  },
  images: [String],
  startDate: {
    type: Date,
    required: true,
  },
  startLocation: {
    type: String,
  },
  location: [String],
  slug: {
    type: String,
  },
})
const Tour = model('Tour', tourSchema)
export default Tour
