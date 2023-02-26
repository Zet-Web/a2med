import { NextPage } from 'next'
import Link from 'next/link'

import s from 'styles/dev.module.scss'

const siteMap = [
  {
    heading: 'Вход',
    list: [
      { text: 'Авторизация', href: '/auth/login' },
      { text: 'Регистрация', href: '/auth/register' },
      { text: 'Главная', href: '/' },
      { text: 'Поиск на главной', href: '/' },
    ],
  },
  {
    heading: 'Акции',
    list: [
      { text: 'Просмотр', href: '/actions/1' },
      { text: 'Подтверждение', href: '/actions/1/confirm' },
      { text: 'Успех', href: '/actions/success' },
      {
        text: 'Уведомление на главной',
        href: '/',
      },
      {
        text: 'Оплата онлайн',
        href: '/actions/payment',
        empty: true,
      },
      {
        text: 'Успех (Оплата онлайн)',
        href: '/actions/success',
        empty: true,
      },
    ],
  },
  {
    heading: 'Приём в клинике',
    list: [
      { text: 'Выбор пациента', href: '/appointment' },
      { text: 'Выбор врача', href: '/appointment/doctor' },
      { text: 'Подтверждение', href: '/appointment/doctor/confirm' },
      {
        text: 'Запись оформлена',
        href: '/appointment/success',
      },
      {
        text: 'Оплата онлайн',
        href: '/appointment/payment',
        empty: true,
      },
      {
        text: 'Успех (Оплата онлайн)',
        href: '/appointment/success',
        empty: true,
      },
    ],
  },
  {
    heading: 'Анализы',
    list: [
      { text: 'Выбор пациента', href: '/analyses' },
      { text: 'Расчет стоимости', href: '/analyses/basket' },
    ],
  },
  {
    heading: 'Вызов на дом',
    list: [
      { text: 'Выбор адреса', href: '/home-call' },
      { text: 'Выбор услуги', href: '/home-call/services' },
      { text: 'Симптомы и жалобы', href: '/home-call/patient' },
      { text: 'Подтверждение', href: '/home-call/confirm' },
      {
        text: 'Запись оформлена',
        href: '/home-call/success',
      },
      {
        text: 'Оплата онлайн',
        href: '/home-call/payment',
        empty: true,
      },
      {
        text: 'Успех (Оплата онлайн)',
        href: '/home-call/success',
        empty: true,
      },
    ],
  },
  {
    heading: 'Онлайн консультация',
    list: [{ text: 'Услуга недоступна', href: '/online-consult' }],
  },
  {
    heading: 'Врачи',
    list: [
      { text: 'Выбор врача', href: '/doctors' },
      { text: 'Информация о враче', href: '/doctors/5' },
      { text: 'Подтверждение', href: '/doctors/5/confirm' },
      {
        text: 'Запись оформлена',
        href: '/home-call/success',
      },
      {
        text: 'Оплата онлайн',
        href: '/home-call/payment',
        empty: true,
      },
      {
        text: 'Успех (Оплата онлайн)',
        href: '/home-call/success',
        empty: true,
      },
    ],
  },
  {
    heading: 'Клиники',
    list: [
      { text: 'Выбор клиники', href: '/clinics' },
      {
        text: 'Информация о клинике',
        href: '/clinics/1',
      },
      { text: 'Записаться на приём', href: '/appointment' },
    ],
  },
  {
    heading: 'Медкнижка',
    list: [
      { text: 'Просмотр записей', href: '/med-profile' },
      {
        text: 'Информация о записи',
        href: '/med-profile/55',
      },
      {
        text: 'Подготовка к приёму',
        href: '/med-profile/info',
      },
    ],
  },
  {
    heading: 'Профиль',
    list: [
      { text: 'Боковое меню', href: '/' },
      { text: 'Мой профиль', href: '/profile' },
      {
        text: 'Моя семья',
        href: '/profile?tab=1',
      },
      {
        text: 'Счета и истории',
        href: '/profile?tab=2',
        empty: true,
      },
      {
        text: 'Мои карты',
        href: '/profile',
      },
      {
        text: 'Мои бонусы',
        href: '/profile?tab=3',
      },
      {
        text: 'Справка',
        href: '/profile?tab=4',
      },
      {
        text: 'Настройки',
        href: '/profile?tab=5',
      },
    ],
  },
]

const Dev: NextPage = () => (
  <div className={s.container}>
    {siteMap.map((block, index) => (
      <ul key={index} className={s.list}>
        <h3 className={s.heading}>{block.heading}</h3>
        {block.list.map((i, idx) => (
          <li key={idx}>
            <Link href={i.href}>
              <a className={i.empty ? s.empty : s.link}>{i.text}</a>
            </Link>
          </li>
        ))}
      </ul>
    ))}
  </div>
)

export default Dev
