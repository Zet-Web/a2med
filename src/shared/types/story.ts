import { ImageProps } from 'next/image'
import { TimeMark } from '.'

export interface Story extends TimeMark {
  id: number
  title: string
  image: ImageProps['src']
  text: string
}
