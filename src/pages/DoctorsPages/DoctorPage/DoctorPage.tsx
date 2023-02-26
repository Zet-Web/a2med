import { FC, useEffect, useState } from 'react'
import { add, startOfToday } from 'date-fns'
import { useRouter } from 'next/router'

import { DoctorFullInfo, FastAppointment } from 'features'
import { Heading, Map } from 'components'

import { getDoctorByIdDate } from 'shared/api/routes/doctors'
import { formatDate } from 'shared/utils/handleDate'
import { handleError } from 'shared/utils/handleError'
import { DateMask, DateTimeMask } from 'shared/types'
import { DoctorWithOrderables } from 'shared/types/doctor'
import { useAppDispatch } from 'store/hooks'
import { resetCrumbs, setCrumbs } from 'store/slices/crumbs'

import s from './doctorPage.module.scss'

const DoctorPage: FC = () => {
  const { query, push } = useRouter()
  const dispatch = useAppDispatch()
  const doctorId = Number(query.id)

  const [doctor, setDoctor] = useState<DoctorWithOrderables | null>(
    null
  )
  const [date, setDate] = useState<DateMask | null>(
    formatDate(
      add(startOfToday(), {
        days: 1,
      })
    )
  )
  const updateDoctor = async (id: number, date: DateMask | null) => {
    try {
      const { data } = await getDoctorByIdDate(id, date)

      setDoctor(prev => {
        if (!prev) {
          return data.result
        }
        return { ...prev, orderables: data.result.orderables }
      })

      const { name, surname, patronymic } = data.result
      dispatch(setCrumbs([surname, name, patronymic].join(' ')))
    } catch (error) {
      handleError(error)
    }
  }

  useEffect(() => {
    updateDoctor(doctorId, date)
  }, [doctorId, date])

  // TODO сделать диспатч для страниц доктора
  const handleConfirm = (
    patientId: number,
    dateTime: DateTimeMask
  ) => {
    console.log(doctorId, patientId, dateTime)
    push(`/doctors/${doctorId}/confirm`)
  }

  return (
    doctor && (
      <div className={s.container}>
        <Heading className={s.title}>Врачи</Heading>
        <div className={s.content}>
          <DoctorFullInfo data={doctor} />
          <div className={s.rightContent}>
            <FastAppointment
              date={date}
              onChangeDate={setDate}
              orderables={doctor.orderables}
              onConfirm={handleConfirm}
            />
            <Map address='Дачная ул., 24, Самара' />
          </div>
        </div>
      </div>
    )
  )
}

export default DoctorPage
