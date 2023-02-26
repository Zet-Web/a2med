import { FC, ReactNode, useMemo, useState } from 'react'
import cn from 'classnames'

import s from './tabs.module.scss'

interface TabsProps {
  children: ReactNode[]
  tabLinks: string[]
  isNested?: boolean
}

const Tabs: FC<TabsProps> = ({ children, tabLinks, isNested }) => {
  const [activeTab, setActiveTab] = useState<number>(0)
  const handleClick = (value: number) => setActiveTab(value)

  const listClassName = cn(s.menuList, { [s.nested]: isNested })
  const itemClassName = (index: number) =>
    cn(isNested ? s.menuItemNested : s.menuItem, {
      [s.active]: activeTab === index,
    })

  return (
    <div className={s.container}>
      <ul className={listClassName}>
        {tabLinks.map((item, index) => (
          <li
            key={index}
            className={itemClassName(index)}
            onClick={() => handleClick(index)}
          >
            {item}
          </li>
        ))}
      </ul>
      <div className={s.tabWrapper}>{children[activeTab]}</div>
    </div>
  )
}

export default Tabs
