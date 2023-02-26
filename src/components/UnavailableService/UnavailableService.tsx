import { FC } from 'react'

import Link from 'next/link'
import { Heading, Icon } from 'components'

import s from './unavailableService.module.scss'

interface UnavailableServiceProps {
  title?: string
  href?: string
  text?: string
  buttonText?: string
}

const UnavailableService: FC<UnavailableServiceProps> = ({
  title = 'Услуга появится позже',
  text = 'В данный момент мы не проводим онлайн-консультации. Вы можете вызвать врача на дом или записаться в клинику.',
  buttonText = 'На главную',
  href = '/',
}) => (
  <div className={s.container}>
    <div className={s.window}>
      <Icon variant='picto-hourglass' className={s.icon} />
      <Heading As='h4' className={s.title}>
        {title}
      </Heading>
      <p className={s.text}>{text}</p>

      <Link href={href}>
        <a className={s.button}>{buttonText}</a>
      </Link>
    </div>
  </div>
)

export default UnavailableService
