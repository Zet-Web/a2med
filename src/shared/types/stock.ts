import { ImageProps } from 'next/image'
import { TimeMark } from '.'

export interface StockType extends TimeMark {
  id: number
  title: string
  image: ImageProps['src']
  text: string
}
