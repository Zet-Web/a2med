import { FC } from 'react'
import cn from 'classnames'

import Image from 'next/image'

import { IconType } from 'shared/types/icon'

import s from './icon.module.scss'

type IconProps = {
  variant: IconType
  className?: string
  width?: string | number
  height?: string | number
  onClick?: () => void
  disableFocus?: boolean
}

const Icon: FC<IconProps> = ({
  variant,
  className,
  width,
  height,
  onClick,
  disableFocus,
}) =>
  onClick ? (
    <button
      onClick={onClick}
      tabIndex={disableFocus ? -1 : undefined}
      className={cn(s.iconWrapper, className)}
      style={{ width, height }}
    >
      <Image
        src={require(`/public/assets/icons/${variant}.svg`)}
        alt={variant}
        layout={'fill'}
      />
    </button>
  ) : (
    <div
      className={cn(s.iconWrapper, className)}
      style={{ width, height }}
    >
      <Image
        src={require(`/public/assets/icons/${variant}.svg`)}
        alt={variant}
        layout={'fill'}
      />
    </div>
  )

export default Icon
