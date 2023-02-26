import { FC, useEffect, useState } from 'react'

import { Avatar, Button, Heading, Icon, TimePicker } from 'components'

import { DateTimeMask, DateMask } from 'shared/types'
import { DoctorWithOrderables } from 'shared/types/doctor'

import s from './doctorPicker.module.scss'

export type DoctorPickerResponse = {
  id: number
  time: DateTimeMask | null
}

interface DoctorPickerProps {
  data: DoctorWithOrderables
  onClick: ({ id, time }: DoctorPickerResponse) => void
}

const DoctorPicker: FC<DoctorPickerProps> = ({ data, onClick }) => {
  const [time, setTime] = useState<DateTimeMask | null>(null)
  useEffect(() => setTime(null), [data])

  //TODO подключить клиники
  const {
    id,
    avatar,
    name,
    specialty,
    clinic_id,
    specialty_id,
    first_order_cost,
    orderables,
  } = data

  const handleClick = () => {
    onClick({ id, time })
  }

  return (
    <div className={s.container}>
      <div className={s.infoBlock}>
        <Avatar
          className={s.avatar}
          src={avatar}
          alt={name}
          size={100}
          isDoctor={specialty_id ? true : false}
        />

        <span className={s.content}>
          <Heading As='h4' className={s.title}>
            {name}
          </Heading>
          <p className={s.caption}>{specialty.name}</p>
          <address className={s.address}>
            <Icon variant='location_white' width={24} height={24} />
            <span className={s.street}>{`Клиника ${clinic_id}`}</span>
          </address>
        </span>
      </div>

      <div className={s.helperWrapper}>
        <div className={s.priceBlock}>
          <p className={s.price}>{first_order_cost}</p>
          <TimePicker
            orderables={orderables}
            currentTime={time}
            onClick={setTime}
          />
        </div>
        {time && (
          <Button className={s.confirmButton} onClick={handleClick}>
            Записаться
          </Button>
        )}
      </div>
    </div>
  )
}

export default DoctorPicker
