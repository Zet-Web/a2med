import { FC, useEffect, useState } from 'react'

import { ConfirmModal, DatePicker } from 'features'
import {
  Alert,
  Button,
  Calendar,
  Input,
  Select,
  Avatar,
} from 'components'

import { getStoriesList } from 'shared/api/routes/stories'

import { DateMask } from 'shared/types'
import { handleError } from 'shared/utils/handleError'

import s from './examplePage.module.scss'

const requestExample = async () => {
  try {
    const data = await getStoriesList()
    console.log(data)
  } catch (err) {
    handleError(err)
  }
}
const ExamplePage: FC = () => {
  const [date, setDate] = useState<DateMask | null>(null)
  const [calendarDate, setCalendarDate] = useState<DateMask | null>(
    null
  )

  useEffect(() => {
    requestExample()
  }, [])

  const [text, setText] = useState<string>('')

  const [selected, setSelected] = useState<number | null>(null)
  const handleSelected = (value: number) => {
    setSelected(value)
  }

  return (
    <div className={s.container}>
      <Avatar src={''} isAdult={true} isMale={true} />

      <div className={s.flex}>
        <Button>Standard</Button>
        <Button variant='outline'>Outlined</Button>
        <Button disabled>Disabled</Button>
      </div>
      <Select
        placeholder='Название клиники'
        onChange={handleSelected}
        className={s.select}
        value={selected}
        options={[
          { value: 1, label: 'Клиника 1' },
          { value: 2, label: 'Клиника 2' },
          { value: 3, label: 'Клиника 3' },
        ]}
      />

      <Input
        value={text}
        onChange={value => setText(value)}
        error={'Some error'}
        isSearch
        label={'Input Label'}
      />

      <Alert>
        Для вызова врача, медсестры или тестирования на COVID-19,
        укажите адрес и нажмите на кнопку “Далее”. Менеджеры свяжутся
        с Вами, чтобы уточнить все детели и подтвердить заявку.
      </Alert>

      <DatePicker
        currentDate={date}
        onClick={date => {
          setDate(date)
        }}
      />
      <h3>Выбранная дата: {date}</h3>

      <Calendar date={calendarDate} onChange={setCalendarDate} />

      <ConfirmModal
        label={'Удалить аккаунт'}
        className={s.button}
        title={'Вы действительно хотите удалить аккаунт?'}
        description={
          'Все данные от аккаунта будут удалены без восстановления.'
        }
        confirmButtonLabel={'Удалить'}
        onConfirm={() => console.log('delete id:', 2)}
        cancelButtonLabel={'Отменить'}
        onCancel={() => console.log('back')}
      />
    </div>
  )
}

export default ExamplePage
