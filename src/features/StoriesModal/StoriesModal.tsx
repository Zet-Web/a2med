import { FC, useEffect, useState } from 'react'
import { A11y, Autoplay, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import parse from 'html-react-parser'

import Image from 'next/image'
import { Heading, Icon, Modal } from 'components'

import { Story } from 'shared/types/story'
import { withDomain } from 'shared/utils/handleSrc'

import 'swiper/css/bundle'
import s from './storiesModal.module.scss'

interface StoriesModalProps {
  stories: Story[]
  activeStory: number | null
  setActiveStory: (id: number | null) => void
}

const DEFAULT_DELAY = 5000

const StoriesModal: FC<StoriesModalProps> = ({
  stories,
  activeStory,
  setActiveStory,
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const handleOpen = () => {
    setIsModalOpen(prev => !prev)
  }
  const handleClose = () => {
    setActiveStory(null)
    setIsModalOpen(false)
  }

  useEffect(() => {
    if (!stories.length) return

    if (activeStory !== null) handleOpen()
  }, [stories, activeStory])

  return activeStory !== null ? (
    <Modal
      isOpen={isModalOpen}
      onClose={handleClose}
      className={s.modal}
      closeVariant='cross-white'
      closeClassName={s.close}
    >
      <Swiper
        onSwiper={swiper => {
          swiper.slideTo(activeStory)
        }}
        onSlideChange={swiper => {
          if (swiper.activeIndex === swiper.slides.length - 1) {
            setTimeout(() => setIsModalOpen(false), DEFAULT_DELAY)
          }
        }}
        modules={[Pagination, A11y, Autoplay]}
        pagination={{ clickable: true }}
        watchSlidesProgress
        autoplay={{
          delay: DEFAULT_DELAY,
          disableOnInteraction: false,
          stopOnLastSlide: true,
        }}
      >
        {stories?.map(item => (
          <SwiperSlide key={item.id} className={s.slide}>
            <Image
              src={withDomain(item.image)}
              alt={item.title}
              layout='fill'
              objectFit='cover'
            />
            <div className={s.content}>
              <Heading As='h4' className={s.title}>
                {item.title}
              </Heading>
              {parse(item.text)}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </Modal>
  ) : null
}

export default StoriesModal
