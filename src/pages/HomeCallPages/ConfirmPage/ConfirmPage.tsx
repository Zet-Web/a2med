import { FC } from 'react'
import { useRouter } from 'next/router'

import { PaymentForm } from 'features'
import { Heading } from 'components'

import { mock_payment_confirm } from 'shared/mocks/mock_payment_confirm'

import s from './confirmPage.module.scss'

const ConfirmPage: FC = () => {
  const { push } = useRouter()

  const handleClick = () => {
    push('/home-call/success')
  }

  return (
    <div className={s.container}>
      <Heading As='h1' className={s.title}>
        Вызов врача на дом
      </Heading>
      <PaymentForm
        onClick={handleClick}
        split
        data={mock_payment_confirm}
      />
    </div>
  )
}

export default ConfirmPage
