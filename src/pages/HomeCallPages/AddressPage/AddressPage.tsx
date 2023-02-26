import { FC } from 'react'
import { useRouter } from 'next/router'

import { AddressForm, PatientPicker } from 'features'
import { Alert, Heading } from 'components'

import { setPatient } from 'store/slices/family'
import { useGetFamily } from 'shared/hooks/useGetFamily'
import { useAppDispatch } from 'store/hooks'

import s from './addressPage.module.scss'

const AddressPage: FC = () => {
  const dispatch = useAppDispatch()

  const { patient, family } = useGetFamily()
  const { push } = useRouter()

  const handlePatient = (id: number) => {
    dispatch(setPatient(id))
  }

  const onConfirm = () => {
    push('home-call/services')
  }

  return (
    <div className={s.container}>
      <Heading As='h1' className={s.title}>
        Вызов врача на дом
      </Heading>
      <PatientPicker
        active={patient?.id}
        patients={family}
        onClick={handlePatient}
      />
      <Alert>
        Для вызова врача, медсестры или тестирования на COVID-19,
        укажите адрес и нажмите на кнопку “Далее”. Менеджеры свяжутся
        с Вами, чтобы уточнить все детали и подтвердить заявку.
      </Alert>

      <AddressForm onConfirm={onConfirm} />
    </div>
  )
}

export default AddressPage
