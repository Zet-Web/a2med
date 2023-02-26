import api, { AxiosApiPaginatedResponse, endpoints } from 'shared/api'
import { OrderLabel, OrdersType } from 'shared/types/orders'

export const getOrders = (
  label?: OrderLabel
): AxiosApiPaginatedResponse<OrdersType[]> => {
  switch (label) {
    case 'analyses':
      return api.get(endpoints.order.getAnalysis)
    case 'homeCalls':
      return api.get(endpoints.order.getHome)
    case 'doctors':
      return api.get(endpoints.order.getDoctors)
    default:
      return api.get(endpoints.order.get)
  }
}
