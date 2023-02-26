import { FC } from 'react'

import { Avatar, Heading, Icon } from 'components'
import { useGetSpecialties } from 'shared/hooks/useGetSpecialties'
import { formatTime, parseDateTime } from 'shared/utils/handleDate'

import { OrdersType } from 'shared/types/orders'

import s from './orderInfo.module.scss'

interface OrderInfoProps {
  data: OrdersType
}

const OrderInfo: FC<OrderInfoProps> = ({ data }) => {
  const { datetime, doctor, status, doctor_specialty, type } = data
  const timeView = formatTime(parseDateTime(datetime))
  const specialty = useGetSpecialties()?.meta?.find(
    item => item.id === doctor?.specialty.id
  )?.name

  return (
    <div className={s.container}>
      <div className={s.doctorInfo}>
        <Avatar
          className={s.avatar}
          src={doctor?.avatar}
          alt={doctor?.name}
          size={88}
          isDoctor={doctor?.specialty_id ? true : false}
        />
        <div>
          <Heading As='h4' className={s.name}>
            {[doctor?.surname, doctor?.name, doctor?.patronymic].join(
              ' '
            )}
          </Heading>

          <p className={s.specialty}>{specialty}</p>

          <address className={s.address}>
            <Icon variant='location_white' width={24} height={24} />
            <span>{`Клиника ${doctor?.clinic_id}`}</span>
          </address>
        </div>
      </div>

      <div className={s.serviceInfo}>
        <div>
          <p className={s.label}>Услуга</p>
          <p className={s.text}>{doctor_specialty}</p>
        </div>
        <div>
          <p className={s.label}>Время</p>
          <p className={s.text}>{timeView}</p>
        </div>

        <div>
          <p className={s.label}>Статус</p>
          <p className={s.text}>{status}</p>
        </div>
      </div>
    </div>
  )
}

export default OrderInfo
