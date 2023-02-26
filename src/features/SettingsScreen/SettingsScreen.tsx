import { FC, Fragment, ReactNode, useState } from 'react'

import { Heading } from 'components'
import SettingButton from './SettingButton/SettingButton'

import { SETTINGS_MENU } from 'shared/constants/settingsMenu'

import s from './settingsScreen.module.scss'

interface SettingsScreenProps {
  children: ReactNode[]
}

const SettingsScreen: FC<SettingsScreenProps> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<number | null>(null)
  const resetActiveTab = () => setActiveTab(null)

  return activeTab !== null ? (
    <>
      {children[activeTab]}
      <a className={s.backLink} onClick={resetActiveTab}>
        {'\u2190 Вернуться назад'}
      </a>
    </>
  ) : (
    <div className={s.container}>
      <Heading As={'h2'} className={s.caption}>
        Настройки
      </Heading>
      <div className={s.buttonsWrapper}>
        {SETTINGS_MENU.map((item, index) => (
          <SettingButton
            key={item.label}
            title={item.label}
            variant={item.icon}
            onClick={() => setActiveTab(index)}
          />
        ))}
      </div>
    </div>
  )
}

export default SettingsScreen
