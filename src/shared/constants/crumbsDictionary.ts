import { LinkType } from 'shared/types'

export const dictionary: LinkType[] = [
  { label: 'Приём в клинике', href: '/appointment' },
  { label: 'Выбор врачей', href: '/doctor' },
  { label: 'Подтверждение', href: '/confirm' },
  { label: 'Запись оформлена', href: '/success' },
  { label: 'Анализы', href: '/analyses' },
  { label: 'Корзина анализов', href: '/analyses/basket' },
  { label: 'Вызов на дом', href: '/home-call' },
  { label: 'Оформление заявки', href: '/home-call/patient' },
  { label: 'Онлайн-консультация', href: '/online-consult' },
  { label: 'Медкнижка', href: '/med-profile' },
  { label: 'Профиль', href: '/profile' },
  { label: 'Врачи', href: '/doctors' },
  { label: 'Клиники', href: '/clinics' },
  { label: 'Запись на прием', href: '/recording' },
  { label: 'Ошибка', href: '/404' },
  { label: 'Акция', href: '/actions' },
]
