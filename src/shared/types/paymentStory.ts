import { TimeMark } from './index'

export type PaymentStoryType = TimeMark & {
  id: number
  user_id: number
  title: string
  price: string
  status: boolean
}
