import { FC, useEffect, useState } from 'react'

import {
  ActionsSlider,
  ServicesGrid,
  ServicesSlider,
  StoriesModal,
} from 'features'
import { Heading, MobileAdvert } from 'components'

import { LIST_SERVICES } from 'shared/constants/landingServices'
import { getStocksList } from 'shared/api/routes/stocks'
import { getStoriesList } from 'shared/api/routes/stories'
import { StockType } from 'shared/types/stock'
import { Story } from 'shared/types/story'
import { handleError } from 'shared/utils/handleError'
import { useToken } from 'shared/hooks/useToken'

import s from './indexPage.module.scss'

const IndexPage: FC = () => {
  const token = useToken()
  const [stocks, setStocks] = useState<StockType[]>([])
  const [stories, setStories] = useState<Story[]>([])
  const [activeStory, setActiveStory] = useState<number | null>(null)

  const getStocks = async () => {
    try {
      const { data } = await getStocksList()
      setStocks(data.result.data)
    } catch (error) {
      handleError(error)
    }
  }

  const getStories = async () => {
    try {
      const { data } = await getStoriesList()
      setStories(data.result.data)
    } catch (error) {
      handleError(error)
    }
  }

  useEffect(() => {
    if (!token) return
    getStocks()
    getStories()
  }, [token])

  return (
    <div className={s.container}>
      <section className={s.section}>
        <Heading As='h2' className={s.title}>
          Новости
        </Heading>

        <ServicesSlider slides={stories} onClick={setActiveStory} />
      </section>

      <section className={s.section}>
        <Heading As='h2' className={s.title}>
          Услуги
        </Heading>
        <ServicesGrid services={LIST_SERVICES} />
      </section>

      <section className={s.section}>
        <Heading As='h2' className={s.title}>
          Акции и пакеты услуг
        </Heading>

        <ActionsSlider slides={stocks} />
      </section>

      <MobileAdvert />

      <StoriesModal
        stories={stories}
        activeStory={activeStory}
        setActiveStory={setActiveStory}
      />
    </div>
  )
}

export default IndexPage
