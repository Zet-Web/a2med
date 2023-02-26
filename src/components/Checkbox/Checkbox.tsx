import { forwardRef, ChangeEvent, ReactNode } from 'react'

import cn from 'classnames'

import s from './checkbox.module.scss'

interface CheckboxProps {
  value: boolean
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  children: ReactNode
  className?: string
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Render({ value, onChange, className, children }, ref) {
    return (
      <label className={cn(s.label, className)}>
        <input
          ref={ref}
          type='checkbox'
          className={s.checkbox}
          checked={value}
          onChange={onChange}
        />
        {children}
      </label>
    )
  }
)

export default Checkbox
