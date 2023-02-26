import { FC } from 'react'
import cn from 'classnames'

import s from './radioButton.module.scss'

interface RadioButtonProps {
  label: string
  checked: boolean | undefined
  onChange: (value: string) => void
  disabled?: boolean
  className?: string
}

const RadioButton: FC<RadioButtonProps> = ({
  label,
  checked,
  onChange,
  className,
  disabled,
  ...props
}) => {
  const handleChange = () => {
    onChange(label)
  }

  return (
    <label className={cn(s.label, className)}>
      <input
        type='radio'
        className={s.button}
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        {...props}
      />
      {label}
    </label>
  )
}

export default RadioButton
