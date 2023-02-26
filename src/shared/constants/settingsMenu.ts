import { IconType } from 'shared/types/icon'

interface SettingMenuItem {
  label: string
  icon: IconType
}

export const SETTINGS_MENU: SettingMenuItem[] = [
  { label: 'Частые вопросы', icon: 'question' },
  { label: 'Изменить пароль', icon: 'pencil' },
  { label: 'Удалить аккаунт', icon: 'basket' },
]
