import { FC, useMemo } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { Button, Calendar, Checkbox, Input, Select } from 'components'

import { useAppDispatch } from 'store/hooks'
import { updateFamily } from 'store/slices/family'
import { PatientType, PatientForm } from 'shared/types/patient'
import { genderOptions } from 'shared/constants/genderOptions'
import {
  createFamilyMember,
  updateFamilyMember,
} from 'shared/api/routes/family'
import { handleError } from 'shared/utils/handleError'

import s from './memberForm.module.scss'

interface MemberFormProps {
  member: PatientType | null
  closeForm: () => void
}

const MemberForm: FC<MemberFormProps> = ({ member, closeForm }) => {
  const dispatch = useAppDispatch()

  const defaultValues = useMemo(
    () => ({
      name: member?.name || '',
      surname: member?.surname || '',
      patronymic: member?.patronymic || '',
      passport_without_paronymic:
        member?.passport_without_paronymic || false,
      gender: member?.gender,
      birthday: member?.birthday,
      phone_number: member?.phone_number || '',
      email: member?.email || '',
    }),
    [member]
  )

  const {
    control,
    handleSubmit,
    formState: { isValid },
    watch,
  } = useForm<PatientForm>({
    defaultValues,
  })

  const onSubmit = async (formData: PatientForm) => {
    try {
      const { data } = member
        ? await updateFamilyMember(member.id, formData)
        : await createFamilyMember(formData)

      dispatch(updateFamily(data.result))
    } catch (error) {
      handleError(error)
    } finally {
      closeForm()
    }
  }

  return (
    <form className={s.form}>
      <Controller
        name={'surname'}
        control={control}
        rules={{ required: true }}
        render={({ field: { value, onChange } }) => (
          <Input
            label={'Фамилия'}
            value={value}
            onChange={onChange}
            inputClassName={s.input}
          />
        )}
      />

      <Controller
        name={'name'}
        control={control}
        rules={{ required: true }}
        render={({ field: { value, onChange } }) => (
          <Input
            label={'Имя'}
            value={value}
            onChange={onChange}
            inputClassName={s.input}
          />
        )}
      />

      <Controller
        name={'patronymic'}
        control={control}
        rules={{ required: !watch('passport_without_paronymic') }}
        render={({ field: { value, onChange } }) => (
          <Input
            label={'Отчество'}
            value={value}
            onChange={onChange}
            inputClassName={s.input}
          />
        )}
      />

      <Controller
        name={'gender'}
        control={control}
        rules={{ required: true }}
        render={({ field: { value, onChange } }) => (
          <Select
            options={genderOptions}
            label={'Пол'}
            placeholder={'Выберите пол'}
            value={value}
            onChange={onChange}
            withSearchIcon={false}
            wrapperClassName={s.select}
          />
        )}
      />

      <Controller
        name={'passport_without_paronymic'}
        control={control}
        render={({ field: { value, onChange } }) => (
          <Checkbox
            className={s.checkbox}
            value={value}
            onChange={onChange}
          >
            По паспорту без отчества
          </Checkbox>
        )}
      />

      <Controller
        name='birthday'
        control={control}
        rules={{ required: true }}
        render={({ field: { value, onChange } }) => (
          <label className={s.labelContainer}>
            <span className={s.labelText}>Дата рождения</span>
            <Calendar
              className={s.calendar}
              inputClassName={s.calendarInput}
              date={value}
              onChange={onChange}
              withIcon={false}
              dateFormat='dd.MM.yyyy'
            />
          </label>
        )}
      />

      <div className={s.buttonWrapper}>
        <Button
          className={s.button}
          disabled={!isValid}
          onClick={handleSubmit(onSubmit)}
        >
          Сохранить
        </Button>
        <Button
          type='button'
          className={s.button}
          variant='outline'
          onClick={closeForm}
        >
          Отменить
        </Button>
      </div>
    </form>
  )
}

export default MemberForm
