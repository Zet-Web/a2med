import { FC, useMemo } from 'react'
import Link from 'next/link'

import { AnalysisInfo } from 'features'

import {
  compareDate,
  formatDateMedProfile,
} from 'shared/utils/handleDate'
import { useGetOrders } from 'shared/hooks/useGetOrders'

import s from '../ordersPage.module.scss'

export const AnalysesTab: FC = () => {
  const analyses = useGetOrders('analyses')

  const ordersArray = useMemo(
    () => [
      analyses,
      // analyses?.filter(el => !isDatePassed(el.datetime)),
      // analyses?.filter(el => isDatePassed(el.datetime)),
      // // TODO нет поля отменён на бэкенде
      // analyses?.filter(el => el.is_first),
    ],
    [analyses]
  )

  return (
    // <Tabs tabLinks={NESTED_MED_PROFILE_TABS} isNested>
    <>
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
                  <AnalysisInfo data={order} />
                </a>
              </Link>
            </li>
          ))}
        </ul>
      ))}
    </>
    // </Tabs>
  )
}
