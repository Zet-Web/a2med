import { FC } from 'react'

import { Heading } from 'components'

import s from './orderInfoPage.module.scss'

export const OrderInfoPage: FC = () => (
  <div className={s.container}>
    <div className={s.wrapper}>
      <Heading As='h2' className={s.title}>
        Подготовка к приему
      </Heading>
      <p className={s.description}>
        A2MED – объединяет работу многопрофильных медицинских центров
        по всей стране, более 20 направлений медицины и 70 докторов.
        Наличие современного оборудования позволяет проводить
        эффективную диагностику и назначать правильное лечение.
      </p>
    </div>
  </div>
)
