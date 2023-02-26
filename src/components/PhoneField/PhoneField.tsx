import { ChangeEvent, FC } from 'react'
import InputMask from 'react-input-mask'
import cn from 'classnames'

import s from './phoneField.module.scss'

interface PhoneFieldProps {
  label: string
  name: string
  value: string
  required?: boolean
  placeholder?: string
  className?: string
  phoneInputClass?: string
  error?: string
  onChange?: (name: unknown | undefined | any) => void
  disabled?: boolean
}

const PhoneField: FC<PhoneFieldProps> = ({
  label,
  name,
  value,
  required,
  placeholder,
  className,
  phoneInputClass,
  error,
  onChange,
  disabled,
}) => {
  const handleChange = ({
    target,
  }: ChangeEvent<HTMLInputElement>) => {
    onChange?.({ name: target.name, value: target.value })
  }

  return (
    <div className={className}>
      {label && (
        <label htmlFor={name} className={s.label}>
          {label} {required && <span>*</span>}
        </label>
      )}
      <div>
        {/* TODO fix error or change library */}
        <InputMask
          type='tel'
          id={name}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
          disabled={disabled}
          className={cn(s.input, phoneInputClass)}
          mask='+7 (999) 999-99-99'
          maskChar='_'
        />
        {error && <div>{error}</div>}
      </div>
    </div>
  )
}

export default PhoneField
