import { HydratedDocument, Model } from 'mongoose'

export interface ITour {
  name: string
  durationHours: number
  avarageRating: number
  price: number
  coverImage: string
  images: string[]
  startDates: Date[]
  startLocation: string
  location: string[]
  slug: string
}

export interface ITourMethods {
  getNextNearestStartDateAndEndDate: () => {
    nearestStartDate: Date | null
    estimatedEndDate: Date | null
  }
}

interface TTourModel
  extends Model<ITour, Record<string, unknown>, ITourMethods> {
  startDates: Date[]
  durationHours: number
  getNextNearestStartDateAndEndDate(): Promise<HydratedDocument<
    ITour,
    ITourMethods
  > | null>
}

export default TTourModel
