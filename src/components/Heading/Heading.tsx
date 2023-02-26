import { FC, ReactNode } from 'react'
import cn from 'classnames'

import s from './heading.module.scss'

interface HeadingProps {
  children: ReactNode
  As?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  className?: string | boolean
  onClick?: () => void
}

const Heading: FC<HeadingProps> = ({
  As = 'h1',
  children,
  className,
  ...props
}) => {
  return (
    <As className={cn(s.heading, className)} {...props}>
      {children}
    </As>
  )
}

export default Heading
