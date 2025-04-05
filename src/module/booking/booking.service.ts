import mongoose from 'mongoose'
import Tour from '../tour/tour.model'
import { IBooking } from './booking.interface'
import Booking from './booking.model'

const createBooking = async (payload: IBooking): Promise<IBooking> => {
  // const { tour, bookedSlots } = payload

  // const requiredTour = await Tour.findById(tour)

  // if (!requiredTour) {
  //     throw new Error('Tour not found')
  // }

  // const totalPrice = requiredTour.price * bookedSlots

  // payload.totalPrice = totalPrice
  // payload.bookingStatus = 'pending'

  // if (requiredTour.availableSeats < bookedSlots) {
  //     throw new Error('Not enough seats available')
  // }

  // const booking = await Booking.create(payload)

  // // throw new Error('Failed to create booking');

  // // availableSeats = availableSeats - bookedSlots

  // const updatedTour = await Tour.findByIdAndUpdate(tour, { $inc: { availableSeats: -bookedSlots } }, { new: true });

  // console.log(updatedTour);

  // if (!updatedTour) {
  //     throw new Error('Failed to update tour')
  // }

  // return booking

  // Clone database
  // sandbox - test database
  // database - error
  // database - delete
  // database - success
  // database - merge

  const session = await mongoose.startSession()
  session.startTransaction()
  try {
    const { tour, bookedSlots } = payload
    const requiredTour = await Tour.findById(tour)
    if (!requiredTour) {
      throw new Error('Tour not found')
    }
    const totalPrice = requiredTour.price * bookedSlots
    payload.totalPrice = totalPrice
    payload.bookingStatus = 'pending'

    if (requiredTour.availableSeats < bookedSlots) {
      throw new Error('Not enough available seats')
    }
    const booking = await Booking.create([payload], { session })
    console.log(booking)
    const updatedTour = await Tour.findByIdAndUpdate(
      booking[0].tour,
      { $inc: { availableSeats: -bookedSlots } },
      { new: true, session }
    )
    if (!updatedTour) {
      throw new Error(' Tour not found')
    }
    await session.commitTransaction()
    await session.endSession()
    return booking[0]
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw error
  }
}
const getAllBookings = async (): Promise<IBooking[]> => {
  const result = await Booking.find()
  return result
}

const getSingleBooking = async (id: string): Promise<IBooking | null> => {
  const result = await Booking.findById(id)
  return result
}
const getAllBookingsOfAUser = async (id: string): Promise<IBooking[]> => {
  const result = await Booking.find({
    user: id,
  })
  return result
}

const updateBooking = async (
  id: string,
  bookingData: Partial<IBooking>
): Promise<IBooking | null> => {
  const session = await mongoose.startSession()
  session.startTransaction()

  try {
    const existingBooking = await Booking.findById(id).session(session)
    if (!existingBooking) {
      throw new Error('Booking not found')
    }

    const tour = await Tour.findById(existingBooking.tour).session(session)
    if (!tour) {
      throw new Error('Associated tour not found')
    }

    const previousSlots = existingBooking.bookedSlots
    const newSlots = bookingData.bookedSlots ?? previousSlots

    // Calculate seat adjustment
    const seatDifference = newSlots - previousSlots

    // Check for available seats if slots increased
    if (seatDifference > 0 && tour.availableSeats < seatDifference) {
      throw new Error('Not enough available seats')
    }

    // Adjust available seats in tour
    tour.availableSeats -= seatDifference
    await tour.save({ session })

    // If price needs update
    if (bookingData.bookedSlots) {
      bookingData.totalPrice = tour.price * newSlots
    }

    const updatedBooking = await Booking.findByIdAndUpdate(id, bookingData, {
      new: true,
      runValidators: true,
      session,
    })

    await session.commitTransaction()
    session.endSession()

    return updatedBooking
  } catch (error) {
    await session.abortTransaction()
    session.endSession()
    throw error
  }
}

const deleteBooking = async (id: string): Promise<IBooking | null> => {
  const result = await Booking.findByIdAndDelete(id)
  return result
}

export const bookingServices = {
  createBooking,
  getAllBookings,
  getSingleBooking,
  getAllBookingsOfAUser,
  updateBooking,
  deleteBooking,
}
