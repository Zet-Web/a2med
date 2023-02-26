import { FC, useMemo, useState } from 'react'
import Link from 'next/link'

import { Avatar, Button, Icon, Logo } from 'components'
import Notification from './Notification/Notification'
import Sidebar from './Sidebar/Sidebar'
import Search from './Search/Search'

import { LinkType } from 'shared/types'
import { isPersonAdult } from 'shared/utils/handleDate'
import { useAppSelector } from 'store/hooks'
import { UserInfo } from 'shared/types/user'

import s from './header.module.scss'

interface HeaderProps {
  links: LinkType[]
}

const Header: FC<HeaderProps> = ({ links }) => {
  const profile = useAppSelector(state => state.profile.profile)

  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false)
  const handleSidebar = () => setIsSidebarOpen(prev => !prev)

  const [isNotificationOpen, setIsNotificationOpen] =
    useState<boolean>(false)
  const handleNotification = () => {
    setIsNotificationOpen(prev => !prev)
  }

  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const handleSearch = () => setIsSearchOpen(prev => !prev)

  const [unread, setUnread] = useState<number>(0)

  const user: UserInfo = useMemo(() => {
    if (!profile)
      return {
        fullName: 'ФИО',
        isAdult: true,
        isMale: false,
        avatar: null,
      }

    const { surname, name, patronymic } = profile
    const fullName = [surname, name, patronymic].join(' ')

    return {
      isMale: Boolean(profile?.gender),
      isAdult: isPersonAdult(profile?.birthday),
      fullName,
      avatar: null,
    }
  }, [profile])

  return (
    <header className={s.header}>
      <Logo width={135} height={30} />
      <nav className={s.navigation}>
        <ul className={s.list}>
          {links.map((item, index) => (
            <li key={index} className={s.item}>
              <Link href={item.href}>
                <a className={s.link}>{item.label}</a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className={s.buttonGroup}>
        <Button round onClick={handleSearch}>
          <Icon variant='search' width={24} height={24} />
        </Button>
        <Button round onClick={handleNotification}>
          <>
            <Icon variant='notify' width={24} height={24} />
            {unread ? (
              <div className={s.counter}>{unread}</div>
            ) : null}
          </>
        </Button>
        <Button
          className={s.openSidebar}
          onClick={handleSidebar}
          round
        >
          <Avatar
            className={s.avatar}
            src={user.avatar}
            isMale={user.isMale}
            isAdult={user.isAdult}
            alt={'logo'}
            size={50}
          />
        </Button>
      </div>

      {isSearchOpen && <Search onClose={handleSearch} />}
      <Notification
        isOpen={isNotificationOpen}
        onClose={handleNotification}
        setUnread={setUnread}
      />
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={handleSidebar}
        user={user}
      />
    </header>
  )
}

export default Header
