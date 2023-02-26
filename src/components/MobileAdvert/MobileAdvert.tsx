import { FC } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { Heading, Icon } from 'components'

import s from './mobileAdvert.module.scss'

const MobileAdvert: FC = () => (
  <section className={s.container}>
    <div className={s.imageWrapper}>
      <Image
        src='/assets/images/mobileApp.png'
        alt='Mobile App'
        layout='fill'
        objectFit='contain'
        objectPosition='right'
      />
    </div>

    <div className={s.content}>
      <Heading As='h4' className={s.heading}>
        Полный доступ ко всем услугам в{' '}
        <span className={s.colorBranding}>мобильном приложении</span>{' '}
        A2Med
      </Heading>
      <p className={s.text}>
        Скачайте наше приложение A2Med для быстрого доступа к записям,
        результатам обследований и приёмов.
      </p>

      <div className={s.buttonWrapper}>
        <Link href='href'>
          <a className={s.button}>
            <Image
              src='/assets/images/appStore.svg'
              alt='App Store'
              layout='fill'
            />
          </a>
        </Link>
        <Link href='href'>
          <a className={s.button}>
            <Image
              src='/assets/images/googlePlay.svg'
              alt='Google Play'
              layout='fill'
            />
          </a>
        </Link>
      </div>
    </div>
  </section>
)

export default MobileAdvert
