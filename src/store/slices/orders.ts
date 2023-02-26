import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  LabeledOrder,
  OrderLabel,
  OrdersType,
} from 'shared/types/orders'

type PayloadType = { label: OrderLabel; data: OrdersType[] }

export type OrdersState = {
  orders: LabeledOrder[]
  ordersId: number[]
}

const initialState: OrdersState = {
  orders: [],
  ordersId: [],
}

export const orders = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setOrders(state, action: PayloadAction<PayloadType>) {
      const { label, data } = action.payload
      const newData = data.filter(
        item => !state.ordersId.includes(item.id)
      )

      state.orders = [
        ...state.orders,
        ...newData.map(item => ({ ...item, label })),
      ]
      state.ordersId = [
        ...state.ordersId,
        ...newData.map(item => item.id),
      ]
    },
  },
})

export const { setOrders } = orders.actions

export default orders.reducer
