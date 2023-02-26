import api, {
  AxiosApiPaginatedFullResponse,
  endpoints,
} from 'shared/api'

import { Specialty } from 'shared/types/specialties'

export const getSpecialties = (): AxiosApiPaginatedFullResponse<
  Specialty[]
> => {
  return api.get(endpoints.specialties.get)
}
