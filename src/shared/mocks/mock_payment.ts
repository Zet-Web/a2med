import { AppointmentType } from 'shared/types/appointment'

export const mock_payment: AppointmentType = {
  patient: {
    value: '1',
    label: 'Иванова Мария Петровна',
  },
  specialty: {
    value: '1',
    label: 'Аллерголог-иммунолог',
  },
  clinic: {
    value: '1',
    label: 'Клиническая 123',
  },
  doctor: {
    value: '5',
    label: 'Врач',
  },
  date: {
    value: '2022-11-07 09:00:00',
    label: '07.11.2022 09:00',
  },
  price: {
    value: '1233',
    label: '1233',
  },
}
