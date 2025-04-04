import { Request, Response } from 'express'
import { TourService } from './tour.service'

const createTour = async (req: Request, res: Response) => {
  try {
    const body = req.body
    const result = await TourService.createTour(body)
    res.send({
      status: 'true',
      message: 'Tour created successfully',
      data: result,
    })
  } catch (error) {
    res.send({
      status: 'false',
      message: 'Tour not created',
      error: error,
    })
  }
}
const getAllTour = async (req: Request, res: Response) => {
  try {
    const result = await TourService.getAllTour()
    res.send({
      status: 'true',
      message: 'Tour All recive successfully',
      data: result,
    })
  } catch (error) {
    res.send({
      status: 'false',
      message: 'Tour not created',
      error: error,
    })
  }
}
const getSingleTour = async (req: Request, res: Response) => {
  try {
    const tourId = req.params.tourId
    const result = await TourService.getSingleTour(tourId)
    res.send({
      status: 'true',
      message: 'Tour recive successfully',
      data: result,
    })
  } catch (error) {
    res.send({
      status: 'false',
      message: 'Tour not recive',
      error: error,
    })
  }
}
const updateTour = async (req: Request, res: Response) => {
  try {
    const tourId = req.params.tourId
    const body = req.body
    const result = await TourService.updateTour(tourId, body)
    res.send({
      status: 'true',
      message: 'Tour updated successfully',
      data: result,
    })
  } catch (error) {
    res.send({
      status: 'false',
      message: 'Tour not updated',
      error: error,
    })
  }
}
const deleteTour = async (req: Request, res: Response) => {
  try {
    const tourId = req.params.tourId

    const result = await TourService.deleteTour(tourId)
    res.send({
      status: 'true',
      message: 'Tour deleted successfully',
      data: result,
    })
  } catch (error) {
    res.send({
      status: 'false',
      message: 'Tour not deleted',
      error: error,
    })
  }
}
const getNextSchedule = async (req: Request, res: Response) => {
  try {
    const tourId = req.params.tourId

    const result = await TourService.getNextSchedule(tourId)
    res.send({
      status: 'true',
      message: 'Schedule recive successfully',
      data: result,
    })
  } catch (error) {
    res.send({
      status: 'false',
      message: 'Schedule not recive',
      error: error,
    })
  }
}
export const TourController = {
  createTour,
  getAllTour,
  getSingleTour,
  updateTour,
  deleteTour,
  getNextSchedule,
}
