import { FC, useMemo } from 'react'
import cn from 'classnames'
import { format, add } from 'date-fns'
const { ru } = require('date-fns/locale')

import { Button, Slider } from 'components'

import { DateButton, DateMask } from 'shared/types'
import { capitalize } from 'shared/utils/handleString'

import s from './datePicker.module.scss'

interface DatePickerProps {
  currentDate: DateMask | null
  onClick: (date: DateMask) => void
}

const DatePicker: FC<DatePickerProps> = ({
  currentDate,
  onClick,
}) => {
  const dateArray: DateButton[] = useMemo(() => {
    return Array.from(Array(30).keys()).map(days => {
      const date = add(new Date(), { days })
      return {
        value: format(date, 'yyyy-MM-dd'),
        label: format(date, 'dd MMMM', { locale: ru }),
        weekDay: capitalize(format(date, 'cccc', { locale: ru })),
      }
    }) as DateButton[]
  }, [])

  const isActive = (value: DateMask) =>
    value === currentDate ? 'primary' : 'outline'

  return (
    <Slider
      className={s.container}
      inner
      slidesPerView={7}
      allowTouchMove={false}
    >
      {dateArray.map(day => (
        <Button
          key={day.value}
          className={cn(s.button, s[isActive(day.value)])}
          variant={isActive(day.value)}
          onClick={() => {
            onClick(day.value)
          }}
        >
          <span className={s.label}>{day.label}</span>
          <span className={s.weekDay}>{day.weekDay}</span>
        </Button>
      ))}
    </Slider>
  )
}

export default DatePicker
