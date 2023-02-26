import { ImageProps } from 'next/image'

export type UserInfo = {
  fullName: string
  isAdult: boolean
  isMale: boolean
  avatar: ImageProps['src'] | null
}
