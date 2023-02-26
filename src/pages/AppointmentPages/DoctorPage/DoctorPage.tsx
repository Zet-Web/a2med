import { FC, useState, useEffect } from 'react'
import { add, startOfToday } from 'date-fns'
import { useRouter } from 'next/router'

import { DatePicker, DoctorPicker } from 'features'
import { Heading } from 'components'

import { DoctorPickerResponse } from 'features/DoctorPicker/DoctorPicker'
import { DateMask } from 'shared/types'
import { DoctorWithOrderables } from 'shared/types/doctor'
import { getDoctorsListBySpecialtyDate } from 'shared/api/routes/doctors'
import { handleError } from 'shared/utils/handleError'
import {
  formatDate,
  formatDatePayment,
} from 'shared/utils/handleDate'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { updateAppointment } from 'store/slices/appointment'

import s from './doctorPage.module.scss'

const DoctorPage: FC = () => {
  const { push } = useRouter()
  const dispatch = useAppDispatch()
  const { specialty } = useAppSelector(
    state => state.appointment.appointment
  )

  const [date, setDate] = useState<DateMask>(
    formatDate(
      add(startOfToday(), {
        days: 1,
      })
    )!
  )

  const [doctors, setDoctors] = useState<
    DoctorWithOrderables[] | null
  >(null)

  const updateDoctors = async () => {
    try {
      const { data } = await getDoctorsListBySpecialtyDate(
        Number(specialty?.value),
        date
      )
      // TODO фильтрация специалистов на бэкенде не работает
      setDoctors(
        data.result.data.filter(
          item =>
            !specialty ||
            item.specialty_id.toString() === specialty?.value
        ) || null
      )
    } catch (err) {
      handleError(err)
    }
  }

  useEffect(() => {
    updateDoctors()
  }, [date])

  const dispatchDoctor = ({ id, time }: DoctorPickerResponse) => {
    const newDoctor = doctors?.find(person => person.id === id)
    if (!newDoctor) return

    dispatch(
      updateAppointment({
        clinic: {
          value: newDoctor.clinic_id.toString(),
          label: newDoctor.clinic_id.toString(), //TODO подключить клиники
        },
        doctor: {
          value: newDoctor.id.toString(),
          label: newDoctor.name,
        },
        date: {
          value: time || '',
          label: formatDatePayment(time) || '',
        },
        price: {
          value: newDoctor.first_order_cost.toString(),
          label: newDoctor.first_order_cost.toString(),
        },
      })
    )

    push(`/appointment/doctor/confirm`)
  }

  return (
    <div className={s.container}>
      <Heading As='h1' className={s.title}>
        Приём в клинике
      </Heading>
      <DatePicker currentDate={date} onClick={setDate} />
      {doctors?.map((doctor, index) => (
        <DoctorPicker
          key={index}
          data={doctor}
          onClick={dispatchDoctor}
        />
      ))}
    </div>
  )
}

export default DoctorPage
