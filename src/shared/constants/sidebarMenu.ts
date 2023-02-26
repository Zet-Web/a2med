import { IconType } from 'shared/types/icon'

type SidebarItem = {
  icon: IconType
  href: string
  title: string
}

export const SETTINGS_SIDEBAR_MENU: SidebarItem[] = [
  {
    icon: 'family',
    href: '/profile?tab=1',
    title: 'Моя семья',
  },
  {
    icon: 'text-document',
    href: '/profile?tab=2',
    title: 'Счета и истории',
  },
  // {
  //   icon: 'card',
  //   href: '/profile?tab=TODO FIX',
  //   title: 'Мои карты',
  // },
  {
    icon: 'gift',
    href: '/profile?tab=3',
    title: 'Бонусы',
  },
  {
    icon: 'duo-document',
    href: '/profile?tab=4',
    title: 'Справка в налоговые органы',
  },
  {
    icon: 'gear',
    href: '/profile?tab=5',
    title: 'Настройки',
  },
]
