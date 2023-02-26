import { FC, useMemo } from 'react'
import { Controller, useForm } from 'react-hook-form'
import cn from 'classnames'

import { Button, Calendar, Heading, Icon, Input } from 'components'

import { useAppDispatch } from 'store/hooks'
import { setProfile } from 'store/slices/profile'
import { handleError } from 'shared/utils/handleError'
import { PassportFormState } from 'shared/types/profile'
import { useGetProfile } from 'shared/hooks/useGetProfile'
import { updateProfile } from 'shared/api/routes/profile'

import { passportInputsLabels } from '../constants'

import s from './PassportForm.module.scss'

interface PassportFormProps {
  onClose: () => void
}

const PassportForm: FC<PassportFormProps> = ({ onClose }) => {
  const dispatch = useAppDispatch()
  const profile = useGetProfile()
  const defaultValues = useMemo(
    () => ({
      passport_series: profile?.passport_series || '',
      passport_number: profile?.passport_number || '',
      issued_by: profile?.issued_by || '',
      department_code: profile?.department_code || '',
      address_registration: profile?.address_registration || '',
      issued_date: profile?.issued_date || null,
    }),
    [profile]
  )

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<PassportFormState>({
    defaultValues,
  })

  const onSubmit = async (formData: PassportFormState) => {
    try {
      const { data } = await updateProfile(formData)

      dispatch(setProfile(data.result))
    } catch (error) {
      handleError(error)
    } finally {
      onClose()
    }
  }

  return (
    <section className={s.container}>
      <Heading As='h3' className={s.heading}>
        Паспортные данные
      </Heading>
      <div className={s.alert}>
        <Icon variant='warning' width={26} height={26} />
        <p>
          Поля должны быть заполнены в точном соответствии, как они
          заполнены в вашем паспорте гражданина РФ
        </p>
      </div>

      <form className={s.form}>
        <div className={s.wrapper}>
          {Object.entries(passportInputsLabels).map(
            ([name, label]) => (
              <Controller
                key={name}
                name={
                  name as keyof Omit<PassportFormState, 'issued_date'>
                }
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <Input
                    label={label}
                    value={value}
                    onChange={onChange}
                    className={cn({
                      [s.order]: name === 'registration',
                    })}
                    inputClassName={s.input}
                  />
                )}
              />
            )
          )}
          <label className={s.calendarLabel}>
            <span className={s.labelText}>Дата выдачи</span>
            <Icon
              variant='arrow-down-branding'
              width={8}
              height={14}
              className={s.arrowIcon}
            />
            <Controller
              name={'issued_date'}
              control={control}
              render={({ field: { value, onChange } }) => (
                <Calendar
                  date={value || null}
                  onChange={onChange}
                  withIcon={false}
                  className={s.calendar}
                  inputClassName={s.calendarInput}
                  dateFormat='dd.MM.yyyy'
                />
              )}
            />
          </label>
        </div>

        <div className={s.buttonsWrapper}>
          <Button
            variant='primary'
            onClick={handleSubmit(onSubmit)}
            disabled={!isValid}
          >
            Сохранить
          </Button>
          <Button type='button' variant='outline' onClick={onClose}>
            Отменить
          </Button>
        </div>
      </form>
    </section>
  )
}

export default PassportForm
