import { FC } from 'react'

import { AppointmentConfirmed } from 'components'

import {
  actionSuccess,
  doctorsSuccess,
  homeCallSuccess,
} from 'shared/constants/appointmentSuccess'

import s from './successPage.module.scss'

interface SuccessPageProps {
  variant: 'action' | 'doctor' | 'homeCall'
}

const SuccessPage: FC<SuccessPageProps> = ({ variant }) => {
  const data = () => {
    switch (variant) {
      case 'action':
        return actionSuccess
      case 'doctor':
        return doctorsSuccess
      case 'homeCall':
        return homeCallSuccess
    }
  }

  return (
    <div className={s.container}>
      <AppointmentConfirmed data={data()} />
    </div>
  )
}

export default SuccessPage
