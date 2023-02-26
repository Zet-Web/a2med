import api, { AxiosApiResponse, endpoints } from 'shared/api'
import { PatientType, PatientForm } from 'shared/types/patient'

export const getFamily = (): AxiosApiResponse<PatientType[]> => {
  return api.get(endpoints.family.get)
}

export const updateFamilyMember = (
  id: number,
  data: PatientForm
): AxiosApiResponse<PatientType> => {
  return api.put(endpoints.family.put(id), data)
}

export const createFamilyMember = (
  data: PatientForm
): AxiosApiResponse<PatientType> => {
  return api.post(endpoints.family.post, data)
}

export const deleteFamilyMember = (
  id: number
): AxiosApiResponse<PatientType> => {
  return api.delete(endpoints.family.delete(id))
}
