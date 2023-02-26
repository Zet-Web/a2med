import { FC, forwardRef, useMemo } from 'react'
import DatePicker, { registerLocale } from 'react-datepicker'
import ru from 'date-fns/locale/ru'
import cn from 'classnames'

import { Icon } from 'components'

import { formatDate, parseDate } from 'shared/utils/handleDate'
import { DateMask } from 'shared/types'

import 'react-datepicker/dist/react-datepicker.css'
import s from './calendar.module.scss'

interface CalendarProp {
  date: DateMask | null
  onChange: (date: DateMask | null) => void
  onClick?: () => void
  className?: string
  inputClassName?: string
  withIcon?: boolean
  dateFormat?: string
}

const Calendar: FC<CalendarProp> = ({
  date,
  onChange,
  onClick,
  className,
  inputClassName,
  withIcon = true,
  dateFormat = 'dd MMMM, eeee',
}) => {
  useMemo(() => {
    registerLocale('ru', ru)
  }, [])

  const handleChange = (date: Date | null) => {
    onChange(formatDate(date))
  }

  const CustomInput = forwardRef<any, any>(function render(
    { value, onClick },
    ref
  ) {
    return (
      <div className={cn(s.container, className)} onClick={onClick}>
        <input
          className={cn(s.input, inputClassName)}
          value={value}
          readOnly
          ref={ref}
        />
        {withIcon && (
          <div className={s.iconWrapper}>
            <Icon variant='calendar' className={s.iconWrapper} />
          </div>
        )}
      </div>
    )
  })

  return (
    <DatePicker
      dateFormat={dateFormat}
      todayButton='Сегодня'
      showMonthDropdown
      showYearDropdown
      dropdownMode='select'
      locale='ru'
      selected={parseDate(date)}
      onChange={handleChange}
      customInput={<CustomInput />}
      onInputClick={onClick}
    />
  )
}

export default Calendar
