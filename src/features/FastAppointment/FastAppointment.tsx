import { FC, useState } from 'react'

import { PatientModal } from 'features'
import {
  Avatar,
  Button,
  Calendar,
  Heading,
  TimePicker,
} from 'components'

import { DateMask, DateTimeMask } from 'shared/types'
import { useGetFamily } from 'shared/hooks/useGetFamily'
import { useAppDispatch } from 'store/hooks'
import { setPatient } from 'store/slices/family'

import s from './fastAppointment.module.scss'

interface FastAppointmentProps {
  date: DateMask | null
  onChangeDate: (date: DateMask | null) => void
  orderables: DateTimeMask[]
  onConfirm: (id: number, dateTime: DateTimeMask) => void
}

const FastAppointment: FC<FastAppointmentProps> = ({
  date,
  onChangeDate,
  orderables,
  onConfirm,
}) => {
  const dispatch = useAppDispatch()
  const { patient } = useGetFamily()
  const [dateTime, setDateTime] = useState<DateTimeMask | null>(null)

  const handleConfirm = () => {
    if (!patient?.id || !dateTime) return

    onConfirm(patient?.id, dateTime)
  }

  const handleClick = (id: number) => {
    dispatch(setPatient(id))
  }

  return (
    <section className={s.container}>
      <Heading As='h3' className={s.heading}>
        Запись на приём
      </Heading>

      <div className={s.patient}>
        <Avatar
          className={s.avatar}
          src={patient?.image}
          alt={patient?.name}
          size={50}
        />
        <span className={s.name}>
          {[patient?.name, patient?.surname].join(' ')}
        </span>
        <PatientModal
          className={s.changeButton}
          label='Изменить'
          onClick={handleClick}
        />
      </div>

      <Calendar
        className={s.margin}
        date={date}
        onChange={onChangeDate}
      />

      <TimePicker
        className={s.margin}
        orderables={orderables}
        currentTime={dateTime}
        onClick={setDateTime}
        columns={5}
      />

      <Button
        onClick={handleConfirm}
        disabled={!dateTime}
        className={s.confirmButton}
      >
        Записаться
      </Button>
    </section>
  )
}

export default FastAppointment
