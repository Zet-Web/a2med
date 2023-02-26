import { FC } from 'react'
import cn from 'classnames'

import { Analysis } from 'shared/types/analyses'
import { Button, Heading } from 'components'

import { Meta } from 'shared/types'

import s from './researches.module.scss'

interface ResearchesProps {
  mainSelect?: Meta | null
  subList: Analysis[] | null
  activeSubList: number[]
  onClick: (id: number, researchId?: number) => void
}

const Researches: FC<ResearchesProps> = ({
  mainSelect,
  subList,
  activeSubList,
  onClick,
}) => {
  const isActive = (id: number) => activeSubList.includes(id)

  const handleClick = (id: number, researchId?: number) => {
    onClick(id, researchId)
  }

  return (
    <div className={s.container}>
      <Heading className={s.heading}>
        {mainSelect?.name || 'Все анализы'}
      </Heading>

      {subList
        ?.filter(
          item => !mainSelect || item.category_id === mainSelect?.id
        )
        .map(item => (
          <div className={s.item} key={item.id}>
            <div className={s.leftContent}>
              <p className={s.name}>{item.name}</p>
              <p className={s.price}>от {item.price} ₽</p>
            </div>

            <div className={s.rightContent}>
              <Button
                className={cn(s.button, {
                  [s.active]: isActive(item.id),
                })}
                onClick={() =>
                  handleClick(mainSelect?.id || 0, item.id)
                }
              >
                {isActive(item.id) ? 'Добавлено' : 'Добавить'}
              </Button>
            </div>
          </div>
        ))}
    </div>
  )
}

export default Researches
