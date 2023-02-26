export type Meta = { id: number; name: string }

export type ListItemType = { value: string; label: string }

export type LinkType = { href: string; label: string }

export type DateMask = `${number}-${number}-${number}`
export type TimeMask = `${number}:${number}`
export type TimeFullMask = `${number}:${number}:${number}`
export type DateTimeMask = `${DateMask} ${TimeFullMask}`

export type TimeMark = { created_at: string; updated_at: string }
export type DateType = { date: string; available: boolean }

export type DateButton = {
  value: DateMask
  label: string
  weekDay: string
}
