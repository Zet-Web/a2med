import { FC, useMemo } from 'react'
import { SubmitHandler, useForm, Controller } from 'react-hook-form'

import { Button, Checkbox, Heading, Icon, Input } from 'components'

import { useGetProfile } from 'shared/hooks/useGetProfile'
import { CertificateFormState } from 'shared/types/profile'
import { sendCertificate } from 'shared/api/routes/certificate'

import s from './certificateForm.module.scss'

const inputControls: {
  name: keyof Omit<CertificateFormState, 'passport_without_paronymic'>
  label: string
}[] = [
  { name: 'surname', label: 'Фамилия' },
  { name: 'name', label: 'Имя' },
  { name: 'patronymic', label: 'Отчество' },
  { name: 'email', label: 'E-mail' },
]

const CertificateForm: FC = () => {
  const profile = useGetProfile()

  const defaultCertificateForm: CertificateFormState = {
    surname: profile?.surname || '',
    name: profile?.name || '',
    patronymic: profile?.patronymic || '',
    email: profile?.email || '',
    passport_without_paronymic:
      profile?.passport_without_paronymic || false,
  }

  const {
    handleSubmit,
    control,
    formState: { isValid },
    watch,
  } = useForm<CertificateFormState>({
    defaultValues: defaultCertificateForm,
  })

  const onSubmit: SubmitHandler<
    CertificateFormState
  > = async formData => {
    const { data } = await sendCertificate(formData)
    alert(
      `Запрос создан ${new Date(
        data.result.created_at
      ).toLocaleDateString()}`
    )
  }

  return (
    <div className={s.container}>
      <Heading As='h2'>Справка в налоговые органы</Heading>

      <div className={s.alert}>
        <Icon variant='warning' width={26} height={26} />
        <p className={s.alertText}>
          Мы&nbsp;подготовим для Вас справку и&nbsp;документы для
          предоставления в&nbsp;налоговую. Отправим в&nbsp;течение
          10&nbsp;календарных дней на e-mail
        </p>
      </div>

      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={s.inputWrapper}>
          {inputControls.map(({ name, label }) => (
            <Controller
              key={name}
              name={name}
              control={control}
              rules={{
                required:
                  name === 'patronymic'
                    ? watch('passport_without_paronymic')
                    : true,
              }}
              render={({ field: { value, onChange } }) => (
                <Input
                  value={value}
                  onChange={onChange}
                  className={s.input}
                  label={label}
                />
              )}
            />
          ))}
        </div>

        <Controller
          name='passport_without_paronymic'
          control={control}
          render={({ field }) => (
            <Checkbox {...field} className={s.checkbox}>
              По паспорту без отчества
            </Checkbox>
          )}
        />

        <Button disabled={!isValid} className={s.button}>
          Заказать справку
        </Button>
      </form>
    </div>
  )
}

export default CertificateForm
