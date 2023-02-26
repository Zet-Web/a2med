import { FC, useState } from 'react'
import cn from 'classnames'

import { Heading, Icon, Input } from 'components'
import { AlphabetList } from 'features'
import Researches from './Researches/Researches'

import { Analysis } from 'shared/types/analyses'
import { Meta } from 'shared/types'

import s from './filterSearch.module.scss'

interface FilterSearchProps {
  className?: string
  title: string
  placeholder?: string
  onChange: (id: number, researchId?: number) => void
  list: Meta[] | null
  subList?: Analysis[] | null
  activeSubList?: number[]
  advanced?: boolean
}

const FilterSearch: FC<FilterSearchProps> = ({
  className,
  title,
  placeholder,
  onChange,
  list = [],
  subList = [],
  activeSubList = [],
  advanced,
}) => {
  const [inputValue, setInputValue] = useState('')
  const handleInputValue = (value: string) => {
    setInputValue(value)
  }

  const [mainSelect, setMainSelect] = useState<Meta | null>(null)
  const handleMainSelect = (id: number) => {
    setMainSelect(list?.find(elem => elem.id === id) || null)
  }

  const handleClick = (id: number) => {
    if (!advanced) onChange(id)
    else handleMainSelect(id)
  }

  const handleSubClick = (id: number, researchId?: number) => {
    onChange(id, researchId)
  }

  return (
    <div className={cn(s.wrapper, className)}>
      <Heading className={s.heading}>{title}</Heading>

      <Input
        onChange={handleInputValue}
        className={s.input}
        placeholder={placeholder}
        value={inputValue}
        isSearch
      />

      <div className={s.content}>
        <AlphabetList
          value={inputValue}
          onClick={handleClick}
          list={list}
          advanced={advanced}
        />

        {advanced && (
          <Researches
            mainSelect={mainSelect}
            subList={subList}
            activeSubList={activeSubList}
            onClick={handleSubClick}
          />
        )}
      </div>
    </div>
  )
}

export default FilterSearch
