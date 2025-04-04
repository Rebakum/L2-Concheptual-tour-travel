import { Router } from 'express'
import { TourController } from './tour.controller'

const tourRouter = Router()
tourRouter.post('/create-tour', TourController.createTour)
tourRouter.get('/', TourController.getAllTour)
tourRouter.get('/schedule/:tourId', TourController.getNextSchedule)
tourRouter.get('/:tourId', TourController.getSingleTour)
tourRouter.put('/:tourId', TourController.updateTour)
tourRouter.delete('/:tourId', TourController.deleteTour)
export default tourRouter
