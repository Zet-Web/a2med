import { FC } from 'react'

import { Heading, Icon } from 'components'
import { formatTime, parseDateTime } from 'shared/utils/handleDate'

import { OrdersType } from 'shared/types/orders'

import s from './analysisInfo.module.scss'

interface AnalysisInfoProps {
  data: OrdersType
}

const AnalysisInfo: FC<AnalysisInfoProps> = ({ data }) => (
  <div className={s.container}>
    <Heading As='h4' className={s.caption}>
      <Icon className={s.icon} variant='text-document' />
      Результат анализов
    </Heading>

    <div className={s.date}>
      <span>{formatTime(parseDateTime(data.datetime))}</span>
    </div>
  </div>
)

export default AnalysisInfo
