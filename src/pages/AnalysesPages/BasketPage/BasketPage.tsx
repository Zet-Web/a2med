import { FC, useEffect, useState } from 'react'

import { ActionsSlider, CostCalculation } from 'features'
import { Heading, WorkingHours } from 'components'

import { CalculationType } from 'shared/types/calculation'

import { StockType } from 'shared/types/stock'
import { mock_calculation } from 'shared/mocks/mock_calculation'
import { mock_clinics } from 'shared/mocks/mock_clinics'
import { getStocksList } from 'shared/api/routes/stocks'
import { handleError } from 'shared/utils/handleError'

import s from './basketPage.module.scss'

const BasketPage: FC = () => {
  const [price, setPrice] =
    useState<CalculationType[]>(mock_calculation)

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

  const handleClear = () => setPrice([])

  return (
    <div className={s.container}>
      <Heading As='h1' className={s.heading}>
        Расчет стоимости
      </Heading>
      <div className={s.calculation}>
        <CostCalculation prices={price} onClear={handleClear} />

        <WorkingHours
          title={
            'Сдать анализы можно на голодный желудок, в часы работы клиник:'
          }
          clinics={mock_clinics}
        />
      </div>
      <Heading As='h2' className={s.caption}>
        Акции и пакеты услуг
      </Heading>
      <ActionsSlider slides={stocks} />
    </div>
  )
}

export default BasketPage
