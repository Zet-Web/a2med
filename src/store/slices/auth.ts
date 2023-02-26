import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type AuthState = {
  token: string | undefined
}

const initialState: AuthState = {
  token: undefined,
}

export const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state: AuthState, action: PayloadAction<string>) => {
      state.token = action.payload
    },
  },
})

export const { setToken } = auth.actions

export default auth.reducer
