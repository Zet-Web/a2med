import { FC } from 'react'

import Image from 'next/image'
import { Slider } from 'components'

import { Story } from 'shared/types/story'
import { withDomain } from 'shared/utils/handleSrc'

import s from './servicesSlider.module.scss'

interface ServicesSliderProps {
  slides: Story[]
  onClick: (id: number) => void
}

const ServicesSlider: FC<ServicesSliderProps> = ({
  slides,
  onClick,
}) => (
  <Slider slidesPerView={4}>
    {slides?.map((item, index) => (
      <div
        key={item.id}
        className={s.slide}
        onClick={() => onClick(index)}
      >
        <Image
          src={withDomain(item.image)}
          alt={item.title}
          layout='fill'
          objectFit='cover'
        />

        <div className={s.content}>
          <span className={s.text}>{item.title}</span>
        </div>
      </div>
    ))}
  </Slider>
)

export default ServicesSlider
