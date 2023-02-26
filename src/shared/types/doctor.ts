import { DateTimeMask, Meta, TimeMark } from '.'
import { Clinic } from './clinic'

export interface Doctor extends Meta, TimeMark {
  clinic_id: number
  surname: string
  patronymic: string
  education: string
  specialty: Meta
  specialty_id: number
  academic_degree: string
  start_at: string
  end_at: string
  treatment_time: number
  break_time: number
  first_order_cost: number
  retry_order_cost: number
  avatar: string | null
  in_home: boolean
  nearest_orderables: string[]
}

// TODO заменить после подключения API специальностей и redux
// export interface DoctorFull extends Doctor {
//   clinic: Clinic
// }

export interface DoctorFull extends Doctor {
  clinic: Clinic
  experience: string
  certificates: string[]
  license: string[]
}

export interface DoctorWithOrderables extends DoctorFull {
  orderables: DateTimeMask[]
}
