import { FC, ReactNode } from 'react'

import { Button } from 'components'

import s from './footerWithBasket.module.scss'

interface FooterProps {
  children: ReactNode
  price: number
  buttonLabel: string
  onClick: () => void
}

const FooterWithBasket: FC<FooterProps> = ({
  children,
  price,
  buttonLabel,
  onClick,
}) => (
  <footer className={s.footer}>
    <div className={s.container}>
      {children}
      <div className={s.buttonWrapper}>
        <span className={s.price}>от {price} ₽</span>
        <Button onClick={onClick} className={s.button}>
          {buttonLabel}
        </Button>
      </div>
    </div>
  </footer>
)

export default FooterWithBasket
