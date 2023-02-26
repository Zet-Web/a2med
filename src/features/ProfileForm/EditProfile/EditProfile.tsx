import { FC } from 'react'
import { useForm, Controller } from 'react-hook-form'

import {
  Button,
  Calendar,
  Checkbox,
  Input,
  PhoneField,
  Select,
} from 'components'

import { useAppDispatch } from 'store/hooks'
import { setProfile } from 'store/slices/profile'
import { handleError } from 'shared/utils/handleError'
import { genderOptions } from 'shared/constants/genderOptions'
import { updateProfile } from 'shared/api/routes/profile'
import { ProfileFormState } from 'shared/types/profile'

import { profileLabels } from '../constants'

import s from './editProfile.module.scss'

interface EditProfileProps {
  currentData: ProfileFormState
  onEdit: () => void
}

export const EditProfile: FC<EditProfileProps> = ({
  currentData,
  onEdit,
}) => {
  const dispatch = useAppDispatch()
  const {
    control,
    handleSubmit,
    formState: { isValid },
    watch,
  } = useForm<ProfileFormState>({
    defaultValues: currentData,
  })

  const onSubmit = async (formData: ProfileFormState) => {
    try {
      const { data } = await updateProfile(formData)

      dispatch(setProfile(data.result))
    } catch (error) {
      handleError(error)
    } finally {
      onEdit()
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={s.grid}>
        <Controller
          name={'surname'}
          control={control}
          rules={{ required: true }}
          render={({ field: { value, name, onChange } }) => (
            <Input
              label={profileLabels[name]}
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
          render={({ field: { value, name, onChange } }) => (
            <Input
              label={profileLabels[name]}
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
          render={({ field: { value, name, onChange } }) => (
            <Input
              label={profileLabels[name]}
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
          render={({ field: { value, name, onChange } }) => (
            <Select
              options={genderOptions}
              label={profileLabels[name]}
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
          render={({ field: { value, name, onChange } }) => (
            <Checkbox
              className={s.checkbox}
              value={value}
              onChange={onChange}
            >
              По паспорту без отчества
            </Checkbox>
          )}
        />

        <label className={s.inputContainer}>
          <span className={s.labelText}>Дата рождения</span>
          <Controller
            name={'birthday'}
            control={control}
            rules={{ required: true }}
            render={({ field: { value, name, onChange } }) => (
              <Calendar
                date={value}
                onChange={onChange}
                className={s.calendar}
                inputClassName={s.calendarInput}
                withIcon={false}
                dateFormat='dd.MM.yyyy'
              />
            )}
          />
        </label>

        <Controller
          name={'phone_number'}
          control={control}
          rules={{ required: true }}
          render={({ field: { value, name, onChange } }) => (
            <PhoneField
              label={profileLabels[name]}
              name={'phone'}
              value={value}
              disabled
              onChange={({ value }) => onChange(value)}
              phoneInputClass={s.phoneInput}
              className={s.inputContainer}
            />
          )}
        />

        <Controller
          name={'email'}
          control={control}
          rules={{ required: true }}
          render={({ field: { value, name, onChange } }) => (
            <Input
              label={profileLabels[name]}
              value={value}
              onChange={onChange}
              inputClassName={s.input}
            />
          )}
        />
      </div>

      <div className={s.buttonsWrapper}>
        <Button
          variant='primary'
          disabled={!isValid}
          className={s.saveButton}
        >
          Сохранить изменения
        </Button>
        <Button
          type='button'
          variant='outline'
          className={s.cancelButton}
          onClick={onEdit}
        >
          Отменить
        </Button>
      </div>
    </form>
  )
}
