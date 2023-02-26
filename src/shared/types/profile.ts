import { Meta, DateMask, TimeMark } from './index'

export interface Profile extends Meta, TimeMark {
  address: string
  address_registration: string
  birthday: DateMask | null
  department_code: string
  email: string
  email_verified_at: string
  fcmtoken: string
  gender: number
  issued_by: string
  issued_date: DateMask | null
  parent_id: number | null
  passport_number: string
  passport_series: string
  patronymic: string
  passport_without_paronymic: boolean
  phone_number: string
  points: number
  sms_code: string
  surname: string
  type_id: number | null
}

export type PassportFormState = Pick<
  Profile,
  | 'passport_series'
  | 'passport_number'
  | 'issued_by'
  | 'department_code'
  | 'address_registration'
  | 'issued_date'
>

export type ProfileFormState = Pick<
  Profile,
  | 'surname'
  | 'name'
  | 'patronymic'
  | 'passport_without_paronymic'
  | 'gender'
  | 'birthday'
  | 'phone_number'
  | 'email'
>

export type CertificateFormState = Pick<
  Profile,
  | 'surname'
  | 'name'
  | 'patronymic'
  | 'passport_without_paronymic'
  | 'email'
>
