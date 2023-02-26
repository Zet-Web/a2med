import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Meta } from 'shared/types'
import { Specialty } from 'shared/types/specialties'

export type SpecialtyState = {
  meta: Meta[] | null
  specialties: Specialty[] | null
}

const initialState: SpecialtyState = {
  meta: null,
  specialties: null,
}

export const specialties = createSlice({
  name: 'specialties',
  initialState,
  reducers: {
    setSpecialties(state, action: PayloadAction<Specialty[]>) {
      state.meta = action.payload.map(item => {
        return { id: item.id, name: item.name }
      })
      state.specialties = [...action.payload]
    },
  },
})

export const { setSpecialties } = specialties.actions

export default specialties.reducer
