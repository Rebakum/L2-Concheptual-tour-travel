import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { catchAsync } from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { TourService } from './tour.service'

const createTour = catchAsync(async (req, res) => {
  const body = req.body
  const result = await TourService.createTour(body)

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: 'Tour created successfully',
    data: result,
  })
})
const getAllTour = catchAsync(async (req, res) => {
  const result = await TourService.getAllTour()

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Tour All recive successfully',
    data: result,
  })
})
const getSingleTour = catchAsync(async (req, res) => {
  const tourId = req.params.tourId
  const result = await TourService.getSingleTour(tourId)

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Tour recive successfully',
    data: result,
  })
})
const updateTour = catchAsync(async (req, res) => {
  const tourId = req.params.tourId
  const body = req.body
  const result = await TourService.updateTour(tourId, body)

  sendResponse(res, {
    statusCode: StatusCodes.ACCEPTED,
    message: 'Tour updated successfully',
    data: result,
  })
})
const deleteTour = catchAsync(async (req: Request, res: Response) => {
  const tourId = req.params.tourId

  const result = await TourService.deleteTour(tourId)

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Tour deleted successfully',
    data: result,
  })
})

const getNextSchedule = catchAsync(async (req, res) => {
  const tourId = req.params.tourId
  console.log(tourId)
  const result = await TourService.getNextSchedule(tourId)
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Tour schedule recive successfully',
    data: result,
  })
})

export const TourController = {
  createTour,
  getAllTour,
  getSingleTour,
  updateTour,
  deleteTour,
  getNextSchedule,
}
