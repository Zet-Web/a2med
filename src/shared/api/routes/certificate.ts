import api, { AxiosApiResponse, endpoints } from 'shared/api'
import { TimeMark } from 'shared/types'
import { CertificateFormState } from 'shared/types/profile'

export const sendCertificate = (
  data: CertificateFormState
): AxiosApiResponse<TimeMark & CertificateFormState> => {
  return api.post(endpoints.application.post, data)
}
