import { ButtonHTMLAttributes, FC, ReactNode } from 'react'
import cn from 'classnames'

import s from './button.module.scss'

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  className?: string
  round?: boolean
  variant?: 'primary' | 'outline'
  disabled?: boolean
  isLoading?: boolean
}

const Button: FC<ButtonProps> = ({
  children,
  className,
  round,
  variant = 'primary',
  disabled,
  isLoading,
  ...props
}) => {
  const buttonClass = cn(
    s.button,
    round ? s.round : s.standard,
    !round && s[variant],
    { [s.disabled]: disabled },
    className
  )

  return (
    <button className={buttonClass} {...props}>
      {isLoading ? <div className={s.loader} /> : children}
    </button>
  )
}

export default Button
