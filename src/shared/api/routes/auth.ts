import api, { AxiosApiResponse, endpoints } from 'shared/api'

import { ContactForm } from 'shared/types/contact'

export const authorize = (
  form: ContactForm
): AxiosApiResponse<{ token: string }> => {
  return api.post(endpoints.login, form)
}

export const register = (
  form: Pick<ContactForm, 'phone_number'>
): AxiosApiResponse<{ token: string }> => {
  return api.post(endpoints.send_sms_code, form)
}
