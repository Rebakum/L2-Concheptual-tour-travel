import express from 'express'
import { bookingController } from './booking.controller'

const bookingRouter = express.Router()
bookingRouter.post('/create-booking', bookingController.createBooking)
bookingRouter.get('/', bookingController.getAllBookings)
bookingRouter.get('/:id', bookingController.getSingleBooking)
bookingRouter.patch('/:id', bookingController.updateBooking)
bookingRouter.get(
  '/:userId/get-all-bookings',
  bookingController.getAllBookingsOfAUser
)
bookingRouter.delete('/:id', bookingController.deleteBooking)

export default bookingRouter
