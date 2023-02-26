import { FC, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { add } from 'date-fns'

import Image from 'next/image'
import Link from 'next/link'
import { Button, PhoneField, Heading, Text, Input } from 'components'

import { cookies } from 'shared/utils/cookies'
import { authorize, register } from 'shared/api/routes/auth'

import gu from '/public/assets/images/gu.svg'

import s from './registerForm.module.scss'

const RegisterForm: FC = () => {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState<boolean>(false)
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
    setIsLoading(true)
    const { data } = await authorize({
      phone_number: phone,
      sms_code: code,
    })

    cookies.set('auth_token', data.result.token, {
      path: '/',
      expires: add(new Date(), { days: 7 }),
    })
    router.push('/profile?tab=0')
    setIsLoading(false)
  }

  return (
    <div className={s.container}>
      <Heading As='h1' className={!isPhoneSent && s.title}>
        Регистрация
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
          <Button
            className={s.button}
            onClick={handleSubmit}
            isLoading={isLoading}
            disabled={isLoading}
          >
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
          <Text>
            {`Введите номер мобильного телефона,\nмы отправим код для входа в СМС.`}
          </Text>
          <PhoneField
            label={'Номер мобильного телефона'}
            name='phone'
            placeholder={'+7'}
            value={phone}
            onChange={handlePhone}
          />
          <Button className={s.button} onClick={handlePasscode}>
            Получить код
          </Button>
          <Link href={'/auth/register'}>
            <a href='#' className={s.linkGU}>
              <Image
                src={gu}
                width={33}
                height={33}
                alt='Госуслуги'
              />
              Войти через Госуслуги
            </a>
          </Link>
        </>
      )}
    </div>
  )
}

export default RegisterForm
