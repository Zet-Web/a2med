import { FC, useState } from 'react'
import { useRouter } from 'next/router'

import { SpecialistPicker } from 'features'
import { Heading, Input, Select, Button, Icon } from 'components'

import { useAppSelector } from 'store/hooks'
import { useGetSpecialties } from 'shared/hooks/useGetSpecialties'

import s from './specialistsPage.module.scss'

const DoctorsSelectPage: FC = () => {
  const { push, query } = useRouter()
  const { specialties } = useGetSpecialties()
  const { specialty } = useAppSelector(
    state => state.appointment.appointment
  )

  const handleClick = (e: { id: number | null; time: null }) => {
    push(`/doctors/${e.id}`)
  }

  const [inputValue, setInputValue] = useState<string>(
    (query.search as string) || specialty?.label || ''
  )
  const handleInputValue = (value: string) => {
    setInputValue(value)
  }

  const [selected, setSelected] = useState<number | null>(null)
  const handleSelected = (value: number) => {
    setSelected(value)
  }

  return (
    <div className={s.container}>
      <Heading As='h1' className={s.title}>
        Врачи
      </Heading>
      <div className={s.grid}>
        <Input
          onChange={handleInputValue}
          placeholder={'Поиск врача по специальности'}
          value={inputValue}
          isSearch
          inputClassName={s.input}
        />
        <Select
          placeholder='Название клиники'
          onChange={handleSelected}
          className={s.select}
          value={selected}
          options={[
            // TODO подключить клиники
            { value: 1, label: 'Клиника 1' },
            { value: 2, label: 'Клиника 2' },
            { value: 3, label: 'Клиника 3' },
          ]}
        />
      </div>
      <Button className={s.button}>
        <Icon variant='calendar' />
        Расписание
      </Button>

      <Heading className={s.caption} As='h2'>
        Все врачи
      </Heading>
      <SpecialistPicker
        specialties={specialties}
        filterInput={inputValue}
        filterSelect={selected}
        onClickDoctor={(id: number) =>
          handleClick({ id, time: null })
        }
      />
    </div>
  )
}

export default DoctorsSelectPage
