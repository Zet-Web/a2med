import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PatientType } from 'shared/types/patient'

export type FamilyState = {
  family: PatientType[] | null
  patient: PatientType | null
}

const initialState: FamilyState = {
  family: null,
  patient: null,
}

export const family = createSlice({
  name: 'family',
  initialState,
  reducers: {
    setFamily(state, action: PayloadAction<PatientType[]>) {
      state.family = action.payload
    },

    updateFamily(state, action: PayloadAction<PatientType>) {
      const indexToUpdate = state.family?.findIndex(
        patient => patient.id === action.payload.id
      )
      if (indexToUpdate === undefined || indexToUpdate === -1)
        state.family?.push(action.payload)
      else state.family?.splice(indexToUpdate, 1, action.payload)
    },

    deleteFamilyById(state, action: PayloadAction<number>) {
      const indexToUpdate = state.family?.findIndex(
        patient => patient.id === action.payload
      )

      if (indexToUpdate === undefined || indexToUpdate === -1) return
      else state.family?.splice(indexToUpdate, 1)
    },

    setPatient(state, action: PayloadAction<number>) {
      const patient = state.family?.find(
        ({ id }) => id === action.payload
      )

      if (patient) state.patient = patient
    },
  },
})

export const {
  setFamily,
  updateFamily,
  deleteFamilyById,
  setPatient,
} = family.actions

export default family.reducer
