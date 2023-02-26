import { ListItemType } from '.'

export type AppointmentType = {
  patient: ListItemType | null
  specialty: ListItemType | null
  clinic: ListItemType | null
  doctor: ListItemType | null
  date: ListItemType | null
  price: ListItemType | null
}
