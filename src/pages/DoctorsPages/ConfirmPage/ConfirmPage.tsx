import { FC } from 'react'
import { useRouter } from 'next/router'

import { PaymentForm } from 'features'
import { Heading } from 'components'

import { mock_payment } from 'shared/mocks/mock_payment'

import s from './confirmPage.module.scss'

const DoctorsConfirmPage: FC = () => {
  const { push } = useRouter()

  const handleClick = () => {
    push('/doctors/success')
  }

  return (
    <div className={s.container}>
      <Heading As='h1' className={s.title}>
        Врачи
      </Heading>
      <PaymentForm onClick={handleClick} data={mock_payment} />
    </div>
  )
}

export default DoctorsConfirmPage
