import api, { AxiosApiResponse, endpoints } from 'shared/api'

import { Profile } from 'shared/types/profile'

export const getProfile = (): AxiosApiResponse<Profile> => {
  return api.get(endpoints.profile.get)
}

export const updateProfile = (data: any) => {
  return api.post(endpoints.profile.update, data)
}
