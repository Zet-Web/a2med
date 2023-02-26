import { FC, useMemo } from 'react'
import Link from 'next/link'

import { OrderInfo } from 'features'

import {
  compareDate,
  formatDateMedProfile,
} from 'shared/utils/handleDate'
import { useGetOrders } from 'shared/hooks/useGetOrders'

import s from '../ordersPage.module.scss'

export const HomeTab: FC = () => {
  const homeCalls = useGetOrders('homeCalls')

  const ordersArray = useMemo(
    () => [
      homeCalls.filter(el => el.inspection_datetime !== null),
      // homeCalls?.filter(el => !isDatePassed(el.datetime)),
      // homeCalls?.filter(el => isDatePassed(el.datetime)),
      // // TODO нет поля отменён на бэкенде
      // homeCalls?.filter(el => el.is_first),
    ],
    [homeCalls]
  )
  console.log(ordersArray)

  return (
    // <Tabs tabLinks={NESTED_MED_PROFILE_TABS} isNested>
    <>
      {ordersArray?.map((list, index) =>
        list.length ? (
          <ul key={index} className={s.ordersList}>
            {list?.map((order, index, array) => (
              <li key={order.id} className={s.ordersItem}>
                {!compareDate(
                  array[index]?.datetime,
                  array[index - 1]?.datetime
                ) ? (
                  <p className={s.dateGroup}>
                    {formatDateMedProfile(array[index].datetime)}
                  </p>
                ) : null}
                <Link href={`/med-profile/${order.id}`}>
                  <a className={s.link}>
                    <OrderInfo data={order} />
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <h3>Нет доступных осмотров</h3>
        )
      )}
    </>
    // </Tabs>
  )
}
