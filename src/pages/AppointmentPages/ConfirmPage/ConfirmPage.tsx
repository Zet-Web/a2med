import { FC } from 'react'
import { useRouter } from 'next/router'

import { Heading } from 'components'
import { PaymentForm } from 'features'

import { useAppSelector } from 'store/hooks'

import s from './confirmPage.module.scss'

const ConfirmPage: FC = () => {
  const { push } = useRouter()
  const { appointment } = useAppSelector(state => state.appointment)

  const handleClick = () => push('/appointment/success')

  return (
    <div className={s.container}>
      <Heading As='h1' className={s.title}>
        Приём в клинике
      </Heading>
      <PaymentForm data={appointment} onClick={handleClick} withMap />
    </div>
  )
}

export default ConfirmPage
