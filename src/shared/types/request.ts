import { ListItemType } from '.'

export type RequestType = {
  patient: ListItemType | null
  number: ListItemType | null
  address: ListItemType | null
  symptoms: ListItemType | null
  date: ListItemType | null
  price: ListItemType | null
}
