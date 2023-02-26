import { FC, useState } from 'react'
import cn from 'classnames'

import Image, { ImageProps } from 'next/image'
import { Icon } from 'components'

import { withDomain } from 'shared/utils/handleSrc'
import { IconType } from 'shared/types/icon'

import s from './avatar.module.scss'

type AvatarType = {
  src?: ImageProps['src'] | null
  alt?: string
  isAdult?: boolean
  isMale?: boolean
  className?: string
  size?: number
  isDoctor?: boolean
}

const Avatar: FC<AvatarType> = ({
  src = null,
  isMale = false,
  isAdult = true,
  className,
  size = 50,
  alt,
  isDoctor,
}) => {
  const [loadingError, setLoadingError] = useState(false)

  const currentIcon: IconType = isDoctor
    ? 'doctors'
    : isAdult
    ? isMale
      ? 'man'
      : 'woman'
    : isMale
    ? 'boy'
    : 'girl'

  return src && !loadingError ? (
    <div className={cn(s.imageWrapper, className)}>
      <Image
        onError={() => {
          setLoadingError(true)
        }}
        src={withDomain(src)}
        alt={alt || 'avatar'}
        layout='fill'
      />
    </div>
  ) : (
    <Icon
      variant={currentIcon}
      width={size}
      height={size}
      className={cn(s.iconWrapper, className)}
    />
  )
}

export default Avatar
