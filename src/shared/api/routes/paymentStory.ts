import api, {
  AxiosApiResponse,
  AxiosApiPaginatedFullResponse,
  endpoints,
} from 'shared/api'
import { PaymentStoryType } from 'shared/types/paymentStory'

export const getPaymentStory = (): AxiosApiPaginatedFullResponse<
  PaymentStoryType[]
> => {
  return api.get(endpoints.payments.payment)
}

export const getPaymentStoryById = (
  id: number
): AxiosApiResponse<PaymentStoryType> => {
  return api.get(endpoints.payments.getById(id))
}
