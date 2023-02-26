import api, {
  AxiosApiPaginatedResponse,
  AxiosApiResponse,
  endpoints,
} from 'shared/api'

import { ClinicFull } from 'shared/types/clinic'

export const getClinicsList = (): AxiosApiPaginatedResponse<
  ClinicFull[]
> => {
  return api.get(endpoints.clinics.get)
}

export const getClinicById = (
  id: number
): AxiosApiResponse<ClinicFull> => {
  return api.get(endpoints.clinics.getById(id))
}
