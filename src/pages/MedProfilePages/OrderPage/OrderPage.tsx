import { FC } from 'react'
import { useRouter } from 'next/router'

import { OrderDescription } from 'features'

import { useGetOrders } from 'shared/hooks/useGetOrders'

import s from './orderPage.module.scss'

export const OrderPage: FC = () => {
  const router = useRouter()
  const orderId = Number(router.query.id)

  const data = useGetOrders().find(item => item.id === orderId)

  return (
    <div className={s.container}>
      {data ? (
        <OrderDescription data={data} />
      ) : (
        <p className={s.plug}>Загрузка...</p>
      )}
    </div>
  )
}
