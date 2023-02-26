import { DateMask, Meta, TimeMark } from '.'

export type PatientType = Meta &
  TimeMark & {
    image: string
    email: string | null
    email_verified_at: string | null
    gender: number
    surname: string
    patronymic: string
    birthday: DateMask
    phone_number: string | null
    address: string | null
    sms_code: string | null
    points: number
    fcmtoken: string | null
    passport_series: string | null
    passport_number: string | null
    issued_by: string | null
    issued_date: string | null
    department_code: string | null
    address_registration: string | null
    parent_id: number
    type_id: number
    passport_without_paronymic: boolean
  }

export type PatientForm = Pick<
  PatientType,
  | 'name'
  | 'surname'
  | 'patronymic'
  | 'passport_without_paronymic'
  | 'gender'
  | 'birthday'
  | 'phone_number'
  | 'email'
>
