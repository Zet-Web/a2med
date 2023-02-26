import api, {
  AxiosApiPaginatedResponse,
  AxiosApiResponse,
  endpoints,
} from 'shared/api'

import { DateMask } from 'shared/types'
import { DoctorFull, DoctorWithOrderables } from 'shared/types/doctor'

export const getDoctorsList = (): AxiosApiPaginatedResponse<
  DoctorFull[]
> => {
  return api.get(endpoints.doctor.get)
}

// TODO фильтрация по специальности не работает
export const getDoctorsListBySpecialtyDate = (
  specialty_id: number,
  date: DateMask
): AxiosApiPaginatedResponse<DoctorWithOrderables[]> => {
  return api.get(
    endpoints.doctor.getBySpecialtyIdDate(specialty_id, date)
  )
}

export const getDoctorById = (
  id: number
): AxiosApiResponse<DoctorFull> => {
  return api.get(endpoints.doctor.getById(id))
}

export const getDoctorByIdDate = (
  id: number,
  date: DateMask | null
): AxiosApiResponse<DoctorWithOrderables> => {
  return api.get(endpoints.doctor.getByIdDate(id, date))
}
