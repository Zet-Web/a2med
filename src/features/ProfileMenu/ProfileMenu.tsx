import { FC, ReactNode, useState, useEffect } from 'react'
import cn from 'classnames'

import { Icon } from 'components'

import { PROFILE_MENU } from 'shared/constants/profileMenu'

import s from './profileMenu.module.scss'

interface ProfileMenuProps {
  children: ReactNode[]
  initialTab: number | null
}

const ProfileMenu: FC<ProfileMenuProps> = ({
  children,
  initialTab = null,
}) => {
  const [activeTab, setActiveTab] = useState<number | null>(null)

  useEffect(() => setActiveTab(initialTab), [initialTab])

  const handleClick = (value: number) => setActiveTab(value)

  return (
    <div className={s.container}>
      <ul className={s.menuList}>
        {PROFILE_MENU.map(({ label, icon }, index) => (
          <li
            key={index}
            className={cn(s.menuItem, {
              [s.active]: activeTab === index,
            })}
            onClick={() => handleClick(index)}
          >
            <Icon className={s.icon} variant={icon} />
            <span className={s.title}>{label}</span>
            <Icon
              className={s.arrow}
              variant='arrow-right'
              height={14}
            />
          </li>
        ))}
      </ul>

      <div className={s.tabWrapper}>
        {activeTab !== null && children[activeTab]}
      </div>
    </div>
  )
}

export default ProfileMenu
