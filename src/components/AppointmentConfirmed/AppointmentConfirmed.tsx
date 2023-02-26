import { FC } from 'react'
import { useRouter } from 'next/router'

import { Button, Heading } from 'components'

import { ConfirmedProps } from 'shared/types/appointmentConfirmed'

import s from './appointmentConfirmed.module.scss'

interface AppointmentConfirmedProps {
  data: ConfirmedProps
}

const AppointmentConfirmed: FC<AppointmentConfirmedProps> = ({
  data,
}) => {
  const { push } = useRouter()
  const handleClick = () => {
    push(data.href)
  }

  return (
    <div className={s.wrapper}>
      <Heading As='h2' className={s.heading}>
        {data.title}
      </Heading>
      <p className={s.paragraph}>{data.text}</p>
      <Button className={s.button} onClick={handleClick}>
        Посмотреть запись
      </Button>
    </div>
  )
}

export default AppointmentConfirmed
