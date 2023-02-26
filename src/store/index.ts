import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'

import analyses from './slices/analyses'
import appointment from './slices/appointment'
import auth from './slices/auth'
import crumbs from './slices/crumbs'
import family from './slices/family'
import orders from './slices/orders'
import profile from './slices/profile'
import specialties from './slices/specialties'
import profileNumber from './slices/profileNumber'

export const store = configureStore({
  reducer: {
    analyses,
    appointment,
    auth,
    crumbs,
    family,
    orders,
    profile,
    specialties,
    profileNumber
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
