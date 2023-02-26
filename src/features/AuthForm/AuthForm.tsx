import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { add } from 'date-fns'

import Link from 'next/link'
import { Button, PhoneField, Heading, Text, Input } from 'components'

import { cookies } from 'shared/utils/cookies'
import { authorize, register } from 'shared/api/routes/auth'
import { setNumber } from 'store/slices/profileNumber'

import s from './authForm.module.scss'
import { useAppDispatch } from 'store/hooks'

const AuthForm = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [phone, setPhone] = useState<string>('')
  const handlePhone = (target: { value: string }) => {
    setPhone(target.value)
  }

  const [code, setCode] = useState<string>('')
  const handleCode = (value: string) => {
    setCode(value)
  }

  const [isPhoneSent, setIsPhoneSent] = useState<boolean>(false)

  const [timer, setTimer] = useState<number>(0)
  const tick = () => {
    if (timer <= 0) return
    setTimer(t => t - 1)
  }

  useEffect(() => {
    if (!isPhoneSent) return

    const timerID = setInterval(() => tick(), 1000)
    return () => clearInterval(timerID)
  }, [timer, isPhoneSent])

  const handlePasscode = async () => {
    const { data } = await register({
      phone_number: phone,
    })
    console.log(data?.result)

    setCode('')
    setTimer(60)
    setIsPhoneSent(true)
  }

  const handleSubmit = async () => {
    try {
      const { data } = await authorize({
        phone_number: phone,
        sms_code: code,
      })
      // @ts-ignore
      dispatch(setNumber(data?.result?.user.phone_number))

      cookies.set('auth_token', data.result.token, {
        path: '/',
        expires: add(new Date(), { days: 14 }),
      })
      router.push('/')
    } catch (error) {
      alert('Неправильный пароль')
    }
  }

  return (
    <div className={s.container}>
      <Heading As='h1' className={!isPhoneSent && s.title}>
        Вход в <span className={s.colorBranding}>личный кабинет</span>
      </Heading>

      {isPhoneSent ? (
        <>
          <Text>
            {`Введите код из СМС, который мы
          прислали на указанный Вами номер`}
          </Text>
          <Input
            label={'Код подтверждения'}
            value={code}
            onChange={handleCode}
            inputClassName={s.input}
            codeField
          />
          <Text className={s.restartTimer} onClick={handlePasscode}>
            Выслать код повторно ({timer})
          </Text>
          <Button className={s.button} onClick={handleSubmit}>
            Ввести код
          </Button>

          <Button
            variant='outline'
            onClick={() => setIsPhoneSent(false)}
          >
            Изменить номер
          </Button>
        </>
      ) : (
        <>
          <PhoneField
            label={'Номер мобильного телефона'}
            name='phone'
            placeholder={'+7'}
            value={phone}
            onChange={handlePhone}
          />
          <Button className={s.button} onClick={handlePasscode}>
            Войти
          </Button>
          <Link href={'/auth/register'}>
            <a className={s.link}>Регистрация</a>
          </Link>
        </>
      )}
    </div>
  )
}

export default AuthForm
