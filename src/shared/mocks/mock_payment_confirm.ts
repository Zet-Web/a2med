import { RequestType } from 'shared/types/request'

export const mock_payment_confirm: RequestType = {
  patient: {
    value: '1',
    label: 'Иванова Мария Петровна',
  },
  number: {
    value: '+7(912)345-67-89',
    label: '+7(912)345-67-89',
  },
  address: {
    value: '1',
    label: 'ул.Повевая д.74',
  },
  symptoms: {
    value: '1, 2, 3',
    label: 'Слабость, Горло, Температура',
  },
  date: {
    value: '2022-11-07 11:30:00',
    label: '07.11.2022 11:30',
  },
  price: {
    value: '1233',
    label: '1233',
  },
}
