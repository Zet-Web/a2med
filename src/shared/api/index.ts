import Axios from 'axios'

export * from './endpoints'
export * from './types'

export const BASE_DOMAIN = 'http://92.53.127.7'

const api = Axios.create({
  baseURL: `${BASE_DOMAIN}/api/`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

export default api
