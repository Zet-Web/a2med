import { FC } from 'react'
import cn from 'classnames'

import Link from 'next/link'
import { Heading, Icon } from 'components'

import { ServiceType } from 'shared/types/service'

import s from './servicesGrid.module.scss'

interface ServicesGridProps {
  services: ServiceType[]
}

const ServicesGrid: FC<ServicesGridProps> = ({ services }) => (
  <div className={s.container}>
    <div className={s.grid}>
      {services
        .filter((s, index) => index < 4)
        .map((item, index) => (
          <div className={s.item} key={index}>
            <div className={s.content}>
              <Heading As='h4' className={s.title}>
                {item.title}
              </Heading>
              <p className={s.text}>{item.text}</p>
              <Link href={item.href}>
                <a className={s.button}>Записаться</a>
              </Link>
            </div>

            <Icon variant={item.img} className={s.image} />
          </div>
        ))}
    </div>

    <div className={cn(s.grid, s.small)}>
      {services
        .filter((s, index) => index >= 4)
        .map((item, index) => (
          <Link href={item.href} key={index}>
            <div className={s.item}>
              <div className={s.content}>
                <Heading As='h4' className={s.title}>
                  {item.title}
                </Heading>
                <p className={s.text}>{item.text}</p>
              </div>

              <Icon variant={item.img} className={s.image} />
            </div>
          </Link>
        ))}
    </div>
  </div>
)

export default ServicesGrid
