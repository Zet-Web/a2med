import { FC, useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import { ActionPreview } from 'features'

import { getStockById } from 'shared/api/routes/stocks'
import { StockType } from 'shared/types/stock'
import { handleError } from 'shared/utils/handleError'
import { useAppDispatch } from 'store/hooks'
import { resetCrumbs, setCrumbs } from 'store/slices/crumbs'
import { setPatient } from 'store/slices/family'

import s from './actionPreviewPage.module.scss'

const DoctorsConfirmPage: FC = () => {
  const { push, query } = useRouter()
  const dispatch = useAppDispatch()
  const stockId = Number(query.id)
  const [stockInfo, setStockInfo] = useState<StockType | null>(null)

  const getStock = async (id: number) => {
    try {
      const { data } = await getStockById(id)
      setStockInfo(data.result)
      dispatch(setCrumbs(data.result.title))
    } catch (error) {
      handleError(error)
    }
  }

  useEffect(() => {
    getStock(stockId)

    return () => {
      dispatch(resetCrumbs())
    }
  }, [stockId])

  const handleClick = (patientId: number) => {
    dispatch(setPatient(patientId))
    push(`/actions/${stockId}/confirm`)
  }

  return (
    <div className={s.container}>
      <ActionPreview data={stockInfo} onClick={handleClick} />
    </div>
  )
}

export default DoctorsConfirmPage
