import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ProfileNumberState {
    phoneNumber: string
}

const initialState: ProfileNumberState = {
    phoneNumber: '',
}

export const profileNumberSlice = createSlice({
    name: 'profileNumber',
    initialState,
    reducers: {
        setNumber: (
            state,
            action: PayloadAction<ProfileNumberState['phoneNumber']>
        ) => {
            state.phoneNumber = action.payload
        },
    },
})

export const { setNumber } = profileNumberSlice.actions

export default profileNumberSlice.reducer
