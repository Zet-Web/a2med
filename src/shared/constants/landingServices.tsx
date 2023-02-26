import { ServiceType } from 'shared/types/service'

export const LIST_SERVICES: ServiceType[] = [
  {
    img: 'picto-hospital',
    title: 'Приём в клинике',
    text: 'Запись на приём в клинике A2Med. У нас работают квалифицированные специалисты с многолетним опытом.',
    href: '/appointment',
  },
  {
    img: 'picto-microscope',
    title: 'Запись на анализы',
    text: 'Запись и информация о сдаче анализов в клинике.',
    href: '/analyses',
  },
  {
    img: 'picto-laptop',
    title: 'Онлайн-консультация',
    text: 'Связь с врачом по онлайн-чату или видео-звонку в Zoom/Телемост',
    href: '/online-consult',
  },
  {
    img: 'picto-house',
    title: 'Вызов на дом',
    text: 'Вызов врача на дом, при невозможном посещении клиники самостоятельно.',
    href: '/home-call',
  },
  {
    img: 'picto-doctor',
    title: 'Врачи',
    text: 'Список врачей, доступных для записи',
    href: '/doctors',
  },
  {
    img: 'picto-hospital',
    title: 'Клиники',
    text: 'Список врачей, доступных для записи',
    href: '/clinics',
  },
  {
    img: 'picto-documents',
    title: 'Медкарта',
    text: 'Список врачей, доступных для записи',
    href: '/profile/medbook',
  },
]
