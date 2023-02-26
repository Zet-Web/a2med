import { FC } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { Heading, Slider } from 'components'

import { StockType } from 'shared/types/stock'
import { withDomain } from 'shared/utils/handleSrc'

import s from './actionsSlider.module.scss'

interface ActionsSliderProps {
  slides: StockType[]
}

const ActionsSlider: FC<ActionsSliderProps> = ({ slides }) =>
  slides.length ? (
    <Slider>
      {slides?.map(slide => (
        <div className={s.slide} key={slide.id}>
          <div className={s.imageWrapper}>
            <Image
              src={withDomain(slide.image)}
              alt={slide.title}
              layout='fill'
            />
          </div>
          <div className={s.content}>
            <Heading As='h5' className={s.title}>
              {slide.title}
            </Heading>
            <Link href={`/actions/${slide.id}`}>
              <a className={s.link}>
                {slide.text || 'Подробнее \u2192'}
              </a>
            </Link>
          </div>
        </div>
      ))}
    </Slider>
  ) : (
    <p className={s.plug}>Нечего показать</p>
  )

export default ActionsSlider
