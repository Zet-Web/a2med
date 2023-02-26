import { IconType } from 'shared/types/icon'

interface ProfileMenuItem {
  label: string
  icon: IconType
}

export const PROFILE_MENU: ProfileMenuItem[] = [
  { label: 'Мой профиль', icon: 'profile' },
  { label: 'Моя семья', icon: 'family' },
  { label: 'Счета и истории', icon: 'text-document' },
  // { label: 'Мои карты', icon: 'card' },
  { label: 'Бонусы', icon: 'gift' },
  { label: 'Справка в налоговые органы', icon: 'duo-document' },
  { label: 'Настройки', icon: 'gear' },
]
