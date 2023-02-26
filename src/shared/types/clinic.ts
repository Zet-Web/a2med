import { Meta, TimeMark } from '.'
import { Doctor } from './doctor'
import { ImageProps } from 'next/image'

export interface Clinic extends Meta, TimeMark {
  address: string
  address_local_1c: string
  distance?: string
  city_id: number | null
  lat: string | null
  lng: string | null
}

interface ClinicImages {
  id: number
  image: ImageProps['src']
  clinic_id:  number
}

// Нет часов работы на бекэнде, заменить
// export interface ClinicFull extends Clinic {
//   doctors: Doctor[]
// }
export interface ClinicOption {
  id: number,
  clinic_id: number,
  weekday: number,
  start_at: string,
  end_at: string,
  status: boolean,
  type: string
}

export interface ClinicFull extends Clinic {
  doctors: Doctor[]
  workingHours: Array<{ days: string; hours: string }>
  // images: ImageProps['src'][]
  images: ClinicImages[] |  ImageProps['src'][]
  weekdays: ClinicOption[]
}
