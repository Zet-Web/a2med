import { AxiosResponse } from 'axios'

type PaginationType = {
  total: number
  count: number
  per_page: number
  current_page: number
  total_pages: number
}

export type AxiosApiResponse<T> = Promise<
  AxiosResponse<{ result: T; errors: any }>
>
// profile, family, doctor[id], story[id],
//  stock[id], analysis[id], analysis-category[id]
// payment[id], clinic[id], notification (all), faq (all)
// specialty[id], home-service[id]

export type AxiosApiPaginatedResponse<T> = Promise<
  AxiosResponse<{
    result: {
      data: T
      pagination: PaginationType
    }
    errors: any
  }>
>
// doctor, order (all), clinic

export type AxiosApiPaginatedFullResponse<T> = Promise<
  AxiosResponse<{
    result: {
      data: T
      current_page: number | null
      first_page_url: string | null
      from: number | null
      last_page: number | null
      last_page_url: string | null
      links: {
        active: boolean
        label: string | null
        url: string | null
      }[]
      next_page_url: null
      path: string | null
      per_page: number | null
      prev_page_url: string | null
      to: number | null
      total: number | null
    }
    errors: any
  }>
>
// story, stock, analysis, analysis-category, payment
// specialty, home-service
