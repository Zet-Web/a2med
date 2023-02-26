import api, { AxiosApiResponse, endpoints } from 'shared/api'

import { FaqType } from 'shared/types/faq'

export const getFaqList = (): AxiosApiResponse<FaqType[]> => {
  return api.get(endpoints.faq.get)
}
