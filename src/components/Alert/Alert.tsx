import { FC } from 'react'

import { Icon } from 'components'

import s from './alert.module.scss'

interface AlertProps {
  children: string
}

const Alert: FC<AlertProps> = ({ children }) => (
  <div className={s.wrapper}>
    <Icon variant='warning' width={24} height={24} />
    <p className={s.text}>{children}</p>
  </div>
)

export default Alert
