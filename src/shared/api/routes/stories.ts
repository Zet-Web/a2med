import api, {
  AxiosApiPaginatedFullResponse,
  AxiosApiResponse,
  endpoints,
} from 'shared/api'
import { Story } from 'shared/types/story'

export const getStoriesList = (): AxiosApiPaginatedFullResponse<
  Story[]
> => {
  return api.get(endpoints.story.get)
}

export const getStoryById = (
  id: number
): AxiosApiResponse<Story[]> => {
  return api.get(endpoints.story.getById(id))
}
