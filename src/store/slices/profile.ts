import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Profile } from 'shared/types/profile'

export type ProfileState = { profile: Profile | null }

const initialState: ProfileState = {
  profile: null,
}

export const profile = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile(state, action: PayloadAction<Profile>) {
      state.profile = { ...action.payload }
    },
  },
})

export const { setProfile } = profile.actions

export default profile.reducer
