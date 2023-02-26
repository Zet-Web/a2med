import { FC } from 'react'
import Link from 'next/link'

import { Button, Heading } from 'components'

import { LabeledOrder } from 'shared/types/orders'
import { formatDateOrder } from 'shared/utils/handleDate'

import s from './orderDescription.module.scss'

interface OrderDescriptionProps {
  data: LabeledOrder
}

const ListItem = ({
  label,
  value,
}: {
  label: string
  value?: string | null
}) =>
  value ? (
    <>
      <span className={s.item}>{label}</span>
      <span className={s.info}>{value || 'Не указано'}</span>
    </>
  ) : null

const OrderDescription: FC<OrderDescriptionProps> = ({ data }) => {
  const caption = () => {
    switch (data.label) {
      case 'analyses':
        return 'Результат исследования'
      case 'homeCalls':
        return 'Результат осмотра'
      case 'doctors':
      default:
        return 'Описание записи'
    }
  }

  const button = () => {
    switch (data.label) {
      case 'analyses':
        return 'Результат исследования'
      case 'homeCalls':
        return 'Результат осмотра'
      case 'doctors':
      default:
        return 'Отменить запись'
    }
  }

  const service =
    data.label === 'analyses' ? 'Сдача анализов' : 'Приём в клинике'

  const doctor = data.doctor
    ? [
        data.doctor?.surname,
        data.doctor?.name,
        data.doctor?.patronymic,
      ].join(' ')
    : null

  return (
    <div className={s.card}>
      <Heading className={s.title}>{caption()}</Heading>

      <ul className={s.list}>
        <ListItem label={'Пациент'} value={data.user} />
        <ListItem
          label={'Дата и время'}
          value={formatDateOrder(data.datetime)}
        />
        <ListItem label={'Услуга'} value={service} />
        <ListItem label={'Врач'} value={doctor} />
        <ListItem
          label={'Специализация'}
          value={data.doctor_specialty}
        />
        <ListItem label={'Наименование'} value={data.analysis.name} />
        <ListItem label={'Клиника'} value={data.clinic} />
        <ListItem
          label={'Стоимость'}
          value={data.is_first ? '1000 руб' : '800 руб'}
        />
      </ul>

      <Button className={s.button}>{button()}</Button>
      {data.label === 'doctors' && (
        <Link href='/med-profile/info'>
          <a className={s.link}>Информация о подготовке к приему</a>
        </Link>
      )}
    </div>
  )
}

export default OrderDescription
