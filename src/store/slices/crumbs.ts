import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type CrumbsState = {
  name: string | null
}

const initialState = {
  name: null,
}

export const crumbsSlice = createSlice({
  name: 'crumbsSlice',
  initialState,
  reducers: {
    setCrumbs: (
      state: CrumbsState,
      action: PayloadAction<CrumbsState['name']>
    ) => {
      state.name = action.payload
    },
    resetCrumbs: (state: CrumbsState) => {
      state.name = null
    },
  },
})

export const { setCrumbs, resetCrumbs } = crumbsSlice.actions

export default crumbsSlice.reducer
