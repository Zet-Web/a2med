import { IconType } from './icon'

export type ServiceType = {
  img: IconType
  title: string
  text: string
  href: string
}

export type HomeCallService = {
  id: number
  name: string
  price: number
  date: string
}
