import React, { FC, ReactNode, useRef } from 'react'
import SwiperCore from 'swiper'
import { A11y, Navigation } from 'swiper'
import cn from 'classnames'

import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react'

import 'swiper/css/bundle'
import s from './slider.module.scss'

interface SliderProps extends SwiperProps {
  children: ReactNode[]
  slidesPerView?: number
  className?: string
  inner?: boolean
}

const Slider: FC<SliderProps> = ({
  children,
  slidesPerView = 3,
  className,
  inner,
  ...props
}) => {
  const swiperRef = useRef<SwiperCore>()
  const handleBeforeInit = (swiper: SwiperCore) => {
    swiperRef.current = swiper
  }
  const handleClickPrev = () => swiperRef.current?.slidePrev()
  const handleClickNext = () => swiperRef.current?.slideNext()

  const wrapperClass = cn(s.wrapper, { [s.inner]: inner }, className)

  return (
    <div className={wrapperClass}>
      <button
        className={s.swiperButtonPrev}
        onClick={handleClickPrev}
      />

      <Swiper
        spaceBetween={40}
        slidesPerView={slidesPerView}
        modules={[Navigation, A11y]}
        navigation={true}
        onBeforeInit={handleBeforeInit}
        {...props}
      >
        {children?.map((child, index) => (
          <SwiperSlide key={index}>{child}</SwiperSlide>
        ))}
      </Swiper>

      <button
        className={cn(s.swiperButtonNext)}
        onClick={handleClickNext}
      />
    </div>
  )
}

export default Slider
