import api, {
  AxiosApiPaginatedResponse,
  AxiosApiPaginatedFullResponse,
  endpoints,
} from 'shared/api'
import { AnalysesCategory } from 'shared/types/analyses'
import { Analysis } from 'shared/types/analyses'

export const getAnalyses = (): AxiosApiPaginatedFullResponse<
  Analysis[]
> => {
  return api.get(endpoints.analysis.get)
}

export const getAnalysesCategories =
  (): AxiosApiPaginatedFullResponse<AnalysesCategory[]> => {
    return api.get(endpoints.analysis.getCategory)
  }
