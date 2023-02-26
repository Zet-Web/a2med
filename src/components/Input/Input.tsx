import {
  forwardRef,
  ChangeEvent,
  useState,
  KeyboardEvent,
} from 'react'
import cn from 'classnames'

import { Icon } from 'components'

import { validateCodeField } from 'shared/utils/validateCodeField'

import s from './input.module.scss'

interface InputProps {
  value: string
  onChange: (text: string) => void
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void
  placeholder?: string
  className?: string
  inputClassName?: string
  label?: string
  error?: string
  isSearch?: boolean
  isPassword?: boolean
  isRequired?: boolean
  codeField?: boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  function Render(
    {
      value,
      onChange,
      onKeyDown,
      placeholder,
      className,
      inputClassName,
      isSearch,
      error,
      isPassword = false,
      label,
      isRequired,
      codeField = false,
      ...props
    },
    ref
  ) {
    const [pass, setPass] = useState(isPassword)
    const handlePass = () => setPass(prev => !prev)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value
      if (!codeField) onChange(newValue)
      else onChange(validateCodeField(value, newValue))
    }

    const handleClear = () => {
      onChange('')
    }

    return (
      <label className={cn(s.container, className)}>
        {label && (
          <span className={s.labelText}>
            {label} {isRequired && <span>*</span>}
          </span>
        )}

        <div
          className={cn(
            s.wrapper,
            { [s.error]: error },
            inputClassName
          )}
        >
          {isSearch && (
            <Icon variant={'search'} className={s.searchIcon} />
          )}

          <input
            onKeyDown={onKeyDown}
            ref={ref}
            className={cn(s.input)}
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            required={isRequired}
            type={pass ? 'password' : 'text'}
            {...props}
          />

          {value && (
            <Icon
              className={s.clearButton}
              onClick={handleClear}
              disableFocus
              variant={error ? 'cross-input-red' : 'cross-input'}
            />
          )}

          {isPassword && (
            <Icon
              className={s.clearButton}
              onClick={handlePass}
              variant={pass ? 'hide' : 'show'}
              width={20}
              height={20}
            />
          )}
        </div>

        {error && <span className={s.errorText}>{error}</span>}
      </label>
    )
  }
)

export default Input
