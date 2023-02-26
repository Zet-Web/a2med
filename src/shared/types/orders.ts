import { DateTimeMask } from '.'
import { Doctor } from './doctor'

export type OrderLabel = 'doctors' | 'homeCalls' | 'analyses'

export interface OrdersType {
  id: number
  datetime: DateTimeMask
  clinic: string
  doctor: Doctor | null
  user: string
  is_first: boolean
  analysis: {
    name: string | null
    category: string | null
  }
  doctor_specialty: string | null
  type: 'doctors' | 'home' | 'analyses'
  status?: string
  inspection_datetime?: string
}

export type LabeledOrder = OrdersType & { label: OrderLabel }
