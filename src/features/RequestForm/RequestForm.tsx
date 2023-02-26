import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'
import cn from 'classnames'

import { Button, Checkbox, Heading, Input, TagList } from 'components'

import { DateButton } from 'shared/types'
import { PatientType } from 'shared/types/patient'

import s from './requestForm.module.scss'

interface RequestFormProps {
  patient: PatientType | null
  dates: DateButton[]
  list: { label: string; value: number }[]
  onSubmit: (data: any) => void
}

const RequestForm: FC<RequestFormProps> = ({
  patient,
  dates,
  list,
  onSubmit,
}) => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      contact_person: true,
      dates: null,
      symptoms: [],
      complaint: '',
    },
  })

  return (
    <section className={s.container}>
      <div className={s.wrapper}>
        <div className={s.article}>
          <Heading As='h4' className={s.title}>
            Пациент
          </Heading>
          <ul className={s.list}>
            <li className={s.listItem}>
              <span className={s.label}>Пациент</span>
              <span className={s.value}>{patient?.name || ''}</span>
            </li>
            <li className={s.listItem}>
              <span className={s.label}>Пациент</span>
              <span className={s.value}>+7 (912) 345-67-89</span>
            </li>
          </ul>

          <Controller
            control={control}
            name={'contact_person'}
            render={({ field: { value, onChange } }) => (
              <Checkbox
                className={s.checkbox}
                value={value}
                onChange={onChange}
              >
                Пациент является контактным лицом
              </Checkbox>
            )}
          />
        </div>

        <div className={s.article}>
          <Heading As='h4' className={s.title}>
            Дата вызова
          </Heading>
          <div className={s.datePicker}>
            {dates?.map(el => (
              <Controller
                key={el.value}
                control={control}
                name={'dates'}
                render={({ field: { value, onChange } }) => (
                  <Button
                    className={cn(s.dateButton, {
                      [s.outline]: el.value !== value,
                    })}
                    variant={
                      el.value === value ? 'primary' : 'outline'
                    }
                    onClick={() => onChange(el.value)}
                  >
                    <span className={s.label}>{el.label}</span>
                    <span className={s.weekDay}>{el.weekDay}</span>
                  </Button>
                )}
              />
            ))}
          </div>
        </div>

        <div className={s.article}>
          <Heading As='h4' className={s.title}>
            Симптомы
          </Heading>
          <Controller
            control={control}
            name={'symptoms'}
            render={({ field: { value, onChange } }) => (
              <TagList
                list={list}
                selected={value}
                onChange={onChange}
                isMulti
                className={s.tagList}
              />
            )}
          />
        </div>

        <div className={s.article}>
          <Heading As='h4' className={s.title}>
            Жалобы
          </Heading>

          <Controller
            control={control}
            name={'complaint'}
            render={({ field: { value, onChange } }) => (
              <Input
                value={value}
                onChange={onChange}
                inputClassName={s.input}
                placeholder='Опишите свои жалобы'
              />
            )}
          />
        </div>
      </div>

      <div className={s.wrapper}>
        <Heading As='h4' className={s.subtitle}>
          Прием у врача (первичный)
        </Heading>

        <div className={s.summary}>
          <span className={s.total}>Итого</span>
          <span className={s.price}>от 1500 ₽</span>
        </div>

        <Button onClick={handleSubmit(onSubmit)}>Далее</Button>
      </div>
    </section>
  )
}

export default RequestForm
