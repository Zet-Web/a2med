import { FC, useEffect, useState } from 'react'
import Link from 'next/link'

import { Heading } from 'components'

import { getStocksList } from 'shared/api/routes/stocks'
import { StockType } from 'shared/types/stock'
import { handleError } from 'shared/utils/handleError'

import s from './bonuses.module.scss'

const Bonuses: FC = () => {
  const [stocks, setStocks] = useState<StockType[]>([])
  const getStocks = async () => {
    try {
      const { data } = await getStocksList()
      setStocks(data.result.data)
    } catch (error) {
      handleError(error)
    }
  }

  useEffect(() => {
    getStocks()
  }, [])

  return (
    <div className={s.container}>
      <Heading className={s.title} As='h2'>
        Бонусы
      </Heading>
      {stocks?.map(stock => (
        <div className={s.stockCard} key={stock.id}>
          <Heading As='h4' className={s.stockTitle}>
            {stock.title}
          </Heading>
          <p className={s.stockText}>
            {stock.text ||
              'Пройдите анализы за 9000 руб в любой клинике центра'}
          </p>
          <Link href={`/actions/${stock.id}`}>
            <a className={s.link}>Записаться</a>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default Bonuses
