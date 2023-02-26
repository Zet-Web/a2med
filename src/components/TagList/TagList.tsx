import { FC } from 'react'
import cn from 'classnames'

import { Button, Heading } from 'components'

import s from './tagList.module.scss'

interface TagProps {
  isSelected: boolean
  onCLick: (value: number) => void
  tag: { value: number; label: string }
}

interface TagListProps {
  list: { value: number; label: string }[]
  selected: number[]
  onChange: (value: number[]) => void
  isMulti?: boolean
  className?: string
}

const Tag: FC<TagProps> = ({ isSelected, onCLick, tag }) => {
  const buttonClass = cn(
    s.button,
    s[isSelected ? 'primary' : 'outline']
  )

  return (
    <Button
      key={tag.value}
      variant={isSelected ? 'primary' : 'outline'}
      className={buttonClass}
      onClick={() => {
        onCLick(tag.value)
      }}
    >
      {tag.label}
    </Button>
  )
}

const TagList: FC<TagListProps> = ({
  list,
  selected,
  onChange,
  isMulti,
  className,
}) => {
  const isSelected = (value: number) => selected.includes(value)

  const handleChange = (value: number) => {
    if (!isMulti) {
      onChange([value])
      return
    }

    const newValue = isSelected(value)
      ? selected.filter(item => item !== value)
      : selected.concat(value)

    onChange(newValue)
  }

  return (
    <div className={className}>
      <div className={s.container}>
        {list?.map((tag, index) => (
          <Tag
            key={index}
            tag={tag}
            onCLick={handleChange}
            isSelected={isSelected(tag.value)}
          />
        ))}
      </div>
    </div>
  )
}

export default TagList
