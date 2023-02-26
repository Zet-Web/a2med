import { FC, SyntheticEvent, useMemo, useRef, useState } from 'react'
import cn from 'classnames'

import { Icon } from 'components'

import s from './select.module.scss'

type Options = {
  value: number
  label: string
}

interface SelectProps {
  options: Options[]
  placeholder: string
  onChange: (value: number) => void
  value: number | null
  label?: string
  isRequired?: boolean
  error?: string
  className?: string
  wrapperClassName?: string
  withSearchIcon?: boolean
}

const Select: FC<SelectProps> = ({
  value,
  options,
  placeholder,
  label,
  isRequired,
  error,
  className,
  wrapperClassName,
  onChange,
  withSearchIcon = true,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  const fieldValue = useMemo<string>(
    () => options.find(opt => opt.value === value)?.label || '',
    [value]
  )

  const ref = useRef<HTMLUListElement>(null)
  const handleSelect = (
    e: SyntheticEvent,
    value: Options['value']
  ) => {
    e.stopPropagation()
    onChange(value)
    handleClose()
  }

  return (
    <label className={cn(s.container, className)}>
      {label && (
        <span className={s.labelText}>
          {label} {isRequired && <span>*</span>}
        </span>
      )}
      <div
        className={cn(s.selectWrapper, wrapperClassName)}
        onClick={handleOpen}
      >
        {withSearchIcon && (
          <Icon variant={'search'} className={s.searchIcon} />
        )}

        {fieldValue ? (
          <p className={s.label}>{fieldValue}</p>
        ) : (
          <p className={s.placeholder}>{placeholder}</p>
        )}

        <Icon
          variant='arrow-down-branding'
          className={cn(s.selectArrow, { [s.close]: isOpen })}
        />

        {isOpen && (
          <ul className={s.dropdown} ref={ref}>
            {options.length ? (
              options.map(opt => (
                <li
                  key={opt.value}
                  className={s.option}
                  value={opt.value}
                  onClick={e => handleSelect(e, opt.value)}
                >
                  {opt.label}
                </li>
              ))
            ) : (
              <li className={s.option}>Ничего не найдено</li>
            )}
          </ul>
        )}
      </div>
      {error && <span className={s.errorText}>{error}</span>}
    </label>
  )
}

export default Select
