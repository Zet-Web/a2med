import { useEffect } from 'react'
import { reverse, sortBy } from 'lodash'

import { getOrders } from 'shared/api/routes/orders'
import { handleError } from 'shared/utils/handleError'
import { OrderLabel } from 'shared/types/orders'

import { useAppDispatch, useAppSelector } from 'store/hooks'
import { useToken } from './useToken'
import { setOrders } from 'store/slices/orders'

export const useGetOrders = (label?: OrderLabel) => {
  const token = useToken()
  const dispatch = useAppDispatch()

  const { orders } = useAppSelector(state => state.orders)

  const updateOrders = async () => {
    try {
      const { data } = await getOrders(label)
      const sortedData = reverse(sortBy(data.result.data, 'datetime'))
      dispatch(
        setOrders({ label: label || 'doctors', data: sortedData })
      )
    } catch (err) {
      handleError(err)
    }
  }

  useEffect(() => {
    if (!token) return
    updateOrders()
  }, [token])

  if (!label) return orders

  return orders.filter(item => item.label === label)
}
