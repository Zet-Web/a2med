import { DateTimeMask } from '.'

export type NotificationType = {
  id: number
  title: string
  text: string
  date: DateTimeMask | null
  read: boolean
}
