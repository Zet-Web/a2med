import { FC } from 'react'
import cn from 'classnames'

import RadioButton from './RadioButton/RadioButton'

import s from './radioGroup.module.scss'

interface RadioGroupProps {
  labels: string[]
  disabled?: string[]
  value: string | null
  onChange: (value: string) => void
  className?: string
}

const RadioGroup: FC<RadioGroupProps> = ({
  labels,
  value,
  onChange,
  disabled,
  className,
  ...props
}) => (
  <div className={cn(s.group, className)}>
    {labels?.map((label, index) => (
      <RadioButton
        key={index}
        label={label}
        checked={value === label}
        onChange={onChange}
        disabled={disabled?.includes(label)}
        {...props}
      />
    ))}
  </div>
)

export default RadioGroup
