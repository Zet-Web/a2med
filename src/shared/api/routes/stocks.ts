import api, {
  AxiosApiPaginatedFullResponse,
  AxiosApiResponse,
  endpoints,
} from 'shared/api'

import { StockType } from 'shared/types/stock'

export const getStocksList = (): AxiosApiPaginatedFullResponse<
  StockType[]
> => {
  return api.get(endpoints.stock.get)
}

export const getStockById = (
  id: number
): AxiosApiResponse<StockType> => {
  return api.get(endpoints.stock.getById(id))
}
