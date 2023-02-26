import { FC } from 'react'
import cn from 'classnames'

import { Button } from 'components'

import { HomeCallService } from 'shared/types/service'

import s from './services.module.scss'

interface ServicesProps {
  list: HomeCallService[] | null
  activeList: number[]
  onClick: (id: number) => void
}

const Services: FC<ServicesProps> = ({
  list,
  activeList,
  onClick,
}) => (
  <div className={s.container}>
    {list?.map(item => (
      <div className={s.item} key={item.id}>
        <div className={s.leftContent}>
          <p className={s.name}>{item.name}</p>
          <p className={s.price}>от {item.price} ₽</p>
        </div>

        <div className={s.rightContent}>
          <p className={s.date}>2-3 дня</p>
          <Button
            className={cn(s.button, {
              [s.active]: activeList.includes(item.id),
            })}
            onClick={() => onClick(item.id)}
          >
            {activeList.includes(item.id) ? 'Добавлено' : 'Добавить'}
          </Button>
        </div>
      </div>
    ))}
  </div>
)

export default Services
