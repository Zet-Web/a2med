import { FC } from 'react'
import cn from 'classnames'

import { Button } from 'components'

import { DateTimeMask, TimeMask } from 'shared/types'

import s from './timePicker.module.scss'

interface TimePickerProps {
  orderables: DateTimeMask[]
  currentTime: DateTimeMask | null
  onClick: (time: DateTimeMask) => void
  className?: string
  columns?: number
}

const getTime = (value: DateTimeMask): TimeMask =>
  (value.split(' ').pop()?.slice(0, 5) as TimeMask) || '00:00'

const TimePicker: FC<TimePickerProps> = ({
  orderables,
  currentTime,
  onClick,
  className,
  columns = 4,
}) => {
  const isActive = (time: DateTimeMask) =>
    time === currentTime ? 'primary' : 'outline'

  return (
    <div
      className={cn(s.timePicker, s[`columns_${columns}`], className)}
    >
      {orderables?.length ? (
        orderables.map((item, index) => (
          <Button
            key={index}
            className={s.timeButton}
            variant={isActive(item)}
            onClick={() => onClick(item)}
          >
            {getTime(item)}
          </Button>
        ))
      ) : (
        <p className={s.plug}>Нет доступных окон на выбранную дату</p>
      )}
    </div>
  )
}

export default TimePicker
