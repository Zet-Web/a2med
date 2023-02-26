import { FC } from 'react'

import { Button, Icon } from 'components'

import { IconType } from 'shared/types/icon'

import s from './settingButton.module.scss'

interface SettingButtonProps {
  title: string
  variant: IconType
  onClick: () => void
}

const SettingButton: FC<SettingButtonProps> = ({
  title,
  variant,
  onClick,
}) => (
  <Button className={s.buttonWrapper} onClick={onClick}>
    <Icon className={s.icon} variant={variant} />
    <span className={s.title}>{title}</span>
    <Icon className={s.arrow} variant='arrow-right' height={14} />
  </Button>
)

export default SettingButton
