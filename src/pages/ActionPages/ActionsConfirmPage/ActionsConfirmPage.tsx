import { FC } from 'react'
import { useRouter } from 'next/router'

import { PaymentForm } from 'features'

import { mock_payment } from 'shared/mocks/mock_payment'

import s from './actionsConfirmPage.module.scss'

const ActionsConfirmPage: FC = () => {
  const { push } = useRouter()
  const handleClick = () => {
    push(`/actions/success`)
  }

  return (
    <div className={s.container}>
      <PaymentForm data={mock_payment} onClick={handleClick} />
    </div>
  )
}

export default ActionsConfirmPage
