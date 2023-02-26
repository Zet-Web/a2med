import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppointmentType } from 'shared/types/appointment'

interface AppointmentState {
  appointment: Partial<AppointmentType>
}

const initialState: AppointmentState = {
  appointment: {
    patient: null,
    specialty: null,
    clinic: null,
    doctor: null,
    date: null,
    price: null,
  },
}

export const appointmentSlice = createSlice({
  name: 'appointment',
  initialState,
  reducers: {
    updateAppointment: (
      state: AppointmentState,
      action: PayloadAction<Partial<AppointmentState['appointment']>>
    ) => {
      state.appointment = { ...state.appointment, ...action.payload }
    },
    resetAppointment: (state: AppointmentState) => {
      state = initialState
    },
  },
})

export const { updateAppointment, resetAppointment } =
  appointmentSlice.actions
export default appointmentSlice.reducer
