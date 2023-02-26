import {
  format,
  parse,
  differenceInCalendarYears,
  compareAsc,
} from 'date-fns'
import { ru } from 'date-fns/locale'

import { DateMask, DateTimeMask, TimeMask } from 'shared/types'

export const parseDate = (date: DateMask | null): Date | null => {
  if (!date) return null
  return parse(date, 'yyyy-MM-dd', new Date())
}

export const parseDateTime = (
  date: DateTimeMask | null
): Date | null => {
  if (!date) return null
  return parse(date, 'yyyy-MM-dd HH:mm:ss', new Date())
}

export const formatDate = (date: Date | null): DateMask | null => {
  if (!date) return null
  return format(date, 'yyyy-MM-dd') as DateMask
}

export const formatTime = (date: Date | null): TimeMask | null => {
  if (!date) return null
  return format(date, 'HH:mm') as TimeMask
}

export const compareDate = (
  dateFirst: DateTimeMask | null,
  dateSecond: DateTimeMask | null
): boolean => {
  if (!dateFirst || !dateSecond) return false

  return (
    formatDate(parseDateTime(dateFirst)) ===
    formatDate(parseDateTime(dateSecond))
  )
}

export const formatDateNotification = (
  date: Date | string | null
) => {
  if (!date) return null
  return format(new Date(date), 'd MMMM y', { locale: ru })
}

export const formatDatePayment = (date: DateTimeMask | null) => {
  const parsedDate = parseDateTime(date)
  if (!parsedDate) return null

  return format(parsedDate, 'dd.MM.yyyy HH:mm', { locale: ru })
}

export const formatDefaultDatePayment = (date: string | null) => {
  if (!date) return null
  const parsedDate = new Date(date)

  return format(parsedDate, 'dd.MM.yyyy HH:mm', { locale: ru })
}

export const formatDateAnalysis = (date: DateTimeMask | null) => {
  const parsedDate = parseDateTime(date)
  if (!parsedDate) return null

  return format(parsedDate, 'dd.MM.yyyy (EEEEEE)', { locale: ru })
}

export const formatDateOrder = (date: DateTimeMask | null) => {
  const parsedDate = parseDateTime(date)
  if (!parsedDate) return null

  return format(parsedDate, 'dd MMMM, eeee HH:mm', { locale: ru })
}

export const formatDateMedProfile = (date: DateTimeMask | null) => {
  const parsedDate = parseDateTime(date)
  if (!parsedDate) return null

  return format(parsedDate, 'dd MMMM, eeee', { locale: ru })
}

export const isPersonAdult = (birthday: DateMask | null): boolean => {
  const birthdayDate = parseDate(birthday)
  if (!birthdayDate) return true

  return differenceInCalendarYears(new Date(), birthdayDate) >= 18
}

export const isDatePassed = (date: DateTimeMask): boolean => {
  const parsedDate = parseDateTime(date)
  if (parsedDate === null) return false

  return compareAsc(parsedDate, new Date()) < 0
}
