import { ConfirmedProps } from '../types/appointmentConfirmed'

export const actionSuccess: ConfirmedProps = {
  title: 'Вы записаны на прием по акции',
  text: 'Для просмотра данных о записи, перейдите в раздел Медкнижка',
  href: '/med-profile',
}

export const homeCallSuccess: ConfirmedProps = {
  title: 'Ваш запрос на вызов врача принят',
  text: 'Наш менеджер свяжется с Вами для уточнения всех необходимых данных',
  href: '/med-profile',
}

export const doctorsSuccess: ConfirmedProps = {
  title: 'Ваш счёт оплачен',
  text: 'Для просмотра данных о записи, перейдите в раздел Медкнижка',
  href: '/med-profile',
}
