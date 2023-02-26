import { Meta, TimeMark } from '.'
import { DoctorFull } from './doctor'

export interface Specialty extends Meta, TimeMark {
  doctors: DoctorFull[]
}
