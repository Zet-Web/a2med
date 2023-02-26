import { FC } from 'react'

import { CurrentClinic } from 'features'
import { Heading } from 'components'

import s from './currentClinicPage.module.scss'

export const CurrentClinicPage: FC = () => (
  <div className={s.container}>
    <Heading As='h1' className={s.title}>
      Клиники
    </Heading>
    <CurrentClinic />
  </div>
)
