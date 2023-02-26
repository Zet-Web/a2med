import { Meta, TimeMark } from '.'
import { Clinic } from './clinic'

export interface Analysis extends Meta {
  date?: string
  price: number
  description: string
  category_id: number
  clinics: Clinic[]
}

export interface AnalysesCategory extends Meta, TimeMark {
  analyses: Analysis[]
}
