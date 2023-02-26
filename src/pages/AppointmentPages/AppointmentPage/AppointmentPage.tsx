import { FC, useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import { FilterSearch, PatientPicker } from 'features'
import { Heading } from 'components'

import { useAppDispatch, useAppSelector } from 'store/hooks'
import { setPatient } from 'store/slices/family'
import { updateAppointment } from 'store/slices/appointment'
import { useGetSpecialties } from 'shared/hooks/useGetSpecialties'
import { useGetFamily } from 'shared/hooks/useGetFamily'

import s from './appointmentPage.module.scss'

const AppointmentPage: FC = () => {
  const dispatch = useAppDispatch()
  const { push } = useRouter()
  const { meta } = useGetSpecialties()
  const { family } = useGetFamily()

  const [isPicked, setIsPicked] = useState<boolean>(false)
  const dispatchSpecialty = (id: number) => {
    const specialty = meta?.find(person => person.id === id)
    if (!specialty) return

    dispatch(
      updateAppointment({
        specialty: {
          value: specialty.id.toString(),
          label: specialty.name,
        },
      })
    )

    if (!patient) {
      push('/doctors')
    } else {
      setIsPicked(true)
    }
  }

  // TODO нет слайса для пациентов - фронтенд
  const { patient } = useAppSelector(state => state.family)

  const dispatchPatient = (id: number) => {
    const search = family?.find(person => person.id === id)
    if (!search) return

    const newPatient = {
      value: search.id.toString(),
      label: search.name,
    }
    if (patient?.id.toString() === newPatient?.value) return

    dispatch(setPatient(id))
    dispatch(updateAppointment({ patient: newPatient }))
  }

  useEffect(() => {
    if (!patient) return
    dispatchPatient(patient.id)

    if (!isPicked) return
    push('/appointment/doctor')
  }, [patient, isPicked])

  return (
    <div className={s.container}>
      <Heading As='h1' className={s.title}>
        Приём в клинике
      </Heading>
      <PatientPicker
        patients={family}
        active={patient?.id}
        onClick={dispatchPatient}
      />
      <FilterSearch
        list={meta}
        onChange={dispatchSpecialty}
        title={'Специализация'}
        placeholder={'Поиск врача по специальности'}
      />
    </div>
  )
}

export default AppointmentPage
