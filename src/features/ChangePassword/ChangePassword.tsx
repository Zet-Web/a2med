import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { Heading, Input, Button } from 'components'

import s from './changePassword.module.scss'

type PasswordsFormState = {
  currentPassword: string
  newPassword: string
  newPasswordCheck: string
}

const passwordControls: {
  name: keyof PasswordsFormState
  label: string
}[] = [
  { name: 'currentPassword', label: 'Введите текущий пароль' },
  { name: 'newPassword', label: 'Введите новый пароль' },
  { name: 'newPasswordCheck', label: 'Введите новый пароль еще раз' },
]

const ChangePassword: FC = () => {
  const PasswordsFormState: PasswordsFormState = {
    currentPassword: '',
    newPassword: '',
    newPasswordCheck: '',
  }

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<PasswordsFormState>({
    defaultValues: PasswordsFormState,
  })

  const onSubmit = (data: PasswordsFormState) => {
    alert('Пароль обновлен')
    console.log(data)
  }

  return (
    <div className={s.container}>
      <Heading As='h2' className={s.title}>
        Изменить пароль
      </Heading>

      <form className={s.content} onSubmit={handleSubmit(onSubmit)}>
        <div className={s.inputWrapper}>
          {passwordControls.map((item, index) => (
            <Controller
              key={index}
              name={item.name}
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <Input
                  value={value}
                  onChange={onChange}
                  isPassword
                  label={item.label}
                  className={s.inputContainer}
                  inputClassName={s.input}
                />
              )}
            />
          ))}
        </div>
        <Button className={s.button} disabled={!isValid}>
          Сохранить изменения
        </Button>
      </form>
    </div>
  )
}

export default ChangePassword
