import { FC, MouseEvent, useRef } from 'react'
import { useRouter } from 'next/router'
import cn from 'classnames'

import Link from 'next/link'
import { Avatar, Button, Icon } from 'components'

import { SETTINGS_SIDEBAR_MENU } from 'shared/constants/sidebarMenu'
import { UserInfo } from 'shared/types/user'
import { cookies } from 'shared/utils/cookies'

import s from './sidebar.module.scss'

interface SidebarProps {
  user: UserInfo
  isOpen: boolean
  onClose: () => void
}

const Sidebar: FC<SidebarProps> = ({ user, isOpen, onClose }) => {
  const { push } = useRouter()
  const ref = useRef<HTMLDivElement>(null)
  const onClickOutside = (event: MouseEvent<HTMLDivElement>) => {
    const el = ref?.current
    if (!el || el.contains(event.target as Node)) return
    onClose()
  }

  const handleLogout = () => {
    cookies.remove('auth_token')
    push('/auth/login')
  }

  const wrapperClass = cn(s.wrapper, { [s.isOpen]: isOpen })
  const contentClass = cn(s.content, { [s.isOpen]: isOpen })
  return (
    <div className={wrapperClass} onClick={onClickOutside}>
      <div ref={ref} className={contentClass}>
        <div className={s.topPanel}>
          <Avatar
            className={s.avatar}
            src={user.avatar}
            isMale={user.isMale}
            isAdult={user.isAdult}
            alt={'logo'}
            size={50}
          />
          <div className={s.userInfo}>
            <p className={s.userName}>{user.fullName}</p>
            <Link href='/profile'>
              <a className={s.profileLink} onClick={onClose}>
                Перейти в мой профиль
              </a>
            </Link>
          </div>
          <Icon
            className={s.closeBtn}
            onClick={onClose}
            variant='cross'
          />
        </div>

        <ul className={s.menu}>
          {SETTINGS_SIDEBAR_MENU.map(({ icon, title, href }) => (
            <Link key={title} href={href}>
              <li className={s.menuItem} onClick={onClose}>
                <Icon className={s.menuItemIcon} variant={icon} />
                <span className={s.menuTitle}>{title}</span>
                <Icon className={s.arrow} variant='arrow-right' />
              </li>
            </Link>
          ))}
        </ul>

        <Button
          onClick={handleLogout}
          className={s.logoutButton}
          variant='outline'
        >
          Выйти из профиля
        </Button>
      </div>
    </div>
  )
}

export default Sidebar
