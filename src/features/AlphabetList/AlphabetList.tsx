import { FC } from 'react'
import { sortBy } from 'lodash'
import cn from 'classnames'

import { Meta } from 'shared/types'

import s from './alphabetList.module.scss'

interface AlphabetListProps {
  value: string
  onClick: (id: number) => void
  list: Meta[] | null
  advanced?: boolean
}

const getLetter = (index: number, array: Meta[]): string => {
  if (index < 0) return ''
  return array[index].name[0] !== array[index - 1]?.name[0]
    ? array[index].name[0]
    : ''
}

const hasMatch = (string: string, substring: string) => {
  return string.toLowerCase().includes(substring.toLowerCase())
}

const AlphabetList: FC<AlphabetListProps> = ({
  value,
  onClick,
  list,
  advanced,
}) => {
  const handleClick = (id: number) => onClick(id)
  return (
    <div className={cn(s.alphabetList, { [s.columns]: !advanced })}>
      {sortBy(list, 'name')
        ?.filter(item => hasMatch(item.name, value))
        ?.map((item, index, array) => (
          <div key={index} className={s.listItem}>
            <span className={s.letter}>
              {getLetter(index, array)}
            </span>
            <button
              className={s.button}
              onClick={() => handleClick(item.id)}
            >
              {item.name}
            </button>
          </div>
        ))}
    </div>
  )
}

export default AlphabetList
