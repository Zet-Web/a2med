import { FC } from 'react'
import cn from 'classnames'

import { Button, Heading, Map } from 'components'

import { appointmentLabels } from 'shared/constants/appointmentLabels'
import { AppointmentType } from 'shared/types/appointment'

import s from './entryCompleted.module.scss'

interface EntryCompletedProps {
  data: Partial<AppointmentType> | null
  className?: string
  onClick: () => void
}

const EntryCompleted: FC<EntryCompletedProps> = ({
  onClick,
  data,
  className,
}) => {
  return (
    <section className={cn(s.container, className)}>
      <div>
        <Heading As='h4' className={s.title}>
          Подтверждение
        </Heading>

        <ul className={s.list}>
          {data &&
            Object.entries(data).map(([key, data]) => (
              <li className={s.listItem} key={key}>
                <span className={s.listItemLabel}>
                  {appointmentLabels[key as keyof AppointmentType]}
                </span>
                <span className={s.listItemValue}>{data?.label}</span>
              </li>
            ))}
        </ul>

        <p className={s.text}>
          Для просмотра данных о записи, перейдите в раздел Медкнижка
        </p>
        <Button className={s.confirmButton} onClick={onClick}>
          Посмотреть запись
        </Button>
      </div>

      <Map address='Дачная ул., 24, Самара' />
    </section>
  )
}

export default EntryCompleted
