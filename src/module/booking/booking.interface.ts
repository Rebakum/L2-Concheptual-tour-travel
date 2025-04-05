import mongoose from 'mongoose'

export interface IBooking {
  user: mongoose.Schema.Types.ObjectId
  tour: mongoose.Schema.Types.ObjectId
  bookedSlots: number
  totalPrice: number
  bookingStatus: 'pending' | 'confirmed' | 'cancelled'
}
