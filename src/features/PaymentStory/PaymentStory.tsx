import { FC, useState, useEffect } from 'react'

import { Heading } from 'components'
import { PaymentList } from './PaymentList/PaymentList'

import { getPaymentStory } from 'shared/api/routes/paymentStory'
import { handleError } from 'shared/utils/handleError'
import { PaymentStoryType } from 'shared/types/paymentStory'

import s from './paymentStory.module.scss'

const PaymentStory: FC = () => {
  const [payments, setPayments] = useState<PaymentStoryType[]>([])

  const getDataPayments = async () => {
    try {
      const { data } = await getPaymentStory()
      setPayments(data.result.data)
    } catch (error) {
      handleError(error)
    }
  }

  useEffect(() => {
    getDataPayments()
  }, [])

  return (
    <div className={s.wrapper}>
      <Heading As='h4' className={s.heading}>
        Счета и истории
      </Heading>
      <PaymentList payments={payments} />
    </div>
  )
}

export default PaymentStory
