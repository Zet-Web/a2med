import { FC, ReactNode, useState } from 'react'
import cn from 'classnames'

import s from './Accordion.module.scss'

interface AccordionProps {
  title?: ReactNode
  children?: ReactNode
  onClick?: (isOpen: boolean) => void
  className?: string
}

const Accordion: FC<AccordionProps> = ({
  title,
  children,
  onClick,
  className,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const toggleOpen = () => {
    setIsOpen(prev => !prev)
    onClick?.(isOpen)
  }

  const headerClass = cn(s.headerContent, {
    [s.isOpen]: isOpen,
  })

  const toggleClass = cn(s.toggleIcon, {
    [s.isOpen]: isOpen,
  })

  return (
    <div className={cn(s.accordion, className)}>
      <div className={headerClass} onClick={toggleOpen}>
        <div className={s.titleClass}>
          <span className={s.title}>{title}</span>
          <div className={toggleClass} />
        </div>
      </div>
      {isOpen ? (
        <div className={s.contentClass}>{children}</div>
      ) : null}
    </div>
  )
}

export default Accordion
