import { useRouter } from 'next/router'

import { Heading } from 'components'
import { RequestForm } from 'features'

import { useGetFamily } from 'shared/hooks/useGetFamily'
import { mock_tags } from 'shared/mocks/mock_tags'
import { DateButton } from 'shared/types'

import s from './patientPage.module.scss'

const PatientPage = () => {
  const { patient } = useGetFamily()
  const { push } = useRouter()

  const dates: DateButton[] = [
    { label: '20 сентября', value: '20-09-2022', weekDay: 'Вторник' },
    { label: '21 сентября', value: '21-09-2022', weekDay: 'Вторник' },
  ]

  const onSubmit = (data: any) => {
    push('/home-call/patient/confirm')
  }

  return (
    <div className={s.container}>
      <Heading As='h1' className={s.heading}>
        Вызов врача на дом
      </Heading>
      <RequestForm
        dates={dates}
        patient={patient}
        list={mock_tags}
        onSubmit={onSubmit}
      />
    </div>
  )
}

export default PatientPage
