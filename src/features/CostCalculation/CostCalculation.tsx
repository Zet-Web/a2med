import { FC, useMemo } from 'react'

import { Heading, Icon } from 'components'

import { CalculationType } from 'shared/types/calculation'

import s from './costCalculation.module.scss'

interface CostCalculationProps {
  prices: CalculationType[]
  onClear: () => void
}

const CostCalculation: FC<CostCalculationProps> = ({
  prices,
  onClear,
}) => {
  const sum = useMemo(() => {
    if (!prices.length) return 0
    return prices.map(p => p.price).reduce((prev, cur) => prev + cur)
  }, [prices])

  return (
    <div className={s.container}>
      <div className={s.title}>
        <Heading As='h3' className={s.heading}>
          Анализы
        </Heading>
        <span className={s.delete} onClick={onClear}>
          Удалить все
        </span>
      </div>

      <ul className={s.serviceList}>
        {prices.map(item => (
          <li key={item.id}>
            <div className={s.serviceItem}>
              <p className={s.caption}>{item.title}</p>
              <p className={s.price}>от {item.price} ₽ </p>
            </div>
            <p className={s.date}>{item.time}</p>
          </li>
        ))}
      </ul>

      <div className={s.summary}>
        <p className={s.captionSummary}>Итого</p>
        <p className={s.price}>от {sum} ₽</p>
      </div>

      <div className={s.alert}>
        <Icon variant='warning' width={24} height={24} />
        Дополнительно в оплату входит услуга забора материала
      </div>
    </div>
  )
}

export default CostCalculation
