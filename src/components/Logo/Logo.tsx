import { FC } from 'react'
import cn from 'classnames'

import Link from 'next/link'
import Image from 'next/image'

import s from './logo.module.scss'

interface LogoProps {
  width: string | number
  height: string | number
  className?: string
}

const Logo: FC<LogoProps> = ({ className, ...props }) => (
  <Link href={'/'}>
    <a className={cn(s.logo, className)}>
      <Image
        src={'/assets/images/Logo_grey.png'}
        alt='logo'
        {...props}
      />
    </a>
  </Link>
)

export default Logo
