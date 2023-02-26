import { FC, useMemo } from 'react'
import Link from 'next/link'

import { OrderInfo, Tabs } from 'features'

import { NESTED_MED_PROFILE_TABS } from 'shared/constants/medProfileTabs'
import {
  compareDate,
  formatDateMedProfile,
  isDatePassed,
} from 'shared/utils/handleDate'
import { useGetOrders } from 'shared/hooks/useGetOrders'

import s from '../ordersPage.module.scss'

export const DoctorsTab: FC = () => {
  const doctors = useGetOrders('doctors')

  const ordersArray = useMemo(
    () => [
      doctors,
      doctors?.filter(el => !isDatePassed(el.datetime)),
      doctors?.filter(el => isDatePassed(el.datetime)),
      // TODO нет поля отменён на бэкенде
      doctors?.filter(el => el.status === 'Отменена'),
    ],
    [doctors]
  )

  return (
    <Tabs tabLinks={NESTED_MED_PROFILE_TABS} isNested>
      {ordersArray?.map((list, index) => (
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
      ))}
    </Tabs>
  )
}
