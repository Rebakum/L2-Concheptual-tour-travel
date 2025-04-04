import { ITour } from './tour.interface'
import Tour from './tour.model'

const createTour = async (payload: ITour): Promise<payload> => {}
const result = await Tour.create(payload)
return result
