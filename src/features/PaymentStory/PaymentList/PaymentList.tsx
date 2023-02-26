import { PaymentStoryType } from 'shared/types/paymentStory'

import { formatDefaultDatePayment } from 'shared/utils/handleDate'

import s from './paymentList.module.scss'

interface PaymentListProps {
  paid?: boolean
  payments: PaymentStoryType[]
}

export const PaymentList = ({ payments, paid }: PaymentListProps) => (
  <ul className={s.list}>
    {payments.length ? (
      payments.map(({ title, price, created_at, status, id }) => (
        <li className={s.item} key={id}>
          <span className={s.caption}>{title}</span>
          <span className={s.price}>{price} р</span>
          {status ? (
            <span className={s.date}>
              {formatDefaultDatePayment(created_at)}
            </span>
          ) : (
            <span></span>
          )}
          <span className={s.button}>
            {!status ? (
              <a href='' className={s.link}>
                Оплатить
              </a>
            ) : (
              'Оплачено'
            )}
          </span>
        </li>
      ))
    ) : (
      <li className={s.plug}>
        {paid
          ? 'Здесь будет выводиться история платежей'
          : 'Здесь будут выводиться счета на оплату'}
      </li>
    )}
  </ul>
)
